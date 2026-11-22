import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ResponsiveTable, KeyDecisionsAccordion, ProofStrip, CaseStudyImageLightbox } from "@krpadesigns/portfolio-design-system";

const table=renderToStaticMarkup(React.createElement(ResponsiveTable,{
 ariaLabel:"Evaluation criteria", columns:[{label:"Check"},{label:"Result"}],
 rows:[{key:"r1",cells:["Authority","Verified"]},{key:"r2",cells:["Recovery","Tested"]}],
 firstColumnIsRowHeader:true,initialVisibleRows:1
}));
assert.match(table,/role="region"/);
assert.match(table,/aria-expanded="false"/);
assert.match(table,/scope="row"/);

const accordion=renderToStaticMarkup(React.createElement(KeyDecisionsAccordion,{
 items:[{id:"D1",eyebrow:"01",title:"Evidence before action",content:React.createElement("p",null,"Review evidence"),defaultOpen:true}]
}));
assert.match(accordion,/<details[^>]+open=""/);
assert.match(accordion,/<summary/);
assert.match(accordion,/Review evidence/);

const proof=renderToStaticMarkup(React.createElement(ProofStrip,{
 ariaLabel:"Portfolio proof points",
 items:[{id:"one",value:"3 examples",label:"Illustrative metric",detail:"Not a business claim"}]
}));
assert.match(proof,/role="group"/);
assert.match(proof,/3 examples/);
assert.match(proof,/pds-proof-card/);

assert.equal(typeof CaseStudyImageLightbox,"function");
const closed=renderToStaticMarkup(React.createElement(CaseStudyImageLightbox,{
 images:[{src:"data:image/svg+xml,<svg></svg>",alt:"Example artifact"}],
 activeIndex:null, onSelect:()=>{},onClose:()=>{}
}));
assert.equal(closed,"");

console.log("PASS: fresh installed React package imports four named exports");
console.log("PASS: Table, Key Decisions and Proof Strip render valid semantic server markup");
console.log("PASS: Lightbox import and closed state render; interactive open/focus tests still required");
