import { useEffect, useMemo, useRef } from "react";
import {
  TransformComponent,
  TransformWrapper,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useBoardStore } from "@/store/boardStore";
import { cn } from "@/lib/utils";
import { Figma, Search, Eye, Plus, Upload, Variable, Palette, ChevronDown, ZoomIn, ZoomOut, RotateCcw, MoveHorizontal, Ruler, Lock, Link, Play, Share2, Layers } from "lucide-react";

const BASE_GRID = 24;
const BOARD_W = 4000;
const BOARD_H = 3000;

const frames = [
  { id: "about",    title: "About me",           pos: { topPct: 8,  leftPct: 20 },  content: (<div className="space-y-2 text-white/80 text-sm"><p>Hi! I'm Ellie. I'm a product manager who believes the best digital experiences 
              inspire IRL connections and community..</p><p>I focus on AI, growth, and human-centered systems.</p></div>) },
  { id: "projects", title: "Projects",           pos: { topPct: 24, leftPct: 43 },  content: (<ul className="list-disc ml-5 space-y-1 text-sm"><li><a className="underline" href="https://...">Atlas Agents →</a></li><li><a className="underline" href="https://...">Competitive Connections →</a></li><li><a className="underline" href="https://...">Taste Twin →</a></li></ul>) },
  { id: "skills",   title: "Skills & Interests", pos: { topPct: 11, leftPct: 76 },  content: (<div className="text-sm text-white/80">React, TypeScript, Tailwind, shadcn/ui, Supabase, AI/ML prototyping, GTM strategy.</div>) },
] as const;

type FrameId = typeof frames[number]["id"];
const MIN_SCALE = 0.25;
const MAX_SCALE = 3;

export function BoardCanvas() {
  const active = useBoardStore((s) => s.activeFrame);
  const setActive = useBoardStore((s) => s.setActiveFrame);
  const setZoom   = useBoardStore((s) => s.setZoom);

  const wrapperRef  = useRef<ReactZoomPanPinchRef | null>(null);
  const controlsRef = useRef<{ setTransform?: (x:number,y:number,scale:number,duration?:number,ease?:string)=>void }>({});
  const stateRef    = useRef<{ positionX:number; positionY:number; scale:number }>({ positionX:0, positionY:0, scale:1 });

  const activeFrame = useMemo(() => frames.find(f => f.id === active), [active]);

  // ✅ Use the correct viewport element (visible wrapper)
  function getViewportEl(): HTMLElement | null {
    return wrapperRef.current?.instance?.contentComponent?.parentElement ?? null;
  }

  /** robust focus using current transform + rects */
  function focusFrame(frameId: FrameId, duration=400, margin=48) {
    const viewport = getViewportEl();
    const el = document.getElementById(`frame-${frameId}`) as HTMLElement | null;
    const setTransform = controlsRef.current.setTransform;
    if (!viewport || !el || !setTransform) return;

    const vpRect = viewport.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const { positionX, positionY, scale: curr } = stateRef.current;

    // element center in viewport pixels (relative to viewport)
    const centerVx = r.left - vpRect.left + r.width / 2;
    const centerVy = r.top  - vpRect.top  + r.height / 2;

    // convert viewport px -> content coords using CURRENT transform
    const centerCx = (centerVx - positionX) / Math.max(curr, 1e-6);
    const centerCy = (centerVy - positionY) / Math.max(curr, 1e-6);

    // compute a fit scale for this element
    const fitX = (viewport.clientWidth  - margin*2) / Math.max(1, r.width);
    const fitY = (viewport.clientHeight - margin*2) / Math.max(1, r.height);
    const targetScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.min(fitX, fitY)));

    // move so that element center ends up at viewport center
    const posX = viewport.clientWidth  / 2 - centerCx * targetScale;
    const posY = viewport.clientHeight / 2 - centerCy * targetScale;

    setTransform(posX, posY, targetScale, duration, "easeOut");
  }

  function clearSelection() {
    useBoardStore.getState().setActiveFrame(null as any);
    window.history.replaceState(null, "", "/");
  }

  function fitAllFrames(margin=120) {
    const viewport = getViewportEl();
    const setTransform = controlsRef.current.setTransform;
    if (!viewport || !setTransform) return;

    const vpRect = viewport.getBoundingClientRect();
    const { positionX, positionY, scale } = stateRef.current;

    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;

    frames.forEach((f) => {
      const el = document.getElementById(`frame-${f.id}`) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const leftV = r.left - vpRect.left;
      const topV  = r.top  - vpRect.top;

      const leftC   = (leftV - positionX) / Math.max(scale,1e-6);
      const topC    = (topV  - positionY) / Math.max(scale,1e-6);
      const rightC  = (leftV + r.width  - positionX) / Math.max(scale,1e-6);
      const bottomC = (topV  + r.height - positionY) / Math.max(scale,1e-6);

      minX = Math.min(minX, leftC);
      minY = Math.min(minY, topC);
      maxX = Math.max(maxX, rightC);
      maxY = Math.max(maxY, bottomC);
    });

    if (!isFinite(minX) || !isFinite(minY)) return;

    const boundsW = Math.max(1, maxX - minX);
    const boundsH = Math.max(1, maxY - minY);

    const scaleX = (viewport.clientWidth  - margin*2) / boundsW;
    const scaleY = (viewport.clientHeight - margin*2) / boundsH;
    const targetScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.min(scaleX, scaleY)));

    const centerX = minX + boundsW/2;
    const centerY = minY + boundsH/2;

    const posX = viewport.clientWidth  / 2 - centerX * targetScale;
    const posY = viewport.clientHeight / 2 - centerY * targetScale;

    setTransform(posX, posY, targetScale, 350, "easeOut");
  }

  // mount
  useEffect(() => {
    const hashed = window.location.hash.match(/#\/frame\/([a-z]+)/)?.[1] as FrameId | undefined;
    const init = () => {
      if (hashed) {
        setActive(hashed);
        focusFrame(hashed, 350);
      } else {
        fitAllFrames();
      }
    };
    const id = requestAnimationFrame(init);
    const onResize = () => fitAllFrames();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeFrame) return;
    focusFrame(activeFrame.id, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFrame]);

  return (
    <div className="relative h-full w-full bg-[#181818] text-white">
      {/* === TOP BAR: zoom only === */}
      <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-2xl bg-black/55 px-4 py-2 text-white backdrop-blur supports-[backdrop-filter]:bg-black/40">
          <button className="flex items-center gap-2 rounded bg-white/10 px-2 py-1 text-sm" onClick={() => controlsRef.current.setTransform?.(stateRef.current.positionX, stateRef.current.positionY, Math.min(MAX_SCALE, stateRef.current.scale*1.15), 200, "easeOut")}>
            <ZoomIn className="h-4 w-4" />+
          </button>
          <button className="flex items-center gap-2 rounded bg-white/10 px-2 py-1 text-sm" onClick={() => controlsRef.current.setTransform?.(stateRef.current.positionX, stateRef.current.positionY, Math.max(MIN_SCALE, stateRef.current.scale/1.15), 200, "easeOut")}>
            <ZoomOut className="h-4 w-4" />−
          </button>
          <button
            className="flex items-center gap-2 rounded bg-white/10 px-2 py-1 text-sm"
            onClick={() => {
              clearSelection();
              wrapperRef.current?.resetTransform(300);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      {/* === BIGGER BOTTOM BAR === */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-4 rounded-3xl border border-white/10 bg-[#0D0D0D]/85 px-6 py-3 text-white backdrop-blur">
          <MoveHorizontal className="h-5 w-5 opacity-90" />
          <Ruler className="h-5 w-5 opacity-90" />
          <Lock className="h-5 w-5 opacity-70" />
          <Link className="h-5 w-5 opacity-80" />
          <Play className="h-5 w-5 opacity-90" />
          <Share2 className="h-5 w-5 opacity-90" />
        </div>
      </div>

      {/* === CANVAS === */}
      <TransformWrapper
        ref={wrapperRef}
        initialScale={1}
        minScale={0.25}
        maxScale={3}
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        onPanningStart={clearSelection}
        onPinchingStart={clearSelection}
        onZoomStart={clearSelection}
        onZoomStop={({ state }) => {
          stateRef.current = { positionX: state.positionX, positionY: state.positionY, scale: state.scale };
          setZoom(state.scale);
        }}
        onTransformed={({ state }) => {
          stateRef.current = { positionX: state.positionX, positionY: state.positionY, scale: state.scale };
          const viewport = wrapperRef.current?.instance?.contentComponent?.parentElement;
          if (!viewport) return;
          viewport.style.backgroundSize = `${BASE_GRID * state.scale}px ${BASE_GRID * state.scale}px`;
          viewport.style.backgroundPosition = `${state.positionX}px ${state.positionY}px`;
        }}
      >

        {({ setTransform }) => {
          controlsRef.current.setTransform = setTransform;

          return (
            <TransformComponent
              wrapperClass={cn(
                "!w-full !h-full",
                "bg-[#1E1E1E]",
                "[background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]"
              )}
              contentClass="!w-auto !h-auto"
            >
              <div id="board" className="relative" style={{ width: BOARD_W, height: BOARD_H }}>
                {frames.map((f) => (
                  <section
                    key={f.id}
                    id={`frame-${f.id}`}
                    data-board-frame
                    style={{ top: `${f.pos.topPct}%`, left: `${f.pos.leftPct}%` }}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2",
                      "w-[340px] h-[220px] md:w-[420px] md:h-[260px] lg:w-[520px] lg:h-[300px]",
                      "rounded-2xl border border-white/10 bg-white/5 text-white",
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
                          focusFrame(f.id as FrameId, 300);
                          useBoardStore.getState().setActiveFrame(f.id as any);
                          window.location.hash = `#/frame/${f.id}`;
                        }}
                      >
                        Focus
                      </a>
                    </header>
                    <div className="overflow-auto text-sm h-[calc(100%-2rem)]">{f.content}</div>
                  </section>
                ))}
              </div>
            </TransformComponent>
          );
        }}
      </TransformWrapper>
    </div>
  );
}
