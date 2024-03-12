export type CardDTO = {
  id: number;
  title: string;
  type: CardType;
  image: string;
}

type CardType = {
  code: "CAP" | "TSHIRT" | "MUG"
  description: string
}

const cards: CardDTO[] = [
  {
    id: 1,
    title: "A caneca é de cachaceira mas o coração é de mocinha",
    type: {
      code: "TSHIRT",
      description: "camisa",
    },
    image: "/tshirts/6e3d3540-1636-4965-bba0-9b9b1fcb02b1.webp"
  },
  {
    id: 2,
    title: "Catalogar",
    type: {
      code: "CAP",
      description: "boné",
    },
    image: "/caps/trPCA2kHbH8pWBWPbatGjYoIAs5X66MonmMglaOX.webp"
  },
  {
    id: 3,
    title: "Catalogar",
    type: {
      code: "MUG",
      description: "caneca",
    },
    image: "/mugs/1D1tc3rd8WTOoSNjzooRtULLlGcB6yooIXCnUN3K.webp"
  },
]

export const Card = {
  getAll: (): CardDTO[] => {
    return cards;
  },
  getByTitle: (query: string): CardDTO[] => {
    const normalizeString = (s: string) => s
      .toLowerCase()
      .replace(/\s+/g, '')

    return cards
      .filter(({ title }) => normalizeString(title)
        .includes(normalizeString(query)));
  },
  getByTypeCode: (typeCode: CardType["code"]): CardDTO[] => {
    return cards.filter((card) => card.type.code === typeCode);
  }
}
