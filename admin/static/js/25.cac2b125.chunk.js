(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{496:function(e,t){},497:function(e,t){},844:function(e,t,a){},870:function(e,t,a){"use strict";a.r(t);a(500);var n,r=a(498),i=(a(201),a(56)),c=a(19),l=a(20),u=a(22),s=a(21),o=a(23),d=a(0),g=a.n(d),p=a(92),h=a(24),m=a(359),f=a(495),k=a.n(f),E=(a(844),Object(h.c)(function(e){return{kirtan:e.kirtan}})(n=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={language:!0,currentPage:1,perPage:20},a.handlePageChnage=function(e){var t=a.props.dispatch;a.setState({currentPage:e},function(){t({type:"kirtan/GET_KIRTAN",page:a.state.currentPage})})},a.deleteKirtan=function(e){(0,a.props.dispatch)({type:"kirtan/DELETE_KIRTAN_BY_ID",uuid:e})},a.handleLanguage=function(){var e=a.state.language;a.setState({language:!e})},a.hanldeRedirect=function(e){var t=a.props.history,n=a.state,r=n.language,i=n.currentPage;t.push({pathname:"/kirtan/create",state:{id:e.uuid,language:r,currentPage:i}})},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.dispatch,n=t.location.state;void 0!==n&&n.paginationCurrentPage?this.setState({currentPage:n.paginationCurrentPage},function(){a({type:"kirtan/GET_KIRTAN",page:e.state.currentPage})}):a({type:"kirtan/GET_KIRTAN",page:this.state.currentPage}),a({type:"video/RESET_STORE"})}},{key:"componentWillReceiveProps",value:function(e){e.kirtan.isDeleted&&(0,this.props.dispatch)({type:"kirtan/GET_KIRTAN",page:1})}},{key:"render",value:function(){var e=this,t=this.props.kirtan,a=this.state,n=a.language,c=a.currentPage,l=a.perPage,u=t.kirtans,s=t.totalKirtans,o=u,d=[{title:"Title",dataIndex:n?"en.title":"ru.title",key:n?"en.title":"ru.title",render:function(e){return e?k()(e.substring(0,30)):""}},{title:"Event",dataIndex:n?"en.event":"ru.event",key:n?"en.event":"ru.event"},{title:"Type",dataIndex:"type",key:"type"},{title:"Date",dataIndex:"kirtan_creation_date",key:"kirtan_creation_date",render:function(e){return g.a.createElement("span",null,"".concat(new Date(e).toDateString()))}},{title:"Action",key:"action",render:function(t){return g.a.createElement("span",null,g.a.createElement(m.a,{to:{pathname:"/kirtan/create",state:{id:t.uuid,language:n,currentPage:c}}},g.a.createElement("i",{className:"fa fa-edit mr-2 editIcon"})),g.a.createElement("i",{className:"fa fa-trash mr-2 closeIcon",onClick:function(){e.deleteKirtan(t.uuid)}}))}}],h={current:c,pageSize:l,total:s,onChange:this.handlePageChnage};return g.a.createElement("div",null,g.a.createElement(p.Helmet,{title:"Kirtan List"}),g.a.createElement("div",{className:"card"},g.a.createElement("div",{className:"card-header mb-3"},g.a.createElement("div",{className:"utils__title"},g.a.createElement("strong",null,"Kirtan List"),g.a.createElement(i.a,{defaultChecked:!0,checkedChildren:n?"en":"ru",unCheckedChildren:n?"en":"ru",onChange:this.handleLanguage,className:"toggle",style:{width:"100px",marginLeft:"10px"}}))),g.a.createElement("div",{className:"card-body"},g.a.createElement(r.a,{rowKey:function(e){return e._id},rowClassName:function(e){return!0===e.translation_required?"NotTranslated":"translated"},onRow:function(t){return{onDoubleClick:function(){e.hanldeRedirect(t)}}},className:"utils__scrollTable customTable",scroll:{x:"100%"},columns:d,dataSource:o,pagination:h}))))}}]),t}(g.a.Component))||n);t.default=E}}]);
//# sourceMappingURL=25.cac2b125.chunk.js.map