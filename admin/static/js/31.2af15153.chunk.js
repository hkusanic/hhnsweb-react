(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{781:function(e,a,t){e.exports={login:"style_login__2uTJi",title:"style_title__1kbDH",block:"style_block__3fahL",inner:"style_inner__1pIJc",form:"style_form__2jDnW"}},872:function(e,a,t){"use strict";t.r(a);t(198);var l,n=t(90),r=(t(577),t(449)),i=(t(424),t(543)),c=t(19),s=t(20),m=t(22),o=t(21),u=t(23),d=(t(447),t(446)),p=t(0),E=t.n(p),f=t(89),b=t(24),g=t(781),h=t.n(g),v=d.a.create()(l=Object(b.c)(function(e){return{user:e.user}})(l=function(e){function a(){var e,t;Object(c.a)(this,a);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return(t=Object(m.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(n)))).onSubmit=function(e){e.preventDefault();var a=t.props,l=a.form,n=a.dispatch;l.validateFields(function(e,a){e||n({type:"user/LOGIN",payload:a})})},t}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this.props,a=e.form,t=e.user.fetching;return E.a.createElement("div",null,E.a.createElement(f.Helmet,{title:"Login"}),E.a.createElement("div",{className:"".concat(h.a.title," login-heading")},E.a.createElement("h1",null,E.a.createElement("strong",null,"Hare Krishna! Welcome to the Admin page of niranjanaswami.net "))),E.a.createElement("div",{className:h.a.block},E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-xl-12"},E.a.createElement("div",{className:h.a.inner},E.a.createElement("div",{className:h.a.form},E.a.createElement("h4",{className:"text-uppercase"},E.a.createElement("strong",null,"Please log in")),E.a.createElement("br",null),E.a.createElement(d.a,{layout:"vertical",hideRequiredMark:!0,onSubmit:this.onSubmit},E.a.createElement(d.a.Item,{label:"Email"},a.getFieldDecorator("email",{initialValue:"admin@mediatec.org",rules:[{required:!0,message:"Please input your e-mail address"}]})(E.a.createElement(i.a,{size:"default"}))),E.a.createElement(d.a.Item,{label:"Password"},a.getFieldDecorator("password",{initialValue:"cleanui",rules:[{required:!0,message:"Please input your password"}]})(E.a.createElement(i.a,{size:"default",type:"password"}))),E.a.createElement(d.a.Item,null,a.getFieldDecorator("remember",{valuePropName:"checked",initialValue:!0})(E.a.createElement(r.a,null,"Remember me"))),E.a.createElement("div",{className:"form-actions"},E.a.createElement(n.a,{type:"primary",className:"width-150 mr-4",htmlType:"submit",loading:t},"Login")))))))))}}]),a}(p.Component))||l)||l;a.default=v}}]);
//# sourceMappingURL=31.2af15153.chunk.js.map