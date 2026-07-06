#!/usr/bin/env node
/**
 * Crea un nuevo post del DevBlog con la plantilla correcta.
 *
 * Uso:
 *   pnpm devblog:new "Título del post"
 */

import fs from 'node:fs';
import path from 'node:path';

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';

const args = process.argv.slice(2);
const title = args.join(' ').trim();

if (!title) {
  console.error(`${RED}Falta el título.${RESET}`);
  console.error(`Uso: ${CYAN}pnpm devblog:new "Título del post"${RESET}`);
  process.exit(1);
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(title);

if (!slug) {
  console.error(`${RED}No se pudo generar un slug válido a partir del título.${RESET}`);
  process.exit(1);
}

const filename = `${today}-${slug}.md`;
const dir = path.join(process.cwd(), 'devblog', 'posts');
const filePath = path.join(dir, filename);

if (fs.existsSync(filePath)) {
  console.error(`${RED}Ya existe: ${filename}${RESET}`);
  process.exit(1);
}

const template = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today}"
summary: "Escribí acá una frase que enganche al lector."
tags: ["tag1", "tag2"]
canonical: "docs/RUTA-AL-DOC.md"
audience: "developers"
---

# ${title}

Primer párrafo introductorio. ¿Qué problema resolvés? ¿Por qué le importa al
lector?

## Primera sección

Texto normal, **negrita** con dos asteriscos, *cursiva* con uno.

- Idea 1
- Idea 2
- Idea 3

## Segunda sección

Podés incluir pseudocódigo así:

\`\`\`text
device on connect:
    publish reported (estado actual)
    subscribe desired
\`\`\`

## Para profundizar

- Documento interno: [\`docs/MI-DOC.md\`](../../docs/MI-DOC.md)
- Enlace externo: [Título](https://ejemplo.com)
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(filePath, template, 'utf8');

console.log(`${GREEN}✓${RESET} Post creado: ${CYAN}${filename}${RESET}`);
console.log(`  Ruta: devblog/posts/${filename}`);
console.log(`\nEditalo y luego corré: ${CYAN}pnpm devblog:check${RESET}\n`);
