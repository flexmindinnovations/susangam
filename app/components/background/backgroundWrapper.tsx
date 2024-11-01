"use client";
import React, { useEffect } from "react";
import { useWindowSize } from "react-use";

const DynamicCircles = ({ children }: { children: React.ReactNode }) => {
  const { width, height } = useWindowSize();
  const numShapes = 20;
  const margin = 50;
  const shapes: HTMLElement[] = [];

  useEffect(() => {
    const shapeContainer = document.querySelector(".shapes") as HTMLElement;
    generateShapes(shapeContainer);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [width, height]);

  const generateShapes = (shapeContainer: HTMLElement) => {
    for (let i = 0; i < numShapes; i++) {
      const size = getRandom(100, 300);
      const maxX = width - size - margin;
      const maxY = height - size - margin;
      const initialX = getRandom(margin, maxX);
      const initialY = getRandom(margin, maxY);
      const shape = createShape(size, initialX, initialY, i);
      shapeContainer.appendChild(shape);
      const animationDuration = getRandom(10, 30);
      shape.style.animation = `move${i % 5} ${animationDuration}s infinite ease-in-out alternate`;
      if (i < 5) {
        createKeyframes(i, margin, maxX, maxY, initialX, initialY);
      }
    }
  };

  const getRandom = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const createShape = (size: number, x: number, y: number, zIndex: number): HTMLElement => {
    const shape = document.createElement("div");
    shape.classList.add("circle");
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    const colors = [
      "bg-purple-500/50",
      "bg-pink-500/50",
      "bg-teal-500/50",
      "bg-blue-500/50",
      "bg-red-500/50",
      "bg-green-500/50",
      "bg-yellow-500/50",
      "bg-orange-500/50",
      "bg-indigo-500/50",
      "bg-rose-500/50",
    ];
    shape.classList.add(colors[Math.floor(getRandom(0, colors.length))]);
    shape.style.borderRadius = "50%";
    shape.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    shape.style.filter = "blur(20px)";
    shape.style.position = "absolute";
    shape.style.zIndex = `${zIndex}`;
    shape.style.transform = `translate(${x}px, ${y}px)`;
    shapes.push(shape);
    return shape;
  };

  const createKeyframes = (index: number, margin: number, maxX: number, maxY: number, initialX: number, initialY: number) => {
    const keyframes = `
      @keyframes move${index} {
        0% { transform: translate(${initialX}px, ${initialY}px); }
        25% { transform: translate(${getRandom(margin, maxX)}px, ${getRandom(margin, maxY)}px); }
        50% { transform: translate(${getRandom(margin, maxX)}px, ${getRandom(margin, maxY)}px); }
        75% { transform: translate(${getRandom(margin, maxX)}px, ${getRandom(margin, maxY)}px); }
        100% { transform: translate(${initialX}px, ${initialY}px); }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
  };

  const handleMouseMove = (() => {
    let isAnimating = false;
    return (event: MouseEvent) => {
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(() => {
          shapes.forEach((shape) => {
            const shapeRect = shape.getBoundingClientRect();
            const shapeX = shapeRect.left + shapeRect.width / 2;
            const shapeY = shapeRect.top + shapeRect.height / 2;
            const dx = shapeX - event.clientX;
            const dy = shapeY - event.clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const sensitivity = Math.min(300 + distance / 2, 800);
            if (distance < sensitivity) {
              const proximityFactor = Math.max(100, distance);
              const offsetX = (dx / proximityFactor) * 50;
              const offsetY = (dy / proximityFactor) * 50;
              shape.style.transition = "transform 0.2s ease";
              shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
          });
          isAnimating = false;
        });
      }
    };
  })();

  return (
    <div
      className="shapes backdrop-blur-lg"
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden"
      }}
    >
      <div
        className="absolute flex items-center justify-center top-0 bottom-0 z-20 w-full h-full backdrop-blur-md"
        style={{
          overflow: "hidden",
          backgroundColor: "rgba(240, 255, 255, 0.5)"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DynamicCircles;