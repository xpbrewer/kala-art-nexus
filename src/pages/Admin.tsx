import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  BarChart3, 
  Heart, 
  MapPin, 
  Palette, 
  Plus, 
  Settings,
  Users,
  LogIn
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  // Mock admin credentials
  const adminCredentials = {
    username: "admin",
    password: "kala123"
  };

  // Mock statistics
  const stats = {
    totalArtForms: 25,
    totalLikes: 1247,
    artByType: {
      Painting: 12,
      Dance: 6,
      Textile: 4,
      Sculpture: 2,
      Music: 1
    },
    artByOrigin: {
      Kerala: 5,
      Rajasthan: 4,
      Maharashtra: 3,
      "Tamil Nadu": 3,
      "West Bengal": 2,
      Gujarat: 2,
      Others: 6
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Login Failed", 
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleAddArtForm = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add to Supabase
    toast({
      title: "Art Form Added",
      description: "New art form has been successfully added!",
    });
    setShowAddForm(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background texture-paper">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-sari rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-heading text-2xl">Admin Login</CardTitle>
                <p className="text-muted-foreground">
                  Access the Kalakritiyan admin panel
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Demo credentials: admin / kala123
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background texture-paper">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage art forms and view platform statistics</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Art Form
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Art Forms</p>
                <p className="text-2xl font-bold text-primary">{stats.totalArtForms}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mr-4">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold text-red-500">{stats.totalLikes}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mr-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Art Types</p>
                <p className="text-2xl font-bold text-accent">{Object.keys(stats.artByType).length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mr-4">
                <MapPin className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Regions</p>
                <p className="text-2xl font-bold text-success">{Object.keys(stats.artByOrigin).length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Art Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Art Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddArtForm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" placeholder="Art form title" required />
                </div>
                
                <div>
                  <Label htmlFor="origin">Origin *</Label>
                  <Input id="origin" placeholder="e.g., Kerala" required />
                </div>
                
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Input id="type" placeholder="e.g., Painting, Dance" required />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl1">Image URL 1 *</Label>
                  <Input id="imageUrl1" type="url" placeholder="Primary image URL" required />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl2">Image URL 2</Label>
                  <Input id="imageUrl2" type="url" placeholder="Optional second image" />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl3">Image URL 3</Label>
                  <Input id="imageUrl3" type="url" placeholder="Optional third image" />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Detailed description of the art form"
                    className="min-h-[100px]"
                    required 
                  />
                </div>
                
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit">Add Art Form</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Statistics Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Art Forms by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.artByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm">{type}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Art Forms by Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.artByOrigin).map(([origin, count]) => (
                  <div key={origin} className="flex justify-between items-center">
                    <span className="text-sm">{origin}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;