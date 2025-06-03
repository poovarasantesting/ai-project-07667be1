import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { PropertyMap } from "@/components/map/property-map";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { properties as allProperties } from "@/data/properties";
import { Property, PropertyFilters } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertyCard } from "@/components/properties/property-card";
import { Link } from "react-router-dom";

export default function MapViewPage() {
  const [properties, setProperties] = useState<Property[]>(allProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setProperties(allProperties);
      return;
    }

    const filtered = allProperties.filter(property => {
      const query = searchQuery.toLowerCase();
      return (
        property.city.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query) ||
        property.zipCode.includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.title.toLowerCase().includes(query)
      );
    });

    setProperties(filtered);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className={`bg-white border-r ${showSidebar ? 'w-full md:w-96' : 'hidden'} md:flex flex-col`}>
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Map Search</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Search by location, city, zip..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-grow overflow-auto p-4">
            <div className="mb-4">
              <p className="text-gray-500">
                {properties.length} properties found
              </p>
            </div>
            
            <div className="space-y-4">
              {properties.map(property => (
                <Link 
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="block"
                >
                  <div className="border rounded-lg hover:shadow-md transition-shadow">
                    <PropertyCard property={property} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="flex-grow relative">
          {!showSidebar && (
            <Button
              variant="default"
              className="absolute top-4 left-4 z-10"
              onClick={toggleSidebar}
            >
              <Search className="h-4 w-4 mr-2" />
              Show Results
            </Button>
          )}
          
          <PropertyMap 
            properties={properties} 
            height="100%" 
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}