(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{vLTM:function(l,n,e){"use strict";e.r(n);var u=e("8Y7J");class t{}var a=e("pMnS"),i=e("oBZk"),s=e("ZZ/e"),o=e("s7LF"),b=e("ekNO"),r=e("qyy+"),g=e("lGQG"),d=e("7ch9"),c=e("3LUQ");class p{constructor(l,n,e,u,t){this.router=l,this.route=n,this.authService=e,this.loadingService=u,this.alertService=t,this.thisURL=null,this.userToken=null,this.oldUserName="",this.newAgentName=!1,this.postData={id:"",agent_type:"1",agent_name:"",address:"",region:"",mobile1:"",mobile2:"",email:"",commission:"",picture:"",remarks:"",newAgentName:!1},this.router.getCurrentNavigation().extras.state&&(this.postData=this.router.getCurrentNavigation().extras.state.agent,this.oldUserName=this.postData.agent_name,this.getCities())}ngOnInit(){}ionViewDidEnter(){this.thisURL=this.router.url.substr(1),this.userToken=this.route.snapshot.data.userData,this.userToken.dir=this.thisURL}cityChange(l){}getCities(){this.authService.Cities().subscribe(l=>{this.cities=l,this.myCity=[],this.postData.region.split(",").forEach(l=>{this.myCity.push(this.cities.find(n=>n.city==l))}),this.selectedCities=this.myCity},l=>{this.alertService.show("Network Error","","Unable to connect with live data")})}loginAction(){if(isNaN(+this.postData.commission))return this.alertService.show("","","Invalid commission rate"),!1;if(""==this.postData.agent_name||""==this.postData.commission)return this.alertService.show("","","Invalid Agent Name or commission rate"),!1;if(this.selectedCities){const l=this.selectedCities.map(l=>l.city).join(",");this.postData.region=l}this.newAgentName=this.postData.agent_name!=this.oldUserName,this.postData.newAgentName=this.newAgentName,this.loadingService.showLoader("Please wait"),this.authService.editAgent(this.postData,this.userToken).subscribe(l=>{if(this.loadingService.hideLoader(),l.userData){if("done"==l.userData)return this.alertService.show("","Success","Agent data has been updated successfully"),!1;if("exist"==l.userData)return this.alertService.show("","Error","Agent name already exist, Please change the agent name and try update again"),!1;if("no user found"==l.userData)return this.alertService.show("","Critical error","Matching user not found!"),!1;if("no agent found"==l.userData)return this.alertService.show("","Critical error","Matching Agent not found!"),!1}})}delete(){if(!this.postData.id)return this.alertService.show("","Error","Unable to find the Agent data"),!1;this.alertService.confirm("","Delete Confirmation","Are you sure, you want to delete this agent?").then(l=>{1==l.data&&(this.loadingService.showLoader("Please wait"),this.authService.deleteAgent(this.postData,this.userToken).subscribe(l=>{if(this.loadingService.hideLoader(),l.userData){if("done"==l.userData)return this.alertService.show("","Success","Agent data has been deleted successfully"),!1;if("no user found"==l.userData)return this.alertService.show("","Error","Unable to find the user data"),!1;if("no agent found"==l.userData)return this.alertService.show("","Error","Unable to find the Agent data"),!1}}))},l=>{this.alertService.show("","error","Network connection error. Please check your internet settings")})}Exit(){this.router.navigate(["agents"])}}var h=e("iInd"),C=u.Ab({encapsulation:0,styles:[[""]],data:{}});function m(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,11,"ion-header",[],null,null,null,i.ab,i.m)),u.Bb(1,49152,null,0,s.C,[u.j,u.p,u.F],null,null),(l()(),u.Cb(2,0,null,0,9,"ion-toolbar",[],null,null,null,i.Ab,i.M)),u.Bb(3,49152,null,0,s.Db,[u.j,u.p,u.F],null,null),(l()(),u.Cb(4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.S,i.e)),u.Bb(5,49152,null,0,s.m,[u.j,u.p,u.F],null,null),(l()(),u.Cb(6,0,null,0,2,"ion-back-button",[["defaultHref","/agents"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u.Nb(l,8).onClick(e)&&t),t}),i.Q,i.c)),u.Bb(7,49152,null,0,s.h,[u.j,u.p,u.F],{defaultHref:[0,"defaultHref"]},null),u.Bb(8,16384,null,0,s.i,[[2,s.jb],s.Kb],{defaultHref:[0,"defaultHref"]},null),(l()(),u.Cb(9,0,null,0,2,"ion-title",[],null,null,null,i.zb,i.L)),u.Bb(10,49152,null,0,s.Bb,[u.j,u.p,u.F],null,null),(l()(),u.Sb(-1,0,["Agent Details"])),(l()(),u.Cb(12,0,null,null,163,"ion-content",[],null,null,null,i.V,i.h)),u.Bb(13,49152,null,0,s.v,[u.j,u.p,u.F],null,null),(l()(),u.Cb(14,0,null,0,161,"ion-grid",[["class","ion-no-padding"]],null,null,null,i.Z,i.l)),u.Bb(15,49152,null,0,s.B,[u.j,u.p,u.F],null,null),(l()(),u.Cb(16,0,null,0,159,"ion-row",[["class","ion-no-padding"]],null,null,null,i.sb,i.E)),u.Bb(17,49152,null,0,s.kb,[u.j,u.p,u.F],null,null),(l()(),u.Cb(18,0,null,0,157,"ion-col",[["class","ion-no-padding"],["offset-lg","4"],["offset-md","3"],["offset-sm","3"],["offset-xs","0"],["size-lg","4"],["size-md","6"],["size-sm","6"],["size-xs","12"]],null,null,null,i.U,i.g)),u.Bb(19,49152,null,0,s.u,[u.j,u.p,u.F],null,null),(l()(),u.Cb(20,0,null,0,20,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(21,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(22,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(23,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Agent Type"])),(l()(),u.Cb(25,0,null,0,15,"ion-select",[["interface","popover"],["placeholder",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,26)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,26)._handleChangeEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.agent_type=e)&&t),t}),i.vb,i.G)),u.Bb(26,16384,null,0,s.Qb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Qb]),u.Bb(28,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(30,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(31,49152,null,0,s.ob,[u.j,u.p,u.F],{interface:[0,"interface"],placeholder:[1,"placeholder"]},null),(l()(),u.Cb(32,0,null,0,2,"ion-select-option",[["value","1"]],null,null,null,i.ub,i.H)),u.Bb(33,49152,null,0,s.pb,[u.j,u.p,u.F],{value:[0,"value"]},null),(l()(),u.Sb(-1,0,["Direct Dealer"])),(l()(),u.Cb(35,0,null,0,2,"ion-select-option",[["value","2"]],null,null,null,i.ub,i.H)),u.Bb(36,49152,null,0,s.pb,[u.j,u.p,u.F],{value:[0,"value"]},null),(l()(),u.Sb(-1,0,["Vehicle Owner"])),(l()(),u.Cb(38,0,null,0,2,"ion-select-option",[["value","3"]],null,null,null,i.ub,i.H)),u.Bb(39,49152,null,0,s.pb,[u.j,u.p,u.F],{value:[0,"value"]},null),(l()(),u.Sb(-1,0,["Vehicle Driver"])),(l()(),u.Cb(41,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(42,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(43,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(44,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Agent Name"])),(l()(),u.Cb(46,0,null,0,6,"ion-input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,47)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,47)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.agent_name=e)&&t),t}),i.eb,i.q)),u.Bb(47,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(49,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(51,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(52,49152,[["agent_name",4]],0,s.H,[u.j,u.p,u.F],{type:[0,"type"]},null),(l()(),u.Cb(53,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(54,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(55,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(56,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Address"])),(l()(),u.Cb(58,0,null,0,6,"ion-textarea",[["placeholder",""],["rows","3"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,59)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,59)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.address=e)&&t),t}),i.yb,i.K)),u.Bb(59,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(61,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(63,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(64,49152,null,0,s.zb,[u.j,u.p,u.F],{placeholder:[0,"placeholder"],rows:[1,"rows"]},null),(l()(),u.Cb(65,0,null,0,24,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(66,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(67,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(68,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Region"])),(l()(),u.Cb(70,0,null,0,19,"ionic-selectable",[["itemTextField","city"],["itemValueField","id"]],[[2,"ionic-selectable",null],[2,"ionic-selectable-ios",null],[2,"ionic-selectable-md",null],[2,"ionic-selectable-is-multiple",null],[2,"ionic-selectable-has-value",null],[2,"ionic-selectable-has-placeholder",null],[2,"ionic-selectable-has-label",null],[2,"ionic-selectable-label-default",null],[2,"ionic-selectable-label-fixed",null],[2,"ionic-selectable-label-stacked",null],[2,"ionic-selectable-label-floating",null],[2,"ionic-selectable-is-enabled",null],[2,"ionic-selectable-can-clear",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"onChange"]],(function(l,n,e){var u=!0,t=l.component;return"ngModelChange"===n&&(u=!1!==(t.selectedCities=e)&&u),"onChange"===n&&(u=!1!==t.cityChange(e)&&u),u}),b.d,b.c)),u.Bb(71,376832,null,14,r.a,[s.Jb,s.Nb,[2,s.I],u.x,u.p,u.K],{items:[0,"items"],itemValueField:[1,"itemValueField"],itemTextField:[2,"itemTextField"],canSearch:[3,"canSearch"],isMultiple:[4,"isMultiple"]},{onChange:"onChange"}),u.Qb(603979776,1,{valueTemplate:0}),u.Qb(603979776,2,{itemTemplate:0}),u.Qb(603979776,3,{itemEndTemplate:0}),u.Qb(603979776,4,{titleTemplate:0}),u.Qb(603979776,5,{placeholderTemplate:0}),u.Qb(603979776,6,{messageTemplate:0}),u.Qb(603979776,7,{groupTemplate:0}),u.Qb(603979776,8,{groupEndTemplate:0}),u.Qb(603979776,9,{closeButtonTemplate:0}),u.Qb(603979776,10,{searchFailTemplate:0}),u.Qb(603979776,11,{addItemTemplate:0}),u.Qb(603979776,12,{footerTemplate:0}),u.Qb(603979776,13,{headerTemplate:0}),u.Qb(603979776,14,{itemIconTemplate:0}),u.Pb(1024,null,o.d,(function(l){return[l]}),[r.a]),u.Bb(87,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(89,16384,null,0,o.f,[[4,o.e]],null,null),(l()(),u.Cb(90,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(91,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(92,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(93,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Mobile Number 1"])),(l()(),u.Cb(95,0,null,0,6,"ion-input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,96)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,96)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.mobile1=e)&&t),t}),i.eb,i.q)),u.Bb(96,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(98,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(100,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(101,49152,null,0,s.H,[u.j,u.p,u.F],{type:[0,"type"]},null),(l()(),u.Cb(102,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(103,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(104,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(105,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Mobile Number 2"])),(l()(),u.Cb(107,0,null,0,6,"ion-input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,108)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,108)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.mobile2=e)&&t),t}),i.eb,i.q)),u.Bb(108,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(110,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(112,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(113,49152,null,0,s.H,[u.j,u.p,u.F],{type:[0,"type"]},null),(l()(),u.Cb(114,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(115,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(116,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(117,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Email Address"])),(l()(),u.Cb(119,0,null,0,6,"ion-input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,120)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,120)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.email=e)&&t),t}),i.eb,i.q)),u.Bb(120,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(122,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(124,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(125,49152,[["email",4]],0,s.H,[u.j,u.p,u.F],{type:[0,"type"]},null),(l()(),u.Cb(126,0,null,0,14,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(127,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(128,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(129,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Commission Rate %"])),(l()(),u.Cb(131,0,null,0,9,"ion-input",[["clearInput","true"],["maxlength","2"],["required","true"],["type","tel"]],[[1,"required",0],[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,135)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,135)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.commission=e)&&t),t}),i.eb,i.q)),u.Bb(132,16384,null,0,o.h,[],{required:[0,"required"]},null),u.Bb(133,540672,null,0,o.b,[],{maxlength:[0,"maxlength"]},null),u.Pb(1024,null,o.c,(function(l,n){return[l,n]}),[o.h,o.b]),u.Bb(135,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(137,671744,null,0,o.g,[[8,null],[6,o.c],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(139,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(140,49152,[["comm",4]],0,s.H,[u.j,u.p,u.F],{clearInput:[0,"clearInput"],maxlength:[1,"maxlength"],required:[2,"required"],type:[3,"type"]},null),(l()(),u.Cb(141,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(142,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(143,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(144,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Profile Picture"])),(l()(),u.Cb(146,0,null,0,6,"ion-input",[["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,147)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,147)._handleIonChange(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.picture=e)&&t),t}),i.eb,i.q)),u.Bb(147,16384,null,0,s.Mb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Mb]),u.Bb(149,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(151,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(152,49152,null,0,s.H,[u.j,u.p,u.F],{type:[0,"type"]},null),(l()(),u.Cb(153,0,null,0,11,"ion-item",[],null,null,null,i.kb,i.r)),u.Bb(154,49152,null,0,s.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(155,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,i.lb,i.x)),u.Bb(156,49152,null,0,s.O,[u.j,u.p,u.F],{position:[0,"position"]},null),(l()(),u.Sb(-1,0,["Remarks if any"])),(l()(),u.Cb(158,0,null,0,6,"ion-textarea",[["placeholder",""],["rows","3"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,e){var t=!0,a=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,159)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,159)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(a.postData.remarks=e)&&t),t}),i.yb,i.K)),u.Bb(159,16384,null,0,s.Rb,[u.p],null,null),u.Pb(1024,null,o.d,(function(l){return[l]}),[s.Rb]),u.Bb(161,671744,null,0,o.g,[[8,null],[8,null],[8,null],[6,o.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,o.e,null,[o.g]),u.Bb(163,16384,null,0,o.f,[[4,o.e]],null,null),u.Bb(164,49152,null,0,s.zb,[u.j,u.p,u.F],{placeholder:[0,"placeholder"],rows:[1,"rows"]},null),(l()(),u.Cb(165,0,null,0,10,"div",[["class","ion-padding"]],null,null,null,null,null)),(l()(),u.Cb(166,0,null,null,4,"ion-button",[["color","primary"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.loginAction()&&u),u}),i.R,i.d)),u.Bb(167,49152,null,0,s.l,[u.j,u.p,u.F],{color:[0,"color"]},null),(l()(),u.Cb(168,0,null,0,1,"ion-icon",[["class","ion-padding-end"],["name","save"]],null,null,null,i.bb,i.n)),u.Bb(169,49152,null,0,s.D,[u.j,u.p,u.F],{name:[0,"name"]},null),(l()(),u.Sb(-1,0,[" Save Data"])),(l()(),u.Cb(171,0,null,null,4,"ion-button",[["color","danger"],["size","small"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.delete()&&u),u}),i.R,i.d)),u.Bb(172,49152,null,0,s.l,[u.j,u.p,u.F],{color:[0,"color"],size:[1,"size"]},null),(l()(),u.Cb(173,0,null,0,1,"ion-icon",[["class","ion-padding-end"],["name","trash"]],null,null,null,i.bb,i.n)),u.Bb(174,49152,null,0,s.D,[u.j,u.p,u.F],{name:[0,"name"]},null),(l()(),u.Sb(-1,0,[" Delete"]))],(function(l,n){var e=n.component;l(n,7,0,"/agents"),l(n,8,0,"/agents"),l(n,23,0,"stacked"),l(n,28,0,e.postData.agent_type),l(n,31,0,"popover",""),l(n,33,0,"1"),l(n,36,0,"2"),l(n,39,0,"3"),l(n,44,0,"stacked"),l(n,49,0,e.postData.agent_name),l(n,52,0,"text"),l(n,56,0,"stacked"),l(n,61,0,e.postData.address),l(n,64,0,"","3"),l(n,68,0,"stacked"),l(n,71,0,e.cities,"id","city",!0,!0),l(n,87,0,e.selectedCities),l(n,93,0,"stacked"),l(n,98,0,e.postData.mobile1),l(n,101,0,"text"),l(n,105,0,"stacked"),l(n,110,0,e.postData.mobile2),l(n,113,0,"text"),l(n,117,0,"stacked"),l(n,122,0,e.postData.email),l(n,125,0,"text"),l(n,129,0,"stacked"),l(n,132,0,"true"),l(n,133,0,"2"),l(n,137,0,e.postData.commission),l(n,140,0,"true","2","true","tel"),l(n,144,0,"stacked"),l(n,149,0,e.postData.picture),l(n,152,0,"number"),l(n,156,0,"stacked"),l(n,161,0,e.postData.remarks),l(n,164,0,"","3"),l(n,167,0,"primary"),l(n,169,0,"save"),l(n,172,0,"danger","small"),l(n,174,0,"trash")}),(function(l,n){l(n,25,0,u.Nb(n,30).ngClassUntouched,u.Nb(n,30).ngClassTouched,u.Nb(n,30).ngClassPristine,u.Nb(n,30).ngClassDirty,u.Nb(n,30).ngClassValid,u.Nb(n,30).ngClassInvalid,u.Nb(n,30).ngClassPending),l(n,46,0,u.Nb(n,51).ngClassUntouched,u.Nb(n,51).ngClassTouched,u.Nb(n,51).ngClassPristine,u.Nb(n,51).ngClassDirty,u.Nb(n,51).ngClassValid,u.Nb(n,51).ngClassInvalid,u.Nb(n,51).ngClassPending),l(n,58,0,u.Nb(n,63).ngClassUntouched,u.Nb(n,63).ngClassTouched,u.Nb(n,63).ngClassPristine,u.Nb(n,63).ngClassDirty,u.Nb(n,63).ngClassValid,u.Nb(n,63).ngClassInvalid,u.Nb(n,63).ngClassPending),l(n,70,1,[u.Nb(n,71)._cssClass,u.Nb(n,71)._isIos,u.Nb(n,71)._isMD,u.Nb(n,71)._isMultipleCssClass,u.Nb(n,71)._hasValueCssClass,u.Nb(n,71)._hasPlaceholderCssClass,u.Nb(n,71)._hasIonLabelCssClass,u.Nb(n,71)._hasDefaultIonLabelCssClass,u.Nb(n,71)._hasFixedIonLabelCssClass,u.Nb(n,71)._hasStackedIonLabelCssClass,u.Nb(n,71)._hasFloatingIonLabelCssClass,u.Nb(n,71).isEnabled,u.Nb(n,71).canClear,u.Nb(n,89).ngClassUntouched,u.Nb(n,89).ngClassTouched,u.Nb(n,89).ngClassPristine,u.Nb(n,89).ngClassDirty,u.Nb(n,89).ngClassValid,u.Nb(n,89).ngClassInvalid,u.Nb(n,89).ngClassPending]),l(n,95,0,u.Nb(n,100).ngClassUntouched,u.Nb(n,100).ngClassTouched,u.Nb(n,100).ngClassPristine,u.Nb(n,100).ngClassDirty,u.Nb(n,100).ngClassValid,u.Nb(n,100).ngClassInvalid,u.Nb(n,100).ngClassPending),l(n,107,0,u.Nb(n,112).ngClassUntouched,u.Nb(n,112).ngClassTouched,u.Nb(n,112).ngClassPristine,u.Nb(n,112).ngClassDirty,u.Nb(n,112).ngClassValid,u.Nb(n,112).ngClassInvalid,u.Nb(n,112).ngClassPending),l(n,119,0,u.Nb(n,124).ngClassUntouched,u.Nb(n,124).ngClassTouched,u.Nb(n,124).ngClassPristine,u.Nb(n,124).ngClassDirty,u.Nb(n,124).ngClassValid,u.Nb(n,124).ngClassInvalid,u.Nb(n,124).ngClassPending),l(n,131,0,u.Nb(n,132).required?"":null,u.Nb(n,133).maxlength?u.Nb(n,133).maxlength:null,u.Nb(n,139).ngClassUntouched,u.Nb(n,139).ngClassTouched,u.Nb(n,139).ngClassPristine,u.Nb(n,139).ngClassDirty,u.Nb(n,139).ngClassValid,u.Nb(n,139).ngClassInvalid,u.Nb(n,139).ngClassPending),l(n,146,0,u.Nb(n,151).ngClassUntouched,u.Nb(n,151).ngClassTouched,u.Nb(n,151).ngClassPristine,u.Nb(n,151).ngClassDirty,u.Nb(n,151).ngClassValid,u.Nb(n,151).ngClassInvalid,u.Nb(n,151).ngClassPending),l(n,158,0,u.Nb(n,163).ngClassUntouched,u.Nb(n,163).ngClassTouched,u.Nb(n,163).ngClassPristine,u.Nb(n,163).ngClassDirty,u.Nb(n,163).ngClassValid,u.Nb(n,163).ngClassInvalid,u.Nb(n,163).ngClassPending)}))}function N(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,1,"app-agent-details",[],null,null,null,m,C)),u.Bb(1,114688,null,0,p,[h.m,h.a,g.a,d.a,c.a],null,null)],(function(l,n){l(n,1,0)}),null)}var v=u.yb("app-agent-details",p,N,{},{},[]),B=e("SVse");class f{}var y=e("A2Kn");e.d(n,"AgentDetailsPageModuleNgFactory",(function(){return D}));var D=u.zb(t,[],(function(l){return u.Kb([u.Lb(512,u.m,u.kb,[[8,[a.a,v,b.a,b.b]],[3,u.m],u.D]),u.Lb(4608,B.l,B.k,[u.z,[2,B.x]]),u.Lb(4608,o.j,o.j,[]),u.Lb(4608,s.b,s.b,[u.F,u.g]),u.Lb(4608,s.Jb,s.Jb,[s.b,u.m,u.w]),u.Lb(4608,s.Ob,s.Ob,[s.b,u.m,u.w]),u.Lb(1073742336,B.b,B.b,[]),u.Lb(1073742336,o.i,o.i,[]),u.Lb(1073742336,o.a,o.a,[]),u.Lb(1073742336,s.Fb,s.Fb,[]),u.Lb(1073742336,h.q,h.q,[[2,h.v],[2,h.m]]),u.Lb(1073742336,f,f,[]),u.Lb(1073742336,y.a,y.a,[]),u.Lb(1073742336,t,t,[]),u.Lb(1024,h.k,(function(){return[[{path:"",component:p}]]}),[])])}))}}]);