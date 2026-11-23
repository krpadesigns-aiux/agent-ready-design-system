#!/usr/bin/env node
// Evaluator-owned, reproducible CDP browser verification of actual coding-agent consumer builds.
// Requires an isolated Chrome --remote-debugging-port=9341 and Vite preview ports 6131–6133.
import {readFileSync,mkdirSync,writeFileSync} from "node:fs";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
const dir=dirname(fileURLToPath(import.meta.url));
const axeCode=readFileSync(resolve(dir,"../../node_modules/axe-core/axe.min.js"),"utf8");
const results=[],screens=resolve(dir,"consumer-screenshots");
mkdirSync(screens,{recursive:true});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let next=0;const promises=new Map();
const t=await(await fetch("http://127.0.0.1:9341/json/new?about:blank",{method:"PUT"})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener("open",resolve,{once:true});ws.addEventListener("error",reject,{once:true});});
ws.addEventListener("message",e=>{const x=JSON.parse(e.data);if(!x.id||!promises.has(x.id))return;const q=promises.get(x.id);promises.delete(x.id);x.error?q.reject(Error(JSON.stringify(x.error))):q.resolve(x.result||{});});
function cmd(method,params={}){return new Promise((resolve,reject)=>{const id=++next;promises.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function ev(expression){const x=await cmd("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});if(x.exceptionDetails)throw Error(JSON.stringify(x.exceptionDetails).slice(0,800));return x.result?.value;}
async function nav(port){
 await cmd("Page.navigate",{url:"http://127.0.0.1:"+port+"/"});
 for(let i=0;i<45;i++){try{if(await ev("document.readyState==='complete'&&document.querySelector('#root')?.children.length>0")){await wait(450);return;}}catch{}await wait(180);}
 throw Error("App not ready on "+port);
}
async function view(w){await cmd("Emulation.setDeviceMetricsOverride",{width:w,height:850,deviceScaleFactor:1,mobile:w===390});await wait(180);}
async function key(name,code,v){await cmd("Input.dispatchKeyEvent",{type:"rawKeyDown",key:name,code,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v});await cmd("Input.dispatchKeyEvent",{type:"keyUp",key:name,code,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v});await wait(200);}
async function shot(name){const x=await cmd("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});writeFileSync(resolve(screens,name),Buffer.from(x.data,"base64"));}
async function axe(){await ev(axeCode);return ev("(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.length,passes:r.passes.length}})()");}
function record(caseName,name,ok,evidence){results.push({case:caseName,name,pass:!!ok,evidence});console.log((ok?"PASS ":"FAIL ")+caseName+" "+name+" "+JSON.stringify(evidence).slice(0,500));}
await cmd("Page.enable");await cmd("Runtime.enable");
try{
 await view(1440);await nav(6131);
 const table=await ev("({rows:document.querySelectorAll('table tbody tr').length,headers:document.querySelectorAll('table thead th').length,scrollable:!!document.querySelector('[role=region][aria-label]')})");
 record("table","semantic table, three rows, labelled region",table.rows===3&&table.headers===3&&table.scrollable,table);
 await view(390);const width=await ev("({viewport:innerWidth,document:document.documentElement.scrollWidth,region:Array.from(document.querySelectorAll('[role=region]')).map(x=>({scrollWidth:x.scrollWidth,clientWidth:x.clientWidth}))})");
 record("table","390px responsive local overflow",width.document<=392&&width.region.some(x=>x.scrollWidth>x.clientWidth),width);
 await shot("table-390.png");
 const a1=await axe();record("table","sampled axe WCAG AA",a1.violations.length===0,a1);
 const unsupported=await ev("document.body.innerText.match(/WCAG 2.1 AA audit passed|keyboard navigation verified|Tested at 1440/g)");
 record("table","claims corroborated by evaluation evidence",!unsupported,{unsupportedExamples:unsupported,notes:"Fails if app displays unsupported test claims; agents did not perform those tests"});
 await view(1440);await nav(6132);
 const proof=await ev("({cards:document.querySelectorAll('.pds-proof-card').length,visible:document.body.innerText})");
 record("proof","three distinctly fictional proof points",proof.cards===3&&/fictional sample data/i.test(proof.visible),{cards:proof.cards,hasDisclaimer:/fictional sample data/i.test(proof.visible)});
 await view(390);const mobileProof=await ev("({viewport:innerWidth,document:document.documentElement.scrollWidth,cards:document.querySelectorAll('.pds-proof-card').length})");
 record("proof","390px no global overflow",mobileProof.document<=392,mobileProof);
 await shot("proof-390.png");
 const a2=await axe();record("proof","sampled axe WCAG AA",a2.violations.length===0,a2);
 await view(1440);await nav(6133);
 const triggers=await ev("document.querySelectorAll('main ul button').length");
 record("lightbox","three gallery triggers",triggers===3,{triggers});
 await ev("(()=>{const el=document.querySelector('main ul button');el.focus();el.click();return true})()");await wait(380);
 const open=await ev("({dialog:!!document.querySelector('[role=dialog][aria-modal=true]'),focus:document.activeElement?.getAttribute('aria-label'),index:document.querySelector('.csImageLightboxTitle')?.innerText})");
 record("lightbox","opens a labelled modal, focuses close",open.dialog&&open.focus==="Close enlarged image",open);
 await shot("lightbox-open-1440.png");
 const prior=await ev("document.querySelector('.csImageLightboxTitle')?.innerText");
 await key("ArrowRight","ArrowRight",39);
 const changed=await ev("document.querySelector('.csImageLightboxTitle')?.innerText");
 record("lightbox","ArrowRight changes image",prior!==changed,{prior,changed});
 const a3=await axe();record("lightbox","sampled axe WCAG AA on shipped tarball",a3.violations.length===0,a3);
 await key("Escape","Escape",27);
 const shut=await ev("({dialog:!!document.querySelector('[role=dialog]'),focus:document.activeElement?.getAttribute('aria-label')})");
 record("lightbox","Escape closes and restores focus",!shut.dialog&&String(shut.focus).startsWith("Enlarge image:"),shut);
 await view(390);const m=await ev("({viewport:innerWidth,document:document.documentElement.scrollWidth})");
 record("lightbox","390px no global overflow",m.document<=392,m);
 await shot("lightbox-gallery-390.png");
} catch(e){record("harness","completed without CDP exception",false,{error:String(e)});}
finally{await cmd("Page.close").catch(()=>{});ws.close();}
const report={generatedAt:new Date().toISOString(),source:"independently agent-created React 19 consumers, built and independently checked by evaluator",browser:"Chrome 158 CDP with axe-core",total:results.length,passed:results.filter(x=>x.pass).length,failed:results.filter(x=>!x.pass).length,results};
writeFileSync(resolve(dir,"consumer-browser-results.json"),JSON.stringify(report,null,2)+"\n");
console.log("SUMMARY "+JSON.stringify({total:report.total,passed:report.passed,failed:report.failed}));
process.exitCode=report.failed?1:0;
