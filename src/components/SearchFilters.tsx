import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedOrigin: string;
  onOriginChange: (value: string) => void;
  onClearFilters: () => void;
}

const artTypes = [
  "All Types",
  "Painting", 
  "Textile", 
  "Sculpture", 
  "Dance", 
  "Music", 
  "Craft",
  "Architecture"
];

const origins = [
  "All Regions",
  "Kerala", 
  "Rajasthan", 
  "Gujarat", 
  "West Bengal", 
  "Tamil Nadu",
  "Maharashtra", 
  "Odisha", 
  "Karnataka",
  "Madhya Pradesh"
];

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedOrigin,
  onOriginChange,
  onClearFilters
}: SearchFiltersProps) => {
  const hasActiveFilters = selectedType !== "All Types" || selectedOrigin !== "All Regions" || searchTerm.length > 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search art forms by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Art Type
          </label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select art type" />
            </SelectTrigger>
            <SelectContent>
              {artTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Origin/Region
          </label>
          <Select value={selectedOrigin} onValueChange={onOriginChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {origins.map((origin) => (
                <SelectItem key={origin} value={origin}>
                  {origin}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary">
              Search: "{searchTerm}"
            </Badge>
          )}
          {selectedType !== "All Types" && (
            <Badge variant="secondary">
              Type: {selectedType}
            </Badge>
          )}
          {selectedOrigin !== "All Regions" && (
            <Badge variant="secondary">
              Region: {selectedOrigin}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};