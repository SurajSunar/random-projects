import React, { useEffect, useState } from "react";

function Timer() {
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval)
  });

  return <h1 className="text-xl font-bold hidden lg:block">{timer}</h1>;
}

export default Timer;
