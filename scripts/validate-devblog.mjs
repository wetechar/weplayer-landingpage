#!/usr/bin/env node
/**
 * Valida los posts del DevBlog antes de publicar.
 *
 * Corre en local (`pnpm devblog:check`) y en CI/CD (parte de `pnpm build`).
 * Falla con exit code 1 si detecta cualquier problema.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'devblog', 'posts');
const FILENAME_RE = /^(\d{4})-(\d{2})-(\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED_FIELDS = ['title', 'date', 'summary', 'tags'];

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';

let errors = 0;
let warnings = 0;

function err(file, msg) {
  console.error(`${RED}✗${RESET} ${CYAN}${file}${RESET} — ${msg}`);
  errors += 1;
}

function warn(file, msg) {
  console.warn(`${YELLOW}⚠${RESET} ${CYAN}${file}${RESET} — ${msg}`);
  warnings += 1;
}

function ok(file, msg) {
  console.log(`${GREEN}✓${RESET} ${CYAN}${file}${RESET} ${DIM}${msg}${RESET}`);
}

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`${RED}No existe la carpeta ${POSTS_DIR}${RESET}`);
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

if (files.length === 0) {
  console.warn(`${YELLOW}No hay posts en ${POSTS_DIR}${RESET}`);
  process.exit(0);
}

console.log(
  `\n${CYAN}DevBlog validator${RESET} — validando ${files.length} post(s)\n`,
);

const seenSlugs = new Set();

for (const file of files) {
  const match = file.match(FILENAME_RE);
  if (!match) {
    err(
      file,
      'nombre inválido. Formato requerido: AAAA-MM-DD-slug-en-minusculas.md',
    );
    continue;
  }

  const [, yyyy, mm, dd] = match;
  const filenameDate = `${yyyy}-${mm}-${dd}`;

  let parsed;
  try {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    parsed = matter(raw);
  } catch (e) {
    err(file, `no se pudo leer/parsear: ${e.message}`);
    continue;
  }

  const { data, content } = parsed;

  let localErrors = 0;
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      err(file, `falta el campo obligatorio "${field}" en el frontmatter`);
      localErrors += 1;
    }
  }

  if (data.date && !DATE_RE.test(String(data.date))) {
    err(file, `date "${data.date}" no está en formato AAAA-MM-DD`);
    localErrors += 1;
  }

  if (data.date && String(data.date) !== filenameDate) {
    warn(
      file,
      `fecha del frontmatter (${data.date}) ≠ fecha del nombre (${filenameDate})`,
    );
  }

  if (data.tags) {
    if (!Array.isArray(data.tags)) {
      err(file, 'tags debe ser un array. Ej: ["iot", "mqtt"]');
      localErrors += 1;
    } else if (data.tags.length === 0) {
      err(file, 'tags no puede estar vacío. Agregar al menos uno.');
      localErrors += 1;
    } else {
      for (const t of data.tags) {
        if (typeof t !== 'string' || t !== t.toLowerCase()) {
          warn(file, `tag "${t}" debería estar en minúsculas`);
        }
      }
    }
  }

  if (data.title && String(data.title).length > 90) {
    warn(file, `title muy largo (${data.title.length} > 90 chars)`);
  }

  if (data.summary && String(data.summary).length > 220) {
    warn(file, `summary muy largo (${data.summary.length} > 220 chars)`);
  }

  const slug = file.replace(/\.md$/, '');
  if (seenSlugs.has(slug)) {
    err(file, `slug duplicado: ${slug}`);
    localErrors += 1;
  }
  seenSlugs.add(slug);

  if (!content.trim()) {
    err(file, 'cuerpo del post vacío');
    localErrors += 1;
  } else if (content.trim().split(/\s+/).length < 80) {
    warn(file, 'post muy corto (< 80 palabras). ¿Está terminado?');
  }

  if (localErrors === 0) {
    ok(file, `— ${data.title}`);
  }
}

console.log(
  `\n${errors === 0 ? GREEN : RED}Resumen:${RESET} ${errors} error(es), ${warnings} advertencia(s)\n`,
);

if (errors > 0) {
  console.error(
    `${RED}Validación fallida.${RESET} Corregí los errores y volvé a intentar.`,
  );
  process.exit(1);
}

console.log(`${GREEN}Todos los posts son válidos.${RESET}`);
