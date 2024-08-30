"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Carta, DeckProps } from "@/lib/types";
import Image from "next/image";
import { CardModal } from "./CardModal";

export default function Deck({ initialCards }: DeckProps) {
  const [cards, setCards] = useState<Carta[]>(initialCards);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState<Carta[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [modalCard, setModalCard] = useState<Carta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setActiveCardIndex(index);
  };

  const handleLeave = () => {
    setActiveCardIndex(null);
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-purple-300 smythe-regular">
        Thoth Tarot Reader
      </h1>

      <Button
        onClick={handleShuffle}
        disabled={isShuffling || selectedCards.length > 0}
        className="smythe-regular w-64 text-xl sm:text-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mb-6 mx-auto block transition duration-300 ease-in-out"
      >
        {isShuffling ? "Shuffling..." : "Shuffle Cards"}
      </Button>

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
            <Button
              onClick={() => !isShuffling && handleSelectCard(card)}
              className="bg-transparent"
            >
              <Image
                src={cardBackUrl}
                alt="Card Back"
                width={50}
                height={80}
                className="object-cover rounded-lg"
              />
            </Button>
          </div>
        ))}
      </div>

      <div
        id="selected-cards"
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {selectedCards.map((card, index) => (
          <div key={card.id} className="flex flex-col items-center">
            <h3 className="smythe-regular text-2xl font-bold mb-4 text-indigo-300">
              {index === 0
                ? "Mind (Past)"
                : index === 1
                ? "Body (Present)"
                : "Spirit (Future)"}
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
                  <p className="text-sm overflow-y-auto flex-grow">
                    {card.descrição_curta}
                  </p>
                  <Button
                    onClick={() => openModal(card)}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
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
        <Button
          onClick={handleReset}
          className="smythe-regular w-64 mt-12 text-xl sm:text-2xl bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg mx-auto block transition duration-300 ease-in-out"
        >
          New Reading
        </Button>
      )}

      <CardModal
        card={modalCard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
