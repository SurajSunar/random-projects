import React from "react";
import { useTimerStore } from "./zustand/useTimeStore";
import { Badge, Calendar } from "antd";

const CalenderView = ({ selectedDate, setSelectedDate }) => {
  const { timer, timer_list } = useTimerStore();

  const monthCellRender = (value) => {
    const listData = [];
    const matcher = value.format("MM-YYYY");
    for (let key in timer_list) {
      if (key.includes(matcher)) {
        listData.push({
          type: "success",
          content: timer_list[key]?.map((time) => `Time spent: ${time}`),
        });
      }
    }

    return renderTemplate(listData);
  };

  const dateCellRender = (value) => {
    let listData = [];

    if (timer_list[value.format("DD-MM-YYYY")]) {
      listData = [
        {
          type: "success",
          content: timer_list[value.format("DD-MM-YYYY")]?.map(
            (time) => `Time spent: ${time}`
          ),
        },
      ];
    }

    return renderTemplate(listData);
  };

  const renderTemplate = (listData) => {
    return (
      <ul className="events">
        {listData.map((item) =>
          item.content?.map((time, index) => (
            <li key={index}>
              <Badge status={item.type} text={time} />{" "}
            </li>
          ))
        )}
      </ul>
    );
  };

  const onSelect = (newValue) => {
    setSelectedDate(newValue);
  };
  const onPanelChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div id="content" className="px-2 lg:w-8/12 mx-auto">
      <Calendar
        disabledDate={() => !!timer.start}
        value={selectedDate}
        cellRender={cellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CalenderView;
