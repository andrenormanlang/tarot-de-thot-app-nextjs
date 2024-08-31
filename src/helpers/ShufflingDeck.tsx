import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Carta } from "@/lib/types";

interface ShuffledCard extends Carta {
  randomOffset?: {
    x: number;
    y: number;
    rotate: number;
  };
}

interface ShufflingDeckProps {
  cards: Carta[];
  cardBackUrl: string;
  isShuffling: boolean;
  onShuffleComplete: (newCards: Carta[]) => void;
  onSelectCard: (card: Carta) => void;
}

const ShufflingDeck: React.FC<ShufflingDeckProps> = ({
  cards,
  cardBackUrl,
  isShuffling,
  onShuffleComplete,
  onSelectCard,
}) => {
  const [shuffledCards, setShuffledCards] = useState<ShuffledCard[]>(cards);

  useEffect(() => {
    if (isShuffling) {
      const shuffleAnimation = setInterval(() => {
        setShuffledCards((cards) =>
          cards.map((card) => ({
            ...card,
            randomOffset: {
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 180 - 90,
            },
          }))
        );
      }, 200);

      setTimeout(() => {
        clearInterval(shuffleAnimation);
        setShuffledCards((cards) =>
          cards.map(({ randomOffset, ...card }) => card)
        );
        onShuffleComplete(cards);
      }, 2000);
    }
  }, [isShuffling, onShuffleComplete, cards]);

  return (
    <div className="relative h-48 mt-2 flex justify-center items-center overflow-hidden mx-auto">
      {shuffledCards.map((card, index) => (
        <div
          key={card.id}
          className="absolute"
          style={{
            left: `calc(50% + ${index * 20 - (cards.length - 1) * 10}px)`,
            zIndex: index,
            transform: card.randomOffset
              ? `translate(${card.randomOffset.x}px, ${card.randomOffset.y}px) rotate(${card.randomOffset.rotate}deg)`
              : "none",
          }}
          onClick={() => !isShuffling && onSelectCard(card)}
        >
          <Image
            src={cardBackUrl}
            alt="Card Back"
            width={50}
            height={80}
            className=" duration-1000 ease-in-out transform hover:-translate-y-14 last:mr-0 custom-border-radius"
          />
        </div>
      ))}
    </div>
  );
};

export default ShufflingDeck;
