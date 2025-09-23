import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTimerStore = create(
  persist(
    (set) => ({
      timer: {},
      timer_list: {},
      setTimer: (value) => {
        set((state) => ({ timer: { ...state.timer, ...value } }));
      },
      setTimerList: (key, time) => {
        set((state) => {
          
          const value = {[key]: [...state.timer_list[key]|| [], ...[time]]}
          return {
            timer: {},
            timer_list: { ...state.timer_list, ...value },
          };
        });
      },
    }),
    { name: "attendance-timer" }
  )
);
