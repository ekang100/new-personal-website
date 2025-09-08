import { LayersSidebar } from "@/components/LayersSidebar";
import { BoardCanvas } from "@/components/BoardCanvas";

export default function FigmaLayout() {
  return (
    <div className="h-screen w-screen text-white bg-[#1E1E1E]">  {/* added bg */}
      <header className="h-10 border-b border-white/10 bg-[#232323] px-3 flex items-center text-xs tracking-wide text-white/70">
        <span className="font-medium mr-3">Ellie Kang – Portfolio</span>
        <span className="text-white/40">Drag to pan • Touchpad to zoom</span>
      </header>
      <div className="flex h-[calc(100vh-40px)]">
        <LayersSidebar />
        <BoardCanvas />
      </div>
    </div>
  );
}

