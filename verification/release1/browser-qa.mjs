#!/usr/bin/env node
// Browser checks of the deployed Storybook via Chrome DevTools Protocol, not a full WCAG audit.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const dir=dirname(fileURLToPath(import.meta.url));
const base=process.env.STORYBOOK_BASE || "https://krpadesigns-aiux.github.io/agent-ready-design-system/";
const host="http://127.0.0.1:9331";
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const checks=[];
const photos=resolve(dir,"browser-screenshots");
mkdirSync(photos,{recursive:true});
const axeSource=readFileSync(resolve(dir,"../../node_modules/axe-core/axe.min.js"),"utf8");
const tabInfo=await(await fetch(host+"/json/new?about:blank",{method:"PUT"})).json();
const ws=new WebSocket(tabInfo.webSocketDebuggerUrl);
await new Promise((ok,err)=>{ws.addEventListener("open",ok,{once:true});ws.addEventListener("error",err,{once:true});});
let serial=0;
const pending=new Map();
ws.addEventListener("message",event=>{
 const m=JSON.parse(event.data);
 if(!m.id||!pending.has(m.id))return;
 const p=pending.get(m.id);pending.delete(m.id);
 m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result||{});
});
function call(method,params={}){return new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){
 const r=await call("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
 if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails).slice(0,900));
 return r.result?.value;
}
async function navigate(id){
 await call("Page.navigate",{url:base+"iframe.html?id="+id+"&viewMode=story"});
 for(let i=0;i<55;i++){
  try{if(await evaluate("document.readyState==='complete' && (document.querySelector('#storybook-root')?.children.length||0)>0")){await delay(400);return;}}catch{}
  await delay(220);
 }
 throw Error("Story not rendered: "+id);
}
async function viewport(width){
 await call("Emulation.setDeviceMetricsOverride",{width,height:850,deviceScaleFactor:1,mobile:width===390});
 await delay(250);
}
async function key(name,code,keycode,shift=false){
 const modifiers=shift?8:0;
 await call("Input.dispatchKeyEvent",{type:name==="Enter"?"keyDown":"rawKeyDown",text:name==="Enter"?"\r":undefined,key:name,code,windowsVirtualKeyCode:keycode,nativeVirtualKeyCode:keycode,modifiers});
 await call("Input.dispatchKeyEvent",{type:"keyUp",key:name,code,windowsVirtualKeyCode:keycode,nativeVirtualKeyCode:keycode,modifiers});
 await delay(180);
}
async function shot(name){
 const r=await call("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});
 writeFileSync(resolve(photos,name),Buffer.from(r.data,"base64"));
}
async function axe(){
 await evaluate(axeSource);
 return evaluate("(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {passes:r.passes.length,incomplete:r.incomplete.length,violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target).slice(0,6)}))}})()");
}
function record(name,pass,detail){checks.push({name,pass,detail});console.log((pass?"PASS ":"FAIL ")+name+" "+JSON.stringify(detail).slice(0,500));}
await call("Page.enable");await call("Runtime.enable");
try{
 await viewport(1440);await navigate("06-interactive-storytelling-patterns--case-study-lightbox");
 const count=await evaluate("document.querySelectorAll('.ard-media-gallery button').length");
 record("lightbox image triggers",count===3,{count});
 await evaluate("(()=>{const e=document.querySelector('.ard-media-gallery button');e.focus();e.click();return true})()");
 await delay(500);
 const modal=await evaluate("({dialog:!!document.querySelector('[role=dialog][aria-modal=true]'),focused:document.activeElement?.getAttribute('aria-label')})");
 record("lightbox modal focus",modal.dialog&&modal.focused==="Close enlarged image",modal);
 await shot("lightbox-1440-open.png");
 await evaluate("document.querySelector('[aria-label=\"Zoom in\"]')?.click()");
 await delay(140);
 const zoomed=await evaluate("({label:document.querySelector('[aria-label^=\"Reset zoom\"]')?.getAttribute('aria-label'),imageWidth:document.querySelector('.csImageLightboxCanvas img')?.style.width})");
 record("lightbox zoom in updates zoom and accessible name",zoomed.label?.includes("125%")&&zoomed.imageWidth==="125%",zoomed);
 await evaluate("document.querySelector('[aria-label^=\"Reset zoom\"]')?.click()");
 await delay(120);
 const reset=await evaluate("document.querySelector('.csImageLightboxCanvas img')?.style.width");
 record("lightbox zoom reset",reset==="100%",{width:reset});
 const previous=await evaluate("document.querySelector('.csImageLightboxTitle span')?.textContent");
 await key("ArrowRight","ArrowRight",39);
 const next=await evaluate("document.querySelector('.csImageLightboxTitle span')?.textContent");
 record("lightbox ArrowRight",previous!==next,{previous,next});
 await evaluate("document.querySelector('.csImageLightboxButtons button')?.focus()");
 await key("Tab","Tab",9,true);
 const wrapped=await evaluate("document.activeElement?.getAttribute('aria-label')");
 record("lightbox Shift+Tab focus trap",wrapped==="Close enlarged image",{focus:wrapped});
 const a1=await axe();
 record("lightbox axe WCAG AA",a1.violations.length===0,a1);
 await key("Escape","Escape",27);
 const closed=await evaluate("({dialog:!!document.querySelector('[role=dialog]'),focused:document.activeElement?.getAttribute('aria-label'),overflow:document.body.style.overflow})");
 record("lightbox Escape and focus restoration",!closed.dialog&&closed.focused?.startsWith("Enlarge ")&&closed.overflow!=="hidden",closed);
 for(const width of [768,390]){
  await viewport(width);
  const x=await evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth})");
  record("lightbox gallery no global overflow "+width,x.document<=width+2,x);
  await shot("lightbox-"+width+".png");
 }
 await viewport(1440);await navigate("06-interactive-storytelling-key-decisions-accordion--collapsed");
 const sem=await evaluate("({details:document.querySelectorAll('details').length,open:document.querySelectorAll('details[open]').length,summaries:document.querySelectorAll('summary').length})");
 record("accordion native semantics",sem.details>0&&sem.open===0&&sem.summaries===sem.details,sem);
 await evaluate("document.querySelector('summary')?.focus()");await key("Enter","Enter",13);
 const opens=await evaluate("document.querySelector('details')?.open");
 record("accordion Enter",opens===true,{opens});
 const a2=await axe();record("accordion axe WCAG AA",a2.violations.length===0,a2);
 await viewport(390);
 const accordionWidth=await evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth})");
 record("accordion no global overflow at 390",accordionWidth.document<=392,accordionWidth);
 await shot("accordion-390-open.png");
 await viewport(1440);await navigate("04-metrics-and-evidence-responsive-table--default");
 const t=await evaluate("({tables:document.querySelectorAll('table.pds-table').length,rows:document.querySelectorAll('table.pds-table tbody tr').length})");
 record("table semantic markup",t.tables===1&&t.rows>0,t);
 await viewport(390);
 const x=await evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth,scrollAreas:Array.from(document.querySelectorAll('*')).filter(e=>e.scrollWidth>e.clientWidth+5&&['auto','scroll'].includes(getComputedStyle(e).overflowX)).length})");
 record("table has local horizontal scroll, no global overflow",x.document<=392&&x.scrollAreas>0,x);
 await shot("table-390.png");
 const a3=await axe();record("responsive table axe WCAG AA",a3.violations.length===0,a3);
 await viewport(1440);await navigate("04-metrics-and-evidence-responsive-table--progressive-disclosure");
 const beforeExpand=await evaluate("({rows:document.querySelectorAll('table.pds-table tbody tr').length,button:document.querySelector('.pds-table-toggle')?.getAttribute('aria-expanded')})");
 await evaluate("document.querySelector('.pds-table-toggle')?.click()");await delay(160);
 const afterExpand=await evaluate("({rows:document.querySelectorAll('table.pds-table tbody tr').length,button:document.querySelector('.pds-table-toggle')?.getAttribute('aria-expanded')})");
 record("responsive table progressive disclosure",beforeExpand.button==="false"&&afterExpand.button==="true"&&afterExpand.rows>beforeExpand.rows,{beforeExpand,afterExpand});
 await call("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
 const reduced=await evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches");
 record("reduced-motion preference simulation",reduced===true,{reduced,limitations:"This verifies media emulation only, not every animation"});
} catch(error){
 record("QA harness completion",false,{error:String(error)});
}finally{try{await call("Page.close");}catch{}ws.close();}
const report={date:new Date().toISOString(),target:base,browser:"Chrome 158 headless CDP",scope:"Representative component tests, not exhaustive accessibility certification",checks,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length};
writeFileSync(resolve(dir,"browser-qa-results.json"),JSON.stringify(report,null,2)+"\n");
console.log("SUMMARY "+JSON.stringify({passed:report.passed,failed:report.failed,total:checks.length}));
process.exitCode=report.failed?1:0;
