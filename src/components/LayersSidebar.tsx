import { useBoardStore } from "@/store/boardStore";
import { Figma, Search, Plus, Eye, Layers as LayersIcon } from "lucide-react";

const items = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills & Interests" },
];

export function LayersSidebar() {
  const active = useBoardStore((s) => s.activeFrame);
  const setActive = useBoardStore((s) => s.setActiveFrame);

  return (
    <aside
      className="
        w-72 shrink-0 h-full
        border-r border-white/10
        bg-[#1E1E1E]/95 text-white
        backdrop-blur-sm
        flex flex-col overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <Figma className="h-5 w-5 text-white/90" />
        <div className="min-w-0 flex-1 truncate text-sm text-white/80">My Portfolio</div>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
          Drafts
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        {/* File / Assets row */}
        <div className="mb-2 flex items-center gap-2 text-xs text-white/70">
          <button className="rounded bg-white/10 px-2 py-1">File</button>
          <button className="rounded px-2 py-1 opacity-80 hover:bg-white/10">Assets</button>
          <div className="ml-auto opacity-70">
            <Search className="h-4 w-4" />
          </div>
        </div>

        {/* Pages */}
        <div className="mt-3 text-[10px] uppercase tracking-wider text-white/40">Pages</div>
        <div className="mt-1 flex items-center justify-between rounded-md bg-white/10 px-2 py-1.5">
          <span className="text-sm">Page 1</span>
          <Plus className="h-4 w-4 opacity-80" />
        </div>

        {/* Layers */}
        <div className="mt-4 text-[10px] uppercase tracking-wider text-white/40">Layers</div>
        <ul className="mt-1 space-y-1">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <button
                  className={`
                    group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left
                    ${isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"}
                  `}
                  onClick={() => {
                    setActive(it.id as any);
                    window.location.hash = `#/frame/${it.id}`;
                  }}
                >
                  <LayersIcon className="h-4 w-4 opacity-70" />
                  <span className={`text-sm truncate ${isActive ? "text-white" : "text-white/80"}`}>
                    {it.label}
                  </span>
                  <Eye className="ml-auto h-4 w-4 opacity-60 group-hover:opacity-80" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
