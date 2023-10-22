var L=Object.defineProperty;var E=(a,t,e)=>t in a?L(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var d=(a,t,e)=>(E(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();class o{}d(o,"URL","app.awayne.me"),d(o,"Owner","Shinerising"),d(o,"API","https://github-api.crscd.net/api"),d(o,"User","https://github-api.crscd.net/users"),d(o,"Content","https://github-api.crscd.net/content"),d(o,"Download","https://github-api.crscd.net/download");const y={en:{SITE_TITLE:"Application Collection",PAGE_TITLE:"Application Collection",BRIEF_NULL:"No brief.",BUTTON_DOCUMENT:"Document",BUTTON_PREVIEW:"Preview",BUTTON_PACKAGE:"Package",BUTTON_GITHUB:"Source code",BUTTON_DEMO:"Demo",LABEL_PREVIEW:"Preview",LABEL_PLATFORM_ALL:"Cross-platform"},zh:{SITE_TITLE:"软件集合",PAGE_TITLE:"科研成果及应用软件合集",BRIEF_NULL:"暂无简介。",BUTTON_DOCUMENT:"查看说明文档",BUTTON_PREVIEW:"下载预览版本",BUTTON_PACKAGE:"下载",BUTTON_GITHUB:"查看源代码",BUTTON_DEMO:"查看示例",LABEL_PREVIEW:"预览版本",LABEL_PLATFORM_ALL:"全平台"}},T=navigator.language.startsWith("zh")?"zh":"en",g=y[T],l=a=>g[a];class _{static async timeout(t){return new Promise(e=>{setTimeout(()=>{e(!0)},t)})}static async nextFrame(){return new Promise(t=>{requestAnimationFrame(()=>{t(!0)})})}}class ${static async startFetching(){const t=await this.fetchData("list.json");f.card.addClass("visible");const e=await this.fetchData(`${o.User}/${o.Owner}/packages?package_type=container`);t.map(async i=>{const n=document.createElement("section");n.addClass("repo"),f.collection.appendChild(n);try{const s=await this.fetchData(`${o.API}/${o.Owner}/${i.name}`),c=await this.fetchData(`${o.API}/${o.Owner}/${i.name}/releases`),m=this.generateNode(i,s,c,e.filter(p=>p.repository.full_name===s.full_name));await this.applyNode(n,m)}catch{n.remove()}})}static async applyNode(t,e){t.innerHTML+=e,await _.nextFrame(),t.addClass("visible")}static generateNode(t,e,i,n=[]){var p,r;const s=i.filter(u=>!u.prerelease)[0],c=i.filter(u=>u.prerelease)[0],m=n.map(u=>`<a class="link-github icon-docker" href="${u.html_url}">${u.name}</a>`);return`
<div class="repo-cover">
<img src="${o.Content}/${e.full_name}/contents/preview.jpg" alt="${e.description}"/>
</div>
<div class="repo-info">
<div class="repo-header">
<div class="repo-icon">
<img src="${o.Content}/${e.full_name}/contents/icon.png" alt="${e.name}">
</div>
<div class="repo-labelbox">
<span>${e.language}</span>${e.topics.map(u=>`<span>${u}</span>`).join("")}
</div>
<h2 class="repo-title"><a href="${e.html_url}">${t.locale?((p=t.locale[T])==null?void 0:p.full_name)||t.full_name:t.full_name||e.name}</a></h2>
</div>
<ul class="repo-property">
<li class="icon-desktop" title="Platform">${t.platform==="All"?l("LABEL_PLATFORM_ALL"):t.platform}</li>
<li class="icon-tag" title="Latest version">${(s==null?void 0:s.tag_name.toUpperCase())||l("LABEL_PREVIEW")}</li>
<li class="icon-file-code-o" title="Code size">${this.getSize(e.size)}</li>
<li class="icon-calendar" title="Updated time">${this.timeDifference(new Date().getTime(),new Date(e.pushed_at).getTime())}</li>
</ul>
<p class="repo-description">${t.locale?((r=t.locale[T])==null?void 0:r.description)||e.description:e.description??l("BRIEF_NULL")}</p>
<div class="repo-document">
<a class="link icon-github" href="${e.html_url}">${l("BUTTON_GITHUB")}</a>
<a class="link icon-book" href="${t.document}">${l("BUTTON_DOCUMENT")}</a>
<a class="link icon-globe" href="${t.demo??""}">${l("BUTTON_DEMO")}</a>
</div>
<div class="empty"></div>
</div>
<div class="repo-link">
<a class="link-github icon-download" href="${c!=null&&c.assets[0]?`${c.assets[0].url.replace("https://api.github.com/repos",o.Download)}?file=${c.assets[0].name}`:""}">${l("BUTTON_PREVIEW")}</a>
<a class="link-github icon-download" href="${s!=null&&s.assets[0]?`${s.assets[0].url.replace("https://api.github.com/repos",o.Download)}?file=${s.assets[0].name}`:""}">${l("BUTTON_PACKAGE")} ${(s==null?void 0:s.tag_name.toUpperCase())||"Release"}</a>
${m}
</div>
    `}static async fetchData(t){return await fetch(t).then(e=>e.json()).then(e=>e)}static getSize(t){return t<1024?t+"KB":Math.round(t/1024)+"MB"}static timeDifference(t,e){const i=new Intl.RelativeTimeFormat(navigator.language||"en"),n=60*1e3,s=n*60,c=s*24,m=c*30,p=c*365,r=t-e;return r<n?i.format(Math.round(r/1e3)*-1,"second"):r<s?i.format(Math.round(r/n)*-1,"minute"):r<c?i.format(Math.round(r/s)*-1,"hour"):r<m?i.format(Math.round(r/c)*-1,"day"):r<p?i.format(Math.round(r/m)*-1,"month"):i.format(Math.round(r/p)*-1,"year")}}const h=class h{static load(){this.card=document.querySelector(".card"),this.collection=document.querySelector(".collection"),h.query("title").textContent=l("SITE_TITLE"),h.query("#sitename").textContent=l("PAGE_TITLE")}static query(t){return document.querySelector(t)}static queryAll(t){return document.querySelectorAll(t)}};d(h,"card"),d(h,"collection");let f=h;HTMLElement.prototype.addClass=function(a){this.classList.contains(a)||this.classList.add(a)};HTMLElement.prototype.removeClass=function(a){this.classList.contains(a)&&this.classList.remove(a)};HTMLElement.prototype.toggleClass=function(a){this.classList.contains(a)?this.classList.remove(a):this.classList.add(a)};HTMLElement.prototype.val=function(a){return a===""?this.value="":a&&(this.value=a),this.value};class v{async start(){await this.waitDocumentReady(),f.load(),$.startFetching()}waitDocumentReady(){return new Promise(t=>{if(document.readyState==="complete"||document.readyState==="interactive")t(!0);else{const e=()=>{document.removeEventListener("DOMContentLoaded",e),t(!0)};document.addEventListener("DOMContentLoaded",e)}})}}const O=new v;O.start();
