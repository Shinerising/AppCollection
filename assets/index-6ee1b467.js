var y=Object.defineProperty;var w=(n,e,t)=>e in n?y(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var d=(n,e,t)=>(w(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();class r{}d(r,"URL","app.awayne.me"),d(r,"Owner","Shinerising"),d(r,"API","https://github-api.awayne.me/api"),d(r,"User","https://github-api.awayne.me/users"),d(r,"Content","https://github-api.awayne.me/content"),d(r,"Download","https://github-api.awayne.me/download"),d(r,"ImageProxy","https://github-api.awayne.me/img");const g={en:{SITE_TITLE:"Application Collection",PAGE_TITLE:"Application Collection",BRIEF_NULL:"No brief.",BUTTON_DOCUMENT:"Document",BUTTON_PREVIEW:"Preview",BUTTON_PACKAGE:"Package",BUTTON_GITHUB:"Source code",BUTTON_DEMO:"Demo",SEARCH_PLACEHOLDER:"Search",LABEL_PREVIEW:"Preview",LABEL_PLATFORM_ALL:"All"},zh:{SITE_TITLE:"软件集合",PAGE_TITLE:"科研成果及应用软件合集",BRIEF_NULL:"暂无简介。",BUTTON_DOCUMENT:"查看说明文档",BUTTON_PREVIEW:"下载预览版本",BUTTON_PACKAGE:"下载",BUTTON_GITHUB:"查看源代码",BUTTON_DEMO:"查看示例",SEARCH_PLACEHOLDER:"关键词搜索",LABEL_PREVIEW:"预览版本",LABEL_PLATFORM_ALL:"全平台"}},L=navigator.language.startsWith("zh")?"zh":"en",$=g[L],u=n=>$[n];class _{static async timeout(e){return new Promise(t=>{setTimeout(()=>{t(!0)},e)})}static async nextFrame(){return new Promise(e=>{requestAnimationFrame(()=>{e(!0)})})}}class v{static async startFetching(){const e=await this.fetchData("list.json");f.card.addClass("visible");const t=await this.fetchData(`${r.User}/${r.Owner}/packages?package_type=container`);e.map(async o=>{const a=document.createElement("section");a.addClass("repo"),f.collection.appendChild(a);try{const s=await this.fetchData(`${r.API}/${r.Owner}/${o.name}`),i=await this.fetchData(`${r.API}/${r.Owner}/${o.name}/releases`),h=this.generateNode(o,s,i,t.filter(l=>l.repository.full_name===s.full_name));await this.applyNode(a,h)}catch{a.remove()}})}static async applyNode(e,t){e.innerHTML+=t,await _.nextFrame(),e.addClass("visible")}static generateNode(e,t,o,a=[]){var T,E;const s=o.filter(m=>!m.prerelease)[0],i=o.filter(m=>m.prerelease)[0],h=a.map(m=>`<a class="link-github icon-docker" href="${m.html_url}">${m.name}</a>`),l=`${r.ImageProxy}?url=${r.Content}/${t.full_name}/contents/preview.jpg`,c=`${r.ImageProxy}?url=${r.Content}/${t.full_name}/contents/icon.png`;return`
<div class="repo-cover">
<img src="${l}" srcset="${l}&w=480&h=320h 480w, ${l}&w=960&h=640 960w, ${l}&w=1440&h=960 1440w" sizes="(max-width: 800px) 90vw, (max-width: 1440px) 45vw, 480px" loading="lazy" alt="${t.description}"/>
</div>
<div class="repo-info">
<div class="repo-header">
<div class="repo-icon">
<img src="${c}" srcset="${c}&w=64&h=64 1x, ${c}&w=128&h=128 2x" alt="${t.name}">
</div>
<div class="repo-labelbox">
<span>${t.language}</span>${t.topics.map(m=>`<span>${m}</span>`).join("")}
</div>
<h2 class="repo-title"><a href="${t.html_url}">${e.locale?((T=e.locale[L])==null?void 0:T.full_name)||e.full_name:e.full_name||t.name}</a></h2>
</div>
<ul class="repo-property">
<li class="icon-desktop" title="Platform">${e.platform==="All"?u("LABEL_PLATFORM_ALL"):e.platform}</li>
<li class="icon-tag" title="Latest version">${(s==null?void 0:s.tag_name.toUpperCase())||u("LABEL_PREVIEW")}</li>
<li class="icon-file-code-o" title="Code size">${this.getSize(t.size)}</li>
<li class="icon-calendar" title="Updated time">${this.timeDifference(new Date().getTime(),new Date(t.pushed_at).getTime())}</li>
</ul>
<p class="repo-description">${e.locale?((E=e.locale[L])==null?void 0:E.description)||t.description:t.description??u("BRIEF_NULL")}</p>
<div class="repo-document">
<a class="link icon-github" href="${t.html_url}">${u("BUTTON_GITHUB")}</a>
<a class="link icon-book" href="${e.document}">${u("BUTTON_DOCUMENT")}</a>
<a class="link icon-globe" href="${e.demo??""}">${u("BUTTON_DEMO")}</a>
</div>
<div class="empty"></div>
</div>
<div class="repo-link">
<a class="link-github icon-download" href="${i!=null&&i.assets[0]?`${i.assets[0].url.replace("https://api.github.com/repos",r.Download)}?file=${i.assets[0].name}`:""}">${u("BUTTON_PREVIEW")}</a>
<a class="link-github icon-download" href="${s!=null&&s.assets[0]?`${s.assets[0].url.replace("https://api.github.com/repos",r.Download)}?file=${s.assets[0].name}`:""}">${u("BUTTON_PACKAGE")} ${(s==null?void 0:s.tag_name.toUpperCase())||"Release"}</a>
${h}
</div>
    `}static async fetchData(e){return await fetch(e).then(t=>t.json()).then(t=>t)}static getSize(e){return e<1024?e+"KB":Math.round(e/1024)+"MB"}static timeDifference(e,t){const o=new Intl.RelativeTimeFormat(navigator.language||"en"),a=60*1e3,s=a*60,i=s*24,h=i*30,l=i*365,c=e-t;return c<a?o.format(Math.round(c/1e3)*-1,"second"):c<s?o.format(Math.round(c/a)*-1,"minute"):c<i?o.format(Math.round(c/s)*-1,"hour"):c<h?o.format(Math.round(c/i)*-1,"day"):c<l?o.format(Math.round(c/h)*-1,"month"):o.format(Math.round(c/l)*-1,"year")}}const p=class p{static load(){this.card=document.querySelector(".card"),this.collection=document.querySelector(".collection"),this.searchBox=document.querySelector("#textInput"),this.searchBox.placeholder=u("SEARCH_PLACEHOLDER"),p.query("title").textContent=u("SITE_TITLE"),p.query("#sitename").textContent=u("PAGE_TITLE")}static query(e){return document.querySelector(e)}static queryAll(e){return document.querySelectorAll(e)}};d(p,"card"),d(p,"collection"),d(p,"searchBox");let f=p;HTMLElement.prototype.addClass=function(n){this.classList.contains(n)||this.classList.add(n)};HTMLElement.prototype.removeClass=function(n){this.classList.contains(n)&&this.classList.remove(n)};HTMLElement.prototype.toggleClass=function(n){this.classList.contains(n)?this.classList.remove(n):this.classList.add(n)};HTMLElement.prototype.val=function(n){return n===""?this.value="":n&&(this.value=n),this.value};class A{async start(){await this.waitDocumentReady(),f.load(),v.startFetching(),this.enableSearching()}enableSearching(){let e="";setInterval(()=>{var a;const t=(a=f.searchBox.val())==null?void 0:a.trim().toLowerCase();if(e===t)return;e=t,document.querySelectorAll(".repo").forEach(s=>{var l;if(!t){s.classList.remove("filtered");return}const i=(l=s.textContent)==null?void 0:l.toLowerCase(),h=[...s.querySelectorAll("a")].map(c=>c.href).join(" ").toLowerCase();i!=null&&i.includes(t)||h.includes(t)?s.classList.remove("filtered"):s.classList.add("filtered")})},500)}waitDocumentReady(){return new Promise(e=>{if(document.readyState==="complete"||document.readyState==="interactive")e(!0);else{const t=()=>{document.removeEventListener("DOMContentLoaded",t),e(!0)};document.addEventListener("DOMContentLoaded",t)}})}}const P=new A;P.start();
