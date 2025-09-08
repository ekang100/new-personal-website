import { useBoardStore } from "@/store/boardStore";
import { ScrollArea } from "@/components/ui/scroll-area"; // already included in your repo
import { cn } from "@/lib/utils";

const FRAMES = [
  { id: "about",    label: "About me"   },
  { id: "projects", label: "Projects"   },
  { id: "skills",   label: "Skills & Interests" },
] as const;

export type FrameId = typeof FRAMES[number]["id"];

export function LayersSidebar() {
  const active = useBoardStore((s) => s.activeFrame);
  const setActive = useBoardStore((s) => s.setActiveFrame);

  return (
    <aside className="h-full w-64 border-r border-white/10 bg-[#2A2A2A] text-white">
      <div className="px-3 py-2 text-xs uppercase tracking-wide text-white/60">
        Layers
      </div>
      <ScrollArea className="h-[calc(100%-40px)]">
        <ul className="px-2 py-1 space-y-1">
          {FRAMES.map((f) => (
            <li key={f.id}>
              <button
                onClick={() => {
                  setActive(f.id as any);
                  window.location.hash = `#/frame/${f.id}`; // deep linking
                }}
                className={cn(
                  "w-full text-left rounded-md px-2 py-2 text-sm hover:bg-white/5",
                  active === f.id && "bg-white/10"
                )}
              >
                <span className="mr-2 text-white/50">▣</span>
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
