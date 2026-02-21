"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX + "px";
        cursorRef.current.style.top = mouseY + "px";
      }
    };

    let raf: number;
    const animate = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (followerRef.current) {
        followerRef.current.style.left = followerX + "px";
        followerRef.current.style.top = followerY + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);

    // Grow cursor on hoverable elements
    const grow = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "20px";
        cursorRef.current.style.height = "20px";
        cursorRef.current.style.background = "var(--mustard)";
      }
      if (followerRef.current) {
        followerRef.current.style.width = "56px";
        followerRef.current.style.height = "56px";
      }
    };
    const shrink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "12px";
        cursorRef.current.style.height = "12px";
        cursorRef.current.style.background = "var(--black)";
      }
      if (followerRef.current) {
        followerRef.current.style.width = "36px";
        followerRef.current.style.height = "36px";
      }
    };

    document.querySelectorAll("a, button, .nb-btn, .nb-btn-outline, .nb-card, .nb-card-mustard, .nb-card-black").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
