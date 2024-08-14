(function(e,S){typeof exports=="object"&&typeof module<"u"?module.exports=S(require("vue")):typeof define=="function"&&define.amd?define(["vue"],S):(e=typeof globalThis<"u"?globalThis:e||self,e.sled=S(e.Vue))})(this,function(e){"use strict";const S=["x1","y1","x2","y2"],H={__name:"SvgLine",props:{x1:{type:[Number,String],required:!0},x2:{type:[Number,String],required:!0},y1:{type:[Number,String],required:!0},y2:{type:[Number,String],required:!0},scale:{type:[Number,String],required:!0},lineThickness:{type:[Number,String]}},setup(t){const B=t,r=e.computed(()=>B.y1===B.y2),u=e.computed(()=>({stroke:"rgb(255,0,0)",strokeWidth:B.lineThickness,strokeLinecap:"round",cursor:r.value?"ns-resize":"ew-resize"}));return(i,o)=>(e.openBlock(),e.createElementBlock("line",{x1:t.x1/t.scale,y1:t.y1/t.scale,x2:t.x2/t.scale,y2:t.y2/t.scale,style:e.normalizeStyle(u.value)},null,12,S))}},O=["cx","cy"],R={__name:"SvgCircle",props:{hLines:{type:Array,required:!0},vLines:{type:Array,required:!0},scale:{type:Number,default:1},ix:{type:Number,default:0},iy:{type:Number,default:0},strokeColor:{type:String,default:"black"}},emits:["dragging"],setup(t,{emit:B}){const r=t,u=B;function i(){u("dragging",[r.ix,r.iy])}const o=e.computed(()=>r.ix<0?(.7*r.vLines[0]+.3*r.vLines[r.vLines.length-1])/r.scale:r.vLines[r.ix]/r.scale),m=e.computed(()=>r.iy<0?(.7*r.hLines[0]+.3*r.hLines[r.hLines.length-1])/r.scale:r.hLines[r.iy]/r.scale),s=e.computed(()=>({stroke:r.strokeColor,strokeWidth:2,strokeOpacity:.7,fillOpacity:0,zIndex:3}));return(k,g)=>(e.openBlock(),e.createElementBlock("circle",{cx:o.value,cy:m.value,r:10,style:e.normalizeStyle(s.value),onMousedown:i},null,44,O))}},U=["width","height"],F=["width","height","xlink:href"],A={__name:"SvgComponent",props:{imageData:{type:String,required:!0},imageWidth:{type:Number,required:!0},imageHeight:{type:Number,required:!0},scale:{type:Number,default:1},hLines:{type:Array,required:!0},vLines:{type:Array,required:!0},lineThickness:{type:Number}},emits:["circleUL","circleLR","dragUL","dragLR","dragVline","dragHline"],setup(t,{emit:B}){const r=t,u=B;e.ref([0,0,-1]),e.ref([0,0,-1]);const i=e.ref(!1),o=e.ref(),m=e.ref([]),s=e.ref(),k=e.ref();function g(){i.value=!1,s.value=void 0}function h(L=0){return Math.random().toString(16).substr(2,8)+L}function v({clientX:L,clientY:c}){var f;if(i.value){const d=(f=k.value)==null?void 0:f.getBoundingClientRect();m.value;const x=L-d.left-r.vLines[m.value[0]]/r.scale,M=c-d.top-r.hLines[m.value[1]]/r.scale;s.value?u(s.value,[x,M]):m.value[0]>=0?u("dragVline",[x,M,m.value[0]]):u("dragHline",[x,M,m.value[1]])}}return e.onMounted(()=>{window.addEventListener("mouseup",g),window.addEventListener("mousemove",v)}),e.onBeforeUnmount(()=>{window.removeEventListener("mouseup",g),window.removeEventListener("mousemove",v)}),(L,c)=>(e.openBlock(),e.createElementBlock("svg",{ref_key:"rootRef",ref:k,width:t.imageWidth/t.scale,height:t.imageHeight/t.scale,style:{zIndex:2,position:"absolute"}},[e.createElementVNode("image",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:t.imageWidth/t.scale,height:t.imageHeight/t.scale,"xlink:href":t.imageData},null,8,F),t.hLines.length>1&&t.vLines.length>1?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.hLines,(f,d)=>(e.openBlock(),e.createBlock(H,{key:h(d),x1:t.vLines[0],y1:t.hLines[d],x2:t.vLines[t.vLines.length-1],y2:t.hLines[d],scale:t.scale,"line-thickness":t.lineThickness,onMousedown:()=>{i.value=!0,m.value=[-1,d]}},null,8,["x1","y1","x2","y2","scale","line-thickness","onMousedown"]))),128)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.vLines,(f,d)=>(e.openBlock(),e.createBlock(H,{key:h(d),x1:t.vLines[d],y1:t.hLines[0],x2:t.vLines[d],y2:t.hLines[t.hLines.length-1],scale:t.scale,"line-thickness":t.lineThickness,index:d,dragging:i.value,onMousedown:()=>{i.value=!0,m.value=[d,-1]},onMousemove:c[0]||(c[0]=x=>o.value=x)},null,8,["x1","y1","x2","y2","scale","line-thickness","index","dragging","onMousedown"]))),128)),e.createVNode(R,{ix:0,iy:0,"h-lines":t.hLines,"v-lines":t.vLines,scale:t.scale,"stroke-color":"red",style:{cursor:"move"},onDragging:c[1]||(c[1]=f=>{i.value=!0,s.value="dragUL",m.value=f})},null,8,["h-lines","v-lines","scale"]),e.createVNode(R,{ix:t.vLines.length-1,iy:t.hLines.length-1,"h-lines":t.hLines,"v-lines":t.vLines,scale:t.scale,"stroke-color":"red",style:{cursor:"nwse-resize"},onDragging:c[2]||(c[2]=f=>{i.value=!0,s.value="dragLR",m.value=f})},null,8,["ix","iy","h-lines","v-lines","scale"])],64)):e.createCommentVNode("",!0)],8,U))}},j=["innerHTML"],Y=["disabled"],G=e.createElementVNode("option",{value:"none"},"None",-1),X=["value"],K=["disabled"],N=5,P={__name:"Cell",props:{modelValue:{type:Object,required:!0},metadata:{type:Object,default:void 0},scale:{type:Number,default:1},locked:{type:Boolean,default:!1}},emits:["update:modelValue","onChange"],setup(t,{emit:B}){const r={position:"absolute",right:"10px",bottom:"10px"},u={position:"absolute",top:"4px",backgroundColor:"#FFF",borderRadius:"3px",padding:"4px",opacity:.9},i={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},o=t,m=B,s=e.computed({get(){return o.modelValue},set(h){m("update:modelValue",h)}}),k=e.computed({get(){return!s.value.metadata},set(h){s.value.metadata=h?null:s.value.metadata||"none"}}),g=e.computed(()=>{const{upperCorner:h,lowerCorner:v}=s.value;return{position:"absolute",top:`${h.y/o.scale+N}px`,left:`${h.x/o.scale+N}px`,width:`${(v.x-h.x)/o.scale-N*2}px`,height:`${(v.y-h.y)/o.scale-N*2}px`,zIndex:2}});return(h,v)=>{var L;return e.openBlock(),e.createElementBlock("div",{style:e.normalizeStyle(g.value)},[(L=s.value)!=null&&L.textfield?(e.openBlock(),e.createElementBlock("span",{key:0,class:"cell-textfield",style:u,innerHTML:s.value.textfield},null,8,j)):e.createCommentVNode("",!0),k.value?e.createCommentVNode("",!0):e.withDirectives((e.openBlock(),e.createElementBlock("select",{key:1,class:"cell-select","onUpdate:modelValue":v[0]||(v[0]=c=>s.value.metadata=c),disabled:t.locked,style:i,onChange:v[1]||(v[1]=c=>m("onChange",s.value))},[G,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.metadata,(c,f)=>(e.openBlock(),e.createElementBlock("option",{key:f,value:f},e.toDisplayString(c),9,X))),128))],40,Y)),[[e.vModelSelect,s.value.metadata]]),e.withDirectives(e.createElementVNode("input",{type:"checkbox",class:"cell-checkbox",disabled:t.locked,style:r,"onUpdate:modelValue":v[2]||(v[2]=c=>k.value=c)},null,8,K),[[e.vModelCheckbox,k.value]])],4)}}};return Object.assign({name:"Sled"},{__name:"Sled",props:e.mergeModels({metadataAssignment:{type:Object,default:()=>({})},imageWidth:{type:Number,required:!0},imageHeight:{type:Number,required:!0},fileImage:{type:String},lineWeight:{type:[Number,String],default:4},autosize:{type:Boolean,default:!0},locked:{type:Boolean,default:!1}},{verticalLines:{type:Array,required:!0},verticalLinesModifiers:{},horizontalLines:{type:Array,required:!0},horizontalLinesModifiers:{}}),emits:e.mergeModels(["onComputeCells","resize"],["update:verticalLines","update:horizontalLines"]),setup(t,{expose:B,emit:r}){const u=t,i=e.useModel(t,"verticalLines"),o=e.useModel(t,"horizontalLines"),m=r,s=e.ref(0),k=e.ref(0),g=e.ref([]),h=e.ref(0),v=e.ref(0),L=e.ref(void 0),c=e.ref(1),f=e.ref(null),d=e.computed(()=>o.value.length-1),x=e.computed(()=>i.value.length-1);e.watch([()=>o.value.length,()=>i.value.length],()=>{C()}),e.watch([o,i],()=>{z()},{deep:!0}),e.watch(()=>u.imageHeight,n=>{k.value=n,q()},{immediate:!0}),e.watch(()=>u.imageWidth,n=>{s.value=n,q()},{immediate:!0}),e.watch(()=>u.fileImage,n=>{h.value=s.value,v.value=k.value,q()}),e.watch(()=>u.autosize,n=>{n?(L.value=new ResizeObserver(D),L.value.observe(f.value)):L.value.disconnect(),c.value=$()}),e.onMounted(()=>{z(),u.autosize&&(L.value=new ResizeObserver(D),L.value.observe(f.value))}),e.onBeforeUnmount(()=>{L.value.disconnect()});function M(n,a){g.value[n]=a,m("onComputeCells",g.value)}function T(n,a){const[l]=n;return l+a<0}function I(n){if(!T(i.value,n)){for(let a=0;a<i.value.length;a++)E(a,n);C()}}function W(n){if(!T(o.value,n)){for(let a=0;a<o.value.length;a++)V(a,n);C()}}function E(n,a){const l=Math.round(i.value[n]+a);l<0||l>u.imageWidth||(i.value[n]=l,C())}function V(n,a){const l=Math.round(o.value[n]+a);l<0||l>u.imageHeight||(o.value[n]=l,C())}function q(){if(h.value>1){const n=s.value/h.value,a=i.value.length;let l=0;for(l=0;l<a;l++)i.value[l]=Math.round(i.value[l]*n)}if(v.value>1){const n=k.value/v.value,a=o.value.length;let l=0;for(l=0;l<a;l++)o.value[l]=Math.round(o.value[l]*n)}h.value=s.value,v.value=k.value,z()}function J(){if(o.value.length>1&&i.value.length>1){g.value=[];const n=(o.value[d.value]-o.value[0])/d.value,a=(i.value[x.value]-i.value[0])/x.value;for(let l=0;l<d.value;l++)o.value[l]=Math.round(o.value[0]+l*n);for(let l=0;l<x.value;l++)i.value[l]=Math.round(i.value[0]+l*a);z()}}function z(){if(o.value.length>0&&i.value.length>0){let n,a,l=-1;for(let b=0;b<d.value;b++)for(let w=0;w<x.value;w++){l=x.value*b+w,n={x:i.value[w],y:o.value[b]},a={x:i.value[w+1],y:o.value[b+1]};const{metadata:y=null,textfield:p}=g.value[l]||{};g.value[l]={index:l,upperCorner:n,lowerCorner:a,row:b,column:w,metadata:y,textfield:p}}g.value=l===-1?[]:g.value.slice(0,l+1),m("onComputeCells",g.value)}}function C(){i.value=i.value.toSorted((n,a)=>n-a),o.value=o.value.toSorted((n,a)=>n-a)}function Q(n){const[a,l]=n,b=i.value.at(-1),w=o.value.at(-1);if(!(b+a>u.imageWidth||w+l>u.imageHeight)){for(let y=1;y<i.value.length;y++){const p=Math.round(i.value[y]+y*a/x.value);p>0&&p<=u.imageWidth&&(i.value[y]=Math.round(i.value[y]+y*a/x.value))}for(let y=1;y<o.value.length;y++){const p=Math.round(o.value[y]+y*l/d.value);p>0&&p<=u.imageHeight&&(o.value[y]=Math.round(o.value[y]+y*l/d.value))}C()}}function Z(n){const[a,l]=n;I(a),W(l)}function _(n){const a=n[1],l=n[2];V(l,a)}function ee(n){const a=n[0],l=n[2];E(l,a)}function $(){if(u.autosize){const n=f.value.getBoundingClientRect(),a=n.height<k.value?k.value/n.height:1,l=n.width<s.value?s.value/n.width:1;return a>l?a:l}else return 1}function D(n,a){const l=f.value.getBoundingClientRect();c.value=$(),m("resize",{...l,scale:c.value})}return B({moveX:I,moveY:W,moveH:V,moveV:E,equalizeLines:J}),(n,a)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"rootRef",ref:f,style:e.normalizeStyle({display:"block",position:"relative",height:`${k.value}px`})},[t.fileImage?(e.openBlock(),e.createBlock(A,{key:0,"image-width":s.value,"image-height":k.value,"image-data":t.fileImage,"h-lines":o.value,"v-lines":i.value,scale:c.value,"line-thickness":t.lineWeight,onDragUL:Z,onDragLR:Q,onDragHline:_,onDragVline:ee},null,8,["image-width","image-height","image-data","h-lines","v-lines","scale","line-thickness"])):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(g.value,(l,b)=>(e.openBlock(),e.createBlock(P,{key:b,locked:t.locked,metadata:t.metadataAssignment,scale:c.value,modelValue:g.value[b],"onUpdate:modelValue":w=>g.value[b]=w,onOnChange:w=>M(b,w)},null,8,["locked","metadata","scale","modelValue","onUpdate:modelValue","onOnChange"]))),128))],4))}})});
