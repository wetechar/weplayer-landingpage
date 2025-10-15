import { NextResponse } from 'next/server';

// Simple in-memory counter (will reset on server restart)
let visitCount = 0;

export async function GET() {
  visitCount++;
  return NextResponse.json({ count: visitCount });
}
