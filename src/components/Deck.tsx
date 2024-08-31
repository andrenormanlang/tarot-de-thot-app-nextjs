"use client";

import { CardModal } from "./CardModal";
import Image from "next/image";
import { useState } from "react";
import { Carta, DeckProps } from "@/lib/types";
import { Button } from "./ui/button";
import ShufflingDeck from "@/helpers/ShufflingDeck";
import LoadingSpinner from "@/helpers/LoadingSpinner";
import { useFetchCard } from "@/hooks/useGetCards";

export default function Deck({ initialCards }: DeckProps) {
  const [cards, setCards] = useState<Carta[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<Carta[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [modalCardId, setModalCardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardBackUrl = process.env.NEXT_PUBLIC_CARD_BACK_URL || "/CardBack.jpeg";

  const { data: modalCard, isLoading } = useFetchCard(modalCardId);

  const handleShuffle = () => {
    setIsShuffling(true);
  };

  const handleSelectCard = (card: Carta) => {
    if (selectedCards.length < 3 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleReset = () => {
    setSelectedCards([]);
  };

  const openModal = (card: Carta) => {
    setModalCardId(card.id.toString()); // Convert the card ID to a string
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
          {isShuffling ? "Embaralhando..." : "Embaralhar Deck"}
        </Button>
      </div>

      <ShufflingDeck
        cards={cards}
        cardBackUrl={cardBackUrl}
        isShuffling={isShuffling}
        onShuffleComplete={(newCards) => {
          setCards(newCards);
          setIsShuffling(false);
        }}
        onSelectCard={handleSelectCard}
      />

      <div
        id="selected-cards"
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {selectedCards.map((card, index) => (
          <div 
            key={card.id} 
            className="flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-10 hover:z-30 -mr-8 last:mr-0 cursor-pointer" 
            onClick={() => handleSelectCard(card)}        
          >
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
          >
            Nova Tiragem?
          </Button>
        </div>
      )}

      <CardModal
        card={modalCard} // Card data will be null if loading
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          modalCard && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{modalCard.nome}</h2>
              <p>{modalCard.descrição_longa}</p>
            </div>
          )
        )}
      </CardModal>
    </div>
  );
}
