"use client";
import {useLayoutEffect,useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
export default function HomeDrawing({kind="book"}:{kind?:"book"|"growth"}){
 const ref=useRef<SVGSVGElement>(null);
 useLayoutEffect(()=>{
  const svg=ref.current;if(!svg)return;gsap.registerPlugin(ScrollTrigger);
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
   const timeline=gsap.timeline({scrollTrigger:{trigger:svg,start:"top 95%",end:"bottom 25%",scrub:.65,invalidateOnRefresh:true}});
   svg.querySelectorAll<SVGPathElement>("[data-ink]").forEach((p,i)=>{const len=p.getTotalLength();timeline.fromTo(p,{strokeDasharray:len,strokeDashoffset:len},{strokeDashoffset:0,duration:.65,ease:"none"},i*.08)});
   svg.querySelectorAll<SVGGElement>("[data-motion]").forEach((g,i)=>{timeline.fromTo(g,{y:12,rotation:i%2?-8:8,svgOrigin:kind==="growth"?"145 113":"130 104"},{y:-8,rotation:i%2?5:-5,duration:1.3,ease:"none"},0)});
   svg.querySelectorAll<SVGGElement>("[data-spark]").forEach((g,i)=>timeline.fromTo(g,{y:8,scale:.5,transformOrigin:"center"},{y:-10,scale:1.15,rotation:i%2?30:-30,duration:1.3,ease:"none"},.05));
  },svg);return()=>mm.revert();
 },[kind]);
 return <svg ref={ref} viewBox="0 0 300 130" aria-hidden="true" style={{position:kind==="book"?"absolute":"relative",right:kind==="book"?"4%":undefined,bottom:kind==="book"?10:undefined,opacity:kind==="book"?.55:1,display:"block",width:"min(100%, 260px)",height:110,marginTop:kind==="book"?0:24,color:"#8b9b70",pointerEvents:"none",overflow:"visible"}} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 {kind==="book"?<><g data-motion><path data-ink d="M30 42Q80 20 130 42V104Q80 82 30 104Z"/><path data-ink d="M48 55Q80 42 110 55M48 70Q80 57 110 70"/></g><g data-motion><path data-ink d="M130 42Q180 20 230 42V104Q180 82 130 104Z"/><path data-ink d="M151 55Q180 42 212 55M151 70Q180 57 212 70"/></g><path data-ink d="M236 100Q290 80 265 48Q249 30 265 16" stroke="#ba8b53"/><g data-spark><path data-ink d="M245 18H280M263 4V34" stroke="#ba8b53"/></g></>:<><path data-ink d="M145 113V29"/><g data-motion><path data-ink d="M145 87Q77 94 72 43Q129 39 145 87M72 43L145 87"/></g><g data-motion><path data-ink d="M145 65Q205 71 217 20Q160 20 145 65M217 20L145 65"/></g><path data-ink d="M38 115Q145 96 252 115" stroke="#ba8b53"/><g data-spark><path data-ink d="M45 35V55M35 45H55" stroke="#ba8b53"/></g><g data-spark><path data-ink d="M255 68V88M245 78H265" stroke="#ba8b53"/></g></>}
 </svg>
}

