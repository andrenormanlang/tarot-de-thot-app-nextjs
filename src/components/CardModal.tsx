import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carta } from '@/lib/types';

interface CardModalProps {
  card: Carta | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose }) => {
  if (!card) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-purple-400 max-w-3xl w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="smythe-regular text-2xl md:text-3xl w-full text-center">{card.nome}</DialogTitle>
        </DialogHeader>
        <div className="px-4 py-3 md:px-6 md:py-4">
          <p className="text-lg md:text-2xl old-standard-tt-bold mb-2">Descrição:</p>
          <p className="text-base md:text-xl old-standard-tt-regular mb-4">{card.descrição_longa}</p>
          <hr className="my-4 border-gray-600"/>
          <p className="text-lg md:text-2xl old-standard-tt-bold mb-2">Significados Positivos:</p>
          <ul className="text-base md:text-xl old-standard-tt-regular list-disc pl-5 mb-4">
            {card.significados_positivos && card.significados_positivos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-lg md:text-2xl old-standard-tt-bold mb-2">Significados Negativos:</p>
          <ul className="text-base md:text-xl old-standard-tt-regular list-disc pl-5">
            {card.significados_negativos && card.significados_negativos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

