import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PropertyFilters as FilterType } from "@/types/property";

interface PropertyFiltersProps {
  onFilter: (filters: FilterType) => void;
}

export function PropertyFilters({ onFilter }: PropertyFiltersProps) {
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [listingType, setListingType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000000]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  
  const handleResetFilters = () => {
    setLocation("");
    setPropertyType("");
    setListingType("");
    setPriceRange([0, 5000000]);
    setBedrooms("");
    setBathrooms("");
    
    onFilter({});
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: FilterType = {};
    
    if (location) filters.location = location;
    if (propertyType) filters.propertyType = propertyType as any;
    if (listingType) filters.listingType = listingType as any;
    if (priceRange[0] > 0) filters.minPrice = priceRange[0];
    if (priceRange[1] < 5000000) filters.maxPrice = priceRange[1];
    if (bedrooms) filters.bedrooms = parseInt(bedrooms);
    if (bathrooms) filters.bathrooms = parseInt(bathrooms);
    
    onFilter(filters);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        
        <div className="relative">
          <Input
            placeholder="Location (City, State, Zip)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Any Type</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Listing Type</label>
            <Select value={listingType} onValueChange={setListingType}>
              <SelectTrigger>
                <SelectValue placeholder="Buy or Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Listings</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Price Range</label>
            <span className="text-sm text-gray-500">
              ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </span>
          </div>
          <Slider
            value={priceRange}
            min={0}
            max={5000000}
            step={50000}
            onValueChange={setPriceRange}
            className="py-4"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bathrooms</label>
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </form>
  );
}