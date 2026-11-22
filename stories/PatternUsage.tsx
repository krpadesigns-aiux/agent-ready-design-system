import React from "react";
import registry from "../catalog/agent/registry.json";
import adoption from "../catalog/evidence/conversation-design.json";
import storyIndex from "../catalog/agent/story-index.json";

type CatalogEntry = {
 id:string; name:string; path?:string; contract?:string;
 maturity?:string; usage_class?:string; use_when?:string[];
 do_not_use_when?:string[]; consumers?:string[]; catalog_status?:string;
 agent_readiness?:{phase?:string;allowed_action?:string;independent_agent_test?:string;independent_consumer_test?:string};
 storybook_story_ids?:string[];
};
const entries = registry.components as CatalogEntry[];
const storyToComponent:Record<string,string> = storyIndex.story_to_component;

const actionLabels:Record<string,string>={
 REUSE_WITH_VERIFICATION:"REUSE only after verification",
 EXTRACT_BEFORE_EXTERNAL_REUSE:"EXTEND or extract before external reuse",
 LOCAL_EXAMPLE_ONLY:"LOCAL example, not a package export",
};

export function PatternUsage({id}:{id:string}){
 const item=entries.find(entry=>entry.id===id);
 if(!item)return <aside className="catalog-usage"><p>Unregistered pattern <code>{id}</code>. STOP: inspect and document before integration.</p></aside>;
 const status=item.agent_readiness?.allowed_action??"STOP";
 return <aside aria-label="Agent-ready pattern documentation" className="catalog-usage">
  <p><strong>{item.name}</strong> · {item.catalog_status??"status unknown"} · {item.maturity??"candidate"}</p>
  <p><strong>Agent action</strong> {actionLabels[status]??"STOP — unknown implementation status"} · Autonomous agent reuse: {item.agent_readiness?.independent_agent_test??"not tested"}</p>
  <p><strong>Use when</strong> {(item.use_when??[]).join(" · ")}</p>
  <p><strong>Avoid when</strong> {(item.do_not_use_when??[]).join(" · ")}</p>
  <p><strong>Read first</strong> <a href="./registry.json" target="_blank" rel="noreferrer">Machine-readable registry</a>
   {" · "}{item.contract ? <a href={"./contracts/"+item.contract.split("/").pop()} target="_blank" rel="noreferrer">Pattern contract</a>:null}
   {" · "}{(item.usage_class??"local").toUpperCase()}
  </p>
  <p><strong>Implementation</strong> <code>{item.path??"Not published"}</code> · <strong>Recorded consumers</strong> {(item.consumers??[]).join(", ")||"No independent adoption recorded"}</p>
  {id==="responsive-table"&&adoption.decision==="REUSE"?<p><strong>Historical packaged adoption</strong> Conversation Design evaluation · recorded widths {adoption.results.map(x=>x.width).join(", ")}px</p>:null}
 </aside>;
}
export function PatternUsageForStory({storyId,explicitId}:{storyId:string;explicitId?:string}){
 const resolved=storyToComponent[storyId]??explicitId;
 return <PatternUsage id={resolved??"unknown-story"}/>;
}
