"use client";
import {useState} from 'react';
import styles from './StorySpark.module.css';
import AuthorInk from './AuthorInk';
const characters=['a curious inventor','a quiet explorer','a forgetful magician','a determined young artist'];
const places=['a library with no doors','a city above the clouds','a classroom after midnight','a garden that remembers'];
const twists=['every question changes the weather','one page is missing from tomorrow','the smallest voice holds the answer','nothing casts the right shadow'];
export default function StorySpark(){const [picks,setPicks]=useState([0,0,0]);const lists=[characters,places,twists];const labels=['A character','A place','A twist'];return <section className={styles.section}><AuthorInk kind="spark" className={styles.illustration}/><div className={styles.content}><p>YOUR FIRST LINE STARTS HERE</p><h2>A little spark.<br/><em>An entire story.</em></h2><span>Change a piece. See where your imagination takes it.</span><div className={styles.controls}>{labels.map((label,i)=><button key={label} onClick={()=>setPicks(p=>p.map((v,j)=>i===j?(v+1)%lists[i].length:v))}><small><span className={styles.index}>0{i+1}</span>{label}</small><strong key={picks[i]}>{lists[i][picks[i]]}</strong><span>Try another &rarr;</span></button>)}</div><p className={styles.prompt} aria-live="polite">Imagine {characters[picks[0]]} in {places[picks[1]]}, where {twists[picks[2]]}.</p><span className={styles.footnote}>A writing prompt for you. The books above are our students&apos; published work.</span></div></section>}
