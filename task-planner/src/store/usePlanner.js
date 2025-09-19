import { create } from "zustand";
import { persist } from "zustand/middleware";

function formatDt(dt) {
  dt = new Date(dt);
  return dt.getDay() + "-" + dt.getMonth() + "-" + dt.getFullYear();
}

export const usePlanner = create(
  persist(
    (set, get) => ({
      tasks: [],
      filterDt: null,
      setFilter: (dt) => set((state) => ({ ...state, filterDt: dt })),
      addTask: (payload) =>
        set((state) => ({
          tasks: [...state.tasks, { ...payload, created_at: new Date() }],
        })),
      updateTask: (payload) =>
        set((state) => {
          const tasks = state.tasks;
          const index = tasks.findIndex((row) => row.id == payload.id);
          tasks[index] = {
            ...tasks[index],
            ...payload,
            updated_by: new Date(),
          };

          return { tasks };
        }),
      deleteTask: (payload) =>
        set((state) => {
          const tasks = state.tasks.filter((row) => row.id != payload.id);
          return { tasks };
        }),
      filterTasks: () => {
        const ff = get().filterDt
          ? get().tasks.filter(
              (row) => formatDt(row.created_at) === formatDt(get().filterDt)
            )
          : get().tasks;
        return ff;
      },
    }),
    { name: "planner" }
  )
);
