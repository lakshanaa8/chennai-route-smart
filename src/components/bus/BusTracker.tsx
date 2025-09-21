import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Navigation, Clock, Users, Star } from "lucide-react";
import BusList from "./BusList";
import SeatSelection from "./SeatSelection";

interface BusTrackerProps {
  user: { name: string; phone: string } | null;
}

interface Bus {
  id: string;
  number: string;
  name: string;
  eta: number;
  status: "on-time" | "delayed" | "early";
  occupancy: number;
  rating: number;
  route: string;
}

interface Location {
  name: string;
  area: string;
  buses: Bus[];
}

const BusTracker = ({ user }: BusTrackerProps) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [step, setStep] = useState<"location" | "buses" | "seats">("location");

  // Simulate location detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLocation({
        name: "T. Nagar Bus Stop",
        area: "T. Nagar, Chennai",
        buses: [
          {
            id: "1",
            number: "18C",
            name: "Broadway - Adambakkam",
            eta: 5,
            status: "on-time",
            occupancy: 65,
            rating: 4.2,
            route: "Broadway → Anna Nagar → T.Nagar → Adambakkam"
          },
          {
            id: "2", 
            number: "21G",
            name: "Broadway - Airport",
            eta: 8,
            status: "delayed",
            occupancy: 80,
            rating: 4.0,
            route: "Broadway → Central → Airport"
          },
          {
            id: "3",
            number: "70",
            name: "Anna Nagar - Tambaram",
            eta: 12,
            status: "early",
            occupancy: 45,
            rating: 4.5,
            route: "Anna Nagar → T.Nagar → Tambaram"
          }
        ]
      });
      setStep("buses");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
    setStep("seats");
  };

  const handleBackToBuses = () => {
    setSelectedBus(null);
    setStep("buses");
  };

  if (step === "location") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant border-0 gradient-card">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Detecting your location...</h2>
            <p className="text-muted-foreground mb-4">
              Finding the nearest bus stops around you
            </p>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "seats" && selectedBus) {
    return (
      <SeatSelection
        bus={selectedBus}
        onBack={handleBackToBuses}
        user={user}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="gradient-primary text-white p-4 shadow-elegant">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold">Hello, {user?.name}!</h1>
              <p className="text-primary-foreground/80 text-sm">Track your bus in real-time</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">{user?.name?.[0]}</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Find route or search bus number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-smooth"
            />
          </form>
        </div>
      </div>

      {/* Current Location */}
      {currentLocation && (
        <div className="p-4 max-w-4xl mx-auto">
          <Card className="mb-6 shadow-card border-0 gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{currentLocation.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentLocation.area}</p>
                </div>
                <div className="text-right">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bus List */}
          <BusList 
            buses={currentLocation.buses} 
            onBusSelect={handleBusSelect}
          />
        </div>
      )}
    </div>
  );
};

export default BusTracker;