import { HomeIcon, MapPinIcon, MenuIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <HomeIcon className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-800">HomeFind</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/properties" className="text-gray-700 hover:text-blue-600 font-medium">
            Properties
          </Link>
          <Link to="/map" className="text-gray-700 hover:text-blue-600 font-medium">
            Map View
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button className="hidden md:flex">
            <MapPinIcon className="h-4 w-4 mr-2" />
            List Property
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}