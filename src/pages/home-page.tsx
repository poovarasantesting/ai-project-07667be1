import { Link } from "react-router-dom";
import { ArrowRight, Home, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertyCard } from "@/components/properties/property-card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { properties } from "@/data/properties";

export default function HomePage() {
  // Get a sample of featured properties
  const featuredProperties = properties.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
            alt="Luxury home exterior" 
            className="w-full h-[600px] object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Find Your Dream Home
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Discover thousands of properties for sale and rent across the country.
                </p>
                
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                      <Input 
                        placeholder="Enter a location"
                        className="pl-10 h-12"
                      />
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button className="h-12" size="lg">
                      <Search className="mr-2 h-5 w-5" />
                      Search
                    </Button>
                  </div>
                  
                  <div className="flex gap-3 mt-3">
                    <Link to="/properties?listingType=sale" className="text-blue-600 hover:underline flex items-center">
                      <Home className="h-4 w-4 mr-1" /> Buy
                    </Link>
                    <Link to="/properties?listingType=rent" className="text-blue-600 hover:underline flex items-center">
                      <Home className="h-4 w-4 mr-1" /> Rent
                    </Link>
                    <Link to="/map" className="text-blue-600 hover:underline flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> Map View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Properties */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
              <Link to="/properties" className="text-blue-600 hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Property Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Browse by Property Type
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Houses",
                  image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                  link: "/properties?propertyType=house"
                },
                {
                  title: "Apartments",
                  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                  link: "/properties?propertyType=apartment"
                },
                {
                  title: "Condos",
                  image: "https://images.unsplash.com/photo-1551361415-69c87624334f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                  link: "/properties?propertyType=condo"
                },
                {
                  title: "Land",
                  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                  link: "/properties?propertyType=land"
                }
              ].map((item, index) => (
                <Link 
                  key={index}
                  to={item.link}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your search today and discover the perfect property that meets all your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Properties
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <MapPin className="mr-2 h-5 w-5" />
                View Map
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}