import React,{useState} from "react";
/** Public-safe catalog adaptation of the portfolio's Navigation pattern.
 *  Production portfolio navigation remains in its original private checkout.
 */
export function Navigation(){
 const [open,setOpen]=useState(false);
 const items=[["Work","#catalog-work"],["About","#catalog-about"],["Contact","#catalog-contact"]];
 return <header className="ard-navigation"><a href="#catalog-home" className="ard-navigation-brand" aria-label="Demo portfolio home"><span aria-hidden="true">✦</span> PORTFOLIO SYSTEM</a>
 <nav aria-label="Example global navigation" className={open?"is-open":""}>{items.map(([label,href])=><a href={href} key={label}>{label}</a>)}<a href="#catalog-agent" className="ard-navigation-agent">For agents ↗</a></nav>
 <button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?"Close":"Menu"}</button>
 </header>;
}
