"use strict";(()=>{var Q=Object.create;var A=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var ee=Object.getPrototypeOf,te=Object.prototype.hasOwnProperty;var re=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ne=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Z(e))!te.call(t,s)&&s!==r&&A(t,s,{get:()=>e[s],enumerable:!(n=Y(e,s))||n.enumerable});return t};var se=(t,e,r)=>(r=t!=null?Q(ee(t)):{},ne(e||!t||!t.__esModule?A(r,"default",{value:t,enumerable:!0}):r,t));var H=re((ve,g)=>{"use strict";var p={decodeValues:!0,map:!1,silent:!1};function P(t){return typeof t=="string"&&!!t.trim()}function B(t,e){var r=t.split(";").filter(P),n=r.shift(),s=we(n),a=s.name,i=s.value;e=e?Object.assign({},p,e):p;try{i=e.decodeValues?decodeURIComponent(i):i}catch(d){console.error("set-cookie-parser encountered an error while decoding a cookie with value '"+i+"'. Set options.decodeValues to false to disable this feature.",d)}var f={name:a,value:i};return r.forEach(function(d){var l=d.split("="),c=l.shift().trimLeft().toLowerCase(),h=l.join("=");c==="expires"?f.expires=new Date(h):c==="max-age"?f.maxAge=parseInt(h,10):c==="secure"?f.secure=!0:c==="httponly"?f.httpOnly=!0:c==="samesite"?f.sameSite=h:f[c]=h}),f}function we(t){var e="",r="",n=t.split("=");return n.length>1?(e=n.shift(),r=n.join("=")):r=t,{name:e,value:r}}function V(t,e){if(e=e?Object.assign({},p,e):p,!t)return e.map?{}:[];if(t.headers)if(typeof t.headers.getSetCookie=="function")t=t.headers.getSetCookie();else if(t.headers["set-cookie"])t=t.headers["set-cookie"];else{var r=t.headers[Object.keys(t.headers).find(function(s){return s.toLowerCase()==="set-cookie"})];!r&&t.headers.cookie&&!e.silent&&console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."),t=r}if(Array.isArray(t)||(t=[t]),e=e?Object.assign({},p,e):p,e.map){var n={};return t.filter(P).reduce(function(s,a){var i=B(a,e);return s[i.name]=i,s},n)}else return t.filter(P).map(function(s){return B(s,e)})}function ye(t){if(Array.isArray(t))return t;if(typeof t!="string")return[];var e=[],r=0,n,s,a,i,f;function d(){for(;r<t.length&&/\s/.test(t.charAt(r));)r+=1;return r<t.length}function l(){return s=t.charAt(r),s!=="="&&s!==";"&&s!==","}for(;r<t.length;){for(n=r,f=!1;d();)if(s=t.charAt(r),s===","){for(a=r,r+=1,d(),i=r;r<t.length&&l();)r+=1;r<t.length&&t.charAt(r)==="="?(f=!0,r=i,e.push(t.substring(n,a)),n=r):r=a+1}else r+=1;(!f||r>=t.length)&&e.push(t.substring(n,t.length))}return e}g.exports=V;g.exports.parse=V;g.exports.parseString=B;g.exports.splitCookiesString=ye});var R=(t,e)=>e.some(r=>t instanceof r),U,M;function ie(){return U||(U=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oe(){return M||(M=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var L=new WeakMap,C=new WeakMap,y=new WeakMap;function ae(t){let e=new Promise((r,n)=>{let s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",i)},a=()=>{r(m(t.result)),s()},i=()=>{n(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",i)});return y.set(e,t),e}function de(t){if(L.has(t))return;let e=new Promise((r,n)=>{let s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",i),t.removeEventListener("abort",i)},a=()=>{r(),s()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",i),t.addEventListener("abort",i)});L.set(t,e)}var I={get(t,e,r){if(t instanceof IDBTransaction){if(e==="done")return L.get(t);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return m(t[e])},set(t,e,r){return t[e]=r,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function q(t){I=t(I)}function ce(t){return oe().includes(t)?function(...e){return t.apply($(this),e),m(this.request)}:function(...e){return m(t.apply($(this),e))}}function fe(t){return typeof t=="function"?ce(t):(t instanceof IDBTransaction&&de(t),R(t,ie())?new Proxy(t,I):t)}function m(t){if(t instanceof IDBRequest)return ae(t);if(C.has(t))return C.get(t);let e=fe(t);return e!==t&&(C.set(t,e),y.set(e,t)),e}var $=t=>y.get(t);function S(t,e,{blocked:r,upgrade:n,blocking:s,terminated:a}={}){let i=indexedDB.open(t,e),f=m(i);return n&&i.addEventListener("upgradeneeded",d=>{n(m(i.result),d.oldVersion,d.newVersion,m(i.transaction),d)}),r&&i.addEventListener("blocked",d=>r(d.oldVersion,d.newVersion,d)),f.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),f}var le=["get","getKey","getAll","getAllKeys","count"],ue=["put","add","delete","clear"],v=new Map;function j(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(v.get(e))return v.get(e);let r=e.replace(/FromIndex$/,""),n=e!==r,s=ue.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(s||le.includes(r)))return;let a=async function(i,...f){let d=this.transaction(i,s?"readwrite":"readonly"),l=d.store;return n&&(l=l.index(f.shift())),(await Promise.all([l[r](...f),s&&d.done]))[0]};return v.set(e,a),a}q(t=>({...t,get:(e,r,n)=>j(e,r)||t.get(e,r,n),has:(e,r)=>!!j(e,r)||t.has(e,r)}));var me=["continue","continuePrimaryKey","advance"],K={},D=new WeakMap,W=new WeakMap,he={get(t,e){if(!me.includes(e))return t[e];let r=K[e];return r||(r=K[e]=function(...n){D.set(this,W.get(this)[e](...n))}),r}};async function*pe(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;let r=new Proxy(e,he);for(W.set(r,e),y.set(r,$(e));e;)yield r,e=await(D.get(r)||e.continue()),D.delete(r)}function O(t,e){return e===Symbol.asyncIterator&&R(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&R(t,[IDBIndex,IDBObjectStore])}q(t=>({...t,get(e,r,n){return O(e,r)?pe:t.get(e,r,n)},has(e,r){return O(e,r)||t.has(e,r)}}));var b=class{db;constructor(){this.db=S("__$ampere",1,{upgrade(e){e.createObjectStore("cookies")}})}async findCookies(e,r){return(await(await this.db).getAll("cookies")).filter(i=>k(e,i.domain??"")&&_(r,i.path??"/"))}async putCookie(e){let r=await this.db;e.domain=e.domain?.replace(/^\./,""),await r.put("cookies",e,`${e.domain}:${e.path}:${e.name}`)}async removeCookie(e,r,n){await(await this.db).delete("cookies",`${e}:${r}:${n}`)}async removeCookies(e,r){let n=await this.db,s=await n.getAll("cookies");for(let a of s)a.domain===e&&a.path===r&&await n.delete("cookies",`${a.domain}:${a.path}:${a.name}`)}async removeAllCookies(){await(await this.db).clear("cookies")}async getAllCookies(){return await(await this.db).getAll("cookies")}},ge=/(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|(?:[a-f\d]{1,4}:){1}(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:)))$)/;function k(t,e){if(e==t)return!0;let r=e.lastIndexOf(t);return r<=0||e.length!==t.length+r||e.substr(r-1,1)!=="."?!1:!ge.test(e)}function _(t,e){return!!(e===t||t.indexOf(e)===0&&(e[e.length-1]==="/"||new RegExp(`^${e}`).test(t)&&t[e.length]==="/"))}var F=se(H(),1),E=new b;async function N(t,e){let r=(0,F.parse)(t,{decodeValues:!0,silent:!0})[0];r.domain||(r.domain=new URL(e).host),r.path||(r.path="/"),r.expires&&r.expires.getTime()<Date.now()&&(k(new URL(e).host,r.domain)&&_(new URL(e).pathname,r.path)?await E.removeCookie(r.domain,r.path,r.name):__$ampere.logger.warn("Attempted to set cookie for invalid domain or path.",t)),k(new URL(e).host,r.domain)&&_(new URL(e).pathname,r.path)?await E.putCookie(r):__$ampere.logger.warn("Attempted to set cookie for invalid domain or path.",t)}async function G(t){return(await E.findCookies(new URL(t).host,new URL(t).pathname)).map(r=>`${r.name}=${r.value}`).join("; ")}async function J(t,e){t.set("Origin",new URL(e).origin),t.set("Host",new URL(e).host),t.set("Referer",e.toString());let r=await G(e);return __$ampere.logger.debug("Cookie",r),r!==void 0&&t.set("Cookie",r||""),t}async function X(t,e){t.delete("content-security-policy"),t.delete("content-security-policy-report-only");let r=t.getSetCookie();for(let n of r)await N(n,e);return t}var x=class{listeners={};on(e,r){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(r)}once(e,r){let n=(...s)=>(this.off(e,n),r(...s));this.on(e,n)}off(e,r){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(n=>n!==r))}async emit(e,...r){let n;if(this.listeners[e]){for(let s of this.listeners[e])n=await s(...r)??n;return n}}};var T=class extends x{ready;constructor(){super();for(let e of __$ampere.config.plugins)try{e.worker&&(__$ampere.logger.info("Loading plugin",e.name),e.worker(this),__$ampere.logger.info("Loaded plugin",e.name))}catch(r){__$ampere.logger.error("Failed to load plugin",e.name,r)}this.ready=Promise.resolve(),self.addEventListener("install",()=>{__$ampere.logger.info("Service Worker installed")})}async makeRequest(e,r){return __$ampere.logger.info("Fetching",e.href,r),await __$ampere.bareClient.fetch(e,r)}async fetch(e){await this.ready;let{files:r}=__$ampere.config,n=[r.config,r.client,r.worker,r.bundle].map(o=>r.directory+o),s=new URL(e.request.url);if(n.includes(s.pathname))return __$ampere.logger.info("Loading ampere script",s.href),fetch(e.request);let a=__$ampere.unwriteURL(s.pathname)+s.search+s.hash;try{new URL(a)}catch{return __$ampere.logger.error("Decoded URL is invalid",a),new Response("Invalid URL",{status:400})}let i=new URL(a),f={method:e.request.method,headers:Object.fromEntries(e.request.headers),redirect:"manual",duplex:"half"};["GET","HEAD"].includes(e.request.method)||(f.body=e.request.body);let d=new Request(i,f),l=await J(new Headers(f.headers),i);Object.defineProperty(d,"headers",{get(){return l}}),d=await this.emit("request",d)??d;let c=await this.makeRequest(i,f);if(c.status>=300&&c.status<400&&c.headers.has("location"))return __$ampere.logger.debug("Redirecting from",i.href,"to",c.headers.get("location")),new Response(null,{status:301,headers:{location:__$ampere.rewriteURL(c.headers.get("location"),i)}});let h={status:c.status,statusText:c.statusText,headers:await X(c.headers,i)},u;if([101,204,205,304].includes(c.status))u=null,__$ampere.logger.info("Returning empty response for",i.href);else if(c.headers.get("content-type")?.includes("text/html")){__$ampere.logger.info("Rewriting HTML for",i.href);let o=await c.text();o=await this.emit("html",o)??o,o=await this.emit("pre:html",o)??o;let z=await __$ampere.getCookie(i);o=__$ampere.rewriteHTML(o,i,z??""),u=await this.emit("post:html",o)??o}else if(c.headers.get("content-type")?.includes("application/javascript")||["script","sharedworker","worker"].includes(e.request.destination)){__$ampere.logger.info("Rewriting JS for",i.href);let o=await c.text();o=await this.emit("js",o)??o,o=await this.emit("pre:js",o)??o,o=__$ampere.rewriteJS(o,i),u=await this.emit("post:js",o)??o}else if(c.headers.get("content-type")?.includes("text/css")||["style"].includes(e.request.destination)){__$ampere.logger.info("Rewriting CSS for",i.href);let o=await c.text();o=await this.emit("css",o)??o,o=await this.emit("pre:css",o)??o,o=__$ampere.rewriteCSS(o,i),u=await this.emit("post:css",o)??o}else if(e.request.destination==="manifest"){__$ampere.logger.info("Rewriting Manifest for",i.href);let o=await c.text();o=await this.emit("manifest",o)??o,o=await this.emit("pre:manifest",o)??o,o=__$ampere.rewriteManifest(o,i),u=await this.emit("post:manifest",o)??o}else __$ampere.logger.info("Returning binary for",i.href),u=c.body;let w=new Response(u,h);return w=await this.emit("response",w)??w,w}};self.AmpereWorker=T;})();
