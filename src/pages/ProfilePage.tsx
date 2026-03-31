import { useState } from "react";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { currentUser, posts } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const userPosts = posts.filter((p) => p.user.name === currentUser.name);

const ProfilePage = () => {
  const [tab, setTab] = useState<"active" | "sold">("active");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{currentUser.bio}</p>
          </div>
        </div>
        <button className="p-2 text-muted-foreground">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="mx-5 bg-muted rounded-xl p-4 grid grid-cols-5 gap-1 text-center">
        {([
          ["Given", currentUser.stats.givenAway],
          ["Sold", currentUser.stats.sold],
          ["Likes", currentUser.stats.likes],
          ["Followers", currentUser.stats.followers],
          ["Following", currentUser.stats.following],
        ] as const).map(([label, value]) => (
          <div key={label}>
            <p className="text-lg font-bold text-foreground">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mt-5">
        {(["active", "sold"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              tab === t
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            {t === "active" ? "Active Listings" : "Completed"}
          </button>
        ))}
      </div>

      {/* Listings grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {(tab === "active" ? userPosts : []).map((post) => (
          <button
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="bg-card rounded-xl border border-border overflow-hidden text-left"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <div className="p-2.5">
              <h3 className="text-xs font-semibold text-card-foreground truncate">{post.title}</h3>
              <Badge
                variant={post.price === null ? "default" : "secondary"}
                className="text-[10px] mt-1"
              >
                {post.price === null ? "Free" : `RM${post.price}`}
              </Badge>
            </div>
          </button>
        ))}
        {tab === "sold" && (
          <div className="col-span-2 py-12 text-center text-sm text-muted-foreground">
            No completed listings yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
