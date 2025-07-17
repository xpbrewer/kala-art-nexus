import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, MapPin, Palette } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ArtForm } from "@/types/artForm";
import { useToast } from "@/hooks/use-toast";

const ArtFormDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artForm, setArtForm] = useState<ArtForm | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchArtForm();
    }
  }, [id]);

  const fetchArtForm = async () => {
    try {
      const { data, error } = await supabase
        .from('art_forms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setArtForm(data);
    } catch (error) {
      console.error('Error fetching art form:', error);
      toast({
        title: "Error",
        description: "Failed to load art form details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!artForm) return;

    try {
      const newLikes = isLiked ? artForm.likes - 1 : artForm.likes + 1;
      
      const { error } = await supabase
        .from('art_forms')
        .update({ likes: newLikes })
        .eq('id', artForm.id);

      if (error) throw error;

      setArtForm({ ...artForm, likes: newLikes });
      setIsLiked(!isLiked);

      toast({
        title: isLiked ? "Like removed" : "Art form liked!",
        description: isLiked ? "Removed from favorites" : "Added to favorites",
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background texture-paper">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!artForm) {
    return (
      <div className="min-h-screen bg-background texture-paper">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="font-heading text-2xl mb-4">Art form not found</h1>
          <Link to="/discover">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Discover
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = [artForm.image_url_1, artForm.image_url_2, artForm.image_url_3].filter(Boolean);

  return (
    <div className="min-h-screen bg-background texture-paper">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/discover">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Discover
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={artForm.image_url_1}
                alt={artForm.title}
                className="w-full h-96 object-cover"
              />
            </Card>
            
            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {images.slice(1).map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img
                      src={image}
                      alt={`${artForm.title} ${index + 2}`}
                      className="w-full h-48 object-cover"
                    />
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
                {artForm.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {artForm.origin}
                </div>
                
                <Badge variant="secondary">
                  <Palette className="h-4 w-4 mr-2" />
                  {artForm.type}
                </Badge>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">About this Art Form</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {artForm.description}
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLike}
                variant={isLiked ? "default" : "outline"}
                size="lg"
                className="flex items-center gap-2"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'} ({artForm.likes})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtFormDetail;