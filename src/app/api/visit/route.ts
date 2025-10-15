import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory counter (will reset on server restart)
let visitCount = 0;

// Configura tu token y chat_id de Telegram aquí
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function GET() {
  visitCount++;

  // Notificación por Telegram
  // Notificación por email usando Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // debe estar en .env.local
      pass: process.env.EMAIL_PASS, // debe estar en .env.local
    },
  });

  await transporter.sendMail({
    from: 'tecnopulsar@gmail.com',
    to: 'tecnopulsar@gmail.com',
    subject: 'Nueva visita en tu web 🚀',
    text: `¡Nueva visita! Total visitas: ${visitCount}`,
  });

  return NextResponse.json({ count: visitCount });
}
