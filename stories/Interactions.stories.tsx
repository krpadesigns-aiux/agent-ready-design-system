import React,{useState} from "react";
import type {Meta,StoryObj} from "@storybook/react-vite";
import {EvolutionRail,ImageTabs,ScrollStory} from "../catalog/Showcase";
import {CaseStudyImageLightbox} from "@krpadesigns/portfolio-design-system";
const meta={title:"06 Interactive Storytelling/Patterns",parameters:{catalogStatus:"Portfolio-derived React demos; not packaged",sourceFile:"src/app/buyer-agent-product-evolution-review/EvolutionExpandingReview.tsx; src/app/work/slingshot/SlingshotAIPrototypeSwitcher.tsx"}} satisfies Meta;
export default meta;type Story=StoryObj<typeof meta>;
export const ProductEvolutionV1ToV5:Story={render:()=><EvolutionRail/>};
export const LeftTabsRightMedia:Story={render:()=><ImageTabs/>};
export const ScrollSynchronizedNarrative:Story={render:()=><ScrollStory/>};
const svg=(label:string,background:string)=>"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="650" viewBox="0 0 1000 650"><rect width="1000" height="650" fill="'+background+'"/><rect x="180" y="95" width="640" height="460" rx="28" fill="#ffffff" stroke="#171817" stroke-width="3"/><rect x="212" y="123" width="576" height="54" rx="10" fill="#f5df47"/><text x="240" y="157" font-family="Arial" font-weight="bold" font-size="18" fill="#171817">PUBLIC DEMO</text><text x="240" y="286" font-family="Arial" font-weight="bold" font-size="45" fill="#171817">'+label+'</text><rect x="240" y="345" width="480" height="20" rx="7" fill="#ddd8cc"/><rect x="240" y="393" width="340" height="20" rx="7" fill="#ddd8cc"/></svg>');
const images=[{src:svg("Exploration","#e4d6c5"),alt:"Example exploration artifact",caption:"Exploration · sample artifact"},{src:svg("Prototype","#d4e5e2"),alt:"Example prototype artifact",caption:"Prototype · sample artifact"},{src:svg("Evaluation","#e6e5b9"),alt:"Example evaluation artifact",caption:"Evaluation · sample artifact"}];
function LightboxStory(){const[index,setIndex]=useState<number|null>(null);return <><div className="ard-media-gallery">{images.map((image,i)=><button key={i} type="button" aria-label={"Enlarge "+image.alt} onClick={()=>setIndex(i)}><img src={image.src} alt={image.alt}/></button>)}</div><CaseStudyImageLightbox images={images} activeIndex={index} onSelect={setIndex} onClose={()=>setIndex(null)}/></>}
export const CaseStudyLightbox:Story={parameters:{sourceFile:"src/CaseStudyImageLightbox.tsx",catalogStatus:"Packaged candidate 0.2.0-rc.0; pending independent agent eval"},render:()=><LightboxStory/>};

const gallerySlides=[{label:"Discovery artifact",detail:"Research context",color:"#e5eeea"},{label:"Prototype artifact",detail:"Interaction model",color:"#f5df47"},{label:"Evaluation artifact",detail:"Behavior verification",color:"#f8f2e7"}];
function CarouselDemo(){
 const [active,setActive]=useState(0);
 const item=gallerySlides[active];
 return <div style={{padding:22,background:"#171817",borderRadius:18,color:"white",maxWidth:880}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginBottom:14}}><b>Case-study media gallery</b><span>{active+1} / {gallerySlides.length}</span></div>
 <div aria-live="polite" style={{background:item.color,borderRadius:12,minHeight:270,color:"#171817",padding:32,display:"flex",flexDirection:"column",justifyContent:"center",gap:12}}>
 <span style={{fontSize:11,letterSpacing:".12em"}}>ARTIFACT VIEWER</span><strong style={{fontFamily:"Outfit",fontSize:36}}>{item.label}</strong><p>{item.detail}</p></div>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16}}>
 <button type="button" aria-label="Previous artifact" onClick={()=>setActive(i=>(i+gallerySlides.length-1)%gallerySlides.length)} style={{padding:10,borderRadius:30,border:0,cursor:"pointer"}}>← Previous</button>
 <div style={{display:"flex",gap:8}}>{gallerySlides.map((slide,i)=><button type="button" key={i} aria-label={"Show "+slide.label} aria-pressed={i===active} onClick={()=>setActive(i)} style={{width:13,height:13,borderRadius:20,background:i===active?"#f5df47":"#aaa",border:0,cursor:"pointer"}} />)}</div>
 <button type="button" aria-label="Next artifact" onClick={()=>setActive(i=>(i+1)%gallerySlides.length)} style={{padding:10,borderRadius:30,border:0,cursor:"pointer"}}>Next →</button>
 </div></div>;
}
export const ImageCarousel:Story={parameters:{sourceFile:"src/app/work/slingshot/SlingshotAIUXPatternCarousel.tsx",catalogStatus:"Storybook-only public-safe interaction demonstration; not packaged"},render:()=><CarouselDemo/>};
