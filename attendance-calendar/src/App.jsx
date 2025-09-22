import { Badge, Button, Calendar } from "antd";
import React, { useEffect } from "react";
import { useTimerStore } from "./zustand/useTimeStore";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const App = () => {
  const { timer, timer_list, setTimer, setTimerList } = useTimerStore();

  const checkIn = () => {
    setTimer({
      start: Date.now(),
      end: Date.now(),
      calculate: true,
    });
  };

  const checkOut = () => {
    setTimerList({
      [dayjs(timer.start).format("DD-MM-YYYY")]: renderTime(),
    });
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

  const getListData = (value) => {
    let listData = []; // Specify the type of listData

    if (timer_list[value.format("DD-MM-YYYY")]) {
      listData = [
        {
          type: "success",
          content: `Time spent: ${timer_list[value.format("DD-MM-YYYY")]}`,
        },
      ];
    }

    return listData || [];
  };

  const monthCellRender = (value) => {
    const listData = [];
    const matcher = value.format("MM-YYYY");
    for (let key in timer_list) {
      if (key.includes(matcher)) {
        listData.push({
          type: "success",
          content: `Time spent: ${timer_list[value.format("DD-MM-YYYY")]}`,
        });
      }
    }

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="bg-gray-100 min-h-screen w-8/12 mx-auto">
      <div id="header" className="flex justify-between px-4 py-10 items-center">
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
      <div id="content">
        <Calendar cellRender={cellRender} />
      </div>
    </div>
  );
};

export default App;
