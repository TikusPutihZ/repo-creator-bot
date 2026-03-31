import { ReactNode } from "react";
import BottomNav from "./BottomNav";

const MobileShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex justify-center bg-muted">
      <div className="w-full max-w-[430px] min-h-screen bg-background shadow-2xl shadow-foreground/5 flex flex-col relative">
        <main className="flex-1 overflow-y-auto pb-0">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
};

export default MobileShell;
