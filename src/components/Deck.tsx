'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from './ui/button';
import { CardModal } from './CardModal';
import { Carta, DeckProps } from '@/lib/types';
import ShufflingDeck from '@/helpers/ShufflingDeck';
import LoadingSpinner from '@/helpers/LoadingSpinner';
import { useFetchCard } from '@/hooks/useGetCards';

export default function Deck({ initialCards }: DeckProps) {
  const [cards, setCards] = useState<Carta[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<Carta[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [modalCardId, setModalCardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardBackUrl = process.env.NEXT_PUBLIC_CARD_BACK_URL || '/CardBack.jpeg';
  const placeholderUrl = '/question-mark.svg';

  const { data: modalCard, isLoading } = useFetchCard(modalCardId);

  const handleShuffle = () => setIsShuffling(true);

  const handleSelectCard = (card: Carta) => {
    if (selectedCards.length < 3 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleReset = () => setSelectedCards([]);

  const openModal = (card: Carta) => {
    setModalCardId(card.id.toString());
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 bg-gray-900 text-gray-100">
      {/* Shuffle button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={handleShuffle}
          disabled={isShuffling || selectedCards.length > 0}
          className="bg-indigo-500 hover:bg-indigo-900 rounded-lg custom-button-1"
        >
          {isShuffling ? 'Embaralhando...' : 'Embaralhar Deck'}
        </Button>
      </div>

      {/* Shuffling deck */}
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

      {/* Selected cards */}
      <div id="selected-cards" className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {['Mente (Passado)', 'Corpo (Presente)', 'Espirito (Futuro)'].map((title, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="smythe-regular text-2xl font-bold mb-4 text-indigo-500">
              {title}
            </h3>
            <AnimatePresence>
              {selectedCards[index] ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className={`flip-card ${selectedCards[index].isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => {
                    const updatedCards = selectedCards.map((card) =>
                      card.id === selectedCards[index].id
                        ? { ...card, isFlipped: !card.isFlipped }
                        : card
                    );
                    setSelectedCards(updatedCards);
                    openModal(selectedCards[index]);
                  }}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="w-full h-full relative overflow-hidden rounded-lg">
                        <Image
                          src={selectedCards[index].url_da_imagem || '/fallback-image.jpg'}
                          alt={selectedCards[index].nome || 'Unknown Card'}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <h2 className="text-xl font-semibold mb-2">{selectedCards[index].nome}</h2>
                      <p className="text-center text-xs overflow-y-auto flex-grow">
                        {selectedCards[index].descrição_curta}
                      </p>
                      <Button
                        onClick={() => openModal(selectedCards[index])}
                        className="mt-4 bg-slate-500 hover:bg-slate-900 custom-button-2"
                      >
                        View Full Description
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="card-container"
                >
                  <Image
                    src={placeholderUrl}
                    alt="Card Placeholder"
                    layout="fill"
                    objectFit="contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Reset button */}
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

      {/* Card modal */}
      <CardModal
        card={modalCard}
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
