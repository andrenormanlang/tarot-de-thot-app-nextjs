import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
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
        onShuffleComplete(shuffledCards);
      }, 2000);
    }
  }, [isShuffling, onShuffleComplete, shuffledCards]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setShuffledCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className="relative h-48 mt-2 flex justify-center items-center overflow-hidden mx-auto">
      {shuffledCards.map((card, index) => (
        <DraggableCard
          key={card.id}
          index={index}
          card={card}
          cardBackUrl={cardBackUrl}
          moveCard={moveCard}
          onSelectCard={onSelectCard}
          isShuffling={isShuffling}
        />
      ))}
    </div>
  );
};

interface DraggableCardProps {
  card: ShuffledCard;
  index: number;
  cardBackUrl: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onSelectCard: (card: Carta) => void;
  isShuffling: boolean;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  index,
  cardBackUrl,
  moveCard,
  onSelectCard,
  isShuffling,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        left: `${index * 38}px`,
        zIndex: index,
        transform: card.randomOffset
          ? `translate(${card.randomOffset.x}px, ${card.randomOffset.y}px) rotate(${card.randomOffset.rotate}deg)`
          : "none",
        opacity: isDragging ? 0 : 1,
        cursor: isShuffling ? "not-allowed" : "grab",
      }}
      onClick={() => !isShuffling && onSelectCard(card)}
    >
      <Image
        src={cardBackUrl}
        alt="Card Back"
        width={50}
        height={80}
        className="duration-1000 ease-in-out transform hover:-translate-y-14 last:mr-0 custom-border-radius"
      />
    </div>
  );
};

export default ShufflingDeck;
