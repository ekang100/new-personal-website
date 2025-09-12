import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import {
  TransformComponent,
  TransformWrapper,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useBoardStore } from "@/store/boardStore";
import { cn } from "@/lib/utils";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";


type BaseFrame = {
  id: FrameId;
  title: string;
  pos: { topPct: number; leftPct: number };
};

type LabelFrame = BaseFrame & {
  variant: "label";           // no content for labels
};

type CardFrame = BaseFrame & {
  variant?: "card";
  content: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";   // <— NEW
  noScroll?: boolean;                 // <— NEW
};

type Frame = LabelFrame | CardFrame;

const BASE_GRID = 24;
const BOARD_W = 4000;
const BOARD_H = 3000;

const FIT_MARGIN_INITIAL = 240; // more zoomed out on load
const FIT_MARGIN_RESIZE  = 160; // a little padding on resize


/** === Frames (now includes Projects banner + 3 project cards) === */
const frames = [
  {
    id: "about title",
    title: "About me",
    pos: { topPct: 0, leftPct: 15 },
    variant: "label",
  },
  {
    id: "skills title",
    title: "My brain",
    pos: { topPct: 0, leftPct: 85 },
    variant: "label",
  },
  {
    id: "about",
    title: "About me",
    pos: { topPct: 9, leftPct: 15 },
    variant: "card",
    size: "lg",
    noScroll: true,
    content: (
      <div className="space-y-3 text-white/85 text-sm leading-relaxed">
        <p>
          Hi, I’m Ellie — a product manager who builds AI-powered tools that feel
          simple, helpful, and a little magical. I move fast from sketch → prototype
          → shipped feature, and I care a lot about the human side of every system.
        </p>
        <p>
          My sweet spot is zero-to-one: defining crisp problems, prototyping with
          React/TypeScript, and proving value with real users and real metrics.
        </p>

        <ul className="list-disc ml-5 space-y-1">
          <li>Rapid prototyping in React/TS + Tailwind + Supabase; ship scrappy → stable</li>
          <li>Designing agentic UX: clear handoffs, human-in-the-loop, safe defaults</li>
          <li>Product analytics & growth loops: activation, aha, retention, compounding value</li>
          <li>User research & storytelling that aligns eng/design/GTMs around outcomes</li>
          <li>Roadmapping that balances ambition with shipping momentum</li>
        </ul>

        <p>
          Lately I’m exploring agents, multiplayer collaboration, and interfaces that
          turn complex decisions into confident actions. If you’ve got an ambitious
          problem or a weird idea, let’s chat.
        </p>
      </div>
    ),
  },

  /** Projects banner (large label above the project cards) */
  {
    id: "projects",
    title: "Projects",
    pos: { topPct: 20, leftPct: 50 },
    variant: "label",
  },

  /** Project cards row */
  {
    id: "atlas",
    title: "Atlas Agents",
    pos: { topPct: 26, leftPct: 0 },
    variant: "card",
    size: "sm",
    noScroll: true,
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">Atlas Agents</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">React</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Agentic UX</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Growth</span>
          </div>
        </div>

        <p className="text-white/80">
          Workflow agent that auto-drafts customer responses and routes approvals;
          reduced average handling time by 28%.
        </p>

        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://...">Demo</a>
          <a className="underline" href="https://...">Case study</a>
          <a className="underline" href="https://...">GitHub</a>
        </div>
      </div>
    ),
  },
  {
    id: "connections",
    title: "Competitive Connections",
    pos: { topPct: 26, leftPct: 100 },
    variant: "card",
    size: "sm",
    noScroll: true,
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">Competitive Connections</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">Next.js</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">LLM</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Research</span>
          </div>
        </div>

        <p className="text-white/80">
          Competitive intel tool that clusters updates, maps feature deltas, and drafts positioning
          notes for PMs and Sales.
        </p>

        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://...">Demo</a>
          <a className="underline" href="https://...">Write-up</a>
          <a className="underline" href="https://...">GitHub</a>
        </div>
      </div>
    ),
  },
  {
    id: "tastetwin",
    title: "Taste Twin",
    pos: { topPct: 26, leftPct: 50 },
    variant: "card",
    size: "sm",
    noScroll: true,
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">Taste Twin</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">Data</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Recommenders</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">UX</span>
          </div>
        </div>

        <p className="text-white/80">
          Flavor-profile matcher that recommends restaurants/products based on shared “taste twins”,
          improving first-session conversion.
        </p>

        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://...">Demo</a>
          <a className="underline" href="https://...">Write-up</a>
          <a className="underline" href="https://...">GitHub</a>
        </div>
      </div>
    ),
  },

  {
    id: "skills",
    title: "Skills & Interests",
    pos: { topPct: 9, leftPct: 85 },
    variant: "card",
    size: "lg",
    noScroll: true,
    content: (
      <div className="text-sm text-white/85 space-y-3">
        <div>
          <h4 className="text-white/90 font-medium mb-1">Skills</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6">
            <li><span className="text-white/70">Frontend</span>: React, TypeScript, Next.js, Tailwind, shadcn/ui</li>
            <li><span className="text-white/70">Prototyping</span>: rapid UX flows, agent demos, prompt design</li>
            <li><span className="text-white/70">Backend</span>: Node, Supabase/Postgres, REST</li>
            <li><span className="text-white/70">Design</span>: Figma, component systems, interaction design</li>
            <li><span className="text-white/70">Product</span>: discovery, PRDs, KPI trees, experiment design</li>
            <li><span className="text-white/70">Growth</span>: onboarding, activation, retention, lifecycle messaging</li>
            <li><span className="text-white/70">Analytics</span>: funnels, cohorts, A/B testing, Mixpanel/GA</li>
            <li><span className="text-white/70">Collab</span>: clear specs, tight feedback loops, narrative docs</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white/90 font-medium mb-1">Interests</h4>
          <ul className="list-disc ml-5 space-y-1">
            <li>Agentic UX & human-in-the-loop workflows that feel trustworthy</li>
            <li>Personal knowledge tools and creative tooling for teams</li>
            <li>Onboarding “wow” moments and compounding retention loops</li>
            <li>Multimodal interfaces (text + voice + canvas) for faster decisions</li>
            <li>Local-first & privacy-by-default collaboration</li>
            <li>Products that create real-world connection and community</li>
          </ul>
        </div>
      </div>
    ),
  },
] as const;

type FrameId = (typeof frames)[number]["id"];
const MIN_SCALE = 0.25;
const MAX_SCALE = 3;

export function BoardCanvas() {
  const active = useBoardStore((s) => s.activeFrame);
  const setActive = useBoardStore((s) => s.setActiveFrame);
  const setZoom = useBoardStore((s) => s.setZoom);

  const wrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const controlsRef = useRef<{
    setTransform?: (
      x: number,
      y: number,
      scale: number,
      duration?: number,
      ease?: string
    ) => void;
  }>({});
  const stateRef = useRef<{ positionX: number; positionY: number; scale: number }>(
    { positionX: 0, positionY: 0, scale: 1 }
  );

  const activeFrame = useMemo(() => frames.find((f) => f.id === active), [active]);

  // responsive frame scale
  const [frameScale, setFrameScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / 1280, vh / 800);
      setFrameScale(Math.max(0.35, Math.min(1, s)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // === Draggable frames ===
  const [positions, setPositions] = useState<
    Record<FrameId, { topPct: number; leftPct: number }>
  >(() =>
    frames.reduce((acc, f) => {
      acc[f.id] = { ...f.pos };
      return acc;
    }, {} as Record<FrameId, { topPct: number; leftPct: number }>)
  );

  const draggingId = useRef<FrameId | null>(null);
  const dragOffset = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function getViewportEl(): HTMLElement | null {
    return wrapperRef.current?.instance?.contentComponent?.parentElement ?? null;
  }

  function vpToContent(clientX: number, clientY: number) {
    const viewport = getViewportEl();
    const rect = viewport?.getBoundingClientRect();
    if (!viewport || !rect) return { x: 0, y: 0 };
    const { positionX, positionY, scale } = stateRef.current;
    const vx = clientX - rect.left;
    const vy = clientY - rect.top;
    return {
      x: (vx - positionX) / Math.max(scale, 1e-6),
      y: (vy - positionY) / Math.max(scale, 1e-6),
    };
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const id = draggingId.current;
      if (!id) return;
      const { x, y } = vpToContent(e.clientX, e.clientY);
      const { dx, dy } = dragOffset.current;
      let cx = x - dx;
      let cy = y - dy;
      cx = Math.max(0, Math.min(BOARD_W, cx));
      cy = Math.max(0, Math.min(BOARD_H, cy));
      setPositions((prev) => ({
        ...prev,
        [id]: { leftPct: (cx / BOARD_W) * 100, topPct: (cy / BOARD_H) * 100 },
      }));
    };

    const onUp = () => {
      if (!draggingId.current) return;
      draggingId.current = null;
      setIsDragging(false);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  function focusFrame(frameId: FrameId, duration = 400, margin = 48) {
  const viewport = getViewportEl();
  const el = document.getElementById(`frame-${frameId}`) as HTMLElement | null;
  const setTransform = controlsRef.current.setTransform;
  if (!viewport || !el || !setTransform) return;

  const vpRect = viewport.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const { positionX, positionY, scale: curr } = stateRef.current;

  // element center in viewport px
  const centerVx = r.left - vpRect.left + r.width / 2;
  const centerVy = r.top  - vpRect.top  + r.height / 2;

  // convert viewport px -> content coords using CURRENT transform
  const centerCx = (centerVx - positionX) / Math.max(curr, 1e-6);
  const centerCy = (centerVy - positionY) / Math.max(curr, 1e-6);

  // how much we need to scale RELATIVE to the current zoom to fit
  const fitX = (viewport.clientWidth  - margin * 2) / Math.max(1, r.width);
  const fitY = (viewport.clientHeight - margin * 2) / Math.max(1, r.height);
  const relFit = Math.min(fitX, fitY);

  // final absolute scale must be current * relative-fit
  const frameMeta = frames.find(f => f.id === frameId);
  let targetScale = curr * relFit;

  // optional: don't zoom when focusing plain text labels (just pan)
  if (frameMeta?.variant === "label") targetScale = curr;

  targetScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, targetScale));

  // keep the element centered at the new scale
  const posX = viewport.clientWidth  / 2 - centerCx * targetScale;
  const posY = viewport.clientHeight / 2 - centerCy * targetScale;

  setTransform(posX, posY, targetScale, duration, "easeOut");
}


  function clearSelection() {
    useBoardStore.getState().setActiveFrame(null as any);
    window.history.replaceState(null, "", "/");
  }

  function fitAllFrames(margin = 120) {
    const viewport = getViewportEl();
    const setTransform = controlsRef.current.setTransform;
    if (!viewport || !setTransform) return;

    const vpRect = viewport.getBoundingClientRect();
    const { positionX, positionY, scale } = stateRef.current;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    frames.forEach((f) => {
      const el = document.getElementById(`frame-${f.id}`) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const leftV = r.left - vpRect.left;
      const topV = r.top - vpRect.top;

      const leftC = (leftV - positionX) / Math.max(scale, 1e-6);
      const topC = (topV - positionY) / Math.max(scale, 1e-6);
      const rightC = (leftV + r.width - positionX) / Math.max(scale, 1e-6);
      const bottomC = (topV + r.height - positionY) / Math.max(scale, 1e-6);

      minX = Math.min(minX, leftC);
      minY = Math.min(minY, topC);
      maxX = Math.max(maxX, rightC);
      maxY = Math.max(maxY, bottomC);
    });

    if (!isFinite(minX) || !isFinite(minY)) return;

    const boundsW = Math.max(1, maxX - minX);
    const boundsH = Math.max(1, maxY - minY);

    const scaleX = (viewport.clientWidth - margin * 2) / boundsW;
    const scaleY = (viewport.clientHeight - margin * 2) / boundsH;
    const targetScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.min(scaleX, scaleY)));

    const centerX = minX + boundsW / 2;
    const centerY = minY + boundsH / 2;

    const posX = viewport.clientWidth / 2 - centerX * targetScale;
    const posY = viewport.clientHeight / 2 - centerY * targetScale;

    setTransform(posX, posY, targetScale, 350, "easeOut");
  }

  // mount
  // mount
useEffect(() => {
  const hashed = window.location.hash.match(/#\/frame\/([a-z]+)/)?.[1] as FrameId | undefined;

  const init = () => {
    if (hashed) {
      setActive(hashed);
      focusFrame(hashed, 350);
    } else {
      // 👇 more zoomed out by default
      fitAllFrames(FIT_MARGIN_INITIAL);
    }
  };

  const id = requestAnimationFrame(init);
  const onResize = () => fitAllFrames(FIT_MARGIN_RESIZE);

  window.addEventListener("resize", onResize);
  return () => {
    cancelAnimationFrame(id);
    window.removeEventListener("resize", onResize);
  };
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
          <button
            className="flex items-center gap-2 rounded bg-white/10 px-2 py-1 text-sm"
            onClick={() =>
              controlsRef.current.setTransform?.(
                stateRef.current.positionX,
                stateRef.current.positionY,
                Math.min(MAX_SCALE, stateRef.current.scale * 1.15),
                200,
                "easeOut"
              )
            }
          >
            <ZoomIn className="h-4 w-4" />+
          </button>
          <button
            className="flex items-center gap-2 rounded bg-white/10 px-2 py-1 text-sm"
            onClick={() =>
              controlsRef.current.setTransform?.(
                stateRef.current.positionX,
                stateRef.current.positionY,
                Math.max(MIN_SCALE, stateRef.current.scale / 1.15),
                200,
                "easeOut"
              )
            }
          >
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

      {/* === Bottom toolbar image (small) === */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center">
        <img
          src="/bottom.png"
          alt="Bottom toolbar"
          className="pointer-events-none select-none h-8 md:h-9 lg:h-10 object-contain"
          draggable={false}
        />
      </div>

      {/* === CANVAS === */}
      <TransformWrapper
        ref={wrapperRef}
        initialScale={1}
        minScale={0.25}
        maxScale={3}
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        panning={{ disabled: isDragging }}
        onPanningStart={clearSelection}
        onPinchingStart={clearSelection}
        onZoomStart={clearSelection}
        onZoomStop={({ state }) => {
          stateRef.current = {
            positionX: state.positionX,
            positionY: state.positionY,
            scale: state.scale,
          };
          setZoom(state.scale);
        }}
        onTransformed={({ state }) => {
          stateRef.current = {
            positionX: state.positionX,
            positionY: state.positionY,
            scale: state.scale,
          };
          const viewport =
            wrapperRef.current?.instance?.contentComponent?.parentElement;
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
              <div
                id="board"
                className="relative"
                style={{ width: BOARD_W, height: BOARD_H }}
              >
                {frames.map((f) => {
                    const pos = positions[f.id];

                    // 🔹 LABEL: plain text, not draggable
                    if (f.variant === "label") {
                      return (
                        <div
                          key={f.id}
                          id={`frame-${f.id}`}
                          style={{
                            top: `${pos.topPct}%`,
                            left: `${pos.leftPct}%`,
                            transform: `translate(-50%, -50%) scale(${frameScale})`,
                            transformOrigin: "center",
                          }}
                          className="absolute pointer-events-none select-none"
                        >
                          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-white/90">
                            {f.title}
                          </div>
                        </div>
                      );
                    }

                    // 🔸 CARD: safe to read card-only props now (size, content, noScroll)
                    const sizeClass =
                    f.size === "xl"
                      ? "w-[760px] h-[460px] md:w-[880px] md:h-[520px] lg:w-[960px] lg:h-[560px]"
                      : f.size === "lg"
                      ? "w-[640px] h-[360px] md:w-[720px] md:h-[420px] lg:w-[800px] lg:h-[460px]"
                      : f.size === "md"
                      ? "w-[520px] h-[300px] md:w-[560px] md:h-[320px] lg:w-[640px] lg:h-[360px]"
                      : /* sm (default) */ 
                        "w-[340px] h-[220px] md:w-[420px] md:h-[260px] lg:w-[520px] lg:h-[300px]";


                    return (
                      <section
                        key={f.id}
                        id={`frame-${f.id}`}
                        data-board-frame
                        style={{
                          top: `${pos.topPct}%`,
                          left: `${pos.leftPct}%`,
                          transform: `translate(-50%, -50%) scale(${frameScale})`,
                          transformOrigin: "center",
                        }}
                        className={cn(
                          "absolute select-none touch-none",
                          sizeClass, // ✅ only one size set
                          "rounded-2xl border border-white/10 bg-white/5 text-white",
                          "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur p-5",
                          isDragging ? "cursor-grabbing" : "cursor-grab"
                        )}
                        onPointerDown={(e) => {
                          if ((e as unknown as PointerEvent).button !== 0) return;
                          const target = e.target as HTMLElement;
                          if (target.closest("a,button,input,textarea,[data-nodrag]")) return;

                          const id = f.id as FrameId;
                          const { x, y } = vpToContent(e.clientX, e.clientY);
                          const cx = (positions[id].leftPct / 100) * BOARD_W;
                          const cy = (positions[id].topPct / 100) * BOARD_H;
                          dragOffset.current = { dx: x - cx, dy: y - cy };
                          draggingId.current = id;
                          setIsDragging(true);
                        }}
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

                        {/* scroll only when not flagged */}
                        <div className={cn("text-sm", f.noScroll ? "" : "overflow-auto h-[calc(100%-2rem)]")}>
                          {f.content}
                        </div>
                      </section>
                    );
                  })}
              </div>
            </TransformComponent>
          );
        }}
      </TransformWrapper>
    </div>
  );
}
