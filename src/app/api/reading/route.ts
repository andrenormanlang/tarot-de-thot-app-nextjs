import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cartasTarot } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { cardIds } = await request.json()
    const cards = await Promise.all(
      cardIds.map((id: number) =>
        db.select().from(cartasTarot).where(eq(cartasTarot.id, id)).limit(1)
      )
    )
    return NextResponse.json(cards.map(card => card[0]))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate reading' }, { status: 500 })
  }
}