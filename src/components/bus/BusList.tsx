import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Star, MapPin, AlertCircle } from "lucide-react";

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

interface BusListProps {
  buses: Bus[];
  onBusSelect: (bus: Bus) => void;
}

const BusList = ({ buses, onBusSelect }: BusListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time": return "status-on-time";
      case "delayed": return "status-delayed";
      case "early": return "status-early";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-time": return "On Time";
      case "delayed": return "Delayed";
      case "early": return "Early";
      default: return "Unknown";
    }
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return "text-red-500";
    if (occupancy >= 60) return "text-yellow-500";
    return "text-green-500";
  };

  const getOccupancyText = (occupancy: number) => {
    if (occupancy >= 80) return "Crowded";
    if (occupancy >= 60) return "Moderate";
    return "Available";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Available Buses</h2>
        <span className="text-sm text-muted-foreground">{buses.length} buses found</span>
      </div>
      
      {buses.map((bus) => (
        <Card key={bus.id} className="shadow-card border-0 gradient-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl font-bold text-primary">{bus.number}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                    {getStatusText(bus.status)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{bus.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {bus.route}
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{bus.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-lg font-bold text-foreground">{bus.eta}m</div>
                  <div className="text-xs text-muted-foreground">ETA</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className={`w-4 h-4 ${getOccupancyColor(bus.occupancy)}`} />
                <div>
                  <div className="text-sm font-medium text-foreground">{bus.occupancy}%</div>
                  <div className={`text-xs ${getOccupancyColor(bus.occupancy)}`}>
                    {getOccupancyText(bus.occupancy)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Live</div>
                  <div className="text-xs text-muted-foreground">Tracking</div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => onBusSelect(bus)}
              className="w-full gradient-primary text-white font-semibold hover:scale-[1.02] transition-bounce"
            >
              Book This Bus
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusList;