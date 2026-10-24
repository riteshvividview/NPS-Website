"use client";
import Image from "next/image";
import admissionsImage from "@/public/Home Page/01-hero/slider2.png";
import friendshipImage from "@/public/Home Page/01-hero/slider3.png";
import computerImage from "@/public/Home Page/01-hero/slider4.png";
import {useEffect,useRef,useState} from "react";
import styles from "./Hero.module.css";
import type {HomeContent} from "@/content/home";
export default function Hero({content}:{content:HomeContent["hero"]}){

 const [slide,setSlide]=useState(1),[paused,setPaused]=useState(false),[drag,setDrag]=useState(0),[snap,setSnap]=useState(false);
 const [ready,setReady]=useState(false);
 const pointer=useRef<{x:number;y:number}|null>(null);
 const moving=useRef(false);
 const track=useRef<HTMLDivElement>(null);
 const finish=()=>{
   const destination=slide===5?1:slide===0?4:slide;
   if(destination!==slide){
     const videos=track.current?.querySelectorAll('video');
     if(videos?.length===2){const source=slide===5?videos[1]:videos[0];const target=slide===5?videos[0]:videos[1];if(Number.isFinite(source.currentTime))target.currentTime=source.currentTime;}
     setSnap(true);setSlide(destination);
   }else moving.current=false;
 };
 useEffect(()=>{const done=()=>setReady(true);if(!document.querySelector('[data-home-loader]'))done();window.addEventListener('nps:home-ready',done);return()=>window.removeEventListener('nps:home-ready',done)},[]);
 useEffect(()=>{if(!snap)return;let second=0;const first=requestAnimationFrame(()=>{second=requestAnimationFrame(()=>{setSnap(false);moving.current=false})});return()=>{cancelAnimationFrame(first);cancelAnimationFrame(second)}},[snap]);
 const stepSlide=(direction:number)=>{
   if(moving.current||snap)return;
   if(matchMedia('(prefers-reduced-motion: reduce)').matches){setSlide(v=>((v-1+direction+4)%4)+1);return;}
   moving.current=true;setSlide(v=>v+direction);
 };
 useEffect(()=>{if(!moving.current||snap)return;const timer=setTimeout(finish,1000);return()=>clearTimeout(timer)},[slide,snap]);
 const copy=[{tag:content.eyebrow,title:"A kinder, brighter tomorrow.",text:content.subcopy,label:content.ctaPrimary.label,href:content.ctaPrimary.href},{tag:"YOUR NEXT CHAPTER",title:"A place to begin. Room to become.",text:"Discover learning, friendships and possibilities at Niraj Public School.",label:"Explore admissions",href:"https://niraj.myclassboard.com/ApplicationForm_Custom/09F71BA1-820B-4595-8D20-E0AAF4A95CAA/1/"},{tag:"LEARN. GROW. BELONG.",title:"Big smiles. Lasting friendships.",text:"A welcoming school community where children find their voice and grow together.",label:"Meet our community",href:"/the-people/students-at-nps"},{tag:"CURIOUS MINDS AT WORK",title:"Today's questions. Tomorrow's possibilities.",text:"Space to explore technology, build confidence and discover new ways of thinking.",label:"Explore our campus",href:"/the-place/nps-campus-facilities"}];
 useEffect(()=>{if(!ready||paused||document.hidden||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=setTimeout(()=>stepSlide(1),4000);return()=>clearTimeout(timer)},[paused,slide,ready,snap]);
 return <section id="hero" className={styles.carousel} tabIndex={0} aria-label="Discover Niraj Public School. Swipe or use arrow keys to change slides. Press space to pause or play." onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();setPaused(true);stepSlide(e.key==="ArrowRight"?1:-1)}if(e.key===" "){e.preventDefault();setPaused(v=>!v)}}} onPointerDown={e=>{if(moving.current||snap||(e.target as HTMLElement).closest('a,button'))return;pointer.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);setPaused(true)}} onPointerMove={e=>{if(pointer.current)setDrag(Math.max(-100,Math.min(100,e.clientX-pointer.current.x)))}} onPointerUp={e=>{if(pointer.current){const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))stepSlide(dx<0?1:-1)}pointer.current=null;setDrag(0)}} onPointerCancel={()=>{pointer.current=null;setDrag(0)}}>
 <div ref={track} className={styles.carouselTrack} onTransitionEnd={e=>{if(e.target===e.currentTarget&&e.propertyName==='transform')finish()}} style={{transform:'translateX(calc(-'+slide*100+'% + '+drag+'px))',transition:snap||drag?'none':undefined}}>
 {[copy[3],...copy,copy[0]].map((item,position)=>{const i=(position+3)%4;const active=(slide+3)%4===i;return <article className={styles.carouselSlide} key={position} data-slide={i} aria-hidden={slide!==position} inert={slide!==position}>
 <div className={styles.carouselVisual}>{i===0?<div className={styles.composite}>          <div className={styles.imageZone}>
            <div className={`${styles.layer} ${styles.layerSky}`}>
              <Image src={content.images.sky} alt="" fill style={{objectFit:"contain"}} priority />
            </div>

            <div className={`${styles.layer} ${styles.layerClouds}`} id={position===5?undefined:"layer-clouds"}>
              <video className={styles.cloudCanvas} autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/home-sky.mp4" type="video/mp4" /></video>
              <img
                className={styles.cloudFallback}
                id={position===5?undefined:"cloud-fallback"}
                src={content.images.cloudFallback}
                alt=""
              />
            </div>

            <div className={`${styles.layer} ${styles.layerTrees}`}>
              <Image src={content.images.trees} alt="" fill style={{objectFit:"contain"}} />
            </div>

            <div className={`${styles.layer} ${styles.layerSchool}`}>
              <Image
                src={content.images.school}
                alt="Niraj Public School campus building"
                fill
                style={{objectFit:"contain"}}
              />
            </div>

            <div className={`${styles.layer} ${styles.layerChildren}`}>
              <Image
                src={content.images.children}
                alt="Students looking up, full of hope"
                fill
                style={{objectFit:"contain"}}
              />
            </div>

            {/* Lives in the same proportional crop as the layers above it
                (same inset:0 of imageZone, same object-fit:cover) rather
                than its own separately-cropped box Ã¢â‚¬â€ it's drawn on the
                same 1672x941 canvas as them, so this is what keeps it
                lined up with where the children's photo actually ends
                instead of leaving a gap of bare sky between the two. */}
            <div className={`${styles.layer} ${styles.layerBook}`}>
              <Image src={content.images.book} alt="" fill style={{objectFit:"contain"}} />
            </div>
          </div>
</div>:<Image src={[admissionsImage,admissionsImage,friendshipImage,computerImage][i]} alt={['','Niraj Public School admissions announcement','Students enjoying friendship at school','Student exploring computers'][i]} fill loading="eager" sizes="100vw" style={{objectFit:'contain'}} draggable={false}/>}</div>
 {i !== 1 && <div className={styles.carouselCopy} data-active={active}><p>{item.tag}</p>{position===1?<h1>{item.title}</h1>:<h2>{item.title}</h2>}<div>{item.text}</div><a href={item.href}>{item.label} <span aria-hidden="true">&#8599;</span></a></div>}
 </article>})}
 </div>
 </section>
}
