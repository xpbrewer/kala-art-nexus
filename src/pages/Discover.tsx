import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/SearchFilters";
import { ArtCard } from "@/components/ArtCard";
import { Heart } from "lucide-react";
import warliImage from "@/assets/art-warli.jpg";
import kathakaliImage from "@/assets/art-kathakali.jpg";
import miniatureImage from "@/assets/art-miniature.jpg";

// Mock data - will be replaced with Supabase data
const mockArtForms = [
  {
    id: "1",
    title: "Warli Folk Art",
    description: "Traditional tribal art from Maharashtra featuring simple figures, animals, and nature motifs painted in white on mud walls",
    origin: "Maharashtra",
    type: "Painting", 
    imageUrl1: warliImage,
    likes: 124
  },
  {
    id: "2",
    title: "Kathakali",
    description: "Classical dance-drama from Kerala with elaborate costumes, intricate face painting, and expressive storytelling",
    origin: "Kerala",
    type: "Dance",
    imageUrl1: kathakaliImage,
    likes: 89
  },
  {
    id: "3", 
    title: "Rajasthani Miniature Painting",
    description: "Intricate paintings depicting royal court life, mythology, and nature with fine brushwork and vibrant colors",
    origin: "Rajasthan",
    type: "Painting",
    imageUrl1: miniatureImage,
    likes: 156
  },
  {
    id: "4",
    title: "Madhubani Painting", 
    description: "Traditional folk art from Bihar featuring geometric patterns, nature motifs, and mythological themes",
    origin: "Bihar",
    type: "Painting",
    imageUrl1: warliImage, // Placeholder
    likes: 203
  },
  {
    id: "5",
    title: "Bharatanatyam",
    description: "Classical dance form from Tamil Nadu known for its precise movements, expressions, and spiritual themes",
    origin: "Tamil Nadu", 
    type: "Dance",
    imageUrl1: kathakaliImage, // Placeholder
    likes: 178
  },
  {
    id: "6",
    title: "Kalamkari",
    description: "Ancient textile art involving hand-painting or block-printing on cotton fabric with natural dyes",
    origin: "Andhra Pradesh",
    type: "Textile", 
    imageUrl1: miniatureImage, // Placeholder
    likes: 92
  }
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedOrigin, setSelectedOrigin] = useState("All Regions");
  const [artForms, setArtForms] = useState(mockArtForms);
  const [likedArtForms, setLikedArtForms] = useState<Set<string>>(new Set());

  // Filter art forms based on search and filters
  const filteredArtForms = artForms.filter((artForm) => {
    const matchesSearch = artForm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artForm.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All Types" || artForm.type === selectedType;
    const matchesOrigin = selectedOrigin === "All Regions" || artForm.origin === selectedOrigin;
    
    return matchesSearch && matchesType && matchesOrigin;
  });

  const handleLike = (artFormId: string) => {
    const newLikedArtForms = new Set(likedArtForms);
    const isCurrentlyLiked = likedArtForms.has(artFormId);

    if (isCurrentlyLiked) {
      newLikedArtForms.delete(artFormId);
    } else {
      newLikedArtForms.add(artFormId);
    }

    setLikedArtForms(newLikedArtForms);

    // Update likes count
    setArtForms(prev => prev.map(artForm => 
      artForm.id === artFormId 
        ? { ...artForm, likes: artForm.likes + (isCurrentlyLiked ? -1 : 1) }
        : artForm
    ));

    // TODO: Update likes in Supabase
    console.log(`${isCurrentlyLiked ? 'Unliked' : 'Liked'} art form:`, artFormId);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("All Types");
    setSelectedOrigin("All Regions");
  };

  const handleArtFormClick = (artForm: any) => {
    // TODO: Navigate to art form detail page
    console.log("Clicked art form:", artForm.title);
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
        {filteredArtForms.length > 0 ? (
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