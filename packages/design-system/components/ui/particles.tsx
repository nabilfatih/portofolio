"use client";

import { getThemeAppearance } from "@repo/design-system/lib/theme/registry";
import { cn } from "@repo/design-system/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface Circle {
  alpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  size: number;
  targetAlpha: number;
  translateX: number;
  translateY: number;
  x: number;
  y: number;
}

interface ParticlesProps {
  className?: string;
  ease?: number;
  quantity?: number;
  staticity?: number;
}

/** Renders the portfolio's subtle desktop particle field without loading a canvas library. */
export function Particles({
  className,
  ease = 50,
  quantity = 50,
  staticity = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const appearance = getThemeAppearance(resolvedTheme);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // biome-ignore lint/suspicious/noUnnecessaryConditions: React DOM refs are nullable before mount.
    if (!canvas) {
      return;
    }

    // biome-ignore lint/suspicious/noUnnecessaryConditions: React DOM refs are nullable before mount.
    if (!container) {
      return;
    }

    const mountedCanvas = canvas;
    const mountedContainer = container;

    const context = mountedCanvas.getContext("2d");
    if (!context) {
      return;
    }

    const drawingContext = context;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 639px)");

    if (reducedMotion.matches || smallScreen.matches) {
      return;
    }

    const circles: Circle[] = [];
    const mouse = { x: 0, y: 0 };
    let frameId = 0;
    let height = 0;
    let width = 0;

    function createCircle(): Circle {
      return {
        alpha: 0,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        magnetism: 0.1 + Math.random() * 4,
        size: Math.floor(Math.random() * 2) + 1,
        targetAlpha: Number((Math.random() * 0.6 + 0.1).toFixed(1)),
        translateX: 0,
        translateY: 0,
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
    }

    function resizeCanvas() {
      width = mountedContainer.offsetWidth;
      height = mountedContainer.offsetHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      mountedCanvas.width = width * pixelRatio;
      mountedCanvas.height = height * pixelRatio;
      mountedCanvas.style.width = `${width}px`;
      mountedCanvas.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      circles.length = 0;
      for (let index = 0; index < quantity; index += 1) {
        circles.push(createCircle());
      }
    }

    function drawCircle(circle: Circle) {
      drawingContext.save();
      drawingContext.translate(circle.translateX, circle.translateY);
      drawingContext.beginPath();
      drawingContext.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      drawingContext.fillStyle =
        appearance === "dark"
          ? `rgb(255 255 255 / ${circle.alpha})`
          : `rgb(0 0 0 / ${circle.alpha})`;
      drawingContext.fill();
      drawingContext.restore();
    }

    function updateCircle(circle: Circle) {
      const edgeDistance = Math.min(
        circle.x + circle.translateX - circle.size,
        width - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        height - circle.y - circle.translateY - circle.size
      );
      const edgeOpacity = Math.max(0, Math.min(1, edgeDistance / 20));

      if (edgeOpacity === 1) {
        circle.alpha = Math.min(circle.targetAlpha, circle.alpha + 0.02);
      } else {
        circle.alpha = circle.targetAlpha * edgeOpacity;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;
    }

    function isOutside(circle: Circle) {
      return (
        circle.x < -circle.size ||
        circle.x > width + circle.size ||
        circle.y < -circle.size ||
        circle.y > height + circle.size
      );
    }

    function animate() {
      drawingContext.clearRect(0, 0, width, height);

      for (let index = 0; index < circles.length; index += 1) {
        const circle = circles[index];
        updateCircle(circle);

        if (isOutside(circle)) {
          circles[index] = createCircle();
        }

        drawCircle(circles[index]);
      }

      frameId = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = mountedCanvas.getBoundingClientRect();
      const x = event.clientX - bounds.left - width / 2;
      const y = event.clientY - bounds.top - height / 2;
      const isInside =
        x < width / 2 && x > -width / 2 && y < height / 2 && y > -height / 2;

      if (!isInside) {
        return;
      }

      mouse.x = x;
      mouse.y = y;
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(mountedContainer);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    resizeCanvas();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
    };
  }, [appearance, ease, quantity, staticity]);

  return (
    <div
      aria-hidden="true"
      className={cn("hidden sm:block", className)}
      ref={containerRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
