import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, QrCode, Download, Share, Clock, MapPin, User, CreditCard } from "lucide-react";

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

interface BookingConfirmationProps {
  bus: Bus;
  seatNumber: number;
  fare: number;
  user: { name: string; phone: string } | null;
  onBack: () => void;
}

const BookingConfirmation = ({ bus, seatNumber, fare, user, onBack }: BookingConfirmationProps) => {
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId] = useState(`CTB${Date.now().toString().slice(-6)}`);

  const handleConfirmBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      setIsBooked(true);
    }, 1500);
  };

  if (!isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Header */}
        <div className="gradient-primary text-white p-4 shadow-elegant">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Confirm Booking</h1>
                <p className="text-primary-foreground/80 text-sm">Review your booking details</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 max-w-4xl mx-auto">
          {/* Booking Details */}
          <Card className="mb-6 shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Booking Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Bus Number</label>
                  <div className="font-semibold text-lg text-primary">{bus.number}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Seat Number</label>
                  <div className="font-semibold text-lg">{seatNumber}</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Route</label>
                <div className="font-medium flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{bus.name}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Passenger</label>
                  <div className="font-medium flex items-center space-x-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.name}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">ETA</label>
                  <div className="font-medium flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{bus.eta} minutes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-6 shadow-card border-0 gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-primary text-2xl">₹{fare}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Base fare for single journey
              </div>
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button 
            onClick={handleConfirmBooking}
            className="w-full gradient-primary text-white font-semibold hover:scale-[1.02] transition-bounce h-14 text-lg"
          >
            <CreditCard className="w-6 h-6 mr-2" />
            Pay ₹{fare} & Confirm Booking
          </Button>
        </div>
      </div>
    );
  }

  // Booking Success State
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-50">
      <div className="p-4 max-w-4xl mx-auto pt-8">
        {/* Success Message */}
        <Card className="mb-6 shadow-elegant border-0 gradient-card text-center">
          <CardContent className="pt-8 pb-8">
            <div className="gradient-hero w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-4">Your seat has been successfully reserved</p>
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium">Booking ID: {bookingId}</span>
            </div>
          </CardContent>
        </Card>

        {/* Digital Ticket */}
        <Card className="mb-6 shadow-elegant border-2 border-primary/20 gradient-card">
          <CardHeader className="text-center border-b border-border">
            <CardTitle className="text-primary">Digital Ticket</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground">Bus</label>
                <div className="font-bold text-xl text-primary">{bus.number}</div>
                <div className="text-sm text-muted-foreground">{bus.name}</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Seat</label>
                <div className="font-bold text-xl">{seatNumber}</div>
                <div className="text-sm text-green-600">Confirmed</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground">Passenger</label>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground">{user?.phone}</div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Fare Paid</label>
                <div className="font-bold text-lg text-green-600">₹{fare}</div>
                <div className="text-sm text-muted-foreground">Digital Payment</div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Show this QR code to the conductor</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="h-12 border-primary text-primary hover:bg-primary/10">
            <Download className="w-5 h-5 mr-2" />
            Download Ticket
          </Button>
          <Button variant="outline" className="h-12 border-primary text-primary hover:bg-primary/10">
            <Share className="w-5 h-5 mr-2" />
            Share Ticket
          </Button>
        </div>

        {/* Important Instructions */}
        <Card className="mb-6 shadow-card border-0 bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-amber-800 mb-2">Important Instructions</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Show this digital ticket to the bus conductor</li>
              <li>• Arrive at the bus stop 5 minutes before ETA</li>
              <li>• Keep your phone charged for ticket verification</li>
              <li>• Contact support if the bus doesn't arrive within 15 minutes</li>
            </ul>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <Button 
          onClick={() => window.location.reload()}
          variant="outline" 
          className="w-full h-12 border-primary text-primary hover:bg-primary/10"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;