'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReadingProps {
  cards: any[]
}

export default function Reading({ cards }: ReadingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {cards.map((card, index) => (
        <Card key={card.id}>
          <CardHeader>
            <CardTitle>{card.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{card.descrição_curta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}