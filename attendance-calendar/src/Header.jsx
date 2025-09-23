import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useTimerStore } from "./zustand/useTimeStore";
import { Button } from "antd";

const Header = ({ selectedDate }) => {
  const { timer, setTimer, setTimerList } = useTimerStore();

  const checkIn = () => {
    console.log('inside checkin')
    setTimer({
      start: selectedDate,
      end: Date.now(),
      calculate: true,
    });
  };

  const checkOut = () => {
    setTimerList(dayjs(timer.start).format("DD-MM-YYYY"), renderTime());
  };

  const renderTime = () => {
    if (!timer.calculate) return;

    const diffInMs = dayjs(timer.end).diff(timer.start);
    const duration = dayjs.duration(diffInMs);

    const seconds = duration.seconds();
    const minutes = duration.minutes();
    const hours = duration.hours();

    return [hours, minutes, seconds].reduce((acc, val) => {
      acc && (acc += ":");
      acc += (val < 10 && "0") + val;
      return acc;
    }, "");
  };

   useEffect(() => {
    let interval;
    if (timer.calculate) {
      interval = setInterval(() => {
        setTimer({
          end: Date.now(),
        });
      }, 1000);
    }

    return () => interval && clearInterval(interval);
  });

  return (
    <div
      id="header"
      className="flex flex-col md:flex-row gap-y-4 justify-between px-4 lg:px-20 py-10 items-center bg-gradient-to-r from-blue-500 via-lime-300 to-indigo-300"
    >
      <h1 className="text-3xl font-bold">Attendance Calendar</h1>
      <div className="flex gap-x-4">
        <h1 className="text-2xl font-bold">{renderTime()}</h1>
        {!timer.calculate && (
          <Button
            className="!bg-green-500 !text-white !text-lg"
            onClick={checkIn}
          >
            Check In
          </Button>
        )}
        {timer.calculate && (
          <Button
            className="!bg-green-500 !text-white !text-lg"
            onClick={checkOut}
          >
            Check Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
