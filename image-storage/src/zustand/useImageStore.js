import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useImageStore = create(
  persist(
    (set) => ({
      images: [],
      setImage: (binary) =>
        set((state) => ({
          images: [...state.images, binary],
        })),
    }),
    { name: "image-store" }
  )
);
