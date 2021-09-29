(()=>{"use strict";var e={394:(e,r,t)=>{t.r(r);const n=require("http");var o=t.n(n);const u=require("express");var a=t.n(u);require("compression");const i=require("cors");var s=t.n(i);const c=require("mongoose");var p=t.n(c);const d=require("dotenv");t.n(d)().config();const f={MONGODB_URI:process.env.MONGODB_URI,JWT_SECRET:process.env.JWT_SECRET},m=require("mongoose-unique-validator");var l=t.n(m),g=new(p().Schema)({username:{type:String,required:!0,unique:!0,minlength:3},passwordHash:{type:String,required:!0}});g.plugin(l()),g.post("save",(function(e,r,t){e.name?t(new Error("Username already taken")):t(e)})),g.set("toJSON",{transform:function(e,r){r.id=r._id.toString(),delete r._id,delete r.__v,delete r.passwordHash}});const v=p().model("User",g);function y(e,r,t,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,o)}function h(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var u=e.apply(r,t);function a(e){y(u,n,o,a,i,"next",e)}function i(e){y(u,n,o,a,i,"throw",e)}a(void 0)}))}}require("express-async-errors");const x={list:function(){var e=h(regeneratorRuntime.mark((function e(r,t){var n,o,u,a,i,s,c,p,d,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.query,o=n.end,u=n.order,a=n.sort,i=n.start,e.next=3,v.collection.countDocuments();case 3:if(s=e.sent,!(o&&u&&a&&i)){e.next=15;break}return(c=v.find({})).sort((g=u,(l=a)in(m={})?Object.defineProperty(m,l,{value:g,enumerable:!0,configurable:!0,writable:!0}):m[l]=g,m)),c.limit(Number(o)-Number(i)),c.skip(Number(i)),console.log(r.auth),e.next=12,c.exec();case 12:return p=e.sent,t.set("xTotalCount",s.toString()),e.abrupt("return",t.json(p));case 15:if(d=r.query.filter,!(d=JSON.parse(d))){e.next=23;break}return e.next=20,v.find({_id:{$in:d.id}});case 20:return f=e.sent,t.set("xTotalCount",s.toString()),e.abrupt("return",t.json(f));case 23:case"end":return e.stop()}var m,l,g}),e)})));return function(r,t){return e.apply(this,arguments)}}(),userById:function(){var e=h(regeneratorRuntime.mark((function e(r,t,n,o){var u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.findById(o);case 2:if(u=e.sent){e.next=5;break}return e.abrupt("return",t.status(400).json({error:"User not found"}));case 5:r.profile=u,n();case 7:case"end":return e.stop()}}),e)})));return function(r,t,n,o){return e.apply(this,arguments)}}(),read:function(){var e=h(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.json(r.profile));case 1:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),remove:function(){var e=h(regeneratorRuntime.mark((function e(r,t){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.profile,e.next=3,n.remove();case 3:o=e.sent,t.json(o);case 5:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),removeMany:function(){var e=h(regeneratorRuntime.mark((function e(r,t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.query.filter,console.log(n),!n){e.next=8;break}return n=JSON.parse(n),console.log(n),e.next=7,v.deleteMany({_id:{$in:n.id}});case 7:return e.abrupt("return",t.json(n.id));case 8:return e.abrupt("return",t.status(400).json({error:"Users not found"}));case 9:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}()},b=require("bcrypt");var w=t.n(b);function q(e,r,t,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,o)}var R=new(p().Schema)({username:{type:String,required:!0,unique:!0,minlength:3},passwordHash:{type:String,required:!0}});R.plugin(l()),R.set("toJSON",{transform:function(e,r){r.id=r._id.toString(),delete r._id,delete r.__v,delete r.passwordHash}}),R.methods.comparePasswords=function(){var e,r=(e=regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",w().compare(r,this.passwordHash));case 1:case"end":return e.stop()}}),e,this)})),function(){var r=this,t=arguments;return new Promise((function(n,o){var u=e.apply(r,t);function a(e){q(u,n,o,a,i,"next",e)}function i(e){q(u,n,o,a,i,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}();const S=p().model("Admin",R),k=require("jsonwebtoken");var j=t.n(k);const _=require("express-jwt");var O=t.n(_);function P(e,r,t,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,o)}function T(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var u=e.apply(r,t);function a(e){P(u,n,o,a,i,"next",e)}function i(e){P(u,n,o,a,i,"throw",e)}a(void 0)}))}}const N={login:function(){var e=T(regeneratorRuntime.mark((function e(r,t){var n,o,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.body,e.next=3,S.findOne({username:n.username});case 3:if(o=e.sent){e.next=6;break}return e.abrupt("return",t.status(401).json({error:"wrong credentials"}));case 6:return e.next=8,o.comparePasswords(n.password);case 8:if(e.sent){e.next=11;break}return e.abrupt("return",t.status(401).json({error:"wrong credentials"}));case 11:return u=j().sign({id:o._id},f.JWT_SECRET),e.abrupt("return",t.json({token:u}));case 13:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),logout:function(){var e=T(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.status(200).end());case 1:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),requireLogin:O()({secret:f.JWT_SECRET,algorithms:["HS256"],userProperty:"auth"})};var I=a().Router();I.route("/users").get(N.requireLogin,x.list).delete(N.requireLogin,x.removeMany),I.route("/users/:userId").get(N.requireLogin,x.read).delete(N.requireLogin,x.remove),I.param("userId",x.userById);const B=I;var L=a().Router();L.route("/login").post(N.login),L.route("/logout").get(N.logout);const D=L;var C=new(p().Schema)({label:{type:String,trim:!0,required:"Label is required"},image:{data:Buffer,contentType:String},description:{type:String,trim:!0,required:"Description is required"},category:String,stock:{type:Number,required:"Quantity is required"},price:{type:Number,required:"Price is required"},updated:Date,created:{type:Date,default:Date.now},reviews:[{text:String,created:{type:Date,default:Date.now},postedBy:{type:p().Schema.Types.ObjectId,ref:"User"},rating:Number,id:String}]});C.plugin(l()),C.set("toJSON",{transform:function(e,r){r.id=r._id.toString(),delete r._id,delete r.__v}});const E=p().model("Product",C),J=require("formidable");var M=t.n(J);const U=require("fs");var F=t.n(U);const H=require("lodash"),$=require("sharp");var A=t.n($);function W(e,r,t,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,o)}function z(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var u=e.apply(r,t);function a(e){W(u,n,o,a,i,"next",e)}function i(e){W(u,n,o,a,i,"throw",e)}a(void 0)}))}}var G=function(){var e=z(regeneratorRuntime.mark((function e(r,t){var n,o,u,a,i,s,c,p,d,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.query,o=n.end,u=n.order,a=n.sort,i=n.start,e.next=3,E.collection.countDocuments();case 3:if(s=e.sent,!(o&&u&&a&&i)){e.next=15;break}return(c=E.find({})).sort((g=u,(l=a)in(m={})?Object.defineProperty(m,l,{value:g,enumerable:!0,configurable:!0,writable:!0}):m[l]=g,m)),c.limit(Number(o)-Number(i)),c.skip(Number(i)),c.select("-image.data"),e.next=12,c.exec();case 12:return p=e.sent,t.set("xTotalCount",s.toString()),e.abrupt("return",t.json(p));case 15:if(d=r.query.filter,!(d=JSON.parse(d))){e.next=23;break}return e.next=20,E.find({_id:{$in:d.id}});case 20:return f=e.sent,t.set("xTotalCount",s.toString()),e.abrupt("return",t.json(f));case 23:case"end":return e.stop()}var m,l,g}),e)})));return function(r,t){return e.apply(this,arguments)}}(),Q=function(){var e=z(regeneratorRuntime.mark((function e(r,t,n,o){var u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.findById(o);case 2:if(u=e.sent){e.next=5;break}return e.abrupt("return",t.status(400).json({error:"Product not found"}));case 5:r.product=u,n();case 7:case"end":return e.stop()}}),e)})));return function(r,t,n,o){return e.apply(this,arguments)}}(),V=function(){var e=z(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.json(r.product));case 1:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),K=function(){var e=z(regeneratorRuntime.mark((function e(r,t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.product,e.next=3,E.remove();case 3:n=e.sent,t.json(n);case 5:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),X=function(){var e=z(regeneratorRuntime.mark((function e(r,t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.query.filter,console.log(n),!n){e.next=8;break}return n=JSON.parse(n),console.log(n),e.next=7,E.deleteMany({_id:{$in:n.id}});case 7:return e.abrupt("return",t.json(n.id));case 8:return e.abrupt("return",t.status(400).json({error:"Users not found"}));case 9:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),Y=function(){var e=z(regeneratorRuntime.mark((function e(r,t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=new(M().IncomingForm)).keepExtensions=!0,n.parse(r,function(){var e=z(regeneratorRuntime.mark((function e(r,n,o){var u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=2;break}return e.abrupt("return",t.status(400).json({error:"An error occured"}));case 2:if(u=new E(n),!o.image){e.next=9;break}return e.next=6,A()(F().readFileSync(o.image.path)).resize({height:600,width:600}).toFile("./image");case 6:e.sent,u.image.data=F().readFileSync("./image"),u.image.contentType=o.image.type;case 9:return e.next=11,u.save();case 11:t.json({id:u._id});case 12:case"end":return e.stop()}}),e)})));return function(r,t,n){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),Z=function(){var e=z(regeneratorRuntime.mark((function e(r,t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=new(M().IncomingForm)).keepExtensions=!0,n.parse(r,function(){var e=z(regeneratorRuntime.mark((function e(n,o,u){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=2;break}return e.abrupt("return",t.status(400).json({error:"An error occured"}));case 2:if(a=r.product,a=(0,H.extend)(a,o),!u.image){e.next=10;break}return e.next=7,A()(F().readFileSync(u.image.path)).resize({height:600,width:600}).toFile("./image");case 7:e.sent,a.image.data=F().readFileSync("./image"),a.image.contentType=u.image.type;case 10:return e.next=12,a.save();case 12:t.json(a);case 13:case"end":return e.stop()}}),e)})));return function(r,t,n){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}();const ee={list:G,productById:Q,read:V,remove:K,removeMany:X,create:Y,image:function(){var e=z(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.set("Content-Type",r.product.image.contentType),e.abrupt("return",t.send(r.product.image.data));case 2:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),update:Z};var re=a().Router();re.route("/products").get(N.requireLogin,ee.list).delete(N.requireLogin,ee.removeMany).post(N.requireLogin,ee.create),re.route("/products/:productId").get(N.requireLogin,ee.read).delete(N.requireLogin,ee.remove).put(N.requireLogin,ee.update),re.route("/products/image/:productId").get(ee.image),re.param("productId",ee.productById);const te=re;var ne=new(p().Schema)({orderedProduct:{type:p().Schema.Types.ObjectId,ref:"Product"},user:{type:p().Schema.Types.ObjectId,ref:"User",required:!0},quantity:{type:Number,required:!0},address:{type:String,required:!0},created:{type:Date,default:Date.now},shipped:{type:Boolean,default:!1},finished:{type:Boolean,default:!1}});ne.set("toJSON",{transform:function(e,r){r.id=r._id.toString(),delete r._id,delete r.__v}});const oe=p().model("Order",ne);function ue(e,r,t,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void t(e)}i.done?r(s):Promise.resolve(s).then(n,o)}function ae(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var u=e.apply(r,t);function a(e){ue(u,n,o,a,i,"next",e)}function i(e){ue(u,n,o,a,i,"throw",e)}a(void 0)}))}}const ie={list:function(){var e=ae(regeneratorRuntime.mark((function e(r,t){var n,o,u,a,i,s,c,p,d,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.query,o=n.end,u=n.order,a=n.sort,i=n.start,e.next=3,oe.collection.countDocuments();case 3:if(s=e.sent,!(o&&u&&a&&i)){e.next=15;break}return(c=oe.find({})).sort((g=u,(l=a)in(m={})?Object.defineProperty(m,l,{value:g,enumerable:!0,configurable:!0,writable:!0}):m[l]=g,m)),c.limit(Number(o)-Number(i)),c.skip(Number(i)),console.log(r.auth),e.next=12,c.exec();case 12:return p=e.sent,t.set("xTotalCount",s.toString()),e.abrupt("return",t.json(p));case 15:if(d=r.query.filter,!(d=JSON.parse(d))){e.next=23;break}return e.next=20,oe.find({_id:{$in:d.id}});case 20:return f=e.sent,t.set("xTotalCount",s.toString()),e.abrupt("return",t.json(f));case 23:case"end":return e.stop()}var m,l,g}),e)})));return function(r,t){return e.apply(this,arguments)}}(),orderById:function(){var e=ae(regeneratorRuntime.mark((function e(r,t,n,o){var u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe.findById(o);case 2:if(u=e.sent){e.next=5;break}return e.abrupt("return",t.status(400).json({error:"Order not found"}));case 5:r.order=u,n();case 7:case"end":return e.stop()}}),e)})));return function(r,t,n,o){return e.apply(this,arguments)}}(),read:function(){var e=ae(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.json(r.order));case 1:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),update:function(){var e=ae(regeneratorRuntime.mark((function e(r,t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.order,n=(0,H.extend)(n,r.body),e.next=4,n.save();case 4:t.json(n);case 5:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}()};var se=a().Router();se.route("/orders").get(N.requireLogin,ie.list),se.route("/orders/:orderId").get(N.requireLogin,ie.read).put(N.requireLogin,ie.update),se.param("orderId",ie.orderById);const ce=se,pe=require("helmet");var de=t.n(pe),fe=a()();p().connect(f.MONGODB_URI,{useNewUrlParser:!0,useUnifiedTopology:!0,useFindAndModify:!1,useCreateIndex:!0}).then((function(){return console.log("connected to mongodb")})).catch((function(e){console.log("error connecting to mongodb. error: ".concat(e.message))})),fe.use(s()({exposedHeaders:"xTotalCount"})),fe.use(de()()),fe.use(a().static("build")),fe.use(a().json()),fe.use("/api",B),fe.use("/auth",D),fe.use("/api",te),fe.use("/api",ce),fe.use((function(e,r){r.status(404).json({error:"resource does not exist"})})),fe.use((function(e,r,t,n){return console.log(e.message),"ValidationError"===e.name?t.status(400).json({error:e.message}):"UnauthorizedError"===e.name?t.status(401).json({error:e.message}):void n(e)}));const me=fe;var le=o().createServer(me),ge=process.env.PORT||4e3;le.listen(ge,(function(){console.log("server running at port ".concat(ge))}))},949:e=>{e.exports=require("@babel/polyfill")}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var u=r[n]={exports:{}};return e[n](u,u.exports,t),u.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(949);var n=t(394);module.exports=n})();