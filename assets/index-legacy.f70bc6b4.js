System.register(["./vendor-legacy.a23bb613.js","./index-legacy.ad577fd5.js"],(function(e){"use strict";var t,n,r,a,l,u;return{setters:[function(e){t=e.R,n=e.B,r=e.ac,a=e.E},function(e){l=e.u,u=e.G}],execute:function(){function i(e){var t=e.mr;return{columns:[{key:"id",dataIndex:"id",title:"id"},{key:"text",dataIndex:"text",title:"文案"},{key:"done",dataIndex:"done",title:"是否完成",render:function(e){return e?"done":"uncomplish"}}],refreshTable:function(){e.emit(["refreshTable","todoTable"])},fetchList:function(e){return t.fetchList(e)},test:function(){e.setModuleState("TodoList",{value:Date.now()},(function(){}),null,500)}}}e("setup",d);var o=t.memo((function(){var e=l("TodoList",{setup:i}),r=e.settings,a=e.state;return t.createElement("div",null,t.createElement(n,{id:"refreshBtn",onClick:r.refreshTable},"refresh"),t.createElement(n,{id:"refreshBtn",onClick:r.test},"test ",a.value),t.createElement(u,{tid:"todoTable",columns:r.columns,fetchFn:r.fetchList}))})),c=t.memo((function(){var e=l("TodoList"),a=e.sync,u=e.syncer,i=e.state,o=e.mr;return t.createElement("div",null,t.createElement(r,{onChange:a("keyword"),value:i.keyword}),t.createElement(r,{onChange:u.keyword,value:i.keyword}),t.createElement("span",{id:"bigValue"},i.bigValue),t.createElement(n,{id:"addBigBtn",onClick:o.addBig}))}));function d(e){return{hiThere:function(){return"hiThere"},changeBigTo:function(t){e.setState({bigValue:t})}}}var s=t.memo((function(){var e=l("TodoList").state;return t.createElement("h1",{style:{border:"1px solid blue"}},e.value)}));e("default",t.memo((function(){var e=l("TodoList",{setup:d,tag:"Dpt"}),n=e.moduleComputed,r=e.state;return t.createElement("div",null,t.createElement(a,{message:n.formattedInput}),t.createElement("h1",{id:"bigValue"},r.bigValue),t.createElement(c,null),t.createElement(s,null),t.createElement(s,null),t.createElement(o,null))})))}}}));