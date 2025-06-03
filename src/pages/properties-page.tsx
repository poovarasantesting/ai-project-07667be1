import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ListFilter, Grid3X3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters } from "@/components/properties/property-filters";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { properties as allProperties } from "@/data/properties";
import { Property, PropertyFilters as FilterType } from "@/types/property";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PropertyMap } from "@/components/map/property-map";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(allProperties);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType>({});
  const location = useLocation();

  // Apply initial filters from URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialFilters: FilterType = {};
    
    const propertyType = searchParams.get('propertyType');
    const listingType = searchParams.get('listingType');
    const location = searchParams.get('location');
    
    if (propertyType) initialFilters.propertyType = propertyType as any;
    if (listingType) initialFilters.listingType = listingType as any;
    if (location) initialFilters.location = location;
    
    if (Object.keys(initialFilters).length > 0) {
      setActiveFilters(initialFilters);
      applyFilters(initialFilters);
    }
  }, [location.search]);

  const applyFilters = (filters: FilterType) => {
    let filtered = [...allProperties];
    
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(locationLower) || 
        property.state.toLowerCase().includes(locationLower) || 
        property.zipCode.includes(filters.location as string) ||
        property.address.toLowerCase().includes(locationLower)
      );
    }
    
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.propertyType === filters.propertyType
      );
    }
    
    if (filters.listingType) {
      filtered = filtered.filter(property => 
        property.listingType === filters.listingType
      );
    }
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(property => 
        property.price >= (filters.minPrice as number)
      );
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(property => 
        property.price <= (filters.maxPrice as number)
      );
    }
    
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(property => 
        property.bedrooms >= (filters.bedrooms as number)
      );
    }
    
    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter(property => 
        property.bathrooms >= (filters.bathrooms as number)
      );
    }
    
    setProperties(filtered);
    setActiveFilters(filters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden md:block w-80 flex-shrink-0">
              <PropertyFilters onFilter={applyFilters} />
            </div>
            
            {/* Mobile Filter Toggle & Results */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Properties
                  {properties.length > 0 && (
                    <span className="text-gray-500 font-normal text-lg ml-2">
                      ({properties.length})
                    </span>
                  )}
                </h1>
                
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={toggleFilters} 
                    variant="outline" 
                    className="md:hidden"
                  >
                    <ListFilter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  
                  <Tabs defaultValue="grid">
                    <TabsList>
                      <TabsTrigger value="grid">
                        <Grid3X3 className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="map">
                        <MapPin className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="grid" className="mt-0">
                      {/* Grid view is handled outside the tabs */}
                    </TabsContent>
                    
                    <TabsContent value="map" className="mt-6">
                      <PropertyMap properties={properties} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* Mobile Filters (Collapsible) */}
              {showFilters && (
                <div className="md:hidden mb-6">
                  <PropertyFilters onFilter={applyFilters} />
                </div>
              )}
              
              {/* Active Filters */}
              {Object.keys(activeFilters).length > 0 && (
                <div className="bg-white p-3 rounded-lg shadow-sm mb-6 flex flex-wrap gap-2">
                  <span className="text-gray-500 font-medium mr-2">Active filters:</span>
                  
                  {activeFilters.location && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Location: {activeFilters.location}
                    </span>
                  )}
                  
                  {activeFilters.propertyType && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                      Type: {activeFilters.propertyType}
                    </span>
                  )}
                  
                  {activeFilters.listingType && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                      {activeFilters.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  )}
                  
                  {(activeFilters.minPrice || activeFilters.maxPrice) && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Price: 
                      {activeFilters.minPrice && ` $${activeFilters.minPrice.toLocaleString()}`}
                      {activeFilters.minPrice && activeFilters.maxPrice && ' -'}
                      {activeFilters.maxPrice && ` $${activeFilters.maxPrice.toLocaleString()}`}
                    </span>
                  )}
                  
                  {activeFilters.bedrooms && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {activeFilters.bedrooms}+ Beds
                    </span>
                  )}
                  
                  {activeFilters.bathrooms && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {activeFilters.bathrooms}+ Baths
                    </span>
                  )}
                </div>
              )}
              
              {/* Property Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.length > 0 ? (
                  properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-xl text-gray-500">
                      No properties match your search criteria.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => applyFilters({})}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}