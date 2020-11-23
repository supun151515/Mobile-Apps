function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(l,n){for(var e=0;e<n.length;e++){var u=n[e];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(l,u.key,u)}}function _createClass(l,n,e){return n&&_defineProperties(l.prototype,n),e&&_defineProperties(l,e),l}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"7ch9":function(l,n,e){"use strict";e.d(n,"a",(function(){return r}));var u=e("mrSG"),t=e("ZZ/e"),i=e("8Y7J"),r=function(){var l=function(){function l(n){_classCallCheck(this,l),this.loadingController=n,this.isLoading=!1}return _createClass(l,[{key:"showLoader",value:function(l){return u.b(this,void 0,void 0,regeneratorRuntime.mark((function n(){var e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return this.isLoading=!0,n.next=3,this.loadingController.create({message:l,duration:1e3}).then((function(l){l.present().then((function(){e.isLoading||l.dismiss()}))}));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n,this)})))}},{key:"hideLoader",value:function(){return u.b(this,void 0,void 0,regeneratorRuntime.mark((function l(){return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:this.isLoading=!1;case 1:case"end":return l.stop()}}),l,this)})))}}]),l}();return l.ngInjectableDef=i.Wb({factory:function(){return new l(i.Xb(t.Hb))},token:l,providedIn:"root"}),l}()},lptd:function(l,n,e){"use strict";e.r(n);var u=e("8Y7J"),t=function l(){_classCallCheck(this,l)},i=e("pMnS"),r=e("oBZk"),o=e("ZZ/e"),s=e("SVse"),a=e("s7LF"),c=e("lGQG"),b=e("3LUQ"),h=e("7ch9"),f=e("tEUU"),d=function(){function l(n,e,u,t,i,r){_classCallCheck(this,l),this.authService=n,this.alertService=e,this.router=u,this.loadingService=t,this.route=i,this.permissionsService=r,this.information=[],this.informationSearch=[],this.keys=[],this.searchTerm="",this.userToken=null,this.userData=null,this.userAccess=null,this.thisURL=null,this.access=null,this.admin=null}return _createClass(l,[{key:"ngOnInit",value:function(){this.userToken=this.route.snapshot.data.userData}},{key:"ionViewDidEnter",value:function(){this.thisURL=this.router.url.substr(1),this.userToken=this.route.snapshot.data.userData,this.userToken.dir=this.thisURL,this.access=this.permissionsService.Auth(this.userToken,this.thisURL),this.admin=this.permissionsService.Admin(this.userToken,this.thisURL),this.getClients()}},{key:"transform",value:function(l,n){if(!l)return null;var e=l.reduce((function(l,e){return l[e[n]]?l[e[n]].push(e):l[e[n]]=[e],l}),{});return Object.keys(e).map((function(l){return{key:l,value:e[l]}}))}},{key:"getClients",value:function(){var l=this;this.authService.Clients(this.userToken).subscribe((function(n){l.information=n.userData;var e=l.transform(l.information,"agent_name");l.informationSearch=e,l.information=e,l.loadingService.hideLoader()}),(function(n){l.loadingService.hideLoader(),l.router.navigate([""])}))}},{key:"filterItems",value:function(l){return""===l.trim()?this.information:this.information.filter((function(n){return n.value.some((function(n){return n.client_name.toLowerCase().indexOf(l.toLowerCase())>-1||n.address.toLowerCase().indexOf(l.toLowerCase())>-1}))})).map((function(n){return Object.assign({},n,{value:n.value.filter((function(n){return n.client_name.toLowerCase().indexOf(l.toLowerCase())>-1||n.address.toLowerCase().indexOf(l.toLowerCase())>-1}))})}))}},{key:"setFilteredItems",value:function(){this.informationSearch=this.filterItems(this.searchTerm)}},{key:"addNewItem",value:function(){this.router.navigate(["/clients-new"])}},{key:"doRefresh",value:function(l){this.searchTerm="",this.getClients(),l.target.complete(),this.loadingService.hideLoader()}},{key:"Dialer",value:function(l){window.open("tel:"+l,"_system")}},{key:"userDetails",value:function(l){this.router.navigate(["client-details"],{state:{client:l}})}}]),l}(),p=e("iInd"),m=u.Ab({encapsulation:0,styles:[["ion-avatar[_ngcontent-%COMP%]{width:75px;height:75px;padding-left:0;padding-right:10px}a[_ngcontent-%COMP%]{font-size:14px}"]],data:{}});function g(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","top"]],null,null,null,r.X,r.i)),u.Bb(1,49152,null,0,o.x,[u.j,u.p,u.F],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(l()(),u.Cb(2,0,null,0,3,"ion-fab-button",[],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.addNewItem()&&u),u}),r.W,r.j)),u.Bb(3,49152,null,0,o.y,[u.j,u.p,u.F],null,null),(l()(),u.Cb(4,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,r.bb,r.n)),u.Bb(5,49152,null,0,o.D,[u.j,u.p,u.F],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"end","top"),l(n,5,0,"add")}),null)}function C(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,4,"ion-item-divider",[],null,null,null,r.fb,r.s)),u.Bb(1,49152,null,0,o.J,[u.j,u.p,u.F],null,null),(l()(),u.Cb(2,0,null,0,2,"ion-label",[],null,null,null,r.lb,r.x)),u.Bb(3,49152,null,0,o.O,[u.j,u.p,u.F],null,null),(l()(),u.Sb(4,0,["",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.key)}))}function v(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,25,"ion-item",[],null,null,null,r.kb,r.r)),u.Bb(1,49152,null,0,o.I,[u.j,u.p,u.F],null,null),(l()(),u.Cb(2,0,null,0,2,"ion-avatar",[],null,null,null,r.P,r.b)),u.Bb(3,49152,null,0,o.g,[u.j,u.p,u.F],null,null),(l()(),u.Cb(4,0,null,0,0,"img",[["src","https://api.time.com/wp-content/uploads/2018/12/square-meghan-markle-person-of-the-year-2018.jpg?quality=85"]],null,null,null,null,null)),(l()(),u.Cb(5,0,null,0,15,"ion-label",[["class","ion-text-wrap"]],null,null,null,r.lb,r.x)),u.Bb(6,49152,null,0,o.O,[u.j,u.p,u.F],null,null),(l()(),u.Cb(7,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),u.Sb(8,null,[" "," "])),(l()(),u.Cb(9,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),u.Sb(10,null,[" "," "])),(l()(),u.Cb(11,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),u.Sb(12,null,[" "," "])),(l()(),u.Cb(13,0,null,0,5,"p",[],null,null,null,null,null)),(l()(),u.Cb(14,0,null,null,1,"a",[["class","ion-no-padding"],["fill","clear"],["size","small"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.Dialer(l.context.$implicit.mobile1)&&u),u}),null,null)),(l()(),u.Sb(15,null,["",""])),(l()(),u.Sb(-1,null,[" \xa0\xa0 "])),(l()(),u.Cb(17,0,null,null,1,"a",[["class","ion-no-padding"],["fill","clear"],["size","small"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.Dialer(l.context.$implicit.mobile2)&&u),u}),null,null)),(l()(),u.Sb(18,null,["",""])),(l()(),u.Cb(19,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Sb(20,null,[" "," "])),(l()(),u.Cb(21,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Sb(22,null,["",""])),(l()(),u.Cb(23,0,null,0,2,"ion-button",[],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.userDetails(l.context.$implicit)&&u),u}),r.R,r.d)),u.Bb(24,49152,null,0,o.l,[u.j,u.p,u.F],null,null),(l()(),u.Sb(-1,0,["Details"]))],null,(function(l,n){l(n,8,0,n.context.$implicit.client_name),l(n,10,0,n.context.$implicit.address),l(n,12,0,n.context.$implicit.region),l(n,15,0,n.context.$implicit.mobile1),l(n,18,0,n.context.$implicit.mobile2),l(n,20,0,n.context.$implicit.email),l(n,22,0,n.context.$implicit.commission)}))}function k(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),u.Cb(1,0,null,null,6,"ion-item-group",[],null,null,null,r.gb,r.t)),u.Bb(2,49152,null,0,o.K,[u.j,u.p,u.F],null,null),(l()(),u.rb(16777216,null,0,1,null,C)),u.Bb(4,16384,null,0,s.j,[u.X,u.T],{ngIf:[0,"ngIf"]},null),(l()(),u.rb(16777216,null,0,1,null,v)),u.Bb(6,278528,null,0,s.i,[u.X,u.T,u.x],{ngForOf:[0,"ngForOf"]},null),(l()(),u.Cb(7,0,null,0,0,"br",[],null,null,null,null,null))],(function(l,n){l(n,4,0,"1"==n.component.admin),l(n,6,0,n.context.$implicit.value)}),null)}function w(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,12,"ion-header",[],null,null,null,r.ab,r.m)),u.Bb(1,49152,null,0,o.C,[u.j,u.p,u.F],null,null),(l()(),u.Cb(2,0,null,0,8,"ion-toolbar",[],null,null,null,r.Ab,r.M)),u.Bb(3,49152,null,0,o.Db,[u.j,u.p,u.F],null,null),(l()(),u.Cb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,r.S,r.e)),u.Bb(5,49152,null,0,o.m,[u.j,u.p,u.F],null,null),(l()(),u.Cb(6,0,null,0,1,"ion-menu-button",[],null,null,null,r.nb,r.A)),u.Bb(7,49152,null,0,o.S,[u.j,u.p,u.F],null,null),(l()(),u.Cb(8,0,null,0,2,"ion-title",[["class","ion-text-left"]],null,null,null,r.zb,r.L)),u.Bb(9,49152,null,0,o.Bb,[u.j,u.p,u.F],null,null),(l()(),u.Sb(-1,0,["Clients Registry"])),(l()(),u.rb(16777216,null,0,1,null,g)),u.Bb(12,16384,null,0,s.j,[u.X,u.T],{ngIf:[0,"ngIf"]},null),(l()(),u.Cb(13,0,null,null,22,"ion-content",[],null,null,null,r.V,r.h)),u.Bb(14,49152,null,0,o.v,[u.j,u.p,u.F],null,null),(l()(),u.Cb(15,0,null,0,20,"ion-grid",[["class","ion-no-padding"]],null,null,null,r.Z,r.l)),u.Bb(16,49152,null,0,o.B,[u.j,u.p,u.F],null,null),(l()(),u.Cb(17,0,null,0,18,"ion-row",[],null,null,null,r.sb,r.E)),u.Bb(18,49152,null,0,o.kb,[u.j,u.p,u.F],null,null),(l()(),u.Cb(19,0,null,0,16,"ion-col",[["class","ion-no-padding"],["offset-lg","3"],["offset-md","3"],["offset-sm","2"],["offset-xs","0"],["size-lg","6"],["size-md","6"],["size-sm","8"],["size-xs","12"]],null,null,null,r.U,r.g)),u.Bb(20,49152,null,0,o.u,[u.j,u.p,u.F],null,null),(l()(),u.Cb(21,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,e){var u=!0;return"ionRefresh"===n&&(u=!1!==l.component.doRefresh(e)&&u),u}),r.rb,r.C)),u.Bb(22,49152,null,0,o.eb,[u.j,u.p,u.F],null,null),(l()(),u.Cb(23,0,null,0,1,"ion-refresher-content",[["pullingIcon","arrow-dropdown"],["refreshingSpinner","circles"],["refreshingText","Refreshing..."]],null,null,null,r.qb,r.D)),u.Bb(24,49152,null,0,o.fb,[u.j,u.p,u.F],{pullingIcon:[0,"pullingIcon"],refreshingSpinner:[1,"refreshingSpinner"],refreshingText:[2,"refreshingText"]},null),(l()(),u.Cb(25,0,null,0,10,"ion-list",[],null,null,null,r.mb,r.y)),u.Bb(26,49152,null,0,o.P,[u.j,u.p,u.F],null,null),(l()(),u.Cb(27,0,null,0,6,"ion-searchbar",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Nb(l,28)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Nb(l,28)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.searchTerm=e)&&t),"ionChange"===n&&(t=!1!==i.setFilteredItems()&&t),t}),r.tb,r.F)),u.Bb(28,16384,null,0,o.Rb,[u.p],null,null),u.Pb(1024,null,a.d,(function(l){return[l]}),[o.Rb]),u.Bb(30,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Pb(2048,null,a.e,null,[a.g]),u.Bb(32,16384,null,0,a.f,[[4,a.e]],null,null),u.Bb(33,49152,null,0,o.lb,[u.j,u.p,u.F],null,null),(l()(),u.rb(16777216,null,0,1,null,k)),u.Bb(35,278528,null,0,s.i,[u.X,u.T,u.x],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var e=n.component;l(n,12,0,"1"==e.access),l(n,24,0,"arrow-dropdown","circles","Refreshing..."),l(n,30,0,e.searchTerm),l(n,35,0,e.informationSearch)}),(function(l,n){l(n,27,0,u.Nb(n,32).ngClassUntouched,u.Nb(n,32).ngClassTouched,u.Nb(n,32).ngClassPristine,u.Nb(n,32).ngClassDirty,u.Nb(n,32).ngClassValid,u.Nb(n,32).ngClassInvalid,u.Nb(n,32).ngClassPending)}))}var L=u.yb("app-clients",d,(function(l){return u.Tb(0,[(l()(),u.Cb(0,0,null,null,1,"app-clients",[],null,null,null,w,m)),u.Bb(1,114688,null,0,d,[c.a,b.a,p.m,h.a,p.a,f.a],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),x=function l(){_classCallCheck(this,l)};e.d(n,"ClientsPageModuleNgFactory",(function(){return B}));var B=u.zb(t,[],(function(l){return u.Kb([u.Lb(512,u.m,u.kb,[[8,[i.a,L]],[3,u.m],u.D]),u.Lb(4608,s.l,s.k,[u.z,[2,s.x]]),u.Lb(4608,a.j,a.j,[]),u.Lb(4608,o.b,o.b,[u.F,u.g]),u.Lb(4608,o.Jb,o.Jb,[o.b,u.m,u.w]),u.Lb(4608,o.Ob,o.Ob,[o.b,u.m,u.w]),u.Lb(1073742336,s.b,s.b,[]),u.Lb(1073742336,a.i,a.i,[]),u.Lb(1073742336,a.a,a.a,[]),u.Lb(1073742336,o.Fb,o.Fb,[]),u.Lb(1073742336,p.q,p.q,[[2,p.v],[2,p.m]]),u.Lb(1073742336,x,x,[]),u.Lb(1073742336,t,t,[]),u.Lb(1024,p.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);