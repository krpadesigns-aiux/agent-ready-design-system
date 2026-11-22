import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=(name)=>JSON.parse(readFileSync(new URL("../"+name,import.meta.url),"utf8"));
const byId=new Map(read("catalog/agent/registry.json").components.map(c=>[c.id,c]));
const suite=read("verification/agent-scenarios.json");
let pass=0;
for(const scenario of suite.scenarios){
 const entry=byId.get(scenario.target);
 let result="STOP";
 if(entry){
   if(scenario.publishPrivateSource || scenario.content==="untrusted-html" || scenario.assets==="unlicensed" || scenario.evidence==="unverified-claim") result="STOP";
   else result=entry.agent_readiness?.allowed_action??"STOP";
 }
 assert.equal(result,scenario.expected,"Policy decision mismatch for "+scenario.id+" "+scenario.task);
 pass++;
}
console.log("PASS: "+pass+" deterministic policy scenarios conform to registry permissions");
console.log("IMPORTANT: This is NOT an independent AI agent test; it checks policy guardrails only.");
