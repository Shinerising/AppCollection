if(!self.define){let e,o={};const i=(i,n)=>(i=new URL(i+".js",n).href,o[i]||new Promise((o=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=o,document.head.appendChild(e)}else e=i,importScripts(i),o()})).then((()=>{let e=o[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,f)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(o[t])return;let r={};const s=e=>i(e,t),l={module:{uri:t},exports:r,require:s};o[t]=Promise.all(n.map((e=>l[e]||s(e)))).then((e=>(f(...e),r)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"font/fontello.eot",revision:"d0dbb07e4ef465cd471e648280fd441e"},{url:"font/fontello.ttf",revision:"2929a50d5e3168e3c30bf93c7bf15181"},{url:"font/fontello.woff",revision:"1610770718bcee39707cb9505e381150"},{url:"font/fontello.woff2",revision:"691fde671fc9399d9994754347c30450"},{url:"index.html",revision:"d50f36a86e262d147d64967b3335caf8"},{url:"list.json",revision:"2a33d9cab966a29e5439dfefa0204f3b"},{url:"main.js",revision:"32a87346c2e3db1404a33827e03879d2"},{url:"site.webmanifest",revision:"704d70eac5322624a70138b3d340ceee"},{url:"style/main.css",revision:"f474cb4c22f16e4fad5fa0921b1ef1a7"}],{})}));
