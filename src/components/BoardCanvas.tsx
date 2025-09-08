import { useEffect, useMemo, useRef, useLayoutEffect } from "react";
import {
  TransformComponent,
  TransformWrapper,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useBoardStore } from "@/store/boardStore";
import { cn } from "@/lib/utils";

const frames = [
  {
    id: "about",
    title: "About me",
    x: -400,
    y: -100,
    w: 520,
    h: 320,
    content: (
      <div className="space-y-2 text-white/80 text-sm">
        <p>Hello! I'm Ellie — product manager, builder, and designer.</p>
        <p>I focus on AI, growth, and human-centered systems.</p>
      </div>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    x: 200,
    y: -200,
    w: 640,
    h: 420,
    content: (
      <ul className="list-disc ml-5 space-y-1 text-sm">
        <li><a href="https://..." className="underline">Atlas Agents →</a></li>
        <li><a href="https://..." className="underline">Competitive Connections →</a></li>
        <li><a href="https://..." className="underline">Taste Twin →</a></li>
      </ul>
    ),
  },
  {
    id: "skills",
    title: "Skills & Interests",
    x: -100,
    y: 260,
    w: 520,
    h: 320,
    content: (
      <div className="text-sm text-white/80">
        React, TypeScript, Tailwind, shadcn/ui, Supabase, AI/ML prototyping, GTM strategy.
      </div>
    ),
  },
] as const;

/** Center + zoom to a specific element by ID (v3 API) */
function focusElementById(api: any, id: string, targetScale = 1, duration = 400) {
  const el = document.getElementById(id);
  const viewport = api.contentComponent?.parentElement;
  if (!el || !viewport) return;

  const rect = el.getBoundingClientRect();
  const vpW = viewport.clientWidth;
  const vpH = viewport.clientHeight;
  const { state } = api.context;

  const contentX = (rect.left + rect.width / 2 - state.positionX) / state.scale;
  const contentY = (rect.top + rect.height / 2 - state.positionY) / state.scale;

  const posX = vpW / 2 - contentX * targetScale;
  const posY = vpH / 2 - contentY * targetScale;

  api.setTransform(posX, posY, targetScale, duration, "easeOut");
}

/** Fit all frames; assumes they exist in the DOM */
function fitAllFrames(api: any, margin = 120) {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-board-frame]"));
  if (!els.length || !api?.context?.state) return;

  const { state } = api.context;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    const x = (r.left - state.positionX) / state.scale;
    const y = (r.top  - state.positionY) / state.scale;
    const w = r.width  / state.scale;
    const h = r.height / state.scale;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + w);
    maxY = Math.max(maxY, y + h);
  });

  const viewport = api.contentComponent?.parentElement;
  if (!viewport) return;

  const vpW = viewport.clientWidth;
  const vpH = viewport.clientHeight;
  const boundsW = maxX - minX;
  const boundsH = maxY - minY;

  const scaleX = (vpW - margin * 2) / boundsW;
  const scaleY = (vpH - margin * 2) / boundsH;
  const targetScale = Math.max(0.25, Math.min(3, Math.min(scaleX, scaleY)));

  const centerX = minX + boundsW / 2;
  const centerY = minY + boundsH / 2;
  const posX = vpW / 2 - centerX * targetScale;
  const posY = vpH / 2 - centerY * targetScale;

  api.setTransform(posX, posY, targetScale, 400, "easeOut");
}

/** Wait until the frames exist, then fit once */
function fitAllFramesWhenReady(api: any, setActive: (id: any) => void) {
  let tries = 0;
  const tryFit = () => {
    const hash = window.location.hash.match(/#\/frame\/([a-z]+)/);
    const framesReady = document.querySelectorAll("[data-board-frame]").length > 0;
    if (api && framesReady) {
      if (hash) {
        setActive(hash[1] as any);
        focusElementById(api, `frame-${hash[1]}`, 1);
      } else {
        fitAllFrames(api);
      }
      return;
    }
    if (tries++ < 20) requestAnimationFrame(tryFit);
  };
  requestAnimationFrame(tryFit);
}

export function BoardCanvas() {
  const active = useBoardStore((s) => s.activeFrame);
  const setActive = useBoardStore((s) => s.setActiveFrame);
  const setZoom   = useBoardStore((s) => s.setZoom);

  const wrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const activeFrame = useMemo(() => frames.find((f) => f.id === active), [active]);

  return (
    <TransformWrapper
      ref={wrapperRef}
      initialScale={1}
      minScale={0.25}
      maxScale={3}
      limitToBounds={false}
      wheel={{ step: 0.08 }}
      onZoomStop={({ state }) => setZoom(state.scale)}
    >
      {({ zoomIn, zoomOut, resetTransform }) => {
        // Fit once after mount, when DOM is ready
        useLayoutEffect(() => {
          const api = wrapperRef.current?.instance;
          if (!api) return;
          fitAllFramesWhenReady(api, setActive);
        }, [setActive]);

        // Focus when active layer changes
        useEffect(() => {
          const api = wrapperRef.current?.instance;
          if (!api || !activeFrame) return;
          focusElementById(api, `frame-${activeFrame.id}`, 1);
        }, [activeFrame]);

        return (
          <div className="relative flex-1 overflow-hidden">
            {/* Toolbar */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20 flex items-center gap-2 rounded-xl bg-black/50 px-3 py-1 text-white backdrop-blur">
              <button onClick={() => zoomOut(200)}>−</button>
              <button onClick={() => zoomIn(200)}>+</button>
              <button className="ml-2 text-xs px-2 py-1 rounded bg-white/10" onClick={() => resetTransform(300)}>
                Reset
              </button>
            </div>

            <TransformComponent
              wrapperClass={cn(
                "!w-full !h-full",
                "bg-[#1E1E1E]",
                "[background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]",
                "[background-size:24px_24px]"
              )}
              contentClass="min-w-[4000px] min-h-[3000px]"
            >
              {/* Center the origin to feel like Figma */}
              <div
                className="relative"
                style={{ width: 1, height: 1, transform: "translate(2000px,1500px)" }}
              >
                {frames.map((f) => (
                  <section
                    key={f.id}
                    id={`frame-${f.id}`}
                    data-board-frame
                    style={{ transform: `translate(${f.x}px, ${f.y}px)` }}
                    className={cn(
                      "absolute rounded-2xl border border-white/10 bg-white/5 text-white",
                      "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur p-5"
                    )}
                  >
                    <header className="mb-3 flex items-center justify-between">
                      <h3 className="text-white/90 font-medium">{f.title}</h3>
                      <a
                        href={`#/frame/${f.id}`}
                        className="text-xs text-white/60 underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setActive(f.id as any);
                          window.location.hash = `#/frame/${f.id}`;
                        }}
                      >
                        Focus
                      </a>
                    </header>
                    <div style={{ width: f.w, height: f.h }} className="overflow-auto">
                      {f.content}
                    </div>
                  </section>
                ))}
              </div>
            </TransformComponent>
          </div>
        );
      }}
    </TransformWrapper>
  );
}
