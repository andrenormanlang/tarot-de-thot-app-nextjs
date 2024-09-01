import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carta } from '@/lib/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CardModalProps {
  card: Carta | null;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose, children }) => {
  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-gray-900 text-purple-400 max-w-3xl w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto max-h-[80vh] overflow-y-auto rounded-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7 }}
            >
              <DialogHeader>
                <DialogTitle className="smythe-regular text-2xl md:text-3xl w-full text-center">
                  {card.nome}
                </DialogTitle>
              </DialogHeader>
              <div className="px-4 py-3 md:px-6 md:py-4 space-y-6">
                <div className="flex flex-col items-center">
                  <Image
                    src={card.url_da_imagem || "/fallback-image.jpg"} // Provide a fallback image
                    alt={card.nome}
                    width={200}
                    height={320}
                    className="rounded-lg"
                  />
                  <p className="text-center text-lg mt-4 smythe-regular">{card.número_significado}</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Descrição:</p>
                  <p className="text-base md:text-lg old-standard-tt-regular">{card.descrição_longa}</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Planeta Governante:</p>
                  <p className="text-base md:text-lg old-standard-tt-regular">{card.planeta_governante}</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Atributos:</p>
                  <ul className="text-base md:text-lg old-standard-tt-regular list-disc pl-5">
                    {card.atributos?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Significados Positivos:</p>
                  <ul className="text-base md:text-lg old-standard-tt-regular list-disc pl-5">
                    {card.significados_positivos?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Significados Negativos:</p>
                  <ul className="text-base md:text-lg old-standard-tt-regular list-disc pl-5">
                    {card.significados_negativos?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Significado Reverso:</p>
                  <p className="text-base md:text-lg old-standard-tt-regular">{card.significado_reverso}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Conselho:</p>
                  <p className="text-base md:text-lg old-standard-tt-regular">{card.conselho}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Pergunta:</p>
                  <p className="text-base md:text-lg old-standard-tt-regular">{card.pergunta}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Palavras-Chave:</p>
                  <ul className="text-base md:text-lg old-standard-tt-regular list-disc pl-5">
                    {card.palavras_chave?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl old-standard-tt-bold">Revelação:</p>
                  <p className="text-base md:text-lg old-standard-tt-regular italic">
                    &apos;{card.revelação}&apos;
                  </p>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};