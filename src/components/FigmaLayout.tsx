import { LayersSidebar } from "@/components/LayersSidebar";
import { BoardCanvas } from "@/components/BoardCanvas";
import { RightSidebar } from "@/components/RightSidebar";

export default function FigmaLayout() {
  return (
    <div className="h-screen w-screen text-white bg-[#1E1E1E] overflow-hidden">
      <header className="h-10 border-b border-white/10 bg-[#232323] px-3 flex items-center text-xs tracking-wide text-white/70">
        <span className="font-medium mr-3">Ellie Kang – Portfolio</span>
        <span className="text-white/40">Drag to pan • Touchpad to zoom</span>
      </header>

      {/* Content row */}
      <div className="flex h-[calc(100vh-40px)] min-w-0">
        {/* Left sidebar consumes width in flow */}
        <LayersSidebar />

        {/* Canvas area reserves space on the right for the fixed sidebar */}
        <div className="relative flex-1 min-w-0 overflow-hidden pr-80">
          <BoardCanvas />
        </div>
      </div>

      {/* Fixed overlay — does NOT contribute to layout width */}
      <RightSidebar />
    </div>
  );
}
