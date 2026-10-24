"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Breadcrumb from "../shared/Breadcrumb";
import EditorialArtwork from "../shared/EditorialArtwork";
import FacilityArtwork from "./FacilityArtwork";
import type { EditorialHeroProps } from "../shared/EditorialHero";
import styles from "./Hero.module.css";

export default function Hero({ breadcrumb, facilities = [], headline }: Omit<EditorialHeroProps,"kind">) {
 const root = useRef<HTMLElement>(null);
 const [selected,setSelected] = useState(0);
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const mm=gsap.matchMedia();
  mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)",()=>{
   const el=root.current!;
   const tl=gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=110%",pin:true,scrub:1,invalidateOnRefresh:true}});
   tl.to(el.querySelector('[data-campus-title]'),{yPercent:-65,opacity:.12,duration:1},0)
    .to(el.querySelector('[data-campus-world]'),{scale:1.2,y:-40,rotate:0,duration:1},0)
    .to(el.querySelectorAll('[data-campus-node]'),{y:(i)=>i%2? -50:35,rotate:(i)=>i%2?6:-5,stagger:.03,duration:1},0)
    .fromTo(el.querySelector('[data-campus-message]'),{y:60,opacity:0},{y:0,opacity:1,duration:.4},.6);
  },root);
  mm.add("(hover:hover) and (prefers-reduced-motion: no-preference)",()=>{
   const el=root.current!;const world=el.querySelector('[data-campus-parallax]');
   const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();gsap.to(world,{x:(e.clientX/r.width-.5)*24,y:(e.clientY/r.height-.5)*16,duration:.9,overwrite:'auto'});el.style.setProperty('--light-x',e.clientX+'px');el.style.setProperty('--light-y',(e.clientY-r.top)+'px');};
   const reset=()=>{gsap.to(world,{x:0,y:0,duration:.7});};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset);
   return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);};
  },root);
  return()=>mm.revert();
 },[]);
 return <section ref={root} className={styles.hero}>
  <div className={styles.grid} aria-hidden="true"/>
  <Breadcrumb items={breadcrumb} className={styles.breadcrumb}/>
  <div className={styles.heading} data-campus-title><p>NPS CAMPUS FACILITIES / AN EXPLORATION</p><h1 aria-label={headline}>Room to <em>become.</em></h1><span>Seven spaces. A thousand possibilities.</span></div>
  <div className={styles.world} data-campus-world><div data-campus-parallax className={styles.parallax}>
   <div className={styles.orbit} aria-hidden="true"/><div className={styles.building}><EditorialArtwork kind="campus"/></div>
   {facilities.map((f,i)=><button key={f.title} data-campus-node className={styles.node} data-position={i} aria-pressed={selected===i} onClick={()=>setSelected(i)}><FacilityArtwork title={f.title}/><span>{String(i+1).padStart(2,'0')} / {f.title}</span></button>)}
  </div></div>
  <div className={styles.bottom}><div className={styles.selected} aria-live="polite"><small>YOUR NEXT STOP</small><a href={'#facility-'+facilities[selected]?.title.toLowerCase()}>{facilities[selected]?.title} <span>&rarr;</span></a></div><p data-campus-message className={styles.message}>A campus built around<br/><em>curiosity.</em></p><a className={styles.scroll} href="#page-collection">Take a look around <span>&rarr;</span></a></div>
 </section>;
}
