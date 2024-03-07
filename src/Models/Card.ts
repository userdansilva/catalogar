import { cards } from "../data";

export type ICard = {
  id: number;
  title: string;
  type: CardType;
  image: string;
}

type CardType = {
  code: "CAP"
  description: "boné"
} | {
  code: "TSHIRT"
  description: "camisa"
} | {
  code: "MUG"
  description: "caneca"
}

export const Card = {
  getAll: (): ICard[] => {
    return cards;
  },
  getByTitle: (query: string): ICard[] => {
    return cards
      .filter(({ title }) => title
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query
          .toLowerCase()
          .replace(/\s+/g, '')));
  },
  getByType: (code: CardType["code"]): ICard[] => {
    return cards.filter((card) => card.type.code === code);
  }
}