import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import {
  TransformComponent,
  TransformWrapper,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useBoardStore } from "@/store/boardStore";
import { useIsMobile } from "@/hooks/use-mobile";
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
  size?: "sm" | "md" | "lg" | "xl";
  noScroll?: boolean;
  /** visual preset for special cards */
  theme?: "default" | "note";
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
    title: "Hi! I’m Ellie.",
    pos: { topPct: 9, leftPct: 15 },
    variant: "card",
    size: "lg",
    noScroll: true,
    theme: "default",
    content: (
      <div className="space-y-3 text-white/85 text-sm leading-relaxed">
        <p>
          I'm a product manager who believes that the best digital experiences inspire IRL connections and community. Right now, I’m a PM at Capital One, working on the multi-factor authentication experience. I focus on making our experiences feel intuitive and seamless
                by deep-diving on customer behavior and building to solve pain points.
        </p>
        <p>
          Outside of work, I’m curious about products that blur the line between 
                online and offline. I'm especially interested in AI-powered solutions that help people discover 
                new places, form genuine communities, or just generally lead better lives.
        </p>

        <p>
          When I’m not doing product stuff, you can find me:
        </p>

        <ul className="list-disc ml-5 space-y-1">
          <li>frolicking around NYC (walks, popups, eating)</li>
          <li>planning my next mini trip</li>
          <li>trying to improve Beli</li>
          <li>ranking every matcha latte i come across</li>
        </ul>

        <p>
          Lately I’m exploring vibe-coding, productivity software, and the future of dating apps. If you’ve got an ambitious
          problem or a weird idea, let’s chat.
        </p>
      </div>
    ),
  },

  /** Projects banner (large label above the project cards) */
  {
    id: "projects",
    title: "What I've worked on",
    pos: { topPct: 20, leftPct: 50 },
    variant: "label",
  },
{
  id: "projects-note",
  title: "",                       // no title bar for the note
  pos: { topPct: 30, leftPct: -15 },// to the side of the Projects label
  variant: "card",
  size: "sm",
  noScroll: true,
  theme: "note",
  content: (
    <div className="relative space-y-2">
      <p className="text-[13px] leading-snug">
        This site is still under construction as I make it more interactive and fun.
      </p>
      <p className="text-[13px] leading-snug">
        In the meantime, enjoy dragging the Frames around, reading up on my work, and please contact me at{" "}
        <a href="mailto:ekangster1@gmail.com" className="underline">ekangster1@gmail.com</a>{" "}
        or connect on{" "}
        <a href="https://www.linkedin.com/in/elianne-kang/" target="_blank" rel="noreferrer" className="underline">
          LinkedIn
        </a> :)
      </p>
    </div>
  ),
},

  /** Project cards row */
  {
    id: "baby",
    title: "BabyBumps",
    pos: { topPct: 38, leftPct: 28 },
    variant: "card",
    size: "sm",
    noScroll: true,
    theme: "default",
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">Surrogacy Startup</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">Figma</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">User Reserach</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Strategy</span>
          </div>
        </div>

        <p className="text-white/80">
          0 -> 1 strategy, design, and development for a mobile app matching surrogates to intended parents and a web platform for all things surrogacy
        </p>
        <p className="text-white/80">
          Learned about the surrogacy process, how to work with founders, and led my first team of engineers and designers
        </p>

        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://helix-supply-e76.notion.site/BabyBumps-227b8db40ea98090a129d1f19c42f16f">Docs</a>
          <a className="underline" href="https://github.com/ekang100/BabyBumps">GitHub</a>
          <a className="underline" href="https://www.figma.com/design/a9OVE7zwCXPzr0aRpPiRGy/BabyBumps?node-id=0-1&t=xDPfuAo2D7mbzPke-1">Figma</a>
        </div>
      </div>
    ),
  },
  {
    id: "proxy",
    title: "Proxy",
    pos: { topPct: 27, leftPct: 28 },
    variant: "card",
    size: "sm",
    noScroll: true,
    theme: "default",
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">Dating App</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">Figma</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Growth</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Startup</span>
          </div>
        </div>
        <p className="text-white/80">
          Dating app concept that lets your friends and family (with the help of AI) swipe, chat, and set you up with people they think you'd like
        </p>
        <p className="text-white/80">
          Designed the end-to-end user experience, built a clickable prototype in Figma, worked on growth strategy
        </p>
        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://www.figma.com/design/RIpTc2NMfVlEE4UncVbqmp/Proxy?node-id=261-222&p=f&t=MnP0xuLukFQwqKvK-0">Figma</a>
        </div>
      </div>
      ),


  },
  {
    id: "connections",
    title: "Competitive Connections",
    pos: { topPct: 38, leftPct: 72 },
    variant: "card",
    size: "sm",
    noScroll: true,
    theme: "default",
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">I'm washed now</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">Vue</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Socket.io</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">MongoDB</span>
          </div>
        </div>

        <p className="text-white/80">
          Real-time, multiplayer version of NYT Connections game, which is thankfully not behind a paywall (yet)
        </p>
        <p className="text-white/80">
          Built the full stack (Vue frontend, Node.js backend with Socket.io, MongoDB) and deployed on Kubernetes. Learned about testing, CI/CD, RBAC, and authentication
        </p>

        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://github.com/ekang100/Competitive-Connections">GitHub</a>
        </div>
      </div>
    ),
  },
  {
    id: "tastetwin",
    title: "Taste Twin",
    pos: { topPct: 27, leftPct: 72 },
    variant: "card",
    size: "sm",
    noScroll: true,
    theme: "default",
    content: (
      <div className="text-sm text-white/85 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="text-white font-medium">Better than Beli</h4>
          <div className="flex gap-1 text-[11px]">
            <span className="rounded bg-white/10 px-1.5 py-0.5">ML</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Data</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">UX</span>
          </div>
        </div>

        <p className="text-white/80">
          Finds your "taste twin" based on restaurant ranking data (star ranking, cuisine, sentiment) and will recommend new foods and restaurants.
          Why? Because Beli has a compability score but nobody knows how it works.
        </p>
        <p>
          Messing around with my machine learning knowledge
        </p>

        <p className="text-white/80">
          Also working on some mockups for UI/UX pain points as a Beli user      
        </p>

        <div className="flex gap-2 pt-1">
          <a className="underline" href="https://github.com/ekang100/taste-twin">GitHub</a>
          <a className="underline" href="https://www.figma.com/design/HwpHCQMBunmQiJKsEhnmqC/Beli-Brain-Dump?node-id=0-1&t=KGMCiOxP1FlrRDOQ-1">Figma</a>
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
    theme: "default",
    content: (
  <div className="text-sm text-white/85 space-y-4">
    {/* Upper: two columns */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
      {/* Left: hard skills */}
      <div className="space-y-1">
        <h4 className="text-white/90 font-medium mb-1">Technical skills</h4>
        <div className="space-y-1">
          <div><span className="text-white/70">Frontend</span>: React, Next.js, Vue, TypeScript, HTML/CSS, Figma</div>
          <div><span className="text-white/70">Backend & APIs</span>: Node.js, Express, Flask, REST</div>
          <div><span className="text-white/70">Data & ML</span>: Python (pandas, NumPy, scikit-learn), PyTorch/TensorFlow, NLP, Jupyter, R, SQL/Snowflake</div>
          <div><span className="text-white/70">Infra & DevOps</span>: Git, Docker, Kubernetes, CI/CD</div>
          <div><span className="text-white/70">Product</span>: Discovery, user interviews, PRDs, roadmaps, Jira/Agile, prototyping</div>
          <div><span className="text-white/70">Analytics & Growth</span>: Tableau, funnels, A/B tests</div>
        </div>
      </div>

      {/* Right: soft skills (same formatted list) */}
      <div className="space-y-1">
        <h4 className="text-white/90 font-medium mb-1">Soft skills</h4>
        <div className="space-y-1">
          <div><span className="text-white/70">Communication</span>: clear written & verbal; narrative docs; presentation storytelling</div>
          <div><span className="text-white/70">Leadership</span>: team building; research synthesis, alignment, decisions under ambiguity</div>
          <div><span className="text-white/70">X-functional leadership</span>: partner w/ design & eng; legal, risk compliance, other partners</div>
          <div><span className="text-white/70">Prioritization</span>: roadmap trade-offs; bias to ship quickly</div>
          <div><span className="text-white/70">Experimentation</span>: define success metrics; read results; iterate</div>
        </div>
      </div>
    </div>

    {/* Lower: interests as paragraph */}
    <div>
      <h4 className="text-white/90 font-medium mb-1">Interests</h4>
      <div className="space-y-3 text-white/85 text-sm leading-relaxed">
        <p className="text-white/75">
          I’m excited about anything at the intersection of AI and people, whether that's a tool to improve productivity, an algorithm that 
          works better than a dating app, or a second brain that helps me learn new things. I love people and thinking about 
          how technology can help us connect in more meaningful ways. 
        </p>

        <p>
          Let's also talk about Duke basketball, Japan, and moving from the suburbs to the greatest(?) city in the world.
        </p>
      </div>
    </div>
  </div>
),
  },
] as const;

function StackCard({ frame }: { frame: CardFrame }) {
  // Render the same card visuals but let height be auto and width fill container
  return (
    <article className={cn(
      "rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-lg",
      "w-full max-w-[720px] mx-auto"
    )}>
      <header className="mb-3">
        <h3 className="text-lg font-semibold tracking-tight text-white/90">{frame.title}</h3>
      </header>
      <div className="text-sm break-words leading-relaxed">
        {frame.content}
      </div>
    </article>
  )
}

function MobileStack() {
  // Collect frames we need
  const about = frames.find((f) => f.id === "about") as CardFrame | undefined;
  const skills = frames.find((f) => f.id === "skills") as CardFrame | undefined;
  const projectsOrder = ["baby", "tastetwin", "proxy", "connections"] as const;

  return (
    <div className="w-full px-4 py-6 space-y-6">
      {/* About */}
      <h2 className="text-xl font-semibold text-white/90">About me</h2>
      {about && <StackCard frame={about} />}

      {/* Skills */}
      <h2 className="text-xl font-semibold text-white/90 pt-2">My brain</h2>
      {skills && <StackCard frame={skills} />}

      {/* Projects */}
      <h2 className="text-xl font-semibold text-white/90 pt-2">What I've worked on</h2>
      <div className="grid grid-cols-1 gap-4">
        {projectsOrder.map((id) => {
          const f = frames.find((fr) => fr.id === id) as CardFrame | undefined;
          return f ? <StackCard key={id} frame={f} /> : null;
        })}
      </div>
    </div>
  );
}


type FrameId = (typeof frames)[number]["id"];
const MIN_SCALE = 0.25;
const MAX_SCALE = 3;

export function BoardCanvas() {
  const isMobile = useIsMobile();
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

  
  // responsive frame scale (based on the actual canvas viewport, not the full window)
  const [frameScale, setFrameScale] = useState(1);
  useEffect(() => {
    const compute = () => {
      const vp = getViewportEl();
      const vw = vp?.clientWidth ?? window.innerWidth;
      const vh = vp?.clientHeight ?? window.innerHeight;
      const s = Math.min(vw / 1280, vh / 800);
      setFrameScale(Math.max(0.35, Math.min(1, s)));
    };
    compute();

    // react to window resizes
    window.addEventListener("resize", compute);

    // react to sidebar open/close or layout shifts
    let ro: ResizeObserver | undefined;
    const vp = getViewportEl();
    if (vp && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => compute());
      ro.observe(vp);
    }

    return () => {
      window.removeEventListener("resize", compute);
      ro?.disconnect();
    };
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

  function resetBoard() {
    // clear focus + route
    clearSelection();
    draggingId.current = null;
    setIsDragging(false);

    // reset every frame back to its initial pos from `frames`
    setPositions(() =>
      frames.reduce((acc, f) => {
        acc[f.id] = { ...f.pos };
        return acc;
      }, {} as Record<FrameId, { topPct: number; leftPct: number }>)
    );

    // wait for DOM to reflow, then fit all frames to the default view
    // (uses your more-zoomed-out margin)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fitAllFrames(FIT_MARGIN_INITIAL);
      });
    });
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

    if (isMobile) {
    return (
      <div className="h-full w-full overflow-y-auto bg-[#181818] text-white">
        <MobileStack />
      </div>
    );
  }

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
            onClick={resetBoard}
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
                      f.size === "lg"
                      ? "w-[640px] h-[360px] md:w-[720px] md:h-[420px] lg:w-[800px] lg:h-[460px]"
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
                          sizeClass,
                          f.theme === "note"
                            ? "rounded-xl bg-amber-200/95 text-black ring-1 ring-amber-300/60 shadow-[0_8px_22px_rgba(0,0,0,0.35)] rotate-[-2deg] p-4"
                            : "rounded-2xl border border-white/10 bg-white/5 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur p-5",
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
                        {f.title && f.theme !== "note" && (
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
                        )}


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
