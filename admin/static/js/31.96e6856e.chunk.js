(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{876:function(e,t,a){"use strict";a.r(t);a(550);var n,r=a(548),i=(a(202),a(57)),l=a(19),c=a(20),s=a(22),o=a(21),u=a(23),d=a(0),p=a.n(d),g=a(94),h=a(24),m=a(364),f=Object(h.c)(function(e){return{kirtan:e.kirtan}})(n=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).state={language:'"en-US"'===window.localStorage["app.settings.locale"]},a.handlePageChnage=function(e){(0,a.props.dispatch)({type:"kirtan/GET_KIRTAN",page:e})},a.deleteKirtan=function(e){var t=a.props.dispatch;console.log("uuid====????",e),t({type:"kirtan/DELETE_KIRTAN_BY_ID",uuid:e})},a.handleLanguage=function(){var e=a.state.language;a.setState({language:!e})},a.hanldeRedirect=function(e){var t=a.props.history,n=a.state.language;t.push({pathname:"/kirtan/create",state:{id:e.uuid,language:n}})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){(0,this.props.dispatch)({type:"kirtan/GET_KIRTAN",page:1})}},{key:"componentWillReceiveProps",value:function(e){e.kirtan.isDeleted&&(0,this.props.dispatch)({type:"kirtan/GET_KIRTAN",page:1});this.setState({language:'"en-US"'===window.localStorage["app.settings.locale"]})}},{key:"render",value:function(){var e=this,t=this.props.kirtan,a=this.state.language,n=t.kirtans,l=t.totalKirtans,c=n,s=[{title:"Title",dataIndex:a?"en.title":"ru.title",key:"en.title",render:function(e){return p.a.createElement("span",null,e)}},{title:"Event",dataIndex:a?"en.event":"ru.event",key:"en.event"},{title:"Type",dataIndex:"type",key:"type"},{title:"Date",dataIndex:"created_date",key:"created_date",render:function(e){return p.a.createElement("span",null,"".concat(new Date(e).toDateString()))}},{title:"Action",key:"action",render:function(t){return p.a.createElement("span",null,p.a.createElement(m.a,{to:{pathname:"/kirtan/create",state:{id:t.uuid,language:a}}},p.a.createElement("i",{className:"fa fa-edit mr-2 editIcon"})),p.a.createElement("i",{className:"fa fa-trash mr-2 closeIcon",onClick:function(){e.deleteKirtan(t.uuid)}}))}}];return p.a.createElement("div",null,p.a.createElement(g.Helmet,{title:"Kirtan List"}),p.a.createElement("div",{className:"card"},p.a.createElement("div",{className:"card-header mb-3"},p.a.createElement("div",{className:"utils__title"},p.a.createElement("strong",null,"Kirtan List"),p.a.createElement(i.a,{defaultChecked:!0,checkedChildren:a?"en":"ru",unCheckedChildren:a?"en":"ru",onChange:this.handleLanguage,className:"toggle",style:{width:"100px",marginLeft:"10px"}}))),p.a.createElement("div",{className:"card-body"},p.a.createElement(r.a,{rowClassName:function(e){return!0===e.translation_required?"NotTranslated":"translated"},onRow:function(t){return{onDoubleClick:function(){e.hanldeRedirect(t)}}},className:"utils__scrollTable",scroll:{x:"100%"},columns:s,dataSource:c,pagination:{pageSize:20,onChange:this.handlePageChnage,total:l}}))))}}]),t}(p.a.Component))||n;t.default=f}}]);
//# sourceMappingURL=31.96e6856e.chunk.js.map