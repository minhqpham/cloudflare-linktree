!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){const r=n(1),o=[{name:"Cloudflare DDoS Protection",url:"https://www.cloudflare.com/ddos/"},{name:"Cloudflare Web Application Firewall",url:"https://www.cloudflare.com/waf/"},{name:"Cloudflare Bot Management",url:"https://www.cloudflare.com/products/bot-management/"},{name:"Cloudflare Magic Transit",url:"https://www.cloudflare.com/magic-transit/"},{name:"Cloudflare Rate Limiting",url:"https://www.cloudflare.com/rate-limiting/"}],s=[{url:"https://www.linkedin.com/in/minhqpham/",svg:"https://unpkg.com/simple-icons@v3/icons/linkedin.svg"},{url:"https://github.com/minhqpham",svg:"https://unpkg.com/simple-icons@v3/icons/github.svg"},{url:"https://www.instagram.com/minhqpham_/",svg:"https://unpkg.com/simple-icons@v3/icons/instagram.svg"}];addEventListener("fetch",t=>{t.respondWith(async function(t){const e=new r;e.get("/links",t=>async function(t){const e=JSON.stringify(o);return new Response(e,{headers:{"content-type":"application/json"}})}()),e.get(".*",t=>async function(t){const e=await fetch("https://static-links-page.signalnerve.workers.dev"),n=new i(o),r=new a(s),u=new l("Cloudflare solutions"),h=new c("bg-green-900");return(new HTMLRewriter).on("div#links",n).on("div#social",r).on("title",u).on("body",h).transform(e)}());return await e.route(t)}(t.request))});class i{constructor(t){this.links=t}async element(t){this.links.forEach(e=>t.append(`<a href="${e.url}">${e.name}</a>`,{html:!0}))}}class a{constructor(t){this.links=t}async element(t){t.removeAttribute("style"),this.links.forEach(e=>t.append(`<a href="${e.url}"><img height="32" width="32" src="${e.svg}"></a>`,{html:!0}))}}class l{constructor(t){this.title=t}async element(t){t.setInnerContent(this.title,{html:!1})}}class c{constructor(t){this.color=t}async element(t){t.setAttribute("class",this.color,{html:!1})}}},function(t,e){const n=t=>e=>e.method.toLowerCase()===t.toLowerCase(),r=n("connect"),o=n("delete"),s=n("get"),i=n("head"),a=n("options"),l=n("patch"),c=n("post"),u=n("put"),h=n("trace"),d=t=>e=>{const n=new URL(e.url).pathname;return(n.match(t)||[])[0]===n};t.exports=class{constructor(){this.routes=[]}handle(t,e){return this.routes.push({conditions:t,handler:e}),this}connect(t,e){return this.handle([r,d(t)],e)}delete(t,e){return this.handle([o,d(t)],e)}get(t,e){return this.handle([s,d(t)],e)}head(t,e){return this.handle([i,d(t)],e)}options(t,e){return this.handle([a,d(t)],e)}patch(t,e){return this.handle([l,d(t)],e)}post(t,e){return this.handle([c,d(t)],e)}put(t,e){return this.handle([u,d(t)],e)}trace(t,e){return this.handle([h,d(t)],e)}all(t){return this.handle([],t)}route(t){const e=this.resolve(t);return e?e.handler(t):new Response("resource not found",{status:404,statusText:"not found",headers:{"content-type":"text/plain"}})}resolve(t){return this.routes.find(e=>!(e.conditions&&(!Array.isArray(e)||e.conditions.length))||("function"==typeof e.conditions?e.conditions(t):e.conditions.every(e=>e(t))))}}}]);