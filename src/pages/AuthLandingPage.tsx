import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgAuth from "@/assets/Bg_Pic_Authenthication.jpg";
import logoWhite from "@/assets/AgroConnectLogo_WhiteName-removebg-preview.png";
import { cn } from "@/lib/utils";

const AuthLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      {/* Background image */}
      <img
        src={bgAuth}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover scale-[1.02]"
        aria-hidden
      />

      {/* Soft overlays — gentle dim so the photo stays visible but UI stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/[0.22] to-black/70" aria-hidden />
      <div className="absolute inset-0 bg-emerald-950/20" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-0 flex-1 flex-col text-center"
      >
        {/* Logo + quote + buttons: vertically centered as a group; buttons sit under quote, not at screen bottom */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-8 pb-2 pt-6">
          <div className="flex w-full flex-col items-center">
            <img
              src={logoWhite}
              alt="AgroConnect"
              className="h-auto w-auto max-w-[15rem] object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.38)] sm:max-w-[16rem]"
            />
            <p className="font-comfortaa mt-5 w-full max-w-[min(100%,22rem)] text-center text-base font-light leading-tight text-white sm:max-w-[24rem] sm:text-[1.05rem]">
              <span className="block">Share harvests with neighbors. Less waste, more community.</span>
            </p>
          </div>

          <div className="mt-20 flex w-full max-w-[280px] flex-col gap-3.5">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={cn(
                "h-14 w-full rounded-full bg-white px-6 text-sm font-bold uppercase tracking-[0.12em] text-neutral-900",
                "shadow-lg shadow-black/20 transition hover:bg-white/95 active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className={cn(
                "h-14 w-full rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground",
                "shadow-lg shadow-black/25 transition hover:bg-primary/90 active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
            >
              Create account
            </button>
          </div>
        </div>

        <p className="font-cursive mt-auto px-8 pb-9 pt-2 text-lg text-white/75">by Rasa Rakyat</p>
      </motion.div>
    </div>
  );
};

export default AuthLandingPage;
