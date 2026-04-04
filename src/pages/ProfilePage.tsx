import { useState } from "react";
import { Settings, MapPin, Calendar, BarChart3, Users, ShoppingBag, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentUser, posts } from "@/data/mockData";
import { useLikes } from "@/context/LikesContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import SettingsSheet from "@/components/SettingsSheet";

// Asset for the banner
import bannerImg from "@/assets/Bg_Pic_Index.jpg";

const ProfilePage = () => {
  const [tab, setTab] = useState<"active" | "liked">("active");
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { likedIds } = useLikes();

  const userPosts = posts.filter((p) => p.user.name === currentUser.name);
  const likedPosts = posts.filter((p) => likedIds.has(p.id));

  return (
    <motion.div
      className="flex flex-col min-h-full bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header Banner */}
      <div className="relative h-40 w-full shrink-0">
        <img 
          src="https://plus.unsplash.com/premium_photo-1726848049290-f09483dfc6bd?q=80&w=1110&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Profile Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <button 
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white" 
          onClick={() => setShowSettings(true)}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 -mt-12 relative z-10">
        {/* Profile Info */}
        <div className="flex items-end justify-between mb-4">
          <div className="w-24 h-24 rounded-2xl border-4 border-background overflow-hidden bg-primary shadow-xl">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <Button variant="outline" className="rounded-xl h-9 text-xs font-bold px-4 border-2">
            Edit Profile
          </Button>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground leading-none">{currentUser.name}</h1>
          <p className="text-xs text-muted-foreground mt-1">{currentUser.bio}</p>
          <div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> Taman Melawati</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" /> Joined Jan 2026</span>
          </div>
        </div>

        {/* Updated Insights Button & Stats Grid */}
        <div className="mt-6 space-y-3">
          {/* 1. Insight primary button */}
          <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest">View Profile Insights</span>
          </Button>

          {/* 2. Three-column Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted/50 border border-border rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <p className="text-sm font-black leading-none">{currentUser.stats.followers}</p>
              <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-tighter">Followers</p>
            </div>
            <div className="bg-muted/50 border border-border rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-1">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <p className="text-sm font-black leading-none">{currentUser.stats.sold}</p>
              <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-tighter">Sold</p>
            </div>
            <div className="bg-muted/50 border border-border rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-1">
              <Gift className="w-4 h-4 text-primary" />
              <p className="text-sm font-black leading-none">{currentUser.stats.givenAway}</p>
              <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-tighter">Given Away</p>
            </div>
          </div>
        </div>

        {/* Tabs - Original Design */}
        <div className="flex border-b border-border mt-8">
          {(["active", "liked"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors",
                tab === t
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground/60"
              )}
            >
              {t === "active" ? "My Harvests" : "Liked Posts"}
            </button>
          ))}
        </div>

        {/* Content Grid - Original Mapping */}
        <div className="grid grid-cols-2 gap-3 py-4">
          {(tab === "active" ? userPosts : likedPosts).map((post) => (
            <button
              key={post.id}
              onClick={() => !post.soldOut && navigate(`/post/${post.id}`)}
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden text-left relative",
                tab === "liked" && post.soldOut && "opacity-50 pointer-events-none"
              )}
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className={cn(
                    "w-full aspect-square object-cover",
                    tab === "liked" && post.soldOut && "grayscale"
                  )}
                  loading="lazy"
                />
                {tab === "liked" && post.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                    <span className="bg-destructive text-destructive-foreground text-[8px] font-black px-2 py-1 rounded rotate-[-12deg]">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <h3 className="text-[11px] font-bold text-card-foreground truncate leading-none">{post.title}</h3>
                <Badge
                  variant={post.price === null ? "default" : "secondary"}
                  className="text-[9px] mt-1.5 h-4 px-1.5 font-bold"
                >
                  {post.price === null ? "Free" : `RM${post.price}`}
                </Badge>
              </div>
            </button>
          ))}

          {(tab === "active" ? userPosts : likedPosts).length === 0 && (
            <div className="col-span-2 py-12 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {tab === "active" ? "No active listings" : "No liked posts yet"}
            </div>
          )}
        </div>
      </div>

      <SettingsSheet open={showSettings} onOpenChange={setShowSettings} />
    </motion.div>
  );
};

export default ProfilePage;