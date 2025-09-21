import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus, Smartphone } from "lucide-react";

interface AuthPageProps {
  onLogin: (userData: { name: string; phone: string }) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: ""
  });
  const [step, setStep] = useState<"auth" | "otp">("auth");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "auth") {
      // Simulate OTP step
      setStep("otp");
    } else {
      // Simulate successful login
      onLogin({ name: formData.name || "User", phone: formData.phone });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="gradient-hero w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chennai Bus Tracker</h1>
          <p className="text-muted-foreground">Smart. Fast. Reliable.</p>
        </div>

        <Card className="shadow-elegant border-0 gradient-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {step === "auth" ? (isLogin ? "Welcome Back" : "Get Started") : "Verify Phone"}
            </CardTitle>
            <CardDescription>
              {step === "auth" 
                ? "Track buses in real-time across Chennai" 
                : `Enter the OTP sent to ${formData.phone}`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === "auth" ? (
                <>
                  {!isLogin && (
                    <div>
                      <Input
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="h-12 border-border focus:ring-primary transition-smooth"
                        required
                      />
                    </div>
                  )}
                  
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="h-12 pl-12 border-border focus:ring-primary transition-smooth"
                      required
                    />
                  </div>
                </>
              ) : (
                <div>
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                    className="h-12 text-center text-lg tracking-widest border-border focus:ring-primary transition-smooth"
                    maxLength={6}
                    required
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 gradient-primary text-white font-semibold hover:scale-[1.02] transition-bounce shadow-card"
              >
                {step === "auth" ? "Continue" : "Verify & Login"}
              </Button>
            </form>
            
            {step === "auth" && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                >
                  {isLogin ? "New user? Sign up" : "Already have account? Login"}
                </button>
              </div>
            )}
            
            {step === "otp" && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setStep("auth")}
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                >
                  ← Change Phone Number
                </button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Live Tracking</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Seat Booking</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Digital Tickets</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;