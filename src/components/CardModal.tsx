import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CardModalProps {
  card: {
    nome: string;
    descrição_longa: string;
    significados_positivos: string[];
    significados_negativos: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export function CardModal({ card, isOpen, onClose }: CardModalProps) {
  if (!card) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{card.nome}</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Descrição</h2>
          <p>{card.descrição_longa}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Significados Positivos</h2>
          <ul className="list-disc ml-5">
            {card.significados_positivos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Significados Negativos</h2>
          <ul className="list-disc ml-5">
            {card.significados_negativos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
