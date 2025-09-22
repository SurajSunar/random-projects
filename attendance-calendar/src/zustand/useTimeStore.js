import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTimerStore = create(persist(
   (set) => ({
     timer: {},
     timer_list: {},
     setTimer: (value) => {
        set(state=>({timer: ({...state.timer, ...value}) }))
     },
     setTimerList: (value) => {
        set(state=>({timer: {}, timer_list: ({...state.timer_list, ...value}) }))
     },
    
   }),
    {name: 'attendance-timer'}
))