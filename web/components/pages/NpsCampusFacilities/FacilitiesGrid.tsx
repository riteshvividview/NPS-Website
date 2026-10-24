"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FacilityArtwork from "./FacilityArtwork";
import type { NpsCampusFacilitiesContent } from "@/content/pages/npsCampusFacilities";
import styles from "./FacilitiesGrid.module.css";
const subtitles:Record<string,string>={Lunch:'Nourish the day.',Classrooms:'Make room for ideas.',Sports:'Find your next move.',Excursions:'Let the world teach.',Library:'A thousand new worlds.',Labs:'Ask. Test. Discover.',Carpentry:'Make something real.'};
const choices=[['Make something','Carpentry'],['Solve a mystery','Labs'],['Get lost in a story','Library'],['Get moving','Sports']];
export default function FacilitiesGrid({content}:{content:NpsCampusFacilitiesContent['facilities']}){
 const root=useRef<HTMLElement>(null);const [choice,setChoice]=useState<string|null>(null);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(min-width:900px) and (prefers-reduced-motion:no-preference)',()=>{const cards=gsap.utils.toArray<HTMLElement>('[data-campus-chapter]',root.current!);cards.forEach((card,i)=>{const next=cards[i+1];if(next)gsap.to(card.querySelector('[data-chapter-inner]'),{scale:.94,opacity:.35,ease:'none',scrollTrigger:{trigger:next,start:'top bottom',end:'top 110px',scrub:true}});gsap.fromTo(card.querySelector('svg'),{rotate:-12,y:35},{rotate:8,y:-25,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:1}});});},root);return()=>mm.revert();},[]);
 return <section ref={root} className={styles.section} id="page-collection">
  <div className={styles.intro}><p>{content.eyebrow} / 07 SPACES</p><h2>Learning doesn&apos;t<br/>stay in <em>one room.</em></h2><span>Scroll through a day of possibilities.</span></div>
  <div className={styles.chapters}>{content.items.map((item,i)=><article className={styles.chapter} data-campus-chapter data-tone={item.tone} id={'facility-'+item.title.toLowerCase()} key={item.title}><div className={styles.chapterInner} data-chapter-inner><div className={styles.copy}><span className={styles.number}>{String(i+1).padStart(2,'0')} / 07</span><p className={styles.label}>{item.title}</p><h3>{subtitles[item.title]}</h3><p className={styles.description}>{item.description}</p><a href={i<6?'#facility-'+content.items[i+1].title.toLowerCase():'#campus-discovery'}>{i<6?'Next: '+content.items[i+1].title:'Find your corner'} <span>&rarr;</span></a></div><div className={styles.scene}><div className={styles.circle}/><div className={styles.art}><FacilityArtwork title={item.title}/></div><span className={styles.sceneLabel}>NIRAJ / {item.title.toUpperCase()}</span></div></div></article>)}</div>
  <div className={styles.discovery} id="campus-discovery"><p>A LITTLE CURIOSITY TEST</p><h2>Where will yours<br/>take you?</h2><span>Pick what sounds like your kind of afternoon.</span><div className={styles.choices}>{choices.map(([label,title])=><button aria-pressed={choice===title} key={title} onClick={()=>setChoice(title)}>{label} <span>&rarr;</span></button>)}</div><div className={styles.answer} aria-live="polite">{choice?<><span>Your corner of campus</span><a href={'#facility-'+choice.toLowerCase()}>{choice} &rarr;</a><p>{subtitles[choice]}</p></>:<p>Every interest has somewhere to grow.</p>}</div></div>
 </section>;
}
