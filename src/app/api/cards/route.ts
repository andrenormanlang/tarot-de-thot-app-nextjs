// src/app/api/cartas/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cartasTarot } from '@/lib/schema';

export async function GET() {
  try {
    const cards = await db.select().from(cartasTarot);
    console.log(cards);
    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}
