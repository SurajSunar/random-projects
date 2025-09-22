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
      deleteImage: (id) => 
         set((state) => {
            const images = state.images.filter(row => row.id !== id) 
           return  {images }
         }),  
    }),
    { name: "image-store" }
  )
);
