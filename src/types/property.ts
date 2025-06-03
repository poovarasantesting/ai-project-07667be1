export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: PropertyType;
  listingType: ListingType;
  yearBuilt: number;
  features: string[];
  images: string[];
  lat: number;
  lng: number;
}

export type PropertyType = 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
export type ListingType = 'sale' | 'rent';

export interface PropertyFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  listingType?: ListingType;
}