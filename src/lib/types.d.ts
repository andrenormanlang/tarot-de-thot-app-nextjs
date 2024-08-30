// src/lib/types.d.ts

export interface Carta {
    id: number | string;
    nome: string;
    número_significado: string;
    descrição_curta: string;
    descrição_longa?: string;
    url_da_imagem?: string;
    planeta_governante?: string;
    zodíaco?: string;
    árvore_da_vida?: string;
    atributos?: string[];
    elemento?: string;
    significados_positivos?: string[];
    significados_negativos?: string[];
    significado_reverso?: string;
    conselho?: string;
    pergunta?: string;
    confirmação?: string;
    determinação?: string[];
    palavras_chave?: string[];
    revelação?: string;
  }
  
  export interface DeckProps {
    initialCards: Card[];
  }
  
  export interface ReadingProps {
    cards: Card[];
  }
  
  export interface CardModalProps {
    card: Card;
    isOpen: boolean;
    onClose: () => void;
  }
  