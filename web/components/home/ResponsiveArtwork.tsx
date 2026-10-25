import Image, { type StaticImageData } from "next/image";
/** The browser selects the matching composition before downloading. */
export default function ResponsiveArtwork({name,alt,desktop,className,eager=false}: {
 name:string;alt:string;desktop?:StaticImageData;className?:string;eager?:boolean;
}) {
 const base="/Home%20Page/08-responsive/"+name;
 const mobileImage=base+(name==="admissions"?"-mobile-no-grass.webp":["friendship","computer"].includes(name)?"-mobile-clear.webp":"-mobile.webp");
 return <picture className={className}>
  <source media="(max-width:640px)" srcSet={mobileImage}/>
  <source media="(max-width:1100px)" srcSet={base+"-tablet.webp"}/>
  {desktop ? <Image src={desktop} alt={alt} fill sizes="100vw" loading={eager?"eager":"lazy"} draggable={false}/> :
   <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={alt} width={768} height={1024} loading={eager?"eager":"lazy"} draggable={false}/>}
 </picture>;
}
