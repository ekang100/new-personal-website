import { ChevronDown, Eye, Variable, Play, Plus } from "lucide-react";

/** Compact right sidebar, same layout, smaller scale + softer row text */
export function RightSidebarPanel() {
  return (
    <div
      className="
        h-full pointer-events-auto
        border-l border-white/10
        bg-[#1E1E1E]/95 text-white
        backdrop-blur-sm
        flex flex-col overflow-hidden
      "
    >
      {/* Top cluster */}
      <div className="px-3 pt-1.5 pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Avatar + chevron (smaller) */}
          <div className="flex items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-white/10 grid place-items-center text-[10px] font-medium text-white/90">
              E
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/60" />
          </div>

          {/* Prototype dropdown (compact) */}
          <button className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/90">
            <Play className="h-3.5 w-3.5" />
            <ChevronDown className="h-3.5 w-3.5 opacity-80" />
          </button>

          {/* Share (smaller) */}
          <button className="ml-auto rounded-md bg-[#3B82F6] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#2f6fd3]">
            Share
          </button>
        </div>

        {/* Tabs + zoom (scaled down) */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <button className="rounded bg-white/15 px-2.5 py-1 text-xs text-white">
            Design
          </button>
          <button className="rounded px-2.5 py-1 text-xs text-white/70 hover:bg-white/10">
            Prototype
          </button>

          <div className="ml-auto inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80">
            <span>47%</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* PAGE */}
        <section className="px-3 py-2.5 border-b border-white/10">
          <div className="mb-1.5 text-[13px] font-medium text-white/90">Page</div>

          <div className="flex items-center gap-2">
            {/* swatch (smaller) */}
            <button
              aria-label="Page color"
              className="h-5 w-7 shrink-0 rounded border border-white/10"
              style={{ background: "#1E1E1E" }}
            />

            {/* hex / percent group (compact) */}
            <div className="flex-1 flex items-center overflow-hidden rounded-md bg-white/10">
              <div className="px-3 py-1.5 text-xs text-white/80 grow">1E1E1E</div>
              <div className="flex items-center border-l border-white/10">
                <div className="px-3 py-1.5 text-xs text-white/80">100</div>
                <div className="px-2 py-1.5 text-xs text-white/60">%</div>
              </div>
            </div>

            <Eye className="ml-2 h-4 w-4 text-white/60" />
          </div>
        </section>

        {/* Collapsed rows — softer text & smaller paddings */}
        <button className="w-full px-3 py-2.5 border-b border-white/10 flex items-center justify-between hover:bg-white/5">
          <span className="text-xs text-white/70">Variables</span>
          <Variable className="h-4 w-4 text-white/60" />
        </button>

        <button className="w-full px-3 py-2.5 border-b border-white/10 flex items-center justify-between hover:bg-white/5">
          <span className="text-xs text-white/70">Styles</span>
          <Plus className="h-4 w-4 text-white/60" />
        </button>

        <button className="w-full px-3 py-2.5 border-b border-white/10 flex items-center justify-between hover:bg-white/5">
          <span className="text-xs text-white/70">Export</span>
          <Plus className="h-4 w-4 text-white/60" />
        </button>
      </div>
    </div>
  );
}

/** Desktop-only fixed sidebar — same width as left (w-72) */
export function RightSidebar() {
  return (
    <aside className="fixed top-10 bottom-0 right-0 z-30 w-72 pointer-events-none hidden md:block">
      <RightSidebarPanel />
    </aside>
  );
}
