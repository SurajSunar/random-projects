import React, { useState } from "react";
import { useTimerStore } from "./zustand/useTimeStore";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import CalenderView from "./CalenderView";
import Header from "./Header";
import Footer from "./Footer";

dayjs.extend(duration);

const App = () => {
  const { timer } = useTimerStore();
  const [selectedDate, setSelectedDate] = useState(dayjs(timer.start || Date.now()));

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header selectedDate={selectedDate}/>
      <CalenderView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Footer/>
    </div>
  );
};

export default App;
