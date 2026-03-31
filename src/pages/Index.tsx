import { useState } from "react";
import { Leaf } from "lucide-react";
import PostCard from "@/components/PostCard";
import { posts, categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-primary">Rasa Rakyat</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Hello, Neighbor! 👋</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Fresh crops from your community
        </p>
      </div>

      {/* Categories */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
              !activeCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-muted-foreground px-1">
          Recent Listings
        </h2>
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Index;
