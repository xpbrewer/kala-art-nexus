import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, Search, Settings } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-sari rounded-lg flex items-center justify-center">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-primary">
                Kalakritiyan
              </h1>
              <p className="text-xs text-muted-foreground">
                Discover Indian Art
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            
            <Button
              variant={location.pathname === "/discover" ? "default" : "ghost"}
              asChild
            >
              <Link to="/discover">
                <Search className="h-4 w-4 mr-2" />
                Discover
              </Link>
            </Button>

            <Button
              variant={location.pathname === "/admin" ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/admin">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};