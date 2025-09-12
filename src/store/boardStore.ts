import { create } from "zustand";

// Include ALL frame ids you use anywhere in the app (banner + project cards)
export type FrameId =
  | "about"
  | "about title"
  | "skills title"
  | "projects"     // banner
  | "skills"
  | "baby"
  | "proxy"
  | "connections"
  | "projects-note"
  | "tastetwin";

type BoardState = {
  activeFrame: FrameId | null;
  setActiveFrame: (id: FrameId | null) => void;
  // 0.25 – 3
  zoom: number;
  setZoom: (z: number) => void;
  pan: { x: number; y: number };
  setPan: (p: { x: number; y: number }) => void;
};

export const useBoardStore = create<BoardState>((set) => ({
  activeFrame: null,
  setActiveFrame: (id) => set({ activeFrame: id }),
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
  pan: { x: 0, y: 0 },
  setPan: (pan) => set({ pan }),
}));
