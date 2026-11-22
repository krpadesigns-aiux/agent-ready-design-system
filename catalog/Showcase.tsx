import React, { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type HeroAction = { id: string; title: string; eyebrow: string; detail: string; kind: "assistant" | "build" | "about" };
const heroActions: HeroAction[] = [
  { id: "assistant", title: "Ask about the work", eyebrow: "PORTFOLIO ASSISTANT", detail: "Explore the projects and design decisions.", kind: "assistant" },
  { id: "build", title: "Research + Design + Build", eyebrow: "SELECTED WORK", detail: "From framing the problem to shipping products.", kind: "build" },
  { id: "about", title: "About the designer", eyebrow: "60 SECOND INTRO", detail: "Learn about the approach and experience.", kind: "about" },
];
export function HeroActionDeck() {
  const [selected, setSelected] = useState("build");
  const [paused, setPaused] = useState(true);
  return <div className="catalog-showcase">
    <div className="ard-hero-deck" aria-label="Three portfolio hero action cards">
      {heroActions.map((action) => <button type="button" key={action.id}
        aria-pressed={selected === action.id} onClick={() => { setSelected(action.id); setPaused(true); }}
        className={"ard-hero-card ard-hero-" + action.kind + (selected === action.id ? " is-active" : "")}>
        <span className="ard-eyebrow">{action.eyebrow}</span>
        <span className="ard-hero-art" aria-hidden="true">{action.kind === "build" ? "◆  ▰  ◇" : action.kind === "about" ? "▶" : "✦"}</span>
        <strong>{action.title}</strong><span>{action.detail}</span>
        <span className="ard-hero-link">{action.kind === "about" ? "View introduction" : action.kind === "build" ? "View work" : "Start exploring"} →</span>
      </button>)}
    </div>
    <div className="ard-story-controls"><span>Selected: {heroActions.find(x => x.id === selected)?.title}</span>
      <button type="button" onClick={() => setPaused(!paused)} aria-pressed={!paused}>{paused ? "Resume" : "Pause"} carousel example</button>
    </div>
    <p className="ard-note">Public-safe demonstration of the existing three-card portfolio hero. The source version also includes mobile carousel timing, showreel playback and real portfolio actions; those integrations remain project-local.</p>
  </div>;
}

export function HeroComposition() {
  return <section className="ard-hero-composition"><div><span className="ard-eyebrow">PRINCIPAL PRODUCT DESIGN · DEMO CONTENT</span>
    <h1>Designing clearer stories for complex products.</h1><p>An editorial hero with an eyebrow, positioning statement, a proof strip and primary/secondary actions.</p>
    <div className="ard-actions"><a href="#story-sample">Explore a sample story →</a><a href="#story-sample">View supporting work</a></div></div>
    <div className="ard-hero-display"><span>CASE STUDY</span><strong>Design, systems and evidence</strong><div className="ard-screen-lines"><i/><i/><i/></div></div></section>;
}

export type Metric = { value: string; label: string; detail: string };
export const sampleMetrics: Metric[] = [
 {value:"15+ years",label:"Product design experience",detail:"Example proof card · portfolio experience"},
 {value:"Agentic systems",label:"Complex AI workflows",detail:"Example proof card · product focus"},
 {value:"Design ↔ code",label:"Implementation fluency",detail:"Example proof card · working practice"},
];
export function ProofStrip({items=sampleMetrics}:{items?:Metric[]}) {
  return <div className="ard-metric-strip" aria-label="Portfolio proof and metrics">
    {items.map(item=><article className="ard-metric" key={item.value}><strong>{item.value}</strong><p>{item.label}</p><small>{item.detail}</small></article>)}
  </div>;
}

export type ProjectVariant = "featured" | "standard" | "compact" | "video" | "metrics" | "image";
export function ProjectCard({variant="featured"}:{variant?:ProjectVariant}) {
  const title = variant === "metrics" ? "Impact-led case study" : variant === "video" ? "Motion-led case study" : variant === "image" ? "Artifact-led case study" : "Representative project";
  return <article className={"ard-project-card ard-project-"+variant}>
    <div className="ard-project-copy"><span className="ard-eyebrow">PORTFOLIO PROJECT · {variant.toUpperCase()}</span>
      <h3>{title}</h3><p>Document the problem, major decisions, contributions and evidence before claiming outcomes.</p>
      <div className="ard-project-tags"><span>Strategy</span><span>Research</span><span>Systems</span></div>
      <a href="#project-card-demo" aria-label={"Explore "+title}>Explore project →</a>
    </div>
    <div className="ard-project-media" aria-label={variant==="video"?"Illustrative video card placeholder":"Illustrative media card placeholder"}>
      {variant==="metrics" ? <><strong>−32%</strong><span>Illustrative metric — not a project outcome</span></> : variant==="video" ? <span className="ard-video-play" aria-label="Video placeholder">▶</span> : <div className="ard-mock-device"><span>CASE STUDY</span><strong>Product experience</strong><i/><i/><i/></div>}
    </div>
  </article>;
}

export type EditorialLayout = "text" | "text-media" | "media-text" | "comparison" | "evidence" | "contribution";
export function EditorialSection({layout}:{layout:EditorialLayout}) {
  if(layout==="comparison") return <div className="ard-comparison"><article><span className="ard-eyebrow">BEFORE</span><h3>Unclear decision path</h3><p>A compact explanation of the original friction and its constraints.</p></article><article><span className="ard-eyebrow">AFTER</span><h3>Evidence before action</h3><p>A concise description of what changed, with a supporting artifact.</p></article></div>;
  if(layout==="contribution") return <section className="ard-contribution"><span className="ard-eyebrow">MY CONTRIBUTION</span><h3>Decisions that shaped the experience</h3><p>Describe what was directly designed, validated and handed off, separately from team outcomes.</p></section>;
  if(layout==="evidence") return <section className="ard-evidence"><span className="ard-eyebrow">RESEARCH / EVIDENCE</span><h3>Artifacts support the narrative</h3><div className="ard-evidence-grid"><div>Journey map</div><div>Evaluation rubric</div><div>Prototype states</div></div></section>;
  const media=<div className="ard-editorial-image" role="img" aria-label="Illustrative case study media placeholder"><span>ARTIFACT</span><strong>Context → decision → evidence</strong></div>;
  return <section className={"ard-editorial ard-"+layout}>{layout==="media-text"?media:null}<div><span className="ard-eyebrow">02 · DISCOVERY</span><h2>Make the reasoning visible.</h2><p>Use the same content rhythm across complex case studies while allowing the imagery, narrative and evidence to change by project.</p><p className="ard-muted">This is an illustrative composition, not a verbatim project claim.</p></div>{layout==="text-media"?media:null}</section>;
}

export type EvolutionItem = { id:string; stage:string; title:string; description:string; learning:string };
export const evolutionSamples:EvolutionItem[] = [
{id:"V1",stage:"EXPLORE",title:"Investigate the problem",description:"Early questions, sketches and concept models.",learning:"Clarify what the problem actually requires."},
{id:"V2",stage:"BUILD",title:"Prove a working flow",description:"Connect the key states and interactions.",learning:"Prototype behavior, not merely screenshots."},
{id:"V3",stage:"ENGINEER",title:"Make rules explicit",description:"Represent permissions and decisions as states.",learning:"Separate policy from presentation."},
{id:"V4",stage:"VERIFY",title:"Check the real outcome",description:"Record evidence, failure behavior and limitations.",learning:"Do not equate an attempted action with success."},
{id:"V5",stage:"REFINE",title:"Align UX to system truth",description:"Use evidence to improve autonomy and recovery.",learning:"A truthful interaction is more useful than a polished fiction."},
{id:"Future",stage:"NEXT",title:"Future exploration",description:"Opportunities still needing validation.",learning:"Label unbuilt work clearly."}
];
export function EvolutionRail({items=evolutionSamples}:{items?:EvolutionItem[]}) {
 const [active,setActive]=useState("V5"); const rail=useRef<HTMLDivElement>(null);
 const choose=(id:string,e:React.MouseEvent<HTMLElement>)=>{setActive(id);e.currentTarget.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"});};
 return <div className="ard-evolution-wrap"><div className="ard-evolution-rail" ref={rail} role="group" aria-label="Product evolution versions">
  {items.map(item=><article className={"ard-evolution-item"+(active===item.id?" is-active":"")} key={item.id}>
  {active===item.id?<div className="ard-evolution-content"><div className="ard-evolution-heading"><span className="ard-eyebrow">{item.stage}</span><strong>{item.id}</strong></div><h3>{item.title}</h3><p>{item.description}</p><div className="ard-evolution-art">Decision → design → evidence</div><p className="ard-evolution-learning"><b>What changed:</b> {item.learning}</p></div>
  :<button type="button" onClick={event=>choose(item.id,event)} aria-expanded={false} aria-label={"Expand "+item.id+" "+item.title}><b>{item.id}</b><small>{item.stage}</small></button>}
  </article>)}</div>
  <p className="ard-note">Interaction adapted from Buyer’s Agent Product Evolution. The public demo replaces project-specific HTML content with typed data and React rendering.</p>
 </div>;
}

export type ImageTab = {id:string; title:string; detail:string; category:string };
export const imageTabSamples:ImageTab[] = [
{id:"research",title:"Research-led",detail:"Evidence and user needs inform the interaction model.",category:"DISCOVER"},
{id:"prototype",title:"Prototype-led",detail:"A functional demo reveals behavioral constraints.",category:"EXPLORE"},
{id:"systems",title:"Systems-led",detail:"Make rules, transitions and recovery explicit.",category:"DECIDE"},
{id:"evaluate",title:"Evaluation-led",detail:"Measure usability and behavior, not only visual fidelity.",category:"VERIFY"}
];
export function ImageTabs({items=imageTabSamples}:{items?:ImageTab[]}) {
 const [active,setActive]=useState(0);const selected=items[active];const viewId=useId();
 return <div className="ard-image-tabs"><div className="ard-image-tab-list" aria-label="Select a design approach" role="group">
 {items.map((item,index)=><button type="button" key={item.id} className={index===active?"is-active":""} aria-pressed={index===active} aria-controls={viewId} onClick={()=>setActive(index)}><small>{item.category}</small><strong>{item.title}</strong><span>{item.detail}</span></button>)}</div>
 <div className="ard-image-tab-visual" id={viewId} aria-live="polite"><div className="ard-image-tab-window"><div className="ard-window-chrome"><i/><i/><i/></div><span>{selected.category}</span><h3>{selected.title}</h3><p>{selected.detail}</p><div className="ard-window-grid"><i/><i/><i/></div></div><p>Selected view: {active+1} / {items.length}</p></div></div>;
}

const scrollSteps=[{title:"Context",detail:"Start with the user and their environment."},{title:"Reasoning",detail:"Expose why the system is suggesting a change."},{title:"Control",detail:"Make the approval and recovery boundary visible."},{title:"Evidence",detail:"Verify the outcome before claiming success."}];
export function ScrollStory(){
 const [active,setActive]=useState(0);const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const host=root.current;if(!host)return;const sections=Array.from(host.querySelectorAll<HTMLElement>("[data-step]"));const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)setActive(Number((e.target as HTMLElement).dataset.step));}},{root:host,rootMargin:"-20% 0px -55% 0px",threshold:0});sections.forEach(s=>observer.observe(s));return()=>observer.disconnect();},[]);
 return <div className="ard-scroll-story"><aside><span className="ard-eyebrow">SCROLL-SYNCHRONIZED</span><h3>{scrollSteps[active].title}</h3><p>{scrollSteps[active].detail}</p><div className="ard-scroll-dots">{scrollSteps.map((s,i)=><button type="button" key={s.title} aria-label={"Go to "+s.title} aria-pressed={i===active} className={i===active?"is-active":""} onClick={()=>root.current?.querySelectorAll<HTMLElement>("[data-step]")[i]?.scrollIntoView({block:"nearest",behavior:"smooth"})}/>)}</div></aside>
 <div className="ard-scroll-track" ref={root} tabIndex={0} aria-label="Scrollable narrative steps">{scrollSteps.map((s,i)=><section data-step={i} key={s.title}><span className="ard-eyebrow">0{i+1}</span><h4>{s.title}</h4><p>{s.detail}</p></section>)}</div></div>;
}

export function FormatSwitch(){
 const [format,setFormat]=useState("long");
 return <div className="ard-format"><div className="ard-format-controls" role="group" aria-label="Choose case-study reading format"><button type="button" aria-pressed={format==="long"} className={format==="long"?"is-active":""} onClick={()=>setFormat("long")}>Long Format</button><button type="button" aria-pressed={format==="presentation"} className={format==="presentation"?"is-active":""} onClick={()=>setFormat("presentation")}>Presentation</button></div><p>{format==="long"?"Long-form narrative with complete research and design evidence.":"Slide-based storytelling focused on key decisions and outcomes."}</p></div>;
}

export function CatalogFooter(){
 return <footer className="ard-footer"><div><span className="ard-eyebrow">CONTACT</span><h2>Keep the conversation going.</h2><p>Generic footer composition with contact and external navigation.</p></div><nav aria-label="Example footer links"><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></nav></footer>;
}

export function CatalogCard({label,children}:{label:string;children:ReactNode}){
 return <div className="catalog-showcase"><span className="ard-eyebrow">{label}</span>{children}</div>;
}
