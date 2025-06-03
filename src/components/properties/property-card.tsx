import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { 
    id, 
    title, 
    price, 
    address, 
    city, 
    state, 
    bedrooms, 
    bathrooms, 
    squareFeet, 
    images,
    listingType
  } = property;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/properties/${id}`}>
          <img 
            src={images[0]} 
            alt={title}
            className="h-56 w-full object-cover"
          />
        </Link>
        <div className="absolute top-3 right-3">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <Heart className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            {listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/properties/${id}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">{title}</h3>
        </Link>
        
        <p className="text-gray-600 mb-3">{address}, {city}, {state}</p>
        
        <p className="text-xl font-bold text-blue-600 mb-3">
          {formatPrice(price)}
          {listingType === 'rent' && <span className="text-sm text-gray-500 font-normal">/month</span>}
        </p>
        
        <div className="flex justify-between text-gray-500 text-sm border-t pt-3">
          <div className="flex items-center">
            <span className="font-medium">{bedrooms}</span>
            <span className="ml-1">Bed{bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{bathrooms}</span>
            <span className="ml-1">Bath{bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{squareFeet.toLocaleString()}</span>
            <span className="ml-1">Sq Ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}