!function(e){var t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(s,a,function(t){return e[t]}.bind(null,a));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t){let n=document.querySelectorAll(".pen-size__option");n=Array.prototype.slice.call(n);const s=document.querySelector(".paintBucket"),a=document.querySelector(".colorPicker"),o=document.querySelector(".pencil"),i=document.querySelector(".eraser"),r=document.querySelector(".curr-color__item"),c=document.querySelector(".prev-color__item");let l=document.querySelectorAll("frames__block");l=Array.prototype.slice.call(l);const d=document.querySelector(".frames__canvas"),u=document.querySelector(".add-frame"),m=document.getElementById("canvas"),v=document.querySelector(".preview__canvas"),p=document.querySelector(".export-gif"),h=document.querySelector(".export-apng"),f=document.querySelector(".fps-range"),g=document.querySelector(".fps-display");let S=document.querySelectorAll(".canvas-size__value");S=Array.prototype.slice.call(S),e.exports={BUCKET_CURSOR:"url(assets/images/fill-drip-solid.png) 20 20, auto",COLOR_PICKER_CURSOR:"url(assets/images/eye-dropper-solid.png) -20 23, auto",PENCIL_CURSOR:"url(assets/images/pencil-alt-solid.png) -20 23, auto",ERASER_CURSOR:"url(assets/images/eraser-solid.png) -20 23, auto",canvasEl:m,paintBucketEl:s,colorPickerEl:a,pencilEl:o,currColorEl:r,prevColorEl:c,addFrameButtonEl:u,framesEl:l,eraserEl:i,firstFrames:d,previewEl:v,saveImgToGif:p,saveImgToApng:h,rngFps:f,dspFps:g,canvasSize:S,penSize:n}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(2),n(3);var s=n(0);function a(e,t){const n=e.getContext("2d").getImageData(t.x,t.y,1,1).data;let s=0;return n[0]||n[1]||n[2]||n[3]?(a=n[0],o=n[1],i=n[2],s=`#${r(a)}${r(o)}${r(i)}`,s):"#ffffff";var a,o,i;function r(e){return s=e.toString(16),1===s.length?`0${s}`:s}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const i=512;class r{constructor(e,t){o(this,"canvas",void 0),o(this,"currentTool",void 0),o(this,"currСolor",void 0),o(this,"dimension",512),o(this,"penSize",1),o(this,"_scale",1),o(this,"_context",void 0),this.canvas=e,this._context=this.canvas.getContext("2d"),this.currСolor=t}get scale(){return this._scale}setScale(){this._scale=r.canvasWidth/this.dimension}get context(){return this._context}addListeners(){this.canvas.addEventListener("mousedown",e=>{"paintBucket"===this.currentTool&&this.fillClosedArea(e),"pencil"===this.currentTool&&this.drawWithPencil(e,!1),"eraser"===this.currentTool&&this.drawWithPencil(e,!0)})}drawWithPencil(e,t){let n,s=!0;n=t?this.clearOnePixel(e,this.canvas):this.drawPixel(e,this.canvas),this.canvas.addEventListener("mousemove",e=>{if(!0===s){const s=r.getCoord(e,this.canvas,this.scale);this.drawLineByBresenham(n.x,n.y,s.x,s.y,this.currСolor,t),n=s}}),this.canvas.addEventListener("mouseup",()=>{s=!1})}drawPixel(e){const t=r.getCoord(e,this.canvas,this.scale);return this._context.fillStyle=this.currСolor,this._context.fillRect(t.x,t.y,this.penSize,this.penSize),t}clearOnePixel(e){const t=r.getCoord(e,this.canvas,this.scale);return this._context.clearRect(t.x,t.y,this.penSize,this.penSize),t}fillClosedArea(e){const t=r.getCoord(e,this.canvas,this.scale),n=a(this.canvas,t,this.dimension);this._context.fillStyle=this.currСolor;const s=[t.x,t.y];for(;s.length>0;){const e=s.pop(),t=s.pop(),o={x:t,y:e},i=a(this.canvas,o,this.dimension);t>=0&&t<this.dimension&&e>=0&&e<this.dimension&&i===n&&(this._context.fillRect(t,e,this.penSize,this.penSize),s.push(t+this.penSize,e),s.push(t-this.penSize,e),s.push(t,e+this.penSize),s.push(t,e-this.penSize))}}drawResizedImage(e){this.canvas.width=this.dimension,this.canvas.height=this.dimension,this.setScale();const t=new Image;t.src=e,t.onload=()=>{this._context.drawImage(t,0,0,this.dimension,this.dimension)}}static getCoord(e,t,n){const s={x:0,y:0};return s.x=e.pageX-t.offsetLeft,s.y=e.pageY-t.offsetTop,s.x=Math.floor(s.x/n),s.y=Math.floor(s.y/n),s}drawLineByBresenham(e,t,n,s,a,o){const i=Math.abs(n-e),r=Math.abs(s-t),c=e<n?1:-1,l=t<s?1:-1;let d=i-r,u=e,m=t;for(;u!==n||m!==s;){o?this._context.clearRect(u,m,this.penSize,this.penSize):(this.context.fillStyle=a,this.context.fillRect(u,m,this.penSize,this.penSize));const e=2*d;e>-r&&(d-=r,u+=c),e<i&&(d+=i,m+=l)}}static get canvasWidth(){return i}}n(4);function c(e,t){const n=document.createElement("div");n.className="frames__block";const s=document.createElement("canvas");s.className="frames__canvas";const a=document.createElement("button");a.className="tile-overlay delete-frame icon-frame-recyclebin",a.addEventListener("click",()=>void document.querySelector(".frames__block.hover").remove());const o=document.createElement("button");return o.className="tile-overlay duplicate-frame icon-frame-duplicate",o.addEventListener("click",()=>(function(e,t,n){l(t,n),function(e){const t=new Image;t.src=e.toDataURL();const n=document.querySelector(".frames__canvas.active"),s=n.getContext("2d");n.width=e.width,n.height=e.height,t.onload=()=>{s.drawImage(t,0,0,e.width,e.height)}}(e),setTimeout(()=>d(t,n),0)})(s,e,t)),n.addEventListener("mouseover",()=>{n.classList.add("hover"),o.classList.add("visible"),a.classList.add("visible")}),n.addEventListener("mouseout",()=>{n.classList.remove("hover"),o.classList.remove("visible"),a.classList.remove("visible")}),n.appendChild(s),n.appendChild(a),n.appendChild(o),n}function l(e,t){const n=c(e,t);s.addFrameButtonEl.before(n);let a=document.querySelectorAll(".frames__canvas");a=Array.prototype.slice.call(a),a.map(e=>{e.classList.remove("active")}),n.addEventListener("mousedown",e=>{document.body.style.cursor="move",function(e,t){const n=document.querySelector(".frames"),s=c(e),a=c(n),o=t.pageY-s.top,i=t.pageY-a.top;function r(t){e.style.top=`${t.pageY-i-o}px`}function c(e){const t=e.getBoundingClientRect();return{top:t.top+pageYOffset,left:t.left+pageXOffset}}e.style.position="absolute",e.style.zIndex=1e3,n.appendChild(e),r(t),document.onmousemove=function(e){r(e)},e.onmouseup=function(){document.onmousemove=null,e.onmouseup=null},e.ondragstart=function(){return!1}}(n,e)}),n.childNodes[0].classList.add("active"),n.childNodes[0].addEventListener("click",()=>{a=document.querySelectorAll(".frames__canvas"),a=Array.prototype.slice.call(a),a.map(e=>{e.classList.remove("active")}),n.childNodes[0].classList.toggle("active"),d(e,t)}),e.canvas.getContext("2d").clearRect(0,0,e.canvas.width,e.canvas.height)}function d(e,t){const n=document.querySelector(".frames__canvas.active"),s=new Image;s.src=n.toDataURL();const a=e.canvas.getContext("2d");a.clearRect(0,0,e.canvas.width,e.canvas.height),s.onload=()=>{a.drawImage(s,0,0,t.state.dimension,t.state.dimension)}}n(1);let u,m,v;function p(){requestAnimationFrame(p);const e=Date.now(),t=e-u;t>m&&(u=e-t%m,function(){const e=s.previewEl.getContext("2d");let t=1;t=function(e){let t=document.querySelectorAll(".frames__canvas");return t=Array.prototype.slice.call(t),g.src=t[e].toDataURL(),t.length-1}(h),e.clearRect(0,0,v,v),s.previewEl.width=v,s.previewEl.height=v,e.drawImage(g,0,0,v,v),h>=t&&(f=!1);h<=0&&(f=!0);f?h+=1:h=0}())}let h=0,f=!0;const g=new Image;n(5),n(6),n(7);function S(e,t,n,s){!function(){let e=document.querySelector(".pallete").children;e=Array.prototype.slice.call(e),e.map(e=>{e.classList.remove("active")})}(),s.currentTool=e,document.body.style.cursor=t,n.classList.add("active")}const y="colorPicker",E="eraser",_="pencil",C="paintBucket";const L=83,R=66,w=67,x=80,k=69,O=27;n(8);const b=document.querySelector(".apng-canvas");function I(e,t,n){window.encoder=new APNGencoder(b),encoder.setRepeat(0),encoder.setDelay(e),encoder.setDispose(0),encoder.setBlend(1),encoder.start(),function(e){const t=b.getContext("2d");let n=document.querySelectorAll(".frames__canvas");n=Array.prototype.slice.call(n),n.forEach(n=>{b.width=e,b.height=e;const s=new Image;s.src=n.toDataURL(),t.drawImage(s,0,0,e,e),encoder.addFrame(t)}),encoder.addFrame(t)}(n),encoder.finish();const s=encoder.stream(),a=URL.createObjectURL(new Blob([new Uint8Array(s.bin)],{type:"image/png"}));return t.href=a,t.download="animation.png",0}function z(){return s.dspFps.innerHTML=`${s.rngFps.value} FPS`,+s.rngFps.value}const A=new class{constructor(e){this.canvas=e,this.state=this.initialState(),this.loadState()}saveStateApp(e){[this.state.currСolor,this.state.prevСolor]=e,this.state.img=this.canvas.toDataURL(),localStorage.setItem("state",JSON.stringify(this.state))}saveDimension(e){return this.state.dimension=e,localStorage.setItem("state",JSON.stringify(this.state)),!0}saveCanvas(e){return this.state.dimension=e,this.state.img=this.canvas.toDataURL(),localStorage.setItem("state",JSON.stringify(this.state)),!0}saveTool(e){return this.state.tool=e,localStorage.setItem("state",JSON.stringify(this.state)),!0}loadState(){this.state=JSON.parse(localStorage.getItem("state")),this.state?this.applySavedState():this.initialState()}initialState(){return this.state={"currСolor":"green","prevСolor":""},this.state.img="",this.state.dimension=512,this.state.tool="pencil",this.state}applySavedState(){const e=new Image;e.src=this.state.img;const t=this.canvas.getContext("2d");this.canvas.width=this.state.dimension,this.canvas.height=this.state.dimension,e.onload=()=>{t.drawImage(e,0,0,this.state.dimension,this.state.dimension)}}}(s.canvasEl);var P,U;P=A,s.currColorEl.value=P.state.currСolor,s.prevColorEl.value=P.state.prevСolor,32===(U=A.state.dimension)&&(s.canvasSize.map(e=>e.classList.remove("active")),s.canvasSize[0].classList.add("active")),64===U&&(s.canvasSize.map(e=>e.classList.remove("active")),s.canvasSize[1].classList.add("active")),128===U&&(s.canvasSize.map(e=>e.classList.remove("active")),s.canvasSize[2].classList.add("active"));const q=new r(s.canvasEl,A.state.currСolor);q.dimension=A.state.dimension,q.setScale(),q.addListeners(),function(e,t){l(e,t),s.addFrameButtonEl.addEventListener("click",()=>l(e,t)),s.rngFps.addEventListener("click",()=>(function(e,t){m=1e3/e,u=Date.now(),v=t,p()})(z(),t.state.dimension)),s.canvasEl.addEventListener("mouseup",()=>{!function(e){const t=new Image;t.src=e.canvas.toDataURL();const n=document.querySelector(".frames__canvas.active"),s=n.getContext("2d");n.width=e.dimension,n.height=e.dimension,t.onload=()=>{s.drawImage(t,0,0,e.dimension,e.dimension)}}(e),t.saveStateApp([t.state.currСolor,t.state.prevСolor])}),document.addEventListener("keydown",n=>(function(e,t,n){e.keyCode===L&&e.altKey&&n.saveStateApp(),e.keyCode===R&&S("paintBucket",s.BUCKET_CURSOR,s.paintBucketEl,t),e.keyCode===w&&S("colorPicker",s.COLOR_PICKER_CURSOR,s.colorPickerEl,t),e.keyCode===x&&S("pencil",s.PENCIL_CURSOR,s.pencilEl,t),e.keyCode===k&&S("eraser",s.ERASER_CURSOR,s.eraserEl,t),e.keyCode===O&&(document.body.style.cursor="")})(n,e,t)),s.saveImgToGif.addEventListener("click",()=>(function(e){const t=new GIFEncoder;t.setRepeat(0),t.setDelay(e),t.start();let n=document.querySelectorAll(".frames__canvas");n=Array.prototype.slice.call(n),n.forEach(e=>t.addFrame(e.getContext("2d"))),t.finish(),t.download("download.gif")})(1e3/z())),s.saveImgToApng.addEventListener("click",()=>I(1e3/z(),s.saveImgToApng,t.state.dimension)),function(e,t){s.canvasSize.map(n=>{n.addEventListener("click",()=>{s.canvasSize.map(e=>e.classList.remove("active")),n.classList.add("active"),e.dimension=+n.innerHTML,e.drawResizedImage(t.state.img),t.saveDimension(e.dimension)})})}(e,t),function(e){s.penSize.map(t=>{t.addEventListener("click",()=>{s.penSize.map(e=>e.classList.remove("selected")),t.classList.add("selected"),e.penSize=+t.dataset.size})})}(e),function(e,t){document.addEventListener("DOMContentLoaded",()=>{switch(t){case _:S(_,s.PENCIL_CURSOR,s.pencilEl,e);break;case E:S(E,s.ERASER_CURSOR,s.eraserEl,e);break;case C:S(C,s.BUCKET_CURSOR,s.paintBucketEl,e);break;case y:S(y,s.COLOR_PICKER_CURSOR,s.colorPickerEl,e),t=y}})}(e,t.state.tool),function(e,t){s.paintBucketEl.addEventListener("click",()=>{S(C,s.BUCKET_CURSOR,s.paintBucketEl,e),t.saveTool(C)}),s.colorPickerEl.addEventListener("click",()=>{S(y,s.COLOR_PICKER_CURSOR,s.colorPickerEl,e),t.state.tool=y,t.saveTool(y)}),s.pencilEl.addEventListener("click",()=>{S(_,s.PENCIL_CURSOR,s.pencilEl,e),t.saveTool(_)}),s.eraserEl.addEventListener("click",()=>{S(E,s.ERASER_CURSOR,s.eraserEl,e),t.saveTool(E)})}(e,t),function(e,t){function n(n){const a=s.currColorEl.value;n!==t.state.currСolor&&(t.state.prevСolor=a,t.state.currСolor=n,s.currColorEl.value=t.state.currСolor,s.prevColorEl.value=t.state.prevСolor,e.currСolor=n)}s.currColorEl.addEventListener("input",s=>{t.state.currСolor=s.target.value,e.currСolor=t.state.currСolor,n(s.target.value)},!1),s.prevColorEl.addEventListener("input",s=>{t.state.currСolor=s.target.value,e.currСolor=t.state.currСolor,n(s.target.value)},!1),s.canvasEl.addEventListener("mousedown",s=>{if("colorPicker"===t.state.tool){const t=r.getCoord(s,e.canvas,e.scale);n(a(e.canvas,t,e.dimension))}})}(e,t)}(q,A)}]);
//# sourceMappingURL=app.bundle.js.map