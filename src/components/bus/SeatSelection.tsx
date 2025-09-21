import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, MapPin, CreditCard, Ticket } from "lucide-react";
import BookingConfirmation from "./BookingConfirmation";

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

interface SeatSelectionProps {
  bus: Bus;
  onBack: () => void;
  user: { name: string; phone: string } | null;
}

const SeatSelection = ({ bus, onBack, user }: SeatSelectionProps) => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  // Simulate seat layout (40-seater bus)
  const generateSeatLayout = () => {
    const totalSeats = 40;
    const occupiedSeats = Math.floor((bus.occupancy / 100) * totalSeats);
    const seats = [];
    
    for (let i = 1; i <= totalSeats; i++) {
      const isOccupied = i <= occupiedSeats;
      seats.push({
        number: i,
        status: isOccupied ? "occupied" : "available"
      });
    }
    
    return seats;
  };

  const seats = generateSeatLayout();
  const fare = 25; // Fixed fare for demo

  const handleSeatSelect = (seatNumber: number) => {
    if (seats.find(s => s.number === seatNumber)?.status === "available") {
      setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
    }
  };

  const handleBookSeat = () => {
    if (selectedSeat) {
      setShowBooking(true);
    }
  };

  if (showBooking) {
    return (
      <BookingConfirmation
        bus={bus}
        seatNumber={selectedSeat!}
        fare={fare}
        user={user}
        onBack={() => setShowBooking(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="gradient-primary text-white p-4 shadow-elegant">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Select Your Seat</h1>
              <p className="text-primary-foreground/80 text-sm">Bus {bus.number} - {bus.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{bus.eta}m</div>
              <div className="text-xs text-primary-foreground/80">ETA</div>
            </div>
            <div>
              <div className="text-lg font-bold">₹{fare}</div>
              <div className="text-xs text-primary-foreground/80">Fare</div>
            </div>
            <div>
              <div className="text-lg font-bold">{bus.occupancy}%</div>
              <div className="text-xs text-primary-foreground/80">Occupied</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Route Info */}
        <Card className="mb-6 shadow-card border-0 gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{bus.route}</span>
            </div>
          </CardContent>
        </Card>

        {/* Seat Legend */}
        <Card className="mb-6 shadow-card border-0 gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded border-2 border-green-600"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded border-2 border-red-600"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded border-2 border-primary"></div>
                <span>Selected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bus Layout */}
        <Card className="mb-6 shadow-card border-0 gradient-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">Bus Interior Layout</CardTitle>
            <div className="flex justify-center">
              <div className="w-16 h-4 bg-muted rounded-t-lg border-2 border-border">
                <div className="text-xs text-center text-muted-foreground mt-0.5">Driver</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {seats.map((seat) => (
                <button
                  key={seat.number}
                  onClick={() => handleSeatSelect(seat.number)}
                  disabled={seat.status === "occupied"}
                  className={`
                    w-12 h-12 rounded border-2 text-sm font-semibold transition-all duration-200
                    ${seat.status === "occupied" 
                      ? "bg-red-500 border-red-600 text-white cursor-not-allowed" 
                      : selectedSeat === seat.number
                        ? "bg-primary border-primary text-white scale-110"
                        : "bg-green-500 border-green-600 text-white hover:scale-105 hover:bg-green-400"
                    }
                  `}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedSeat && (
          <Card className="mb-6 shadow-card border-0 gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Booking Summary</h3>
                  <p className="text-sm text-muted-foreground">Seat {selectedSeat} selected</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{fare}</div>
                  <div className="text-sm text-muted-foreground">Total Fare</div>
                </div>
              </div>
              
              <Button 
                onClick={handleBookSeat}
                className="w-full gradient-primary text-white font-semibold hover:scale-[1.02] transition-bounce h-12"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Book Seat {selectedSeat}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Live Occupancy */}
        <Card className="shadow-card border-0 gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Live Occupancy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${bus.occupancy}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{bus.occupancy}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeatSelection;