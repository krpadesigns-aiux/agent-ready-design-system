import React,{useState} from "react";
import type {Meta,StoryObj} from "@storybook/react-vite";
import {FormatSwitch} from "../catalog/Showcase";
const meta={title:"02 Navigation/Additional Patterns",parameters:{catalogStatus:"Portfolio-derived demos; not packaged",sourceFile:"src/app/work/buyers-agent/presentation/PresentationShell.tsx; src/components/ui/FilterTabs.tsx"}} satisfies Meta;
export default meta;type Story=StoryObj<typeof meta>;
export const CaseStudyFormatSwitch:Story={render:()=><FormatSwitch/>};
export const ProjectCategoryFilter:Story={render:()=> <FilterDemo/>};
function FilterDemo(){const tabs=["All","AI","Enterprise","Commerce","Design Systems"];const[active,setActive]=useState("All");return <div style={{background:"#f8f2e7",padding:24,borderRadius:18}}><div role="group" aria-label="Filter sample portfolio projects" style={{display:"flex",gap:5,flexWrap:"wrap"}}>{tabs.map(t=><button key={t} type="button" aria-pressed={active===t} onClick={()=>setActive(t)} style={{background:active===t?"#f5df47":"white",border:"1px solid #ddd",borderRadius:20,padding:"9px 16px",cursor:"pointer"}}>{t}</button>)}</div><p style={{fontSize:14}}>Showing: {active} projects · demonstration only</p></div>}
