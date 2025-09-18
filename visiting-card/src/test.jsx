import { useState, useRef } from "react";

export default function DraggableWithResizableChild() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 150, height: 150 });

  const dragging = useRef(false);
  const resizing = useRef(false);

  const startDrag = (e) => {
    if (resizing.current) return; // Prevent drag when resizing
    dragging.current = true;
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const onMouseMove = (e) => {
      if (!dragging.current) return;
      setPosition({ x: e.clientX - startX, y: e.clientY - startY });
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const startResize = (e) => {
    e.stopPropagation(); // Prevent triggering parent drag
    resizing.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (e) => {
      if (!resizing.current) return;
      setSize({
        width: startWidth + (e.clientX - startX),
        height: startHeight + (e.clientY - startY),
      });
    };

    const onMouseUp = () => {
      resizing.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      onMouseDown={startDrag}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        background: "#eee",
        border: "1px solid #ccc",
        userSelect: "none",
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div
          onMouseDown={startResize}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 15,
            height: 15,
            background: "#333",
            cursor: "se-resize",
          }}
        />
      </div>
    </div>
  );
}