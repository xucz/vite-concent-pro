import{r as e,Y as t,b as n,_ as r,g as a}from"./vendor.b6c75cde.js";import{u as o,A as c,G as l,C as i}from"./index.d89c0146.js";var s=function(o){return e.createElement(t,null,(function(t){var c,l=t.getPrefixCls,i=t.direction,s=o.prefixCls,m=o.type,p=void 0===m?"horizontal":m,d=o.orientation,f=void 0===d?"center":d,u=o.className,v=o.children,h=o.dashed,y=o.plain,x=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}(o,["prefixCls","type","orientation","className","children","dashed","plain"]),b=l("divider",s),E=f.length>0?"-".concat(f):f,O=!!v,g=n(b,"".concat(b,"-").concat(p),(r(c={},"".concat(b,"-with-text"),O),r(c,"".concat(b,"-with-text").concat(E),O),r(c,"".concat(b,"-dashed"),!!h),r(c,"".concat(b,"-plain"),!!y),r(c,"".concat(b,"-rtl"),"rtl"===i),c),u);return e.createElement("div",a({className:g},x,{role:"separator"}),v&&e.createElement("span",{className:"".concat(b,"-inner-text")},v))}))};var m=e.memo((function(t){return o(i),e.createElement("div",null,e.createElement(c,null,"Welcome to visit vite concent pro"),e.createElement(s,null),e.createElement(l,{tid:"1",size:"small",columns:[],fetchFn:()=>Promise.resolve({pageList:[],total:10})}),e.createElement(l,{tid:"2",columns:[],fetchFn:()=>Promise.resolve({pageList:[],total:10})}))}));export default m;
