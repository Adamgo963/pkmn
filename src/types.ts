export type IPkmnCard = {
    id: string;
    name: string;
    number: number;
    rarity: string;
    images: {
      small: string;
      large: string;
    }
  };