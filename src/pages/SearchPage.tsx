import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const distances = ["My Neighborhood", "Within 1km", "Within 5km", "Within 10km"];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeDistance, setActiveDistance] = useState("Within 5km");
  const navigate = useNavigate();

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Sticky search */}
      <div className="sticky top-0 z-10 bg-background px-4 pt-5 pb-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search crops, herbs, fruits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-muted border-0 rounded-xl"
          />
        </div>
        {/* Distance chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {distances.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDistance(d)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors",
                activeDistance === d
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              )}
            >
              <MapPin className="w-3 h-3" />
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {filtered.map((post) => (
          <button
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow text-left"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm text-card-foreground truncate">{post.title}</h3>
              <div className="flex items-center justify-between mt-1.5">
                <Badge
                  variant={post.price === null ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {post.price === null ? "Free" : `RM${post.price}`}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{post.distance}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
