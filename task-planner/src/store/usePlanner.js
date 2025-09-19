import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlanner = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (payload) => set((state) => ({ tasks: [...state.tasks, payload] })),
      updateTask: (payload) => set((state) => {
        const tasks = state.tasks;
        const index = tasks.findIndex(row => row.id == payload.id);
        tasks[index] ={
            ...tasks[index],
            status: payload.status
        }

        return {tasks}
      }),
     deleteTask: (payload) => set((state) => {
        const tasks = state.tasks.filter(row => row.id != payload.id);
        return {tasks}
      }),

    }),
    { name: "planner" }
  )
);
