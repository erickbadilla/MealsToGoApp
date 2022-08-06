export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface OpeningHours {
  openNow: boolean;
}

export interface PlusCode {
  compoundCode: string;
  globalCode: string;
}

export interface Restaurant {
  businessStatus: string;
  geometry: Geometry;
  ix: string;
  name: string;
  openingHours: OpeningHours;
  photos: string[];
  placeId: string;
  plusCode: PlusCode;
  priceLevel: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  userRatingsTotal: number;
  vicinity: string;
  isClosedTemporarily: boolean;
}
