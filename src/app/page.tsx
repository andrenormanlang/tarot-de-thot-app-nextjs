import { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import Deck from '@/components/Deck'
import Reading from '@/components/Reading'
import { fetchCards } from '@/lib/api'

export default async function Home() {
  const cards = await fetchCards()
  console.log(cards);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Thoth Tarot Reader</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Deck initialCards={cards} />
      </Suspense>
    </div>
  )
}