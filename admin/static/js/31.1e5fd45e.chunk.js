(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{785:function(e,a,t){e.exports={login:"style_login__2WEBX",title:"style_title__3lWEa",block:"style_block__2XJIi",inner:"style_inner__1om7B",form:"style_form__w6s9U"}},876:function(e,a,t){"use strict";t.r(a);t(201);var l,r=t(95),n=(t(578),t(451)),i=(t(425),t(544)),c=t(19),s=t(20),m=t(22),o=t(21),u=t(23),d=(t(449),t(448)),p=t(0),E=t.n(p),f=t(94),b=t(24),g=t(785),h=t.n(g),v=d.a.create()(l=Object(b.c)(function(e){return{user:e.user}})(l=function(e){function a(){var e,t;Object(c.a)(this,a);for(var l=arguments.length,r=new Array(l),n=0;n<l;n++)r[n]=arguments[n];return(t=Object(m.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(r)))).onSubmit=function(e){e.preventDefault();var a=t.props,l=a.form,r=a.dispatch;l.validateFields(function(e,a){e||r({type:"user/LOGIN",payload:a})})},t}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this.props,a=e.form,t=e.user.fetching;return E.a.createElement("div",null,E.a.createElement(f.Helmet,{title:"Login"}),E.a.createElement("div",{className:"".concat(h.a.title," login-heading")},E.a.createElement("h1",null,E.a.createElement("strong",null,"Hare Krishna! Welcome to the Admin page of niranjanaswami.net "))),E.a.createElement("div",{className:h.a.block},E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-xl-12"},E.a.createElement("div",{className:h.a.inner},E.a.createElement("div",{className:h.a.form},E.a.createElement("h4",{className:"text-uppercase"},E.a.createElement("strong",null,"Please log in")),E.a.createElement("br",null),E.a.createElement(d.a,{layout:"vertical",hideRequiredMark:!0,onSubmit:this.onSubmit},E.a.createElement(d.a.Item,{label:"Email"},a.getFieldDecorator("email",{initialValue:"admin@mediatec.org",rules:[{required:!0,message:"Please input your e-mail address"}]})(E.a.createElement(i.a,{size:"default"}))),E.a.createElement(d.a.Item,{label:"Password"},a.getFieldDecorator("password",{initialValue:"cleanui",rules:[{required:!0,message:"Please input your password"}]})(E.a.createElement(i.a,{size:"default",type:"password"}))),E.a.createElement(d.a.Item,null,a.getFieldDecorator("remember",{valuePropName:"checked",initialValue:!0})(E.a.createElement(n.a,null,"Remember me"))),E.a.createElement("div",{className:"form-actions"},E.a.createElement(r.a,{type:"primary",className:"width-150 mr-4",htmlType:"submit",loading:t},"Login")))))))))}}]),a}(p.Component))||l)||l;a.default=v}}]);
//# sourceMappingURL=31.1e5fd45e.chunk.js.map