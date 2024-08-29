'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import Reading from './Reading'
import { Carta, DeckProps } from '@/lib/types'
import Image from 'next/image'

export default function Deck({ initialCards }: DeckProps) {
  const [cards, setCards] = useState(initialCards)
  const [selectedCards, setSelectedCards] = useState<Carta[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  const handleShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      setCards([...cards].sort(() => Math.random() - 0.5))
      setIsShuffling(false)
    }, 2000)
  }

  const handleSelectCard = (card: Carta) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card])
    }
  }

  const handleReset = () => {
    setSelectedCards([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center"></h1>
      <Button onClick={handleShuffle} disabled={isShuffling || selectedCards.length > 0}>
        {isShuffling ? 'Shuffling...' : 'Shuffle Cards'}
      </Button>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 my-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`w-full cursor-pointer ${isShuffling ? 'animate-pulse' : ''}`}
            onClick={() => !isShuffling && handleSelectCard(card)}
          >
            <Image 
              src={card.url_da_imagem} 
              alt={card.nome} 
              width={300}  // Adjust these values as needed
              height={450}  // Adjust these values as needed
              className="object-cover rounded-lg"
            />
          </Card>
        ))}
      </div>
      {selectedCards.length === 3 && (
        <>
          <Reading cards={selectedCards} />
          <Button onClick={handleReset}>New Reading</Button>
        </>
      )}
    </div>
  )
}
