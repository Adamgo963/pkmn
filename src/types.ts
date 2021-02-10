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

export type IPkmnSet = {
  id: string;
  name: string;
  total: number;
  releaseDate: string;
  images: {
    symbol: string;
    logo: string;
  }
}

export type IView = 'Grid' | 'List';