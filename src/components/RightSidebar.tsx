import { ChevronDown, Eye, Variable, Palette, Upload } from "lucide-react";

export function RightSidebar() {
  return (
    // Overlay the sidebar so it doesn't contribute to page width
    <aside className="fixed top-10 bottom-0 right-0 z-30 w-80 pointer-events-none">
      <div
        className="
          h-full pointer-events-auto
          border-l border-white/10
          bg-[#1E1E1E]/95 text-white
          backdrop-blur-sm
          flex flex-col overflow-hidden
        "
      >
        {/* Tabs / Zoom */}
        <div className="border-b border-white/10 px-3">
          <div className="flex items-center gap-2 py-2">
            <button className="rounded px-2 py-1 text-xs bg-white/10 text-white">
              Design
            </button>
            <button className="rounded px-2 py-1 text-xs text-white/70 hover:bg-white/10">
              Prototype
            </button>
            <div className="ml-auto flex items-center gap-2 text-xs text-white/60">
              <span>47%</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {/* Page */}
          <section className="rounded-md border border-white/10 p-3">
            <div className="mb-2 text-xs uppercase tracking-wider text-white/40">Page</div>
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-10 rounded border border-white/10"
                style={{ background: "#1E1E1E" }}
                aria-label="Page color"
              />
              <span className="text-xs text-white/80">#1E1E1E</span>
              <Eye className="ml-auto h-4 w-4 text-white/50" />
            </div>
          </section>

          {/* Variables */}
          <section className="rounded-md border border-white/10 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
              <Variable className="h-4 w-4" /> Variables
            </div>
            <div className="mt-2 h-4 rounded bg-white/5" />
          </section>

          {/* Styles */}
          <section className="rounded-md border border-white/10 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
              <Palette className="h-4 w-4" /> Styles
            </div>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 rounded bg-white/5" />
              ))}
            </div>
          </section>

          {/* Export */}
          <section className="rounded-md border border-white/10 p-3 mb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
              <Upload className="h-4 w-4" /> Export
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 rounded bg-white/5 px-2 py-1 text-xs text-white/60">
                PNG • 1x
              </div>
              <button className="rounded bg-white/10 px-2 py-1 text-xs text-white/80">
                Export
              </button>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
