import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carta } from '@/lib/types';

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
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    if (isShuffling) {
      const newPositions = cards.map((_, index) => index);
      setPositions(newPositions);

      const animation = setInterval(() => {
        setPositions((prevPositions) => {
          const shuffled = [...prevPositions].sort(() => Math.random() - 0.5);
          return shuffled;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(animation);
        const shuffledCards = positions.map((pos) => cards[pos]);
        onShuffleComplete(shuffledCards);
      }, 2000);
    }
  }, [isShuffling, cards, onShuffleComplete, positions]);

  return (
    <div className="relative h-36 sm:h-48 mt-2 flex justify-center items-center overflow-hidden mx-auto">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="card-container"
            initial={{ scale: 1, rotateY: 0 }}
            animate={{
              x: isShuffling ? Math.random() * 100 - 50 : index * 20 - (cards.length - 1) * 10, // Adjusted for tighter overlap
              y: isShuffling ? Math.random() * 100 - 50 : 0,
              rotateY: isShuffling ? [0, 180, 360] : 0,
              zIndex: positions[index] || index,
            }}
            transition={{
              duration: 0.5,
              repeat: isShuffling ? 3 : 0,
              repeatType: "mirror",
            }}
            onClick={() => !isShuffling && onSelectCard(card)}
          >
            <Image
              src={cardBackUrl}
              alt="Card Back"
              width={50}
              height={80}
              className="object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ShufflingDeck;
