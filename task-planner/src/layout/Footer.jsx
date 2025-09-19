import React from "react";
import { usePlanner } from "../store/usePlanner";

function Footer() {
  const { filterTasks } = usePlanner();

  return (
    <footer className="bg-gradient-to-r from-blue-300 via-amber-300 to-orange-200 h-[60px] fixed bottom-0 left-0 w-full  flex justify-between items-center px-8">
      <h1 className="text-xl font-bold">
        Total Task: {filterTasks().length || 0}
      </h1>
      <p className="text-gray-400">Developed for Learning</p>
    </footer>
  );
}

export default Footer;
