(this["webpackJsonprece-web"]=this["webpackJsonprece-web"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(14),a=n.n(i),o=n(16),s=n(135),l=n(155),d=n(151),j=n(129),u=n(154),b=n(131),p=n(133),O=n(60),m=n(134),f=n(136),x=n(137),h=n(138),g=n(28),v=n(15),y=n(10);var T=function(e,t){var n=Object(c.useState)((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(c){return console.log(c),t}})),r=Object(o.a)(n,2),i=r[0],a=r[1];return[i,function(t){try{var n=t instanceof Function?t(i):t;a(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(c){console.log(c)}}]},w=function(e){return e.toUpperCase().split(" ").map((function(e){return e.substr(0,1)})).join("")},C=function(e){return Object(v.a)(new Set(e))},I=n(9),P=n.n(I),S=n(157),k=n(2),F={items:[],people:[],personToItemsMap:{},itemToPeopleMap:{},tip:0,tax:0},B=function(){},D=Object(c.createContext)({appData:F,setAppData:B,reset:B,putItem:B,removeItem:B,splitItem:B,addPerson:B,removePerson:B,handleSetItemPerson:B,itemCostMap:{},subTotal:0,total:0,subTotalForPerson:function(){return 0},taxForPerson:function(){return 0},tipForPerson:function(){return 0},totalForPerson:function(){return 0}}),M=function(e){var t=e.children,n=T("appData",F),r=Object(o.a)(n,2),i=r[0],a=r[1],s=Object(c.useMemo)((function(){return i.items.reduce((function(e,t){return Object(y.a)(Object(y.a)({},e),{},Object(g.a)({},t.id,t.cost))}),{})}),[i.items]),l=Object(c.useMemo)((function(){return i.items.reduce((function(e,t){return console.log({previousValue:e,currentValue:t}),P()(e).add(t.cost).value}),0)}),[i.items]),d=P()(l).add(i.tax).add(i.tip).value,j=function(e){var t;return(null===(t=i.personToItemsMap[e])||void 0===t?void 0:t.reduce((function(e,t){return P()(e).add(P()(s[t]).divide(i.itemToPeopleMap[t].length)).value}),0))||0},u=function(e){return j(e)/l},b=function(e){return P()(i.tax).multiply(u(e)).value},p=function(e){return P()(i.tip).multiply(u(e)).value};return Object(k.jsx)(D.Provider,{value:{appData:i,setAppData:a,reset:function(){a(F)},putItem:function(e){a((function(t){return Object(y.a)(Object(y.a)({},t),{},{items:[].concat(Object(v.a)(t.items.filter((function(t){return t.id!==e.id}))),[e])})}))},removeItem:function(e){a((function(t){return Object(y.a)(Object(y.a)({},t),{},{items:t.items.filter((function(t){return t.id!==e}))})}))},splitItem:function(e){var t=i.items.find((function(t){return t.id===e}));if(t){var n=parseInt(prompt("How many items should (".concat(t.name," - ").concat(P()(t.cost).format(),") be split into?"))||"");if(n&&!isNaN(n)){var c,r=(c=n,new Array(c).fill(0).map((function(e,t){return t}))).map((function(){return{id:Object(S.a)(),name:t.name,cost:t.cost/n}}));a((function(t){return Object(y.a)(Object(y.a)({},t),{},{items:[].concat(Object(v.a)(t.items.filter((function(t){return t.id!==e}))),Object(v.a)(r))})}))}}},addPerson:function(e){a((function(t){return Object(y.a)(Object(y.a)({},t),{},{people:[].concat(Object(v.a)(t.people),[e])})}))},removePerson:function(e){a((function(t){return Object(y.a)(Object(y.a)({},t),{},{people:t.people.filter((function(t){return t.id!==e}))})}))},handleSetItemPerson:function(e,t,n){a((function(c){var r=c.personToItemsMap,i=c.itemToPeopleMap;return r[t]||(r[t]=[]),r[t]=n?C([].concat(Object(v.a)(r[t]),[e])):r[t].filter((function(t){return t!==e})),i[e]||(i[e]=[]),i[e]=n?C([].concat(Object(v.a)(i[e]),[t])):i[e].filter((function(e){return e!==t})),Object(y.a)(Object(y.a)({},c),{},{personToItemsMap:r,itemToPeopleMap:i})}))},itemCostMap:s,subTotal:l,total:d,subTotalForPerson:j,taxForPerson:b,tipForPerson:p,totalForPerson:function(e){return P()(j(e)).add(b(e)).add(p(e)).value}},children:t})},R=function(){return Object(c.useContext)(D)},z=Object(j.a)((function(e){return{offset:e.mixins.toolbar}})),N=function(e){var t=e.children,n=z(),c=R().reset;return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(u.a,{style:{paddingBottom:500},children:[Object(k.jsx)(b.a,{position:"fixed",children:Object(k.jsxs)(p.a,{children:[Object(k.jsx)(O.a,{variant:"h6",style:{flexGrow:1},children:"Rece"}),Object(k.jsx)(m.a,{onClick:function(){confirm("Are you sure you'd like to reset?")&&c()},style:{color:"inherit"},children:"Reset"})]})}),Object(k.jsx)(u.a,{className:n.offset}),t]}),Object(k.jsx)(V,{})]})},V=function(){var e=Object(c.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1],i=R(),a=i.appData,l=i.subTotalForPerson,d=i.taxForPerson,j=i.tipForPerson,b=i.totalForPerson,p=i.subTotal,g=i.total;return Object(k.jsx)(u.a,{style:{marginBottom:50},children:Object(k.jsx)(s.a,{children:Object(k.jsxs)(f.a,{children:[Object(k.jsx)(m.a,{onClick:function(){return r((function(e){return!e}))},children:"Debug"}),Object(k.jsx)(x.a,{in:n,children:Object(k.jsxs)(h.a,{children:[Object(k.jsx)(A,{buttonTitle:"appData",children:Object(k.jsx)("pre",{children:JSON.stringify(a,null,2)})}),Object(k.jsxs)(A,{buttonTitle:"Real Sums",children:[Object(k.jsxs)("div",{children:[Object(k.jsxs)(O.a,{children:["Sub Total (",P()(p).format(),")"]}),a.people.map((function(e){return Object(k.jsxs)("div",{children:[e.name," - ",P()(l(e.id)).format()]},e.id)})),Object(k.jsxs)("div",{children:["Sum -"," ",a.people.reduce((function(e,t){return e.add(l(t.id))}),P()(0)).format()]})]}),Object(k.jsxs)("div",{children:[Object(k.jsxs)(O.a,{children:["Tax (",P()(a.tax).format(),")"]}),a.people.map((function(e){return Object(k.jsxs)("div",{children:[e.name," - ",P()(d(e.id)).format()]},e.id)})),Object(k.jsxs)("div",{children:["Sum -"," ",a.people.reduce((function(e,t){return e.add(d(t.id))}),P()(0)).format()]})]}),Object(k.jsxs)("div",{children:[Object(k.jsxs)(O.a,{children:["Tip (",P()(a.tip).format(),")"]}),a.people.map((function(e){return Object(k.jsxs)("div",{children:[e.name," - ",P()(j(e.id)).format()]},e.id)})),Object(k.jsxs)("div",{children:["Sum -"," ",a.people.reduce((function(e,t){return e.add(j(t.id))}),P()(0)).format()]})]}),Object(k.jsxs)("div",{children:[Object(k.jsxs)(O.a,{children:["Total (",P()(g).format(),")"]}),a.people.map((function(e){return Object(k.jsxs)("div",{children:[e.name," - ",P()(b(e.id)).format()]},e.id)})),Object(k.jsxs)("div",{children:["Sum -"," ",a.people.reduce((function(e,t){return e.add(b(t.id))}),P()(0)).format()]})]})]})]})})]})})})},A=function(e){var t=e.children,n=e.buttonTitle,r=Object(c.useState)(!1),i=Object(o.a)(r,2),a=i[0],s=i[1];return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(m.a,{onClick:function(){return s((function(e){return!e}))},children:n}),Object(k.jsx)(x.a,{in:a,children:t})]})},E=n(24),W=n(139),J=n(153),K=n(141),L=n(142),q=n(143),G=n(144),H=n(158),U=n(145),Q=n(146),X=n(156),Y=n(59),Z=n(57),$=n.n(Z),_=n(79),ee=n.n(_),te={name:"",cost:void 0},ne=function(){var e=R(),t=e.setAppData,n=e.appData,r=n.items,i=n.people,a=n.personToItemsMap,o=n.itemToPeopleMap,s=n.tax,l=n.tip,d=e.putItem,j=e.removeItem,b=e.splitItem,p=e.handleSetItemPerson,f=e.subTotal,x=e.subTotalForPerson,h=e.total,g=e.taxForPerson,v=e.tipForPerson,T=e.totalForPerson,C=Object(Y.b)({defaultValues:te}),I=C.control,F=C.handleSubmit,B=C.reset,D=Object(c.useRef)(null),M=Object(c.useRef)(null),z=function(e){var t,n=e.name,c=e.cost,r={id:Object(S.a)(),name:n,cost:c};d(r),B(te),null===(t=D.current)||void 0===t||t.focus()},N=function(e){return function(t){var n;"Enter"===t.code&&("name"===e?null===(n=M.current)||void 0===n||n.focus():"cost"===e&&F(z)(t))}},V=Object(E.a)();return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(O.a,{children:"Enter Receipt Items"}),Object(k.jsxs)(W.a,{container:!0,spacing:4,children:[Object(k.jsx)(W.a,{item:!0,xs:12,children:Object(k.jsx)("form",{onSubmit:F(z),children:Object(k.jsxs)(W.a,{container:!0,spacing:2,alignItems:"flex-end",children:[Object(k.jsx)(W.a,{item:!0,xs:12,md:6,children:Object(k.jsx)(Y.a,{control:I,name:"name",render:function(e){var t=e.field;return Object(k.jsx)(J.a,Object(y.a)(Object(y.a)({},t),{},{inputRef:function(e){D.current=e,t.ref(e)},label:"Item Name",fullWidth:!0,onKeyDown:N("name")}))}})}),Object(k.jsx)(W.a,{item:!0,xs:12,md:5,children:Object(k.jsx)(Y.a,{control:I,name:"cost",render:function(e){var t=e.field;return Object(k.jsx)(J.a,Object(y.a)(Object(y.a)({},t),{},{inputRef:function(e){M.current=e,t.ref(e)},label:"Cost",fullWidth:!0,onKeyDown:N("cost"),type:"number"}))},rules:{required:!0,min:0}})}),Object(k.jsx)(W.a,{item:!0,xs:12,md:1,children:Object(k.jsx)(m.a,{variant:"contained",color:"primary",fullWidth:!0,children:"Add"})})]})})}),Object(k.jsx)(W.a,{item:!0,xs:12,children:Object(k.jsx)(u.a,{style:{overflow:"auto",position:"relative"},children:Object(k.jsxs)(K.a,{children:[Object(k.jsx)(L.a,{children:Object(k.jsxs)(q.a,{style:{position:"sticky",top:0,backgroundColor:"white",zIndex:101},children:[Object(k.jsx)(G.a,{style:{position:"sticky",left:0,backgroundColor:"white",zIndex:100,minWidth:100},children:"Name"}),Object(k.jsx)(G.a,{style:{minWidth:200},children:"Cost"}),Object(k.jsx)(G.a,{style:{width:1}}),i.map((function(e){return Object(k.jsx)(G.a,{style:{width:1},children:Object(k.jsx)(H.a,{style:{height:24,width:24,fontSize:12},children:w(e.name)})},e.id)}))]})}),Object(k.jsxs)(U.a,{children:[r.map((function(e){var t;return Object(k.jsxs)(q.a,{children:[Object(k.jsx)(G.a,{style:{position:"sticky",left:0,zIndex:100,whiteSpace:"nowrap",paddingTop:0,paddingBottom:0,backgroundColor:0===((null===(t=o[e.id])||void 0===t?void 0:t.length)||0)?V.palette.warning.light:"white"},children:e.name}),Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(ce,{value:e.cost,onChange:function(t){return d(Object(y.a)(Object(y.a)({},e),{},{cost:t}))},formatValue:function(e){return P()(e).format()}})}),Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsxs)(u.a,{style:{display:"flex"},children:[Object(k.jsx)(Q.a,{size:"small",edge:"end",onClick:function(){return b(e.id)},style:{marginRight:V.spacing(1)},children:Object(k.jsx)(ee.a,{color:"primary"})}),Object(k.jsx)(Q.a,{size:"small",edge:"end",onClick:function(){confirm("Are you sure you'd like to remove this item?")&&j(e.id)},children:Object(k.jsx)($.a,{color:"error"})})]})}),i.map((function(t){var n;return Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(X.a,{checked:(null===(n=a[t.id])||void 0===n?void 0:n.includes(e.id))||!1,onChange:function(n){return p(e.id,t.id,n.target.checked)}})},t.id)}))]},e.id)})),Object(k.jsxs)(q.a,{children:[Object(k.jsx)(G.a,{style:{position:"sticky",left:0,backgroundColor:"white",zIndex:100,whiteSpace:"nowrap",paddingTop:0,paddingBottom:0},children:"Subtotal"}),Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(m.a,{disabled:!0,style:{color:"inherit"},children:P()(f).format()})}),Object(k.jsx)(G.a,{}),i.map((function(e){return Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(m.a,{disabled:!0,style:{color:"inherit"},children:P()(x(e.id)).format()})},e.id)}))]}),Object(k.jsxs)(q.a,{children:[Object(k.jsx)(G.a,{style:{position:"sticky",left:0,zIndex:100,whiteSpace:"nowrap",paddingTop:0,paddingBottom:0,backgroundColor:0===s?V.palette.warning.light:"white"},children:Object(k.jsxs)(u.a,{style:{display:"flex",alignItems:"center"},children:[Object(k.jsx)(u.a,{style:{marginRight:10},children:"Tax"}),Object(k.jsx)(ce,{value:f>0?s/f:0,onChange:function(e){return t((function(t){return Object(y.a)(Object(y.a)({},t),{},{tax:f*(e/100)})}))},formatValue:function(e){return"".concat((100*e).toFixed(2),"%")}})]})}),Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(ce,{value:s,onChange:function(e){return t((function(t){return Object(y.a)(Object(y.a)({},t),{},{tax:e})}))},formatValue:function(e){return P()(e).format()}})}),Object(k.jsx)(G.a,{}),i.map((function(e){return Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(m.a,{disabled:!0,style:{color:"inherit"},children:P()(g(e.id)).format()})},e.id)}))]}),Object(k.jsxs)(q.a,{children:[Object(k.jsx)(G.a,{style:{position:"sticky",left:0,backgroundColor:0===l?V.palette.warning.light:"white",zIndex:100,whiteSpace:"nowrap",paddingTop:0,paddingBottom:0},children:Object(k.jsxs)(u.a,{style:{display:"flex",alignItems:"center"},children:[Object(k.jsx)(u.a,{style:{marginRight:10},children:"Tip"}),Object(k.jsx)(ce,{value:f>0?l/f:0,onChange:function(e){return t((function(t){return Object(y.a)(Object(y.a)({},t),{},{tip:f*(e/100)})}))},formatValue:function(e){return"".concat((100*e).toFixed(2),"%")}})]})}),Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(ce,{value:l,onChange:function(e){return t((function(t){return Object(y.a)(Object(y.a)({},t),{},{tip:e})}))},formatValue:function(e){return P()(e).format()}})}),Object(k.jsx)(G.a,{}),i.map((function(e){return Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(m.a,{disabled:!0,style:{color:"inherit"},children:P()(v(e.id)).format()})},e.id)}))]}),Object(k.jsxs)(q.a,{children:[Object(k.jsx)(G.a,{style:{position:"sticky",left:0,backgroundColor:"white",zIndex:100,whiteSpace:"nowrap",paddingTop:0,paddingBottom:0},children:"Total"}),Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(m.a,{disabled:!0,style:{color:"inherit"},children:P()(h).format()})}),Object(k.jsx)(G.a,{}),i.map((function(e){return Object(k.jsx)(G.a,{style:{paddingTop:0,paddingBottom:0},children:Object(k.jsx)(m.a,{onClick:function(){window.location.href=function(e){var t=e.txn,n=void 0===t?"charge":t,c=e.user,r=void 0===c?"":c,i=e.amount,a=e.note,o=void 0===a?"Split by Rece":a;return"venmo://paycharge?txn=".concat(n,"&recipients=").concat(r,"&amount=").concat(i,"&note=").concat(o)}({amount:T(e.id)})},children:P()(T(e.id)).format()})},e.id)}))]})]})]})})})]})]})},ce=function(e){var t=e.value,n=e.onChange,r=e.formatValue,i=void 0===r?function(e){return"".concat(e)}:r,a=Object(c.useState)(!1),s=Object(o.a)(a,2),l=s[0],d=s[1],j=Object(c.useRef)();return Object(c.useLayoutEffect)((function(){var e;l&&(null===(e=j.current)||void 0===e||e.focus())}),[l]),l?Object(k.jsx)(J.a,{placeholder:i(t),onChange:function(e){return n(parseFloat(e.target.value))},type:"number",onBlur:function(){return d(!1)},onKeyDown:function(e){["Enter","Escape"].includes(e.code)&&d(!1)},inputRef:j,style:{width:80,marginLeft:10}}):Object(k.jsx)(m.a,{onClick:function(){return d(!0)},children:i(t)})},re=n(140),ie=n(147),ae=n(148),oe=n(149),se=n(150),le=function(){var e=R(),t=e.appData.people,n=e.addPerson,r=e.removePerson,i=Object(c.useState)(""),a=Object(o.a)(i,2),s=a[0],l=a[1],d=function(e){e&&(n({id:Object(S.a)(),name:e.trim()}),l(""))};return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(O.a,{children:"Enter People"}),Object(k.jsxs)(W.a,{container:!0,spacing:4,children:[Object(k.jsx)(W.a,{item:!0,xs:12,children:Object(k.jsxs)(W.a,{container:!0,spacing:2,alignItems:"flex-end",children:[Object(k.jsx)(W.a,{item:!0,xs:12,md:11,children:Object(k.jsx)(J.a,{value:s,onChange:function(e){return l(e.target.value)},label:"Person Name",fullWidth:!0,onKeyDown:function(e){"Enter"===e.code&&d(s)}})}),Object(k.jsx)(W.a,{item:!0,xs:12,md:1,children:Object(k.jsx)(m.a,{variant:"contained",color:"primary",onClick:function(){return d(s)},fullWidth:!0,children:"Add"})})]})}),Object(k.jsx)(W.a,{item:!0,xs:12,children:Object(k.jsx)(re.a,{children:t.map((function(e){return Object(k.jsxs)(ie.a,{children:[Object(k.jsx)(ae.a,{children:Object(k.jsx)(H.a,{children:w(e.name)})}),Object(k.jsx)(oe.a,{primary:e.name}),Object(k.jsx)(se.a,{children:Object(k.jsx)(Q.a,{edge:"end",onClick:function(){return r(e.id)},children:Object(k.jsx)($.a,{})})})]},e.id)}))})})]})]})},de=function(){var e=Object(c.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(k.jsx)("div",{children:Object(k.jsx)(M,{children:Object(k.jsx)(N,{children:Object(k.jsxs)(s.a,{children:[Object(k.jsxs)(l.a,{value:n,onChange:function(e,t){return r(t)},indicatorColor:"primary",textColor:"primary",centered:!0,style:{marginBottom:20},children:[Object(k.jsx)(d.a,{label:"Items"}),Object(k.jsx)(d.a,{label:"People"})]}),0===n&&Object(k.jsx)(ne,{}),1===n&&Object(k.jsx)(le,{})]})})})})},je=n(152);a.a.render(Object(k.jsxs)(r.a.StrictMode,{children:[Object(k.jsx)(je.a,{}),Object(k.jsx)(de,{})]}),document.getElementById("root"))}},[[100,1,2]]]);
//# sourceMappingURL=main.256f522e.chunk.js.map