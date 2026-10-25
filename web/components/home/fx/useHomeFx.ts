"use client";
import { useEffect } from "react";
import gsap from "gsap";
export function useHomeFx() {
 useEffect(() => {
  const root = document.querySelector("main");
  if (!root) return;
  const elements = [...root.querySelectorAll<HTMLElement>("[data-fx], [data-card-fx]")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const context = gsap.context(() => {});
  const pending = new Set<HTMLElement>();
  const reveal = (el: HTMLElement) => {
   if (!pending.delete(el)) return;
   context.add(() => { gsap.to(el, {opacity:1,y:0,duration:.4,ease:"power2.out",clearProps:"opacity,transform"}); });
   observer.unobserve(el);
  };
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     reveal(entry.target as HTMLElement);
    }
   });
  }, {rootMargin:"0px 0px 80px 0px",threshold:0});
  context.add(() => elements.forEach(el => {
   el.dataset.fxReady = "true";
   if (reduced || el.getBoundingClientRect().top < innerHeight + 80) return;
   gsap.set(el,{opacity:0,y:14}); pending.add(el); observer.observe(el);
  }));
  // A fast swipe or anchor jump can skip an observer's intersection entirely.
  let frame = 0;
  const onScroll = () => {
   if (frame) return;
   frame = requestAnimationFrame(() => {
    frame = 0;
    pending.forEach(el => { if (el.getBoundingClientRect().top < innerHeight + 80) reveal(el); });
   });
  };
  window.addEventListener("scroll", onScroll, {passive:true});
  const tiltCleanups: (() => void)[] = [];
  if (matchMedia("(hover:hover) and (min-width:1101px)").matches && !reduced) {
   root.querySelectorAll<HTMLElement>("[data-tilt]").forEach(el => {
    const amount = Number(el.dataset.tilt || 7);
    const move = (event: MouseEvent) => {
     const box = el.getBoundingClientRect();
     gsap.to(el, {
      rotateY: ((event.clientX - box.left) / box.width - .5) * amount * 2,
      rotateX: -((event.clientY - box.top) / box.height - .5) * amount * 2,
      transformPerspective: 800, duration: .25, ease: "power2.out", overwrite: "auto"
     });
    };
    const leave = () => gsap.to(el, {rotateX:0,rotateY:0,duration:.35,ease:"power2.out"});
    el.addEventListener("mousemove",move);
    el.addEventListener("mouseleave",leave);
    tiltCleanups.push(() => {el.removeEventListener("mousemove",move);el.removeEventListener("mouseleave",leave);gsap.killTweensOf(el);});
   });
  }
  return () => {window.removeEventListener("scroll",onScroll);cancelAnimationFrame(frame);observer.disconnect();tiltCleanups.forEach(fn=>fn());context.revert();};
 },[]);
}
