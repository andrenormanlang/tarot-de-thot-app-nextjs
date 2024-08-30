import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {eq} from 'drizzle-orm'
import { cartasTarot } from '@/lib/schema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    // Fetch the card by id
    const card = await db
      .select()
      .from(cartasTarot)
      .where(eq(cartasTarot.id, parseInt(id))) // Use 'eq' for equality checks and convert id to integer if necessary
      .limit(1);

    if (card.length === 0) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json(card[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}

