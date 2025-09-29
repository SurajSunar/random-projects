import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookmark = create(persist(
    (set) => ({
        bookmarks: [],
        setBookmark: (payload) => set(state => ({bookmarks:[...state.bookmarks, {...payload, id: Date.now()}]})),
        removeBookmark: (id) => set(state => ({bookmarks: state.bookmarks.filter(row => row.id !== id) }))
    }),
    {
        name: 'bookmarks' 
    }
))