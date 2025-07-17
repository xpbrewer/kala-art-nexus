import { Heart, MapPin, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ArtForm {
  id: string;
  title: string;
  description: string;
  origin: string;
  type: string;
  imageUrl1: string;
  imageUrl2?: string;
  imageUrl3?: string;
  likes: number;
}

interface ArtCardProps {
  artForm: ArtForm;
  onLike?: (id: string) => void;
  onClick?: (artForm: ArtForm) => void;
  isLiked?: boolean;
}

export const ArtCard = ({ artForm, onLike, onClick, isLiked = false }: ArtCardProps) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(artForm.id);
  };

  return (
    <Card 
      className="art-card cursor-pointer overflow-hidden bg-card border-border group"
      onClick={() => onClick?.(artForm)}
    >
      <div className="relative">
        <img
          src={artForm.imageUrl1}
          alt={artForm.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white text-primary"
          onClick={handleLike}
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
          />
          <span className="ml-1 text-xs">{artForm.likes}</span>
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
            {artForm.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {artForm.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {artForm.origin}
              </div>
              
              <Badge variant="secondary" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                {artForm.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};