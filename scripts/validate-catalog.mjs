import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root=path.resolve(import.meta.dirname,"..");
const readJSON=(file)=>JSON.parse(fs.readFileSync(path.join(root,file),"utf8"));
const registry=readJSON("catalog/agent/registry.json");
const storyMapping=readJSON("catalog/agent/story-index.json").story_to_component;
const built=readJSON("storybook-static/index.json");
const allStories=built.entries??built.stories??{};
const ids=new Set();
const expected={
 "packaged-react-v0.1.0":"REUSE_WITH_VERIFICATION",
 "packaged-react-0.2.0-rc.0":"REUSE_WITH_VERIFICATION",
 "source-snapshot-in-catalog":"EXTRACT_BEFORE_EXTERNAL_REUSE",
 "public-safe-adaptation":"LOCAL_EXAMPLE_ONLY",
 "reference-demo-not-packaged":"LOCAL_EXAMPLE_ONLY"
};
assert.equal(registry.release_status,"local-review-not-published");
assert.equal(registry.catalog_counts.original_registered_entries,12);
assert.equal(registry.catalog_counts.new_candidate_entries,19);
assert.equal(registry.components.length,31);
assert.equal(registry.catalog_counts.total_discoverable_entries,31);
assert.equal(registry.storybook_story_count,51);
const fileSet=new Set();
let mappedStories=0;
for(const entry of registry.components){
 assert.ok(entry.id&&entry.name&&entry.path&&entry.contract,"Incomplete catalog entry: "+JSON.stringify(entry));
 assert.ok(!ids.has(entry.id),"Duplicate catalog entry ID "+entry.id);ids.add(entry.id);
 assert.ok(expected[entry.catalog_status],"Unknown catalog_status "+entry.catalog_status);
 assert.ok(fs.existsSync(path.join(root,entry.path)),"Missing implementation for "+entry.id+": "+entry.path);
 assert.ok(fs.existsSync(path.join(root,entry.contract)),"Missing contract for "+entry.id+": "+entry.contract);
 const contract=readJSON(entry.contract);
 assert.equal(contract.id,entry.id,"Contract ID mismatch "+entry.id);
 assert.equal(contract.source_of_truth,entry.path,"Source path mismatch "+entry.id);
 assert.deepEqual(contract.storybook_story_ids,entry.storybook_story_ids,"Story list mismatch "+entry.id);
 assert.deepEqual(contract.agent_readiness,entry.agent_readiness,"Readiness mismatch "+entry.id);
 assert.equal(entry.agent_readiness?.allowed_action,expected[entry.catalog_status],"Unsafe agent decision for "+entry.id);
 assert.equal(entry.agent_readiness?.independent_agent_test,"not_run","Unverified agent success claim for "+entry.id);
 assert.ok(Array.isArray(entry.use_when)&&entry.use_when.length>0,"Missing use guidance for "+entry.id);
 assert.ok(Array.isArray(entry.do_not_use_when)&&entry.do_not_use_when.length>0,"Missing avoid guidance for "+entry.id);
 assert.ok(Array.isArray(contract.verification)&&contract.verification.length>0,"Missing verification checks for "+entry.id);
 assert.ok(Array.isArray(entry.storybook_story_ids)&&entry.storybook_story_ids.length>0,"No matching story for "+entry.id);
 for(const storyId of entry.storybook_story_ids){
   assert.ok(allStories[storyId],"Missing built Storybook story "+storyId+" for "+entry.id);
   assert.equal(storyMapping[storyId],entry.id,"Story mapping mismatch "+storyId);
   mappedStories++;
 }
 if(entry.catalog_status==="reference-demo-not-packaged"){
   assert.equal(entry.usage_class,"local","Reference demo misrepresented as reusable "+entry.id);
   assert.equal(contract.api?.status,"not-stabilized-for-external-use");
 }
 if(entry.catalog_status.startsWith("packaged-react")){
   assert.ok(contract.api?.props&&Object.keys(contract.api.props).length,"Package API undocumented "+entry.id);
   assert.equal(contract.consumption?.package,"@krpadesigns/portfolio-design-system");
 }
 fileSet.add(entry.path);
}
assert.equal(mappedStories,Object.keys(allStories).length,"Story index not fully mapped");
assert.equal(Object.keys(storyMapping).length,Object.keys(allStories).length,"Unexpected story mapping size");
for(const id of ["proof-strip","case-study-lightbox"]){
 const c=registry.components.find(entry=>entry.id===id);
 assert.equal(c.catalog_status,"packaged-react-0.2.0-rc.0","Candidate extraction status mismatch "+id);
}
const storyFiles=fs.readdirSync(path.join(root,"stories")).filter(x=>x.endsWith(".stories.tsx")).map(x=>"stories/"+x);
for(const file of [".storybook/main.ts",".storybook/preview.tsx","stories/PatternUsage.tsx",...storyFiles]){
 const source=fs.readFileSync(path.join(root,file),"utf8");
 assert.ok(!source.includes("@portfolio/"),"Private portfolio alias remains in "+file);
 assert.ok(!source.includes("/Users/"),"Mac-private path remains in "+file);
}
const cats=new Set(Object.values(allStories).map(entry=>entry.title.split("/")[0]));
for(const name of ["01 Foundations","02 Navigation","03 Hero and CTA","04 Metrics and Evidence","05 Body Sections","06 Interactive Storytelling","07 Project Cards","08 Footer"]){
 assert.ok(cats.has(name),"Missing Storybook category "+name);
}
console.log("PASS: "+ids.size+" catalog entries, "+mappedStories+" mapped stories across "+cats.size+" categories");
console.log("PASS: every entry has a matching machine-readable contract, usage policy, source and Storybook example");
console.log("PASS: unreviewed examples cannot be mislabelled as REUSE; all autonomous agent tests marked not_run");
console.log("PASS: Storybook source does not import private portfolio paths");
