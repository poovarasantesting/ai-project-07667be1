import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Bookmark, 
  BedDouble, 
  Bath, 
  SquareCode, 
  Calendar, 
  Share2, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyMap } from "@/components/map/property-map";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    const foundProperty = properties.find(p => p.id === id);
    setProperty(foundProperty || null);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-xl mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/properties" className="hover:text-blue-600">Properties</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">{property.title}</span>
          </div>
          
          {/* Property Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="mb-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mr-2">
                    {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-medium capitalize">
                    {property.propertyType}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                
                <p className="text-gray-600 mb-4">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>
                
                <p className="text-3xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                  {property.listingType === 'rent' && <span className="text-lg text-gray-500 font-normal">/month</span>}
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Photos and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Gallery */}
              <PropertyGallery images={property.images} title={property.title} />
              
              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Property Details</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <BedDouble className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="font-semibold">{property.bedrooms}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="font-semibold">{property.bathrooms}</span>
                    <span className="text-sm text-gray-500">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <SquareCode className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="font-semibold">{property.squareFeet.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">Sq Ft</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="font-semibold">{property.yearBuilt}</span>
                    <span className="text-sm text-gray-500">Year Built</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Property Location */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <PropertyMap 
                  properties={[property]} 
                  center={[property.lat, property.lng]} 
                  zoom={15}
                  height="300px"
                />
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
                
                <div className="mb-6 flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Agent" 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">John Smith</h3>
                    <p className="text-gray-600 text-sm">Real Estate Agent</p>
                    <p className="text-blue-600 text-sm">(123) 456-7890</p>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="I'm interested in this property. Please contact me with more information."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <Button className="w-full">Contact Agent</Button>
                </form>
              </div>
              
              {/* Similar Properties */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Similar Properties</h2>
                
                <div className="space-y-4">
                  {properties
                    .filter(p => 
                      p.id !== property.id && 
                      p.propertyType === property.propertyType
                    )
                    .slice(0, 3)
                    .map(similarProperty => (
                      <Link 
                        key={similarProperty.id} 
                        to={`/properties/${similarProperty.id}`}
                        className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg"
                      >
                        <img 
                          src={similarProperty.images[0]} 
                          alt={similarProperty.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{similarProperty.title}</h3>
                          <p className="text-gray-600 text-sm">{similarProperty.city}, {similarProperty.state}</p>
                          <p className="text-blue-600 font-semibold">{formatPrice(similarProperty.price)}</p>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}