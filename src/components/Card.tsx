import Image from "next/image";
import { Card as UiCard } from "@/components/ui/card";

interface CardProps {
  card: {
    id: number;
    nome: string;
    descrição_curta: string;
    url_da_imagem: string;
  };
  onClick?: () => void;
}

export function Card({ card, onClick }: CardProps) {
  return (
    <UiCard className="w-24 h-36 cursor-pointer" onClick={onClick}>
      <div className="w-full h-full bg-gray-300 flex flex-col items-center justify-center">
        <Image src={card.url_da_imagem} alt={card.nome} className="h-20 w-auto mb-2" />
        <p className="text-center text-sm font-semibold">{card.nome}</p>
      </div>
    </UiCard>
  );
}
