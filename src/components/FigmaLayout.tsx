import { LayersSidebar } from "@/components/LayersSidebar";
import { BoardCanvas } from "@/components/BoardCanvas";
import { RightSidebar, RightSidebarPanel } from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft, PanelRight } from "lucide-react";

export default function FigmaLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen w-screen text-white bg-[#1E1E1E] overflow-hidden">
      <header className="relative h-10 border-b border-white/10 bg-[#232323] px-3 flex items-center text-xs tracking-wide text-white/70">
        {/* Left hamburger (mobile) */}
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1">
              <PanelLeft className="h-4 w-4" />
              Layers
            </SheetTrigger>
            {/* Offset by header height (top-10) and remove default padding */}
            <SheetContent side="left" className="top-10 p-0 w-80">
              {/* Reuse the existing sidebar inside the drawer */}
              <LayersSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <span className="font-medium mr-3">Ellie Kang – Portfolio</span>
        <span className="text-white/40">Drag to pan • Touchpad to zoom</span>

        {/* Right hamburger (mobile) */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1">
              <PanelRight className="h-4 w-4" />
              Panel
            </SheetTrigger>
            {/* Offset by header height (top-10) and remove default padding */}
            <SheetContent side="right" className="top-10 p-0 w-[min(90vw,22rem)]">
              {/* Reuse the panel-only component for mobile */}
              <RightSidebarPanel />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Content row */}
      <div className="flex h-[calc(100vh-40px)] min-w-0">
        {/* Left sidebar (desktop only) */}
        {!isMobile && <LayersSidebar />}

        {/* Canvas area; reserve space for right panel only on desktop */}
        <div className="relative flex-1 min-w-0 overflow-hidden md:pr-80">
          <BoardCanvas />
        </div>
      </div>

      {/* Fixed desktop right sidebar */}
      {!isMobile && <RightSidebar />}
    </div>
  );
}
