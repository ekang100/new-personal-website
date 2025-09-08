import { create } from "zustand";

export type FrameId = "about" | "projects" | "skills";

type BoardState = {
  activeFrame: FrameId | null;
  setActiveFrame: (id: FrameId | null) => void;
  zoom: number;              // 0.25 – 3
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