import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArtCard } from "@/components/ArtCard";
import { Navigation } from "@/components/Navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-madhubani.jpg";
import warliImage from "@/assets/art-warli.jpg";
import kathakaliImage from "@/assets/art-kathakali.jpg";
import miniatureImage from "@/assets/art-miniature.jpg";

import { supabase } from "@/integrations/supabase/client";
import { ArtForm } from "@/types/artForm";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [featuredArtForms, setFeaturedArtForms] = useState<ArtForm[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchFeaturedArtForms();
  }, []);

  const fetchFeaturedArtForms = async () => {
    try {
      const { data, error } = await supabase
        .from('art_forms')
        .select('*')
        .order('likes', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedArtForms(data || []);
    } catch (error) {
      console.error('Error fetching featured art forms:', error);
    }
  };

  const handleLike = async (artFormId: string) => {
    try {
      const artForm = featuredArtForms.find(af => af.id === artFormId);
      if (!artForm) return;

      const newLikes = artForm.likes + 1;
      
      const { error } = await supabase
        .from('art_forms')
        .update({ likes: newLikes })
        .eq('id', artFormId);

      if (error) throw error;

      setFeaturedArtForms(prev => 
        prev.map(af => 
          af.id === artFormId ? { ...af, likes: newLikes } : af
        )
      );
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background texture-paper">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        <img 
          src={heroImage}
          alt="Traditional Indian Art"
          className="w-full h-[70vh] object-cover"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className={`font-heading text-5xl md:text-7xl font-bold mb-6 ${mounted ? 'animate-fade-in' : ''}`}>
              Kalakritiyan
            </h1>
            <p className={`text-xl md:text-2xl mb-8 font-light ${mounted ? 'animate-fade-in' : ''}`}>
              Discover, Learn, and Appreciate Diverse Indian Art Forms
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              asChild
              className={`text-primary font-semibold ${mounted ? 'animate-scale-in' : ''}`}
            >
              <Link to="/discover">
                <Sparkles className="mr-2 h-5 w-5" />
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Border */}
        <div className="absolute bottom-0 left-0 right-0 h-4 border-pattern opacity-70" />
      </section>

      {/* Featured Art Forms */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-primary mb-4">
              Featured Art Forms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore some of the most celebrated art forms from across India, 
              each telling a unique story of culture and tradition.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${mounted ? 'animate-fade-in' : ''}`}>
            {featuredArtForms.map((artForm, index) => (
              <div 
                key={artForm.id}
                className={mounted ? 'flourish-enter' : ''}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ArtCard 
                  artForm={artForm}
                  onLike={handleLike}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/discover">
                View All Art Forms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-sunset">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Preserve and Celebrate Art
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in preserving India's rich artistic heritage for future generations. 
            Every art form has a story worth telling.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/discover">
              Explore Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
