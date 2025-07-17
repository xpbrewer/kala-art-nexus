import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/SearchFilters";
import { ArtCard } from "@/components/ArtCard";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ArtForm } from "@/types/artForm";

const Discover = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedOrigin, setSelectedOrigin] = useState("All Regions");
  const [artForms, setArtForms] = useState<ArtForm[]>([]);
  const [likedArtForms, setLikedArtForms] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtForms();
  }, []);

  const fetchArtForms = async () => {
    try {
      const { data, error } = await supabase
        .from('art_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtForms(data || []);
    } catch (error) {
      console.error('Error fetching art forms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter art forms based on search and filters
  const filteredArtForms = artForms.filter((artForm) => {
    const matchesSearch = artForm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artForm.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All Types" || artForm.type === selectedType;
    const matchesOrigin = selectedOrigin === "All Regions" || artForm.origin === selectedOrigin;
    
    return matchesSearch && matchesType && matchesOrigin;
  });

  const handleLike = async (artFormId: string) => {
    const newLikedArtForms = new Set(likedArtForms);
    const isCurrentlyLiked = likedArtForms.has(artFormId);
    const artForm = artForms.find(af => af.id === artFormId);

    if (!artForm) return;

    try {
      const newLikes = isCurrentlyLiked ? artForm.likes - 1 : artForm.likes + 1;
      
      const { error } = await supabase
        .from('art_forms')
        .update({ likes: newLikes })
        .eq('id', artFormId);

      if (error) throw error;

      if (isCurrentlyLiked) {
        newLikedArtForms.delete(artFormId);
      } else {
        newLikedArtForms.add(artFormId);
      }

      setLikedArtForms(newLikedArtForms);
      setArtForms(prev => prev.map(af => 
        af.id === artFormId ? { ...af, likes: newLikes } : af
      ));
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("All Types");
    setSelectedOrigin("All Regions");
  };

  const handleArtFormClick = (artForm: ArtForm) => {
    navigate(`/art/${artForm.id}`);
  };

  return (
    <div className="min-h-screen bg-background texture-paper">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-primary mb-4">
            Discover Art Forms
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the rich tapestry of Indian art traditions. Use the filters below to find art forms by region, type, or search by name.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedOrigin={selectedOrigin}
            onOriginChange={setSelectedOrigin}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArtForms.length} of {artForms.length} art forms
          </p>
        </div>

        {/* Art Forms Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 rounded-lg mb-4"></div>
                <div className="bg-muted h-4 rounded mb-2"></div>
                <div className="bg-muted h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredArtForms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtForms.map((artForm) => (
              <ArtCard
                key={artForm.id}
                artForm={artForm}
                onLike={handleLike}
                onClick={handleArtFormClick}
                isLiked={likedArtForms.has(artForm.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              No art forms found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={handleClearFilters}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;