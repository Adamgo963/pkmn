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

export type IRarity = {
  total: number;
  common: number;
  uncommon: number;
  rare: number;
  holoRare: number;
  amazingRare: number;
  ultraRare: number;
  secretRare: number;
}

export type IPokedexEntry = {
  number: number,
  name: string
}