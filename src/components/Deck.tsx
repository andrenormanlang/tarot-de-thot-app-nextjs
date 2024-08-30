"use client";

import { CardModal } from "./CardModal";
import Image from "next/image";
import { useState } from "react";
import { Carta, DeckProps } from "@/lib/types";
import { Button } from "./ui/button";

export default function Deck({ initialCards }: DeckProps) {
  const [cards, setCards] = useState<Carta[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<Carta[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [modalCard, setModalCard] = useState<Carta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null); // Add this line

  const cardBackUrl = process.env.NEXT_PUBLIC_CARD_BACK_URL || "/CardBack.jpeg";

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setCards([...cards].sort(() => Math.random() - 0.5));
      setIsShuffling(false);
    }, 2000);
  };

  const handleSelectCard = (card: Carta) => {
    if (selectedCards.length < 3 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleHover = (index: number) => {
    setActiveCardIndex(index); // Update active card index when hovered
  };

  const handleLeave = () => {
    setActiveCardIndex(null); // Reset active card index when hover ends
  };

  const handleReset = () => {
    setSelectedCards([]);
  };

  const openModal = (card: Carta) => {
    setModalCard(card);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 bg-gray-900 text-gray-100">
      <div className="flex justify-center mb-8">
        <Button
          onClick={handleShuffle}
          disabled={isShuffling || selectedCards.length > 0}
          className="bg-indigo-500 hover:bg-indigo-900 rounded-lg custom-button-1"
        >
          {isShuffling ? "Shuffling..." : "Shuffle Cards"}
        </Button>
      </div>

      <div
        id="shuffled-cards"
        className="relative h-36 sm:h-48 mt-2 flex justify-center items-center overflow-x-auto mx-auto"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card-container ${
              activeCardIndex === index ? "active" : ""
            }`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleLeave}
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <div
              onClick={() => !isShuffling && handleSelectCard(card)}
              className="cursor-pointer"
            >
              <Image
                src={cardBackUrl}
                alt="Card Back"
                width={50}
                height={80}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div
        id="selected-cards"
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {selectedCards.map((card, index) => (
          <div key={card.id} className="flex flex-col items-center">
            <h3 className="smythe-regular text-2xl font-bold mb-4 text-indigo-500">
              {index === 0
                ? "Mente (Passado)"
                : index === 1
                ? "Corpo (Presente)"
                : "Espirito (Futuro)"}
            </h3>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="w-full h-full relative overflow-hidden rounded-lg">
                    <Image
                      src={card.url_da_imagem || "/fallback-image.jpg"}
                      alt={card.nome || "Unknown Card"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="flip-card-back">
                  <h2 className="text-xl font-semibold mb-2">{card.nome}</h2>
                  <p className="text-center text-xs overflow-y-auto flex-grow">
                    {card.descrição_curta}
                  </p>
                  <Button 
                    onClick={() => openModal(card)}
                    className="mt-4 bg-slate-500 hover:bg-slate-900 custom-button-2"
                  
                  >
                    View Full Description
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCards.length === 3 && (
        <div className="flex justify-center mt-12">
          <Button 
          onClick={handleReset}
          className="bg-amber-950 hover:bg-amber-600 rounded-lg custom-button-3"
          >New Reading</Button>
        </div>
      )}

      <CardModal
        card={modalCard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
