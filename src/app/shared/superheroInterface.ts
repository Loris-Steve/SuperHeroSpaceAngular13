export interface SuperHero {
    "id": number,
    "name": string,
    "favorite": boolean,
    "powerstats": {
      [key: string]: number,
      "intelligence": number,
      "strength": number,
      "speed": number,
      "durability": number,
      "power": number,
      "combat": number
    },
    "biography": {
      "full-name": string,
      "alter-egos": string,
      "aliases": string[],
      "place-of-birth": string,
      "first-appearance": string,
      "publisher": string,
      "alignment": string
    },
    "appearance": {
      "gender": string,
      "race": string,
      "height": string[],
      "weight": string[],
      "eye-color": string,
      "hair-color": string
    },
    "work": {
      "occupation": string,
      "base": string
    },
    "connections": {
      "group-affiliation": string,
      "relatives": string
    },
    "image": {
      "url": string
    }
  }