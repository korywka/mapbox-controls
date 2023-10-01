(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var mapboxGl = {exports: {}};

	/* Mapbox GL JS is Copyright © 2020 Mapbox and subject to the Mapbox Terms of Service ((https://www.mapbox.com/legal/tos/). */

	(function (module, exports) {
		(function (global, factory) {
		module.exports = factory() ;
		})(commonjsGlobal, (function () {
		/* eslint-disable */

		var shared, worker, mapboxgl;
		// define gets called three times: one for each chunk. we rely on the order
		// they're imported to know which is which
		function define(_, chunk) {
		if (!shared) {
		    shared = chunk;
		} else if (!worker) {
		    worker = chunk;
		} else {
		    var workerBundleString = "self.onerror = function() { console.error('An error occurred while parsing the WebWorker bundle. This is most likely due to improper transpilation by Babel; please see https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling'); }; var sharedChunk = {}; (" + shared + ")(sharedChunk); (" + worker + ")(sharedChunk); self.onerror = null;";

		    var sharedChunk = {};
		    shared(sharedChunk);
		    mapboxgl = chunk(sharedChunk);
		    if (typeof window !== 'undefined' && window && window.URL && window.URL.createObjectURL) {
		        mapboxgl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], { type: 'text/javascript' }));
		    }
		}
		}


		define(["exports"],(function(e){var t="undefined"!=typeof self?self:{},i="3.0.0-beta.1";let r;const n={API_URL:"https://api.mapbox.com",get API_URL_REGEX(){if(null==r){const e=/^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/|\?|$)/i;try{r=null!=process.env.API_URL_REGEX?new RegExp(process.env.API_URL_REGEX):e;}catch(t){r=e;}}return r},get API_TILEJSON_REGEX(){return /^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/v[0-9]*\/.*\.json.*$)/i},get API_SPRITE_REGEX(){return /^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/styles\/v[0-9]*\/)(.*\/sprite.*\..*$)/i},get API_FONTS_REGEX(){return /^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/fonts\/v[0-9]*\/)(.*\.pbf.*$)/i},get API_STYLE_REGEX(){return /^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/styles\/v[0-9]*\/)(.*$)/i},get API_CDN_URL_REGEX(){return /^((https?:)?\/\/)?api\.mapbox\.c(n|om)(\/mapbox-gl-js\/)(.*$)/i},get EVENTS_URL(){if(!n.API_URL)return null;try{const e=new URL(n.API_URL);return "api.mapbox.cn"===e.hostname?"https://events.mapbox.cn/events/v2":"api.mapbox.com"===e.hostname?"https://events.mapbox.com/events/v2":null}catch(e){return null}},SESSION_PATH:"/map-sessions/v1",FEEDBACK_URL:"https://apps.mapbox.com/feedback",TILE_URL_VERSION:"v4",RASTER_URL_PREFIX:"raster/v1",REQUIRE_ACCESS_TOKEN:!0,ACCESS_TOKEN:null,DEFAULT_STYLE:"mapbox://styles/mapbox/standard-beta",MAX_PARALLEL_IMAGE_REQUESTS:16,LOADERS_URL:"https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl-loaders.js"},o={supported:!1,testSupport:function(e){!l&&a&&(c?h(e):s=e);}};let s,a,l=!1,c=!1;function h(e){const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);try{if(e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,a),e.isContextLost())return;o.supported=!0;}catch(e){}e.deleteTexture(t),l=!0;}t.document&&(a=t.document.createElement("img"),a.onload=function(){s&&h(s),s=null,c=!0;},a.onerror=function(){l=!0,s=null;},a.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=");const u="01";function d(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var p=f;function f(e,t,i,r){this.cx=3*e,this.bx=3*(i-e)-this.cx,this.ax=1-this.cx-this.bx,this.cy=3*t,this.by=3*(r-t)-this.cy,this.ay=1-this.cy-this.by,this.p1x=e,this.p1y=t,this.p2x=i,this.p2y=r;}f.prototype={sampleCurveX:function(e){return ((this.ax*e+this.bx)*e+this.cx)*e},sampleCurveY:function(e){return ((this.ay*e+this.by)*e+this.cy)*e},sampleCurveDerivativeX:function(e){return (3*this.ax*e+2*this.bx)*e+this.cx},solveCurveX:function(e,t){if(void 0===t&&(t=1e-6),e<0)return 0;if(e>1)return 1;for(var i=e,r=0;r<8;r++){var n=this.sampleCurveX(i)-e;if(Math.abs(n)<t)return i;var o=this.sampleCurveDerivativeX(i);if(Math.abs(o)<1e-6)break;i-=n/o;}var s=0,a=1;for(i=e,r=0;r<20&&(n=this.sampleCurveX(i),!(Math.abs(n-e)<t));r++)e>n?s=i:a=i,i=.5*(a-s)+s;return i},solve:function(e,t){return this.sampleCurveY(this.solveCurveX(e,t))}};var m=d(p),_=g;function g(e,t){this.x=e,this.y=t;}g.prototype={clone:function(){return new g(this.x,this.y)},add:function(e){return this.clone()._add(e)},sub:function(e){return this.clone()._sub(e)},multByPoint:function(e){return this.clone()._multByPoint(e)},divByPoint:function(e){return this.clone()._divByPoint(e)},mult:function(e){return this.clone()._mult(e)},div:function(e){return this.clone()._div(e)},rotate:function(e){return this.clone()._rotate(e)},rotateAround:function(e,t){return this.clone()._rotateAround(e,t)},matMult:function(e){return this.clone()._matMult(e)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(e){return this.x===e.x&&this.y===e.y},dist:function(e){return Math.sqrt(this.distSqr(e))},distSqr:function(e){var t=e.x-this.x,i=e.y-this.y;return t*t+i*i},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(e){return Math.atan2(this.y-e.y,this.x-e.x)},angleWith:function(e){return this.angleWithSep(e.x,e.y)},angleWithSep:function(e,t){return Math.atan2(this.x*t-this.y*e,this.x*e+this.y*t)},_matMult:function(e){var t=e[2]*this.x+e[3]*this.y;return this.x=e[0]*this.x+e[1]*this.y,this.y=t,this},_add:function(e){return this.x+=e.x,this.y+=e.y,this},_sub:function(e){return this.x-=e.x,this.y-=e.y,this},_mult:function(e){return this.x*=e,this.y*=e,this},_div:function(e){return this.x/=e,this.y/=e,this},_multByPoint:function(e){return this.x*=e.x,this.y*=e.y,this},_divByPoint:function(e){return this.x/=e.x,this.y/=e.y,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var e=this.y;return this.y=this.x,this.x=-e,this},_rotate:function(e){var t=Math.cos(e),i=Math.sin(e),r=i*this.x+t*this.y;return this.x=t*this.x-i*this.y,this.y=r,this},_rotateAround:function(e,t){var i=Math.cos(e),r=Math.sin(e),n=t.y+r*(this.x-t.x)+i*(this.y-t.y);return this.x=t.x+i*(this.x-t.x)-r*(this.y-t.y),this.y=n,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},g.convert=function(e){return e instanceof g?e:Array.isArray(e)?new g(e[0],e[1]):e};var y=d(_);function x(e,t){if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return !1;for(let i=0;i<e.length;i++)if(!x(e[i],t[i]))return !1;return !0}if("object"==typeof e&&null!==e&&null!==t){if("object"!=typeof t)return !1;if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const i in e)if(!x(e[i],t[i]))return !1;return !0}return e===t}const v=Math.PI/180,b=180/Math.PI;function w(e){return e*v}function T(e){return e*b}const E=[[0,0],[1,0],[1,1],[0,1]];function M(e){if(e<=0)return 0;if(e>=1)return 1;const t=e*e,i=t*e;return 4*(e<.5?i:3*(e-t)+i-.75)}function A(e){let t=1/0,i=1/0,r=-1/0,n=-1/0;for(const o of e)t=Math.min(t,o.x),i=Math.min(i,o.y),r=Math.max(r,o.x),n=Math.max(n,o.y);return {min:new y(t,i),max:new y(r,n)}}function S(e,t,i=0,r=!0){const n=new y(i,i),o=e.sub(n),s=t.add(n),a=[o,new y(s.x,o.y),s,new y(o.x,s.y)];return r&&a.push(o.clone()),a}function I(e,t,i,r){const n=new m(e,t,i,r);return function(e){return n.solve(e)}}const C=I(.25,.1,.25,1);function z(e,t,i){return Math.min(i,Math.max(t,e))}function P(e,t,i){return (i=z((i-e)/(t-e),0,1))*i*(3-2*i)}function D(e,t,i){const r=i-t,n=((e-t)%r+r)%r+t;return n===t?i:n}function R(e,t,i){if(!e.length)return i(null,[]);let r=e.length;const n=new Array(e.length);let o=null;e.forEach(((e,s)=>{t(e,((e,t)=>{e&&(o=e),n[s]=t,0==--r&&i(o,n);}));}));}function L(e){const t=[];for(const i in e)t.push(e[i]);return t}function k(e,...t){for(const i of t)for(const t in i)e[t]=i[t];return e}function B(e,t){const i={};for(let r=0;r<t.length;r++){const n=t[r];n in e&&(i[n]=e[n]);}return i}let O=1;function F(){return O++}function N(){return function e(t){return t?(t^Math.random()*(16>>t/4)).toString(16):([1e7]+-[1e3]+-4e3+-8e3+-1e11).replace(/[018]/g,e)}()}function U(e){return e<=1?1:Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function j(e){return !!e&&/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}function V(e,t){e.forEach((e=>{t[e]&&(t[e]=t[e].bind(t));}));}function G(e,t){return -1!==e.indexOf(t,e.length-t.length)}function q(e,t,i){const r={};for(const n in e)r[n]=t.call(i||this,e[n],n,e);return r}function $(e,t,i){const r={};for(const n in e)t.call(i||this,e[n],n,e)&&(r[n]=e[n]);return r}function Z(e){return Array.isArray(e)?e.map(Z):"object"==typeof e&&e?q(e,Z):e}const W={};function H(e){W[e]||("undefined"!=typeof console&&console.warn(e),W[e]=!0);}function X(e,t,i){return (i.y-e.y)*(t.x-e.x)>(t.y-e.y)*(i.x-e.x)}function Y(e){let t=0;for(let i,r,n=0,o=e.length,s=o-1;n<o;s=n++)i=e[n],r=e[s],t+=(r.x-i.x)*(i.y+r.y);return t}function K([e,t,i]){const r=w(t+90),n=w(i);return {x:e*Math.cos(r)*Math.sin(n),y:e*Math.sin(r)*Math.sin(n),z:e*Math.cos(n),azimuthal:t,polar:i}}function J(e,t,i){const r=Math.sqrt(e*e+t*t+i*i),n=r>0?Math.acos(i/r)*b:0;let o=0!==e||0!==t?Math.atan2(-t,-e)*b+90:0;return o<0&&(o+=360),[r,o,n]}function Q(){return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function ee(e){const t={};if(e.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g,((e,i,r,n)=>{const o=r||n;return t[i]=!o||o.toLowerCase(),""})),t["max-age"]){const e=parseInt(t["max-age"],10);isNaN(e)?delete t["max-age"]:t["max-age"]=e;}return t}let te=null;function ie(e){if(null==te){const t=e.navigator?e.navigator.userAgent:null;te=!!e.safari||!(!t||!(/\b(iPad|iPhone|iPod)\b/.test(t)||t.match("Safari")&&!t.match("Chrome")));}return te}function re(){return !!t.document.fullscreenElement||!!t.document.webkitFullscreenElement}function ne(e){try{const i=t[e];return i.setItem("_mapbox_test_",1),i.removeItem("_mapbox_test_"),!0}catch(e){return !1}}function oe(e,t){return [e[4*t],e[4*t+1],e[4*t+2],e[4*t+3]]}function se(e,t,i){e[4*t+0]=i[0],e[4*t+1]=i[1],e[4*t+2]=i[2],e[4*t+3]=i[3];}function ae(e,t){return [Math.pow(e[0],2.2)*t,Math.pow(e[1],2.2)*t,Math.pow(e[2],2.2)*t]}function le(e){return [Math.pow(e[0],1/2.2),Math.pow(e[1],1/2.2),Math.pow(e[2],1/2.2)]}const ce="mapbox-tiles";let he=500,ue=50;let de,pe;function fe(){try{return t.caches}catch(e){}}function me(){fe()&&!de&&(de=t.caches.open(ce));}function _e(e){const t=e.indexOf("?");if(t<0)return e;const i=function(e){const t=e.indexOf("?");return t>0?e.slice(t+1).split("&"):[]}(e),r=i.filter((e=>{const t=e.split("=");return "language"===t[0]||"worldview"===t[0]}));return r.length?`${e.slice(0,t)}?${r.join("&")}`:e.slice(0,t)}let ge=1/0;function ye(e){ge++,ge>ue&&(e.getActor().send("enforceCacheSizeLimit",he),ge=0);}const xe={Unknown:"Unknown",Style:"Style",Source:"Source",Tile:"Tile",Glyphs:"Glyphs",SpriteImage:"SpriteImage",SpriteJSON:"SpriteJSON",Image:"Image"};"function"==typeof Object.freeze&&Object.freeze(xe);class ve extends Error{constructor(e,t,i){401===t&&Re(i)&&(e+=": you may have provided an invalid Mapbox access token. See https://docs.mapbox.com/api/overview/#access-tokens-and-token-scopes"),super(e),this.status=t,this.url=i;}toString(){return `${this.name}: ${this.message} (${this.status}): ${this.url}`}}const be=Q()?()=>self.worker&&self.worker.referrer:()=>("blob:"===t.location.protocol?t.parent:t).location.href;const we=function(e,i){if(!(/^file:/.test(r=e.url)||/^file:/.test(be())&&!/^\w+:/.test(r))){if(t.fetch&&t.Request&&t.AbortController&&t.Request.prototype.hasOwnProperty("signal"))return function(e,i){const r=new t.AbortController,n=new t.Request(e.url,{method:e.method||"GET",body:e.body,credentials:e.credentials,headers:e.headers,referrer:be(),referrerPolicy:e.referrerPolicy,signal:r.signal});let o=!1,s=!1;const a=(l=n.url).indexOf("sku=")>0&&Re(l);var l;"json"===e.type&&n.headers.set("Accept","application/json");const c=(r,o,l)=>{if(s)return;if(r&&"SecurityError"!==r.message&&H(r.toString()),o&&l)return h(o);const c=Date.now();t.fetch(n).then((t=>{if(t.ok){const e=a?t.clone():null;return h(t,e,c)}return i(new ve(t.statusText,t.status,e.url))})).catch((t=>{"AbortError"!==t.name&&i(new Error(`${t.message} ${e.url}`));}));},h=(r,a,l)=>{("arrayBuffer"===e.type?r.arrayBuffer():"json"===e.type?r.json():r.text()).then((e=>{s||(a&&l&&function(e,i,r){if(me(),!de)return;const n={status:i.status,statusText:i.statusText,headers:new t.Headers};i.headers.forEach(((e,t)=>n.headers.set(t,e)));const o=ee(i.headers.get("Cache-Control")||"");if(o["no-store"])return;o["max-age"]&&n.headers.set("Expires",new Date(r+1e3*o["max-age"]).toUTCString());const s=n.headers.get("Expires");s&&(new Date(s).getTime()-r<42e4||function(e,t){if(void 0===pe)try{new Response(new ReadableStream),pe=!0;}catch(e){pe=!1;}pe?t(e.body):e.blob().then(t);}(i,(i=>{const r=new t.Response(i,n);me(),de&&de.then((t=>t.put(_e(e.url),r))).catch((e=>H(e.message)));})));}(n,a,l),o=!0,i(null,e,r.headers.get("Cache-Control"),r.headers.get("Expires")));})).catch((e=>{s||i(new Error(e.message));}));};return a?function(e,t){if(me(),!de)return t(null);const i=_e(e.url);de.then((e=>{e.match(i).then((r=>{const n=function(e){if(!e)return !1;const t=new Date(e.headers.get("Expires")||0),i=ee(e.headers.get("Cache-Control")||"");return t>Date.now()&&!i["no-cache"]}(r);e.delete(i),n&&e.put(i,r.clone()),t(null,r,n);})).catch(t);})).catch(t);}(n,c):c(null,null),{cancel:()=>{s=!0,o||r.abort();}}}(e,i);if(Q()&&self.worker&&self.worker.actor)return self.worker.actor.send("getResource",e,i,void 0,!0)}var r;return function(e,i){const r=new t.XMLHttpRequest;r.open(e.method||"GET",e.url,!0),"arrayBuffer"===e.type&&(r.responseType="arraybuffer");for(const t in e.headers)r.setRequestHeader(t,e.headers[t]);return "json"===e.type&&(r.responseType="text",r.setRequestHeader("Accept","application/json")),r.withCredentials="include"===e.credentials,r.onerror=()=>{i(new Error(r.statusText));},r.onload=()=>{if((r.status>=200&&r.status<300||0===r.status)&&null!==r.response){let t=r.response;if("json"===e.type)try{t=JSON.parse(r.response);}catch(e){return i(e)}i(null,t,r.getResponseHeader("Cache-Control"),r.getResponseHeader("Expires"));}else i(new ve(r.statusText,r.status,e.url));},r.send(e.body),{cancel:()=>r.abort()}}(e,i)},Te=function(e,t){return we(k(e,{type:"json"}),t)},Ee=function(e,t){return we(k(e,{type:"arrayBuffer"}),t)};function Me(e){const i=t.document.createElement("a");return i.href=e,i.protocol===t.document.location.protocol&&i.host===t.document.location.host}const Ae="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";let Se,Ie;Se=[],Ie=0;const Ce=function(e,i){if(o.supported&&(e.headers||(e.headers={}),e.headers.accept="image/webp,*/*"),Ie>=n.MAX_PARALLEL_IMAGE_REQUESTS){const t={requestParameters:e,callback:i,cancelled:!1,cancel(){this.cancelled=!0;}};return Se.push(t),t}Ie++;let r=!1;const s=()=>{if(!r)for(r=!0,Ie--;Se.length&&Ie<n.MAX_PARALLEL_IMAGE_REQUESTS;){const e=Se.shift(),{requestParameters:t,callback:i,cancelled:r}=e;r||(e.cancel=Ce(t,i).cancel);}},a=Ee(e,((e,r,n,o)=>{s(),e?i(e):r&&(t.createImageBitmap?function(e,i){const r=new t.Blob([new Uint8Array(e)],{type:"image/png"});t.createImageBitmap(r).then((e=>{i(null,e);})).catch((e=>{i(new Error(`Could not load image because of ${e.message}. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported.`));}));}(r,((e,t)=>i(e,t,n,o))):function(e,i){const r=new t.Image,n=t.URL;r.onload=()=>{i(null,r),n.revokeObjectURL(r.src),r.onload=null,t.requestAnimationFrame((()=>{r.src=Ae;}));},r.onerror=()=>i(new Error("Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."));const o=new t.Blob([new Uint8Array(e)],{type:"image/png"});r.src=e.byteLength?n.createObjectURL(o):Ae;}(r,((e,t)=>i(e,t,n,o))));}));return {cancel:()=>{a.cancel(),s();}}},ze="NO_ACCESS_TOKEN";class Pe{constructor(e,t,i){this._transformRequestFn=e,this._customAccessToken=t,this._silenceAuthErrors=!!i,this._createSkuToken();}_createSkuToken(){const e=function(){let e="";for(let t=0;t<10;t++)e+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(62*Math.random())];return {token:["1",u,e].join(""),tokenExpiresAt:Date.now()+432e5}}();this._skuToken=e.token,this._skuTokenExpiresAt=e.tokenExpiresAt;}_isSkuTokenExpired(){return Date.now()>this._skuTokenExpiresAt}transformRequest(e,t){return this._transformRequestFn&&this._transformRequestFn(e,t)||{url:e}}normalizeStyleURL(e,t){if(!De(e))return e;const i=Fe(e);return i.path=`/styles/v1${i.path}`,this._makeAPIURL(i,this._customAccessToken||t)}normalizeGlyphsURL(e,t){if(!De(e))return e;const i=Fe(e);return i.path=`/fonts/v1${i.path}`,this._makeAPIURL(i,this._customAccessToken||t)}normalizeModelURL(e,t){if(!De(e))return e;const i=Fe(e);return i.path=`/models/v1${i.path}`,this._makeAPIURL(i,this._customAccessToken||t)}normalizeSourceURL(e,t,i,r){if(!De(e))return e;const n=Fe(e);return n.path=`/v4/${n.authority}.json`,n.params.push("secure"),i&&n.params.push(`language=${i}`),r&&n.params.push(`worldview=${r}`),this._makeAPIURL(n,this._customAccessToken||t)}normalizeSpriteURL(e,t,i,r){const n=Fe(e);return De(e)?(n.path=`/styles/v1${n.path}/sprite${t}${i}`,this._makeAPIURL(n,this._customAccessToken||r)):(n.path+=`${t}${i}`,Ne(n))}normalizeTileURL(e,t,i){if(this._isSkuTokenExpired()&&this._createSkuToken(),e&&!De(e))return e;const r=Fe(e);r.path=r.path.replace(/(\.(png|jpg)\d*)(?=$)/,`${t||i&&"raster"!==r.authority&&512===i?"@2x":""}${o.supported?".webp":"$1"}`),"raster"===r.authority?r.path=`/${n.RASTER_URL_PREFIX}${r.path}`:(r.path=r.path.replace(/^.+\/v4\//,"/"),r.path=`/${n.TILE_URL_VERSION}${r.path}`);const s=this._customAccessToken||function(e){for(const t of e){const e=t.match(/^access_token=(.*)$/);if(e)return e[1]}return null}(r.params)||n.ACCESS_TOKEN;return n.REQUIRE_ACCESS_TOKEN&&s&&this._skuToken&&r.params.push(`sku=${this._skuToken}`),this._makeAPIURL(r,s)}canonicalizeTileURL(e,t){const i=Fe(e);if(!i.path.match(/^(\/v4\/|\/raster\/v1\/)/)||!i.path.match(/\.[\w]+$/))return e;let r="mapbox://";i.path.match(/^\/raster\/v1\//)?r+=`raster/${i.path.replace(`/${n.RASTER_URL_PREFIX}/`,"")}`:r+=`tiles/${i.path.replace(`/${n.TILE_URL_VERSION}/`,"")}`;let o=i.params;return t&&(o=o.filter((e=>!e.match(/^access_token=/)))),o.length&&(r+=`?${o.join("&")}`),r}canonicalizeTileset(e,t){const i=!!t&&De(t),r=[];for(const t of e.tiles||[])Re(t)?r.push(this.canonicalizeTileURL(t,i)):r.push(t);return r}_makeAPIURL(e,t){const i="See https://docs.mapbox.com/api/overview/#access-tokens-and-token-scopes",r=Fe(n.API_URL);if(e.protocol=r.protocol,e.authority=r.authority,"http"===e.protocol){const t=e.params.indexOf("secure");t>=0&&e.params.splice(t,1);}if("/"!==r.path&&(e.path=`${r.path}${e.path}`),!n.REQUIRE_ACCESS_TOKEN)return Ne(e);if(t=t||n.ACCESS_TOKEN,!this._silenceAuthErrors){if(!t)throw new Error(`An API access token is required to use Mapbox GL. ${i}`);if("s"===t[0])throw new Error(`Use a public access token (pk.*) with Mapbox GL, not a secret access token (sk.*). ${i}`)}return e.params=e.params.filter((e=>-1===e.indexOf("access_token"))),e.params.push(`access_token=${t||""}`),Ne(e)}}function De(e){return 0===e.indexOf("mapbox:")}function Re(e){return n.API_URL_REGEX.test(e)}function Le(e){return n.API_CDN_URL_REGEX.test(e)}function ke(e){return n.API_STYLE_REGEX.test(e)&&!Be(e)}function Be(e){return n.API_SPRITE_REGEX.test(e)}const Oe=/^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;function Fe(e){const t=e.match(Oe);if(!t)throw new Error("Unable to parse URL object");return {protocol:t[1],authority:t[2],path:t[3]||"/",params:t[4]?t[4].split("&"):[]}}function Ne(e){const t=e.params.length?`?${e.params.join("&")}`:"";return `${e.protocol}://${e.authority}${e.path}${t}`}const Ue="mapbox.eventData";function je(e){if(!e)return null;const i=e.split(".");if(!i||3!==i.length)return null;try{return JSON.parse(decodeURIComponent(t.atob(i[1]).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join("")))}catch(e){return null}}class Ve{constructor(e){this.type=e,this.anonId=null,this.eventData={},this.queue=[],this.pendingRequest=null;}getStorageKey(e){const i=je(n.ACCESS_TOKEN);let r="";return r=i&&i.u?t.btoa(encodeURIComponent(i.u).replace(/%([0-9A-F]{2})/g,((e,t)=>String.fromCharCode(Number("0x"+t))))):n.ACCESS_TOKEN||"",e?`${Ue}.${e}:${r}`:`${Ue}:${r}`}fetchEventData(){const e=ne("localStorage"),i=this.getStorageKey(),r=this.getStorageKey("uuid");if(e)try{const e=t.localStorage.getItem(i);e&&(this.eventData=JSON.parse(e));const n=t.localStorage.getItem(r);n&&(this.anonId=n);}catch(e){H("Unable to read from LocalStorage");}}saveEventData(){const e=ne("localStorage"),i=this.getStorageKey(),r=this.getStorageKey("uuid");if(e)try{t.localStorage.setItem(r,this.anonId),Object.keys(this.eventData).length>=1&&t.localStorage.setItem(i,JSON.stringify(this.eventData));}catch(e){H("Unable to write to LocalStorage");}}processRequests(e){}postEvent(e,t,i,r){if(!n.EVENTS_URL)return;const o=Fe(n.EVENTS_URL);o.params.push(`access_token=${r||n.ACCESS_TOKEN||""}`);const s={event:this.type,created:new Date(e).toISOString()},a=t?k(s,t):s,l={url:Ne(o),headers:{"Content-Type":"text/plain"},body:JSON.stringify([a])};this.pendingRequest=function(e,t){return we(k(e,{method:"POST"}),t)}(l,(e=>{this.pendingRequest=null,i(e),this.saveEventData(),this.processRequests(r);}));}queueRequest(e,t){this.queue.push(e),this.processRequests(t);}}const Ge=new class extends Ve{constructor(e){super("appUserTurnstile"),this._customAccessToken=e;}postTurnstileEvent(e,t){n.EVENTS_URL&&n.ACCESS_TOKEN&&Array.isArray(e)&&e.some((e=>De(e)||Re(e)))&&this.queueRequest(Date.now(),t);}processRequests(e){if(this.pendingRequest||0===this.queue.length)return;this.anonId&&this.eventData.lastSuccess&&this.eventData.tokenU||this.fetchEventData();const t=je(n.ACCESS_TOKEN),r=t?t.u:n.ACCESS_TOKEN;let o=r!==this.eventData.tokenU;j(this.anonId)||(this.anonId=N(),o=!0);const s=this.queue.shift();if(this.eventData.lastSuccess){const e=new Date(this.eventData.lastSuccess),t=new Date(s),i=(s-this.eventData.lastSuccess)/864e5;o=o||i>=1||i<-1||e.getDate()!==t.getDate();}else o=!0;o?this.postEvent(s,{sdkIdentifier:"mapbox-gl-js",sdkVersion:i,skuId:u,"enabled.telemetry":!1,userId:this.anonId},(e=>{e||(this.eventData.lastSuccess=s,this.eventData.tokenU=r);}),e):this.processRequests();}},qe=Ge.postTurnstileEvent.bind(Ge),$e=new class extends Ve{constructor(){super("map.load"),this.success={},this.skuToken="";}postMapLoadEvent(e,t,i,r){this.skuToken=t,this.errorCb=r,n.EVENTS_URL&&(i||n.ACCESS_TOKEN?this.queueRequest({id:e,timestamp:Date.now()},i):this.errorCb(new Error(ze)));}processRequests(e){if(this.pendingRequest||0===this.queue.length)return;const{id:t,timestamp:r}=this.queue.shift();t&&this.success[t]||(this.anonId||this.fetchEventData(),j(this.anonId)||(this.anonId=N()),this.postEvent(r,{sdkIdentifier:"mapbox-gl-js",sdkVersion:i,skuId:u,skuToken:this.skuToken,userId:this.anonId},(e=>{e?this.errorCb(e):t&&(this.success[t]=!0);}),e));}},Ze=$e.postMapLoadEvent.bind($e),We=new class extends Ve{constructor(){super("gljs.performance");}postPerformanceEvent(e,t){n.EVENTS_URL&&(e||n.ACCESS_TOKEN)&&this.queueRequest({timestamp:Date.now(),performanceData:t},e);}processRequests(e){if(this.pendingRequest||0===this.queue.length)return;const{timestamp:r,performanceData:n}=this.queue.shift(),o=function(e){const r=t.performance.getEntriesByType("resource"),n=t.performance.getEntriesByType("mark"),o=function(e){const t={};if(e)for(const i in e)if("other"!==i)for(const r of e[i]){const e=`${i}ResolveRangeMin`,n=`${i}ResolveRangeMax`,o=`${i}RequestCount`,s=`${i}RequestCachedCount`;t[e]=Math.min(t[e]||1/0,r.startTime),t[n]=Math.max(t[n]||-1/0,r.responseEnd);const a=e=>{void 0===t[e]&&(t[e]=0),++t[e];};void 0!==r.transferSize&&0===r.transferSize&&a(s),a(o);}return t}(function(e,t){const i={};if(e)for(const r of e){const e=t(r);void 0===i[e]&&(i[e]=[]),i[e].push(r);}return i}(r,tt)),s=t.devicePixelRatio,a=t.navigator.connection||t.navigator.mozConnection||t.navigator.webkitConnection,l={counters:[],metadata:[],attributes:[]},c=(e,t,i)=>{null!=i&&e.push({name:t,value:i.toString()});};for(const e in o)c(l.counters,e,o[e]);if(e.interactionRange[0]!==1/0&&e.interactionRange[1]!==-1/0&&(c(l.counters,"interactionRangeMin",e.interactionRange[0]),c(l.counters,"interactionRangeMax",e.interactionRange[1])),n)for(const e of Object.keys(Qe)){const t=Qe[e],i=n.find((e=>e.name===t));i&&c(l.counters,t,i.startTime);}return c(l.counters,"visibilityHidden",e.visibilityHidden),c(l.attributes,"style",function(e){if(e)for(const t of e){const e=t.name.split("?")[0];if(ke(e)){const t=e.split("/").slice(-2);if(2===t.length)return `mapbox://styles/${t[0]}/${t[1]}`}}}(r)),c(l.attributes,"terrainEnabled",e.terrainEnabled?"true":"false"),c(l.attributes,"fogEnabled",e.fogEnabled?"true":"false"),c(l.attributes,"projection",e.projection),c(l.attributes,"zoom",e.zoom),c(l.metadata,"devicePixelRatio",s),c(l.metadata,"connectionEffectiveType",a?a.effectiveType:void 0),c(l.metadata,"navigatorUserAgent",t.navigator.userAgent),c(l.metadata,"screenWidth",t.screen.width),c(l.metadata,"screenHeight",t.screen.height),c(l.metadata,"windowWidth",t.innerWidth),c(l.metadata,"windowHeight",t.innerHeight),c(l.metadata,"mapWidth",e.width/s),c(l.metadata,"mapHeight",e.height/s),c(l.metadata,"webglRenderer",e.renderer),c(l.metadata,"webglVendor",e.vendor),c(l.metadata,"sdkVersion",i),c(l.metadata,"sdkIdentifier","mapbox-gl-js"),l}(n);for(const e of o.metadata);for(const e of o.counters);for(const e of o.attributes);this.postEvent(r,o,(()=>{}),e);}},He=We.postPerformanceEvent.bind(We),Xe=new class extends Ve{constructor(){super("map.auth"),this.success={},this.skuToken="";}getSession(e,t,i,r){if(!n.API_URL||!n.SESSION_PATH)return;const o=Fe(n.API_URL+n.SESSION_PATH);o.params.push(`sku=${t||""}`),o.params.push(`access_token=${r||n.ACCESS_TOKEN||""}`);const s={url:Ne(o),headers:{"Content-Type":"text/plain"}};this.pendingRequest=function(e,t){return we(k(e,{method:"GET"}),t)}(s,(e=>{this.pendingRequest=null,i(e),this.saveEventData(),this.processRequests(r);}));}getSessionAPI(e,t,i,r){this.skuToken=t,this.errorCb=r,n.SESSION_PATH&&n.API_URL&&(i||n.ACCESS_TOKEN?this.queueRequest({id:e,timestamp:Date.now()},i):this.errorCb(new Error(ze)));}processRequests(e){if(this.pendingRequest||0===this.queue.length)return;const{id:t,timestamp:i}=this.queue.shift();t&&this.success[t]||this.getSession(i,this.skuToken,(e=>{e?this.errorCb(e):t&&(this.success[t]=!0);}),e);}},Ye=Xe.getSessionAPI.bind(Xe),Ke=new Set;function Je(e,t){t?Ke.add(e):Ke.delete(e);}const Qe={create:"create",load:"load",fullLoad:"fullLoad"},et={mark(e){t.performance.mark(e);},measure(e,i,r){t.performance.measure(e,i,r);}};function tt(e){const t=e.name.split("?")[0];return Le(t)&&t.includes("mapbox-gl.js")?"javascript":Le(t)&&t.includes("mapbox-gl.css")?"css":function(e){return n.API_FONTS_REGEX.test(e)}(t)?"fontRange":Be(t)?"sprite":ke(t)?"style":function(e){return n.API_TILEJSON_REGEX.test(e)}(t)?"tilejson":"other"}const it=t.performance;function rt(e){const t=e?e.url.toString():void 0;return it.getEntriesByName(t)}var nt=ot;function ot(e){return !function(e){return "undefined"==typeof window||"undefined"==typeof document?"not a browser":Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray?Function.prototype&&Function.prototype.bind?Object.keys&&Object.create&&Object.getPrototypeOf&&Object.getOwnPropertyNames&&Object.isSealed&&Object.isFrozen&&Object.isExtensible&&Object.getOwnPropertyDescriptor&&Object.defineProperty&&Object.defineProperties&&Object.seal&&Object.freeze&&Object.preventExtensions?"JSON"in window&&"parse"in JSON&&"stringify"in JSON?function(){if(!("Worker"in window&&"Blob"in window&&"URL"in window))return !1;var e,t,i=new Blob([""],{type:"text/javascript"}),r=URL.createObjectURL(i);try{t=new Worker(r),e=!0;}catch(t){e=!1;}return t&&t.terminate(),URL.revokeObjectURL(r),e}()?"Uint8ClampedArray"in window?ArrayBuffer.isView?function(){var e=document.createElement("canvas");e.width=e.height=1;var t=e.getContext("2d");if(!t)return !1;var i=t.getImageData(0,0,1,1);return i&&i.width===e.width}()?(void 0===st[t=e&&e.failIfMajorPerformanceCaveat]&&(st[t]=function(e){var t,i=function(e){var t=document.createElement("canvas"),i=Object.create(ot.webGLContextAttributes);return i.failIfMajorPerformanceCaveat=e,t.getContext("webgl",i)||t.getContext("experimental-webgl",i)}(e);if(!i)return !1;try{t=i.createShader(i.VERTEX_SHADER);}catch(e){return !1}return !(!t||i.isContextLost())&&(i.shaderSource(t,"void main() {}"),i.compileShader(t),!0===i.getShaderParameter(t,i.COMPILE_STATUS))}(t)),st[t]?document.documentMode?"insufficient ECMAScript 6 support":void 0:"insufficient WebGL support"):"insufficient Canvas/getImageData support":"insufficient ArrayBuffer support":"insufficient Uint8ClampedArray support":"insufficient worker support":"insufficient JSON support":"insufficient Object support":"insufficient Function support":"insufficent Array support";var t;}(e)}var st={};let at,lt,ct,ht;ot.webGLContextAttributes={antialias:!1,alpha:!0,stencil:!0,depth:!0};const ut={now:()=>void 0!==ct?ct:t.performance.now(),setNow(e){ct=e;},restoreNow(){ct=void 0;},frame(e){const i=t.requestAnimationFrame(e);return {cancel:()=>t.cancelAnimationFrame(i)}},getImageData(e,i=0){const{width:r,height:n}=e;ht||(ht=t.document.createElement("canvas"));const o=ht.getContext("2d",{willReadFrequently:!0});if(!o)throw new Error("failed to create canvas 2d context");return (r>ht.width||n>ht.height)&&(ht.width=r,ht.height=n),o.clearRect(-i,-i,r+2*i,n+2*i),o.drawImage(e,0,0,r,n),o.getImageData(-i,-i,r+2*i,n+2*i)},resolveURL:e=>(at||(at=t.document.createElement("a")),at.href=e,at.href),get devicePixelRatio(){return t.devicePixelRatio},get prefersReducedMotion(){return !!t.matchMedia&&(null==lt&&(lt=t.matchMedia("(prefers-reduced-motion: reduce)")),lt.matches)}};function dt(e,i,r){const n=t.document.createElement(e);return void 0!==i&&(n.className=i),r&&r.appendChild(n),n}function pt(e,i,r){const n=t.document.createElementNS("http://www.w3.org/2000/svg",e);for(const e of Object.keys(i))n.setAttributeNS(null,e,i[e]);return r&&r.appendChild(n),n}const ft=t.document&&t.document.documentElement.style,mt=ft&&void 0!==ft.userSelect?"userSelect":"WebkitUserSelect";let _t;function gt(){ft&&mt&&(_t=ft[mt],ft[mt]="none");}function yt(){ft&&mt&&(ft[mt]=_t);}function xt(e){e.preventDefault(),e.stopPropagation(),t.removeEventListener("click",xt,!0);}function vt(){t.addEventListener("click",xt,!0),t.setTimeout((()=>{t.removeEventListener("click",xt,!0);}),0);}function bt(e,t){const i=e.getBoundingClientRect();return Et(e,i,t)}function wt(e,t){const i=e.getBoundingClientRect(),r=[];for(let n=0;n<t.length;n++)r.push(Et(e,i,t[n]));return r}function Tt(e){return void 0!==t.InstallTrigger&&2===e.button&&e.ctrlKey&&t.navigator.platform.toUpperCase().indexOf("MAC")>=0?0:e.button}function Et(e,t,i){const r=e.offsetWidth===t.width?1:e.offsetWidth/t.width;return new y((i.clientX-t.left)*r,(i.clientY-t.top)*r)}function Mt(e,t,i){i[e]&&-1!==i[e].indexOf(t)||(i[e]=i[e]||[],i[e].push(t));}function At(e,t,i){if(i&&i[e]){const r=i[e].indexOf(t);-1!==r&&i[e].splice(r,1);}}class St{constructor(e,t={}){k(this,t),this.type=e;}}class It extends St{constructor(e,t={}){super("error",k({error:e},t));}}class Ct{on(e,t){return this._listeners=this._listeners||{},Mt(e,t,this._listeners),this}off(e,t){return At(e,t,this._listeners),At(e,t,this._oneTimeListeners),this}once(e,t){return t?(this._oneTimeListeners=this._oneTimeListeners||{},Mt(e,t,this._oneTimeListeners),this):new Promise((t=>this.once(e,t)))}fire(e,t){"string"==typeof e&&(e=new St(e,t||{}));const i=e.type;if(this.listens(i)){e.target=this;const t=this._listeners&&this._listeners[i]?this._listeners[i].slice():[];for(const i of t)i.call(this,e);const r=this._oneTimeListeners&&this._oneTimeListeners[i]?this._oneTimeListeners[i].slice():[];for(const t of r)At(i,t,this._oneTimeListeners),t.call(this,e);const n=this._eventedParent;n&&(k(e,"function"==typeof this._eventedParentData?this._eventedParentData():this._eventedParentData),n.fire(e));}else e instanceof It&&console.error(e.error);return this}listens(e){return !!(this._listeners&&this._listeners[e]&&this._listeners[e].length>0||this._oneTimeListeners&&this._oneTimeListeners[e]&&this._oneTimeListeners[e].length>0||this._eventedParent&&this._eventedParent.listens(e))}setEventedParent(e,t){return this._eventedParent=e,this._eventedParentData=t,this}}var zt=JSON.parse('{"$version":8,"$root":{"version":{"required":true,"type":"enum","values":[8]},"fragment":{"type":"boolean"},"name":{"type":"string"},"metadata":{"type":"*"},"center":{"type":"array","value":"number"},"zoom":{"type":"number"},"bearing":{"type":"number","default":0,"period":360,"units":"degrees"},"pitch":{"type":"number","default":0,"units":"degrees"},"light":{"type":"light"},"lights":{"required":false,"type":"array","value":"light-3d"},"terrain":{"type":"terrain"},"fog":{"type":"fog"},"camera":{"type":"camera"},"imports":{"type":"array","value":"import"},"schema":{"type":"schema"},"sources":{"required":true,"type":"sources"},"sprite":{"type":"string"},"glyphs":{"type":"string"},"transition":{"type":"transition"},"projection":{"type":"projection"},"layers":{"required":true,"type":"array","value":"layer"},"models":{"type":"models"}},"model":{"type":"string","required":true},"import":{"id":{"type":"string","required":true},"url":{"type":"string","required":true},"config":{"type":"config"},"data":{"type":"$root"}},"config":{"*":{"type":"*"}},"schema":{"*":{"type":"option"}},"option":{"default":{"type":"*","required":true},"type":{"type":"enum","values":{"string":{},"number":{},"boolean":{},"color":{}}},"array":{"type":"boolean"},"minValue":{"type":"number"},"maxValue":{"type":"number"},"stepValue":{"type":"number"},"values":{"type":"array","value":"*"},"metadata":{"type":"*"}},"models":{"*":{"type":"model"}},"light-3d":{"id":{"type":"string","required":true},"properties":{"type":"properties"},"type":{"type":"enum","values":{"ambient":{},"directional":{},"flat":{}}}},"properties":["properties_light_directional","properties_light_ambient","properties_light_flat"],"properties_light_directional":{"direction":{"type":"array","default":[210,30],"length":2,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"cast-shadows":{"type":"boolean","default":false,"transition":false,"expression":{"interpolated":false},"property-type":"data-constant"},"shadow-intensity":{"type":"number","property-type":"data-constant","default":1,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"properties_light_ambient":{"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"properties_light_flat":{"anchor":{"type":"enum","default":"viewport","values":{"map":{},"viewport":{}},"property-type":"data-constant","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]}},"position":{"type":"array","default":[1.15,210,30],"length":3,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"sources":{"*":{"type":"source"}},"source":["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image","source_model"],"source_vector":{"type":{"required":true,"type":"enum","values":{"vector":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"attribution":{"type":"string"},"promoteId":{"type":"promoteId"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_raster":{"type":{"required":true,"type":"enum","values":{"raster":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"attribution":{"type":"string"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_raster_dem":{"type":{"required":true,"type":"enum","values":{"raster-dem":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"attribution":{"type":"string"},"encoding":{"type":"enum","values":{"terrarium":{},"mapbox":{}},"default":"mapbox"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_geojson":{"type":{"required":true,"type":"enum","values":{"geojson":{}}},"data":{"type":"*"},"maxzoom":{"type":"number","default":18},"attribution":{"type":"string"},"buffer":{"type":"number","default":128,"maximum":512,"minimum":0},"filter":{"type":"*"},"tolerance":{"type":"number","default":0.375},"cluster":{"type":"boolean","default":false},"clusterRadius":{"type":"number","default":50,"minimum":0},"clusterMaxZoom":{"type":"number"},"clusterMinPoints":{"type":"number"},"clusterProperties":{"type":"*"},"lineMetrics":{"type":"boolean","default":false},"generateId":{"type":"boolean","default":false},"promoteId":{"type":"promoteId"}},"source_video":{"type":{"required":true,"type":"enum","values":{"video":{}}},"urls":{"required":true,"type":"array","value":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}},"source_image":{"type":{"required":true,"type":"enum","values":{"image":{}}},"url":{"required":true,"type":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}},"source_model":{"type":{"required":true,"type":"enum","values":{"model":{},"batched-model":{}}},"maxzoom":{"type":"number","default":18},"minzoom":{"type":"number","default":0},"tiles":{"type":"array","value":"string"}},"layer":{"id":{"type":"string","required":true},"type":{"type":"enum","values":{"fill":{},"line":{},"symbol":{},"circle":{},"heatmap":{},"fill-extrusion":{},"raster":{},"hillshade":{},"model":{},"background":{},"sky":{},"slot":{}},"required":true},"metadata":{"type":"*"},"source":{"type":"string"},"source-layer":{"type":"string"},"slot":{"type":"string"},"minzoom":{"type":"number","minimum":0,"maximum":24},"maxzoom":{"type":"number","minimum":0,"maximum":24},"filter":{"type":"filter"},"layout":{"type":"layout"},"paint":{"type":"paint"}},"layout":["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background","layout_sky","layout_model"],"layout_background":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_sky":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_model":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"},"model-id":{"type":"string","property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]},"transition":false,"requires":[{"source":["geojson","vector"]}]}},"layout_fill":{"fill-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_circle":{"circle-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_heatmap":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_fill-extrusion":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"},"fill-extrusion-edge-radius":{"type":"number","private":true,"default":0,"minimum":0,"maximum":1,"expression":{"interpolated":false},"property-type":"constant"}},"layout_line":{"line-cap":{"type":"enum","values":{"butt":{},"round":{},"square":{}},"default":"butt","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-join":{"type":"enum","values":{"bevel":{},"round":{},"miter":{}},"default":"miter","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{"type":"number","default":2,"requires":[{"line-join":"miter"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-round-limit":{"type":"number","default":1.05,"requires":[{"line-join":"round"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_symbol":{"symbol-placement":{"type":"enum","values":{"point":{},"line":{},"line-center":{}},"default":"point","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-spacing":{"type":"number","default":250,"minimum":1,"units":"pixels","requires":[{"symbol-placement":"line"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{"type":"boolean","default":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{"type":"enum","values":{"auto":{},"viewport-y":{},"source":{}},"default":"auto","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{"type":"boolean","default":false,"requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{"type":"boolean","default":false,"requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-optional":{"type":"boolean","default":false,"requires":["icon-image","text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-size":{"type":"number","default":1,"minimum":0,"units":"factor of the original icon size","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{"type":"enum","values":{"none":{},"width":{},"height":{},"both":{}},"default":"none","requires":["icon-image","text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit-padding":{"type":"array","value":"number","length":4,"default":[0,0,0,0],"units":"pixels","requires":["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-image":{"type":"resolvedImage","tokens":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{"type":"number","default":0,"period":360,"units":"degrees","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{"type":"boolean","default":false,"requires":["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-offset":{"type":"array","value":"number","length":2,"default":[0,0],"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{"type":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-field":{"type":"formatted","default":"","tokens":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-font":{"type":"array","value":"string","default":["Open Sans Regular","Arial Unicode MS Regular"],"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-size":{"type":"number","default":16,"minimum":0,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{"type":"number","default":10,"minimum":0,"units":"ems","requires":["text-field",{"symbol-placement":["point"]}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{"type":"number","default":1.2,"units":"ems","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-letter-spacing":{"type":"number","default":0,"units":"ems","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-justify":{"type":"enum","values":{"auto":{},"left":{},"center":{},"right":{}},"default":"center","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-radial-offset":{"type":"number","units":"ems","default":0,"requires":["text-field"],"property-type":"data-driven","expression":{"interpolated":true,"parameters":["zoom","feature"]}},"text-variable-anchor":{"type":"array","value":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"requires":["text-field",{"symbol-placement":["point"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-anchor":{"type":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["text-field",{"!":"text-variable-anchor"}],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{"type":"number","default":45,"units":"degrees","requires":["text-field",{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-writing-mode":{"type":"array","value":"enum","values":{"horizontal":{},"vertical":{}},"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotate":{"type":"number","default":0,"period":360,"units":"degrees","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-keep-upright":{"type":"boolean","default":true,"requires":["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-transform":{"type":"enum","values":{"none":{},"uppercase":{},"lowercase":{}},"default":"none","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-offset":{"type":"array","value":"number","units":"ems","length":2,"default":[0,0],"requires":["text-field",{"!":"text-radial-offset"}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{"type":"boolean","default":false,"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{"type":"boolean","default":false,"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-optional":{"type":"boolean","default":false,"requires":["text-field","icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_raster":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"layout_hillshade":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","expression":{"interpolated":false},"property-type":"constant"}},"filter":{"type":"array","value":"*"},"filter_symbol":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature","pitch","distance-from-center"]}},"filter_fill":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_line":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_circle":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_fill-extrusion":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_heatmap":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_operator":{"type":"enum","values":{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},"in":{},"!in":{},"all":{},"any":{},"none":{},"has":{},"!has":{}}},"geometry_type":{"type":"enum","values":{"Point":{},"LineString":{},"Polygon":{}}},"function":{"expression":{"type":"expression"},"stops":{"type":"array","value":"function_stop"},"base":{"type":"number","default":1,"minimum":0},"property":{"type":"string","default":"$zoom"},"type":{"type":"enum","values":{"identity":{},"exponential":{},"interval":{},"categorical":{}},"default":"exponential"},"colorSpace":{"type":"enum","values":{"rgb":{},"lab":{},"hcl":{}},"default":"rgb"},"default":{"type":"*","required":false}},"function_stop":{"type":"array","minimum":0,"maximum":24,"value":["number","color"],"length":2},"expression":{"type":"array","value":"*","minimum":1},"fog":{"range":{"type":"array","default":[0.5,10],"minimum":-20,"maximum":20,"length":2,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom","measure-light"],"relaxZoomRestriction":true}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom","measure-light"],"relaxZoomRestriction":true},"transition":true},"high-color":{"type":"color","property-type":"data-constant","default":"#245cdf","expression":{"interpolated":true,"parameters":["zoom","measure-light"],"relaxZoomRestriction":true},"transition":true},"space-color":{"type":"color","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],4,"#010b19",7,"#367ab9"],"expression":{"interpolated":true,"parameters":["zoom","measure-light"],"relaxZoomRestriction":true},"transition":true},"horizon-blend":{"type":"number","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],4,0.2,7,0.1],"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom","measure-light"],"relaxZoomRestriction":true},"transition":true},"star-intensity":{"type":"number","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],5,0.35,6,0],"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom","measure-light"],"relaxZoomRestriction":true},"transition":true}},"camera":{"camera-projection":{"type":"enum","values":{"perspective":{},"orthographic":{}},"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"default":"perspective","property-type":"data-constant"}},"light":{"anchor":{"type":"enum","default":"viewport","values":{"map":{},"viewport":{}},"property-type":"data-constant","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]}},"position":{"type":"array","default":[1.15,210,30],"length":3,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"projection":{"name":{"type":"enum","values":{"albers":{},"equalEarth":{},"equirectangular":{},"lambertConformalConic":{},"mercator":{},"naturalEarth":{},"winkelTripel":{},"globe":{}},"default":"mercator","required":true},"center":{"type":"array","length":2,"value":"number","property-type":"data-constant","minimum":[-180,-90],"maximum":[180,90],"transition":false,"requires":[{"name":["albers","lambertConformalConic"]}]},"parallels":{"type":"array","length":2,"value":"number","property-type":"data-constant","minimum":[-90,-90],"maximum":[90,90],"transition":false,"requires":[{"name":["albers","lambertConformalConic"]}]}},"terrain":{"source":{"type":"string","required":true},"exaggeration":{"type":"number","property-type":"data-constant","default":1,"minimum":0,"maximum":1000,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"requires":["source"]}},"paint":["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background","paint_sky","paint_model"],"paint_fill":{"fill-antialias":{"type":"boolean","default":true,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"fill-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"fill-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"fill-outline-color":{"type":"color","transition":true,"requires":[{"!":"fill-pattern"},{"fill-antialias":true}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"fill-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["fill-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"fill-emissive-strength":{"type":"number","default":0,"minimum":0,"transition":true,"units":"intensity","expression":{"interpolated":true,"parameters":["zoom","measure-light"]},"property-type":"data-constant"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"fill-extrusion-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"fill-extrusion-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["fill-extrusion-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"fill-extrusion-height":{"type":"number","default":0,"minimum":0,"units":"meters","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"fill-extrusion-base":{"type":"number","default":0,"minimum":0,"units":"meters","transition":true,"requires":["fill-extrusion-height"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{"type":"boolean","default":true,"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-ambient-occlusion-intensity":{"property-type":"data-constant","type":"number","private":true,"default":0,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"fill-extrusion-ambient-occlusion-radius":{"property-type":"data-constant","type":"number","private":true,"default":3,"minimum":0,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"requires":["fill-extrusion-edge-radius"]},"fill-extrusion-ambient-occlusion-wall-radius":{"property-type":"data-constant","type":"number","default":3,"minimum":0,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"requires":["fill-extrusion-edge-radius"]},"fill-extrusion-ambient-occlusion-ground-radius":{"property-type":"data-constant","type":"number","default":3,"minimum":0,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"fill-extrusion-ambient-occlusion-ground-attenuation":{"property-type":"data-constant","type":"number","default":0.69,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"fill-extrusion-flood-light-color":{"property-type":"data-constant","type":"color","default":"#ffffff","transition":true,"expression":{"interpolated":true,"parameters":["zoom","measure-light"]}},"fill-extrusion-flood-light-intensity":{"property-type":"data-constant","type":"number","default":0,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","measure-light"]}},"fill-extrusion-flood-light-wall-radius":{"property-type":"data-driven","type":"number","units":"meters","default":0,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["feature","feature-state"]}},"fill-extrusion-flood-light-ground-radius":{"property-type":"data-driven","type":"number","units":"meters","default":0,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["feature","feature-state"]}},"fill-extrusion-flood-light-ground-attenuation":{"property-type":"data-constant","type":"number","default":0.69,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"fill-extrusion-vertical-scale":{"property-type":"data-constant","type":"number","default":1,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"fill-extrusion-rounded-roof":{"property-type":"data-constant","type":"boolean","default":true,"requires":["fill-extrusion-edge-radius"],"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]}}},"paint_line":{"line-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"line-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"line-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"line-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["line-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"line-width":{"type":"number","default":1,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"line-gap-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"line-offset":{"type":"number","default":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"line-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"line-dasharray":{"type":"array","value":"number","minimum":0,"transition":false,"units":"line widths","requires":[{"!":"line-pattern"}],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-gradient":{"type":"color","transition":false,"requires":[{"!":"line-pattern"},{"source":"geojson","has":{"lineMetrics":true}}],"expression":{"interpolated":true,"parameters":["line-progress"]},"property-type":"color-ramp"},"line-trim-offset":{"type":"array","value":"number","length":2,"default":[0,0],"minimum":[0,0],"maximum":[1,1],"transition":false,"requires":[{"source":"geojson","has":{"lineMetrics":true}}],"property-type":"constant"},"line-emissive-strength":{"type":"number","default":0,"minimum":0,"transition":true,"units":"intensity","expression":{"interpolated":true,"parameters":["zoom","measure-light"]},"property-type":"data-constant"},"line-border-width":{"type":"number","private":true,"default":0,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-border-color":{"type":"color","private":true,"default":"rgba(0, 0, 0, 0)","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"}},"paint_circle":{"circle-radius":{"type":"number","default":5,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-blur":{"type":"number","default":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["circle-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{}},"default":"viewport","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-stroke-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-stroke-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"circle-emissive-strength":{"type":"number","default":0,"minimum":0,"transition":true,"units":"intensity","expression":{"interpolated":true,"parameters":["zoom","measure-light"]},"property-type":"data-constant"}},"paint_heatmap":{"heatmap-radius":{"type":"number","default":30,"minimum":1,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"heatmap-weight":{"type":"number","default":1,"minimum":0,"transition":false,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"heatmap-intensity":{"type":"number","default":1,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"heatmap-color":{"type":"color","default":["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"],"transition":false,"expression":{"interpolated":true,"parameters":["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_symbol":{"icon-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"icon-emissive-strength":{"type":"number","default":1,"minimum":0,"transition":true,"units":"intensity","expression":{"interpolated":true,"parameters":["zoom","measure-light"]},"property-type":"data-driven"},"text-emissive-strength":{"type":"number","default":1,"minimum":0,"transition":true,"units":"intensity","expression":{"interpolated":true,"parameters":["zoom","measure-light"]},"property-type":"data-driven"},"icon-color":{"type":"color","default":"#000000","transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"icon-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"icon-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"icon-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"icon-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["icon-image","icon-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-image-cross-fade":{"type":"number","property-type":"data-driven","default":0,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"transition":true},"text-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"text-color":{"type":"color","default":"#000000","transition":true,"overridable":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"text-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"text-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"text-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state","measure-light"]},"property-type":"data-driven"},"text-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["text-field","text-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_raster":{"raster-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-color":{"type":"color","transition":false,"expression":{"interpolated":true,"parameters":["raster-value"]},"property-type":"color-ramp"},"raster-color-mix":{"type":"array","default":[0.2126,0.7152,0.0722,0],"length":4,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"raster-color-range":{"type":"array","default":[0,1],"length":2,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"raster-hue-rotate":{"type":"number","default":0,"period":360,"transition":true,"units":"degrees","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{"type":"number","default":0,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-saturation":{"type":"number","default":0,"minimum":-1,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-contrast":{"type":"number","default":0,"minimum":-1,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-resampling":{"type":"enum","values":{"linear":{},"nearest":{}},"default":"linear","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{"type":"number","default":300,"minimum":0,"transition":false,"units":"milliseconds","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_hillshade":{"hillshade-illumination-direction":{"type":"number","default":335,"minimum":0,"maximum":359,"transition":false,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"viewport","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{"type":"number","default":0.5,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{"type":"color","default":"#FFFFFF","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_background":{"background-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"background-pattern"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"background-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"background-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"background-emissive-strength":{"type":"number","default":0,"minimum":0,"transition":true,"units":"intensity","expression":{"interpolated":true,"parameters":["zoom","measure-light"]},"property-type":"data-constant"}},"paint_sky":{"sky-type":{"type":"enum","values":{"gradient":{},"atmosphere":{}},"default":"atmosphere","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun":{"type":"array","value":"number","length":2,"units":"degrees","minimum":[0,0],"maximum":[360,180],"transition":false,"requires":[{"sky-type":"atmosphere"}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun-intensity":{"type":"number","requires":[{"sky-type":"atmosphere"}],"default":10,"minimum":0,"maximum":100,"transition":false,"property-type":"data-constant"},"sky-gradient-center":{"type":"array","requires":[{"sky-type":"gradient"}],"value":"number","default":[0,0],"length":2,"units":"degrees","minimum":[0,0],"maximum":[360,180],"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-gradient-radius":{"type":"number","requires":[{"sky-type":"gradient"}],"default":90,"minimum":0,"maximum":180,"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-gradient":{"type":"color","default":["interpolate",["linear"],["sky-radial-progress"],0.8,"#87ceeb",1,"white"],"transition":false,"requires":[{"sky-type":"gradient"}],"expression":{"interpolated":true,"parameters":["sky-radial-progress"]},"property-type":"color-ramp"},"sky-atmosphere-halo-color":{"type":"color","default":"white","transition":false,"requires":[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-atmosphere-color":{"type":"color","default":"white","transition":false,"requires":[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_model":{"model-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"model-rotation":{"type":"array","value":"number","length":3,"default":[0,0,0],"period":360,"units":"degrees","property-type":"data-driven","expression":{"interpolated":true,"parameters":["feature","feature-state"]},"transition":true},"model-scale":{"type":"array","value":"number","length":3,"default":[1,1,1],"property-type":"data-driven","expression":{"interpolated":true,"parameters":["feature","feature-state","zoom"]},"transition":true},"model-translation":{"type":"array","value":"number","length":3,"default":[0,0,0],"property-type":"data-driven","expression":{"interpolated":true,"parameters":["feature","feature-state"]},"transition":true},"model-color":{"type":"color","default":"#ffffff","property-type":"data-driven","expression":{"interpolated":true,"parameters":["feature","feature-state","measure-light"]},"transition":true},"model-color-mix-intensity":{"type":"number","property-type":"data-driven","default":0,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["feature","feature-state","measure-light"]},"transition":true},"model-type":{"type":"enum","values":{"common-3d":{},"location-indicator":{}},"default":"common-3d","property-type":"data-constant"},"model-cast-shadows":{"type":"boolean","default":true,"transition":false,"expression":{"interpolated":false},"property-type":"data-constant"},"model-receive-shadows":{"type":"boolean","default":true,"transition":false,"expression":{"interpolated":false},"property-type":"data-constant"},"model-ambient-occlusion-intensity":{"type":"number","default":1,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant","transition":true},"model-emissive-strength":{"type":"number","property-type":"data-driven","default":0,"minimum":0,"maximum":5,"units":"number","expression":{"interpolated":true,"parameters":["feature","feature-state","measure-light"]},"transition":true},"model-roughness":{"type":"number","default":1,"minimum":0,"maximum":1,"property-type":"data-driven","expression":{"interpolated":true,"parameters":["feature","feature-state"]},"transition":true},"model-height-based-emissive-strength-multiplier":{"type":"array","default":[1,1,1,1,0],"length":5,"value":"number","property-type":"data-driven","expression":{"interpolated":true,"parameters":["feature","feature-state","measure-light"]},"transition":true}},"transition":{"duration":{"type":"number","default":300,"minimum":0,"units":"milliseconds"},"delay":{"type":"number","default":0,"minimum":0,"units":"milliseconds"}},"property-type":{"data-driven":{"type":"property-type"},"color-ramp":{"type":"property-type"},"data-constant":{"type":"property-type"},"constant":{"type":"property-type"}},"promoteId":{"*":{"type":"string"}}}');function Pt(e,...t){for(const i of t)for(const t in i)e[t]=i[t];return e}class Dt{constructor(e,t,i,r){this.message=(e?`${e}: `:"")+i,r&&(this.identifier=r),null!=t&&t.__line__&&(this.line=t.__line__);}}function Rt(e){return e instanceof Number||e instanceof String||e instanceof Boolean?e.valueOf():e}function Lt(e){if(Array.isArray(e))return e.map(Lt);if(e instanceof Object&&!(e instanceof Number||e instanceof String||e instanceof Boolean)){const t={};for(const i in e)t[i]=Lt(e[i]);return t}return Rt(e)}class kt extends Error{constructor(e,t){super(t),this.message=t,this.key=e;}}var Bt=kt;class Ot{constructor(e,t=[]){this.parent=e,this.bindings={};for(const[e,i]of t)this.bindings[e]=i;}concat(e){return new Ot(this,e)}get(e){if(this.bindings[e])return this.bindings[e];if(this.parent)return this.parent.get(e);throw new Error(`${e} not found in scope.`)}has(e){return !!this.bindings[e]||!!this.parent&&this.parent.has(e)}}var Ft=Ot;const Nt={kind:"null"},Ut={kind:"number"},jt={kind:"string"},Vt={kind:"boolean"},Gt={kind:"color"},qt={kind:"object"},$t={kind:"value"},Zt={kind:"collator"},Wt={kind:"formatted"},Ht={kind:"resolvedImage"};function Xt(e,t){return {kind:"array",itemType:e,N:t}}function Yt(e){if("array"===e.kind){const t=Yt(e.itemType);return "number"==typeof e.N?`array<${t}, ${e.N}>`:"value"===e.itemType.kind?"array":`array<${t}>`}return e.kind}const Kt=[Nt,Ut,jt,Vt,Gt,Wt,qt,Xt($t),Ht];function Jt(e,t){if("error"===t.kind)return null;if("array"===e.kind){if("array"===t.kind&&(0===t.N&&"value"===t.itemType.kind||!Jt(e.itemType,t.itemType))&&("number"!=typeof e.N||e.N===t.N))return null}else {if(e.kind===t.kind)return null;if("value"===e.kind)for(const e of Kt)if(!Jt(e,t))return null}return `Expected ${Yt(e)} but found ${Yt(t)} instead.`}function Qt(e,t){return t.some((t=>t.kind===e.kind))}function ei(e,t){return t.some((t=>"null"===t?null===e:"array"===t?Array.isArray(e):"object"===t?e&&!Array.isArray(e)&&"object"==typeof e:t===typeof e))}var ti,ii={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],rebeccapurple:[102,51,153,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function ri(e){return (e=Math.round(e))<0?0:e>255?255:e}function ni(e){return ri("%"===e[e.length-1]?parseFloat(e)/100*255:parseInt(e))}function oi(e){return (t="%"===e[e.length-1]?parseFloat(e)/100:parseFloat(e))<0?0:t>1?1:t;var t;}function si(e,t,i){return i<0?i+=1:i>1&&(i-=1),6*i<1?e+(t-e)*i*6:2*i<1?t:3*i<2?e+(t-e)*(2/3-i)*6:e}try{ti={}.parseCSSColor=function(e){var t,i=e.replace(/ /g,"").toLowerCase();if(i in ii)return ii[i].slice();if("#"===i[0])return 4===i.length?(t=parseInt(i.substr(1),16))>=0&&t<=4095?[(3840&t)>>4|(3840&t)>>8,240&t|(240&t)>>4,15&t|(15&t)<<4,1]:null:7===i.length&&(t=parseInt(i.substr(1),16))>=0&&t<=16777215?[(16711680&t)>>16,(65280&t)>>8,255&t,1]:null;var r=i.indexOf("("),n=i.indexOf(")");if(-1!==r&&n+1===i.length){var o=i.substr(0,r),s=i.substr(r+1,n-(r+1)).split(","),a=1;switch(o){case"rgba":if(4!==s.length)return null;a=oi(s.pop());case"rgb":return 3!==s.length?null:[ni(s[0]),ni(s[1]),ni(s[2]),a];case"hsla":if(4!==s.length)return null;a=oi(s.pop());case"hsl":if(3!==s.length)return null;var l=(parseFloat(s[0])%360+360)%360/360,c=oi(s[1]),h=oi(s[2]),u=h<=.5?h*(c+1):h+c-h*c,d=2*h-u;return [ri(255*si(d,u,l+1/3)),ri(255*si(d,u,l)),ri(255*si(d,u,l-1/3)),a];default:return null}}return null};}catch(e){}class ai{constructor(e,t,i,r=1){this.r=e,this.g=t,this.b=i,this.a=r;}static parse(e){if(!e)return;if(e instanceof ai)return e;if("string"!=typeof e)return;const t=ti(e);return t?new ai(t[0]/255*t[3],t[1]/255*t[3],t[2]/255*t[3],t[3]):void 0}toString(){const[e,t,i,r]=this.toArray();return `rgba(${Math.round(e)},${Math.round(t)},${Math.round(i)},${r})`}toArray(){const{r:e,g:t,b:i,a:r}=this;return 0===r?[0,0,0,0]:[255*e/r,255*t/r,255*i/r,r]}toArray01(){const{r:e,g:t,b:i,a:r}=this;return 0===r?[0,0,0,0]:[e/r,t/r,i/r,r]}toArray01Scaled(e){const{r:t,g:i,b:r,a:n}=this;return 0===n?[0,0,0]:[t/n*e,i/n*e,r/n*e]}toArray01PremultipliedAlpha(){const{r:e,g:t,b:i,a:r}=this;return [e,t,i,r]}toArray01Linear(){const{r:e,g:t,b:i,a:r}=this;return 0===r?[0,0,0,0]:[Math.pow(e/r,2.2),Math.pow(t/r,2.2),Math.pow(i/r,2.2),r]}}ai.black=new ai(0,0,0,1),ai.white=new ai(1,1,1,1),ai.transparent=new ai(0,0,0,0),ai.red=new ai(1,0,0,1),ai.blue=new ai(0,0,1,1);var li=ai;class ci{constructor(e,t,i){this.sensitivity=e?t?"variant":"case":t?"accent":"base",this.locale=i,this.collator=new Intl.Collator(this.locale?this.locale:[],{sensitivity:this.sensitivity,usage:"search"});}compare(e,t){return this.collator.compare(e,t)}resolvedLocale(){return new Intl.Collator(this.locale?this.locale:[]).resolvedOptions().locale}}class hi{constructor(e,t,i,r,n){this.text=e.normalize?e.normalize():e,this.image=t,this.scale=i,this.fontStack=r,this.textColor=n;}}class ui{constructor(e){this.sections=e;}static fromString(e){return new ui([new hi(e,null,null,null,null)])}isEmpty(){return 0===this.sections.length||!this.sections.some((e=>0!==e.text.length||e.image&&0!==e.image.namePrimary.length))}static factory(e){return e instanceof ui?e:ui.fromString(e)}toString(){return 0===this.sections.length?"":this.sections.map((e=>e.text)).join("")}serialize(){const e=["format"];for(const t of this.sections){if(t.image){e.push(["image",t.image.namePrimary]);continue}e.push(t.text);const i={};t.fontStack&&(i["text-font"]=["literal",t.fontStack.split(",")]),t.scale&&(i["font-scale"]=t.scale),t.textColor&&(i["text-color"]=["rgba"].concat(t.textColor.toArray())),e.push(i);}return e}}class di{constructor(e){this.namePrimary=e.namePrimary,e.nameSecondary&&(this.nameSecondary=e.nameSecondary),this.available=e.available;}toString(){return this.nameSecondary?`[${this.namePrimary},${this.nameSecondary}]`:this.namePrimary}static fromString(e,t){return e?new di({namePrimary:e,nameSecondary:t,available:!1}):null}serialize(){return this.nameSecondary?["image",this.namePrimary,this.nameSecondary]:["image",this.namePrimary]}}function pi(e,t,i,r){return "number"==typeof e&&e>=0&&e<=255&&"number"==typeof t&&t>=0&&t<=255&&"number"==typeof i&&i>=0&&i<=255?void 0===r||"number"==typeof r&&r>=0&&r<=1?null:`Invalid rgba value [${[e,t,i,r].join(", ")}]: 'a' must be between 0 and 1.`:`Invalid rgba value [${("number"==typeof r?[e,t,i,r]:[e,t,i]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`}function fi(e){if(null===e)return !0;if("string"==typeof e)return !0;if("boolean"==typeof e)return !0;if("number"==typeof e)return !0;if(e instanceof li)return !0;if(e instanceof ci)return !0;if(e instanceof ui)return !0;if(e instanceof di)return !0;if(Array.isArray(e)){for(const t of e)if(!fi(t))return !1;return !0}if("object"==typeof e){for(const t in e)if(!fi(e[t]))return !1;return !0}return !1}function mi(e){if(null===e)return Nt;if("string"==typeof e)return jt;if("boolean"==typeof e)return Vt;if("number"==typeof e)return Ut;if(e instanceof li)return Gt;if(e instanceof ci)return Zt;if(e instanceof ui)return Wt;if(e instanceof di)return Ht;if(Array.isArray(e)){const t=e.length;let i;for(const t of e){const e=mi(t);if(i){if(i===e)continue;i=$t;break}i=e;}return Xt(i||$t,t)}return qt}function _i(e){const t=typeof e;return null===e?"":"string"===t||"number"===t||"boolean"===t?String(e):e instanceof li||e instanceof ui||e instanceof di?e.toString():JSON.stringify(e)}class gi{constructor(e,t){this.type=e,this.value=t;}static parse(e,t){if(2!==e.length)return t.error(`'literal' expression requires exactly one argument, but found ${e.length-1} instead.`);if(!fi(e[1]))return t.error("invalid value");const i=e[1];let r=mi(i);const n=t.expectedType;return "array"!==r.kind||0!==r.N||!n||"array"!==n.kind||"number"==typeof n.N&&0!==n.N||(r=n),new gi(r,i)}evaluate(){return this.value}eachChild(){}outputDefined(){return !0}serialize(){return "array"===this.type.kind||"object"===this.type.kind?["literal",this.value]:this.value instanceof li?["rgba"].concat(this.value.toArray()):this.value instanceof ui?this.value.serialize():this.value}}var yi=gi,xi=class{constructor(e){this.name="ExpressionEvaluationError",this.message=e;}toJSON(){return this.message}};const vi={string:jt,number:Ut,boolean:Vt,object:qt};class bi{constructor(e,t){this.type=e,this.args=t;}static parse(e,t){if(e.length<2)return t.error("Expected at least one argument.");let i,r=1;const n=e[0];if("array"===n){let n,o;if(e.length>2){const i=e[1];if("string"!=typeof i||!(i in vi)||"object"===i)return t.error('The item type argument of "array" must be one of string, number, boolean',1);n=vi[i],r++;}else n=$t;if(e.length>3){if(null!==e[2]&&("number"!=typeof e[2]||e[2]<0||e[2]!==Math.floor(e[2])))return t.error('The length argument to "array" must be a positive integer literal',2);o=e[2],r++;}i=Xt(n,o);}else i=vi[n];const o=[];for(;r<e.length;r++){const i=t.parse(e[r],r,$t);if(!i)return null;o.push(i);}return new bi(i,o)}evaluate(e){for(let t=0;t<this.args.length;t++){const i=this.args[t].evaluate(e);if(!Jt(this.type,mi(i)))return i;if(t===this.args.length-1)throw new xi(`Expected value to be of type ${Yt(this.type)}, but found ${Yt(mi(i))} instead.`)}return null}eachChild(e){this.args.forEach(e);}outputDefined(){return this.args.every((e=>e.outputDefined()))}serialize(){const e=this.type,t=[e.kind];if("array"===e.kind){const i=e.itemType;if("string"===i.kind||"number"===i.kind||"boolean"===i.kind){t.push(i.kind);const r=e.N;("number"==typeof r||this.args.length>1)&&t.push(r);}}return t.concat(this.args.map((e=>e.serialize())))}}var wi=bi;class Ti{constructor(e){this.type=Wt,this.sections=e;}static parse(e,t){if(e.length<2)return t.error("Expected at least one argument.");const i=e[1];if(!Array.isArray(i)&&"object"==typeof i)return t.error("First argument must be an image or text section.");const r=[];let n=!1;for(let i=1;i<=e.length-1;++i){const o=e[i];if(n&&"object"==typeof o&&!Array.isArray(o)){n=!1;let e=null;if(o["font-scale"]&&(e=t.parse(o["font-scale"],1,Ut),!e))return null;let i=null;if(o["text-font"]&&(i=t.parse(o["text-font"],1,Xt(jt)),!i))return null;let s=null;if(o["text-color"]&&(s=t.parse(o["text-color"],1,Gt),!s))return null;const a=r[r.length-1];a.scale=e,a.font=i,a.textColor=s;}else {const o=t.parse(e[i],1,$t);if(!o)return null;const s=o.type.kind;if("string"!==s&&"value"!==s&&"null"!==s&&"resolvedImage"!==s)return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");n=!0,r.push({content:o,scale:null,font:null,textColor:null});}}return new Ti(r)}evaluate(e){return new ui(this.sections.map((t=>{const i=t.content.evaluate(e);return mi(i)===Ht?new hi("",i,null,null,null):new hi(_i(i),null,t.scale?t.scale.evaluate(e):null,t.font?t.font.evaluate(e).join(","):null,t.textColor?t.textColor.evaluate(e):null)})))}eachChild(e){for(const t of this.sections)e(t.content),t.scale&&e(t.scale),t.font&&e(t.font),t.textColor&&e(t.textColor);}outputDefined(){return !1}serialize(){const e=["format"];for(const t of this.sections){e.push(t.content.serialize());const i={};t.scale&&(i["font-scale"]=t.scale.serialize()),t.font&&(i["text-font"]=t.font.serialize()),t.textColor&&(i["text-color"]=t.textColor.serialize()),e.push(i);}return e}}class Ei{constructor(e,t){this.type=Ht,this.inputPrimary=e,this.inputSecondary=t;}static parse(e,t){if(e.length<2)return t.error("Expected two or more arguments.");const i=t.parse(e[1],1,jt);if(!i)return t.error("No image name provided.");if(2===e.length)return new Ei(i);const r=t.parse(e[2],1,jt);return r?new Ei(i,r):t.error("Secondary image variant is not a string.")}evaluate(e){const t=di.fromString(this.inputPrimary.evaluate(e),this.inputSecondary?this.inputSecondary.evaluate(e):void 0);return t&&e.availableImages&&(t.available=e.availableImages.indexOf(t.namePrimary)>-1,t.nameSecondary&&t.available&&e.availableImages&&(t.available=e.availableImages.indexOf(t.nameSecondary)>-1)),t}eachChild(e){e(this.inputPrimary),this.inputSecondary&&e(this.inputSecondary);}outputDefined(){return !1}serialize(){return this.inputSecondary?["image",this.inputPrimary.serialize(),this.inputSecondary.serialize()]:["image",this.inputPrimary.serialize()]}}function Mi(e){return e instanceof Number?"number":e instanceof String?"string":e instanceof Boolean?"boolean":Array.isArray(e)?"array":null===e?"null":typeof e}const Ai={"to-boolean":Vt,"to-color":Gt,"to-number":Ut,"to-string":jt};class Si{constructor(e,t){this.type=e,this.args=t;}static parse(e,t){if(e.length<2)return t.error("Expected at least one argument.");const i=e[0],r=[];let n=Nt;if("to-array"===i){if(!Array.isArray(e[1]))return null;const i=e[1].length;if(t.expectedType){if("array"!==t.expectedType.kind)return t.error(`Expected ${t.expectedType.kind} but found array.`);n=Xt(t.expectedType.itemType,i);}else {if(!(i>0&&fi(e[1][0])))return null;n=Xt(mi(e[1][0]),i);}for(let o=0;o<i;o++){const i=e[1][o];let s;if("array"===Mi(i))s=t.parse(i,void 0,n.itemType);else {const e=Mi(i);if(e!==n.itemType.kind)return t.error(`Expected ${n.itemType.kind} but found ${e}.`);s=t.registry.literal.parse(["literal",void 0===i?null:i],t);}if(!s)return null;r.push(s);}}else {if(("to-boolean"===i||"to-string"===i)&&2!==e.length)return t.error("Expected one argument.");n=Ai[i];for(let i=1;i<e.length;i++){const n=t.parse(e[i],i,$t);if(!n)return null;r.push(n);}}return new Si(n,r)}evaluate(e){if("boolean"===this.type.kind)return Boolean(this.args[0].evaluate(e));if("color"===this.type.kind){let t,i;for(const r of this.args){if(t=r.evaluate(e),i=null,t instanceof li)return t;if("string"==typeof t){const i=e.parseColor(t);if(i)return i}else if(Array.isArray(t)&&(i=t.length<3||t.length>4?`Invalid rbga value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.`:pi(t[0],t[1],t[2],t[3]),!i))return new li(t[0]/255,t[1]/255,t[2]/255,t[3])}throw new xi(i||`Could not parse color from value '${"string"==typeof t?t:String(JSON.stringify(t))}'`)}if("number"===this.type.kind){let t=null;for(const i of this.args){if(t=i.evaluate(e),null===t)return 0;const r=Number(t);if(!isNaN(r))return r}throw new xi(`Could not convert ${JSON.stringify(t)} to number.`)}return "formatted"===this.type.kind?ui.fromString(_i(this.args[0].evaluate(e))):"resolvedImage"===this.type.kind?di.fromString(_i(this.args[0].evaluate(e))):"array"===this.type.kind?this.args.map((t=>t.evaluate(e))):_i(this.args[0].evaluate(e))}eachChild(e){this.args.forEach(e);}outputDefined(){return this.args.every((e=>e.outputDefined()))}serialize(){if("formatted"===this.type.kind)return new Ti([{content:this.args[0],scale:null,font:null,textColor:null}]).serialize();if("resolvedImage"===this.type.kind)return new Ei(this.args[0]).serialize();const e="array"===this.type.kind?[]:[`to-${this.type.kind}`];return this.eachChild((t=>{e.push(t.serialize());})),e}}var Ii=Si;const Ci=["Unknown","Point","LineString","Polygon"];var zi=class{constructor(e){this.globals=null,this.feature=null,this.featureState=null,this.formattedSection=null,this._parseColorCache={},this.availableImages=null,this.canonical=null,this.featureTileCoord=null,this.featureDistanceData=null,this.options=e;}id(){return this.feature&&void 0!==this.feature.id?this.feature.id:null}geometryType(){return this.feature?"number"==typeof this.feature.type?Ci[this.feature.type]:this.feature.type:null}geometry(){return this.feature&&"geometry"in this.feature?this.feature.geometry:null}canonicalID(){return this.canonical}properties(){return this.feature&&this.feature.properties||{}}measureLight(e){return this.globals.brightness||0}distanceFromCenter(){if(this.featureTileCoord&&this.featureDistanceData){const e=this.featureDistanceData.center,t=this.featureDistanceData.scale,{x:i,y:r}=this.featureTileCoord;return this.featureDistanceData.bearing[0]*(i*t-e[0])+this.featureDistanceData.bearing[1]*(r*t-e[1])}return 0}parseColor(e){let t=this._parseColorCache[e];return t||(t=this._parseColorCache[e]=li.parse(e)),t}getConfig(e){return this.options?this.options.get(e):null}};class Pi{constructor(e,t,i,r){this.name=e,this.type=t,this._evaluate=i,this.args=r;}evaluate(e){return this._evaluate(e,this.args)}eachChild(e){this.args.forEach(e);}outputDefined(){return !1}serialize(){return [this.name].concat(this.args.map((e=>e.serialize())))}static parse(e,t){const i=e[0],r=Pi.definitions[i];if(!r)return t.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`,0);const n=Array.isArray(r)?r[0]:r.type,o=Array.isArray(r)?[[r[1],r[2]]]:r.overloads,s=o.filter((([t])=>!Array.isArray(t)||t.length===e.length-1));let a=null;for(const[r,o]of s){a=new Gr(t.registry,t.path,null,t.scope,void 0,t.options);const s=[];let l=!1;for(let t=1;t<e.length;t++){const i=e[t],n=Array.isArray(r)?r[t-1]:r.type,o=a.parse(i,1+s.length,n);if(!o){l=!0;break}s.push(o);}if(!l)if(Array.isArray(r)&&r.length!==s.length)a.error(`Expected ${r.length} arguments, but found ${s.length} instead.`);else {for(let e=0;e<s.length;e++){const t=Array.isArray(r)?r[e]:r.type,i=s[e];a.concat(e+1).checkSubtype(t,i.type);}if(0===a.errors.length)return new Pi(i,n,o,s)}}if(1===s.length)t.errors.push(...a.errors);else {const i=(s.length?s:o).map((([e])=>{return t=e,Array.isArray(t)?`(${t.map(Yt).join(", ")})`:`(${Yt(t.type)}...)`;var t;})).join(" | "),r=[];for(let i=1;i<e.length;i++){const n=t.parse(e[i],1+r.length);if(!n)return null;r.push(Yt(n.type));}t.error(`Expected arguments of type ${i}, but found (${r.join(", ")}) instead.`);}return null}static register(e,t){Pi.definitions=t;for(const i in t)e[i]=Pi;}}var Di=Pi;class Ri{constructor(e,t,i){this.type=Zt,this.locale=i,this.caseSensitive=e,this.diacriticSensitive=t;}static parse(e,t){if(2!==e.length)return t.error("Expected one argument.");const i=e[1];if("object"!=typeof i||Array.isArray(i))return t.error("Collator options argument must be an object.");const r=t.parse(void 0!==i["case-sensitive"]&&i["case-sensitive"],1,Vt);if(!r)return null;const n=t.parse(void 0!==i["diacritic-sensitive"]&&i["diacritic-sensitive"],1,Vt);if(!n)return null;let o=null;return i.locale&&(o=t.parse(i.locale,1,jt),!o)?null:new Ri(r,n,o)}evaluate(e){return new ci(this.caseSensitive.evaluate(e),this.diacriticSensitive.evaluate(e),this.locale?this.locale.evaluate(e):null)}eachChild(e){e(this.caseSensitive),e(this.diacriticSensitive),this.locale&&e(this.locale);}outputDefined(){return !1}serialize(){const e={};return e["case-sensitive"]=this.caseSensitive.serialize(),e["diacritic-sensitive"]=this.diacriticSensitive.serialize(),this.locale&&(e.locale=this.locale.serialize()),["collator",e]}}var Li={exports:{}};Li.exports=function(){function e(i,r,n,o,s){for(;o>n;){if(o-n>600){var a=o-n+1,l=r-n+1,c=Math.log(a),h=.5*Math.exp(2*c/3),u=.5*Math.sqrt(c*h*(a-h)/a)*(l-a/2<0?-1:1);e(i,r,Math.max(n,Math.floor(r-l*h/a+u)),Math.min(o,Math.floor(r+(a-l)*h/a+u)),s);}var d=i[r],p=n,f=o;for(t(i,n,r),s(i[o],d)>0&&t(i,n,o);p<f;){for(t(i,p,f),p++,f--;s(i[p],d)<0;)p++;for(;s(i[f],d)>0;)f--;}0===s(i[n],d)?t(i,n,f):t(i,++f,o),f<=r&&(n=f+1),r<=f&&(o=f-1);}}function t(e,t,i){var r=e[t];e[t]=e[i],e[i]=r;}function i(e,t){return e<t?-1:e>t?1:0}return function(t,r,n,o,s){e(t,r,n||0,o||t.length-1,s||i);}}();var ki=d(Li.exports);function Bi(e){let t=0;for(let i,r,n=0,o=e.length,s=o-1;n<o;s=n++)i=e[n],r=e[s],t+=(r.x-i.x)*(i.y+r.y);return t}function Oi(e,t){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.max(e[2],t[0]),e[3]=Math.max(e[3],t[1]);}function Fi(e,t){return !(e[0]<=t[0]||e[2]>=t[2]||e[1]<=t[1]||e[3]>=t[3])}function Ni(e,t,i){const r=e[0]-t[0],n=e[1]-t[1],o=e[0]-i[0],s=e[1]-i[1];return r*s-o*n==0&&r*o<=0&&n*s<=0}function Ui(e,t,i=!1){let r=!1;for(let a=0,l=t.length;a<l;a++){const l=t[a];for(let t=0,a=l.length,c=a-1;t<a;c=t++){const a=l[c],h=l[t];if(Ni(e,a,h))return i;(o=a)[1]>(n=e)[1]!=(s=h)[1]>n[1]&&n[0]<(s[0]-o[0])*(n[1]-o[1])/(s[1]-o[1])+o[0]&&(r=!r);}}var n,o,s;return r}function ji(e,t,i,r){const n=r[0]-i[0],o=r[1]-i[1],s=(e[0]-i[0])*o-n*(e[1]-i[1]),a=(t[0]-i[0])*o-n*(t[1]-i[1]);return s>0&&a<0||s<0&&a>0}function Vi(e,t,i,r){return 0!=(n=[r[0]-i[0],r[1]-i[1]])[0]*(o=[t[0]-e[0],t[1]-e[1]])[1]-n[1]*o[0]&&!(!ji(e,t,i,r)||!ji(i,r,e,t));var n,o;}const Gi=8192;function qi(e,t){const i=(180+e[0])/360,r=(180-180/Math.PI*Math.log(Math.tan(Math.PI/4+e[1]*Math.PI/360)))/360,n=Math.pow(2,t.z);return [Math.round(i*n*Gi),Math.round(r*n*Gi)]}function $i(e,t){for(let i=0;i<t.length;i++)if(Ui(e,t[i]))return !0;return !1}function Zi(e,t,i){for(const r of i)for(let i=0,n=r.length,o=n-1;i<n;o=i++)if(Vi(e,t,r[o],r[i]))return !0;return !1}function Wi(e,t){for(let i=0;i<e.length;++i)if(!Ui(e[i],t))return !1;for(let i=0;i<e.length-1;++i)if(Zi(e[i],e[i+1],t))return !1;return !0}function Hi(e,t){for(let i=0;i<t.length;i++)if(Wi(e,t[i]))return !0;return !1}function Xi(e,t,i){const r=[];for(let n=0;n<e.length;n++){const o=[];for(let r=0;r<e[n].length;r++){const s=qi(e[n][r],i);Oi(t,s),o.push(s);}r.push(o);}return r}function Yi(e,t,i){const r=[];for(let n=0;n<e.length;n++){const o=Xi(e[n],t,i);r.push(o);}return r}function Ki(e,t,i,r){if(e[0]<i[0]||e[0]>i[2]){const t=.5*r;let n=e[0]-i[0]>t?-r:i[0]-e[0]>t?r:0;0===n&&(n=e[0]-i[2]>t?-r:i[2]-e[0]>t?r:0),e[0]+=n;}Oi(t,e);}function Ji(e,t,i,r){const n=Math.pow(2,r.z)*Gi,o=[r.x*Gi,r.y*Gi],s=[];if(!e)return s;for(const r of e)for(const e of r){const r=[e.x+o[0],e.y+o[1]];Ki(r,t,i,n),s.push(r);}return s}function Qi(e,t,i,r){const n=Math.pow(2,r.z)*Gi,o=[r.x*Gi,r.y*Gi],s=[];if(!e)return s;for(const i of e){const e=[];for(const r of i){const i=[r.x+o[0],r.y+o[1]];Oi(t,i),e.push(i);}s.push(e);}if(t[2]-t[0]<=n/2){(a=t)[0]=a[1]=1/0,a[2]=a[3]=-1/0;for(const e of s)for(const r of e)Ki(r,t,i,n);}var a;return s}class er{constructor(e,t){this.type=Vt,this.geojson=e,this.geometries=t;}static parse(e,t){if(2!==e.length)return t.error(`'within' expression requires exactly one argument, but found ${e.length-1} instead.`);if(fi(e[1])){const t=e[1];if("FeatureCollection"===t.type)for(let e=0;e<t.features.length;++e){const i=t.features[e].geometry.type;if("Polygon"===i||"MultiPolygon"===i)return new er(t,t.features[e].geometry)}else if("Feature"===t.type){const e=t.geometry.type;if("Polygon"===e||"MultiPolygon"===e)return new er(t,t.geometry)}else if("Polygon"===t.type||"MultiPolygon"===t.type)return new er(t,t)}return t.error("'within' expression requires valid geojson object that contains polygon geometry type.")}evaluate(e){if(null!=e.geometry()&&null!=e.canonicalID()){if("Point"===e.geometryType())return function(e,t){const i=[1/0,1/0,-1/0,-1/0],r=[1/0,1/0,-1/0,-1/0],n=e.canonicalID();if(!n)return !1;if("Polygon"===t.type){const o=Xi(t.coordinates,r,n),s=Ji(e.geometry(),i,r,n);if(!Fi(i,r))return !1;for(const e of s)if(!Ui(e,o))return !1}if("MultiPolygon"===t.type){const o=Yi(t.coordinates,r,n),s=Ji(e.geometry(),i,r,n);if(!Fi(i,r))return !1;for(const e of s)if(!$i(e,o))return !1}return !0}(e,this.geometries);if("LineString"===e.geometryType())return function(e,t){const i=[1/0,1/0,-1/0,-1/0],r=[1/0,1/0,-1/0,-1/0],n=e.canonicalID();if(!n)return !1;if("Polygon"===t.type){const o=Xi(t.coordinates,r,n),s=Qi(e.geometry(),i,r,n);if(!Fi(i,r))return !1;for(const e of s)if(!Wi(e,o))return !1}if("MultiPolygon"===t.type){const o=Yi(t.coordinates,r,n),s=Qi(e.geometry(),i,r,n);if(!Fi(i,r))return !1;for(const e of s)if(!Hi(e,o))return !1}return !0}(e,this.geometries)}return !1}eachChild(){}outputDefined(){return !0}serialize(){return ["within",this.geojson]}}var tr=er,ir={exports:{}};ir.exports=function(){var e={kilometers:1,miles:1e3/1609.344,nauticalmiles:1e3/1852,meters:1e3,metres:1e3,yards:1e3/.9144,feet:1e3/.3048,inches:1e3/.0254},t=1/298.257223563,i=t*(2-t),r=Math.PI/180,n=function(t,n){if(void 0===t)throw new Error("No latitude given.");if(n&&!e[n])throw new Error("Unknown unit "+n+". Use one of: "+Object.keys(e).join(", "));var o=6378.137*r*(n?e[n]:1),s=Math.cos(t*r),a=1/(1-i*(1-s*s)),l=Math.sqrt(a);this.kx=o*l*s,this.ky=o*l*a*(1-i);},o={units:{configurable:!0}};function s(e,t){return e[0]===t[0]&&e[1]===t[1]}function a(e,t,i){var r=l(t[0]-e[0]);return [e[0]+r*i,e[1]+(t[1]-e[1])*i]}function l(e){for(;e<-180;)e+=360;for(;e>180;)e-=360;return e}return n.fromTile=function(e,t,i){var o=Math.PI*(1-2*(e+.5)/Math.pow(2,t)),s=Math.atan(.5*(Math.exp(o)-Math.exp(-o)))/r;return new n(s,i)},o.units.get=function(){return e},n.prototype.distance=function(e,t){var i=l(e[0]-t[0])*this.kx,r=(e[1]-t[1])*this.ky;return Math.sqrt(i*i+r*r)},n.prototype.bearing=function(e,t){var i=l(t[0]-e[0])*this.kx;return Math.atan2(i,(t[1]-e[1])*this.ky)/r},n.prototype.destination=function(e,t,i){var n=i*r;return this.offset(e,Math.sin(n)*t,Math.cos(n)*t)},n.prototype.offset=function(e,t,i){return [e[0]+t/this.kx,e[1]+i/this.ky]},n.prototype.lineDistance=function(e){for(var t=0,i=0;i<e.length-1;i++)t+=this.distance(e[i],e[i+1]);return t},n.prototype.area=function(e){for(var t=0,i=0;i<e.length;i++)for(var r=e[i],n=0,o=r.length,s=o-1;n<o;s=n++)t+=l(r[n][0]-r[s][0])*(r[n][1]+r[s][1])*(i?-1:1);return Math.abs(t)/2*this.kx*this.ky},n.prototype.along=function(e,t){var i=0;if(t<=0)return e[0];for(var r=0;r<e.length-1;r++){var n=e[r],o=e[r+1],s=this.distance(n,o);if((i+=s)>t)return a(n,o,(t-(i-s))/s)}return e[e.length-1]},n.prototype.pointToSegmentDistance=function(e,t,i){var r=t[0],n=t[1],o=l(i[0]-r)*this.kx,s=(i[1]-n)*this.ky,a=0;return 0===o&&0===s||((a=(l(e[0]-r)*this.kx*o+(e[1]-n)*this.ky*s)/(o*o+s*s))>1?(r=i[0],n=i[1]):a>0&&(r+=o/this.kx*a,n+=s/this.ky*a)),o=l(e[0]-r)*this.kx,s=(e[1]-n)*this.ky,Math.sqrt(o*o+s*s)},n.prototype.pointOnLine=function(e,t){for(var i,r,n,o,s=1/0,a=0;a<e.length-1;a++){var c=e[a][0],h=e[a][1],u=l(e[a+1][0]-c)*this.kx,d=(e[a+1][1]-h)*this.ky,p=0;0===u&&0===d||((p=(l(t[0]-c)*this.kx*u+(t[1]-h)*this.ky*d)/(u*u+d*d))>1?(c=e[a+1][0],h=e[a+1][1]):p>0&&(c+=u/this.kx*p,h+=d/this.ky*p));var f=(u=l(t[0]-c)*this.kx)*u+(d=(t[1]-h)*this.ky)*d;f<s&&(s=f,i=c,r=h,n=a,o=p);}return {point:[i,r],index:n,t:Math.max(0,Math.min(1,o))}},n.prototype.lineSlice=function(e,t,i){var r=this.pointOnLine(i,e),n=this.pointOnLine(i,t);if(r.index>n.index||r.index===n.index&&r.t>n.t){var o=r;r=n,n=o;}var a=[r.point],l=r.index+1,c=n.index;!s(i[l],a[0])&&l<=c&&a.push(i[l]);for(var h=l+1;h<=c;h++)a.push(i[h]);return s(i[c],n.point)||a.push(n.point),a},n.prototype.lineSliceAlong=function(e,t,i){for(var r=0,n=[],o=0;o<i.length-1;o++){var s=i[o],l=i[o+1],c=this.distance(s,l);if((r+=c)>e&&0===n.length&&n.push(a(s,l,(e-(r-c))/c)),r>=t)return n.push(a(s,l,(t-(r-c))/c)),n;r>e&&n.push(l);}return n},n.prototype.bufferPoint=function(e,t){var i=t/this.ky,r=t/this.kx;return [e[0]-r,e[1]-i,e[0]+r,e[1]+i]},n.prototype.bufferBBox=function(e,t){var i=t/this.ky,r=t/this.kx;return [e[0]-r,e[1]-i,e[2]+r,e[3]+i]},n.prototype.insideBBox=function(e,t){return l(e[0]-t[0])>=0&&l(e[0]-t[2])<=0&&e[1]>=t[1]&&e[1]<=t[3]},Object.defineProperties(n,o),n}();var rr=d(ir.exports),nr={exports:{}};nr.exports=function(){var e=function(e,i){if(void 0===e&&(e=[]),void 0===i&&(i=t),this.data=e,this.length=this.data.length,this.compare=i,this.length>0)for(var r=(this.length>>1)-1;r>=0;r--)this._down(r);};function t(e,t){return e<t?-1:e>t?1:0}return e.prototype.push=function(e){this.data.push(e),this.length++,this._up(this.length-1);},e.prototype.pop=function(){if(0!==this.length){var e=this.data[0],t=this.data.pop();return this.length--,this.length>0&&(this.data[0]=t,this._down(0)),e}},e.prototype.peek=function(){return this.data[0]},e.prototype._up=function(e){for(var t=this.data,i=this.compare,r=t[e];e>0;){var n=e-1>>1,o=t[n];if(i(r,o)>=0)break;t[e]=o,e=n;}t[e]=r;},e.prototype._down=function(e){for(var t=this.data,i=this.compare,r=this.length>>1,n=t[e];e<r;){var o=1+(e<<1),s=t[o],a=o+1;if(a<this.length&&i(t[a],s)<0&&(o=a,s=t[a]),i(s,n)>=0)break;t[e]=s,e=o;}t[e]=n;},e}();var or=d(nr.exports),sr=8192;function ar(e,t){return t.dist-e.dist}const lr=100,cr=50;function hr(e){const t=[1/0,1/0,-1/0,-1/0];if(t.length!==e.length)return !1;for(let i=0;i<t.length;i++)if(t[i]!==e[i])return !1;return !0}function ur(e){return e[1]-e[0]+1}function dr(e,t){const i=e[1]>=e[0]&&e[1]<t;return i||console.warn("Distance Expression: Index is out of range"),i}function pr(e,t){if(e[0]>e[1])return [null,null];const i=ur(e);if(t){if(2===i)return [e,null];const t=Math.floor(i/2);return [[e[0],e[0]+t],[e[0]+t,e[1]]]}{if(1===i)return [e,null];const t=Math.floor(i/2)-1;return [[e[0],e[0]+t],[e[0]+t+1,e[1]]]}}function fr(e,t){const i=[1/0,1/0,-1/0,-1/0];if(!dr(t,e.length))return i;for(let r=t[0];r<=t[1];++r)Oi(i,e[r]);return i}function mr(e){const t=[1/0,1/0,-1/0,-1/0];for(let i=0;i<e.length;++i)for(let r=0;r<e[i].length;++r)Oi(t,e[i][r]);return t}function _r(e,t,i){if(hr(e)||hr(t))return NaN;let r=0,n=0;return e[2]<t[0]&&(r=t[0]-e[2]),e[0]>t[2]&&(r=e[0]-t[2]),e[1]>t[3]&&(n=e[1]-t[3]),e[3]<t[1]&&(n=t[1]-e[3]),i.distance([0,0],[r,n])}function gr(e,t){const i=Math.pow(2,t.z);return [(n=(e.x/sr+t.x)/i,360*n-180),(r=(e.y/sr+t.y)/i,360/Math.PI*Math.atan(Math.exp((180-360*r)*Math.PI/180))-90)];var r,n;}function yr(e,t){const i=[];for(let r=0;r<e.length;++r)i.push(gr(e[r],t));return i}function xr(e,t,i){const r=i.pointOnLine(t,e).point;return i.distance(e,r)}function vr(e,t,i,r,n){const o=i.slice(r[0],r[1]+1);let s=1/0;for(let i=t[0];i<=t[1];++i)if(0===(s=Math.min(s,xr(e[i],o,n))))return 0;return s}function br(e,t,i,r,n){const o=Math.min(n.pointToSegmentDistance(e,i,r),n.pointToSegmentDistance(t,i,r)),s=Math.min(n.pointToSegmentDistance(i,e,t),n.pointToSegmentDistance(r,e,t));return Math.min(o,s)}function wr(e,t,i,r,n){if(!dr(t,e.length)||!dr(r,i.length))return NaN;let o=1/0;for(let s=t[0];s<t[1];++s)for(let t=r[0];t<r[1];++t){if(Vi(e[s],e[s+1],i[t],i[t+1]))return 0;o=Math.min(o,br(e[s],e[s+1],i[t],i[t+1],n));}return o}function Tr(e,t,i,r,n){if(!dr(t,e.length)||!dr(r,i.length))return NaN;let o=1/0;for(let s=t[0];s<=t[1];++s)for(let t=r[0];t<=r[1];++t)if(0===(o=Math.min(o,n.distance(e[s],i[t]))))return o;return o}function Er(e,t,i){if(Ui(e,t,!0))return 0;let r=1/0;for(const n of t){const t=n.length;if(t<2)return console.warn("Distance Expression: Invalid polygon!"),NaN;if(n[0]!==n[t-1]&&0===(r=Math.min(r,i.pointToSegmentDistance(e,n[t-1],n[0]))))return r;if(0===(r=Math.min(r,xr(e,n,i))))return r}return r}function Mr(e,t,i,r){if(!dr(t,e.length))return NaN;for(let r=t[0];r<=t[1];++r)if(Ui(e[r],i,!0))return 0;let n=1/0;for(let o=t[0];o<t[1];++o)for(const t of i)for(let i=0,s=t.length,a=s-1;i<s;a=i++){if(Vi(e[o],e[o+1],t[a],t[i]))return 0;n=Math.min(n,br(e[o],e[o+1],t[a],t[i],r));}return n}function Ar(e,t){for(const i of e)for(let e=0;e<=i.length-1;++e)if(Ui(i[e],t,!0))return !0;return !1}function Sr(e,t,i,r=1/0){const n=mr(e),o=mr(t);if(r!==1/0&&_r(n,o,i)>=r)return r;if(Fi(n,o)){if(Ar(e,t))return 0}else if(Ar(t,e))return 0;let s=r;for(const r of e)for(let e=0,n=r.length,o=n-1;e<n;o=e++)for(const n of t)for(let t=0,a=n.length,l=a-1;t<a;l=t++){if(Vi(r[o],r[e],n[l],n[t]))return 0;s=Math.min(s,br(r[o],r[e],n[l],n[t],i));}return s}function Ir(e,t,i,r,n,o,s){if(null===o||null===s)return;const a=_r(fr(r,o),fr(n,s),i);a<t&&e.push({dist:a,range1:o,range2:s});}function Cr(e,t,i,r,n=1/0){let o=Math.min(r.distance(e[0],i[0][0]),n);if(0===o)return o;const s=new or([{dist:0,range1:[0,e.length-1],range2:[0,0]}],ar),a=t?cr:lr,l=mr(i);for(;s.length;){const n=s.pop();if(n.dist>=o)continue;const c=n.range1;if(ur(c)<=a){if(!dr(c,e.length))return NaN;if(t){const t=Mr(e,c,i,r);if(0===(o=Math.min(o,t)))return o}else for(let t=c[0];t<=c[1];++t){const n=Er(e[t],i,r);if(0===(o=Math.min(o,n)))return o}}else {const i=pr(c,t);if(null!==i[0]){const t=_r(fr(e,i[0]),l,r);t<o&&s.push({dist:t,range1:i[0],range2:[0,0]});}if(null!==i[1]){const t=_r(fr(e,i[1]),l,r);t<o&&s.push({dist:t,range1:i[1],range2:[0,0]});}}}return o}function zr(e,t,i,r,n,o=1/0){let s=Math.min(o,n.distance(e[0],i[0]));if(0===s)return s;const a=new or([{dist:0,range1:[0,e.length-1],range2:[0,i.length-1]}],ar),l=t?cr:lr,c=r?cr:lr;for(;a.length;){const o=a.pop();if(o.dist>=s)continue;const h=o.range1,u=o.range2;if(ur(h)<=l&&ur(u)<=c){if(!dr(h,e.length)||!dr(u,i.length))return NaN;if(t&&r?s=Math.min(s,wr(e,h,i,u,n)):t||r?t&&!r?s=Math.min(s,vr(i,u,e,h,n)):!t&&r&&(s=Math.min(s,vr(e,h,i,u,n))):s=Math.min(s,Tr(e,h,i,u,n)),0===s)return s}else {const o=pr(h,t),l=pr(u,r);Ir(a,s,n,e,i,o[0],l[0]),Ir(a,s,n,e,i,o[0],l[1]),Ir(a,s,n,e,i,o[1],l[0]),Ir(a,s,n,e,i,o[1],l[1]);}}return s}function Pr(e,t,i,r,n=1/0){let o=n;const s=fr(e,[0,e.length-1]);for(const n of i)if(!(o!==1/0&&_r(s,fr(n,[0,n.length-1]),r)>=o)&&(o=Math.min(o,zr(e,t,n,!0,r,o)),0===o))return o;return o}function Dr(e,t,i,r,n=1/0){let o=n;const s=fr(e,[0,e.length-1]);for(const n of i){if(o!==1/0&&_r(s,mr(n),r)>=o)continue;const i=Cr(e,t,n,r,o);if(isNaN(i))return i;if(0===(o=Math.min(o,i)))return o}return o}function Rr(e){return "Point"===e||"MultiPoint"===e||"LineString"===e||"MultiLineString"===e||"Polygon"===e||"MultiPolygon"===e}class Lr{constructor(e,t){this.type=Ut,this.geojson=e,this.geometries=t;}static parse(e,t){if(2!==e.length)return t.error(`'distance' expression requires either one argument, but found ' ${e.length-1} instead.`);if(fi(e[1])){const t=e[1];if("FeatureCollection"===t.type){for(let e=0;e<t.features.length;++e)if(Rr(t.features[e].geometry.type))return new Lr(t,t.features[e].geometry)}else if("Feature"===t.type){if(Rr(t.geometry.type))return new Lr(t,t.geometry)}else if(Rr(t.type))return new Lr(t,t)}return t.error("'distance' expression needs to be an array with format ['Distance', GeoJSONObj].")}evaluate(e){const t=e.geometry(),i=e.canonicalID();if(null!=t&&null!=i){if("Point"===e.geometryType())return function(e,t,i){const r=[];for(const i of e)for(const e of i)r.push(gr(e,t));const n=new rr(r[0][1],"meters");return "Point"===i.type||"MultiPoint"===i.type||"LineString"===i.type?zr(r,!1,"Point"===i.type?[i.coordinates]:i.coordinates,"LineString"===i.type,n):"MultiLineString"===i.type?Pr(r,!1,i.coordinates,n):"Polygon"===i.type||"MultiPolygon"===i.type?Dr(r,!1,"Polygon"===i.type?[i.coordinates]:i.coordinates,n):null}(t,i,this.geometries);if("LineString"===e.geometryType())return function(e,t,i){const r=[];for(const i of e){const e=[];for(const r of i)e.push(gr(r,t));r.push(e);}const n=new rr(r[0][0][1],"meters");if("Point"===i.type||"MultiPoint"===i.type||"LineString"===i.type)return Pr("Point"===i.type?[i.coordinates]:i.coordinates,"LineString"===i.type,r,n);if("MultiLineString"===i.type){let e=1/0;for(let t=0;t<i.coordinates.length;t++){const o=Pr(i.coordinates[t],!0,r,n,e);if(isNaN(o))return o;if(0===(e=Math.min(e,o)))return e}return e}if("Polygon"===i.type||"MultiPolygon"===i.type){let e=1/0;for(let t=0;t<r.length;t++){const o=Dr(r[t],!0,"Polygon"===i.type?[i.coordinates]:i.coordinates,n,e);if(isNaN(o))return o;if(0===(e=Math.min(e,o)))return e}return e}return null}(t,i,this.geometries);if("Polygon"===e.geometryType())return function(e,t,i){const r=[];for(const i of function(e,t){const i=e.length;if(i<=1)return [e];const r=[];let n,o;for(let t=0;t<i;t++){const i=Bi(e[t]);0!==i&&(e[t].area=Math.abs(i),void 0===o&&(o=i<0),o===i<0?(n&&r.push(n),n=[e[t]]):n.push(e[t]));}return n&&r.push(n),r}(e)){const e=[];for(let r=0;r<i.length;++r)e.push(yr(i[r],t));r.push(e);}const n=new rr(r[0][0][0][1],"meters");if("Point"===i.type||"MultiPoint"===i.type||"LineString"===i.type)return Dr("Point"===i.type?[i.coordinates]:i.coordinates,"LineString"===i.type,r,n);if("MultiLineString"===i.type){let e=1/0;for(let t=0;t<i.coordinates.length;t++){const o=Dr(i.coordinates[t],!0,r,n,e);if(isNaN(o))return o;if(0===(e=Math.min(e,o)))return e}return e}return "Polygon"===i.type||"MultiPolygon"===i.type?function(e,t,i){let r=1/0;for(const n of e)for(const e of t){const t=Sr(n,e,i,r);if(isNaN(t))return t;if(0===(r=Math.min(r,t)))return r}return r}("Polygon"===i.type?[i.coordinates]:i.coordinates,r,n):null}(t,i,this.geometries);console.warn("Distance Expression: currently only evaluates valid Point/LineString/Polygon geometries.");}else console.warn("Distance Expression: requirs valid feature and canonical information.");return null}eachChild(){}outputDefined(){return !0}serialize(){return ["distance",this.geojson]}}var kr=Lr;function Br(e){if(e instanceof Di){if("get"===e.name&&1===e.args.length)return !1;if("feature-state"===e.name)return !1;if("has"===e.name&&1===e.args.length)return !1;if("properties"===e.name||"geometry-type"===e.name||"id"===e.name)return !1;if(/^filter-/.test(e.name))return !1}if(e instanceof tr)return !1;if(e instanceof kr)return !1;let t=!0;return e.eachChild((e=>{t&&!Br(e)&&(t=!1);})),t}function Or(e){if(e instanceof Di&&"feature-state"===e.name)return !1;let t=!0;return e.eachChild((e=>{t&&!Or(e)&&(t=!1);})),t}function Fr(e){if(e instanceof Di&&"config"===e.name)return !1;let t=!0;return e.eachChild((e=>{t&&!Fr(e)&&(t=!1);})),t}function Nr(e,t){if(e instanceof Di&&t.indexOf(e.name)>=0)return !1;let i=!0;return e.eachChild((e=>{i&&!Nr(e,t)&&(i=!1);})),i}class Ur{constructor(e,t){this.type=t.type,this.name=e,this.boundExpression=t;}static parse(e,t){if(2!==e.length||"string"!=typeof e[1])return t.error("'var' expression requires exactly one string literal argument.");const i=e[1];return t.scope.has(i)?new Ur(i,t.scope.get(i)):t.error(`Unknown variable "${i}". Make sure "${i}" has been bound in an enclosing "let" expression before using it.`,1)}evaluate(e){return this.boundExpression.evaluate(e)}eachChild(){}outputDefined(){return !1}serialize(){return ["var",this.name]}}var jr=Ur;class Vr{constructor(e,t=[],i,r=new Ft,n=[],o){this.registry=e,this.path=t,this.key=t.map((e=>`[${e}]`)).join(""),this.scope=r,this.errors=n,this.expectedType=i,this.options=o;}parse(e,t,i,r,n={}){return t||i?this.concat(t,i,r)._parse(e,n):this._parse(e,n)}_parse(e,t){function i(e,t,i){return "assert"===i?new wi(t,[e]):"coerce"===i?new Ii(t,[e]):e}if(null!==e&&"string"!=typeof e&&"boolean"!=typeof e&&"number"!=typeof e||(e=["literal",e]),Array.isArray(e)){if(0===e.length)return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');const r="string"==typeof e[0]?this.registry[e[0]]:void 0;if(r){let n=r.parse(e,this);if(!n)return null;if(this.expectedType){const e=this.expectedType,r=n.type;if("string"!==e.kind&&"number"!==e.kind&&"boolean"!==e.kind&&"object"!==e.kind&&"array"!==e.kind||"value"!==r.kind)if("color"!==e.kind&&"formatted"!==e.kind&&"resolvedImage"!==e.kind||"value"!==r.kind&&"string"!==r.kind){if(this.checkSubtype(e,r))return null}else n=i(n,e,t.typeAnnotation||"coerce");else n=i(n,e,t.typeAnnotation||"assert");}if(!(n instanceof yi)&&"resolvedImage"!==n.type.kind&&qr(n)){const e=new zi(this.options);try{n=new yi(n.type,n.evaluate(e));}catch(e){return this.error(e.message),null}}return n}return Ii.parse(["to-array",e],this)}return this.error(void 0===e?"'undefined' value invalid. Use null instead.":"object"==typeof e?'Bare objects invalid. Use ["literal", {...}] instead.':`Expected an array, but found ${typeof e} instead.`)}concat(e,t,i){const r="number"==typeof e?this.path.concat(e):this.path,n=i?this.scope.concat(i):this.scope;return new Vr(this.registry,r,t||null,n,this.errors,this.options)}error(e,...t){const i=`${this.key}${t.map((e=>`[${e}]`)).join("")}`;this.errors.push(new Bt(i,e));}checkSubtype(e,t){const i=Jt(e,t);return i&&this.error(i),i}}var Gr=Vr;function qr(e){if(e instanceof jr)return qr(e.boundExpression);if(e instanceof Di&&"error"===e.name)return !1;if(e instanceof Di&&"config"===e.name)return !1;if(e instanceof Ri)return !1;if(e instanceof tr)return !1;if(e instanceof kr)return !1;const t=e instanceof Ii||e instanceof wi;let i=!0;return e.eachChild((e=>{i=t?i&&qr(e):i&&e instanceof yi;})),!!i&&Br(e)&&Nr(e,["zoom","heatmap-density","line-progress","raster-value","sky-radial-progress","accumulated","is-supported-script","pitch","distance-from-center","measure-light"])}function $r(e,t){const i=e.length-1;let r,n,o=0,s=i,a=0;for(;o<=s;)if(a=Math.floor((o+s)/2),r=e[a],n=e[a+1],r<=t){if(a===i||t<n)return a;o=a+1;}else {if(!(r>t))throw new xi("Input is not a number.");s=a-1;}return 0}class Zr{constructor(e,t,i){this.type=e,this.input=t,this.labels=[],this.outputs=[];for(const[e,t]of i)this.labels.push(e),this.outputs.push(t);}static parse(e,t){if(e.length-1<4)return t.error(`Expected at least 4 arguments, but found only ${e.length-1}.`);if((e.length-1)%2!=0)return t.error("Expected an even number of arguments.");const i=t.parse(e[1],1,Ut);if(!i)return null;const r=[];let n=null;t.expectedType&&"value"!==t.expectedType.kind&&(n=t.expectedType);for(let i=1;i<e.length;i+=2){const o=1===i?-1/0:e[i],s=e[i+1],a=i,l=i+1;if("number"!=typeof o)return t.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.',a);if(r.length&&r[r.length-1][0]>=o)return t.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.',a);const c=t.parse(s,l,n);if(!c)return null;n=n||c.type,r.push([o,c]);}return new Zr(n,i,r)}evaluate(e){const t=this.labels,i=this.outputs;if(1===t.length)return i[0].evaluate(e);const r=this.input.evaluate(e);if(r<=t[0])return i[0].evaluate(e);const n=t.length;return r>=t[n-1]?i[n-1].evaluate(e):i[$r(t,r)].evaluate(e)}eachChild(e){e(this.input);for(const t of this.outputs)e(t);}outputDefined(){return this.outputs.every((e=>e.outputDefined()))}serialize(){const e=["step",this.input.serialize()];for(let t=0;t<this.labels.length;t++)t>0&&e.push(this.labels[t]),e.push(this.outputs[t].serialize());return e}}var Wr=Zr;function Hr(e,t,i){return e*(1-i)+t*i}var Xr=Object.freeze({__proto__:null,array:function(e,t,i){return e.map(((e,r)=>Hr(e,t[r],i)))},color:function(e,t,i){return new li(Hr(e.r,t.r,i),Hr(e.g,t.g,i),Hr(e.b,t.b,i),Hr(e.a,t.a,i))},number:Hr});const Yr=.95047,Kr=1.08883,Jr=4/29,Qr=6/29,en=3*Qr*Qr,tn=Qr*Qr*Qr,rn=Math.PI/180,nn=180/Math.PI;function on(e){return e>tn?Math.pow(e,1/3):e/en+Jr}function sn(e){return e>Qr?e*e*e:en*(e-Jr)}function an(e){return 255*(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function ln(e){return (e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function cn(e){const t=ln(e.r),i=ln(e.g),r=ln(e.b),n=on((.4124564*t+.3575761*i+.1804375*r)/Yr),o=on((.2126729*t+.7151522*i+.072175*r)/1);return {l:116*o-16,a:500*(n-o),b:200*(o-on((.0193339*t+.119192*i+.9503041*r)/Kr)),alpha:e.a}}function hn(e){let t=(e.l+16)/116,i=isNaN(e.a)?t:t+e.a/500,r=isNaN(e.b)?t:t-e.b/200;return t=1*sn(t),i=Yr*sn(i),r=Kr*sn(r),new li(an(3.2404542*i-1.5371385*t-.4985314*r),an(-.969266*i+1.8760108*t+.041556*r),an(.0556434*i-.2040259*t+1.0572252*r),e.alpha)}function un(e,t,i){const r=t-e;return e+i*(r>180||r<-180?r-360*Math.round(r/360):r)}const dn={forward:cn,reverse:hn,interpolate:function(e,t,i){return {l:Hr(e.l,t.l,i),a:Hr(e.a,t.a,i),b:Hr(e.b,t.b,i),alpha:Hr(e.alpha,t.alpha,i)}}},pn={forward:function(e){const{l:t,a:i,b:r}=cn(e),n=Math.atan2(r,i)*nn;return {h:n<0?n+360:n,c:Math.sqrt(i*i+r*r),l:t,alpha:e.a}},reverse:function(e){const t=e.h*rn,i=e.c;return hn({l:e.l,a:Math.cos(t)*i,b:Math.sin(t)*i,alpha:e.alpha})},interpolate:function(e,t,i){return {h:un(e.h,t.h,i),c:Hr(e.c,t.c,i),l:Hr(e.l,t.l,i),alpha:Hr(e.alpha,t.alpha,i)}}};var fn=Object.freeze({__proto__:null,hcl:pn,lab:dn});class mn{constructor(e,t,i,r,n){this.type=e,this.operator=t,this.interpolation=i,this.input=r,this.labels=[],this.outputs=[];for(const[e,t]of n)this.labels.push(e),this.outputs.push(t);}static interpolationFactor(e,t,i,r){let n=0;if("exponential"===e.name)n=_n(t,e.base,i,r);else if("linear"===e.name)n=_n(t,1,i,r);else if("cubic-bezier"===e.name){const o=e.controlPoints;n=new m(o[0],o[1],o[2],o[3]).solve(_n(t,1,i,r));}return n}static parse(e,t){let[i,r,n,...o]=e;if(!Array.isArray(r)||0===r.length)return t.error("Expected an interpolation type expression.",1);if("linear"===r[0])r={name:"linear"};else if("exponential"===r[0]){const e=r[1];if("number"!=typeof e)return t.error("Exponential interpolation requires a numeric base.",1,1);r={name:"exponential",base:e};}else {if("cubic-bezier"!==r[0])return t.error(`Unknown interpolation type ${String(r[0])}`,1,0);{const e=r.slice(1);if(4!==e.length||e.some((e=>"number"!=typeof e||e<0||e>1)))return t.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.",1);r={name:"cubic-bezier",controlPoints:e};}}if(e.length-1<4)return t.error(`Expected at least 4 arguments, but found only ${e.length-1}.`);if((e.length-1)%2!=0)return t.error("Expected an even number of arguments.");if(n=t.parse(n,2,Ut),!n)return null;const s=[];let a=null;"interpolate-hcl"===i||"interpolate-lab"===i?a=Gt:t.expectedType&&"value"!==t.expectedType.kind&&(a=t.expectedType);for(let e=0;e<o.length;e+=2){const i=o[e],r=o[e+1],n=e+3,l=e+4;if("number"!=typeof i)return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.',n);if(s.length&&s[s.length-1][0]>=i)return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.',n);const c=t.parse(r,l,a);if(!c)return null;a=a||c.type,s.push([i,c]);}return "number"===a.kind||"color"===a.kind||"array"===a.kind&&"number"===a.itemType.kind&&"number"==typeof a.N?new mn(a,i,r,n,s):t.error(`Type ${Yt(a)} is not interpolatable.`)}evaluate(e){const t=this.labels,i=this.outputs;if(1===t.length)return i[0].evaluate(e);const r=this.input.evaluate(e);if(r<=t[0])return i[0].evaluate(e);const n=t.length;if(r>=t[n-1])return i[n-1].evaluate(e);const o=$r(t,r),s=mn.interpolationFactor(this.interpolation,r,t[o],t[o+1]),a=i[o].evaluate(e),l=i[o+1].evaluate(e);return "interpolate"===this.operator?Xr[this.type.kind.toLowerCase()](a,l,s):"interpolate-hcl"===this.operator?pn.reverse(pn.interpolate(pn.forward(a),pn.forward(l),s)):dn.reverse(dn.interpolate(dn.forward(a),dn.forward(l),s))}eachChild(e){e(this.input);for(const t of this.outputs)e(t);}outputDefined(){return this.outputs.every((e=>e.outputDefined()))}serialize(){let e;e="linear"===this.interpolation.name?["linear"]:"exponential"===this.interpolation.name?1===this.interpolation.base?["linear"]:["exponential",this.interpolation.base]:["cubic-bezier"].concat(this.interpolation.controlPoints);const t=[this.operator,e,this.input.serialize()];for(let e=0;e<this.labels.length;e++)t.push(this.labels[e],this.outputs[e].serialize());return t}}function _n(e,t,i,r){const n=r-i,o=e-i;return 0===n?0:1===t?o/n:(Math.pow(t,o)-1)/(Math.pow(t,n)-1)}var gn=mn;class yn{constructor(e,t){this.type=e,this.args=t;}static parse(e,t){if(e.length<2)return t.error("Expectected at least one argument.");let i=null;const r=t.expectedType;r&&"value"!==r.kind&&(i=r);const n=[];for(const r of e.slice(1)){const e=t.parse(r,1+n.length,i,void 0,{typeAnnotation:"omit"});if(!e)return null;i=i||e.type,n.push(e);}const o=r&&n.some((e=>Jt(r,e.type)));return new yn(o?$t:i,n)}evaluate(e){let t,i=null,r=0;for(const n of this.args){if(r++,i=n.evaluate(e),i&&i instanceof di&&!i.available&&(t||(t=i),i=null,r===this.args.length))return t;if(null!==i)break}return i}eachChild(e){this.args.forEach(e);}outputDefined(){return this.args.every((e=>e.outputDefined()))}serialize(){const e=["coalesce"];return this.eachChild((t=>{e.push(t.serialize());})),e}}var xn=yn;class vn{constructor(e,t){this.type=t.type,this.bindings=[].concat(e),this.result=t;}evaluate(e){return this.result.evaluate(e)}eachChild(e){for(const t of this.bindings)e(t[1]);e(this.result);}static parse(e,t){if(e.length<4)return t.error(`Expected at least 3 arguments, but found ${e.length-1} instead.`);const i=[];for(let r=1;r<e.length-1;r+=2){const n=e[r];if("string"!=typeof n)return t.error(`Expected string, but found ${typeof n} instead.`,r);if(/[^a-zA-Z0-9_]/.test(n))return t.error("Variable names must contain only alphanumeric characters or '_'.",r);const o=t.parse(e[r+1],r+1);if(!o)return null;i.push([n,o]);}const r=t.parse(e[e.length-1],e.length-1,t.expectedType,i);return r?new vn(i,r):null}outputDefined(){return this.result.outputDefined()}serialize(){const e=["let"];for(const[t,i]of this.bindings)e.push(t,i.serialize());return e.push(this.result.serialize()),e}}var bn=vn;class wn{constructor(e,t,i){this.type=e,this.index=t,this.input=i;}static parse(e,t){if(3!==e.length)return t.error(`Expected 2 arguments, but found ${e.length-1} instead.`);const i=t.parse(e[1],1,Ut),r=t.parse(e[2],2,Xt(t.expectedType||$t));return i&&r?new wn(r.type.itemType,i,r):null}evaluate(e){const t=this.index.evaluate(e),i=this.input.evaluate(e);if(t<0)throw new xi(`Array index out of bounds: ${t} < 0.`);if(t>=i.length)throw new xi(`Array index out of bounds: ${t} > ${i.length-1}.`);if(t!==Math.floor(t))throw new xi(`Array index must be an integer, but found ${t} instead.`);return i[t]}eachChild(e){e(this.index),e(this.input);}outputDefined(){return !1}serialize(){return ["at",this.index.serialize(),this.input.serialize()]}}var Tn=wn;class En{constructor(e,t){this.type=Vt,this.needle=e,this.haystack=t;}static parse(e,t){if(3!==e.length)return t.error(`Expected 2 arguments, but found ${e.length-1} instead.`);const i=t.parse(e[1],1,$t),r=t.parse(e[2],2,$t);return i&&r?Qt(i.type,[Vt,jt,Ut,Nt,$t])?new En(i,r):t.error(`Expected first argument to be of type boolean, string, number or null, but found ${Yt(i.type)} instead`):null}evaluate(e){const t=this.needle.evaluate(e),i=this.haystack.evaluate(e);if(null==i)return !1;if(!ei(t,["boolean","string","number","null"]))throw new xi(`Expected first argument to be of type boolean, string, number or null, but found ${Yt(mi(t))} instead.`);if(!ei(i,["string","array"]))throw new xi(`Expected second argument to be of type array or string, but found ${Yt(mi(i))} instead.`);return i.indexOf(t)>=0}eachChild(e){e(this.needle),e(this.haystack);}outputDefined(){return !0}serialize(){return ["in",this.needle.serialize(),this.haystack.serialize()]}}var Mn=En;class An{constructor(e,t,i){this.type=Ut,this.needle=e,this.haystack=t,this.fromIndex=i;}static parse(e,t){if(e.length<=2||e.length>=5)return t.error(`Expected 3 or 4 arguments, but found ${e.length-1} instead.`);const i=t.parse(e[1],1,$t),r=t.parse(e[2],2,$t);if(!i||!r)return null;if(!Qt(i.type,[Vt,jt,Ut,Nt,$t]))return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${Yt(i.type)} instead`);if(4===e.length){const n=t.parse(e[3],3,Ut);return n?new An(i,r,n):null}return new An(i,r)}evaluate(e){const t=this.needle.evaluate(e),i=this.haystack.evaluate(e);if(!ei(t,["boolean","string","number","null"]))throw new xi(`Expected first argument to be of type boolean, string, number or null, but found ${Yt(mi(t))} instead.`);if(!ei(i,["string","array"]))throw new xi(`Expected second argument to be of type array or string, but found ${Yt(mi(i))} instead.`);if(this.fromIndex){const r=this.fromIndex.evaluate(e);return i.indexOf(t,r)}return i.indexOf(t)}eachChild(e){e(this.needle),e(this.haystack),this.fromIndex&&e(this.fromIndex);}outputDefined(){return !1}serialize(){if(null!=this.fromIndex&&void 0!==this.fromIndex){const e=this.fromIndex.serialize();return ["index-of",this.needle.serialize(),this.haystack.serialize(),e]}return ["index-of",this.needle.serialize(),this.haystack.serialize()]}}var Sn=An;class In{constructor(e,t,i,r,n,o){this.inputType=e,this.type=t,this.input=i,this.cases=r,this.outputs=n,this.otherwise=o;}static parse(e,t){if(e.length<5)return t.error(`Expected at least 4 arguments, but found only ${e.length-1}.`);if(e.length%2!=1)return t.error("Expected an even number of arguments.");let i,r;t.expectedType&&"value"!==t.expectedType.kind&&(r=t.expectedType);const n={},o=[];for(let s=2;s<e.length-1;s+=2){let a=e[s];const l=e[s+1];Array.isArray(a)||(a=[a]);const c=t.concat(s);if(0===a.length)return c.error("Expected at least one branch label.");for(const e of a){if("number"!=typeof e&&"string"!=typeof e)return c.error("Branch labels must be numbers or strings.");if("number"==typeof e&&Math.abs(e)>Number.MAX_SAFE_INTEGER)return c.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);if("number"==typeof e&&Math.floor(e)!==e)return c.error("Numeric branch labels must be integer values.");if(i){if(c.checkSubtype(i,mi(e)))return null}else i=mi(e);if(void 0!==n[String(e)])return c.error("Branch labels must be unique.");n[String(e)]=o.length;}const h=t.parse(l,s,r);if(!h)return null;r=r||h.type,o.push(h);}const s=t.parse(e[1],1,$t);if(!s)return null;const a=t.parse(e[e.length-1],e.length-1,r);return a?"value"!==s.type.kind&&t.concat(1).checkSubtype(i,s.type)?null:new In(i,r,s,n,o,a):null}evaluate(e){const t=this.input.evaluate(e);return (mi(t)===this.inputType&&this.outputs[this.cases[t]]||this.otherwise).evaluate(e)}eachChild(e){e(this.input),this.outputs.forEach(e),e(this.otherwise);}outputDefined(){return this.outputs.every((e=>e.outputDefined()))&&this.otherwise.outputDefined()}serialize(){const e=["match",this.input.serialize()],t=Object.keys(this.cases).sort(),i=[],r={};for(const e of t){const t=r[this.cases[e]];void 0===t?(r[this.cases[e]]=i.length,i.push([this.cases[e],[e]])):i[t][1].push(e);}const n=e=>"number"===this.inputType.kind?Number(e):e;for(const[t,r]of i)e.push(1===r.length?n(r[0]):r.map(n)),e.push(this.outputs[t].serialize());return e.push(this.otherwise.serialize()),e}}var Cn=In;class zn{constructor(e,t,i){this.type=e,this.branches=t,this.otherwise=i;}static parse(e,t){if(e.length<4)return t.error(`Expected at least 3 arguments, but found only ${e.length-1}.`);if(e.length%2!=0)return t.error("Expected an odd number of arguments.");let i;t.expectedType&&"value"!==t.expectedType.kind&&(i=t.expectedType);const r=[];for(let n=1;n<e.length-1;n+=2){const o=t.parse(e[n],n,Vt);if(!o)return null;const s=t.parse(e[n+1],n+1,i);if(!s)return null;r.push([o,s]),i=i||s.type;}const n=t.parse(e[e.length-1],e.length-1,i);return n?new zn(i,r,n):null}evaluate(e){for(const[t,i]of this.branches)if(t.evaluate(e))return i.evaluate(e);return this.otherwise.evaluate(e)}eachChild(e){for(const[t,i]of this.branches)e(t),e(i);e(this.otherwise);}outputDefined(){return this.branches.every((([e,t])=>t.outputDefined()))&&this.otherwise.outputDefined()}serialize(){const e=["case"];return this.eachChild((t=>{e.push(t.serialize());})),e}}var Pn=zn;class Dn{constructor(e,t,i,r){this.type=e,this.input=t,this.beginIndex=i,this.endIndex=r;}static parse(e,t){if(e.length<=2||e.length>=5)return t.error(`Expected 3 or 4 arguments, but found ${e.length-1} instead.`);const i=t.parse(e[1],1,$t),r=t.parse(e[2],2,Ut);if(!i||!r)return null;if(!Qt(i.type,[Xt($t),jt,$t]))return t.error(`Expected first argument to be of type array or string, but found ${Yt(i.type)} instead`);if(4===e.length){const n=t.parse(e[3],3,Ut);return n?new Dn(i.type,i,r,n):null}return new Dn(i.type,i,r)}evaluate(e){const t=this.input.evaluate(e),i=this.beginIndex.evaluate(e);if(!ei(t,["string","array"]))throw new xi(`Expected first argument to be of type array or string, but found ${Yt(mi(t))} instead.`);if(this.endIndex){const r=this.endIndex.evaluate(e);return t.slice(i,r)}return t.slice(i)}eachChild(e){e(this.input),e(this.beginIndex),this.endIndex&&e(this.endIndex);}outputDefined(){return !1}serialize(){if(null!=this.endIndex&&void 0!==this.endIndex){const e=this.endIndex.serialize();return ["slice",this.input.serialize(),this.beginIndex.serialize(),e]}return ["slice",this.input.serialize(),this.beginIndex.serialize()]}}var Rn=Dn;function Ln(e,t){return "=="===e||"!="===e?"boolean"===t.kind||"string"===t.kind||"number"===t.kind||"null"===t.kind||"value"===t.kind:"string"===t.kind||"number"===t.kind||"value"===t.kind}function kn(e,t,i,r){return 0===r.compare(t,i)}function Bn(e,t,i){const r="=="!==e&&"!="!==e;return class n{constructor(e,t,i){this.type=Vt,this.lhs=e,this.rhs=t,this.collator=i,this.hasUntypedArgument="value"===e.type.kind||"value"===t.type.kind;}static parse(e,t){if(3!==e.length&&4!==e.length)return t.error("Expected two or three arguments.");const i=e[0];let o=t.parse(e[1],1,$t);if(!o)return null;if(!Ln(i,o.type))return t.concat(1).error(`"${i}" comparisons are not supported for type '${Yt(o.type)}'.`);let s=t.parse(e[2],2,$t);if(!s)return null;if(!Ln(i,s.type))return t.concat(2).error(`"${i}" comparisons are not supported for type '${Yt(s.type)}'.`);if(o.type.kind!==s.type.kind&&"value"!==o.type.kind&&"value"!==s.type.kind)return t.error(`Cannot compare types '${Yt(o.type)}' and '${Yt(s.type)}'.`);r&&("value"===o.type.kind&&"value"!==s.type.kind?o=new wi(s.type,[o]):"value"!==o.type.kind&&"value"===s.type.kind&&(s=new wi(o.type,[s])));let a=null;if(4===e.length){if("string"!==o.type.kind&&"string"!==s.type.kind&&"value"!==o.type.kind&&"value"!==s.type.kind)return t.error("Cannot use collator to compare non-string types.");if(a=t.parse(e[3],3,Zt),!a)return null}return new n(o,s,a)}evaluate(n){const o=this.lhs.evaluate(n),s=this.rhs.evaluate(n);if(r&&this.hasUntypedArgument){const t=mi(o),i=mi(s);if(t.kind!==i.kind||"string"!==t.kind&&"number"!==t.kind)throw new xi(`Expected arguments for "${e}" to be (string, string) or (number, number), but found (${t.kind}, ${i.kind}) instead.`)}if(this.collator&&!r&&this.hasUntypedArgument){const e=mi(o),i=mi(s);if("string"!==e.kind||"string"!==i.kind)return t(n,o,s)}return this.collator?i(n,o,s,this.collator.evaluate(n)):t(n,o,s)}eachChild(e){e(this.lhs),e(this.rhs),this.collator&&e(this.collator);}outputDefined(){return !0}serialize(){const t=[e];return this.eachChild((e=>{t.push(e.serialize());})),t}}}const On=Bn("==",(function(e,t,i){return t===i}),kn),Fn=Bn("!=",(function(e,t,i){return t!==i}),(function(e,t,i,r){return !kn(0,t,i,r)})),Nn=Bn("<",(function(e,t,i){return t<i}),(function(e,t,i,r){return r.compare(t,i)<0})),Un=Bn(">",(function(e,t,i){return t>i}),(function(e,t,i,r){return r.compare(t,i)>0})),jn=Bn("<=",(function(e,t,i){return t<=i}),(function(e,t,i,r){return r.compare(t,i)<=0})),Vn=Bn(">=",(function(e,t,i){return t>=i}),(function(e,t,i,r){return r.compare(t,i)>=0}));class Gn{constructor(e,t,i,r,n,o){this.type=jt,this.number=e,this.locale=t,this.currency=i,this.unit=r,this.minFractionDigits=n,this.maxFractionDigits=o;}static parse(e,t){if(3!==e.length)return t.error("Expected two arguments.");const i=t.parse(e[1],1,Ut);if(!i)return null;const r=e[2];if("object"!=typeof r||Array.isArray(r))return t.error("NumberFormat options argument must be an object.");let n=null;if(r.locale&&(n=t.parse(r.locale,1,jt),!n))return null;let o=null;if(r.currency&&(o=t.parse(r.currency,1,jt),!o))return null;let s=null;if(r.unit&&(s=t.parse(r.unit,1,jt),!s))return null;let a=null;if(r["min-fraction-digits"]&&(a=t.parse(r["min-fraction-digits"],1,Ut),!a))return null;let l=null;return r["max-fraction-digits"]&&(l=t.parse(r["max-fraction-digits"],1,Ut),!l)?null:new Gn(i,n,o,s,a,l)}evaluate(e){return new Intl.NumberFormat(this.locale?this.locale.evaluate(e):[],{style:(this.currency?"currency":this.unit&&"unit")||"decimal",currency:this.currency?this.currency.evaluate(e):void 0,unit:this.unit?this.unit.evaluate(e):void 0,minimumFractionDigits:this.minFractionDigits?this.minFractionDigits.evaluate(e):void 0,maximumFractionDigits:this.maxFractionDigits?this.maxFractionDigits.evaluate(e):void 0}).format(this.number.evaluate(e))}eachChild(e){e(this.number),this.locale&&e(this.locale),this.currency&&e(this.currency),this.unit&&e(this.unit),this.minFractionDigits&&e(this.minFractionDigits),this.maxFractionDigits&&e(this.maxFractionDigits);}outputDefined(){return !1}serialize(){const e={};return this.locale&&(e.locale=this.locale.serialize()),this.currency&&(e.currency=this.currency.serialize()),this.unit&&(e.unit=this.unit.serialize()),this.minFractionDigits&&(e["min-fraction-digits"]=this.minFractionDigits.serialize()),this.maxFractionDigits&&(e["max-fraction-digits"]=this.maxFractionDigits.serialize()),["number-format",this.number.serialize(),e]}}class qn{constructor(e){this.type=Ut,this.input=e;}static parse(e,t){if(2!==e.length)return t.error(`Expected 1 argument, but found ${e.length-1} instead.`);const i=t.parse(e[1],1);return i?"array"!==i.type.kind&&"string"!==i.type.kind&&"value"!==i.type.kind?t.error(`Expected argument of type string or array, but found ${Yt(i.type)} instead.`):new qn(i):null}evaluate(e){const t=this.input.evaluate(e);if("string"==typeof t)return t.length;if(Array.isArray(t))return t.length;throw new xi(`Expected value to be of type string or array, but found ${Yt(mi(t))} instead.`)}eachChild(e){e(this.input);}outputDefined(){return !1}serialize(){const e=["length"];return this.eachChild((t=>{e.push(t.serialize());})),e}}function $n(e){return function(){e=1831565813+(e|=0)|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const Zn={"==":On,"!=":Fn,">":Un,"<":Nn,">=":Vn,"<=":jn,array:wi,at:Tn,boolean:wi,case:Pn,coalesce:xn,collator:Ri,format:Ti,image:Ei,in:Mn,"index-of":Sn,interpolate:gn,"interpolate-hcl":gn,"interpolate-lab":gn,length:qn,let:bn,literal:yi,match:Cn,number:wi,"number-format":Gn,object:wi,slice:Rn,step:Wr,string:wi,"to-boolean":Ii,"to-color":Ii,"to-number":Ii,"to-string":Ii,var:jr,within:tr,distance:kr};function Wn(e,[t,i,r,n]){t=t.evaluate(e),i=i.evaluate(e),r=r.evaluate(e);const o=n?n.evaluate(e):1,s=pi(t,i,r,o);if(s)throw new xi(s);return new li(t/255*o,i/255*o,r/255*o,o)}function Hn(e,[t,i,r,n]){t=t.evaluate(e),i=i.evaluate(e),r=r.evaluate(e);const o=n?n.evaluate(e):1,s=function(e,t,i,r){return "number"==typeof e&&e>=0&&e<=360?"number"==typeof t&&t>=0&&t<=100&&"number"==typeof i&&i>=0&&i<=100?void 0===r||"number"==typeof r&&r>=0&&r<=1?null:`Invalid hsla value [${[e,t,i,r].join(", ")}]: 'a' must be between 0 and 1.`:`Invalid hsla value [${("number"==typeof r?[e,t,i,r]:[e,t,i]).join(", ")}]: 's', and 'l' must be between 0 and 100.`:`Invalid hsla value [${("number"==typeof r?[e,t,i,r]:[e,t,i]).join(", ")}]: 'h' must be between 0 and 360.`}(t,i,r,o);if(s)throw new xi(s);const a=`hsla(${t}, ${i}%, ${r}%, ${o})`,l=li.parse(a);if(!l)throw new xi(`Failed to parse HSLA color: ${a}`);return l}function Xn(e,t){return e in t}function Yn(e,t){const i=t[e];return void 0===i?null:i}function Kn(e,t,i){i.length&&(t+=`${i}`);const r=e.getConfig(t);return r?r.evaluate(e):null}function Jn(e){return {type:e}}Di.register(Zn,{error:[{kind:"error"},[jt],(e,[t])=>{throw new xi(t.evaluate(e))}],typeof:[jt,[$t],(e,[t])=>Yt(mi(t.evaluate(e)))],"to-rgba":[Xt(Ut,4),[Gt],(e,[t])=>t.evaluate(e).toArray()],rgb:[Gt,[Ut,Ut,Ut],Wn],rgba:[Gt,[Ut,Ut,Ut,Ut],Wn],hsl:[Gt,[Ut,Ut,Ut],Hn],hsla:[Gt,[Ut,Ut,Ut,Ut],Hn],has:{type:Vt,overloads:[[[jt],(e,[t])=>Xn(t.evaluate(e),e.properties())],[[jt,qt],(e,[t,i])=>Xn(t.evaluate(e),i.evaluate(e))]]},get:{type:$t,overloads:[[[jt],(e,[t])=>Yn(t.evaluate(e),e.properties())],[[jt,qt],(e,[t,i])=>Yn(t.evaluate(e),i.evaluate(e))]]},config:{type:$t,overloads:[[[jt],(e,[t])=>Kn(e,t.evaluate(e),"")],[[jt,jt],(e,[t,i])=>Kn(e,t.evaluate(e),i.evaluate(e))]]},"feature-state":[$t,[jt],(e,[t])=>Yn(t.evaluate(e),e.featureState||{})],properties:[qt,[],e=>e.properties()],"geometry-type":[jt,[],e=>e.geometryType()],id:[$t,[],e=>e.id()],zoom:[Ut,[],e=>e.globals.zoom],pitch:[Ut,[],e=>e.globals.pitch||0],"distance-from-center":[Ut,[],e=>e.distanceFromCenter()],"measure-light":[Ut,[jt],(e,[t])=>e.measureLight(t.evaluate(e))],"heatmap-density":[Ut,[],e=>e.globals.heatmapDensity||0],"line-progress":[Ut,[],e=>e.globals.lineProgress||0],"raster-value":[Ut,[],e=>e.globals.rasterValue||0],"sky-radial-progress":[Ut,[],e=>e.globals.skyRadialProgress||0],accumulated:[$t,[],e=>void 0===e.globals.accumulated?null:e.globals.accumulated],"+":[Ut,Jn(Ut),(e,t)=>{let i=0;for(const r of t)i+=r.evaluate(e);return i}],"*":[Ut,Jn(Ut),(e,t)=>{let i=1;for(const r of t)i*=r.evaluate(e);return i}],"-":{type:Ut,overloads:[[[Ut,Ut],(e,[t,i])=>t.evaluate(e)-i.evaluate(e)],[[Ut],(e,[t])=>-t.evaluate(e)]]},"/":[Ut,[Ut,Ut],(e,[t,i])=>t.evaluate(e)/i.evaluate(e)],"%":[Ut,[Ut,Ut],(e,[t,i])=>t.evaluate(e)%i.evaluate(e)],ln2:[Ut,[],()=>Math.LN2],pi:[Ut,[],()=>Math.PI],e:[Ut,[],()=>Math.E],"^":[Ut,[Ut,Ut],(e,[t,i])=>Math.pow(t.evaluate(e),i.evaluate(e))],sqrt:[Ut,[Ut],(e,[t])=>Math.sqrt(t.evaluate(e))],log10:[Ut,[Ut],(e,[t])=>Math.log(t.evaluate(e))/Math.LN10],ln:[Ut,[Ut],(e,[t])=>Math.log(t.evaluate(e))],log2:[Ut,[Ut],(e,[t])=>Math.log(t.evaluate(e))/Math.LN2],sin:[Ut,[Ut],(e,[t])=>Math.sin(t.evaluate(e))],cos:[Ut,[Ut],(e,[t])=>Math.cos(t.evaluate(e))],tan:[Ut,[Ut],(e,[t])=>Math.tan(t.evaluate(e))],asin:[Ut,[Ut],(e,[t])=>Math.asin(t.evaluate(e))],acos:[Ut,[Ut],(e,[t])=>Math.acos(t.evaluate(e))],atan:[Ut,[Ut],(e,[t])=>Math.atan(t.evaluate(e))],min:[Ut,Jn(Ut),(e,t)=>Math.min(...t.map((t=>t.evaluate(e))))],max:[Ut,Jn(Ut),(e,t)=>Math.max(...t.map((t=>t.evaluate(e))))],abs:[Ut,[Ut],(e,[t])=>Math.abs(t.evaluate(e))],round:[Ut,[Ut],(e,[t])=>{const i=t.evaluate(e);return i<0?-Math.round(-i):Math.round(i)}],floor:[Ut,[Ut],(e,[t])=>Math.floor(t.evaluate(e))],ceil:[Ut,[Ut],(e,[t])=>Math.ceil(t.evaluate(e))],"filter-==":[Vt,[jt,$t],(e,[t,i])=>e.properties()[t.value]===i.value],"filter-id-==":[Vt,[$t],(e,[t])=>e.id()===t.value],"filter-type-==":[Vt,[jt],(e,[t])=>e.geometryType()===t.value],"filter-<":[Vt,[jt,$t],(e,[t,i])=>{const r=e.properties()[t.value],n=i.value;return typeof r==typeof n&&r<n}],"filter-id-<":[Vt,[$t],(e,[t])=>{const i=e.id(),r=t.value;return typeof i==typeof r&&i<r}],"filter->":[Vt,[jt,$t],(e,[t,i])=>{const r=e.properties()[t.value],n=i.value;return typeof r==typeof n&&r>n}],"filter-id->":[Vt,[$t],(e,[t])=>{const i=e.id(),r=t.value;return typeof i==typeof r&&i>r}],"filter-<=":[Vt,[jt,$t],(e,[t,i])=>{const r=e.properties()[t.value],n=i.value;return typeof r==typeof n&&r<=n}],"filter-id-<=":[Vt,[$t],(e,[t])=>{const i=e.id(),r=t.value;return typeof i==typeof r&&i<=r}],"filter->=":[Vt,[jt,$t],(e,[t,i])=>{const r=e.properties()[t.value],n=i.value;return typeof r==typeof n&&r>=n}],"filter-id->=":[Vt,[$t],(e,[t])=>{const i=e.id(),r=t.value;return typeof i==typeof r&&i>=r}],"filter-has":[Vt,[$t],(e,[t])=>t.value in e.properties()],"filter-has-id":[Vt,[],e=>null!==e.id()&&void 0!==e.id()],"filter-type-in":[Vt,[Xt(jt)],(e,[t])=>t.value.indexOf(e.geometryType())>=0],"filter-id-in":[Vt,[Xt($t)],(e,[t])=>t.value.indexOf(e.id())>=0],"filter-in-small":[Vt,[jt,Xt($t)],(e,[t,i])=>i.value.indexOf(e.properties()[t.value])>=0],"filter-in-large":[Vt,[jt,Xt($t)],(e,[t,i])=>function(e,t,i,r){for(;i<=r;){const n=i+r>>1;if(t[n]===e)return !0;t[n]>e?r=n-1:i=n+1;}return !1}(e.properties()[t.value],i.value,0,i.value.length-1)],all:{type:Vt,overloads:[[[Vt,Vt],(e,[t,i])=>t.evaluate(e)&&i.evaluate(e)],[Jn(Vt),(e,t)=>{for(const i of t)if(!i.evaluate(e))return !1;return !0}]]},any:{type:Vt,overloads:[[[Vt,Vt],(e,[t,i])=>t.evaluate(e)||i.evaluate(e)],[Jn(Vt),(e,t)=>{for(const i of t)if(i.evaluate(e))return !0;return !1}]]},"!":[Vt,[Vt],(e,[t])=>!t.evaluate(e)],"is-supported-script":[Vt,[jt],(e,[t])=>{const i=e.globals&&e.globals.isSupportedScript;return !i||i(t.evaluate(e))}],upcase:[jt,[jt],(e,[t])=>t.evaluate(e).toUpperCase()],downcase:[jt,[jt],(e,[t])=>t.evaluate(e).toLowerCase()],concat:[jt,Jn($t),(e,t)=>t.map((t=>_i(t.evaluate(e)))).join("")],"resolved-locale":[jt,[Zt],(e,[t])=>t.evaluate(e).resolvedLocale()],random:[Ut,[Ut,Ut,$t],(e,t)=>{const[i,r,n]=t.map((t=>t.evaluate(e)));if(i>r)return i;if(i===r)return i;let o;if("string"==typeof n)o=function(e){let t=0;if(0===e.length)return t;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t&=t;return t}(n);else {if("number"!=typeof n)throw new xi(`Invalid seed input: ${n}`);o=n;}return i+$n(o)()*(r-i)}]});var Qn=Zn;function eo(e){return {result:"success",value:e}}function to(e){return {result:"error",value:e}}function io(e,t){return !!e&&!!e.parameters&&e.parameters.indexOf(t)>-1}function ro(e){return "data-driven"===e["property-type"]}function no(e){return io(e.expression,"measure-light")}function oo(e){return io(e.expression,"zoom")}function so(e){return !!e.expression&&e.expression.interpolated}function ao(e){return "object"==typeof e&&null!==e&&!Array.isArray(e)}function lo(e){return e}function co(e,t){const i="color"===t.type,r=e.stops&&"object"==typeof e.stops[0][0],n=r||!(r||void 0!==e.property),o=e.type||(so(t)?"exponential":"interval");if(i&&((e=Pt({},e)).stops&&(e.stops=e.stops.map((e=>[e[0],li.parse(e[1])]))),e.default=li.parse(e.default?e.default:t.default)),e.colorSpace&&"rgb"!==e.colorSpace&&!fn[e.colorSpace])throw new Error(`Unknown color space: ${e.colorSpace}`);let s,a,l;if("exponential"===o)s=fo;else if("interval"===o)s=po;else if("categorical"===o){s=uo,a=Object.create(null);for(const t of e.stops)a[t[0]]=t[1];l=typeof e.stops[0][0];}else {if("identity"!==o)throw new Error(`Unknown function type "${o}"`);s=mo;}if(r){const i={},r=[];for(let t=0;t<e.stops.length;t++){const n=e.stops[t],o=n[0].zoom;void 0===i[o]&&(i[o]={zoom:o,type:e.type,property:e.property,default:e.default,stops:[]},r.push(o)),i[o].stops.push([n[0].value,n[1]]);}const n=[];for(const e of r)n.push([i[e].zoom,co(i[e],t)]);const o={name:"linear"};return {kind:"composite",interpolationType:o,interpolationFactor:gn.interpolationFactor.bind(void 0,o),zoomStops:n.map((e=>e[0])),evaluate:({zoom:i},r)=>fo({stops:n,base:e.base},t,i).evaluate(i,r)}}if(n){const i="exponential"===o?{name:"exponential",base:void 0!==e.base?e.base:1}:null;return {kind:"camera",interpolationType:i,interpolationFactor:gn.interpolationFactor.bind(void 0,i),zoomStops:e.stops.map((e=>e[0])),evaluate:({zoom:i})=>s(e,t,i,a,l)}}return {kind:"source",evaluate(i,r){const n=r&&r.properties?r.properties[e.property]:void 0;return void 0===n?ho(e.default,t.default):s(e,t,n,a,l)}}}function ho(e,t,i){return void 0!==e?e:void 0!==t?t:void 0!==i?i:void 0}function uo(e,t,i,r,n){return ho(typeof i===n?r[i]:void 0,e.default,t.default)}function po(e,t,i){if("number"!==Mi(i))return ho(e.default,t.default);const r=e.stops.length;if(1===r)return e.stops[0][1];if(i<=e.stops[0][0])return e.stops[0][1];if(i>=e.stops[r-1][0])return e.stops[r-1][1];const n=$r(e.stops.map((e=>e[0])),i);return e.stops[n][1]}function fo(e,t,i){const r=void 0!==e.base?e.base:1;if("number"!==Mi(i))return ho(e.default,t.default);const n=e.stops.length;if(1===n)return e.stops[0][1];if(i<=e.stops[0][0])return e.stops[0][1];if(i>=e.stops[n-1][0])return e.stops[n-1][1];const o=$r(e.stops.map((e=>e[0])),i),s=function(e,t,i,r){const n=r-i,o=e-i;return 0===n?0:1===t?o/n:(Math.pow(t,o)-1)/(Math.pow(t,n)-1)}(i,r,e.stops[o][0],e.stops[o+1][0]),a=e.stops[o][1],l=e.stops[o+1][1];let c=Xr[t.type]||lo;if(e.colorSpace&&"rgb"!==e.colorSpace){const t=fn[e.colorSpace];c=(e,i)=>t.reverse(t.interpolate(t.forward(e),t.forward(i),s));}return "function"==typeof a.evaluate?{evaluate(...e){const t=a.evaluate.apply(void 0,e),i=l.evaluate.apply(void 0,e);if(void 0!==t&&void 0!==i)return c(t,i,s)}}:c(a,l,s)}function mo(e,t,i){return "color"===t.type?i=li.parse(i):"formatted"===t.type?i=ui.fromString(i.toString()):"resolvedImage"===t.type?i=di.fromString(i.toString()):Mi(i)===t.type||"enum"===t.type&&t.values[i]||(i=void 0),ho(i,e.default,t.default)}class _o{constructor(e,t,i){this.expression=e,this._warningHistory={},this._evaluator=new zi(i),this._defaultValue=t?function(e){return "color"===e.type&&(ao(e.default)||Array.isArray(e.default))?new li(0,0,0,0):"color"===e.type?li.parse(e.default)||null:void 0===e.default?null:e.default}(t):null,this._enumValues=t&&"enum"===t.type?t.values:null;}evaluateWithoutErrorHandling(e,t,i,r,n,o,s,a){return this._evaluator.globals=e,this._evaluator.feature=t,this._evaluator.featureState=i,this._evaluator.canonical=r||null,this._evaluator.availableImages=n||null,this._evaluator.formattedSection=o,this._evaluator.featureTileCoord=s||null,this._evaluator.featureDistanceData=a||null,this.expression.evaluate(this._evaluator)}evaluate(e,t,i,r,n,o,s,a){this._evaluator.globals=e,this._evaluator.feature=t||null,this._evaluator.featureState=i||null,this._evaluator.canonical=r||null,this._evaluator.availableImages=n||null,this._evaluator.formattedSection=o||null,this._evaluator.featureTileCoord=s||null,this._evaluator.featureDistanceData=a||null;try{const e=this.expression.evaluate(this._evaluator);if(null==e||"number"==typeof e&&e!=e)return this._defaultValue;if(this._enumValues&&!(e in this._enumValues))throw new xi(`Expected value to be one of ${Object.keys(this._enumValues).map((e=>JSON.stringify(e))).join(", ")}, but found ${JSON.stringify(e)} instead.`);return e}catch(e){return this._warningHistory[e.message]||(this._warningHistory[e.message]=!0,"undefined"!=typeof console&&console.warn(e.message)),this._defaultValue}}}function go(e){return Array.isArray(e)&&e.length>0&&"string"==typeof e[0]&&e[0]in Qn}function yo(e,t,i){const r=new Gr(Qn,[],t?function(e){const t={color:Gt,string:jt,number:Ut,enum:jt,boolean:Vt,formatted:Wt,resolvedImage:Ht};return "array"===e.type?Xt(t[e.value]||$t,e.length):t[e.type]}(t):void 0,void 0,void 0,i),n=r.parse(e,void 0,void 0,void 0,t&&"string"===t.type?{typeAnnotation:"coerce"}:void 0);return n?eo(new _o(n,t,i)):to(r.errors)}class xo{constructor(e,t,i){this.kind=e,this._styleExpression=t,this.isLightConstant=i,this.isStateDependent="constant"!==e&&!Or(t.expression),this.isConfigDependent=!Fr(t.expression);}evaluateWithoutErrorHandling(e,t,i,r,n,o){return this._styleExpression.evaluateWithoutErrorHandling(e,t,i,r,n,o)}evaluate(e,t,i,r,n,o){return this._styleExpression.evaluate(e,t,i,r,n,o)}}class vo{constructor(e,t,i,r,n){this.kind=e,this.zoomStops=i,this._styleExpression=t,this.isStateDependent="camera"!==e&&!Or(t.expression),this.isLightConstant=n,this.isConfigDependent=!Fr(t.expression),this.interpolationType=r;}evaluateWithoutErrorHandling(e,t,i,r,n,o){return this._styleExpression.evaluateWithoutErrorHandling(e,t,i,r,n,o)}evaluate(e,t,i,r,n,o){return this._styleExpression.evaluate(e,t,i,r,n,o)}interpolationFactor(e,t,i){return this.interpolationType?gn.interpolationFactor(this.interpolationType,e,t,i):0}}function bo(e,t,i){if("error"===(e=yo(e,t,i)).result)return e;const r=e.value.expression,n=Br(r);if(!n&&!ro(t))return to([new Bt("","data expressions not supported")]);const o=Nr(r,["zoom","pitch","distance-from-center"]);if(!o&&!oo(t))return to([new Bt("","zoom expressions not supported")]);const s=Nr(r,["measure-light"]);if(!s&&!no(t))return to([new Bt("","measure-light expression not supported")]);const a=t.expression&&t.expression.relaxZoomRestriction,l=To(r);return l||o||a?l instanceof Bt?to([l]):l instanceof gn&&!so(t)?to([new Bt("",'"interpolate" expressions cannot be used with this property')]):eo(l?new vo(n?"camera":"composite",e.value,l.labels,l instanceof gn?l.interpolation:void 0,s):new xo(n?"constant":"source",e.value,s)):to([new Bt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression, or in the properties of atmosphere.')])}class wo{constructor(e,t){this._parameters=e,this._specification=t,Pt(this,co(this._parameters,this._specification));}static deserialize(e){return new wo(e._parameters,e._specification)}static serialize(e){return {_parameters:e._parameters,_specification:e._specification}}}function To(e){let t=null;if(e instanceof bn)t=To(e.result);else if(e instanceof xn){for(const i of e.args)if(t=To(i),t)break}else (e instanceof Wr||e instanceof gn)&&e.input instanceof Di&&"zoom"===e.input.name&&(t=e);return t instanceof Bt||e.eachChild((e=>{const i=To(e);i instanceof Bt?t=i:t&&i&&t!==i&&(t=new Bt("",'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));})),t}function Eo(e){const t=e.key,i=e.value,r=e.valueSpec||{},n=e.objectElementValidators||{},o=e.style,s=e.styleSpec;let a=[];const l=Mi(i);if("object"!==l)return [new Dt(t,i,`object expected, ${l} found`)];for(const e in i){const l=e.split(".")[0];let c;n[l]?c=n[l]:r[l]?c=ss:n["*"]?c=n["*"]:r["*"]&&(c=ss),c?a=a.concat(c({key:(t?`${t}.`:t)+e,value:i[e],valueSpec:r[l]||r["*"],style:o,styleSpec:s,object:i,objectKey:e},i)):a.push(new Dt(t,i[e],`unknown property "${e}"`));}for(const e in r)n[e]||r[e].required&&void 0===r[e].default&&void 0===i[e]&&a.push(new Dt(t,i,`missing required property "${e}"`));return a}function Mo(e){const t=e.value,i=e.valueSpec,r=e.style,n=e.styleSpec,o=e.key,s=e.arrayElementValidator||ss;if("array"!==Mi(t))return [new Dt(o,t,`array expected, ${Mi(t)} found`)];if(i.length&&t.length!==i.length)return [new Dt(o,t,`array length ${i.length} expected, length ${t.length} found`)];if(i["min-length"]&&t.length<i["min-length"])return [new Dt(o,t,`array length at least ${i["min-length"]} expected, length ${t.length} found`)];let a={type:i.value,values:i.values,minimum:i.minimum,maximum:i.maximum,function:void 0};n.$version<7&&(a.function=i.function),"object"===Mi(i.value)&&(a=i.value);let l=[];for(let e=0;e<t.length;e++)l=l.concat(s({array:t,arrayIndex:e,value:t[e],valueSpec:a,style:r,styleSpec:n,key:`${o}[${e}]`},!0));return l}function Ao(e){const t=e.key,i=e.value,r=e.valueSpec;let n=Mi(i);if("number"===n&&i!=i&&(n="NaN"),"number"!==n)return [new Dt(t,i,`number expected, ${n} found`)];if("minimum"in r){let n=r.minimum;if("array"===Mi(r.minimum)&&(n=r.minimum[e.arrayIndex]),i<n)return [new Dt(t,i,`${i} is less than the minimum value ${n}`)]}if("maximum"in r){let n=r.maximum;if("array"===Mi(r.maximum)&&(n=r.maximum[e.arrayIndex]),i>n)return [new Dt(t,i,`${i} is greater than the maximum value ${n}`)]}return []}function So(e){const t=e.valueSpec,i=Rt(e.value.type);let r,n,o,s={};const a="categorical"!==i&&void 0===e.value.property,l=!a,c="array"===Mi(e.value.stops)&&"array"===Mi(e.value.stops[0])&&"object"===Mi(e.value.stops[0][0]),h=Eo({key:e.key,value:e.value,valueSpec:e.styleSpec.function,style:e.style,styleSpec:e.styleSpec,objectElementValidators:{stops:function(e){if("identity"===i)return [new Dt(e.key,e.value,'identity function may not have a "stops" property')];let t=[];const r=e.value;return t=t.concat(Mo({key:e.key,value:r,valueSpec:e.valueSpec,style:e.style,styleSpec:e.styleSpec,arrayElementValidator:u})),"array"===Mi(r)&&0===r.length&&t.push(new Dt(e.key,r,"array must have at least one stop")),t},default:function(e){return ss({key:e.key,value:e.value,valueSpec:t,style:e.style,styleSpec:e.styleSpec})}}});return "identity"===i&&a&&h.push(new Dt(e.key,e.value,'missing required property "property"')),"identity"===i||e.value.stops||h.push(new Dt(e.key,e.value,'missing required property "stops"')),"exponential"===i&&e.valueSpec.expression&&!so(e.valueSpec)&&h.push(new Dt(e.key,e.value,"exponential functions not supported")),e.styleSpec.$version>=8&&(l&&!ro(e.valueSpec)?h.push(new Dt(e.key,e.value,"property functions not supported")):a&&!oo(e.valueSpec)&&h.push(new Dt(e.key,e.value,"zoom functions not supported"))),"categorical"!==i&&!c||void 0!==e.value.property||h.push(new Dt(e.key,e.value,'"property" property is required')),h;function u(e){let i=[];const r=e.value,a=e.key;if("array"!==Mi(r))return [new Dt(a,r,`array expected, ${Mi(r)} found`)];if(2!==r.length)return [new Dt(a,r,`array length 2 expected, length ${r.length} found`)];if(c){if("object"!==Mi(r[0]))return [new Dt(a,r,`object expected, ${Mi(r[0])} found`)];if(void 0===r[0].zoom)return [new Dt(a,r,"object stop key must have zoom")];if(void 0===r[0].value)return [new Dt(a,r,"object stop key must have value")];const t=Rt(r[0].zoom);if("number"!=typeof t)return [new Dt(a,r[0].zoom,"stop zoom values must be numbers")];if(o&&o>t)return [new Dt(a,r[0].zoom,"stop zoom values must appear in ascending order")];t!==o&&(o=t,n=void 0,s={}),i=i.concat(Eo({key:`${a}[0]`,value:r[0],valueSpec:{zoom:{}},style:e.style,styleSpec:e.styleSpec,objectElementValidators:{zoom:Ao,value:d}}));}else i=i.concat(d({key:`${a}[0]`,value:r[0],valueSpec:{},style:e.style,styleSpec:e.styleSpec},r));return go(Lt(r[1]))?i.concat([new Dt(`${a}[1]`,r[1],"expressions are not allowed in function stops.")]):i.concat(ss({key:`${a}[1]`,value:r[1],valueSpec:t,style:e.style,styleSpec:e.styleSpec}))}function d(e,o){const a=Mi(e.value),l=Rt(e.value),c=null!==e.value?e.value:o;if(r){if(a!==r)return [new Dt(e.key,c,`${a} stop domain type must match previous stop domain type ${r}`)]}else r=a;if("number"!==a&&"string"!==a&&"boolean"!==a&&"number"!=typeof l&&"string"!=typeof l&&"boolean"!=typeof l)return [new Dt(e.key,c,"stop domain value must be a number, string, or boolean")];if("number"!==a&&"categorical"!==i){let r=`number expected, ${a} found`;return ro(t)&&void 0===i&&(r+='\nIf you intended to use a categorical function, specify `"type": "categorical"`.'),[new Dt(e.key,c,r)]}return "categorical"!==i||"number"!==a||"number"==typeof l&&isFinite(l)&&Math.floor(l)===l?"categorical"!==i&&"number"===a&&"number"==typeof l&&"number"==typeof n&&void 0!==n&&l<n?[new Dt(e.key,c,"stop domain values must appear in ascending order")]:(n=l,"categorical"===i&&l in s?[new Dt(e.key,c,"stop domain values must be unique")]:(s[l]=!0,[])):[new Dt(e.key,c,`integer expected, found ${String(l)}`)]}}function Io(e){const t=("property"===e.expressionContext?bo:yo)(Lt(e.value),e.valueSpec);if("error"===t.result)return t.value.map((t=>new Dt(`${e.key}${t.key}`,e.value,t.message)));const i=t.value.expression||t.value._styleExpression.expression;if("property"===e.expressionContext&&"text-font"===e.propertyKey&&!i.outputDefined())return [new Dt(e.key,e.value,`Invalid data expression for "${e.propertyKey}". Output values must be contained as literals within the expression.`)];if("property"===e.expressionContext&&"layout"===e.propertyType&&!Or(i))return [new Dt(e.key,e.value,'"feature-state" data expressions are not supported with layout properties.')];if("filter"===e.expressionContext)return Co(i,e);if(e.expressionContext&&0===e.expressionContext.indexOf("cluster")){if(!Nr(i,["zoom","feature-state"]))return [new Dt(e.key,e.value,'"zoom" and "feature-state" expressions are not supported with cluster properties.')];if("cluster-initial"===e.expressionContext&&!Br(i))return [new Dt(e.key,e.value,"Feature data expressions are not supported with initial expression part of cluster properties.")]}return []}function Co(e,t){const i=new Set(["zoom","feature-state","pitch","distance-from-center"]);if(t.valueSpec&&t.valueSpec.expression)for(const e of t.valueSpec.expression.parameters)i.delete(e);if(0===i.size)return [];const r=[];return e instanceof Di&&i.has(e.name)?[new Dt(t.key,t.value,`["${e.name}"] expression is not supported in a filter for a ${t.object.type} layer with id: ${t.object.id}`)]:(e.eachChild((e=>{r.push(...Co(e,t));})),r)}function zo(e){const t=e.key,i=e.value,r=e.valueSpec,n=[];return Array.isArray(r.values)?-1===r.values.indexOf(Rt(i))&&n.push(new Dt(t,i,`expected one of [${r.values.join(", ")}], ${JSON.stringify(i)} found`)):-1===Object.keys(r.values).indexOf(Rt(i))&&n.push(new Dt(t,i,`expected one of [${Object.keys(r.values).join(", ")}], ${JSON.stringify(i)} found`)),n}function Po(e){if(!0===e||!1===e)return !0;if(!Array.isArray(e)||0===e.length)return !1;switch(e[0]){case"has":return e.length>=2&&"$id"!==e[1]&&"$type"!==e[1];case"in":return e.length>=3&&("string"!=typeof e[1]||Array.isArray(e[2]));case"!in":case"!has":case"none":return !1;case"==":case"!=":case">":case">=":case"<":case"<=":return 3!==e.length||Array.isArray(e[1])||Array.isArray(e[2]);case"any":case"all":for(const t of e.slice(1))if(!Po(t)&&"boolean"!=typeof t)return !1;return !0;default:return !0}}function Do(e,t="fill"){if(null==e)return {filter:()=>!0,needGeometry:!1,needFeature:!1};Po(e)||(e=No(e));const i=e;let r=!0;try{r=function(e){if(!ko(e))return e;let t=Lt(e);return Lo(t),t=Ro(t),t}(i);}catch(e){console.warn(`Failed to extract static filter. Filter will continue working, but at higher memory usage and slower framerate.\nThis is most likely a bug, please report this via https://github.com/mapbox/mapbox-gl-js/issues/new?assignees=&labels=&template=Bug_report.md\nand paste the contents of this message in the report.\nThank you!\nFilter Expression:\n${JSON.stringify(i,null,2)}\n        `);}const n=zt[`filter_${t}`],o=yo(r,n);let s=null;if("error"===o.result)throw new Error(o.value.map((e=>`${e.key}: ${e.message}`)).join(", "));s=(e,t,i)=>o.value.evaluate(e,t,{},i);let a=null,l=null;if(r!==i){const e=yo(i,n);if("error"===e.result)throw new Error(e.value.map((e=>`${e.key}: ${e.message}`)).join(", "));a=(t,i,r,n,o)=>e.value.evaluate(t,i,{},r,void 0,void 0,n,o),l=!Br(e.value.expression);}return {filter:s,dynamicFilter:a||void 0,needGeometry:Fo(r),needFeature:!!l}}function Ro(e){if(!Array.isArray(e))return e;const t=function(e){if(Bo.has(e[0]))for(let t=1;t<e.length;t++)if(ko(e[t]))return !0;return e}(e);return !0===t?t:t.map((e=>Ro(e)))}function Lo(e){let t=!1;const i=[];if("case"===e[0]){for(let r=1;r<e.length-1;r+=2)t=t||ko(e[r]),i.push(e[r+1]);i.push(e[e.length-1]);}else if("match"===e[0]){t=t||ko(e[1]);for(let t=2;t<e.length-1;t+=2)i.push(e[t+1]);i.push(e[e.length-1]);}else if("step"===e[0]){t=t||ko(e[1]);for(let t=1;t<e.length-1;t+=2)i.push(e[t+1]);}t&&(e.length=0,e.push("any",...i));for(let t=1;t<e.length;t++)Lo(e[t]);}function ko(e){if(!Array.isArray(e))return !1;if("pitch"===(t=e[0])||"distance-from-center"===t)return !0;var t;for(let t=1;t<e.length;t++)if(ko(e[t]))return !0;return !1}const Bo=new Set(["in","==","!=",">",">=","<","<=","to-boolean"]);function Oo(e,t){return e<t?-1:e>t?1:0}function Fo(e){if(!Array.isArray(e))return !1;if("within"===e[0]||"distance"===e[0])return !0;for(let t=1;t<e.length;t++)if(Fo(e[t]))return !0;return !1}function No(e){if(!e)return !0;const t=e[0];return e.length<=1?"any"!==t:"=="===t?Uo(e[1],e[2],"=="):"!="===t?Go(Uo(e[1],e[2],"==")):"<"===t||">"===t||"<="===t||">="===t?Uo(e[1],e[2],t):"any"===t?(i=e.slice(1),["any"].concat(i.map(No))):"all"===t?["all"].concat(e.slice(1).map(No)):"none"===t?["all"].concat(e.slice(1).map(No).map(Go)):"in"===t?jo(e[1],e.slice(2)):"!in"===t?Go(jo(e[1],e.slice(2))):"has"===t?Vo(e[1]):"!has"!==t||Go(Vo(e[1]));var i;}function Uo(e,t,i){switch(e){case"$type":return [`filter-type-${i}`,t];case"$id":return [`filter-id-${i}`,t];default:return [`filter-${i}`,e,t]}}function jo(e,t){if(0===t.length)return !1;switch(e){case"$type":return ["filter-type-in",["literal",t]];case"$id":return ["filter-id-in",["literal",t]];default:return t.length>200&&!t.some((e=>typeof e!=typeof t[0]))?["filter-in-large",e,["literal",t.sort(Oo)]]:["filter-in-small",e,["literal",t]]}}function Vo(e){switch(e){case"$type":return !0;case"$id":return ["filter-has-id"];default:return ["filter-has",e]}}function Go(e){return ["!",e]}function qo(e){return Po(Lt(e.value))?Io(Pt({},e,{expressionContext:"filter",valueSpec:e.styleSpec[`filter_${e.layerType||"fill"}`]})):$o(e)}function $o(e){const t=e.value,i=e.key;if("array"!==Mi(t))return [new Dt(i,t,`array expected, ${Mi(t)} found`)];const r=e.styleSpec;let n,o=[];if(t.length<1)return [new Dt(i,t,"filter array must have at least 1 element")];switch(o=o.concat(zo({key:`${i}[0]`,value:t[0],valueSpec:r.filter_operator,style:e.style,styleSpec:e.styleSpec})),Rt(t[0])){case"<":case"<=":case">":case">=":t.length>=2&&"$type"===Rt(t[1])&&o.push(new Dt(i,t,`"$type" cannot be use with operator "${t[0]}"`));case"==":case"!=":3!==t.length&&o.push(new Dt(i,t,`filter array for operator "${t[0]}" must have 3 elements`));case"in":case"!in":t.length>=2&&(n=Mi(t[1]),"string"!==n&&o.push(new Dt(`${i}[1]`,t[1],`string expected, ${n} found`)));for(let s=2;s<t.length;s++)n=Mi(t[s]),"$type"===Rt(t[1])?o=o.concat(zo({key:`${i}[${s}]`,value:t[s],valueSpec:r.geometry_type,style:e.style,styleSpec:e.styleSpec})):"string"!==n&&"number"!==n&&"boolean"!==n&&o.push(new Dt(`${i}[${s}]`,t[s],`string, number, or boolean expected, ${n} found`));break;case"any":case"all":case"none":for(let r=1;r<t.length;r++)o=o.concat($o({key:`${i}[${r}]`,value:t[r],style:e.style,styleSpec:e.styleSpec}));break;case"has":case"!has":n=Mi(t[1]),2!==t.length?o.push(new Dt(i,t,`filter array for "${t[0]}" operator must have 2 elements`)):"string"!==n&&o.push(new Dt(`${i}[1]`,t[1],`string expected, ${n} found`));}return o}function Zo(e,t){const i=e.key,r=e.style,n=e.layer,o=e.styleSpec,s=e.value,a=e.objectKey,l=o[`${t}_${e.layerType}`];if(!l)return [];const c=a.match(/^(.*)-transition$/);if("paint"===t&&c&&l[c[1]]&&l[c[1]].transition)return ss({key:i,value:s,valueSpec:o.transition,style:r,styleSpec:o});const h=e.valueSpec||l[a];if(!h)return [new Dt(i,s,`unknown property "${a}"`)];let u;if("string"===Mi(s)&&ro(h)&&!h.tokens&&(u=/^{([^}]+)}$/.exec(s))){const e=`\`{ "type": "identity", "property": ${u?JSON.stringify(u[1]):'"_"'} }\``;return [new Dt(i,s,`"${a}" does not support interpolation syntax\nUse an identity property function instead: ${e}.`)]}const d=[];if("symbol"===e.layerType)"text-field"===a&&r&&!r.glyphs&&d.push(new Dt(i,s,'use of "text-field" requires a style "glyphs" property')),"text-font"===a&&ao(Lt(s))&&"identity"===Rt(s.type)&&d.push(new Dt(i,s,'"text-font" does not support identity functions'));else if("model"===e.layerType&&"paint"===t&&n&&n.layout&&n.layout.hasOwnProperty("model-id")&&ro(h)&&(no(h)||oo(h))){const e=bo(Lt(s),h),t=e.value.expression||e.value._styleExpression.expression;!t||Nr(t,["zoom"])&&Nr(t,["measure-light"])||d.push(new Dt(i,s,`${a} does not support zoom or measure-light expressions when the model layer source is vector tile or GeoJSON.`));}return d.concat(ss({key:e.key,value:s,valueSpec:h,style:r,styleSpec:o,expressionContext:"property",propertyType:t,propertyKey:a}))}function Wo(e){return Zo(e,"paint")}function Ho(e){return Zo(e,"layout")}function Xo(e){let t=[];const i=e.value,r=e.key,n=e.style,o=e.styleSpec;i.type||i.ref||t.push(new Dt(r,i,'either "type" or "ref" is required'));let s=Rt(i.type);const a=Rt(i.ref);if(i.id){const o=Rt(i.id);for(let s=0;s<e.arrayIndex;s++){const e=n.layers[s];Rt(e.id)===o&&t.push(new Dt(r,i.id,`duplicate layer id "${i.id}", previously used at line ${e.id.__line__}`));}}if("ref"in i){let e;["type","source","source-layer","filter","layout"].forEach((e=>{e in i&&t.push(new Dt(r,i[e],`"${e}" is prohibited for ref layers`));})),n.layers.forEach((t=>{Rt(t.id)===a&&(e=t);})),e?e.ref?t.push(new Dt(r,i.ref,"ref cannot reference another ref layer")):s=Rt(e.type):"string"==typeof a&&t.push(new Dt(r,i.ref,`ref layer "${a}" not found`));}else if("background"!==s&&"sky"!==s&&"slot"!==s)if(i.source){const e=n.sources&&n.sources[i.source],o=e&&Rt(e.type);e?"vector"===o&&"raster"===s?t.push(new Dt(r,i.source,`layer "${i.id}" requires a raster source`)):"raster"===o&&"raster"!==s?t.push(new Dt(r,i.source,`layer "${i.id}" requires a vector source`)):"vector"!==o||i["source-layer"]?"raster-dem"===o&&"hillshade"!==s?t.push(new Dt(r,i.source,"raster-dem source can only be used with layer type 'hillshade'.")):"line"!==s||!i.paint||!i.paint["line-gradient"]&&!i.paint["line-trim-offset"]||"geojson"===o&&e.lineMetrics||t.push(new Dt(r,i,`layer "${i.id}" specifies a line-gradient, which requires a GeoJSON source with \`lineMetrics\` enabled.`)):t.push(new Dt(r,i,`layer "${i.id}" must specify a "source-layer"`)):t.push(new Dt(r,i.source,`source "${i.source}" not found`));}else t.push(new Dt(r,i,'missing required property "source"'));return t=t.concat(Eo({key:r,value:i,valueSpec:o.layer,style:e.style,styleSpec:e.styleSpec,objectElementValidators:{"*":()=>[],type:()=>ss({key:`${r}.type`,value:i.type,valueSpec:o.layer.type,style:e.style,styleSpec:e.styleSpec,object:i,objectKey:"type"}),filter:e=>qo(Pt({layerType:s},e)),layout:e=>Eo({layer:i,key:e.key,value:e.value,valueSpec:{},style:e.style,styleSpec:e.styleSpec,objectElementValidators:{"*":e=>Ho(Pt({layerType:s},e))}}),paint:e=>Eo({layer:i,key:e.key,value:e.value,valueSpec:{},style:e.style,styleSpec:e.styleSpec,objectElementValidators:{"*":e=>Wo(Pt({layerType:s,layer:i},e))}})}})),t}function Yo(e){const t=e.value,i=e.key,r=Mi(t);return "string"!==r?[new Dt(i,t,`string expected, ${r} found`)]:[]}const Ko={promoteId:function({key:e,value:t}){if("string"===Mi(t))return Yo({key:e,value:t});{const i=[];for(const r in t)i.push(...Yo({key:`${e}.${r}`,value:t[r]}));return i}}};function Jo(e){const t=e.value,i=e.key,r=e.styleSpec,n=e.style;if(!t.type)return [new Dt(i,t,'"type" is required')];const o=Rt(t.type);let s;switch(o){case"vector":case"raster":case"raster-dem":return s=Eo({key:i,value:t,valueSpec:r[`source_${o.replace("-","_")}`],style:e.style,styleSpec:r,objectElementValidators:Ko}),s;case"geojson":if(s=Eo({key:i,value:t,valueSpec:r.source_geojson,style:n,styleSpec:r,objectElementValidators:Ko}),t.cluster)for(const e in t.clusterProperties){const[r,n]=t.clusterProperties[e],o="string"==typeof r?[r,["accumulated"],["get",e]]:r;s.push(...Io({key:`${i}.${e}.map`,value:n,expressionContext:"cluster-map"})),s.push(...Io({key:`${i}.${e}.reduce`,value:o,expressionContext:"cluster-reduce"}));}return s;case"video":return Eo({key:i,value:t,valueSpec:r.source_video,style:n,styleSpec:r});case"image":return Eo({key:i,value:t,valueSpec:r.source_image,style:n,styleSpec:r});case"canvas":return [new Dt(i,null,"Please use runtime APIs to add canvas sources, rather than including them in stylesheets.","source.canvas")];default:return zo({key:`${i}.type`,value:t.type,valueSpec:{values:Qo(r)},style:n,styleSpec:r})}}function Qo(e){return e.source.reduce(((t,i)=>{const r=e[i];return "enum"===r.type.type&&(t=t.concat(Object.keys(r.type.values))),t}),[])}function es(e){const t=e.value;let i=[];if(!t)return i;const r=Mi(t);return "string"!==r?(i=i.concat([new Dt(e.key,t,`string expected, "${r}" found`)]),i):(function(e){const t=-1===e.indexOf("://");try{return new URL(e,t?"http://example.com":void 0),!0}catch(e){return !1}}(t)||(i=i.concat([new Dt(e.key,t,`invalid url "${t}"`)])),i)}function ts(e){const t=e.value,i=e.styleSpec,r=i.light,n=e.style;let o=[];const s=Mi(t);if(void 0===t)return o;if("object"!==s)return o=o.concat([new Dt("light",t,`object expected, ${s} found`)]),o;for(const e in t){const s=e.match(/^(.*)-transition$/);o=o.concat(s&&r[s[1]]&&r[s[1]].transition?ss({key:e,value:t[e],valueSpec:i.transition,style:n,styleSpec:i}):r[e]?ss({key:e,value:t[e],valueSpec:r[e],style:n,styleSpec:i}):[new Dt(e,t[e],`unknown property "${e}"`)]);}return o}function is(e){const t=e.value;let i=[];if(!t)return i;const r=Mi(t);if("object"!==r)return i=i.concat([new Dt("light-3d",t,`object expected, ${r} found`)]),i;const n=e.styleSpec,o=n["light-3d"],s=e.style;for(const e of ["type","id"])if(!(e in t))return i=i.concat([new Dt("light-3d",t,`missing property ${e} on light`)]),i;const a=`properties_light_${t.type}`;if(!(a in n))return i=i.concat([new Dt("light-3d",t,`Invalid light type ${t.type}`)]),i;const l=n[a];for(const e in t)if("properties"===e){const r=t[e],o=Mi(r);if("object"!==o)return i=i.concat([new Dt("properties",r,`object expected, ${o} found`)]),i;for(const e in r)i=i.concat(ss({key:e,value:r[e],valueSpec:l[e],style:s,styleSpec:n}));}else {const r=e.match(/^(.*)-transition$/);i=i.concat(r&&o[r[1]]&&o[r[1]].transition?ss({key:e,value:t[e],valueSpec:n.transition,style:s,styleSpec:n}):o[e]?ss({key:e,value:t[e],valueSpec:o[e],style:s,styleSpec:n}):[new Dt(e,t[e],`unknown property "${e}"`)]);}return i}function rs(e){const t=e.value,i=e.key,r=e.style,n=e.styleSpec,o=n.terrain;let s=[];const a=Mi(t);if(void 0===t)return s;if("object"!==a)return s=s.concat([new Dt("terrain",t,`object expected, ${a} found`)]),s;for(const e in t){const i=e.match(/^(.*)-transition$/);s=s.concat(i&&o[i[1]]&&o[i[1]].transition?ss({key:e,value:t[e],valueSpec:n.transition,style:r,styleSpec:n}):o[e]?ss({key:e,value:t[e],valueSpec:o[e],style:r,styleSpec:n}):[new Dt(e,t[e],`unknown property "${e}"`)]);}if(t.source){const e=r.sources&&r.sources[t.source],n=e&&Rt(e.type);e?"raster-dem"!==n&&s.push(new Dt(i,t.source,`terrain cannot be used with a source of type ${String(n)}, it only be used with a "raster-dem" source type`)):s.push(new Dt(i,t.source,`source "${t.source}" not found`));}else s.push(new Dt(i,t,'terrain is missing required property "source"'));return s}function ns(e){const t=e.value,i=e.style,r=e.styleSpec,n=r.fog;let o=[];const s=Mi(t);if(void 0===t)return o;if("object"!==s)return o=o.concat([new Dt("fog",t,`object expected, ${s} found`)]),o;for(const e in t){const s=e.match(/^(.*)-transition$/);o=o.concat(s&&n[s[1]]&&n[s[1]].transition?ss({key:e,value:t[e],valueSpec:r.transition,style:i,styleSpec:r}):n[e]?ss({key:e,value:t[e],valueSpec:n[e],style:i,styleSpec:r}):[new Dt(e,t[e],`unknown property "${e}"`)]);}return o}const os={"*":()=>[],array:Mo,boolean:function(e){const t=e.value,i=e.key,r=Mi(t);return "boolean"!==r?[new Dt(i,t,`boolean expected, ${r} found`)]:[]},number:Ao,color:function(e){const t=e.key,i=e.value,r=Mi(i);return "string"!==r?[new Dt(t,i,`color expected, ${r} found`)]:null===ti(i)?[new Dt(t,i,`color expected, "${i}" found`)]:[]},enum:zo,filter:qo,function:So,layer:Xo,object:Eo,source:Jo,model:es,light:ts,"light-3d":is,terrain:rs,fog:ns,string:Yo,formatted:function(e){return 0===Yo(e).length?[]:Io(e)},resolvedImage:function(e){return 0===Yo(e).length?[]:Io(e)},projection:function(e){const t=e.value,i=e.styleSpec,r=i.projection,n=e.style;let o=[];const s=Mi(t);if("object"===s)for(const e in t)o=o.concat(ss({key:e,value:t[e],valueSpec:r[e],style:n,styleSpec:i}));else "string"!==s&&(o=o.concat([new Dt("projection",t,`object or string expected, ${s} found`)]));return o},import:function(e){const{value:t,styleSpec:i}=e,{data:r,...n}=t;Object.defineProperty(n,"__line__",{value:t.__line__,enumerable:!1});let o=Eo(Pt({},e,{value:n,valueSpec:i.import}));return r&&(o=o.concat(ls(r,i,{key:`${e.key}.data`}))),o}};function ss(e,t=!1){const i=e.value,r=e.valueSpec,n=e.styleSpec;if(r.expression&&ao(Rt(i)))return So(e);if(r.expression&&go(Lt(i)))return Io(e);if(r.type&&os[r.type]){const i=os[r.type](e);return !0===t&&i.length>0&&"array"===Mi(e.value)?Io(e):i}return Eo(Pt({},e,{valueSpec:r.type?n[r.type]:r}))}function as(e){const t=e.value,i=e.key,r=Yo(e);return r.length||(-1===t.indexOf("{fontstack}")&&r.push(new Dt(i,t,'"glyphs" url must include a "{fontstack}" token')),-1===t.indexOf("{range}")&&r.push(new Dt(i,t,'"glyphs" url must include a "{range}" token'))),r}function ls(e,t=zt,i={}){return ss({key:i.key||"",value:e,valueSpec:t.$root,styleSpec:t,style:e,objectElementValidators:{glyphs:as,"*":()=>[]}})}function cs(e,t=zt){return vs(ls(e,t))}const hs=e=>vs(Jo(e)),us=e=>vs(ts(e)),ds=e=>vs(is(e)),ps=e=>vs(rs(e)),fs=e=>vs(ns(e)),ms=e=>vs(Xo(e)),_s=e=>vs(qo(e)),gs=e=>vs(Wo(e)),ys=e=>vs(Ho(e)),xs=e=>vs(es(e));function vs(e){return e.slice().sort(((e,t)=>e.line&&t.line?e.line-t.line:0))}function bs(e,t){let i=!1;if(t&&t.length)for(const r of t)e.fire(new It(new Error(r.message))),i=!0;return i}var ws=Es,Ts=3;function Es(e,t,i){var r=this.cells=[];if(e instanceof ArrayBuffer){this.arrayBuffer=e;var n=new Int32Array(this.arrayBuffer);e=n[0],this.d=(t=n[1])+2*(i=n[2]);for(var o=0;o<this.d*this.d;o++){var s=n[Ts+o],a=n[Ts+o+1];r.push(s===a?null:n.subarray(s,a));}var l=n[Ts+r.length+1];this.keys=n.subarray(n[Ts+r.length],l),this.bboxes=n.subarray(l),this.insert=this._insertReadonly;}else {this.d=t+2*i;for(var c=0;c<this.d*this.d;c++)r.push([]);this.keys=[],this.bboxes=[];}this.n=t,this.extent=e,this.padding=i,this.scale=t/e,this.uid=0;var h=i/t*e;this.min=-h,this.max=e+h;}Es.prototype.insert=function(e,t,i,r,n){this._forEachCell(t,i,r,n,this._insertCell,this.uid++),this.keys.push(e),this.bboxes.push(t),this.bboxes.push(i),this.bboxes.push(r),this.bboxes.push(n);},Es.prototype._insertReadonly=function(){throw "Cannot insert into a GridIndex created from an ArrayBuffer."},Es.prototype._insertCell=function(e,t,i,r,n,o){this.cells[n].push(o);},Es.prototype.query=function(e,t,i,r,n){var o=this.min,s=this.max;if(e<=o&&t<=o&&s<=i&&s<=r&&!n)return Array.prototype.slice.call(this.keys);var a=[];return this._forEachCell(e,t,i,r,this._queryCell,a,{},n),a},Es.prototype._queryCell=function(e,t,i,r,n,o,s,a){var l=this.cells[n];if(null!==l)for(var c=this.keys,h=this.bboxes,u=0;u<l.length;u++){var d=l[u];if(void 0===s[d]){var p=4*d;(a?a(h[p+0],h[p+1],h[p+2],h[p+3]):e<=h[p+2]&&t<=h[p+3]&&i>=h[p+0]&&r>=h[p+1])?(s[d]=!0,o.push(c[d])):s[d]=!1;}}},Es.prototype._forEachCell=function(e,t,i,r,n,o,s,a){for(var l=this._convertToCellCoord(e),c=this._convertToCellCoord(t),h=this._convertToCellCoord(i),u=this._convertToCellCoord(r),d=l;d<=h;d++)for(var p=c;p<=u;p++){var f=this.d*p+d;if((!a||a(this._convertFromCellCoord(d),this._convertFromCellCoord(p),this._convertFromCellCoord(d+1),this._convertFromCellCoord(p+1)))&&n.call(this,e,t,i,r,f,o,s,a))return}},Es.prototype._convertFromCellCoord=function(e){return (e-this.padding)/this.scale},Es.prototype._convertToCellCoord=function(e){return Math.max(0,Math.min(this.d-1,Math.floor(e*this.scale)+this.padding))},Es.prototype.toArrayBuffer=function(){if(this.arrayBuffer)return this.arrayBuffer;for(var e=this.cells,t=Ts+this.cells.length+1+1,i=0,r=0;r<this.cells.length;r++)i+=this.cells[r].length;var n=new Int32Array(t+i+this.keys.length+this.bboxes.length);n[0]=this.extent,n[1]=this.n,n[2]=this.padding;for(var o=t,s=0;s<e.length;s++){var a=e[s];n[Ts+s]=o,n.set(a,o),o+=a.length;}return n[Ts+e.length]=o,n.set(this.keys,o),n[Ts+e.length+1]=o+=this.keys.length,n.set(this.bboxes,o),o+=this.bboxes.length,n.buffer};var Ms=d(ws);const As={};function Ss(e,t,i={}){Object.defineProperty(e,"_classRegistryKey",{value:t,writeable:!1}),As[t]={klass:e,omit:i.omit||[]};}Ss(Object,"Object"),Ms.serialize=function(e,t){const i=e.toArrayBuffer();return t&&t.push(i),{buffer:i}},Ms.deserialize=function(e){return new Ms(e.buffer)},Object.defineProperty(Ms,"name",{value:"Grid"}),Ss(Ms,"Grid"),Ss(li,"Color"),Ss(Error,"Error"),Ss(ve,"AJAXError"),Ss(di,"ResolvedImage"),Ss(wo,"StylePropertyFunction"),Ss(_o,"StyleExpression",{omit:["_evaluator"]}),Ss(vo,"ZoomDependentExpression"),Ss(xo,"ZoomConstantExpression"),Ss(Di,"CompoundExpression",{omit:["_evaluate"]});for(const e in Qn)As[Qn[e]._classRegistryKey]||Ss(Qn[e],`Expression${e}`);function Is(e){return e&&"undefined"!=typeof ArrayBuffer&&(e instanceof ArrayBuffer||e.constructor&&"ArrayBuffer"===e.constructor.name)}function Cs(e){return t.ImageBitmap&&e instanceof t.ImageBitmap}function zs(e,i){if(null==e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||e instanceof Boolean||e instanceof Number||e instanceof String||e instanceof Date||e instanceof RegExp)return e;if(Is(e)||Cs(e))return i&&i.push(e),e;if(ArrayBuffer.isView(e)){const t=e;return i&&i.push(t.buffer),t}if(e instanceof t.ImageData)return i&&i.push(e.data.buffer),e;if(Array.isArray(e)){const t=[];for(const r of e)t.push(zs(r,i));return t}if(e instanceof Map){const t={$name:"Map"};for(const[i,r]of e.entries())t[i]=zs(r);return t}if("object"==typeof e){const t=e.constructor,r=t._classRegistryKey;if(!r)throw new Error(`can't serialize object of unregistered class ${r}`);const n=t.serialize?t.serialize(e,i):{};if(!t.serialize){for(const t in e)e.hasOwnProperty(t)&&(As[r].omit.indexOf(t)>=0||(n[t]=zs(e[t],i)));e instanceof Error&&(n.message=e.message);}if(n.$name)throw new Error("$name property is reserved for worker serialization logic.");return "Object"!==r&&(n.$name=r),n}throw new Error("can't serialize object of type "+typeof e)}function Ps(e){if(null==e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||e instanceof Boolean||e instanceof Number||e instanceof String||e instanceof Date||e instanceof RegExp||Is(e)||Cs(e)||ArrayBuffer.isView(e)||e instanceof t.ImageData)return e;if(Array.isArray(e))return e.map(Ps);if("object"==typeof e){const t=e.$name||"Object";if("Map"===t){const t=new Map;for(const i of Object.keys(e))"$name"!==i&&t.set(i,Ps(e[i]));return t}const{klass:i}=As[t];if(!i)throw new Error(`can't deserialize unregistered class ${t}`);if(i.deserialize)return i.deserialize(e);const r=Object.create(i.prototype);for(const t of Object.keys(e))"$name"!==t&&(r[t]=Ps(e[t]));return r}throw new Error("can't deserialize object of type "+typeof e)}const Ds={"Latin-1 Supplement":e=>e>=128&&e<=255,Arabic:e=>e>=1536&&e<=1791,"Arabic Supplement":e=>e>=1872&&e<=1919,"Arabic Extended-A":e=>e>=2208&&e<=2303,"Hangul Jamo":e=>e>=4352&&e<=4607,"Unified Canadian Aboriginal Syllabics":e=>e>=5120&&e<=5759,Khmer:e=>e>=6016&&e<=6143,"Unified Canadian Aboriginal Syllabics Extended":e=>e>=6320&&e<=6399,"General Punctuation":e=>e>=8192&&e<=8303,"Letterlike Symbols":e=>e>=8448&&e<=8527,"Number Forms":e=>e>=8528&&e<=8591,"Miscellaneous Technical":e=>e>=8960&&e<=9215,"Control Pictures":e=>e>=9216&&e<=9279,"Optical Character Recognition":e=>e>=9280&&e<=9311,"Enclosed Alphanumerics":e=>e>=9312&&e<=9471,"Geometric Shapes":e=>e>=9632&&e<=9727,"Miscellaneous Symbols":e=>e>=9728&&e<=9983,"Miscellaneous Symbols and Arrows":e=>e>=11008&&e<=11263,"CJK Radicals Supplement":e=>e>=11904&&e<=12031,"Kangxi Radicals":e=>e>=12032&&e<=12255,"Ideographic Description Characters":e=>e>=12272&&e<=12287,"CJK Symbols and Punctuation":e=>e>=12288&&e<=12351,Hiragana:e=>e>=12352&&e<=12447,Katakana:e=>e>=12448&&e<=12543,Bopomofo:e=>e>=12544&&e<=12591,"Hangul Compatibility Jamo":e=>e>=12592&&e<=12687,Kanbun:e=>e>=12688&&e<=12703,"Bopomofo Extended":e=>e>=12704&&e<=12735,"CJK Strokes":e=>e>=12736&&e<=12783,"Katakana Phonetic Extensions":e=>e>=12784&&e<=12799,"Enclosed CJK Letters and Months":e=>e>=12800&&e<=13055,"CJK Compatibility":e=>e>=13056&&e<=13311,"CJK Unified Ideographs Extension A":e=>e>=13312&&e<=19903,"Yijing Hexagram Symbols":e=>e>=19904&&e<=19967,"CJK Unified Ideographs":e=>e>=19968&&e<=40959,"Yi Syllables":e=>e>=40960&&e<=42127,"Yi Radicals":e=>e>=42128&&e<=42191,"Hangul Jamo Extended-A":e=>e>=43360&&e<=43391,"Hangul Syllables":e=>e>=44032&&e<=55215,"Hangul Jamo Extended-B":e=>e>=55216&&e<=55295,"Private Use Area":e=>e>=57344&&e<=63743,"CJK Compatibility Ideographs":e=>e>=63744&&e<=64255,"Arabic Presentation Forms-A":e=>e>=64336&&e<=65023,"Vertical Forms":e=>e>=65040&&e<=65055,"CJK Compatibility Forms":e=>e>=65072&&e<=65103,"Small Form Variants":e=>e>=65104&&e<=65135,"Arabic Presentation Forms-B":e=>e>=65136&&e<=65279,"Halfwidth and Fullwidth Forms":e=>e>=65280&&e<=65519,"CJK Unified Ideographs Extension B":e=>e>=131072&&e<=173791};function Rs(e){for(const t of e)if(Bs(t.charCodeAt(0)))return !0;return !1}function Ls(e){for(const t of e)if(!ks(t.charCodeAt(0)))return !1;return !0}function ks(e){return !(Ds.Arabic(e)||Ds["Arabic Supplement"](e)||Ds["Arabic Extended-A"](e)||Ds["Arabic Presentation Forms-A"](e)||Ds["Arabic Presentation Forms-B"](e))}function Bs(e){return !(746!==e&&747!==e&&(e<4352||!(Ds["Bopomofo Extended"](e)||Ds.Bopomofo(e)||Ds["CJK Compatibility Forms"](e)&&!(e>=65097&&e<=65103)||Ds["CJK Compatibility Ideographs"](e)||Ds["CJK Compatibility"](e)||Ds["CJK Radicals Supplement"](e)||Ds["CJK Strokes"](e)||!(!Ds["CJK Symbols and Punctuation"](e)||e>=12296&&e<=12305||e>=12308&&e<=12319||12336===e)||Ds["CJK Unified Ideographs Extension A"](e)||Ds["CJK Unified Ideographs"](e)||Ds["Enclosed CJK Letters and Months"](e)||Ds["Hangul Compatibility Jamo"](e)||Ds["Hangul Jamo Extended-A"](e)||Ds["Hangul Jamo Extended-B"](e)||Ds["Hangul Jamo"](e)||Ds["Hangul Syllables"](e)||Ds.Hiragana(e)||Ds["Ideographic Description Characters"](e)||Ds.Kanbun(e)||Ds["Kangxi Radicals"](e)||Ds["Katakana Phonetic Extensions"](e)||Ds.Katakana(e)&&12540!==e||!(!Ds["Halfwidth and Fullwidth Forms"](e)||65288===e||65289===e||65293===e||e>=65306&&e<=65310||65339===e||65341===e||65343===e||e>=65371&&e<=65503||65507===e||e>=65512&&e<=65519)||!(!Ds["Small Form Variants"](e)||e>=65112&&e<=65118||e>=65123&&e<=65126)||Ds["Unified Canadian Aboriginal Syllabics"](e)||Ds["Unified Canadian Aboriginal Syllabics Extended"](e)||Ds["Vertical Forms"](e)||Ds["Yijing Hexagram Symbols"](e)||Ds["Yi Syllables"](e)||Ds["Yi Radicals"](e))))}function Os(e){return !(Bs(e)||function(e){return !!(Ds["Latin-1 Supplement"](e)&&(167===e||169===e||174===e||177===e||188===e||189===e||190===e||215===e||247===e)||Ds["General Punctuation"](e)&&(8214===e||8224===e||8225===e||8240===e||8241===e||8251===e||8252===e||8258===e||8263===e||8264===e||8265===e||8273===e)||Ds["Letterlike Symbols"](e)||Ds["Number Forms"](e)||Ds["Miscellaneous Technical"](e)&&(e>=8960&&e<=8967||e>=8972&&e<=8991||e>=8996&&e<=9e3||9003===e||e>=9085&&e<=9114||e>=9150&&e<=9165||9167===e||e>=9169&&e<=9179||e>=9186&&e<=9215)||Ds["Control Pictures"](e)&&9251!==e||Ds["Optical Character Recognition"](e)||Ds["Enclosed Alphanumerics"](e)||Ds["Geometric Shapes"](e)||Ds["Miscellaneous Symbols"](e)&&!(e>=9754&&e<=9759)||Ds["Miscellaneous Symbols and Arrows"](e)&&(e>=11026&&e<=11055||e>=11088&&e<=11097||e>=11192&&e<=11243)||Ds["CJK Symbols and Punctuation"](e)||Ds.Katakana(e)||Ds["Private Use Area"](e)||Ds["CJK Compatibility Forms"](e)||Ds["Small Form Variants"](e)||Ds["Halfwidth and Fullwidth Forms"](e)||8734===e||8756===e||8757===e||e>=9984&&e<=10087||e>=10102&&e<=10131||65532===e||65533===e)}(e))}function Fs(e){return e>=1424&&e<=2303||Ds["Arabic Presentation Forms-A"](e)||Ds["Arabic Presentation Forms-B"](e)}function Ns(e,t){return !(!t&&Fs(e)||e>=2304&&e<=3583||e>=3840&&e<=4255||Ds.Khmer(e))}function Us(e){for(const t of e)if(Fs(t.charCodeAt(0)))return !0;return !1}const js="deferred",Vs="loading",Gs="loaded";let qs=null,$s="unavailable",Zs=null;const Ws=function(e){e&&"string"==typeof e&&e.indexOf("NetworkError")>-1&&($s="error"),qs&&qs(e);};function Hs(){Xs.fire(new St("pluginStateChange",{pluginStatus:$s,pluginURL:Zs}));}const Xs=new Ct,Ys=function(){return $s},Ks=function(){if($s!==js||!Zs)throw new Error("rtl-text-plugin cannot be downloaded unless a pluginURL is specified");$s=Vs,Hs(),Zs&&Ee({url:Zs},(e=>{e?Ws(e):($s=Gs,Hs());}));},Js={applyArabicShaping:null,processBidirectionalText:null,processStyledBidirectionalText:null,isLoaded:()=>$s===Gs||null!=Js.applyArabicShaping,isLoading:()=>$s===Vs,setState(e){$s=e.pluginStatus,Zs=e.pluginURL;},isParsed:()=>null!=Js.applyArabicShaping&&null!=Js.processBidirectionalText&&null!=Js.processStyledBidirectionalText,getPluginURL:()=>Zs};class Qs{constructor(e,t){this.zoom=e,t?(this.now=t.now,this.fadeDuration=t.fadeDuration,this.transition=t.transition,this.pitch=t.pitch,this.brightness=t.brightness):(this.now=0,this.fadeDuration=0,this.transition={},this.pitch=0,this.brightness=0);}isSupportedScript(e){return function(e,t){for(const i of e)if(!Ns(i.charCodeAt(0),t))return !1;return !0}(e,Js.isLoaded())}}class ea{constructor(e,t,i){this.property=e,this.value=t,this.expression=function(e,t,i){if(ao(e))return new wo(e,t);if(go(e)||Array.isArray(e)&&e.length>0){const r=bo(e,t,i);if("error"===r.result)throw new Error(r.value.map((e=>`${e.key}: ${e.message}`)).join(", "));return r.value}{let i=e;return "string"==typeof e&&"color"===t.type&&(i=li.parse(e)),{kind:"constant",isConfigDependent:!1,evaluate:()=>i}}}(void 0===t?e.specification.default:t,e.specification,i);}isDataDriven(){return "source"===this.expression.kind||"composite"===this.expression.kind}possiblyEvaluate(e,t,i){return this.property.possiblyEvaluate(this,e,t,i)}}class ta{constructor(e,t){this.property=e,this.value=new ea(e,void 0,t);}transitioned(e,t){return new ra(this.property,this.value,t,k({},e.transition,this.transition),e.now)}untransitioned(){return new ra(this.property,this.value,null,{},0)}}class ia{constructor(e,t){this._properties=e,this._values=Object.create(e.defaultTransitionablePropertyValues),this._options=t,this.isConfigDependent=!1;}getValue(e){return Z(this._values[e].value.value)}setValue(e,t){this._values.hasOwnProperty(e)||(this._values[e]=new ta(this._values[e].property,this._options)),this._values[e].value=new ea(this._values[e].property,null===t?void 0:Z(t),this._options),this.isConfigDependent=this.isConfigDependent||this._values[e].value.expression.isConfigDependent;}setTransitionOrValue(e){if(e)for(const t in e){const i=e[t];G(t,"-transition")?this.setTransition(t.slice(0,-11),i):this.setValue(t,i);}}getTransition(e){return Z(this._values[e].transition)}setTransition(e,t){this._values.hasOwnProperty(e)||(this._values[e]=new ta(this._values[e].property)),this._values[e].transition=Z(t)||void 0;}serialize(){const e={};for(const t of Object.keys(this._values)){const i=this.getValue(t);void 0!==i&&(e[t]=i);const r=this.getTransition(t);void 0!==r&&(e[`${t}-transition`]=r);}return e}transitioned(e,t){const i=new na(this._properties);for(const r of Object.keys(this._values))i._values[r]=this._values[r].transitioned(e,t._values[r]);return i}untransitioned(){const e=new na(this._properties);for(const t of Object.keys(this._values))e._values[t]=this._values[t].untransitioned();return e}}class ra{constructor(e,t,i,r,n){const o=r.delay||0,s=r.duration||0;n=n||0,this.property=e,this.value=t,this.begin=n+o,this.end=this.begin+s,e.specification.transition&&(r.delay||r.duration)&&(this.prior=i);}possiblyEvaluate(e,t,i){const r=e.now||0,n=this.value.possiblyEvaluate(e,t,i),o=this.prior;if(o){if(r>this.end)return this.prior=null,n;if(this.value.isDataDriven())return this.prior=null,n;if(r<this.begin)return o.possiblyEvaluate(e,t,i);{const s=(r-this.begin)/(this.end-this.begin);return this.property.interpolate(o.possiblyEvaluate(e,t,i),n,M(s))}}return n}}class na{constructor(e){this._properties=e,this._values=Object.create(e.defaultTransitioningPropertyValues);}possiblyEvaluate(e,t,i){const r=new aa(this._properties);for(const n of Object.keys(this._values))r._values[n]=this._values[n].possiblyEvaluate(e,t,i);return r}hasTransition(){for(const e of Object.keys(this._values))if(this._values[e].prior)return !0;return !1}}class oa{constructor(e,t){this._properties=e,this._values=Object.create(e.defaultPropertyValues),this._options=t,this.isConfigDependent=!1;}getValue(e){return Z(this._values[e].value)}setValue(e,t){this._values[e]=new ea(this._values[e].property,null===t?void 0:Z(t),this._options),this.isConfigDependent=this.isConfigDependent||this._values[e].expression.isConfigDependent;}serialize(){const e={};for(const t of Object.keys(this._values)){const i=this.getValue(t);void 0!==i&&(e[t]=i);}return e}possiblyEvaluate(e,t,i){const r=new aa(this._properties);for(const n of Object.keys(this._values))r._values[n]=this._values[n].possiblyEvaluate(e,t,i);return r}}class sa{constructor(e,t,i){this.property=e,this.value=t,this.parameters=i;}isConstant(){return "constant"===this.value.kind}constantOr(e){return "constant"===this.value.kind?this.value.value:e}evaluate(e,t,i,r){return this.property.evaluate(this.value,this.parameters,e,t,i,r)}}class aa{constructor(e){this._properties=e,this._values=Object.create(e.defaultPossiblyEvaluatedValues);}get(e){return this._values[e]}}class la{constructor(e){this.specification=e;}possiblyEvaluate(e,t){return e.expression.evaluate(t)}interpolate(e,t,i){const r=Xr[this.specification.type];return r?r(e,t,i):e}}class ca{constructor(e,t){this.specification=e,this.overrides=t;}possiblyEvaluate(e,t,i,r){return new sa(this,"constant"===e.expression.kind||"camera"===e.expression.kind?{kind:"constant",value:e.expression.evaluate(t,null,{},i,r)}:e.expression,t)}interpolate(e,t,i){if("constant"!==e.value.kind||"constant"!==t.value.kind)return e;if(void 0===e.value.value||void 0===t.value.value)return new sa(this,{kind:"constant",value:void 0},e.parameters);const r=Xr[this.specification.type];return r?new sa(this,{kind:"constant",value:r(e.value.value,t.value.value,i)},e.parameters):e}evaluate(e,t,i,r,n,o){return "constant"===e.kind?e.value:e.evaluate(t,i,r,n,o)}}class ha{constructor(e){this.specification=e;}possiblyEvaluate(e,t,i,r){return !!e.expression.evaluate(t,null,{},i,r)}interpolate(){return !1}}class ua{constructor(e){this.properties=e,this.defaultPropertyValues={},this.defaultTransitionablePropertyValues={},this.defaultTransitioningPropertyValues={},this.defaultPossiblyEvaluatedValues={},this.overridableProperties=[];const t=new Qs(0,{});for(const i in e){const r=e[i];r.specification.overridable&&this.overridableProperties.push(i);const n=this.defaultPropertyValues[i]=new ea(r,void 0),o=this.defaultTransitionablePropertyValues[i]=new ta(r);this.defaultTransitioningPropertyValues[i]=o.untransitioned(),this.defaultPossiblyEvaluatedValues[i]=n.possiblyEvaluate(t);}}}function da(e,t){return 256*(e=z(Math.floor(e),0,255))+z(Math.floor(t),0,255)}Ss(ca,"DataDrivenProperty"),Ss(la,"DataConstantProperty"),Ss(ha,"ColorRampProperty");const pa={Int8:Int8Array,Uint8:Uint8Array,Int16:Int16Array,Uint16:Uint16Array,Int32:Int32Array,Uint32:Uint32Array,Float32:Float32Array};class fa{constructor(e,t){this._structArray=e,this._pos1=t*this.size,this._pos2=this._pos1/2,this._pos4=this._pos1/4,this._pos8=this._pos1/8;}}class ma{constructor(){this.isTransferred=!1,this.capacity=-1,this.resize(0);}static serialize(e,t){return e._trim(),t&&(e.isTransferred=!0,t.push(e.arrayBuffer)),{length:e.length,arrayBuffer:e.arrayBuffer}}static deserialize(e){const t=Object.create(this.prototype);return t.arrayBuffer=e.arrayBuffer,t.length=e.length,t.capacity=e.arrayBuffer.byteLength/t.bytesPerElement,t._refreshViews(),t}_trim(){this.length!==this.capacity&&(this.capacity=this.length,this.arrayBuffer=this.arrayBuffer.slice(0,this.length*this.bytesPerElement),this._refreshViews());}clear(){this.length=0;}resize(e){this.reserve(e),this.length=e;}reserve(e){if(e>this.capacity){this.capacity=Math.max(e,Math.floor(5*this.capacity),128),this.arrayBuffer=new ArrayBuffer(this.capacity*this.bytesPerElement);const t=this.uint8;this._refreshViews(),t&&this.uint8.set(t);}}_refreshViews(){throw new Error("_refreshViews() must be implemented by each concrete StructArray layout")}destroy(){this.int8=this.uint8=this.int16=this.uint16=this.int32=this.uint32=this.float32=null,this.arrayBuffer=null;}}function _a(e,t=1){let i=0,r=0;return {members:e.map((e=>{const n=pa[e.type].BYTES_PER_ELEMENT,o=i=ga(i,Math.max(t,n)),s=e.components||1;return r=Math.max(r,n),i+=n*s,{name:e.name,type:e.type,components:s,offset:o}})),size:ga(i,Math.max(r,t)),alignment:t}}function ga(e,t){return Math.ceil(e/t)*t}class ya extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(e,t){const i=this.length;return this.resize(i+1),this.emplace(i,e,t)}emplace(e,t,i){const r=2*e;return this.int16[r+0]=t,this.int16[r+1]=i,e}}ya.prototype.bytesPerElement=4,Ss(ya,"StructArrayLayout2i4");class xa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(e,t,i){const r=this.length;return this.resize(r+1),this.emplace(r,e,t,i)}emplace(e,t,i,r){const n=3*e;return this.int16[n+0]=t,this.int16[n+1]=i,this.int16[n+2]=r,e}}xa.prototype.bytesPerElement=6,Ss(xa,"StructArrayLayout3i6");class va extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(e,t,i,r){const n=this.length;return this.resize(n+1),this.emplace(n,e,t,i,r)}emplace(e,t,i,r,n){const o=4*e;return this.int16[o+0]=t,this.int16[o+1]=i,this.int16[o+2]=r,this.int16[o+3]=n,e}}va.prototype.bytesPerElement=8,Ss(va,"StructArrayLayout4i8");class ba extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s){const a=this.length;return this.resize(a+1),this.emplace(a,e,t,i,r,n,o,s)}emplace(e,t,i,r,n,o,s,a){const l=6*e,c=12*e,h=3*e;return this.int16[l+0]=t,this.int16[l+1]=i,this.uint8[c+4]=r,this.uint8[c+5]=n,this.uint8[c+6]=o,this.uint8[c+7]=s,this.float32[h+2]=a,e}}ba.prototype.bytesPerElement=12,Ss(ba,"StructArrayLayout2i4ub1f12");class wa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r){const n=this.length;return this.resize(n+1),this.emplace(n,e,t,i,r)}emplace(e,t,i,r,n){const o=4*e;return this.float32[o+0]=t,this.float32[o+1]=i,this.float32[o+2]=r,this.float32[o+3]=n,e}}wa.prototype.bytesPerElement=16,Ss(wa,"StructArrayLayout4f16");class Ta extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n){const o=this.length;return this.resize(o+1),this.emplace(o,e,t,i,r,n)}emplace(e,t,i,r,n,o){const s=6*e,a=3*e;return this.uint16[s+0]=t,this.uint16[s+1]=i,this.uint16[s+2]=r,this.uint16[s+3]=n,this.float32[a+2]=o,e}}Ta.prototype.bytesPerElement=12,Ss(Ta,"StructArrayLayout4ui1f12");class Ea extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e,t,i,r){const n=this.length;return this.resize(n+1),this.emplace(n,e,t,i,r)}emplace(e,t,i,r,n){const o=4*e;return this.uint16[o+0]=t,this.uint16[o+1]=i,this.uint16[o+2]=r,this.uint16[o+3]=n,e}}Ea.prototype.bytesPerElement=8,Ss(Ea,"StructArrayLayout4ui8");class Ma extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o){const s=this.length;return this.resize(s+1),this.emplace(s,e,t,i,r,n,o)}emplace(e,t,i,r,n,o,s){const a=6*e;return this.int16[a+0]=t,this.int16[a+1]=i,this.int16[a+2]=r,this.int16[a+3]=n,this.int16[a+4]=o,this.int16[a+5]=s,e}}Ma.prototype.bytesPerElement=12,Ss(Ma,"StructArrayLayout6i12");class Aa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s,a,l,c,h,u){const d=this.length;return this.resize(d+1),this.emplace(d,e,t,i,r,n,o,s,a,l,c,h,u)}emplace(e,t,i,r,n,o,s,a,l,c,h,u,d){const p=12*e;return this.int16[p+0]=t,this.int16[p+1]=i,this.int16[p+2]=r,this.int16[p+3]=n,this.uint16[p+4]=o,this.uint16[p+5]=s,this.uint16[p+6]=a,this.uint16[p+7]=l,this.int16[p+8]=c,this.int16[p+9]=h,this.int16[p+10]=u,this.int16[p+11]=d,e}}Aa.prototype.bytesPerElement=24,Ss(Aa,"StructArrayLayout4i4ui4i24");class Sa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o){const s=this.length;return this.resize(s+1),this.emplace(s,e,t,i,r,n,o)}emplace(e,t,i,r,n,o,s){const a=10*e,l=5*e;return this.int16[a+0]=t,this.int16[a+1]=i,this.int16[a+2]=r,this.float32[l+2]=n,this.float32[l+3]=o,this.float32[l+4]=s,e}}Sa.prototype.bytesPerElement=20,Ss(Sa,"StructArrayLayout3i3f20");class Ia extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);}emplaceBack(e){const t=this.length;return this.resize(t+1),this.emplace(t,e)}emplace(e,t){return this.uint32[1*e+0]=t,e}}Ia.prototype.bytesPerElement=4,Ss(Ia,"StructArrayLayout1ul4");class Ca extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e,t){const i=this.length;return this.resize(i+1),this.emplace(i,e,t)}emplace(e,t,i){const r=2*e;return this.uint16[r+0]=t,this.uint16[r+1]=i,e}}Ca.prototype.bytesPerElement=4,Ss(Ca,"StructArrayLayout2ui4");class za extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s,a,l,c,h,u,d){const p=this.length;return this.resize(p+1),this.emplace(p,e,t,i,r,n,o,s,a,l,c,h,u,d)}emplace(e,t,i,r,n,o,s,a,l,c,h,u,d,p){const f=20*e,m=10*e;return this.int16[f+0]=t,this.int16[f+1]=i,this.int16[f+2]=r,this.int16[f+3]=n,this.int16[f+4]=o,this.float32[m+3]=s,this.float32[m+4]=a,this.float32[m+5]=l,this.float32[m+6]=c,this.int16[f+14]=h,this.uint32[m+8]=u,this.uint16[f+18]=d,this.uint16[f+19]=p,e}}za.prototype.bytesPerElement=40,Ss(za,"StructArrayLayout5i4f1i1ul2ui40");class Pa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s){const a=this.length;return this.resize(a+1),this.emplace(a,e,t,i,r,n,o,s)}emplace(e,t,i,r,n,o,s,a){const l=8*e;return this.int16[l+0]=t,this.int16[l+1]=i,this.int16[l+2]=r,this.int16[l+4]=n,this.int16[l+5]=o,this.int16[l+6]=s,this.int16[l+7]=a,e}}Pa.prototype.bytesPerElement=16,Ss(Pa,"StructArrayLayout3i2i2i16");class Da extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n){const o=this.length;return this.resize(o+1),this.emplace(o,e,t,i,r,n)}emplace(e,t,i,r,n,o){const s=4*e,a=8*e;return this.float32[s+0]=t,this.float32[s+1]=i,this.float32[s+2]=r,this.int16[a+6]=n,this.int16[a+7]=o,e}}Da.prototype.bytesPerElement=16,Ss(Da,"StructArrayLayout2f1f2i16");class Ra extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r){const n=this.length;return this.resize(n+1),this.emplace(n,e,t,i,r)}emplace(e,t,i,r,n){const o=12*e,s=3*e;return this.uint8[o+0]=t,this.uint8[o+1]=i,this.float32[s+1]=r,this.float32[s+2]=n,e}}Ra.prototype.bytesPerElement=12,Ss(Ra,"StructArrayLayout2ub2f12");class La extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i){const r=this.length;return this.resize(r+1),this.emplace(r,e,t,i)}emplace(e,t,i,r){const n=3*e;return this.float32[n+0]=t,this.float32[n+1]=i,this.float32[n+2]=r,e}}La.prototype.bytesPerElement=12,Ss(La,"StructArrayLayout3f12");class ka extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e,t,i){const r=this.length;return this.resize(r+1),this.emplace(r,e,t,i)}emplace(e,t,i,r){const n=3*e;return this.uint16[n+0]=t,this.uint16[n+1]=i,this.uint16[n+2]=r,e}}ka.prototype.bytesPerElement=6,Ss(ka,"StructArrayLayout3ui6");class Ba extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v){const b=this.length;return this.resize(b+1),this.emplace(b,e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v)}emplace(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v,b){const w=30*e,T=15*e,E=60*e;return this.int16[w+0]=t,this.int16[w+1]=i,this.int16[w+2]=r,this.float32[T+2]=n,this.float32[T+3]=o,this.uint16[w+8]=s,this.uint16[w+9]=a,this.uint32[T+5]=l,this.uint32[T+6]=c,this.uint32[T+7]=h,this.uint16[w+16]=u,this.uint16[w+17]=d,this.uint16[w+18]=p,this.float32[T+10]=f,this.float32[T+11]=m,this.uint8[E+48]=_,this.uint8[E+49]=g,this.uint8[E+50]=y,this.uint32[T+13]=x,this.int16[w+28]=v,this.uint8[E+58]=b,e}}Ba.prototype.bytesPerElement=60,Ss(Ba,"StructArrayLayout3i2f2ui3ul3ui2f3ub1ul1i1ub60");class Oa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v,b,w,T,E,M,A,S,I,C,z){const P=this.length;return this.resize(P+1),this.emplace(P,e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v,b,w,T,E,M,A,S,I,C,z)}emplace(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v,b,w,T,E,M,A,S,I,C,z,P){const D=40*e,R=20*e,L=80*e;return this.int16[D+0]=t,this.int16[D+1]=i,this.int16[D+2]=r,this.float32[R+2]=n,this.float32[R+3]=o,this.int16[D+8]=s,this.int16[D+9]=a,this.int16[D+10]=l,this.int16[D+11]=c,this.int16[D+12]=h,this.int16[D+13]=u,this.uint16[D+14]=d,this.uint16[D+15]=p,this.uint16[D+16]=f,this.uint16[D+17]=m,this.uint16[D+18]=_,this.uint16[D+19]=g,this.uint16[D+20]=y,this.uint16[D+21]=x,this.uint16[D+22]=v,this.uint16[D+23]=b,this.uint16[D+24]=w,this.uint16[D+25]=T,this.uint16[D+26]=E,this.uint16[D+27]=M,this.uint16[D+28]=A,this.uint32[R+15]=S,this.float32[R+16]=I,this.float32[R+17]=C,this.float32[R+18]=z,this.uint8[L+76]=P,e}}Oa.prototype.bytesPerElement=80,Ss(Oa,"StructArrayLayout3i2f6i15ui1ul3f1ub80");class Fa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e){const t=this.length;return this.resize(t+1),this.emplace(t,e)}emplace(e,t){return this.float32[1*e+0]=t,e}}Fa.prototype.bytesPerElement=4,Ss(Fa,"StructArrayLayout1f4");class Na extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n){const o=this.length;return this.resize(o+1),this.emplace(o,e,t,i,r,n)}emplace(e,t,i,r,n,o){const s=5*e;return this.float32[s+0]=t,this.float32[s+1]=i,this.float32[s+2]=r,this.float32[s+3]=n,this.float32[s+4]=o,e}}Na.prototype.bytesPerElement=20,Ss(Na,"StructArrayLayout5f20");class Ua extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s){const a=this.length;return this.resize(a+1),this.emplace(a,e,t,i,r,n,o,s)}emplace(e,t,i,r,n,o,s,a){const l=7*e;return this.float32[l+0]=t,this.float32[l+1]=i,this.float32[l+2]=r,this.float32[l+3]=n,this.float32[l+4]=o,this.float32[l+5]=s,this.float32[l+6]=a,e}}Ua.prototype.bytesPerElement=28,Ss(Ua,"StructArrayLayout7f28");class ja extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e,t,i,r){const n=this.length;return this.resize(n+1),this.emplace(n,e,t,i,r)}emplace(e,t,i,r,n){const o=6*e;return this.uint32[3*e+0]=t,this.uint16[o+2]=i,this.uint16[o+3]=r,this.uint16[o+4]=n,e}}ja.prototype.bytesPerElement=12,Ss(ja,"StructArrayLayout1ul3ui12");class Va extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(e){const t=this.length;return this.resize(t+1),this.emplace(t,e)}emplace(e,t){return this.uint16[1*e+0]=t,e}}Va.prototype.bytesPerElement=2,Ss(Va,"StructArrayLayout1ui2");class Ga extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t){const i=this.length;return this.resize(i+1),this.emplace(i,e,t)}emplace(e,t,i){const r=2*e;return this.float32[r+0]=t,this.float32[r+1]=i,e}}Ga.prototype.bytesPerElement=8,Ss(Ga,"StructArrayLayout2f8");class qa extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m){const _=this.length;return this.resize(_+1),this.emplace(_,e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m)}emplace(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_){const g=16*e;return this.float32[g+0]=t,this.float32[g+1]=i,this.float32[g+2]=r,this.float32[g+3]=n,this.float32[g+4]=o,this.float32[g+5]=s,this.float32[g+6]=a,this.float32[g+7]=l,this.float32[g+8]=c,this.float32[g+9]=h,this.float32[g+10]=u,this.float32[g+11]=d,this.float32[g+12]=p,this.float32[g+13]=f,this.float32[g+14]=m,this.float32[g+15]=_,e}}qa.prototype.bytesPerElement=64,Ss(qa,"StructArrayLayout16f64");class $a extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(e,t,i,r,n,o,s){const a=this.length;return this.resize(a+1),this.emplace(a,e,t,i,r,n,o,s)}emplace(e,t,i,r,n,o,s,a){const l=10*e,c=5*e;return this.uint16[l+0]=t,this.uint16[l+1]=i,this.uint16[l+2]=r,this.uint16[l+3]=n,this.float32[c+2]=o,this.float32[c+3]=s,this.float32[c+4]=a,e}}$a.prototype.bytesPerElement=20,Ss($a,"StructArrayLayout4ui3f20");class Za extends ma{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer);}emplaceBack(e){const t=this.length;return this.resize(t+1),this.emplace(t,e)}emplace(e,t){return this.uint8[1*e+0]=t,e}}Za.prototype.bytesPerElement=1,Ss(Za,"StructArrayLayout1ub1");class Wa extends fa{get projectedAnchorX(){return this._structArray.int16[this._pos2+0]}get projectedAnchorY(){return this._structArray.int16[this._pos2+1]}get projectedAnchorZ(){return this._structArray.int16[this._pos2+2]}get tileAnchorX(){return this._structArray.int16[this._pos2+3]}get tileAnchorY(){return this._structArray.int16[this._pos2+4]}get x1(){return this._structArray.float32[this._pos4+3]}get y1(){return this._structArray.float32[this._pos4+4]}get x2(){return this._structArray.float32[this._pos4+5]}get y2(){return this._structArray.float32[this._pos4+6]}get padding(){return this._structArray.int16[this._pos2+14]}get featureIndex(){return this._structArray.uint32[this._pos4+8]}get sourceLayerIndex(){return this._structArray.uint16[this._pos2+18]}get bucketIndex(){return this._structArray.uint16[this._pos2+19]}}Wa.prototype.size=40;class Ha extends za{get(e){return new Wa(this,e)}}Ss(Ha,"CollisionBoxArray");class Xa extends fa{get projectedAnchorX(){return this._structArray.int16[this._pos2+0]}get projectedAnchorY(){return this._structArray.int16[this._pos2+1]}get projectedAnchorZ(){return this._structArray.int16[this._pos2+2]}get tileAnchorX(){return this._structArray.float32[this._pos4+2]}get tileAnchorY(){return this._structArray.float32[this._pos4+3]}get glyphStartIndex(){return this._structArray.uint16[this._pos2+8]}get numGlyphs(){return this._structArray.uint16[this._pos2+9]}get vertexStartIndex(){return this._structArray.uint32[this._pos4+5]}get lineStartIndex(){return this._structArray.uint32[this._pos4+6]}get lineLength(){return this._structArray.uint32[this._pos4+7]}get segment(){return this._structArray.uint16[this._pos2+16]}get lowerSize(){return this._structArray.uint16[this._pos2+17]}get upperSize(){return this._structArray.uint16[this._pos2+18]}get lineOffsetX(){return this._structArray.float32[this._pos4+10]}get lineOffsetY(){return this._structArray.float32[this._pos4+11]}get writingMode(){return this._structArray.uint8[this._pos1+48]}get placedOrientation(){return this._structArray.uint8[this._pos1+49]}set placedOrientation(e){this._structArray.uint8[this._pos1+49]=e;}get hidden(){return this._structArray.uint8[this._pos1+50]}set hidden(e){this._structArray.uint8[this._pos1+50]=e;}get crossTileID(){return this._structArray.uint32[this._pos4+13]}set crossTileID(e){this._structArray.uint32[this._pos4+13]=e;}get associatedIconIndex(){return this._structArray.int16[this._pos2+28]}get flipState(){return this._structArray.uint8[this._pos1+58]}set flipState(e){this._structArray.uint8[this._pos1+58]=e;}}Xa.prototype.size=60;class Ya extends Ba{get(e){return new Xa(this,e)}}Ss(Ya,"PlacedSymbolArray");class Ka extends fa{get projectedAnchorX(){return this._structArray.int16[this._pos2+0]}get projectedAnchorY(){return this._structArray.int16[this._pos2+1]}get projectedAnchorZ(){return this._structArray.int16[this._pos2+2]}get tileAnchorX(){return this._structArray.float32[this._pos4+2]}get tileAnchorY(){return this._structArray.float32[this._pos4+3]}get rightJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+8]}get centerJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+9]}get leftJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+10]}get verticalPlacedTextSymbolIndex(){return this._structArray.int16[this._pos2+11]}get placedIconSymbolIndex(){return this._structArray.int16[this._pos2+12]}get verticalPlacedIconSymbolIndex(){return this._structArray.int16[this._pos2+13]}get key(){return this._structArray.uint16[this._pos2+14]}get textBoxStartIndex(){return this._structArray.uint16[this._pos2+15]}get textBoxEndIndex(){return this._structArray.uint16[this._pos2+16]}get verticalTextBoxStartIndex(){return this._structArray.uint16[this._pos2+17]}get verticalTextBoxEndIndex(){return this._structArray.uint16[this._pos2+18]}get iconBoxStartIndex(){return this._structArray.uint16[this._pos2+19]}get iconBoxEndIndex(){return this._structArray.uint16[this._pos2+20]}get verticalIconBoxStartIndex(){return this._structArray.uint16[this._pos2+21]}get verticalIconBoxEndIndex(){return this._structArray.uint16[this._pos2+22]}get featureIndex(){return this._structArray.uint16[this._pos2+23]}get numHorizontalGlyphVertices(){return this._structArray.uint16[this._pos2+24]}get numVerticalGlyphVertices(){return this._structArray.uint16[this._pos2+25]}get numIconVertices(){return this._structArray.uint16[this._pos2+26]}get numVerticalIconVertices(){return this._structArray.uint16[this._pos2+27]}get useRuntimeCollisionCircles(){return this._structArray.uint16[this._pos2+28]}get crossTileID(){return this._structArray.uint32[this._pos4+15]}set crossTileID(e){this._structArray.uint32[this._pos4+15]=e;}get textOffset0(){return this._structArray.float32[this._pos4+16]}get textOffset1(){return this._structArray.float32[this._pos4+17]}get collisionCircleDiameter(){return this._structArray.float32[this._pos4+18]}get hasIconTextFit(){return this._structArray.uint8[this._pos1+76]}}Ka.prototype.size=80;class Ja extends Oa{get(e){return new Ka(this,e)}}Ss(Ja,"SymbolInstanceArray");class Qa extends Fa{getoffsetX(e){return this.float32[1*e+0]}}Ss(Qa,"GlyphOffsetArray");class el extends ya{getx(e){return this.int16[2*e+0]}gety(e){return this.int16[2*e+1]}}Ss(el,"SymbolLineVertexArray");class tl extends fa{get featureIndex(){return this._structArray.uint32[this._pos4+0]}get sourceLayerIndex(){return this._structArray.uint16[this._pos2+2]}get bucketIndex(){return this._structArray.uint16[this._pos2+3]}get layoutVertexArrayOffset(){return this._structArray.uint16[this._pos2+4]}}tl.prototype.size=12;class il extends ja{get(e){return new tl(this,e)}}Ss(il,"FeatureIndexArray");class rl extends Ca{geta_centroid_pos0(e){return this.uint16[2*e+0]}geta_centroid_pos1(e){return this.uint16[2*e+1]}}Ss(rl,"FillExtrusionCentroidArray");const nl=_a([{name:"a_pattern",components:4,type:"Uint16"},{name:"a_pixel_ratio",components:1,type:"Float32"}]),ol=_a([{name:"a_dash",components:4,type:"Uint16"}]);var sl={exports:{}},al={exports:{}};!function(e){e.exports=function(e,t){var i,r,n,o,s,a,l,c;for(r=e.length-(i=3&e.length),n=t,s=3432918353,a=461845907,c=0;c<r;)l=255&e.charCodeAt(c)|(255&e.charCodeAt(++c))<<8|(255&e.charCodeAt(++c))<<16|(255&e.charCodeAt(++c))<<24,++c,n=27492+(65535&(o=5*(65535&(n=(n^=l=(65535&(l=(l=(65535&l)*s+(((l>>>16)*s&65535)<<16)&4294967295)<<15|l>>>17))*a+(((l>>>16)*a&65535)<<16)&4294967295)<<13|n>>>19))+((5*(n>>>16)&65535)<<16)&4294967295))+((58964+(o>>>16)&65535)<<16);switch(l=0,i){case 3:l^=(255&e.charCodeAt(c+2))<<16;case 2:l^=(255&e.charCodeAt(c+1))<<8;case 1:n^=l=(65535&(l=(l=(65535&(l^=255&e.charCodeAt(c)))*s+(((l>>>16)*s&65535)<<16)&4294967295)<<15|l>>>17))*a+(((l>>>16)*a&65535)<<16)&4294967295;}return n^=e.length,n=2246822507*(65535&(n^=n>>>16))+((2246822507*(n>>>16)&65535)<<16)&4294967295,n=3266489909*(65535&(n^=n>>>13))+((3266489909*(n>>>16)&65535)<<16)&4294967295,(n^=n>>>16)>>>0};}(al);var ll=al.exports,cl={exports:{}};!function(e){e.exports=function(e,t){for(var i,r=e.length,n=t^r,o=0;r>=4;)i=1540483477*(65535&(i=255&e.charCodeAt(o)|(255&e.charCodeAt(++o))<<8|(255&e.charCodeAt(++o))<<16|(255&e.charCodeAt(++o))<<24))+((1540483477*(i>>>16)&65535)<<16),n=1540483477*(65535&n)+((1540483477*(n>>>16)&65535)<<16)^(i=1540483477*(65535&(i^=i>>>24))+((1540483477*(i>>>16)&65535)<<16)),r-=4,++o;switch(r){case 3:n^=(255&e.charCodeAt(o+2))<<16;case 2:n^=(255&e.charCodeAt(o+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(o)))+((1540483477*(n>>>16)&65535)<<16);}return n=1540483477*(65535&(n^=n>>>13))+((1540483477*(n>>>16)&65535)<<16),(n^=n>>>15)>>>0};}(cl);var hl=ll,ul=cl.exports;sl.exports=hl,sl.exports.murmur3=hl,sl.exports.murmur2=ul;var dl=d(sl.exports);class pl{constructor(){this.ids=[],this.uniqueIds=[],this.positions=[],this.indexed=!1;}add(e,t,i,r){this.ids.push(fl(e)),this.positions.push(t,i,r);}eachPosition(e,t){const i=fl(e);let r=0,n=this.ids.length-1;for(;r<n;){const e=r+n>>1;this.ids[e]>=i?n=e:r=e+1;}for(;this.ids[r]===i;)t(this.positions[3*r],this.positions[3*r+1],this.positions[3*r+2]),r++;}static serialize(e,t){const i=new Float64Array(e.ids),r=new Uint32Array(e.positions);return ml(i,r,0,i.length-1),t&&t.push(i.buffer,r.buffer),{ids:i,positions:r}}static deserialize(e){const t=new pl;let i;t.ids=e.ids,t.positions=e.positions;for(const e of t.ids)e!==i&&t.uniqueIds.push(e),i=e;return t.indexed=!0,t}}function fl(e){const t=+e;return !isNaN(t)&&Number.MIN_SAFE_INTEGER<=t&&t<=Number.MAX_SAFE_INTEGER?t:dl(String(e))}function ml(e,t,i,r){for(;i<r;){const n=e[i+r>>1];let o=i-1,s=r+1;for(;;){do{o++;}while(e[o]<n);do{s--;}while(e[s]>n);if(o>=s)break;_l(e,o,s),_l(t,3*o,3*s),_l(t,3*o+1,3*s+1),_l(t,3*o+2,3*s+2);}s-i<r-s?(ml(e,t,i,s),i=s+1):(ml(e,t,s+1,r),r=s);}}function _l(e,t,i){const r=e[t];e[t]=e[i],e[i]=r;}Ss(pl,"FeaturePositionMap");class gl{constructor(e){this.gl=e.gl,this.initialized=!1;}fetchUniformLocation(e,t){return this.location||this.initialized||(this.location=this.gl.getUniformLocation(e,t),this.initialized=!0),!!this.location}}class yl extends gl{constructor(e){super(e),this.current=0;}set(e,t,i){this.fetchUniformLocation(e,t)&&this.current!==i&&(this.current=i,this.gl.uniform1i(this.location,i));}}class xl extends gl{constructor(e){super(e),this.current=0;}set(e,t,i){this.fetchUniformLocation(e,t)&&this.current!==i&&(this.current=i,this.gl.uniform1f(this.location,i));}}class vl extends gl{constructor(e){super(e),this.current=[0,0];}set(e,t,i){this.fetchUniformLocation(e,t)&&(i[0]===this.current[0]&&i[1]===this.current[1]||(this.current=i,this.gl.uniform2f(this.location,i[0],i[1])));}}class bl extends gl{constructor(e){super(e),this.current=[0,0,0];}set(e,t,i){this.fetchUniformLocation(e,t)&&(i[0]===this.current[0]&&i[1]===this.current[1]&&i[2]===this.current[2]||(this.current=i,this.gl.uniform3f(this.location,i[0],i[1],i[2])));}}class wl extends gl{constructor(e){super(e),this.current=[0,0,0,0];}set(e,t,i){this.fetchUniformLocation(e,t)&&(i[0]===this.current[0]&&i[1]===this.current[1]&&i[2]===this.current[2]&&i[3]===this.current[3]||(this.current=i,this.gl.uniform4f(this.location,i[0],i[1],i[2],i[3])));}}class Tl extends gl{constructor(e){super(e),this.current=li.transparent;}set(e,t,i){this.fetchUniformLocation(e,t)&&(i.r===this.current.r&&i.g===this.current.g&&i.b===this.current.b&&i.a===this.current.a||(this.current=i,this.gl.uniform4f(this.location,i.r,i.g,i.b,i.a)));}}const El=new Float32Array(16);class Ml extends gl{constructor(e){super(e),this.current=El;}set(e,t,i){if(this.fetchUniformLocation(e,t)){if(i[12]!==this.current[12]||i[0]!==this.current[0])return this.current=i,void this.gl.uniformMatrix4fv(this.location,!1,i);for(let e=1;e<16;e++)if(i[e]!==this.current[e]){this.current=i,this.gl.uniformMatrix4fv(this.location,!1,i);break}}}}const Al=new Float32Array(9);class Sl extends gl{constructor(e){super(e),this.current=Al;}set(e,t,i){if(this.fetchUniformLocation(e,t))for(let e=0;e<9;e++)if(i[e]!==this.current[e]){this.current=i,this.gl.uniformMatrix3fv(this.location,!1,i);break}}}const Il=new Float32Array(4);class Cl extends gl{constructor(e){super(e),this.current=Il;}set(e,t,i){if(this.fetchUniformLocation(e,t))for(let e=0;e<4;e++)if(i[e]!==this.current[e]){this.current=i,this.gl.uniformMatrix2fv(this.location,!1,i);break}}}function zl(e){return [da(255*e.r,255*e.g),da(255*e.b,255*e.a)]}class Pl{constructor(e,t,i){this.value=e,this.uniformNames=t.map((e=>`u_${e}`)),this.type=i;}setUniform(e,t,i,r,n){t.set(e,n,r.constantOr(this.value));}getBinding(e,t){return "color"===this.type?new Tl(e):new xl(e)}}class Dl{constructor(e,t){this.uniformNames=t.map((e=>`u_${e}`)),this.pattern=null,this.pixelRatio=1;}setConstantPatternPositions(e){this.pixelRatio=e.pixelRatio||1,this.pattern=e.tl.concat(e.br);}setUniform(e,t,i,r,n){const o="u_pattern"===n||"u_dash"===n?this.pattern:"u_pixel_ratio"===n?this.pixelRatio:null;o&&t.set(e,n,o);}getBinding(e,t){return "u_pattern"===t||"u_dash"===t?new wl(e):new xl(e)}}class Rl{constructor(e,t,i,r){this.expression=e,this.type=i,this.maxValue=0,this.paintVertexAttributes=t.map((e=>({name:`a_${e}`,type:"Float32",components:"color"===i?2:1,offset:0}))),this.paintVertexArray=new r;}populatePaintArray(e,t,i,r,n,o,s){const a=this.paintVertexArray.length,l=this.expression.evaluate(new Qs(0,{brightness:o}),t,{},n,r,s);this.paintVertexArray.resize(e),this._setPaintValue(a,e,l);}updatePaintArray(e,t,i,r,n,o,s){const a=this.expression.evaluate({zoom:0,brightness:s},i,r,void 0,n);this._setPaintValue(e,t,a);}_setPaintValue(e,t,i){if("color"===this.type){const r=zl(i);for(let i=e;i<t;i++)this.paintVertexArray.emplace(i,r[0],r[1]);}else {for(let r=e;r<t;r++)this.paintVertexArray.emplace(r,i);this.maxValue=Math.max(this.maxValue,Math.abs(i));}}upload(e){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=e.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent||!this.expression.isLightConstant));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}}class Ll{constructor(e,t,i,r,n,o){this.expression=e,this.uniformNames=t.map((e=>`u_${e}_t`)),this.type=i,this.useIntegerZoom=r,this.zoom=n,this.maxValue=0,this.paintVertexAttributes=t.map((e=>({name:`a_${e}`,type:"Float32",components:"color"===i?4:2,offset:0}))),this.paintVertexArray=new o;}populatePaintArray(e,t,i,r,n,o,s){const a=this.expression.evaluate(new Qs(this.zoom,{brightness:o}),t,{},n,r,s),l=this.expression.evaluate(new Qs(this.zoom+1,{brightness:o}),t,{},n,r,s),c=this.paintVertexArray.length;this.paintVertexArray.resize(e),this._setPaintValue(c,e,a,l);}updatePaintArray(e,t,i,r,n,o,s){const a=this.expression.evaluate({zoom:this.zoom,brightness:s},i,r,void 0,n),l=this.expression.evaluate({zoom:this.zoom+1,brightness:s},i,r,void 0,n);this._setPaintValue(e,t,a,l);}_setPaintValue(e,t,i,r){if("color"===this.type){const n=zl(i),o=zl(r);for(let i=e;i<t;i++)this.paintVertexArray.emplace(i,n[0],n[1],o[0],o[1]);}else {for(let n=e;n<t;n++)this.paintVertexArray.emplace(n,i,r);this.maxValue=Math.max(this.maxValue,Math.abs(i),Math.abs(r));}}upload(e){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=e.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent||!this.expression.isLightConstant));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}setUniform(e,t,i,r,n){const o=this.useIntegerZoom?Math.floor(i.zoom):i.zoom,s=z(this.expression.interpolationFactor(o,this.zoom,this.zoom+1),0,1);t.set(e,n,s);}getBinding(e,t){return new xl(e)}}class kl{constructor(e,t,i,r,n){this.expression=e,this.layerId=n,this.paintVertexAttributes=("array"===i?ol:nl).members;for(let e=0;e<t.length;++e);this.paintVertexArray=new r;}populatePaintArray(e,t,i){const r=this.paintVertexArray.length;this.paintVertexArray.resize(e),this._setPaintValues(r,e,t.patterns&&t.patterns[this.layerId],i);}updatePaintArray(e,t,i,r,n,o,s){this._setPaintValues(e,t,i.patterns&&i.patterns[this.layerId],o);}_setPaintValues(e,t,i,r){if(!r||!i)return;const n=r[i];if(!n)return;const{tl:o,br:s,pixelRatio:a}=n;for(let i=e;i<t;i++)this.paintVertexArray.emplace(i,o[0],o[1],s[0],s[1],a);}upload(e){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer=e.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent||!this.expression.isLightConstant));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}}class Bl{constructor(e,t,i=(()=>!0)){this.binders={},this._buffers=[];const r=[];for(const n in e.paint._values){if(!i(n))continue;const o=e.paint.get(n);if(!(o instanceof sa&&ro(o.property.specification)))continue;const s=Nl(n,e.type),a=o.value,l=o.property.specification.type,c=!!o.property.useIntegerZoom,h="line-dasharray"===n||n.endsWith("pattern"),u="line-dasharray"===n&&"constant"!==e.layout.get("line-cap").value.kind;if("constant"!==a.kind||u)if("source"===a.kind||u||h){const t=Vl(n,l,"source");this.binders[n]=h?new kl(a,s,l,t,e.id):new Rl(a,s,l,t),r.push(`/a_${n}`);}else {const e=Vl(n,l,"composite");this.binders[n]=new Ll(a,s,l,c,t,e),r.push(`/z_${n}`);}else this.binders[n]=h?new Dl(a.value,s):new Pl(a.value,s,l),r.push(`/u_${n}`);}this.cacheKey=r.sort().join("");}getMaxValue(e){const t=this.binders[e];return t instanceof Rl||t instanceof Ll?t.maxValue:0}populatePaintArrays(e,t,i,r,n,o,s){for(const a in this.binders){const l=this.binders[a];(l instanceof Rl||l instanceof Ll||l instanceof kl)&&l.populatePaintArray(e,t,i,r,n,o,s);}}setConstantPatternPositions(e){for(const t in this.binders){const i=this.binders[t];i instanceof Dl&&i.setConstantPatternPositions(e);}}updatePaintArrays(e,t,i,r,n,o,s){let a=!1;const l=Object.keys(e),c=0===l.length?t.uniqueIds:l;if(0===c.length)return !1;for(const l in this.binders){const h=this.binders[l];if((h instanceof Rl||h instanceof Ll||h instanceof kl)&&(!0===h.expression.isStateDependent||!1===h.expression.isLightConstant)){const u=r.paint.get(l);h.expression=u.value;for(const r of c){const a=e[r.toString()];t.eachPosition(r,((e,t,r)=>{const l=i.feature(e);h.updatePaintArray(t,r,l,a,n,o,s);}));}a=!0;}}return a}defines(){const e=[];for(const t in this.binders){const i=this.binders[t];(i instanceof Pl||i instanceof Dl)&&e.push(...i.uniformNames.map((e=>`#define HAS_UNIFORM_${e}`)));}return e}getBinderAttributes(){const e=[];for(const t in this.binders){const i=this.binders[t];if(i instanceof Rl||i instanceof Ll||i instanceof kl)for(let t=0;t<i.paintVertexAttributes.length;t++)e.push(i.paintVertexAttributes[t].name);}return e}getBinderUniforms(){const e=[];for(const t in this.binders){const i=this.binders[t];if(i instanceof Pl||i instanceof Dl||i instanceof Ll)for(const t of i.uniformNames)e.push(t);}return e}getPaintVertexBuffers(){return this._buffers}getUniforms(e){const t=[];for(const i in this.binders){const r=this.binders[i];if(r instanceof Pl||r instanceof Dl||r instanceof Ll)for(const n of r.uniformNames)t.push({name:n,property:i,binding:r.getBinding(e,n)});}return t}setUniforms(e,t,i,r,n){for(const{name:t,property:o,binding:s}of i)this.binders[o].setUniform(e,s,n,r.get(o),t);}updatePaintBuffers(){this._buffers=[];for(const e in this.binders){const t=this.binders[e];(t instanceof Rl||t instanceof Ll||t instanceof kl)&&t.paintVertexBuffer&&this._buffers.push(t.paintVertexBuffer);}}upload(e){for(const t in this.binders){const i=this.binders[t];(i instanceof Rl||i instanceof Ll||i instanceof kl)&&i.upload(e);}this.updatePaintBuffers();}destroy(){for(const e in this.binders){const t=this.binders[e];(t instanceof Rl||t instanceof Ll||t instanceof kl)&&t.destroy();}}}class Ol{constructor(e,t,i=(()=>!0)){this.programConfigurations={};for(const r of e)this.programConfigurations[r.id]=new Bl(r,t,i);this.needsUpload=!1,this._featureMap=new pl,this._bufferOffset=0;}populatePaintArrays(e,t,i,r,n,o,s,a){for(const i in this.programConfigurations)this.programConfigurations[i].populatePaintArrays(e,t,r,n,o,s,a);void 0!==t.id&&this._featureMap.add(t.id,i,this._bufferOffset,e),this._bufferOffset=e,this.needsUpload=!0;}updatePaintArrays(e,t,i,r,n,o){for(const s of i)this.needsUpload=this.programConfigurations[s.id].updatePaintArrays(e,this._featureMap,t,s,r,n,o||0)||this.needsUpload;}get(e){return this.programConfigurations[e]}upload(e){if(this.needsUpload){for(const t in this.programConfigurations)this.programConfigurations[t].upload(e);this.needsUpload=!1;}}destroy(){for(const e in this.programConfigurations)this.programConfigurations[e].destroy();}}const Fl={"text-opacity":["opacity"],"icon-opacity":["opacity"],"text-color":["fill_color"],"icon-color":["fill_color"],"text-emissive-strength":["emissive_strength"],"icon-emissive-strength":["emissive_strength"],"text-halo-color":["halo_color"],"icon-halo-color":["halo_color"],"text-halo-blur":["halo_blur"],"icon-halo-blur":["halo_blur"],"text-halo-width":["halo_width"],"icon-halo-width":["halo_width"],"line-gap-width":["gapwidth"],"line-pattern":["pattern","pixel_ratio"],"fill-pattern":["pattern","pixel_ratio"],"fill-extrusion-pattern":["pattern","pixel_ratio"],"line-dasharray":["dash"]};function Nl(e,t){return Fl[e]||[e.replace(`${t}-`,"").replace(/-/g,"_")]}const Ul={"line-pattern":{source:Ta,composite:Ta},"fill-pattern":{source:Ta,composite:Ta},"fill-extrusion-pattern":{source:Ta,composite:Ta},"line-dasharray":{source:Ea,composite:Ea}},jl={color:{source:Ga,composite:wa},number:{source:Fa,composite:Ga}};function Vl(e,t,i){const r=Ul[e];return r&&r[i]||jl[t][i]}Ss(Pl,"ConstantBinder"),Ss(Dl,"PatternConstantBinder"),Ss(Rl,"SourceExpressionBinder"),Ss(kl,"PatternCompositeBinder"),Ss(Ll,"CompositeExpressionBinder"),Ss(Bl,"ProgramConfiguration",{omit:["_buffers"]}),Ss(Ol,"ProgramConfigurationSet");const Gl="-transition";class ql extends Ct{constructor(e,t,i){if(super(),this.id=e.id,this.type=e.type,this._featureFilter={filter:()=>!0,needGeometry:!1,needFeature:!1},this._filterCompiled=!1,this.isConfigDependent=!1,"custom"!==e.type&&(this.metadata=e.metadata,this.minzoom=e.minzoom,this.maxzoom=e.maxzoom,"background"!==e.type&&"sky"!==e.type&&"slot"!==e.type&&(this.source=e.source,this.sourceLayer=e["source-layer"],this.filter=e.filter),this.options=i,e.slot&&(this.slot=e.slot),t.layout&&(this._unevaluatedLayout=new oa(t.layout,i),this.isConfigDependent=this.isConfigDependent||this._unevaluatedLayout.isConfigDependent),t.paint)){this._transitionablePaint=new ia(t.paint,i);for(const t in e.paint)this.setPaintProperty(t,e.paint[t],{validate:!1});for(const t in e.layout)this.setLayoutProperty(t,e.layout[t],{validate:!1});this.isConfigDependent=this.isConfigDependent||this._transitionablePaint.isConfigDependent,this._transitioningPaint=this._transitionablePaint.untransitioned(),this.paint=new aa(t.paint);}}getLayoutProperty(e){return "visibility"===e?this.visibility:this._unevaluatedLayout.getValue(e)}setLayoutProperty(e,t,i={}){null!=t&&this._validate(ys,`layers.${this.id}.layout.${e}`,e,t,i)||(this._unevaluatedLayout.setValue(e,t),this.isConfigDependent=this.isConfigDependent||this._unevaluatedLayout.isConfigDependent,"visibility"===e&&(this.visibility=this._unevaluatedLayout._values.visibility.possiblyEvaluate({zoom:0})));}getPaintProperty(e){return G(e,Gl)?this._transitionablePaint.getTransition(e.slice(0,-11)):this._transitionablePaint.getValue(e)}setPaintProperty(e,t,i={}){if(null!=t&&this._validate(gs,`layers.${this.id}.paint.${e}`,e,t,i))return !1;if(G(e,Gl))return this._transitionablePaint.setTransition(e.slice(0,-11),t||void 0),!1;{const i=this._transitionablePaint._values[e],r=i.value.isDataDriven(),n=i.value;this._transitionablePaint.setValue(e,t),this.isConfigDependent=this.isConfigDependent||this._transitionablePaint.isConfigDependent,this._handleSpecialPaintPropertyUpdate(e);const o=this._transitionablePaint._values[e].value,s=o.isDataDriven(),a=G(e,"pattern")||"line-dasharray"===e;return s||r||a||this._handleOverridablePaintPropertyUpdate(e,n,o)}}_handleSpecialPaintPropertyUpdate(e){}getProgramIds(){return null}getProgramConfiguration(e){return null}_handleOverridablePaintPropertyUpdate(e,t,i){return !1}isHidden(e){return !!(this.minzoom&&e<this.minzoom)||!!(this.maxzoom&&e>=this.maxzoom)||"none"===this.visibility}updateTransitions(e){this._transitioningPaint=this._transitionablePaint.transitioned(e,this._transitioningPaint);}hasTransition(){return this._transitioningPaint.hasTransition()}recalculate(e,t){this._unevaluatedLayout&&(this.layout=this._unevaluatedLayout.possiblyEvaluate(e,void 0,t)),this.paint=this._transitioningPaint.possiblyEvaluate(e,void 0,t);}serialize(){return $({id:this.id,type:this.type,source:this.source,"source-layer":this.sourceLayer,metadata:this.metadata,minzoom:this.minzoom,maxzoom:this.maxzoom,filter:this.filter,layout:this._unevaluatedLayout&&this._unevaluatedLayout.serialize(),paint:this._transitionablePaint&&this._transitionablePaint.serialize()},((e,t)=>!(void 0===e||"layout"===t&&!Object.keys(e).length||"paint"===t&&!Object.keys(e).length)))}_validate(e,t,i,r,n={}){return (!n||!1!==n.validate)&&bs(this,e.call(cs,{key:t,layerType:this.type,objectKey:i,value:r,styleSpec:zt,style:{glyphs:!0,sprite:!0}}))}is3D(){return !1}isSky(){return !1}isTileClipped(){return !1}hasOffscreenPass(){return !1}hasShadowPass(){return !1}hasLightBeamPass(){return !1}resize(){}isStateDependent(){for(const e in this.paint._values){const t=this.paint.get(e);if(t instanceof sa&&ro(t.property.specification)&&("source"===t.value.kind||"composite"===t.value.kind)&&t.value.isStateDependent)return !0}return !1}compileFilter(){this._filterCompiled||(this._featureFilter=Do(this.filter),this._filterCompiled=!0);}invalidateCompiledFilter(){this._filterCompiled=!1;}dynamicFilter(){return this._featureFilter.dynamicFilter}dynamicFilterNeedsFeature(){return this._featureFilter.needFeature}}const $l=_a([{name:"a_pos",components:2,type:"Int16"}],4),Zl=_a([{name:"a_pos_3",components:3,type:"Int16"},{name:"a_pos_normal_3",components:3,type:"Int16"}]);class Wl{constructor(e=[]){this.segments=e;}prepareSegment(e,t,i,r){let n=this.segments[this.segments.length-1];return e>Wl.MAX_VERTEX_ARRAY_LENGTH&&H(`Max vertices per segment is ${Wl.MAX_VERTEX_ARRAY_LENGTH}: bucket requested ${e}`),(!n||n.vertexLength+e>Wl.MAX_VERTEX_ARRAY_LENGTH||n.sortKey!==r)&&(n={vertexOffset:t.length,primitiveOffset:i.length,vertexLength:0,primitiveLength:0},void 0!==r&&(n.sortKey=r),this.segments.push(n)),n}get(){return this.segments}destroy(){for(const e of this.segments)for(const t in e.vaos)e.vaos[t].destroy();}static simpleSegment(e,t,i,r){return new Wl([{vertexOffset:e,primitiveOffset:t,vertexLength:i,primitiveLength:r,vaos:{},sortKey:0}])}}Wl.MAX_VERTEX_ARRAY_LENGTH=Math.pow(2,16)-1,Ss(Wl,"SegmentVector");class Hl{constructor(e,t){e&&(t?this.setSouthWest(e).setNorthEast(t):4===e.length?this.setSouthWest([e[0],e[1]]).setNorthEast([e[2],e[3]]):this.setSouthWest(e[0]).setNorthEast(e[1]));}setNorthEast(e){return this._ne=e instanceof Ad?new Ad(e.lng,e.lat):Ad.convert(e),this}setSouthWest(e){return this._sw=e instanceof Ad?new Ad(e.lng,e.lat):Ad.convert(e),this}extend(e){const t=this._sw,i=this._ne;let r,n;if(e instanceof Ad)r=e,n=e;else {if(!(e instanceof Hl))return Array.isArray(e)?4===e.length||e.every(Array.isArray)?this.extend(Hl.convert(e)):this.extend(Ad.convert(e)):"object"==typeof e&&null!==e&&e.hasOwnProperty("lat")&&(e.hasOwnProperty("lon")||e.hasOwnProperty("lng"))?this.extend(Ad.convert(e)):this;if(r=e._sw,n=e._ne,!r||!n)return this}return t||i?(t.lng=Math.min(r.lng,t.lng),t.lat=Math.min(r.lat,t.lat),i.lng=Math.max(n.lng,i.lng),i.lat=Math.max(n.lat,i.lat)):(this._sw=new Ad(r.lng,r.lat),this._ne=new Ad(n.lng,n.lat)),this}getCenter(){return new Ad((this._sw.lng+this._ne.lng)/2,(this._sw.lat+this._ne.lat)/2)}getSouthWest(){return this._sw}getNorthEast(){return this._ne}getNorthWest(){return new Ad(this.getWest(),this.getNorth())}getSouthEast(){return new Ad(this.getEast(),this.getSouth())}getWest(){return this._sw.lng}getSouth(){return this._sw.lat}getEast(){return this._ne.lng}getNorth(){return this._ne.lat}toArray(){return [this._sw.toArray(),this._ne.toArray()]}toString(){return `LngLatBounds(${this._sw.toString()}, ${this._ne.toString()})`}isEmpty(){return !(this._sw&&this._ne)}contains(e){const{lng:t,lat:i}=Ad.convert(e);let r=this._sw.lng<=t&&t<=this._ne.lng;return this._sw.lng>this._ne.lng&&(r=this._sw.lng>=t&&t>=this._ne.lng),this._sw.lat<=i&&i<=this._ne.lat&&r}static convert(e){return !e||e instanceof Hl?e:new Hl(e)}}var Xl={},Yl={};Object.defineProperty(Yl,"__esModule",{value:!0}),Yl.setMatrixArrayType=function(e){Yl.ARRAY_TYPE=Jl=e;},Yl.toRadian=function(e){return e*ec},Yl.equals=function(e,t){return Math.abs(e-t)<=Kl*Math.max(1,Math.abs(e),Math.abs(t))},Yl.RANDOM=Yl.ARRAY_TYPE=Yl.EPSILON=void 0;var Kl=1e-6;Yl.EPSILON=Kl;var Jl="undefined"!=typeof Float32Array?Float32Array:Array;Yl.ARRAY_TYPE=Jl;var Ql=Math.random;Yl.RANDOM=Ql;var ec=Math.PI/180;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var tc={};function ic(e){return ic="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ic(e)}Object.defineProperty(tc,"__esModule",{value:!0}),tc.create=function(){var e=new rc.ARRAY_TYPE(4);return rc.ARRAY_TYPE!=Float32Array&&(e[1]=0,e[2]=0),e[0]=1,e[3]=1,e},tc.clone=function(e){var t=new rc.ARRAY_TYPE(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},tc.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e},tc.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e},tc.fromValues=function(e,t,i,r){var n=new rc.ARRAY_TYPE(4);return n[0]=e,n[1]=t,n[2]=i,n[3]=r,n},tc.set=function(e,t,i,r,n){return e[0]=t,e[1]=i,e[2]=r,e[3]=n,e},tc.transpose=function(e,t){if(e===t){var i=t[1];e[1]=t[2],e[2]=i;}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e},tc.invert=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=i*o-n*r;return s?(e[0]=o*(s=1/s),e[1]=-r*s,e[2]=-n*s,e[3]=i*s,e):null},tc.adjoint=function(e,t){var i=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=i,e},tc.determinant=function(e){return e[0]*e[3]-e[2]*e[1]},tc.multiply=oc,tc.rotate=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=Math.sin(i),l=Math.cos(i);return e[0]=r*l+o*a,e[1]=n*l+s*a,e[2]=r*-a+o*l,e[3]=n*-a+s*l,e},tc.scale=function(e,t,i){var r=t[1],n=t[2],o=t[3],s=i[0],a=i[1];return e[0]=t[0]*s,e[1]=r*s,e[2]=n*a,e[3]=o*a,e},tc.fromRotation=function(e,t){var i=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=i,e[2]=-i,e[3]=r,e},tc.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e},tc.str=function(e){return "mat2("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},tc.frob=function(e){return Math.hypot(e[0],e[1],e[2],e[3])},tc.LDU=function(e,t,i,r){return e[2]=r[2]/r[0],i[0]=r[0],i[1]=r[1],i[3]=r[3]-e[2]*i[1],[e,t,i]},tc.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e[3]=t[3]+i[3],e},tc.subtract=sc,tc.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]},tc.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=e[3],s=t[0],a=t[1],l=t[2],c=t[3];return Math.abs(i-s)<=rc.EPSILON*Math.max(1,Math.abs(i),Math.abs(s))&&Math.abs(r-a)<=rc.EPSILON*Math.max(1,Math.abs(r),Math.abs(a))&&Math.abs(n-l)<=rc.EPSILON*Math.max(1,Math.abs(n),Math.abs(l))&&Math.abs(o-c)<=rc.EPSILON*Math.max(1,Math.abs(o),Math.abs(c))},tc.multiplyScalar=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e},tc.multiplyScalarAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e[2]=t[2]+i[2]*r,e[3]=t[3]+i[3]*r,e},tc.sub=tc.mul=void 0;var rc=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==ic(e)&&"function"!=typeof e)return {default:e};var i=nc(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function nc(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (nc=function(e){return e?i:t})(e)}function oc(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=i[0],l=i[1],c=i[2],h=i[3];return e[0]=r*a+o*l,e[1]=n*a+s*l,e[2]=r*c+o*h,e[3]=n*c+s*h,e}function sc(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e[3]=t[3]-i[3],e}tc.mul=oc,tc.sub=sc;var ac={};function lc(e){return lc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},lc(e)}Object.defineProperty(ac,"__esModule",{value:!0}),ac.create=function(){var e=new cc.ARRAY_TYPE(6);return cc.ARRAY_TYPE!=Float32Array&&(e[1]=0,e[2]=0,e[4]=0,e[5]=0),e[0]=1,e[3]=1,e},ac.clone=function(e){var t=new cc.ARRAY_TYPE(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t},ac.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e},ac.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e},ac.fromValues=function(e,t,i,r,n,o){var s=new cc.ARRAY_TYPE(6);return s[0]=e,s[1]=t,s[2]=i,s[3]=r,s[4]=n,s[5]=o,s},ac.set=function(e,t,i,r,n,o,s){return e[0]=t,e[1]=i,e[2]=r,e[3]=n,e[4]=o,e[5]=s,e},ac.invert=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=i*o-r*n;return l?(e[0]=o*(l=1/l),e[1]=-r*l,e[2]=-n*l,e[3]=i*l,e[4]=(n*a-o*s)*l,e[5]=(r*s-i*a)*l,e):null},ac.determinant=function(e){return e[0]*e[3]-e[1]*e[2]},ac.multiply=uc,ac.rotate=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=Math.sin(i),h=Math.cos(i);return e[0]=r*h+o*c,e[1]=n*h+s*c,e[2]=r*-c+o*h,e[3]=n*-c+s*h,e[4]=a,e[5]=l,e},ac.scale=function(e,t,i){var r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=i[0],c=i[1];return e[0]=t[0]*l,e[1]=r*l,e[2]=n*c,e[3]=o*c,e[4]=s,e[5]=a,e},ac.translate=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=i[0],h=i[1];return e[0]=r,e[1]=n,e[2]=o,e[3]=s,e[4]=r*c+o*h+a,e[5]=n*c+s*h+l,e},ac.fromRotation=function(e,t){var i=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=i,e[2]=-i,e[3]=r,e[4]=0,e[5]=0,e},ac.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e[4]=0,e[5]=0,e},ac.fromTranslation=function(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=t[0],e[5]=t[1],e},ac.str=function(e){return "mat2d("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+")"},ac.frob=function(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],1)},ac.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e[3]=t[3]+i[3],e[4]=t[4]+i[4],e[5]=t[5]+i[5],e},ac.subtract=dc,ac.multiplyScalar=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*i,e[5]=t[5]*i,e},ac.multiplyScalarAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e[2]=t[2]+i[2]*r,e[3]=t[3]+i[3]*r,e[4]=t[4]+i[4]*r,e[5]=t[5]+i[5]*r,e},ac.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]},ac.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=t[0],c=t[1],h=t[2],u=t[3],d=t[4],p=t[5];return Math.abs(i-l)<=cc.EPSILON*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(r-c)<=cc.EPSILON*Math.max(1,Math.abs(r),Math.abs(c))&&Math.abs(n-h)<=cc.EPSILON*Math.max(1,Math.abs(n),Math.abs(h))&&Math.abs(o-u)<=cc.EPSILON*Math.max(1,Math.abs(o),Math.abs(u))&&Math.abs(s-d)<=cc.EPSILON*Math.max(1,Math.abs(s),Math.abs(d))&&Math.abs(a-p)<=cc.EPSILON*Math.max(1,Math.abs(a),Math.abs(p))},ac.sub=ac.mul=void 0;var cc=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==lc(e)&&"function"!=typeof e)return {default:e};var i=hc(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function hc(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (hc=function(e){return e?i:t})(e)}function uc(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=i[0],h=i[1],u=i[2],d=i[3],p=i[4],f=i[5];return e[0]=r*c+o*h,e[1]=n*c+s*h,e[2]=r*u+o*d,e[3]=n*u+s*d,e[4]=r*p+o*f+a,e[5]=n*p+s*f+l,e}function dc(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e[3]=t[3]-i[3],e[4]=t[4]-i[4],e[5]=t[5]-i[5],e}ac.mul=uc,ac.sub=dc;var pc={};function fc(e){return fc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},fc(e)}Object.defineProperty(pc,"__esModule",{value:!0}),pc.create=function(){var e=new mc.ARRAY_TYPE(9);return mc.ARRAY_TYPE!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e},pc.fromMat4=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e},pc.clone=function(e){var t=new mc.ARRAY_TYPE(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t},pc.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e},pc.fromValues=function(e,t,i,r,n,o,s,a,l){var c=new mc.ARRAY_TYPE(9);return c[0]=e,c[1]=t,c[2]=i,c[3]=r,c[4]=n,c[5]=o,c[6]=s,c[7]=a,c[8]=l,c},pc.set=function(e,t,i,r,n,o,s,a,l,c){return e[0]=t,e[1]=i,e[2]=r,e[3]=n,e[4]=o,e[5]=s,e[6]=a,e[7]=l,e[8]=c,e},pc.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},pc.transpose=function(e,t){if(e===t){var i=t[1],r=t[2],n=t[5];e[1]=t[3],e[2]=t[6],e[3]=i,e[5]=t[7],e[6]=r,e[7]=n;}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e},pc.invert=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*s-a*c,d=-h*o+a*l,p=c*o-s*l,f=i*u+r*d+n*p;return f?(e[0]=u*(f=1/f),e[1]=(-h*r+n*c)*f,e[2]=(a*r-n*s)*f,e[3]=d*f,e[4]=(h*i-n*l)*f,e[5]=(-a*i+n*o)*f,e[6]=p*f,e[7]=(-c*i+r*l)*f,e[8]=(s*i-r*o)*f,e):null},pc.adjoint=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e[0]=s*h-a*c,e[1]=n*c-r*h,e[2]=r*a-n*s,e[3]=a*l-o*h,e[4]=i*h-n*l,e[5]=n*o-i*a,e[6]=o*c-s*l,e[7]=r*l-i*c,e[8]=i*s-r*o,e},pc.determinant=function(e){var t=e[3],i=e[4],r=e[5],n=e[6],o=e[7],s=e[8];return e[0]*(s*i-r*o)+e[1]*(-s*t+r*n)+e[2]*(o*t-i*n)},pc.multiply=gc,pc.translate=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=i[0],p=i[1];return e[0]=r,e[1]=n,e[2]=o,e[3]=s,e[4]=a,e[5]=l,e[6]=d*r+p*s+c,e[7]=d*n+p*a+h,e[8]=d*o+p*l+u,e},pc.rotate=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=Math.sin(i),p=Math.cos(i);return e[0]=p*r+d*s,e[1]=p*n+d*a,e[2]=p*o+d*l,e[3]=p*s-d*r,e[4]=p*a-d*n,e[5]=p*l-d*o,e[6]=c,e[7]=h,e[8]=u,e},pc.scale=function(e,t,i){var r=i[0],n=i[1];return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=n*t[3],e[4]=n*t[4],e[5]=n*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e},pc.fromTranslation=function(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=t[0],e[7]=t[1],e[8]=1,e},pc.fromRotation=function(e,t){var i=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=i,e[2]=0,e[3]=-i,e[4]=r,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},pc.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=t[1],e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},pc.fromMat2d=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e},pc.fromQuat=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=i+i,a=r+r,l=n+n,c=i*s,h=r*s,u=r*a,d=n*s,p=n*a,f=n*l,m=o*s,_=o*a,g=o*l;return e[0]=1-u-f,e[3]=h-g,e[6]=d+_,e[1]=h+g,e[4]=1-c-f,e[7]=p-m,e[2]=d-_,e[5]=p+m,e[8]=1-c-u,e},pc.normalFromMat4=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],f=t[12],m=t[13],_=t[14],g=t[15],y=i*a-r*s,x=i*l-n*s,v=i*c-o*s,b=r*l-n*a,w=r*c-o*a,T=n*c-o*l,E=h*m-u*f,M=h*_-d*f,A=h*g-p*f,S=u*_-d*m,I=u*g-p*m,C=d*g-p*_,z=y*C-x*I+v*S+b*A-w*M+T*E;return z?(e[0]=(a*C-l*I+c*S)*(z=1/z),e[1]=(l*A-s*C-c*M)*z,e[2]=(s*I-a*A+c*E)*z,e[3]=(n*I-r*C-o*S)*z,e[4]=(i*C-n*A+o*M)*z,e[5]=(r*A-i*I-o*E)*z,e[6]=(m*T-_*w+g*b)*z,e[7]=(_*v-f*T-g*x)*z,e[8]=(f*w-m*v+g*y)*z,e):null},pc.projection=function(e,t,i){return e[0]=2/t,e[1]=0,e[2]=0,e[3]=0,e[4]=-2/i,e[5]=0,e[6]=-1,e[7]=1,e[8]=1,e},pc.str=function(e){return "mat3("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+", "+e[6]+", "+e[7]+", "+e[8]+")"},pc.frob=function(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])},pc.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e[3]=t[3]+i[3],e[4]=t[4]+i[4],e[5]=t[5]+i[5],e[6]=t[6]+i[6],e[7]=t[7]+i[7],e[8]=t[8]+i[8],e},pc.subtract=yc,pc.multiplyScalar=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*i,e},pc.multiplyScalarAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e[2]=t[2]+i[2]*r,e[3]=t[3]+i[3]*r,e[4]=t[4]+i[4]*r,e[5]=t[5]+i[5]*r,e[6]=t[6]+i[6]*r,e[7]=t[7]+i[7]*r,e[8]=t[8]+i[8]*r,e},pc.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]},pc.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=t[0],d=t[1],p=t[2],f=t[3],m=t[4],_=t[5],g=t[6],y=t[7],x=t[8];return Math.abs(i-u)<=mc.EPSILON*Math.max(1,Math.abs(i),Math.abs(u))&&Math.abs(r-d)<=mc.EPSILON*Math.max(1,Math.abs(r),Math.abs(d))&&Math.abs(n-p)<=mc.EPSILON*Math.max(1,Math.abs(n),Math.abs(p))&&Math.abs(o-f)<=mc.EPSILON*Math.max(1,Math.abs(o),Math.abs(f))&&Math.abs(s-m)<=mc.EPSILON*Math.max(1,Math.abs(s),Math.abs(m))&&Math.abs(a-_)<=mc.EPSILON*Math.max(1,Math.abs(a),Math.abs(_))&&Math.abs(l-g)<=mc.EPSILON*Math.max(1,Math.abs(l),Math.abs(g))&&Math.abs(c-y)<=mc.EPSILON*Math.max(1,Math.abs(c),Math.abs(y))&&Math.abs(h-x)<=mc.EPSILON*Math.max(1,Math.abs(h),Math.abs(x))},pc.sub=pc.mul=void 0;var mc=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==fc(e)&&"function"!=typeof e)return {default:e};var i=_c(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function _c(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (_c=function(e){return e?i:t})(e)}function gc(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=i[0],p=i[1],f=i[2],m=i[3],_=i[4],g=i[5],y=i[6],x=i[7],v=i[8];return e[0]=d*r+p*s+f*c,e[1]=d*n+p*a+f*h,e[2]=d*o+p*l+f*u,e[3]=m*r+_*s+g*c,e[4]=m*n+_*a+g*h,e[5]=m*o+_*l+g*u,e[6]=y*r+x*s+v*c,e[7]=y*n+x*a+v*h,e[8]=y*o+x*l+v*u,e}function yc(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e[3]=t[3]-i[3],e[4]=t[4]-i[4],e[5]=t[5]-i[5],e[6]=t[6]-i[6],e[7]=t[7]-i[7],e[8]=t[8]-i[8],e}pc.mul=gc,pc.sub=yc;var xc={};function vc(e){return vc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},vc(e)}Object.defineProperty(xc,"__esModule",{value:!0}),xc.create=function(){var e=new bc.ARRAY_TYPE(16);return bc.ARRAY_TYPE!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e},xc.clone=function(e){var t=new bc.ARRAY_TYPE(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},xc.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},xc.fromValues=function(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m){var _=new bc.ARRAY_TYPE(16);return _[0]=e,_[1]=t,_[2]=i,_[3]=r,_[4]=n,_[5]=o,_[6]=s,_[7]=a,_[8]=l,_[9]=c,_[10]=h,_[11]=u,_[12]=d,_[13]=p,_[14]=f,_[15]=m,_},xc.set=function(e,t,i,r,n,o,s,a,l,c,h,u,d,p,f,m,_){return e[0]=t,e[1]=i,e[2]=r,e[3]=n,e[4]=o,e[5]=s,e[6]=a,e[7]=l,e[8]=c,e[9]=h,e[10]=u,e[11]=d,e[12]=p,e[13]=f,e[14]=m,e[15]=_,e},xc.identity=Tc,xc.transpose=function(e,t){if(e===t){var i=t[1],r=t[2],n=t[3],o=t[6],s=t[7],a=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=i,e[6]=t[9],e[7]=t[13],e[8]=r,e[9]=o,e[11]=t[14],e[12]=n,e[13]=s,e[14]=a;}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e},xc.invert=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],f=t[12],m=t[13],_=t[14],g=t[15],y=i*a-r*s,x=i*l-n*s,v=i*c-o*s,b=r*l-n*a,w=r*c-o*a,T=n*c-o*l,E=h*m-u*f,M=h*_-d*f,A=h*g-p*f,S=u*_-d*m,I=u*g-p*m,C=d*g-p*_,z=y*C-x*I+v*S+b*A-w*M+T*E;return z?(e[0]=(a*C-l*I+c*S)*(z=1/z),e[1]=(n*I-r*C-o*S)*z,e[2]=(m*T-_*w+g*b)*z,e[3]=(d*w-u*T-p*b)*z,e[4]=(l*A-s*C-c*M)*z,e[5]=(i*C-n*A+o*M)*z,e[6]=(_*v-f*T-g*x)*z,e[7]=(h*T-d*v+p*x)*z,e[8]=(s*I-a*A+c*E)*z,e[9]=(r*A-i*I-o*E)*z,e[10]=(f*w-m*v+g*y)*z,e[11]=(u*v-h*w-p*y)*z,e[12]=(a*M-s*S-l*E)*z,e[13]=(i*S-r*M+n*E)*z,e[14]=(m*x-f*b-_*y)*z,e[15]=(h*b-u*x+d*y)*z,e):null},xc.adjoint=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],f=t[12],m=t[13],_=t[14],g=t[15];return e[0]=a*(d*g-p*_)-u*(l*g-c*_)+m*(l*p-c*d),e[1]=-(r*(d*g-p*_)-u*(n*g-o*_)+m*(n*p-o*d)),e[2]=r*(l*g-c*_)-a*(n*g-o*_)+m*(n*c-o*l),e[3]=-(r*(l*p-c*d)-a*(n*p-o*d)+u*(n*c-o*l)),e[4]=-(s*(d*g-p*_)-h*(l*g-c*_)+f*(l*p-c*d)),e[5]=i*(d*g-p*_)-h*(n*g-o*_)+f*(n*p-o*d),e[6]=-(i*(l*g-c*_)-s*(n*g-o*_)+f*(n*c-o*l)),e[7]=i*(l*p-c*d)-s*(n*p-o*d)+h*(n*c-o*l),e[8]=s*(u*g-p*m)-h*(a*g-c*m)+f*(a*p-c*u),e[9]=-(i*(u*g-p*m)-h*(r*g-o*m)+f*(r*p-o*u)),e[10]=i*(a*g-c*m)-s*(r*g-o*m)+f*(r*c-o*a),e[11]=-(i*(a*p-c*u)-s*(r*p-o*u)+h*(r*c-o*a)),e[12]=-(s*(u*_-d*m)-h*(a*_-l*m)+f*(a*d-l*u)),e[13]=i*(u*_-d*m)-h*(r*_-n*m)+f*(r*d-n*u),e[14]=-(i*(a*_-l*m)-s*(r*_-n*m)+f*(r*l-n*a)),e[15]=i*(a*d-l*u)-s*(r*d-n*u)+h*(r*l-n*a),e},xc.determinant=function(e){var t=e[0],i=e[1],r=e[2],n=e[3],o=e[4],s=e[5],a=e[6],l=e[7],c=e[8],h=e[9],u=e[10],d=e[11],p=e[12],f=e[13],m=e[14],_=e[15];return (t*s-i*o)*(u*_-d*m)-(t*a-r*o)*(h*_-d*f)+(t*l-n*o)*(h*m-u*f)+(i*a-r*s)*(c*_-d*p)-(i*l-n*s)*(c*m-u*p)+(r*l-n*a)*(c*f-h*p)},xc.multiply=Ec,xc.translate=function(e,t,i){var r,n,o,s,a,l,c,h,u,d,p,f,m=i[0],_=i[1],g=i[2];return t===e?(e[12]=t[0]*m+t[4]*_+t[8]*g+t[12],e[13]=t[1]*m+t[5]*_+t[9]*g+t[13],e[14]=t[2]*m+t[6]*_+t[10]*g+t[14],e[15]=t[3]*m+t[7]*_+t[11]*g+t[15]):(n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=t[9],p=t[10],f=t[11],e[0]=r=t[0],e[1]=n,e[2]=o,e[3]=s,e[4]=a,e[5]=l,e[6]=c,e[7]=h,e[8]=u,e[9]=d,e[10]=p,e[11]=f,e[12]=r*m+a*_+u*g+t[12],e[13]=n*m+l*_+d*g+t[13],e[14]=o*m+c*_+p*g+t[14],e[15]=s*m+h*_+f*g+t[15]),e},xc.scale=function(e,t,i){var r=i[0],n=i[1],o=i[2];return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*o,e[9]=t[9]*o,e[10]=t[10]*o,e[11]=t[11]*o,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},xc.rotate=function(e,t,i,r){var n,o,s,a,l,c,h,u,d,p,f,m,_,g,y,x,v,b,w,T,E,M,A,S,I=r[0],C=r[1],z=r[2],P=Math.hypot(I,C,z);return P<bc.EPSILON?null:(I*=P=1/P,C*=P,z*=P,n=Math.sin(i),o=Math.cos(i),l=t[1],c=t[2],h=t[3],d=t[5],p=t[6],f=t[7],_=t[9],g=t[10],y=t[11],w=I*C*(s=1-o)-z*n,T=C*C*s+o,E=z*C*s+I*n,M=I*z*s+C*n,A=C*z*s-I*n,S=z*z*s+o,e[0]=(a=t[0])*(x=I*I*s+o)+(u=t[4])*(v=C*I*s+z*n)+(m=t[8])*(b=z*I*s-C*n),e[1]=l*x+d*v+_*b,e[2]=c*x+p*v+g*b,e[3]=h*x+f*v+y*b,e[4]=a*w+u*T+m*E,e[5]=l*w+d*T+_*E,e[6]=c*w+p*T+g*E,e[7]=h*w+f*T+y*E,e[8]=a*M+u*A+m*S,e[9]=l*M+d*A+_*S,e[10]=c*M+p*A+g*S,e[11]=h*M+f*A+y*S,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)},xc.rotateX=function(e,t,i){var r=Math.sin(i),n=Math.cos(i),o=t[4],s=t[5],a=t[6],l=t[7],c=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=o*n+c*r,e[5]=s*n+h*r,e[6]=a*n+u*r,e[7]=l*n+d*r,e[8]=c*n-o*r,e[9]=h*n-s*r,e[10]=u*n-a*r,e[11]=d*n-l*r,e},xc.rotateY=function(e,t,i){var r=Math.sin(i),n=Math.cos(i),o=t[0],s=t[1],a=t[2],l=t[3],c=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*n-c*r,e[1]=s*n-h*r,e[2]=a*n-u*r,e[3]=l*n-d*r,e[8]=o*r+c*n,e[9]=s*r+h*n,e[10]=a*r+u*n,e[11]=l*r+d*n,e},xc.rotateZ=function(e,t,i){var r=Math.sin(i),n=Math.cos(i),o=t[0],s=t[1],a=t[2],l=t[3],c=t[4],h=t[5],u=t[6],d=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*n+c*r,e[1]=s*n+h*r,e[2]=a*n+u*r,e[3]=l*n+d*r,e[4]=c*n-o*r,e[5]=h*n-s*r,e[6]=u*n-a*r,e[7]=d*n-l*r,e},xc.fromTranslation=function(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1,e},xc.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},xc.fromRotation=function(e,t,i){var r,n,o,s=i[0],a=i[1],l=i[2],c=Math.hypot(s,a,l);return c<bc.EPSILON?null:(s*=c=1/c,a*=c,l*=c,r=Math.sin(t),n=Math.cos(t),e[0]=s*s*(o=1-n)+n,e[1]=a*s*o+l*r,e[2]=l*s*o-a*r,e[3]=0,e[4]=s*a*o-l*r,e[5]=a*a*o+n,e[6]=l*a*o+s*r,e[7]=0,e[8]=s*l*o+a*r,e[9]=a*l*o-s*r,e[10]=l*l*o+n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e)},xc.fromXRotation=function(e,t){var i=Math.sin(t),r=Math.cos(t);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=r,e[6]=i,e[7]=0,e[8]=0,e[9]=-i,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},xc.fromYRotation=function(e,t){var i=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=0,e[2]=-i,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=i,e[9]=0,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},xc.fromZRotation=function(e,t){var i=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=i,e[2]=0,e[3]=0,e[4]=-i,e[5]=r,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},xc.fromRotationTranslation=Mc,xc.fromQuat2=function(e,t){var i=new bc.ARRAY_TYPE(3),r=-t[0],n=-t[1],o=-t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=r*r+n*n+o*o+s*s;return u>0?(i[0]=2*(a*s+h*r+l*o-c*n)/u,i[1]=2*(l*s+h*n+c*r-a*o)/u,i[2]=2*(c*s+h*o+a*n-l*r)/u):(i[0]=2*(a*s+h*r+l*o-c*n),i[1]=2*(l*s+h*n+c*r-a*o),i[2]=2*(c*s+h*o+a*n-l*r)),Mc(e,t,i),e},xc.getTranslation=function(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e},xc.getScaling=Ac,xc.getRotation=function(e,t){var i=new bc.ARRAY_TYPE(3);Ac(i,t);var r=1/i[0],n=1/i[1],o=1/i[2],s=t[0]*r,a=t[1]*n,l=t[2]*o,c=t[4]*r,h=t[5]*n,u=t[6]*o,d=t[8]*r,p=t[9]*n,f=t[10]*o,m=s+h+f,_=0;return m>0?(_=2*Math.sqrt(m+1),e[3]=.25*_,e[0]=(u-p)/_,e[1]=(d-l)/_,e[2]=(a-c)/_):s>h&&s>f?(_=2*Math.sqrt(1+s-h-f),e[3]=(u-p)/_,e[0]=.25*_,e[1]=(a+c)/_,e[2]=(d+l)/_):h>f?(_=2*Math.sqrt(1+h-s-f),e[3]=(d-l)/_,e[0]=(a+c)/_,e[1]=.25*_,e[2]=(u+p)/_):(_=2*Math.sqrt(1+f-s-h),e[3]=(a-c)/_,e[0]=(d+l)/_,e[1]=(u+p)/_,e[2]=.25*_),e},xc.fromRotationTranslationScale=function(e,t,i,r){var n=t[0],o=t[1],s=t[2],a=t[3],l=n+n,c=o+o,h=s+s,u=n*l,d=n*c,p=n*h,f=o*c,m=o*h,_=s*h,g=a*l,y=a*c,x=a*h,v=r[0],b=r[1],w=r[2];return e[0]=(1-(f+_))*v,e[1]=(d+x)*v,e[2]=(p-y)*v,e[3]=0,e[4]=(d-x)*b,e[5]=(1-(u+_))*b,e[6]=(m+g)*b,e[7]=0,e[8]=(p+y)*w,e[9]=(m-g)*w,e[10]=(1-(u+f))*w,e[11]=0,e[12]=i[0],e[13]=i[1],e[14]=i[2],e[15]=1,e},xc.fromRotationTranslationScaleOrigin=function(e,t,i,r,n){var o=t[0],s=t[1],a=t[2],l=t[3],c=o+o,h=s+s,u=a+a,d=o*c,p=o*h,f=o*u,m=s*h,_=s*u,g=a*u,y=l*c,x=l*h,v=l*u,b=r[0],w=r[1],T=r[2],E=n[0],M=n[1],A=n[2],S=(1-(m+g))*b,I=(p+v)*b,C=(f-x)*b,z=(p-v)*w,P=(1-(d+g))*w,D=(_+y)*w,R=(f+x)*T,L=(_-y)*T,k=(1-(d+m))*T;return e[0]=S,e[1]=I,e[2]=C,e[3]=0,e[4]=z,e[5]=P,e[6]=D,e[7]=0,e[8]=R,e[9]=L,e[10]=k,e[11]=0,e[12]=i[0]+E-(S*E+z*M+R*A),e[13]=i[1]+M-(I*E+P*M+L*A),e[14]=i[2]+A-(C*E+D*M+k*A),e[15]=1,e},xc.fromQuat=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=i+i,a=r+r,l=n+n,c=i*s,h=r*s,u=r*a,d=n*s,p=n*a,f=n*l,m=o*s,_=o*a,g=o*l;return e[0]=1-u-f,e[1]=h+g,e[2]=d-_,e[3]=0,e[4]=h-g,e[5]=1-c-f,e[6]=p+m,e[7]=0,e[8]=d+_,e[9]=p-m,e[10]=1-c-u,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},xc.frustum=function(e,t,i,r,n,o,s){var a=1/(i-t),l=1/(n-r),c=1/(o-s);return e[0]=2*o*a,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=2*o*l,e[6]=0,e[7]=0,e[8]=(i+t)*a,e[9]=(n+r)*l,e[10]=(s+o)*c,e[11]=-1,e[12]=0,e[13]=0,e[14]=s*o*2*c,e[15]=0,e},xc.perspectiveNO=Sc,xc.perspectiveZO=function(e,t,i,r,n){var o,s=1/Math.tan(t/2);return e[0]=s/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=n&&n!==1/0?(e[10]=n*(o=1/(r-n)),e[14]=n*r*o):(e[10]=-1,e[14]=-r),e},xc.perspectiveFromFieldOfView=function(e,t,i,r){var n=Math.tan(t.upDegrees*Math.PI/180),o=Math.tan(t.downDegrees*Math.PI/180),s=Math.tan(t.leftDegrees*Math.PI/180),a=Math.tan(t.rightDegrees*Math.PI/180),l=2/(s+a),c=2/(n+o);return e[0]=l,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=c,e[6]=0,e[7]=0,e[8]=-(s-a)*l*.5,e[9]=(n-o)*c*.5,e[10]=r/(i-r),e[11]=-1,e[12]=0,e[13]=0,e[14]=r*i/(i-r),e[15]=0,e},xc.orthoNO=Ic,xc.orthoZO=function(e,t,i,r,n,o,s){var a=1/(t-i),l=1/(r-n),c=1/(o-s);return e[0]=-2*a,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*l,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=c,e[11]=0,e[12]=(t+i)*a,e[13]=(n+r)*l,e[14]=o*c,e[15]=1,e},xc.lookAt=function(e,t,i,r){var n,o,s,a,l,c,h,u,d,p,f=t[0],m=t[1],_=t[2],g=r[0],y=r[1],x=r[2],v=i[0],b=i[1],w=i[2];return Math.abs(f-v)<bc.EPSILON&&Math.abs(m-b)<bc.EPSILON&&Math.abs(_-w)<bc.EPSILON?Tc(e):(h=f-v,u=m-b,d=_-w,n=y*(d*=p=1/Math.hypot(h,u,d))-x*(u*=p),o=x*(h*=p)-g*d,s=g*u-y*h,(p=Math.hypot(n,o,s))?(n*=p=1/p,o*=p,s*=p):(n=0,o=0,s=0),a=u*s-d*o,l=d*n-h*s,c=h*o-u*n,(p=Math.hypot(a,l,c))?(a*=p=1/p,l*=p,c*=p):(a=0,l=0,c=0),e[0]=n,e[1]=a,e[2]=h,e[3]=0,e[4]=o,e[5]=l,e[6]=u,e[7]=0,e[8]=s,e[9]=c,e[10]=d,e[11]=0,e[12]=-(n*f+o*m+s*_),e[13]=-(a*f+l*m+c*_),e[14]=-(h*f+u*m+d*_),e[15]=1,e)},xc.targetTo=function(e,t,i,r){var n=t[0],o=t[1],s=t[2],a=r[0],l=r[1],c=r[2],h=n-i[0],u=o-i[1],d=s-i[2],p=h*h+u*u+d*d;p>0&&(h*=p=1/Math.sqrt(p),u*=p,d*=p);var f=l*d-c*u,m=c*h-a*d,_=a*u-l*h;return (p=f*f+m*m+_*_)>0&&(f*=p=1/Math.sqrt(p),m*=p,_*=p),e[0]=f,e[1]=m,e[2]=_,e[3]=0,e[4]=u*_-d*m,e[5]=d*f-h*_,e[6]=h*m-u*f,e[7]=0,e[8]=h,e[9]=u,e[10]=d,e[11]=0,e[12]=n,e[13]=o,e[14]=s,e[15]=1,e},xc.str=function(e){return "mat4("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+", "+e[6]+", "+e[7]+", "+e[8]+", "+e[9]+", "+e[10]+", "+e[11]+", "+e[12]+", "+e[13]+", "+e[14]+", "+e[15]+")"},xc.frob=function(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])},xc.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e[3]=t[3]+i[3],e[4]=t[4]+i[4],e[5]=t[5]+i[5],e[6]=t[6]+i[6],e[7]=t[7]+i[7],e[8]=t[8]+i[8],e[9]=t[9]+i[9],e[10]=t[10]+i[10],e[11]=t[11]+i[11],e[12]=t[12]+i[12],e[13]=t[13]+i[13],e[14]=t[14]+i[14],e[15]=t[15]+i[15],e},xc.subtract=Cc,xc.multiplyScalar=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*i,e[9]=t[9]*i,e[10]=t[10]*i,e[11]=t[11]*i,e[12]=t[12]*i,e[13]=t[13]*i,e[14]=t[14]*i,e[15]=t[15]*i,e},xc.multiplyScalarAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e[2]=t[2]+i[2]*r,e[3]=t[3]+i[3]*r,e[4]=t[4]+i[4]*r,e[5]=t[5]+i[5]*r,e[6]=t[6]+i[6]*r,e[7]=t[7]+i[7]*r,e[8]=t[8]+i[8]*r,e[9]=t[9]+i[9]*r,e[10]=t[10]+i[10]*r,e[11]=t[11]+i[11]*r,e[12]=t[12]+i[12]*r,e[13]=t[13]+i[13]*r,e[14]=t[14]+i[14]*r,e[15]=t[15]+i[15]*r,e},xc.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]&&e[11]===t[11]&&e[12]===t[12]&&e[13]===t[13]&&e[14]===t[14]&&e[15]===t[15]},xc.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],f=e[12],m=e[13],_=e[14],g=e[15],y=t[0],x=t[1],v=t[2],b=t[3],w=t[4],T=t[5],E=t[6],M=t[7],A=t[8],S=t[9],I=t[10],C=t[11],z=t[12],P=t[13],D=t[14],R=t[15];return Math.abs(i-y)<=bc.EPSILON*Math.max(1,Math.abs(i),Math.abs(y))&&Math.abs(r-x)<=bc.EPSILON*Math.max(1,Math.abs(r),Math.abs(x))&&Math.abs(n-v)<=bc.EPSILON*Math.max(1,Math.abs(n),Math.abs(v))&&Math.abs(o-b)<=bc.EPSILON*Math.max(1,Math.abs(o),Math.abs(b))&&Math.abs(s-w)<=bc.EPSILON*Math.max(1,Math.abs(s),Math.abs(w))&&Math.abs(a-T)<=bc.EPSILON*Math.max(1,Math.abs(a),Math.abs(T))&&Math.abs(l-E)<=bc.EPSILON*Math.max(1,Math.abs(l),Math.abs(E))&&Math.abs(c-M)<=bc.EPSILON*Math.max(1,Math.abs(c),Math.abs(M))&&Math.abs(h-A)<=bc.EPSILON*Math.max(1,Math.abs(h),Math.abs(A))&&Math.abs(u-S)<=bc.EPSILON*Math.max(1,Math.abs(u),Math.abs(S))&&Math.abs(d-I)<=bc.EPSILON*Math.max(1,Math.abs(d),Math.abs(I))&&Math.abs(p-C)<=bc.EPSILON*Math.max(1,Math.abs(p),Math.abs(C))&&Math.abs(f-z)<=bc.EPSILON*Math.max(1,Math.abs(f),Math.abs(z))&&Math.abs(m-P)<=bc.EPSILON*Math.max(1,Math.abs(m),Math.abs(P))&&Math.abs(_-D)<=bc.EPSILON*Math.max(1,Math.abs(_),Math.abs(D))&&Math.abs(g-R)<=bc.EPSILON*Math.max(1,Math.abs(g),Math.abs(R))},xc.sub=xc.mul=xc.ortho=xc.perspective=void 0;var bc=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==vc(e)&&"function"!=typeof e)return {default:e};var i=wc(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function wc(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (wc=function(e){return e?i:t})(e)}function Tc(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Ec(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=t[9],p=t[10],f=t[11],m=t[12],_=t[13],g=t[14],y=t[15],x=i[0],v=i[1],b=i[2],w=i[3];return e[0]=x*r+v*a+b*u+w*m,e[1]=x*n+v*l+b*d+w*_,e[2]=x*o+v*c+b*p+w*g,e[3]=x*s+v*h+b*f+w*y,e[4]=(x=i[4])*r+(v=i[5])*a+(b=i[6])*u+(w=i[7])*m,e[5]=x*n+v*l+b*d+w*_,e[6]=x*o+v*c+b*p+w*g,e[7]=x*s+v*h+b*f+w*y,e[8]=(x=i[8])*r+(v=i[9])*a+(b=i[10])*u+(w=i[11])*m,e[9]=x*n+v*l+b*d+w*_,e[10]=x*o+v*c+b*p+w*g,e[11]=x*s+v*h+b*f+w*y,e[12]=(x=i[12])*r+(v=i[13])*a+(b=i[14])*u+(w=i[15])*m,e[13]=x*n+v*l+b*d+w*_,e[14]=x*o+v*c+b*p+w*g,e[15]=x*s+v*h+b*f+w*y,e}function Mc(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=r+r,l=n+n,c=o+o,h=r*a,u=r*l,d=r*c,p=n*l,f=n*c,m=o*c,_=s*a,g=s*l,y=s*c;return e[0]=1-(p+m),e[1]=u+y,e[2]=d-g,e[3]=0,e[4]=u-y,e[5]=1-(h+m),e[6]=f+_,e[7]=0,e[8]=d+g,e[9]=f-_,e[10]=1-(h+p),e[11]=0,e[12]=i[0],e[13]=i[1],e[14]=i[2],e[15]=1,e}function Ac(e,t){var i=t[4],r=t[5],n=t[6],o=t[8],s=t[9],a=t[10];return e[0]=Math.hypot(t[0],t[1],t[2]),e[1]=Math.hypot(i,r,n),e[2]=Math.hypot(o,s,a),e}function Sc(e,t,i,r,n){var o,s=1/Math.tan(t/2);return e[0]=s/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=n&&n!==1/0?(e[10]=(n+r)*(o=1/(r-n)),e[14]=2*n*r*o):(e[10]=-1,e[14]=-2*r),e}function Ic(e,t,i,r,n,o,s){var a=1/(t-i),l=1/(r-n),c=1/(o-s);return e[0]=-2*a,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*l,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*c,e[11]=0,e[12]=(t+i)*a,e[13]=(n+r)*l,e[14]=(s+o)*c,e[15]=1,e}function Cc(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e[3]=t[3]-i[3],e[4]=t[4]-i[4],e[5]=t[5]-i[5],e[6]=t[6]-i[6],e[7]=t[7]-i[7],e[8]=t[8]-i[8],e[9]=t[9]-i[9],e[10]=t[10]-i[10],e[11]=t[11]-i[11],e[12]=t[12]-i[12],e[13]=t[13]-i[13],e[14]=t[14]-i[14],e[15]=t[15]-i[15],e}xc.perspective=Sc,xc.ortho=Ic,xc.mul=Ec,xc.sub=Cc;var zc={},Pc={};function Dc(e){return Dc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Dc(e)}Object.defineProperty(Pc,"__esModule",{value:!0}),Pc.create=kc,Pc.clone=function(e){var t=new Rc.ARRAY_TYPE(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t},Pc.length=Bc,Pc.fromValues=function(e,t,i){var r=new Rc.ARRAY_TYPE(3);return r[0]=e,r[1]=t,r[2]=i,r},Pc.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e},Pc.set=function(e,t,i,r){return e[0]=t,e[1]=i,e[2]=r,e},Pc.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e},Pc.subtract=Oc,Pc.multiply=Fc,Pc.divide=Nc,Pc.ceil=function(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e},Pc.floor=function(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e},Pc.min=function(e,t,i){return e[0]=Math.min(t[0],i[0]),e[1]=Math.min(t[1],i[1]),e[2]=Math.min(t[2],i[2]),e},Pc.max=function(e,t,i){return e[0]=Math.max(t[0],i[0]),e[1]=Math.max(t[1],i[1]),e[2]=Math.max(t[2],i[2]),e},Pc.round=function(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e},Pc.scale=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e},Pc.scaleAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e[2]=t[2]+i[2]*r,e},Pc.distance=Uc,Pc.squaredDistance=jc,Pc.squaredLength=Vc,Pc.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e},Pc.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e},Pc.normalize=function(e,t){var i=t[0],r=t[1],n=t[2],o=i*i+r*r+n*n;return o>0&&(o=1/Math.sqrt(o)),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e},Pc.dot=Gc,Pc.cross=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=i[0],a=i[1],l=i[2];return e[0]=n*l-o*a,e[1]=o*s-r*l,e[2]=r*a-n*s,e},Pc.lerp=function(e,t,i,r){var n=t[0],o=t[1],s=t[2];return e[0]=n+r*(i[0]-n),e[1]=o+r*(i[1]-o),e[2]=s+r*(i[2]-s),e},Pc.hermite=function(e,t,i,r,n,o){var s=o*o,a=s*(2*o-3)+1,l=s*(o-2)+o,c=s*(o-1),h=s*(3-2*o);return e[0]=t[0]*a+i[0]*l+r[0]*c+n[0]*h,e[1]=t[1]*a+i[1]*l+r[1]*c+n[1]*h,e[2]=t[2]*a+i[2]*l+r[2]*c+n[2]*h,e},Pc.bezier=function(e,t,i,r,n,o){var s=1-o,a=s*s,l=o*o,c=a*s,h=3*o*a,u=3*l*s,d=l*o;return e[0]=t[0]*c+i[0]*h+r[0]*u+n[0]*d,e[1]=t[1]*c+i[1]*h+r[1]*u+n[1]*d,e[2]=t[2]*c+i[2]*h+r[2]*u+n[2]*d,e},Pc.random=function(e,t){t=t||1;var i=2*Rc.RANDOM()*Math.PI,r=2*Rc.RANDOM()-1,n=Math.sqrt(1-r*r)*t;return e[0]=Math.cos(i)*n,e[1]=Math.sin(i)*n,e[2]=r*t,e},Pc.transformMat4=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=i[3]*r+i[7]*n+i[11]*o+i[15];return e[0]=(i[0]*r+i[4]*n+i[8]*o+i[12])/(s=s||1),e[1]=(i[1]*r+i[5]*n+i[9]*o+i[13])/s,e[2]=(i[2]*r+i[6]*n+i[10]*o+i[14])/s,e},Pc.transformMat3=function(e,t,i){var r=t[0],n=t[1],o=t[2];return e[0]=r*i[0]+n*i[3]+o*i[6],e[1]=r*i[1]+n*i[4]+o*i[7],e[2]=r*i[2]+n*i[5]+o*i[8],e},Pc.transformQuat=function(e,t,i){var r=i[0],n=i[1],o=i[2],s=t[0],a=t[1],l=t[2],c=n*l-o*a,h=o*s-r*l,u=r*a-n*s,d=n*u-o*h,p=o*c-r*u,f=r*h-n*c,m=2*i[3];return h*=m,u*=m,p*=2,f*=2,e[0]=s+(c*=m)+(d*=2),e[1]=a+h+p,e[2]=l+u+f,e},Pc.rotateX=function(e,t,i,r){var n=[],o=[];return n[0]=t[0]-i[0],n[1]=t[1]-i[1],n[2]=t[2]-i[2],o[0]=n[0],o[1]=n[1]*Math.cos(r)-n[2]*Math.sin(r),o[2]=n[1]*Math.sin(r)+n[2]*Math.cos(r),e[0]=o[0]+i[0],e[1]=o[1]+i[1],e[2]=o[2]+i[2],e},Pc.rotateY=function(e,t,i,r){var n=[],o=[];return n[0]=t[0]-i[0],n[1]=t[1]-i[1],n[2]=t[2]-i[2],o[0]=n[2]*Math.sin(r)+n[0]*Math.cos(r),o[1]=n[1],o[2]=n[2]*Math.cos(r)-n[0]*Math.sin(r),e[0]=o[0]+i[0],e[1]=o[1]+i[1],e[2]=o[2]+i[2],e},Pc.rotateZ=function(e,t,i,r){var n=[],o=[];return n[0]=t[0]-i[0],n[1]=t[1]-i[1],n[2]=t[2]-i[2],o[0]=n[0]*Math.cos(r)-n[1]*Math.sin(r),o[1]=n[0]*Math.sin(r)+n[1]*Math.cos(r),o[2]=n[2],e[0]=o[0]+i[0],e[1]=o[1]+i[1],e[2]=o[2]+i[2],e},Pc.angle=function(e,t){var i=e[0],r=e[1],n=e[2],o=t[0],s=t[1],a=t[2],l=Math.sqrt(i*i+r*r+n*n)*Math.sqrt(o*o+s*s+a*a),c=l&&Gc(e,t)/l;return Math.acos(Math.min(Math.max(c,-1),1))},Pc.zero=function(e){return e[0]=0,e[1]=0,e[2]=0,e},Pc.str=function(e){return "vec3("+e[0]+", "+e[1]+", "+e[2]+")"},Pc.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]},Pc.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=t[0],s=t[1],a=t[2];return Math.abs(i-o)<=Rc.EPSILON*Math.max(1,Math.abs(i),Math.abs(o))&&Math.abs(r-s)<=Rc.EPSILON*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(n-a)<=Rc.EPSILON*Math.max(1,Math.abs(n),Math.abs(a))},Pc.forEach=Pc.sqrLen=Pc.len=Pc.sqrDist=Pc.dist=Pc.div=Pc.mul=Pc.sub=void 0;var Rc=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==Dc(e)&&"function"!=typeof e)return {default:e};var i=Lc(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function Lc(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (Lc=function(e){return e?i:t})(e)}function kc(){var e=new Rc.ARRAY_TYPE(3);return Rc.ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Bc(e){return Math.hypot(e[0],e[1],e[2])}function Oc(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e}function Fc(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e[2]=t[2]*i[2],e}function Nc(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e[2]=t[2]/i[2],e}function Uc(e,t){return Math.hypot(t[0]-e[0],t[1]-e[1],t[2]-e[2])}function jc(e,t){var i=t[0]-e[0],r=t[1]-e[1],n=t[2]-e[2];return i*i+r*r+n*n}function Vc(e){var t=e[0],i=e[1],r=e[2];return t*t+i*i+r*r}function Gc(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}Pc.sub=Oc,Pc.mul=Fc,Pc.div=Nc,Pc.dist=Uc,Pc.sqrDist=jc,Pc.len=Bc,Pc.sqrLen=Vc;var qc,$c=(qc=kc(),function(e,t,i,r,n,o){var s,a;for(t||(t=3),i||(i=0),a=r?Math.min(r*t+i,e.length):e.length,s=i;s<a;s+=t)qc[0]=e[s],qc[1]=e[s+1],qc[2]=e[s+2],n(qc,qc,o),e[s]=qc[0],e[s+1]=qc[1],e[s+2]=qc[2];return e});Pc.forEach=$c;var Zc={};function Wc(e){return Wc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Wc(e)}Object.defineProperty(Zc,"__esModule",{value:!0}),Zc.create=Yc,Zc.clone=function(e){var t=new Hc.ARRAY_TYPE(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},Zc.fromValues=function(e,t,i,r){var n=new Hc.ARRAY_TYPE(4);return n[0]=e,n[1]=t,n[2]=i,n[3]=r,n},Zc.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e},Zc.set=function(e,t,i,r,n){return e[0]=t,e[1]=i,e[2]=r,e[3]=n,e},Zc.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e[3]=t[3]+i[3],e},Zc.subtract=Kc,Zc.multiply=Jc,Zc.divide=Qc,Zc.ceil=function(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e[3]=Math.ceil(t[3]),e},Zc.floor=function(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e[3]=Math.floor(t[3]),e},Zc.min=function(e,t,i){return e[0]=Math.min(t[0],i[0]),e[1]=Math.min(t[1],i[1]),e[2]=Math.min(t[2],i[2]),e[3]=Math.min(t[3],i[3]),e},Zc.max=function(e,t,i){return e[0]=Math.max(t[0],i[0]),e[1]=Math.max(t[1],i[1]),e[2]=Math.max(t[2],i[2]),e[3]=Math.max(t[3],i[3]),e},Zc.round=function(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e[3]=Math.round(t[3]),e},Zc.scale=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e},Zc.scaleAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e[2]=t[2]+i[2]*r,e[3]=t[3]+i[3]*r,e},Zc.distance=eh,Zc.squaredDistance=th,Zc.length=ih,Zc.squaredLength=rh,Zc.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e},Zc.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e},Zc.normalize=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=i*i+r*r+n*n+o*o;return s>0&&(s=1/Math.sqrt(s)),e[0]=i*s,e[1]=r*s,e[2]=n*s,e[3]=o*s,e},Zc.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]},Zc.cross=function(e,t,i,r){var n=i[0]*r[1]-i[1]*r[0],o=i[0]*r[2]-i[2]*r[0],s=i[0]*r[3]-i[3]*r[0],a=i[1]*r[2]-i[2]*r[1],l=i[1]*r[3]-i[3]*r[1],c=i[2]*r[3]-i[3]*r[2],h=t[0],u=t[1],d=t[2],p=t[3];return e[0]=u*c-d*l+p*a,e[1]=-h*c+d*s-p*o,e[2]=h*l-u*s+p*n,e[3]=-h*a+u*o-d*n,e},Zc.lerp=function(e,t,i,r){var n=t[0],o=t[1],s=t[2],a=t[3];return e[0]=n+r*(i[0]-n),e[1]=o+r*(i[1]-o),e[2]=s+r*(i[2]-s),e[3]=a+r*(i[3]-a),e},Zc.random=function(e,t){var i,r,n,o,s,a;t=t||1;do{s=(i=2*Hc.RANDOM()-1)*i+(r=2*Hc.RANDOM()-1)*r;}while(s>=1);do{a=(n=2*Hc.RANDOM()-1)*n+(o=2*Hc.RANDOM()-1)*o;}while(a>=1);var l=Math.sqrt((1-s)/a);return e[0]=t*i,e[1]=t*r,e[2]=t*n*l,e[3]=t*o*l,e},Zc.transformMat4=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3];return e[0]=i[0]*r+i[4]*n+i[8]*o+i[12]*s,e[1]=i[1]*r+i[5]*n+i[9]*o+i[13]*s,e[2]=i[2]*r+i[6]*n+i[10]*o+i[14]*s,e[3]=i[3]*r+i[7]*n+i[11]*o+i[15]*s,e},Zc.transformQuat=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=i[0],a=i[1],l=i[2],c=i[3],h=c*r+a*o-l*n,u=c*n+l*r-s*o,d=c*o+s*n-a*r,p=-s*r-a*n-l*o;return e[0]=h*c+p*-s+u*-l-d*-a,e[1]=u*c+p*-a+d*-s-h*-l,e[2]=d*c+p*-l+h*-a-u*-s,e[3]=t[3],e},Zc.zero=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e},Zc.str=function(e){return "vec4("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},Zc.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]},Zc.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=e[3],s=t[0],a=t[1],l=t[2],c=t[3];return Math.abs(i-s)<=Hc.EPSILON*Math.max(1,Math.abs(i),Math.abs(s))&&Math.abs(r-a)<=Hc.EPSILON*Math.max(1,Math.abs(r),Math.abs(a))&&Math.abs(n-l)<=Hc.EPSILON*Math.max(1,Math.abs(n),Math.abs(l))&&Math.abs(o-c)<=Hc.EPSILON*Math.max(1,Math.abs(o),Math.abs(c))},Zc.forEach=Zc.sqrLen=Zc.len=Zc.sqrDist=Zc.dist=Zc.div=Zc.mul=Zc.sub=void 0;var Hc=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==Wc(e)&&"function"!=typeof e)return {default:e};var i=Xc(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function Xc(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (Xc=function(e){return e?i:t})(e)}function Yc(){var e=new Hc.ARRAY_TYPE(4);return Hc.ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Kc(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e[3]=t[3]-i[3],e}function Jc(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e[2]=t[2]*i[2],e[3]=t[3]*i[3],e}function Qc(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e[2]=t[2]/i[2],e[3]=t[3]/i[3],e}function eh(e,t){return Math.hypot(t[0]-e[0],t[1]-e[1],t[2]-e[2],t[3]-e[3])}function th(e,t){var i=t[0]-e[0],r=t[1]-e[1],n=t[2]-e[2],o=t[3]-e[3];return i*i+r*r+n*n+o*o}function ih(e){return Math.hypot(e[0],e[1],e[2],e[3])}function rh(e){var t=e[0],i=e[1],r=e[2],n=e[3];return t*t+i*i+r*r+n*n}Zc.sub=Kc,Zc.mul=Jc,Zc.div=Qc,Zc.dist=eh,Zc.sqrDist=th,Zc.len=ih,Zc.sqrLen=rh;var nh=function(){var e=Yc();return function(t,i,r,n,o,s){var a,l;for(i||(i=4),r||(r=0),l=n?Math.min(n*i+r,t.length):t.length,a=r;a<l;a+=i)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],e[3]=t[a+3],o(e,e,s),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2],t[a+3]=e[3];return t}}();function oh(e){return oh="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},oh(e)}Zc.forEach=nh,Object.defineProperty(zc,"__esModule",{value:!0}),zc.create=dh,zc.identity=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e},zc.setAxisAngle=ph,zc.getAxisAngle=function(e,t){var i=2*Math.acos(t[3]),r=Math.sin(i/2);return r>sh.EPSILON?(e[0]=t[0]/r,e[1]=t[1]/r,e[2]=t[2]/r):(e[0]=1,e[1]=0,e[2]=0),i},zc.getAngle=function(e,t){var i=vh(e,t);return Math.acos(2*i*i-1)},zc.multiply=fh,zc.rotateX=function(e,t,i){i*=.5;var r=t[0],n=t[1],o=t[2],s=t[3],a=Math.sin(i),l=Math.cos(i);return e[0]=r*l+s*a,e[1]=n*l+o*a,e[2]=o*l-n*a,e[3]=s*l-r*a,e},zc.rotateY=function(e,t,i){i*=.5;var r=t[0],n=t[1],o=t[2],s=t[3],a=Math.sin(i),l=Math.cos(i);return e[0]=r*l-o*a,e[1]=n*l+s*a,e[2]=o*l+r*a,e[3]=s*l-n*a,e},zc.rotateZ=function(e,t,i){i*=.5;var r=t[0],n=t[1],o=t[2],s=t[3],a=Math.sin(i),l=Math.cos(i);return e[0]=r*l+n*a,e[1]=n*l-r*a,e[2]=o*l+s*a,e[3]=s*l-o*a,e},zc.calculateW=function(e,t){var i=t[0],r=t[1],n=t[2];return e[0]=i,e[1]=r,e[2]=n,e[3]=Math.sqrt(Math.abs(1-i*i-r*r-n*n)),e},zc.exp=mh,zc.ln=_h,zc.pow=function(e,t,i){return _h(e,t),xh(e,e,i),mh(e,e),e},zc.slerp=gh,zc.random=function(e){var t=sh.RANDOM(),i=sh.RANDOM(),r=sh.RANDOM(),n=Math.sqrt(1-t),o=Math.sqrt(t);return e[0]=n*Math.sin(2*Math.PI*i),e[1]=n*Math.cos(2*Math.PI*i),e[2]=o*Math.sin(2*Math.PI*r),e[3]=o*Math.cos(2*Math.PI*r),e},zc.invert=function(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=i*i+r*r+n*n+o*o,a=s?1/s:0;return e[0]=-i*a,e[1]=-r*a,e[2]=-n*a,e[3]=o*a,e},zc.conjugate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e},zc.fromMat3=yh,zc.fromEuler=function(e,t,i,r){var n=.5*Math.PI/180;t*=n,i*=n,r*=n;var o=Math.sin(t),s=Math.cos(t),a=Math.sin(i),l=Math.cos(i),c=Math.sin(r),h=Math.cos(r);return e[0]=o*l*h-s*a*c,e[1]=s*a*h+o*l*c,e[2]=s*l*c-o*a*h,e[3]=s*l*h+o*a*c,e},zc.str=function(e){return "quat("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},zc.setAxes=zc.sqlerp=zc.rotationTo=zc.equals=zc.exactEquals=zc.normalize=zc.sqrLen=zc.squaredLength=zc.len=zc.length=zc.lerp=zc.dot=zc.scale=zc.mul=zc.add=zc.set=zc.copy=zc.fromValues=zc.clone=void 0;var sh=uh(Yl),ah=uh(pc),lh=uh(Pc),ch=uh(Zc);function hh(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (hh=function(e){return e?i:t})(e)}function uh(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==oh(e)&&"function"!=typeof e)return {default:e};var i=hh(t);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}function dh(){var e=new sh.ARRAY_TYPE(4);return sh.ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function ph(e,t,i){i*=.5;var r=Math.sin(i);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(i),e}function fh(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=i[0],l=i[1],c=i[2],h=i[3];return e[0]=r*h+s*a+n*c-o*l,e[1]=n*h+s*l+o*a-r*c,e[2]=o*h+s*c+r*l-n*a,e[3]=s*h-r*a-n*l-o*c,e}function mh(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=Math.sqrt(i*i+r*r+n*n),a=Math.exp(o),l=s>0?a*Math.sin(s)/s:0;return e[0]=i*l,e[1]=r*l,e[2]=n*l,e[3]=a*Math.cos(s),e}function _h(e,t){var i=t[0],r=t[1],n=t[2],o=t[3],s=Math.sqrt(i*i+r*r+n*n),a=s>0?Math.atan2(s,o)/s:0;return e[0]=i*a,e[1]=r*a,e[2]=n*a,e[3]=.5*Math.log(i*i+r*r+n*n+o*o),e}function gh(e,t,i,r){var n,o,s,a,l,c=t[0],h=t[1],u=t[2],d=t[3],p=i[0],f=i[1],m=i[2],_=i[3];return (o=c*p+h*f+u*m+d*_)<0&&(o=-o,p=-p,f=-f,m=-m,_=-_),1-o>sh.EPSILON?(n=Math.acos(o),s=Math.sin(n),a=Math.sin((1-r)*n)/s,l=Math.sin(r*n)/s):(a=1-r,l=r),e[0]=a*c+l*p,e[1]=a*h+l*f,e[2]=a*u+l*m,e[3]=a*d+l*_,e}function yh(e,t){var i,r=t[0]+t[4]+t[8];if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,e[0]=(t[5]-t[7])*(i=.5/i),e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else {var n=0;t[4]>t[0]&&(n=1),t[8]>t[3*n+n]&&(n=2);var o=(n+1)%3,s=(n+2)%3;i=Math.sqrt(t[3*n+n]-t[3*o+o]-t[3*s+s]+1),e[n]=.5*i,e[3]=(t[3*o+s]-t[3*s+o])*(i=.5/i),e[o]=(t[3*o+n]+t[3*n+o])*i,e[s]=(t[3*s+n]+t[3*n+s])*i;}return e}zc.clone=ch.clone,zc.fromValues=ch.fromValues,zc.copy=ch.copy,zc.set=ch.set,zc.add=ch.add,zc.mul=fh;var xh=ch.scale;zc.scale=xh;var vh=ch.dot;zc.dot=vh,zc.lerp=ch.lerp;var bh=ch.length;zc.length=bh,zc.len=bh;var wh=ch.squaredLength;zc.squaredLength=wh,zc.sqrLen=wh;var Th=ch.normalize;zc.normalize=Th,zc.exactEquals=ch.exactEquals,zc.equals=ch.equals;var Eh,Mh,Ah,Sh=(Eh=lh.create(),Mh=lh.fromValues(1,0,0),Ah=lh.fromValues(0,1,0),function(e,t,i){var r=lh.dot(t,i);return r<-.999999?(lh.cross(Eh,Mh,t),lh.len(Eh)<1e-6&&lh.cross(Eh,Ah,t),lh.normalize(Eh,Eh),ph(e,Eh,Math.PI),e):r>.999999?(e[0]=0,e[1]=0,e[2]=0,e[3]=1,e):(lh.cross(Eh,t,i),e[0]=Eh[0],e[1]=Eh[1],e[2]=Eh[2],e[3]=1+r,Th(e,e))});zc.rotationTo=Sh;var Ih,Ch,zh=(Ih=dh(),Ch=dh(),function(e,t,i,r,n,o){return gh(Ih,t,n,o),gh(Ch,i,r,o),gh(e,Ih,Ch,2*o*(1-o)),e});zc.sqlerp=zh;var Ph,Dh=(Ph=ah.create(),function(e,t,i,r){return Ph[0]=i[0],Ph[3]=i[1],Ph[6]=i[2],Ph[1]=r[0],Ph[4]=r[1],Ph[7]=r[2],Ph[2]=-t[0],Ph[5]=-t[1],Ph[8]=-t[2],Th(e,yh(e,Ph))});zc.setAxes=Dh;var Rh={};function Lh(e){return Lh="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Lh(e)}Object.defineProperty(Rh,"__esModule",{value:!0}),Rh.create=function(){var e=new kh.ARRAY_TYPE(8);return kh.ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0),e[3]=1,e},Rh.clone=function(e){var t=new kh.ARRAY_TYPE(8);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t},Rh.fromValues=function(e,t,i,r,n,o,s,a){var l=new kh.ARRAY_TYPE(8);return l[0]=e,l[1]=t,l[2]=i,l[3]=r,l[4]=n,l[5]=o,l[6]=s,l[7]=a,l},Rh.fromRotationTranslationValues=function(e,t,i,r,n,o,s){var a=new kh.ARRAY_TYPE(8);a[0]=e,a[1]=t,a[2]=i,a[3]=r;var l=.5*n,c=.5*o,h=.5*s;return a[4]=l*r+c*i-h*t,a[5]=c*r+h*e-l*i,a[6]=h*r+l*t-c*e,a[7]=-l*e-c*t-h*i,a},Rh.fromRotationTranslation=Uh,Rh.fromTranslation=function(e,t){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e[4]=.5*t[0],e[5]=.5*t[1],e[6]=.5*t[2],e[7]=0,e},Rh.fromRotation=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=0,e[5]=0,e[6]=0,e[7]=0,e},Rh.fromMat4=function(e,t){var i=Bh.create();Oh.getRotation(i,t);var r=new kh.ARRAY_TYPE(3);return Oh.getTranslation(r,t),Uh(e,i,r),e},Rh.copy=jh,Rh.identity=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e},Rh.set=function(e,t,i,r,n,o,s,a,l){return e[0]=t,e[1]=i,e[2]=r,e[3]=n,e[4]=o,e[5]=s,e[6]=a,e[7]=l,e},Rh.getDual=function(e,t){return e[0]=t[4],e[1]=t[5],e[2]=t[6],e[3]=t[7],e},Rh.setDual=function(e,t){return e[4]=t[0],e[5]=t[1],e[6]=t[2],e[7]=t[3],e},Rh.getTranslation=function(e,t){var i=t[4],r=t[5],n=t[6],o=t[7],s=-t[0],a=-t[1],l=-t[2],c=t[3];return e[0]=2*(i*c+o*s+r*l-n*a),e[1]=2*(r*c+o*a+n*s-i*l),e[2]=2*(n*c+o*l+i*a-r*s),e},Rh.translate=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=.5*i[0],l=.5*i[1],c=.5*i[2],h=t[4],u=t[5],d=t[6],p=t[7];return e[0]=r,e[1]=n,e[2]=o,e[3]=s,e[4]=s*a+n*c-o*l+h,e[5]=s*l+o*a-r*c+u,e[6]=s*c+r*l-n*a+d,e[7]=-r*a-n*l-o*c+p,e},Rh.rotateX=function(e,t,i){var r=-t[0],n=-t[1],o=-t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=a*s+h*r+l*o-c*n,d=l*s+h*n+c*r-a*o,p=c*s+h*o+a*n-l*r,f=h*s-a*r-l*n-c*o;return Bh.rotateX(e,t,i),e[4]=u*(s=e[3])+f*(r=e[0])+d*(o=e[2])-p*(n=e[1]),e[5]=d*s+f*n+p*r-u*o,e[6]=p*s+f*o+u*n-d*r,e[7]=f*s-u*r-d*n-p*o,e},Rh.rotateY=function(e,t,i){var r=-t[0],n=-t[1],o=-t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=a*s+h*r+l*o-c*n,d=l*s+h*n+c*r-a*o,p=c*s+h*o+a*n-l*r,f=h*s-a*r-l*n-c*o;return Bh.rotateY(e,t,i),e[4]=u*(s=e[3])+f*(r=e[0])+d*(o=e[2])-p*(n=e[1]),e[5]=d*s+f*n+p*r-u*o,e[6]=p*s+f*o+u*n-d*r,e[7]=f*s-u*r-d*n-p*o,e},Rh.rotateZ=function(e,t,i){var r=-t[0],n=-t[1],o=-t[2],s=t[3],a=t[4],l=t[5],c=t[6],h=t[7],u=a*s+h*r+l*o-c*n,d=l*s+h*n+c*r-a*o,p=c*s+h*o+a*n-l*r,f=h*s-a*r-l*n-c*o;return Bh.rotateZ(e,t,i),e[4]=u*(s=e[3])+f*(r=e[0])+d*(o=e[2])-p*(n=e[1]),e[5]=d*s+f*n+p*r-u*o,e[6]=p*s+f*o+u*n-d*r,e[7]=f*s-u*r-d*n-p*o,e},Rh.rotateByQuatAppend=function(e,t,i){var r=i[0],n=i[1],o=i[2],s=i[3],a=t[0],l=t[1],c=t[2],h=t[3];return e[0]=a*s+h*r+l*o-c*n,e[1]=l*s+h*n+c*r-a*o,e[2]=c*s+h*o+a*n-l*r,e[3]=h*s-a*r-l*n-c*o,e[4]=(a=t[4])*s+(h=t[7])*r+(l=t[5])*o-(c=t[6])*n,e[5]=l*s+h*n+c*r-a*o,e[6]=c*s+h*o+a*n-l*r,e[7]=h*s-a*r-l*n-c*o,e},Rh.rotateByQuatPrepend=function(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=i[0],l=i[1],c=i[2],h=i[3];return e[0]=r*h+s*a+n*c-o*l,e[1]=n*h+s*l+o*a-r*c,e[2]=o*h+s*c+r*l-n*a,e[3]=s*h-r*a-n*l-o*c,e[4]=r*(h=i[7])+s*(a=i[4])+n*(c=i[6])-o*(l=i[5]),e[5]=n*h+s*l+o*a-r*c,e[6]=o*h+s*c+r*l-n*a,e[7]=s*h-r*a-n*l-o*c,e},Rh.rotateAroundAxis=function(e,t,i,r){if(Math.abs(r)<kh.EPSILON)return jh(e,t);var n=Math.hypot(i[0],i[1],i[2]);r*=.5;var o=Math.sin(r),s=o*i[0]/n,a=o*i[1]/n,l=o*i[2]/n,c=Math.cos(r),h=t[0],u=t[1],d=t[2],p=t[3];e[0]=h*c+p*s+u*l-d*a,e[1]=u*c+p*a+d*s-h*l,e[2]=d*c+p*l+h*a-u*s,e[3]=p*c-h*s-u*a-d*l;var f=t[4],m=t[5],_=t[6],g=t[7];return e[4]=f*c+g*s+m*l-_*a,e[5]=m*c+g*a+_*s-f*l,e[6]=_*c+g*l+f*a-m*s,e[7]=g*c-f*s-m*a-_*l,e},Rh.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e[3]=t[3]+i[3],e[4]=t[4]+i[4],e[5]=t[5]+i[5],e[6]=t[6]+i[6],e[7]=t[7]+i[7],e},Rh.multiply=Vh,Rh.scale=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e},Rh.lerp=function(e,t,i,r){var n=1-r;return Gh(t,i)<0&&(r=-r),e[0]=t[0]*n+i[0]*r,e[1]=t[1]*n+i[1]*r,e[2]=t[2]*n+i[2]*r,e[3]=t[3]*n+i[3]*r,e[4]=t[4]*n+i[4]*r,e[5]=t[5]*n+i[5]*r,e[6]=t[6]*n+i[6]*r,e[7]=t[7]*n+i[7]*r,e},Rh.invert=function(e,t){var i=$h(t);return e[0]=-t[0]/i,e[1]=-t[1]/i,e[2]=-t[2]/i,e[3]=t[3]/i,e[4]=-t[4]/i,e[5]=-t[5]/i,e[6]=-t[6]/i,e[7]=t[7]/i,e},Rh.conjugate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e[4]=-t[4],e[5]=-t[5],e[6]=-t[6],e[7]=t[7],e},Rh.normalize=function(e,t){var i=$h(t);if(i>0){i=Math.sqrt(i);var r=t[0]/i,n=t[1]/i,o=t[2]/i,s=t[3]/i,a=t[4],l=t[5],c=t[6],h=t[7],u=r*a+n*l+o*c+s*h;e[0]=r,e[1]=n,e[2]=o,e[3]=s,e[4]=(a-r*u)/i,e[5]=(l-n*u)/i,e[6]=(c-o*u)/i,e[7]=(h-s*u)/i;}return e},Rh.str=function(e){return "quat2("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+", "+e[6]+", "+e[7]+")"},Rh.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]},Rh.equals=function(e,t){var i=e[0],r=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],h=t[0],u=t[1],d=t[2],p=t[3],f=t[4],m=t[5],_=t[6],g=t[7];return Math.abs(i-h)<=kh.EPSILON*Math.max(1,Math.abs(i),Math.abs(h))&&Math.abs(r-u)<=kh.EPSILON*Math.max(1,Math.abs(r),Math.abs(u))&&Math.abs(n-d)<=kh.EPSILON*Math.max(1,Math.abs(n),Math.abs(d))&&Math.abs(o-p)<=kh.EPSILON*Math.max(1,Math.abs(o),Math.abs(p))&&Math.abs(s-f)<=kh.EPSILON*Math.max(1,Math.abs(s),Math.abs(f))&&Math.abs(a-m)<=kh.EPSILON*Math.max(1,Math.abs(a),Math.abs(m))&&Math.abs(l-_)<=kh.EPSILON*Math.max(1,Math.abs(l),Math.abs(_))&&Math.abs(c-g)<=kh.EPSILON*Math.max(1,Math.abs(c),Math.abs(g))},Rh.sqrLen=Rh.squaredLength=Rh.len=Rh.length=Rh.dot=Rh.mul=Rh.setReal=Rh.getReal=void 0;var kh=Nh(Yl),Bh=Nh(zc),Oh=Nh(xc);function Fh(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (Fh=function(e){return e?i:t})(e)}function Nh(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==Lh(e)&&"function"!=typeof e)return {default:e};var i=Fh(t);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}function Uh(e,t,i){var r=.5*i[0],n=.5*i[1],o=.5*i[2],s=t[0],a=t[1],l=t[2],c=t[3];return e[0]=s,e[1]=a,e[2]=l,e[3]=c,e[4]=r*c+n*l-o*a,e[5]=n*c+o*s-r*l,e[6]=o*c+r*a-n*s,e[7]=-r*s-n*a-o*l,e}function jh(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e}function Vh(e,t,i){var r=t[0],n=t[1],o=t[2],s=t[3],a=i[4],l=i[5],c=i[6],h=i[7],u=t[4],d=t[5],p=t[6],f=t[7],m=i[0],_=i[1],g=i[2],y=i[3];return e[0]=r*y+s*m+n*g-o*_,e[1]=n*y+s*_+o*m-r*g,e[2]=o*y+s*g+r*_-n*m,e[3]=s*y-r*m-n*_-o*g,e[4]=r*h+s*a+n*c-o*l+u*y+f*m+d*g-p*_,e[5]=n*h+s*l+o*a-r*c+d*y+f*_+p*m-u*g,e[6]=o*h+s*c+r*l-n*a+p*y+f*g+u*_-d*m,e[7]=s*h-r*a-n*l-o*c+f*y-u*m-d*_-p*g,e}Rh.getReal=Bh.copy,Rh.setReal=Bh.copy,Rh.mul=Vh;var Gh=Bh.dot;Rh.dot=Gh;var qh=Bh.length;Rh.length=qh,Rh.len=qh;var $h=Bh.squaredLength;Rh.squaredLength=$h,Rh.sqrLen=$h;var Zh={};function Wh(e){return Wh="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Wh(e)}Object.defineProperty(Zh,"__esModule",{value:!0}),Zh.create=Yh,Zh.clone=function(e){var t=new Hh.ARRAY_TYPE(2);return t[0]=e[0],t[1]=e[1],t},Zh.fromValues=function(e,t){var i=new Hh.ARRAY_TYPE(2);return i[0]=e,i[1]=t,i},Zh.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e},Zh.set=function(e,t,i){return e[0]=t,e[1]=i,e},Zh.add=function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e},Zh.subtract=Kh,Zh.multiply=Jh,Zh.divide=Qh,Zh.ceil=function(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e},Zh.floor=function(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e},Zh.min=function(e,t,i){return e[0]=Math.min(t[0],i[0]),e[1]=Math.min(t[1],i[1]),e},Zh.max=function(e,t,i){return e[0]=Math.max(t[0],i[0]),e[1]=Math.max(t[1],i[1]),e},Zh.round=function(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e},Zh.scale=function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e},Zh.scaleAndAdd=function(e,t,i,r){return e[0]=t[0]+i[0]*r,e[1]=t[1]+i[1]*r,e},Zh.distance=eu,Zh.squaredDistance=tu,Zh.length=iu,Zh.squaredLength=ru,Zh.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e},Zh.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e},Zh.normalize=function(e,t){var i=t[0],r=t[1],n=i*i+r*r;return n>0&&(n=1/Math.sqrt(n)),e[0]=t[0]*n,e[1]=t[1]*n,e},Zh.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]},Zh.cross=function(e,t,i){var r=t[0]*i[1]-t[1]*i[0];return e[0]=e[1]=0,e[2]=r,e},Zh.lerp=function(e,t,i,r){var n=t[0],o=t[1];return e[0]=n+r*(i[0]-n),e[1]=o+r*(i[1]-o),e},Zh.random=function(e,t){t=t||1;var i=2*Hh.RANDOM()*Math.PI;return e[0]=Math.cos(i)*t,e[1]=Math.sin(i)*t,e},Zh.transformMat2=function(e,t,i){var r=t[0],n=t[1];return e[0]=i[0]*r+i[2]*n,e[1]=i[1]*r+i[3]*n,e},Zh.transformMat2d=function(e,t,i){var r=t[0],n=t[1];return e[0]=i[0]*r+i[2]*n+i[4],e[1]=i[1]*r+i[3]*n+i[5],e},Zh.transformMat3=function(e,t,i){var r=t[0],n=t[1];return e[0]=i[0]*r+i[3]*n+i[6],e[1]=i[1]*r+i[4]*n+i[7],e},Zh.transformMat4=function(e,t,i){var r=t[0],n=t[1];return e[0]=i[0]*r+i[4]*n+i[12],e[1]=i[1]*r+i[5]*n+i[13],e},Zh.rotate=function(e,t,i,r){var n=t[0]-i[0],o=t[1]-i[1],s=Math.sin(r),a=Math.cos(r);return e[0]=n*a-o*s+i[0],e[1]=n*s+o*a+i[1],e},Zh.angle=function(e,t){var i=e[0],r=e[1],n=t[0],o=t[1],s=Math.sqrt(i*i+r*r)*Math.sqrt(n*n+o*o);return Math.acos(Math.min(Math.max(s&&(i*n+r*o)/s,-1),1))},Zh.zero=function(e){return e[0]=0,e[1]=0,e},Zh.str=function(e){return "vec2("+e[0]+", "+e[1]+")"},Zh.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Zh.equals=function(e,t){var i=e[0],r=e[1],n=t[0],o=t[1];return Math.abs(i-n)<=Hh.EPSILON*Math.max(1,Math.abs(i),Math.abs(n))&&Math.abs(r-o)<=Hh.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))},Zh.forEach=Zh.sqrLen=Zh.sqrDist=Zh.dist=Zh.div=Zh.mul=Zh.sub=Zh.len=void 0;var Hh=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==Wh(e)&&"function"!=typeof e)return {default:e};var i=Xh(void 0);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}(Yl);function Xh(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (Xh=function(e){return e?i:t})(e)}function Yh(){var e=new Hh.ARRAY_TYPE(2);return Hh.ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0),e}function Kh(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e}function Jh(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e}function Qh(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e}function eu(e,t){return Math.hypot(t[0]-e[0],t[1]-e[1])}function tu(e,t){var i=t[0]-e[0],r=t[1]-e[1];return i*i+r*r}function iu(e){return Math.hypot(e[0],e[1])}function ru(e){var t=e[0],i=e[1];return t*t+i*i}Zh.len=iu,Zh.sub=Kh,Zh.mul=Jh,Zh.div=Qh,Zh.dist=eu,Zh.sqrDist=tu,Zh.sqrLen=ru;var nu=function(){var e=Yh();return function(t,i,r,n,o,s){var a,l;for(i||(i=2),r||(r=0),l=n?Math.min(n*i+r,t.length):t.length,a=r;a<l;a+=i)e[0]=t[a],e[1]=t[a+1],o(e,e,s),t[a]=e[0],t[a+1]=e[1];return t}}();function ou(e){return ou="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ou(e)}Zh.forEach=nu,Object.defineProperty(Xl,"__esModule",{value:!0});var su=Xl.vec4=vu=Xl.vec3=Xl.vec2=Xl.quat2=_u=Xl.quat=fu=Xl.mat4=du=Xl.mat3=Xl.mat2d=cu=Xl.mat2=Xl.glMatrix=void 0,au=Tu(Yl);Xl.glMatrix=au;var lu=Tu(tc),cu=Xl.mat2=lu,hu=Tu(ac);Xl.mat2d=hu;var uu=Tu(pc),du=Xl.mat3=uu,pu=Tu(xc),fu=Xl.mat4=pu,mu=Tu(zc),_u=Xl.quat=mu,gu=Tu(Rh);Xl.quat2=gu;var yu=Tu(Zh);Xl.vec2=yu;var xu=Tu(Pc),vu=Xl.vec3=xu,bu=Tu(Zc);function wu(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,i=new WeakMap;return (wu=function(e){return e?i:t})(e)}function Tu(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==ou(e)&&"function"!=typeof e)return {default:e};var i=wu(t);if(i&&i.has(e))return i.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o];}return r.default=e,i&&i.set(e,r),r}su=Xl.vec4=bu;const Eu=_a([{type:"Float32",name:"a_globe_pos",components:3},{type:"Float32",name:"a_uv",components:2}]),{members:Mu}=Eu,Au=_a([{name:"a_pos_3",components:3,type:"Int16"}]);var Su=_a([{name:"a_pos",type:"Int16",components:2}]);class Iu{constructor(e,t){this.pos=e,this.dir=t;}intersectsPlane(e,t,i){const r=vu.dot(t,this.dir);if(Math.abs(r)<1e-6)return !1;const n=((e[0]-this.pos[0])*t[0]+(e[1]-this.pos[1])*t[1]+(e[2]-this.pos[2])*t[2])/r;return i[0]=this.pos[0]+this.dir[0]*n,i[1]=this.pos[1]+this.dir[1]*n,i[2]=this.pos[2]+this.dir[2]*n,!0}closestPointOnSphere(e,t,i){if(vu.equals(this.pos,e)||0===t)return i[0]=i[1]=i[2]=0,!1;const[r,n,o]=this.dir,s=this.pos[0]-e[0],a=this.pos[1]-e[1],l=this.pos[2]-e[2],c=r*r+n*n+o*o,h=2*(s*r+a*n+l*o),u=h*h-4*c*(s*s+a*a+l*l-t*t);if(u<0){const e=Math.max(-h/2,0),c=s+r*e,u=a+n*e,d=l+o*e,p=Math.hypot(c,u,d);return i[0]=c*t/p,i[1]=u*t/p,i[2]=d*t/p,!1}{const e=(-h-Math.sqrt(u))/(2*c);if(e<0){const e=Math.hypot(s,a,l);return i[0]=s*t/e,i[1]=a*t/e,i[2]=l*t/e,!1}return i[0]=s+r*e,i[1]=a+n*e,i[2]=l+o*e,!0}}}class Cu{constructor(e,t,i,r,n){this.TL=e,this.TR=t,this.BR=i,this.BL=r,this.horizon=n;}static fromInvProjectionMatrix(e,t,i){const r=[-1,1,1],n=[1,1,1],o=[1,-1,1],s=[-1,-1,1],a=vu.transformMat4(r,r,e),l=vu.transformMat4(n,n,e),c=vu.transformMat4(o,o,e),h=vu.transformMat4(s,s,e);return new Cu(a,l,c,h,t/i)}}function zu(e,t,i){let r=1/0,n=-1/0;const o=[];for(const s of e){vu.sub(o,s,t);const e=vu.dot(o,i);r=Math.min(r,e),n=Math.max(n,e);}return [r,n]}function Pu(e,t){let i=!0;for(let r=0;r<e.planes.length;r++){const n=e.planes[r];let o=0;for(let e=0;e<t.length;e++)o+=vu.dot(n,t[e])+n[3]>=0;if(0===o)return 0;o!==t.length&&(i=!1);}return i?2:1}function Du(e,t){for(const i of e.projections){const r=zu(t,e.points[0],i.axis);if(i.projection[1]<r[0]||i.projection[0]>r[1])return 0}return 1}class Ru{constructor(e,t){this.points=e||new Array(8).fill([0,0,0]),this.planes=t||new Array(6).fill([0,0,0,0]),this.bounds=Lu.fromPoints(this.points),this.projections=[];const i=[vu.sub([],this.points[2],this.points[3]),vu.sub([],this.points[0],this.points[3]),vu.sub([],this.points[4],this.points[0]),vu.sub([],this.points[5],this.points[1]),vu.sub([],this.points[6],this.points[2]),vu.sub([],this.points[7],this.points[3])];for(const e of i){const t=[0,-e[2],e[1]],i=[e[2],0,-e[0]];this.projections.push({axis:t,projection:zu(this.points,this.points[0],t)}),this.projections.push({axis:i,projection:zu(this.points,this.points[0],i)});}}static fromInvProjectionMatrix(e,t,i,r){const n=Math.pow(2,i),o=[[-1,1,-1,1],[1,1,-1,1],[1,-1,-1,1],[-1,-1,-1,1],[-1,1,1,1],[1,1,1,1],[1,-1,1,1],[-1,-1,1,1]].map((i=>{const o=su.transformMat4([],i,e),s=1/o[3]/t*n;return su.mul(o,o,[s,s,r?1/o[3]:s,s])})),s=[[0,1,2],[6,5,4],[0,3,7],[2,1,5],[3,2,6],[0,4,5]].map((e=>{const t=vu.sub([],o[e[0]],o[e[1]]),i=vu.sub([],o[e[2]],o[e[1]]),r=vu.normalize([],vu.cross([],t,i)),n=-vu.dot(r,o[e[1]]);return r.concat(n)})),a=[];for(let e=0;e<o.length;e++)a.push([o[e][0],o[e][1],o[e][2]]);return new Ru(a,s)}}class Lu{static fromPoints(e){const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(const r of e)vu.min(t,t,r),vu.max(i,i,r);return new Lu(t,i)}static applyTransform(e,t){const i=e.getCorners();for(let e=0;e<i.length;++e)vu.transformMat4(i[e],i[e],t);return Lu.fromPoints(i)}static projectAabbCorners(e,t){const i=e.getCorners();for(let e=0;e<i.length;++e)vu.transformMat4(i[e],i[e],t);return i}constructor(e,t){this.min=e,this.max=t,this.center=vu.scale([],vu.add([],this.min,this.max),.5);}quadrant(e){const t=[e%2==0,e<2],i=vu.clone(this.min),r=vu.clone(this.max);for(let e=0;e<t.length;e++)i[e]=t[e]?this.min[e]:this.center[e],r[e]=t[e]?this.center[e]:this.max[e];return r[2]=this.max[2],new Lu(i,r)}distanceX(e){return Math.max(Math.min(this.max[0],e[0]),this.min[0])-e[0]}distanceY(e){return Math.max(Math.min(this.max[1],e[1]),this.min[1])-e[1]}distanceZ(e){return Math.max(Math.min(this.max[2],e[2]),this.min[2])-e[2]}getCorners(){const e=this.min,t=this.max;return [[e[0],e[1],e[2]],[t[0],e[1],e[2]],[t[0],t[1],e[2]],[e[0],t[1],e[2]],[e[0],e[1],t[2]],[t[0],e[1],t[2]],[t[0],t[1],t[2]],[e[0],t[1],t[2]]]}intersects(e){return this.intersectsAabb(e.bounds)?Pu(e,this.getCorners()):0}intersectsFlat(e){return this.intersectsAabb(e.bounds)?Pu(e,[[this.min[0],this.min[1],0],[this.max[0],this.min[1],0],[this.max[0],this.max[1],0],[this.min[0],this.max[1],0]]):0}intersectsPrecise(e,t){return t||this.intersects(e)?Du(e,this.getCorners()):0}intersectsPreciseFlat(e,t){return t||this.intersectsFlat(e)?Du(e,[[this.min[0],this.min[1],0],[this.max[0],this.min[1],0],[this.max[0],this.max[1],0],[this.min[0],this.max[1],0]]):0}intersectsAabb(e){for(let t=0;t<3;++t)if(this.min[t]>e.max[t]||e.min[t]>this.max[t])return !1;return !0}intersectsAabbXY(e){return !(this.min[0]>e.max[0]||e.min[0]>this.max[0]||this.min[1]>e.max[1]||e.min[1]>this.max[1])}encapsulate(e){for(let t=0;t<3;t++)this.min[t]=Math.min(this.min[t],e.min[t]),this.max[t]=Math.max(this.max[t],e.max[t]);}encapsulatePoint(e){for(let t=0;t<3;t++)this.min[t]=Math.min(this.min[t],e[t]),this.max[t]=Math.max(this.max[t],e[t]);}}Ss(Lu,"Aabb");const ku=5,Bu=6,Ou=sr/Math.PI/2,Fu=16383,Nu=64,Uu=[Nu,32,16],ju=-Ou,Vu=Ou,Gu=[new Lu([ju,ju,ju],[Vu,Vu,Vu]),new Lu([ju,ju,ju],[0,0,Vu]),new Lu([0,ju,ju],[Vu,0,Vu]),new Lu([ju,0,ju],[0,Vu,Vu]),new Lu([0,0,ju],[Vu,Vu,Vu])];function qu(e){return e*Ou/Td}function $u(e,t,i,r=!0){const n=vu.scale([],e._camera.position,e.worldSize),o=[t,i,1,1];su.transformMat4(o,o,e.pixelMatrixInverse),su.scale(o,o,1/o[3]);const s=vu.sub([],o,n),a=vu.normalize([],s),l=e.globeMatrix,c=[l[12],l[13],l[14]],h=vu.sub([],c,n),u=vu.length(h),d=vu.normalize([],h),p=e.worldSize/(2*Math.PI),f=vu.dot(d,a),m=Math.asin(p/u);if(m<Math.acos(f)){if(!r)return null;const e=[],t=[];vu.scale(e,a,u/f),vu.normalize(t,vu.sub(t,e,h)),vu.normalize(a,vu.add(a,h,vu.scale(a,t,Math.tan(m)*u)));}const _=[];new Iu(n,a).closestPointOnSphere(c,p,_);const g=vu.normalize([],oe(l,0)),y=vu.normalize([],oe(l,1)),x=vu.normalize([],oe(l,2)),v=vu.dot(g,_),b=vu.dot(y,_),w=vu.dot(x,_),E=T(Math.asin(-b/p));let M=T(Math.atan2(v,w));M=e.center.lng+function(e,t){const i=(t-e+180)%360-180;return i<-180?i+360:i}(e.center.lng,M);const A=Bd(M),S=z(Od(E),0,1);return new Wd(A,S)}class Zu{constructor(e,t,i){this.a=vu.sub([],e,i),this.b=vu.sub([],t,i),this.center=i;const r=vu.normalize([],this.a),n=vu.normalize([],this.b);this.angle=Math.acos(vu.dot(r,n));}}function Wu(e,t){if(0===e.angle)return null;let i;return i=0===e.a[t]?1/e.angle*.5*Math.PI:1/e.angle*Math.atan(e.b[t]/e.a[t]/Math.sin(e.angle)-1/Math.tan(e.angle)),i<0||i>1?null:function(e,t,i,r){const n=Math.sin(i);return e*(Math.sin((1-r)*i)/n)+t*(Math.sin(r*i)/n)}(e.a[t],e.b[t],e.angle,z(i,0,1))+e.center[t]}function Hu(e){if(e.z<=1)return Gu[e.z+2*e.y+e.x];const t=ed(Qu(e));return Lu.fromPoints(t)}function Xu(e,t,i){return vu.scale(e,e,1-i),vu.scaleAndAdd(e,e,t,i)}function Yu(e,t){const i=ud(t.zoom);if(0===i)return Hu(e);const r=Qu(e),n=ed(r),o=Bd(r.getWest())*t.worldSize,s=Bd(r.getEast())*t.worldSize,a=Od(r.getNorth())*t.worldSize,l=Od(r.getSouth())*t.worldSize,c=[o,a,0],h=[s,a,0],u=[o,l,0],d=[s,l,0],p=fu.invert([],t.globeMatrix);return vu.transformMat4(c,c,p),vu.transformMat4(h,h,p),vu.transformMat4(u,u,p),vu.transformMat4(d,d,p),n[0]=Xu(n[0],u,i),n[1]=Xu(n[1],d,i),n[2]=Xu(n[2],h,i),n[3]=Xu(n[3],c,i),Lu.fromPoints(n)}function Ku(e,t,i){for(const r of e)vu.transformMat4(r,r,t),vu.scale(r,r,i);}function Ju(e,t,i,r){const n=t/e.worldSize,o=e.globeMatrix;if(i.z<=1){const e=Hu(i).getCorners();return Ku(e,o,n),Lu.fromPoints(e)}const s=Qu(i,r),a=ed(s);Ku(a,o,n);const l=Number.MAX_VALUE,c=[-l,-l,-l],h=[l,l,l];if(s.contains(e.center)){for(const e of a)vu.min(h,h,e),vu.max(c,c,e);c[2]=0;const t=e.point,i=[t.x*n,t.y*n,0];return vu.min(h,h,i),vu.max(c,c,i),new Lu(h,c)}const u=[o[12]*n,o[13]*n,o[14]*n],d=s.getCenter(),p=z(e.center.lat,-Vd,Vd),f=z(d.lat,-Vd,Vd),m=Bd(e.center.lng),_=Od(p);let g=m-Bd(d.lng);const y=_-Od(f);g>.5?g-=1:g<-.5&&(g+=1);let x=0;if(Math.abs(g)>Math.abs(y))x=g>=0?1:3;else {x=y>=0?0:2;const e=[o[4]*n,o[5]*n,o[6]*n],t=-Math.sin(w(y>=0?s.getSouth():s.getNorth()))*Ou;vu.scaleAndAdd(u,u,e,t);}const v=a[x],b=a[(x+1)%4],T=new Zu(v,b,u),E=[Wu(T,0)||v[0],Wu(T,1)||v[1],Wu(T,2)||v[2]],M=ud(e.zoom);if(M>0){const r=function({x:e,y:t,z:i},r,n,o,s){const a=1/(1<<i);let l=e*a,c=l+a,h=t*a,u=h+a,d=0;const p=(l+c)/2-o;return p>.5?d=-1:p<-.5&&(d=1),l=((l+d)*r-(o*=r))*n+o,c=((c+d)*r-o)*n+o,h=(h*r-(s*=r))*n+s,u=(u*r-s)*n+s,[[l,u,0],[c,u,0],[c,h,0],[l,h,0]]}(i,t,e._pixelsPerMercatorPixel,m,_);for(let e=0;e<a.length;e++)Xu(a[e],r[e],M);const n=vu.add([],r[x],r[(x+1)%4]);vu.scale(n,n,.5),Xu(E,n,M);}for(const e of a)vu.min(h,h,e),vu.max(c,c,e);return h[2]=Math.min(v[2],b[2]),vu.min(h,h,E),vu.max(c,c,E),new Lu(h,c)}function Qu({x:e,y:t,z:i},r=!1){const n=1/(1<<i),o=new Ad(Nd(e*n),t===(1<<i)-1&&r?-90:Ud((t+1)*n)),s=new Ad(Nd((e+1)*n),0===t&&r?90:Ud(t*n));return new Hl(o,s)}function ed(e){const t=w(e.getNorth()),i=w(e.getSouth()),r=Math.cos(t),n=Math.cos(i),o=Math.sin(t),s=Math.sin(i),a=e.getWest(),l=e.getEast();return [td(n,s,a),td(n,s,l),td(r,o,l),td(r,o,a)]}function td(e,t,i,r=Ou){return i=w(i),[e*Math.sin(i)*r,-t*r,e*Math.cos(i)*r]}function id(e,t,i){return td(Math.cos(w(e)),Math.sin(w(e)),t,i)}function rd(e,t,i,r){const n=1<<i.z,o=(e/sr+i.x)/n;return id(Ud((t/sr+i.y)/n),Nd(o),r)}function nd({min:e,max:t}){return Fu/Math.max(t[0]-e[0],t[1]-e[1],t[2]-e[2])}const od=new Float64Array(16);function sd(e){const t=nd(e),i=fu.fromScaling(od,[t,t,t]);return fu.translate(i,i,vu.negate([],e.min))}function ad(e){const t=fu.fromTranslation(od,e.min),i=1/nd(e);return fu.scale(t,t,[i,i,i])}function ld(e){const t=sr/(2*Math.PI);return e/(2*Math.PI)/t}function cd(e,t){return sr/(512*Math.pow(2,e))*nd(Hu(t))}function hd(e,t,i,r,n){const o=ld(i),s=[e,t,-i/(2*Math.PI)],a=fu.identity(new Float64Array(16));return fu.translate(a,a,s),fu.scale(a,a,[o,o,o]),fu.rotateX(a,a,w(-n)),fu.rotateY(a,a,w(-r)),a}function ud(e){return P(ku,Bu,e)}function dd(e,t,i){const r=fu.identity(new Float64Array(16)),n=(t/(1<<e)-.5)*Math.PI*2;return fu.rotateY(r,i.globeMatrix,n),Float32Array.from(r)}function pd(e,t,i){const r=ud(i.zoom),n=e.style.map._antialias,o=!!t.extStandardDerivatives,s=t.extStandardDerivativesForceOff||e.terrain&&e.terrain.exaggeration()>0;return 0===r&&!n&&!s&&o}function fd(e,t,i,r){const n=t.getNorth(),o=t.getSouth(),s=t.getWest(),a=t.getEast(),l=1<<e.z,c=a-s,h=n-o,u=c/Nu,d=-h/Uu[i],p=[0,u,0,d,0,0,n,s,0];if(e.z>0){const e=180/r;du.multiply(p,p,[e/c+1,0,0,0,e/h+1,0,-.5*e/u,.5*e/d,1]);}return p[2]=l,p[5]=e.x,p[8]=e.y,p}function md(e){const t=Vd-5;e=z(e,-t,t)/t*90;const i=Math.pow(Math.abs(Math.sin(w(e))),3);return Math.round(i*(Uu.length-1))}function _d(e){const t=[0,0,0],i=fu.identity(new Float64Array(16));return fu.multiply(i,e.pixelMatrix,e.globeMatrix),vu.transformMat4(t,t,i),new y(t[0],t[1])}function gd(e,t){const i=id(t.lat,t.lng),r=function(e){const t=id(e._center.lat,e._center.lng),i=vu.fromValues(0,1,0);let r=vu.cross([],i,t);const n=fu.fromRotation([],-e.angle,t);r=vu.transformMat4(r,r,n),fu.fromRotation(n,-e._pitch,r);const o=vu.normalize([],t);return vu.scale(o,o,qu(e.cameraToCenterDistance/e.pixelsPerMeter)),vu.transformMat4(o,o,n),vu.add([],t,o)}(e),n=vu.subtract([],r,i);return vu.angle(n,i)}function yd(e,t){return gd(e,t)>Math.PI/2*1.01}const xd=w(85),vd=Math.cos(xd),bd=Math.sin(xd);class wd{constructor(e){this._createGrid(e),this._createPoles(e);}destroy(){this._poleIndexBuffer.destroy(),this._gridBuffer.destroy(),this._gridIndexBuffer.destroy(),this._poleNorthVertexBuffer.destroy(),this._poleSouthVertexBuffer.destroy();for(const e of this._poleSegments)e.destroy();for(const e of this._gridSegments)e.withSkirts.destroy(),e.withoutSkirts.destroy();}_fillGridMeshWithLods(e,t){const i=new ya,r=new ka,n=[],o=e+1+2,s=t[0]+1,a=t[0]+1+(1+t.length),l=(e,t,i)=>{let r=e===o-1?e-2:0===e?e:e-1;return r+=i?24575:0,[r,t]};for(let e=0;e<o;++e)i.emplaceBack(...l(e,0,!0));for(let e=0;e<s;++e)for(let t=0;t<o;++t)i.emplaceBack(...l(t,e,(0===t||t===o-1)&&!0));for(let e=0;e<t.length;++e){const r=t[e];for(let e=0;e<o;++e)i.emplaceBack(...l(e,r,!0));}for(let e=0;e<t.length;++e){const s=r.length,l=t[e]+1+2,c=new ka;for(let i=0;i<l-1;i++){const n=i===l-2,s=n?o*(a-t.length+e-i):o;for(let e=0;e<o-1;e++){const t=i*o+e;0===i||n||0===e||e===o-2?(c.emplaceBack(t+1,t,t+s),c.emplaceBack(t+s,t+s+1,t+1)):(r.emplaceBack(t+1,t,t+s),r.emplaceBack(t+s,t+s+1,t+1));}}const h=Wl.simpleSegment(0,s,i.length,r.length-s);for(let e=0;e<c.uint16.length;e+=3)r.emplaceBack(c.uint16[e],c.uint16[e+1],c.uint16[e+2]);const u=Wl.simpleSegment(0,s,i.length,r.length-s);n.push({withoutSkirts:h,withSkirts:u});}return {vertices:i,indices:r,segments:n}}_createGrid(e){const t=this._fillGridMeshWithLods(Nu,Uu);this._gridSegments=t.segments,this._gridBuffer=e.createVertexBuffer(t.vertices,Su.members),this._gridIndexBuffer=e.createIndexBuffer(t.indices,!0);}_createPoles(e){const t=new ka;for(let e=0;e<=Nu;e++)t.emplaceBack(0,e+1,e+2);this._poleIndexBuffer=e.createIndexBuffer(t,!0);const i=new Na,r=new Na;this._poleSegments=[];for(let e=0,t=0;e<ku;e++){const n=360/(1<<e);i.emplaceBack(0,-Ou,0,.5,0),r.emplaceBack(0,-Ou,0,.5,1);for(let e=0;e<=Nu;e++){const t=e/Nu,o=Hr(0,n,t),[s,a,l]=td(vd,bd,o,Ou);i.emplaceBack(s,a,l,t,0),r.emplaceBack(s,a,l,t,1);}this._poleSegments.push(Wl.simpleSegment(t,0,66,64)),t+=66;}this._poleNorthVertexBuffer=e.createVertexBuffer(i,Mu,!1),this._poleSouthVertexBuffer=e.createVertexBuffer(r,Mu,!1);}getGridBuffers(e,t){return [this._gridBuffer,this._gridIndexBuffer,t?this._gridSegments[e].withSkirts:this._gridSegments[e].withoutSkirts]}getPoleBuffers(e){return [this._poleNorthVertexBuffer,this._poleSouthVertexBuffer,this._poleIndexBuffer,this._poleSegments[e]]}}const Td=6371008.8,Ed=2*Math.PI*Td;class Md{constructor(e,t){if(isNaN(e)||isNaN(t))throw new Error(`Invalid LngLat object: (${e}, ${t})`);if(this.lng=+e,this.lat=+t,this.lat>90||this.lat<-90)throw new Error("Invalid LngLat latitude value: must be between -90 and 90")}wrap(){return new Md(D(this.lng,-180,180),this.lat)}toArray(){return [this.lng,this.lat]}toString(){return `LngLat(${this.lng}, ${this.lat})`}distanceTo(e){const t=Math.PI/180,i=this.lat*t,r=e.lat*t,n=Math.sin(i)*Math.sin(r)+Math.cos(i)*Math.cos(r)*Math.cos((e.lng-this.lng)*t);return Td*Math.acos(Math.min(n,1))}toBounds(e=0){const t=360*e/40075017,i=t/Math.cos(Math.PI/180*this.lat);return new Hl(new Md(this.lng-i,this.lat-t),new Md(this.lng+i,this.lat+t))}toEcef(e){const t=qu(e);return id(this.lat,this.lng,Ou+t)}static convert(e){if(e instanceof Md)return e;if(Array.isArray(e)&&(2===e.length||3===e.length))return new Md(Number(e[0]),Number(e[1]));if(!Array.isArray(e)&&"object"==typeof e&&null!==e)return new Md(Number("lng"in e?e.lng:e.lon),Number(e.lat));throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]")}}var Ad=Md,Sd={};!function(e,t){!function(e){function t(e,t,r){var n=i(256*e,256*(t=Math.pow(2,r)-t-1),r),o=i(256*(e+1),256*(t+1),r);return n[0]+","+n[1]+","+o[0]+","+o[1]}function i(e,t,i){var r=2*Math.PI*6378137/256/Math.pow(2,i);return [e*r-2*Math.PI*6378137/2,t*r-2*Math.PI*6378137/2]}e.getURL=function(e,i,r,n,o,s){return s=s||{},e+"?"+["bbox="+t(r,n,o),"format="+(s.format||"image/png"),"service="+(s.service||"WMS"),"version="+(s.version||"1.1.1"),"request="+(s.request||"GetMap"),"srs="+(s.srs||"EPSG:3857"),"width="+(s.width||256),"height="+(s.height||256),"layers="+i].join("&")},e.getTileBBox=t,e.getMercCoords=i,Object.defineProperty(e,"__esModule",{value:!0});}(t);}(0,Sd);var Id=Sd;class Cd{constructor(e,t,i){this.z=e,this.x=t,this.y=i,this.key=Dd(0,e,e,t,i);}equals(e){return this.z===e.z&&this.x===e.x&&this.y===e.y}url(e,t){const i=Id.getTileBBox(this.x,this.y,this.z),r=function(e,t,i){let r,n="";for(let o=e;o>0;o--)r=1<<o-1,n+=(t&r?1:0)+(i&r?2:0);return n}(this.z,this.x,this.y);return e[(this.x+this.y)%e.length].replace("{prefix}",(this.x%16).toString(16)+(this.y%16).toString(16)).replace(/{z}/g,String(this.z)).replace(/{x}/g,String(this.x)).replace(/{y}/g,String("tms"===t?Math.pow(2,this.z)-this.y-1:this.y)).replace("{quadkey}",r).replace("{bbox-epsg-3857}",i)}toString(){return `${this.z}/${this.x}/${this.y}`}}class zd{constructor(e,t){this.wrap=e,this.canonical=t,this.key=Dd(e,t.z,t.z,t.x,t.y);}}class Pd{constructor(e,t,i,r,n){this.overscaledZ=e,this.wrap=t,this.canonical=new Cd(i,+r,+n),this.key=0===t&&e===i?this.canonical.key:Dd(t,e,i,r,n);}equals(e){return this.overscaledZ===e.overscaledZ&&this.wrap===e.wrap&&this.canonical.equals(e.canonical)}scaledTo(e){const t=this.canonical.z-e;return e>this.canonical.z?new Pd(e,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y):new Pd(e,this.wrap,e,this.canonical.x>>t,this.canonical.y>>t)}calculateScaledKey(e,t=!0){if(this.overscaledZ===e&&t)return this.key;if(e>this.canonical.z)return Dd(this.wrap*+t,e,this.canonical.z,this.canonical.x,this.canonical.y);{const i=this.canonical.z-e;return Dd(this.wrap*+t,e,e,this.canonical.x>>i,this.canonical.y>>i)}}isChildOf(e){if(e.wrap!==this.wrap)return !1;const t=this.canonical.z-e.canonical.z;return 0===e.overscaledZ||e.overscaledZ<this.overscaledZ&&e.canonical.x===this.canonical.x>>t&&e.canonical.y===this.canonical.y>>t}children(e){if(this.overscaledZ>=e)return [new Pd(this.overscaledZ+1,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y)];const t=this.canonical.z+1,i=2*this.canonical.x,r=2*this.canonical.y;return [new Pd(t,this.wrap,t,i,r),new Pd(t,this.wrap,t,i+1,r),new Pd(t,this.wrap,t,i,r+1),new Pd(t,this.wrap,t,i+1,r+1)]}isLessThan(e){return this.wrap<e.wrap||!(this.wrap>e.wrap)&&(this.overscaledZ<e.overscaledZ||!(this.overscaledZ>e.overscaledZ)&&(this.canonical.x<e.canonical.x||!(this.canonical.x>e.canonical.x)&&this.canonical.y<e.canonical.y))}wrapped(){return new Pd(this.overscaledZ,0,this.canonical.z,this.canonical.x,this.canonical.y)}unwrapTo(e){return new Pd(this.overscaledZ,e,this.canonical.z,this.canonical.x,this.canonical.y)}overscaleFactor(){return Math.pow(2,this.overscaledZ-this.canonical.z)}toUnwrapped(){return new zd(this.wrap,this.canonical)}toString(){return `${this.overscaledZ}/${this.canonical.x}/${this.canonical.y}`}}function Dd(e,t,i,r,n){const o=1<<Math.min(i,22);let s=o*(n%o)+r%o;return e&&i<22&&(s+=o*o*((e<0?-2*e-1:2*e)%(1<<2*(22-i)))),16*(32*s+i)+(t-i)}Ss(Cd,"CanonicalTileID"),Ss(Pd,"OverscaledTileID",{omit:["projMatrix"]});const Rd=0,Ld=25.5;function kd(e){return Ed*Math.cos(e*Math.PI/180)}function Bd(e){return (180+e)/360}function Od(e){return (180-180/Math.PI*Math.log(Math.tan(Math.PI/4+e*Math.PI/360)))/360}function Fd(e,t){return e/kd(t)}function Nd(e){return 360*e-180}function Ud(e){return 360/Math.PI*Math.atan(Math.exp((180-360*e)*Math.PI/180))-90}function jd(e,t){return e*kd(Ud(t))}const Vd=85.051129;function Gd(e){return Math.cos(w(z(e,-Vd,Vd)))}function qd(e,t){const i=z(t,Rd,Ld),r=Math.pow(2,i);return Gd(e)*Ed/(512*r)}function $d(e){return 1/Math.cos(e*Math.PI/180)}function Zd(e,t=0){const i=Math.exp(Math.PI*(1-(e.y+t/sr)/(1<<e.z)*2));return 80150034*i/(i*i+1)/sr/(1<<e.z)}class Wd{constructor(e,t,i=0){this.x=+e,this.y=+t,this.z=+i;}static fromLngLat(e,t=0){const i=Ad.convert(e);return new Wd(Bd(i.lng),Od(i.lat),Fd(t,i.lat))}toLngLat(){return new Ad(Nd(this.x),Ud(this.y))}toAltitude(){return jd(this.z,this.y)}meterInMercatorCoordinateUnits(){return 1/Ed*$d(Ud(this.y))}}function Hd(e,t,i,r,n,o,s,a,l){const c=(t+r)/2,h=(i+n)/2,u=new y(c,h);a(u),function(e,t,i,r,n,o){const s=i-n,a=r-o;return Math.abs((r-t)*s-(i-e)*a)/Math.hypot(s,a)}(u.x,u.y,o.x,o.y,s.x,s.y)>=l?(Hd(e,t,i,c,h,o,u,a,l),Hd(e,c,h,r,n,u,s,a,l)):e.push(s);}function Xd(e,t,i){let r=e[0],n=r.x,o=r.y;t(r);const s=[r];for(let a=1;a<e.length;a++){const l=e[a],{x:c,y:h}=l;t(l),Hd(s,n,o,c,h,r,l,t,i),n=c,o=h,r=l;}return s}function Yd(e,t,i,r){if(r(t,i)){const n=t.add(i)._mult(.5);Yd(e,t,n,r),Yd(e,n,i,r);}else e.push(i);}function Kd(e,t){let i=e[0];const r=[i];for(let n=1;n<e.length;n++){const o=e[n];Yd(r,i,o,t),i=o;}return r}const Jd=Math.pow(2,14)-1,Qd=-Jd-1;function ep(e,t){const i=Math.round(e.x*t),r=Math.round(e.y*t);return e.x=z(i,Qd,Jd),e.y=z(r,Qd,Jd),(i<e.x||i>e.x+1||r<e.y||r>e.y+1)&&H("Geometry exceeds allowed extent, reduce your vector tile buffer size"),e}function tp(e,t,i){const r=e.loadGeometry(),n=e.extent,o=sr/n;if(t&&i&&i.projection.isReprojectedInTileSpace){const o=1<<t.z,{scale:s,x:a,y:l,projection:c}=i,h=e=>{const i=Nd((t.x+e.x/n)/o),r=Ud((t.y+e.y/n)/o),h=c.project(i,r);e.x=(h.x*s-a)*n,e.y=(h.y*s-l)*n;};for(let t=0;t<r.length;t++)if(1!==e.type)r[t]=Xd(r[t],h,1);else {const e=[];for(const i of r[t])i.x<0||i.x>=n||i.y<0||i.y>=n||(h(i),e.push(i));r[t]=e;}}for(const e of r)for(const t of e)ep(t,o);return r}function ip(e,t){return {type:e.type,id:e.id,properties:e.properties,geometry:t?tp(e):[]}}function rp(e,t,i,r,n){e.emplaceBack(2*t+(r+1)/2,2*i+(n+1)/2);}function np(e,t,i){const r=16384;e.emplaceBack(t.x,t.y,t.z,i[0]*r,i[1]*r,i[2]*r);}class op{constructor(e){this.zoom=e.zoom,this.overscaling=e.overscaling,this.layers=e.layers,this.layerIds=this.layers.map((e=>e.id)),this.index=e.index,this.hasPattern=!1,this.projection=e.projection,this.layoutVertexArray=new ya,this.indexArray=new ka,this.segments=new Wl,this.programConfigurations=new Ol(e.layers,e.zoom),this.stateDependentLayerIds=this.layers.filter((e=>e.isStateDependent())).map((e=>e.id));}populate(e,t,i,r){const n=this.layers[0],o=[];let s=null;"circle"===n.type&&(s=n.layout.get("circle-sort-key"));for(const{feature:t,id:n,index:a,sourceLayerIndex:l}of e){const e=this.layers[0]._featureFilter.needGeometry,c=ip(t,e);if(!this.layers[0]._featureFilter.filter(new Qs(this.zoom),c,i))continue;const h=s?s.evaluate(c,{},i):void 0,u={id:n,properties:t.properties,type:t.type,sourceLayerIndex:l,index:a,geometry:e?c.geometry:tp(t,i,r),patterns:{},sortKey:h};o.push(u);}s&&o.sort(((e,t)=>e.sortKey-t.sortKey));let a=null;"globe"===r.projection.name&&(this.globeExtVertexArray=new Ma,a=r.projection);for(const r of o){const{geometry:n,index:o,sourceLayerIndex:s}=r,l=e[o].feature;this.addFeature(r,n,o,t.availableImages,i,a,t.brightness),t.featureIndex.insert(l,n,o,s,this.index);}}update(e,t,i,r,n){const o=0!==Object.keys(e).length;o&&!this.stateDependentLayers.length||this.programConfigurations.updatePaintArrays(e,t,o?this.stateDependentLayers:this.layers,i,r,n);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(e){this.uploaded||(this.layoutVertexBuffer=e.createVertexBuffer(this.layoutVertexArray,$l.members),this.indexBuffer=e.createIndexBuffer(this.indexArray),this.globeExtVertexArray&&(this.globeExtVertexBuffer=e.createVertexBuffer(this.globeExtVertexArray,Zl.members))),this.programConfigurations.upload(e),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.globeExtVertexBuffer&&this.globeExtVertexBuffer.destroy());}addFeature(e,t,i,r,n,o,s){for(const i of t)for(const t of i){const i=t.x,r=t.y;if(i<0||i>=sr||r<0||r>=sr)continue;if(o){const e=o.projectTilePoint(i,r,n),t=o.upVector(n,i,r),s=this.globeExtVertexArray;np(s,e,t),np(s,e,t),np(s,e,t),np(s,e,t);}const s=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray,e.sortKey),a=s.vertexLength;rp(this.layoutVertexArray,i,r,-1,-1),rp(this.layoutVertexArray,i,r,1,-1),rp(this.layoutVertexArray,i,r,1,1),rp(this.layoutVertexArray,i,r,-1,1),this.indexArray.emplaceBack(a,a+1,a+2),this.indexArray.emplaceBack(a,a+2,a+3),s.vertexLength+=4,s.primitiveLength+=2;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,e,i,{},r,n,s);}}function sp(e,t){for(let i=0;i<e.length;i++)if(mp(t,e[i]))return !0;for(let i=0;i<t.length;i++)if(mp(e,t[i]))return !0;return !!hp(e,t)}function ap(e,t,i){return !!mp(e,t)||!!dp(t,e,i)}function lp(e,t){if(1===e.length)return fp(t,e[0]);for(let i=0;i<t.length;i++){const r=t[i];for(let t=0;t<r.length;t++)if(mp(e,r[t]))return !0}for(let i=0;i<e.length;i++)if(fp(t,e[i]))return !0;for(let i=0;i<t.length;i++)if(hp(e,t[i]))return !0;return !1}function cp(e,t,i){if(e.length>1){if(hp(e,t))return !0;for(let r=0;r<t.length;r++)if(dp(t[r],e,i))return !0}for(let r=0;r<e.length;r++)if(dp(e[r],t,i))return !0;return !1}function hp(e,t){if(0===e.length||0===t.length)return !1;for(let i=0;i<e.length-1;i++){const r=e[i],n=e[i+1];for(let e=0;e<t.length-1;e++)if(up(r,n,t[e],t[e+1]))return !0}return !1}function up(e,t,i,r){return X(e,i,r)!==X(t,i,r)&&X(e,t,i)!==X(e,t,r)}function dp(e,t,i){const r=i*i;if(1===t.length)return e.distSqr(t[0])<r;for(let i=1;i<t.length;i++)if(pp(e,t[i-1],t[i])<r)return !0;return !1}function pp(e,t,i){const r=t.distSqr(i);if(0===r)return e.distSqr(t);const n=((e.x-t.x)*(i.x-t.x)+(e.y-t.y)*(i.y-t.y))/r;return e.distSqr(n<0?t:n>1?i:i.sub(t)._mult(n)._add(t))}function fp(e,t){let i,r,n,o=!1;for(let s=0;s<e.length;s++){i=e[s];for(let e=0,s=i.length-1;e<i.length;s=e++)r=i[e],n=i[s],r.y>t.y!=n.y>t.y&&t.x<(n.x-r.x)*(t.y-r.y)/(n.y-r.y)+r.x&&(o=!o);}return o}function mp(e,t){let i=!1;for(let r=0,n=e.length-1;r<e.length;n=r++){const o=e[r],s=e[n];o.y>t.y!=s.y>t.y&&t.x<(s.x-o.x)*(t.y-o.y)/(s.y-o.y)+o.x&&(i=!i);}return i}function _p(e,t,i,r,n){for(const o of e)if(t<=o.x&&i<=o.y&&r>=o.x&&n>=o.y)return !0;const o=[new y(t,i),new y(t,n),new y(r,n),new y(r,i)];if(e.length>2)for(const t of o)if(mp(e,t))return !0;for(let t=0;t<e.length-1;t++)if(gp(e[t],e[t+1],o))return !0;return !1}function gp(e,t,i){const r=i[0],n=i[2];if(e.x<r.x&&t.x<r.x||e.x>n.x&&t.x>n.x||e.y<r.y&&t.y<r.y||e.y>n.y&&t.y>n.y)return !1;const o=X(e,t,i[0]);return o!==X(e,t,i[1])||o!==X(e,t,i[2])||o!==X(e,t,i[3])}function yp(e,t,i,r,n,o){let s=t.y-e.y,a=e.x-t.x;if(o=o||0){const e=s*s+a*a;if(0===e)return !0;const t=Math.sqrt(e);s/=t,a/=t;}return !((i.x-e.x)*s+(i.y-e.y)*a-o<0||(r.x-e.x)*s+(r.y-e.y)*a-o<0||(n.x-e.x)*s+(n.y-e.y)*a-o<0)}function xp(e,t,i,r,n,o,s){return !(yp(e,t,r,n,o,s)||yp(t,i,r,n,o,s)||yp(i,e,r,n,o,s)||yp(r,n,e,t,i,s)||yp(n,o,e,t,i,s)||yp(o,r,e,t,i,s))}function vp(e,t,i){const r=t.paint.get(e).value;return "constant"===r.kind?r.value:i.programConfigurations.get(t.id).getMaxValue(e)}function bp(e){return Math.sqrt(e[0]*e[0]+e[1]*e[1])}function wp(e,t,i,r,n){if(!t[0]&&!t[1])return e;const o=y.convert(t)._mult(n);"viewport"===i&&o._rotate(-r);const s=[];for(let t=0;t<e.length;t++)s.push(e[t].sub(o));return s}function Tp(e,t,i,r){const n=y.convert(e)._mult(r);return "viewport"===t&&n._rotate(-i),n}Ss(op,"CircleBucket",{omit:["layers"]});const Ep=new ua({"circle-sort-key":new ca(zt.layout_circle["circle-sort-key"]),visibility:new la(zt.layout_circle.visibility)});var Mp={paint:new ua({"circle-radius":new ca(zt.paint_circle["circle-radius"]),"circle-color":new ca(zt.paint_circle["circle-color"]),"circle-blur":new ca(zt.paint_circle["circle-blur"]),"circle-opacity":new ca(zt.paint_circle["circle-opacity"]),"circle-translate":new la(zt.paint_circle["circle-translate"]),"circle-translate-anchor":new la(zt.paint_circle["circle-translate-anchor"]),"circle-pitch-scale":new la(zt.paint_circle["circle-pitch-scale"]),"circle-pitch-alignment":new la(zt.paint_circle["circle-pitch-alignment"]),"circle-stroke-width":new ca(zt.paint_circle["circle-stroke-width"]),"circle-stroke-color":new ca(zt.paint_circle["circle-stroke-color"]),"circle-stroke-opacity":new ca(zt.paint_circle["circle-stroke-opacity"]),"circle-emissive-strength":new la(zt.paint_circle["circle-emissive-strength"])}),layout:Ep};function Ap(e,t,i,r,n,o,s,a,l){if(o&&e.queryGeometry.isAboveHorizon)return !1;o&&(l*=e.pixelToTileUnitsFactor);const c=e.tileID.canonical,h=i.projection.upVectorScale(c,i.center.lat,i.worldSize).metersToTile;for(const u of t)for(const t of u){const u=t.add(a),d=n&&i.elevation?i.elevation.exaggeration()*n.getElevationAt(u.x,u.y,!0):0,p=i.projection.projectTilePoint(u.x,u.y,c);if(d>0){const e=i.projection.upVector(c,u.x,u.y);p.x+=e[0]*h*d,p.y+=e[1]*h*d,p.z+=e[2]*h*d;}const f=o?u:Sp(p.x,p.y,p.z,r),m=o?e.tilespaceRays.map((e=>zp(e,d))):e.queryGeometry.screenGeometry,_=su.transformMat4([],[p.x,p.y,p.z,1],r);if(!s&&o?l*=_[3]/i.cameraToCenterDistance:s&&!o&&(l*=i.cameraToCenterDistance/_[3]),o){const e=Ud((t.y/sr+c.y)/(1<<c.z));l/=i.projection.pixelsPerMeter(e,1)/Fd(1,e);}if(ap(m,f,l))return !0}return !1}function Sp(e,t,i,r){const n=su.transformMat4([],[e,t,i,1],r);return new y(n[0]/n[3],n[1]/n[3])}const Ip=vu.fromValues(0,0,0),Cp=vu.fromValues(0,0,1);function zp(e,t){const i=vu.create();return Ip[2]=t,e.intersectsPlane(Ip,Cp,i),new y(i[0],i[1])}class Pp extends op{}function Dp(e,{width:t,height:i},r,n){if(n){if(n instanceof Uint8ClampedArray)n=new Uint8Array(n.buffer);else if(n.length!==t*i*r)throw new RangeError("mismatched image size")}else n=new Uint8Array(t*i*r);return e.width=t,e.height=i,e.data=n,e}function Rp(e,t,i){const{width:r,height:n}=t;r===e.width&&n===e.height||(Lp(e,t,{x:0,y:0},{x:0,y:0},{width:Math.min(e.width,r),height:Math.min(e.height,n)},i),e.width=r,e.height=n,e.data=t.data);}function Lp(e,t,i,r,n,o){if(0===n.width||0===n.height)return t;if(n.width>e.width||n.height>e.height||i.x>e.width-n.width||i.y>e.height-n.height)throw new RangeError("out of range source coordinates for image copy");if(n.width>t.width||n.height>t.height||r.x>t.width-n.width||r.y>t.height-n.height)throw new RangeError("out of range destination coordinates for image copy");const s=e.data,a=t.data;for(let l=0;l<n.height;l++){const c=((i.y+l)*e.width+i.x)*o,h=((r.y+l)*t.width+r.x)*o;for(let e=0;e<n.width*o;e++)a[h+e]=s[c+e];}return t}Ss(Pp,"HeatmapBucket",{omit:["layers"]});class kp{constructor(e,t){Dp(this,e,1,t);}resize(e){Rp(this,new kp(e),1);}clone(){return new kp({width:this.width,height:this.height},new Uint8Array(this.data))}static copy(e,t,i,r,n){Lp(e,t,i,r,n,1);}}class Bp{constructor(e,t){Dp(this,e,4,t);}resize(e){Rp(this,new Bp(e),4);}replace(e,t){t?this.data.set(e):this.data=e instanceof Uint8ClampedArray?new Uint8Array(e.buffer):e;}clone(){return new Bp({width:this.width,height:this.height},new Uint8Array(this.data))}static copy(e,t,i,r,n){Lp(e,t,i,r,n,4);}}Ss(kp,"AlphaImage"),Ss(Bp,"RGBAImage");const Op=new ua({visibility:new la(zt.layout_heatmap.visibility)});var Fp={paint:new ua({"heatmap-radius":new ca(zt.paint_heatmap["heatmap-radius"]),"heatmap-weight":new ca(zt.paint_heatmap["heatmap-weight"]),"heatmap-intensity":new la(zt.paint_heatmap["heatmap-intensity"]),"heatmap-color":new ha(zt.paint_heatmap["heatmap-color"]),"heatmap-opacity":new la(zt.paint_heatmap["heatmap-opacity"])}),layout:Op};function Np(e){const t={},i=e.resolution||256,r=e.clips?e.clips.length:1,n=e.image||new Bp({width:i,height:r}),o=(i,r,o)=>{t[e.evaluationKey]=o;const s=e.expression.evaluate(t);n.data[i+r+0]=Math.floor(255*s.r/s.a),n.data[i+r+1]=Math.floor(255*s.g/s.a),n.data[i+r+2]=Math.floor(255*s.b/s.a),n.data[i+r+3]=Math.floor(255*s.a);};if(e.clips)for(let t=0,n=0;t<r;++t,n+=4*i)for(let r=0,s=0;r<i;r++,s+=4){const a=r/(i-1),{start:l,end:c}=e.clips[t];o(n,s,l*(1-a)+c*a);}else for(let e=0,t=0;e<i;e++,t+=4)o(0,t,e/(i-1));return n}const Up=new ua({visibility:new la(zt.layout_hillshade.visibility)});var jp={paint:new ua({"hillshade-illumination-direction":new la(zt.paint_hillshade["hillshade-illumination-direction"]),"hillshade-illumination-anchor":new la(zt.paint_hillshade["hillshade-illumination-anchor"]),"hillshade-exaggeration":new la(zt.paint_hillshade["hillshade-exaggeration"]),"hillshade-shadow-color":new la(zt.paint_hillshade["hillshade-shadow-color"]),"hillshade-highlight-color":new la(zt.paint_hillshade["hillshade-highlight-color"]),"hillshade-accent-color":new la(zt.paint_hillshade["hillshade-accent-color"])}),layout:Up};const Vp=_a([{name:"a_pos",components:2,type:"Int16"}],4),{members:Gp}=Vp;var qp={exports:{}};function $p(e,t,i){i=i||2;var r,n,o,s,a,l,c,h=t&&t.length,u=h?t[0]*i:e.length,d=Zp(e,0,u,i,!0),p=[];if(!d||d.next===d.prev)return p;if(h&&(d=function(e,t,i,r){var n,o,s,a=[];for(n=0,o=t.length;n<o;n++)(s=Zp(e,t[n]*r,n<o-1?t[n+1]*r:e.length,r,!1))===s.next&&(s.steiner=!0),a.push(nf(s));for(a.sort(Qp),n=0;n<a.length;n++)i=ef(a[n],i);return i}(e,t,d,i)),e.length>80*i){r=o=e[0],n=s=e[1];for(var f=i;f<u;f+=i)(a=e[f])<r&&(r=a),(l=e[f+1])<n&&(n=l),a>o&&(o=a),l>s&&(s=l);c=0!==(c=Math.max(o-r,s-n))?32767/c:0;}return Hp(d,p,i,r,n,c,0),p}function Zp(e,t,i,r,n){var o,s;if(n===gf(e,t,i,r)>0)for(o=t;o<i;o+=r)s=ff(o,e[o],e[o+1],s);else for(o=i-r;o>=t;o-=r)s=ff(o,e[o],e[o+1],s);return s&&lf(s,s.next)&&(mf(s),s=s.next),s}function Wp(e,t){if(!e)return e;t||(t=e);var i,r=e;do{if(i=!1,r.steiner||!lf(r,r.next)&&0!==af(r.prev,r,r.next))r=r.next;else {if(mf(r),(r=t=r.prev)===r.next)break;i=!0;}}while(i||r!==t);return t}function Hp(e,t,i,r,n,o,s){if(e){!s&&o&&function(e,t,i,r){var n=e;do{0===n.z&&(n.z=rf(n.x,n.y,t,i,r)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;}while(n!==e);n.prevZ.nextZ=null,n.prevZ=null,function(e){var t,i,r,n,o,s,a,l,c=1;do{for(i=e,e=null,o=null,s=0;i;){for(s++,r=i,a=0,t=0;t<c&&(a++,r=r.nextZ);t++);for(l=c;a>0||l>0&&r;)0!==a&&(0===l||!r||i.z<=r.z)?(n=i,i=i.nextZ,a--):(n=r,r=r.nextZ,l--),o?o.nextZ=n:e=n,n.prevZ=o,o=n;i=r;}o.nextZ=null,c*=2;}while(s>1)}(n);}(e,r,n,o);for(var a,l,c=e;e.prev!==e.next;)if(a=e.prev,l=e.next,o?Yp(e,r,n,o):Xp(e))t.push(a.i/i|0),t.push(e.i/i|0),t.push(l.i/i|0),mf(e),e=l.next,c=l.next;else if((e=l)===c){s?1===s?Hp(e=Kp(Wp(e),t,i),t,i,r,n,o,2):2===s&&Jp(e,t,i,r,n,o):Hp(Wp(e),t,i,r,n,o,1);break}}}function Xp(e){var t=e.prev,i=e,r=e.next;if(af(t,i,r)>=0)return !1;for(var n=t.x,o=i.x,s=r.x,a=t.y,l=i.y,c=r.y,h=n<o?n<s?n:s:o<s?o:s,u=a<l?a<c?a:c:l<c?l:c,d=n>o?n>s?n:s:o>s?o:s,p=a>l?a>c?a:c:l>c?l:c,f=r.next;f!==t;){if(f.x>=h&&f.x<=d&&f.y>=u&&f.y<=p&&of(n,a,o,l,s,c,f.x,f.y)&&af(f.prev,f,f.next)>=0)return !1;f=f.next;}return !0}function Yp(e,t,i,r){var n=e.prev,o=e,s=e.next;if(af(n,o,s)>=0)return !1;for(var a=n.x,l=o.x,c=s.x,h=n.y,u=o.y,d=s.y,p=a<l?a<c?a:c:l<c?l:c,f=h<u?h<d?h:d:u<d?u:d,m=a>l?a>c?a:c:l>c?l:c,_=h>u?h>d?h:d:u>d?u:d,g=rf(p,f,t,i,r),y=rf(m,_,t,i,r),x=e.prevZ,v=e.nextZ;x&&x.z>=g&&v&&v.z<=y;){if(x.x>=p&&x.x<=m&&x.y>=f&&x.y<=_&&x!==n&&x!==s&&of(a,h,l,u,c,d,x.x,x.y)&&af(x.prev,x,x.next)>=0)return !1;if(x=x.prevZ,v.x>=p&&v.x<=m&&v.y>=f&&v.y<=_&&v!==n&&v!==s&&of(a,h,l,u,c,d,v.x,v.y)&&af(v.prev,v,v.next)>=0)return !1;v=v.nextZ;}for(;x&&x.z>=g;){if(x.x>=p&&x.x<=m&&x.y>=f&&x.y<=_&&x!==n&&x!==s&&of(a,h,l,u,c,d,x.x,x.y)&&af(x.prev,x,x.next)>=0)return !1;x=x.prevZ;}for(;v&&v.z<=y;){if(v.x>=p&&v.x<=m&&v.y>=f&&v.y<=_&&v!==n&&v!==s&&of(a,h,l,u,c,d,v.x,v.y)&&af(v.prev,v,v.next)>=0)return !1;v=v.nextZ;}return !0}function Kp(e,t,i){var r=e;do{var n=r.prev,o=r.next.next;!lf(n,o)&&cf(n,r,r.next,o)&&df(n,o)&&df(o,n)&&(t.push(n.i/i|0),t.push(r.i/i|0),t.push(o.i/i|0),mf(r),mf(r.next),r=e=o),r=r.next;}while(r!==e);return Wp(r)}function Jp(e,t,i,r,n,o){var s=e;do{for(var a=s.next.next;a!==s.prev;){if(s.i!==a.i&&sf(s,a)){var l=pf(s,a);return s=Wp(s,s.next),l=Wp(l,l.next),Hp(s,t,i,r,n,o,0),void Hp(l,t,i,r,n,o,0)}a=a.next;}s=s.next;}while(s!==e)}function Qp(e,t){return e.x-t.x}function ef(e,t){var i=function(e,t){var i,r=t,n=e.x,o=e.y,s=-1/0;do{if(o<=r.y&&o>=r.next.y&&r.next.y!==r.y){var a=r.x+(o-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(a<=n&&a>s&&(s=a,i=r.x<r.next.x?r:r.next,a===n))return i}r=r.next;}while(r!==t);if(!i)return null;var l,c=i,h=i.x,u=i.y,d=1/0;r=i;do{n>=r.x&&r.x>=h&&n!==r.x&&of(o<u?n:s,o,h,u,o<u?s:n,o,r.x,r.y)&&(l=Math.abs(o-r.y)/(n-r.x),df(r,e)&&(l<d||l===d&&(r.x>i.x||r.x===i.x&&tf(i,r)))&&(i=r,d=l)),r=r.next;}while(r!==c);return i}(e,t);if(!i)return t;var r=pf(i,e);return Wp(r,r.next),Wp(i,i.next)}function tf(e,t){return af(e.prev,e,t.prev)<0&&af(t.next,e,e.next)<0}function rf(e,t,i,r,n){return (e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-i)*n|0)|e<<8))|e<<4))|e<<2))|e<<1))|(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-r)*n|0)|t<<8))|t<<4))|t<<2))|t<<1))<<1}function nf(e){var t=e,i=e;do{(t.x<i.x||t.x===i.x&&t.y<i.y)&&(i=t),t=t.next;}while(t!==e);return i}function of(e,t,i,r,n,o,s,a){return (n-s)*(t-a)>=(e-s)*(o-a)&&(e-s)*(r-a)>=(i-s)*(t-a)&&(i-s)*(o-a)>=(n-s)*(r-a)}function sf(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!function(e,t){var i=e;do{if(i.i!==e.i&&i.next.i!==e.i&&i.i!==t.i&&i.next.i!==t.i&&cf(i,i.next,e,t))return !0;i=i.next;}while(i!==e);return !1}(e,t)&&(df(e,t)&&df(t,e)&&function(e,t){var i=e,r=!1,n=(e.x+t.x)/2,o=(e.y+t.y)/2;do{i.y>o!=i.next.y>o&&i.next.y!==i.y&&n<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(r=!r),i=i.next;}while(i!==e);return r}(e,t)&&(af(e.prev,e,t.prev)||af(e,t.prev,t))||lf(e,t)&&af(e.prev,e,e.next)>0&&af(t.prev,t,t.next)>0)}function af(e,t,i){return (t.y-e.y)*(i.x-t.x)-(t.x-e.x)*(i.y-t.y)}function lf(e,t){return e.x===t.x&&e.y===t.y}function cf(e,t,i,r){var n=uf(af(e,t,i)),o=uf(af(e,t,r)),s=uf(af(i,r,e)),a=uf(af(i,r,t));return n!==o&&s!==a||!(0!==n||!hf(e,i,t))||!(0!==o||!hf(e,r,t))||!(0!==s||!hf(i,e,r))||!(0!==a||!hf(i,t,r))}function hf(e,t,i){return t.x<=Math.max(e.x,i.x)&&t.x>=Math.min(e.x,i.x)&&t.y<=Math.max(e.y,i.y)&&t.y>=Math.min(e.y,i.y)}function uf(e){return e>0?1:e<0?-1:0}function df(e,t){return af(e.prev,e,e.next)<0?af(e,t,e.next)>=0&&af(e,e.prev,t)>=0:af(e,t,e.prev)<0||af(e,e.next,t)<0}function pf(e,t){var i=new _f(e.i,e.x,e.y),r=new _f(t.i,t.x,t.y),n=e.next,o=t.prev;return e.next=t,t.prev=e,i.next=n,n.prev=i,r.next=i,i.prev=r,o.next=r,r.prev=o,r}function ff(e,t,i,r){var n=new _f(e,t,i);return r?(n.next=r.next,n.prev=r,r.next.prev=n,r.next=n):(n.prev=n,n.next=n),n}function mf(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ);}function _f(e,t,i){this.i=e,this.x=t,this.y=i,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1;}function gf(e,t,i,r){for(var n=0,o=t,s=i-r;o<i;o+=r)n+=(e[s]-e[o])*(e[o+1]+e[s+1]),s=o;return n}qp.exports=$p,qp.exports.default=$p,$p.deviation=function(e,t,i,r){var n=t&&t.length,o=Math.abs(gf(e,0,n?t[0]*i:e.length,i));if(n)for(var s=0,a=t.length;s<a;s++)o-=Math.abs(gf(e,t[s]*i,s<a-1?t[s+1]*i:e.length,i));var l=0;for(s=0;s<r.length;s+=3){var c=r[s]*i,h=r[s+1]*i,u=r[s+2]*i;l+=Math.abs((e[c]-e[u])*(e[h+1]-e[c+1])-(e[c]-e[h])*(e[u+1]-e[c+1]));}return 0===o&&0===l?0:Math.abs((l-o)/o)},$p.flatten=function(e){for(var t=e[0][0].length,i={vertices:[],holes:[],dimensions:t},r=0,n=0;n<e.length;n++){for(var o=0;o<e[n].length;o++)for(var s=0;s<t;s++)i.vertices.push(e[n][o][s]);n>0&&i.holes.push(r+=e[n-1].length);}return i};var yf=d(qp.exports);function xf(e,t){const i=e.length;if(i<=1)return [e];const r=[];let n,o;for(let t=0;t<i;t++){const i=Y(e[t]);0!==i&&(e[t].area=Math.abs(i),void 0===o&&(o=i<0),o===i<0?(n&&r.push(n),n=[e[t]]):n.push(e[t]));}if(n&&r.push(n),t>1)for(let e=0;e<r.length;e++)r[e].length<=t||(ki(r[e],t,1,r[e].length-1,vf),r[e]=r[e].slice(0,t));return r}function vf(e,t){return t.area-e.area}function bf(e,t,i){const r=i.patternDependencies;let n=!1;for(const i of t){const t=i.paint.get(`${e}-pattern`);t.isConstant()||(n=!0);const o=t.constantOr(null);o&&(n=!0,r[o]=!0);}return n}function wf(e,t,i,r,n){const o=n.patternDependencies;for(const s of t){const t=s.paint.get(`${e}-pattern`).value;if("constant"!==t.kind){let e=t.evaluate({zoom:r},i,{},n.availableImages);e=e&&e.name?e.name:e,o[e]=!0,i.patterns[s.id]=e;}}return i}class Tf{constructor(e){this.zoom=e.zoom,this.overscaling=e.overscaling,this.layers=e.layers,this.layerIds=this.layers.map((e=>e.id)),this.index=e.index,this.hasPattern=!1,this.patternFeatures=[],this.layoutVertexArray=new ya,this.indexArray=new ka,this.indexArray2=new Ca,this.programConfigurations=new Ol(e.layers,e.zoom),this.segments=new Wl,this.segments2=new Wl,this.stateDependentLayerIds=this.layers.filter((e=>e.isStateDependent())).map((e=>e.id)),this.projection=e.projection;}populate(e,t,i,r){this.hasPattern=bf("fill",this.layers,t);const n=this.layers[0].layout.get("fill-sort-key"),o=[];for(const{feature:s,id:a,index:l,sourceLayerIndex:c}of e){const e=this.layers[0]._featureFilter.needGeometry,h=ip(s,e);if(!this.layers[0]._featureFilter.filter(new Qs(this.zoom),h,i))continue;const u=n?n.evaluate(h,{},i,t.availableImages):void 0,d={id:a,properties:s.properties,type:s.type,sourceLayerIndex:c,index:l,geometry:e?h.geometry:tp(s,i,r),patterns:{},sortKey:u};o.push(d);}n&&o.sort(((e,t)=>e.sortKey-t.sortKey));for(const r of o){const{geometry:n,index:o,sourceLayerIndex:s}=r;if(this.hasPattern){const e=wf("fill",this.layers,r,this.zoom,t);this.patternFeatures.push(e);}else this.addFeature(r,n,o,i,{},t.availableImages,t.brightness);t.featureIndex.insert(e[o].feature,n,o,s,this.index);}}update(e,t,i,r,n){const o=0!==Object.keys(e).length;o&&!this.stateDependentLayers.length||this.programConfigurations.updatePaintArrays(e,t,o?this.stateDependentLayers:this.layers,i,r,n);}addFeatures(e,t,i,r,n,o){for(const e of this.patternFeatures)this.addFeature(e,e.geometry,e.index,t,i,r,o);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(e){this.uploaded||(this.layoutVertexBuffer=e.createVertexBuffer(this.layoutVertexArray,Gp),this.indexBuffer=e.createIndexBuffer(this.indexArray),this.indexBuffer2=e.createIndexBuffer(this.indexArray2)),this.programConfigurations.upload(e),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.indexBuffer2.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.segments2.destroy());}addFeature(e,t,i,r,n,o=[],s){for(const e of xf(t,500)){let t=0;for(const i of e)t+=i.length;const i=this.segments.prepareSegment(t,this.layoutVertexArray,this.indexArray),r=i.vertexLength,n=[],o=[];for(const t of e){if(0===t.length)continue;t!==e[0]&&o.push(n.length/2);const i=this.segments2.prepareSegment(t.length,this.layoutVertexArray,this.indexArray2),r=i.vertexLength;this.layoutVertexArray.emplaceBack(t[0].x,t[0].y),this.indexArray2.emplaceBack(r+t.length-1,r),n.push(t[0].x),n.push(t[0].y);for(let e=1;e<t.length;e++)this.layoutVertexArray.emplaceBack(t[e].x,t[e].y),this.indexArray2.emplaceBack(r+e-1,r+e),n.push(t[e].x),n.push(t[e].y);i.vertexLength+=t.length,i.primitiveLength+=t.length;}const s=yf(n,o);for(let e=0;e<s.length;e+=3)this.indexArray.emplaceBack(r+s[e],r+s[e+1],r+s[e+2]);i.vertexLength+=t,i.primitiveLength+=s.length/3;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,e,i,n,o,r,s);}}Ss(Tf,"FillBucket",{omit:["layers","patternFeatures"]});const Ef=new ua({"fill-sort-key":new ca(zt.layout_fill["fill-sort-key"]),visibility:new la(zt.layout_fill.visibility)});var Mf={paint:new ua({"fill-antialias":new la(zt.paint_fill["fill-antialias"]),"fill-opacity":new ca(zt.paint_fill["fill-opacity"]),"fill-color":new ca(zt.paint_fill["fill-color"]),"fill-outline-color":new ca(zt.paint_fill["fill-outline-color"]),"fill-translate":new la(zt.paint_fill["fill-translate"]),"fill-translate-anchor":new la(zt.paint_fill["fill-translate-anchor"]),"fill-pattern":new ca(zt.paint_fill["fill-pattern"]),"fill-emissive-strength":new la(zt.paint_fill["fill-emissive-strength"])}),layout:Ef};const Af=_a([{name:"a_pos_normal_ed",components:4,type:"Int16"}]),Sf=_a([{name:"a_pos_end",components:4,type:"Int16"}]),If=_a([{name:"a_centroid_pos",components:2,type:"Uint16"}]),Cf=_a([{name:"a_hidden_by_landmark",components:1,type:"Uint8"}]),zf=_a([{name:"a_pos_3",components:3,type:"Int16"},{name:"a_pos_normal_3",components:3,type:"Int16"}]),{members:Pf}=Af;var Df={},Rf=_,Lf=kf;function kf(e,t,i,r,n){this.properties={},this.extent=i,this.type=0,this._pbf=e,this._geometry=-1,this._keys=r,this._values=n,e.readFields(Bf,this,t);}function Bf(e,t,i){1==e?t.id=i.readVarint():2==e?function(e,t){for(var i=e.readVarint()+e.pos;e.pos<i;){var r=t._keys[e.readVarint()],n=t._values[e.readVarint()];t.properties[r]=n;}}(i,t):3==e?t.type=i.readVarint():4==e&&(t._geometry=i.pos);}function Of(e){for(var t,i,r=0,n=0,o=e.length,s=o-1;n<o;s=n++)r+=((i=e[s]).x-(t=e[n]).x)*(t.y+i.y);return r}kf.types=["Unknown","Point","LineString","Polygon"],kf.prototype.loadGeometry=function(){var e=this._pbf;e.pos=this._geometry;for(var t,i=e.readVarint()+e.pos,r=1,n=0,o=0,s=0,a=[];e.pos<i;){if(n<=0){var l=e.readVarint();r=7&l,n=l>>3;}if(n--,1===r||2===r)o+=e.readSVarint(),s+=e.readSVarint(),1===r&&(t&&a.push(t),t=[]),t.push(new Rf(o,s));else {if(7!==r)throw new Error("unknown command "+r);t&&t.push(t[0].clone());}}return t&&a.push(t),a},kf.prototype.bbox=function(){var e=this._pbf;e.pos=this._geometry;for(var t=e.readVarint()+e.pos,i=1,r=0,n=0,o=0,s=1/0,a=-1/0,l=1/0,c=-1/0;e.pos<t;){if(r<=0){var h=e.readVarint();i=7&h,r=h>>3;}if(r--,1===i||2===i)(n+=e.readSVarint())<s&&(s=n),n>a&&(a=n),(o+=e.readSVarint())<l&&(l=o),o>c&&(c=o);else if(7!==i)throw new Error("unknown command "+i)}return [s,l,a,c]},kf.prototype.toGeoJSON=function(e,t,i){var r,n,o=this.extent*Math.pow(2,i),s=this.extent*e,a=this.extent*t,l=this.loadGeometry(),c=kf.types[this.type];function h(e){for(var t=0;t<e.length;t++){var i=e[t];e[t]=[360*(i.x+s)/o-180,360/Math.PI*Math.atan(Math.exp((180-360*(i.y+a)/o)*Math.PI/180))-90];}}switch(this.type){case 1:var u=[];for(r=0;r<l.length;r++)u[r]=l[r][0];h(l=u);break;case 2:for(r=0;r<l.length;r++)h(l[r]);break;case 3:for(l=function(e){var t=e.length;if(t<=1)return [e];for(var i,r,n=[],o=0;o<t;o++){var s=Of(e[o]);0!==s&&(void 0===r&&(r=s<0),r===s<0?(i&&n.push(i),i=[e[o]]):i.push(e[o]));}return i&&n.push(i),n}(l),r=0;r<l.length;r++)for(n=0;n<l[r].length;n++)h(l[r][n]);}1===l.length?l=l[0]:c="Multi"+c;var d={type:"Feature",geometry:{type:c,coordinates:l},properties:this.properties};return "id"in this&&(d.id=this.id),d};var Ff=Lf,Nf=Uf;function Uf(e,t){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=e,this._keys=[],this._values=[],this._features=[],e.readFields(jf,this,t),this.length=this._features.length;}function jf(e,t,i){15===e?t.version=i.readVarint():1===e?t.name=i.readString():5===e?t.extent=i.readVarint():2===e?t._features.push(i.pos):3===e?t._keys.push(i.readString()):4===e&&t._values.push(function(e){for(var t=null,i=e.readVarint()+e.pos;e.pos<i;){var r=e.readVarint()>>3;t=1===r?e.readString():2===r?e.readFloat():3===r?e.readDouble():4===r?e.readVarint64():5===r?e.readVarint():6===r?e.readSVarint():7===r?e.readBoolean():null;}return t}(i));}Uf.prototype.feature=function(e){if(e<0||e>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[e];var t=this._pbf.readVarint()+this._pbf.pos;return new Ff(this._pbf,t,this.extent,this._keys,this._values)};var Vf=Nf;function Gf(e,t,i){if(3===e){var r=new Vf(i,i.readVarint()+i.pos);r.length&&(t[r.name]=r);}}var qf=Df.VectorTile=function(e,t){this.layers=e.readFields(Gf,{},t);},$f=Df.VectorTileFeature=Lf;function Zf(e,t,i,r){const n=[],o=0===r?(e,t,i,r,n,o)=>{e.push(new y(o,i+(o-t)/(r-t)*(n-i)));}:(e,t,i,r,n,o)=>{e.push(new y(t+(o-i)/(n-i)*(r-t),o));};for(const s of e){const e=[];for(const n of s){if(n.length<=2)continue;const s=[];for(let e=0;e<n.length-1;e++){const a=n[e].x,l=n[e].y,c=n[e+1].x,h=n[e+1].y,u=0===r?a:l,d=0===r?c:h;u<t?d>t&&o(s,a,l,c,h,t):u>i?d<i&&o(s,a,l,c,h,i):s.push(n[e]),d<t&&u>=t&&o(s,a,l,c,h,t),d>i&&u<=i&&o(s,a,l,c,h,i);}let a=n[n.length-1];const l=0===r?a.x:a.y;l>=t&&l<=i&&s.push(a),s.length&&(a=s[s.length-1],s[0].x===a.x&&s[0].y===a.y||s.push(s[0]),e.push(s));}e.length&&n.push(e);}return n}Df.VectorTileLayer=Nf;class Wf{constructor(e){this._stringToNumber={},this._numberToString=[];for(let t=0;t<e.length;t++){const i=e[t];this._stringToNumber[i]=t,this._numberToString[t]=i;}}encode(e){return this._stringToNumber[e]}decode(e){return this._numberToString[e]}}var Hf={
		/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

		define(["./shared"],(function(e){function t(e){if("number"==typeof e||"boolean"==typeof e||"string"==typeof e||null==e)return JSON.stringify(e);if(Array.isArray(e)){let r="[";for(const i of e)r+=`${t(i)},`;return `${r}]`}let r="{";for(const i of Object.keys(e).sort())r+=`${i}:${t(e[i])},`;return `${r}}`}function r(r){let i="";for(const o of e.refProperties)i+=`/${t(r[o])}`;return i}class i{constructor(e){this.keyCache={},e&&this.replace(e);}replace(e,t){this._layerConfigs={},this._layers={},this.update(e,[],t);}update(t,i,o){this._options=o;for(const r of t)this._layerConfigs[r.id]=r,(this._layers[r.id]=e.createStyleLayer(r,this._options)).compileFilter(),this.keyCache[r.id]&&delete this.keyCache[r.id];for(const e of i)delete this.keyCache[e],delete this._layerConfigs[e],delete this._layers[e];this.familiesBySource={};const s=function(e,t){const i={};for(let o=0;o<e.length;o++){const s=t&&t[e[o].id]||r(e[o]);t&&(t[e[o].id]=s);let n=i[s];n||(n=i[s]=[]),n.push(e[o]);}const o=[];for(const e in i)o.push(i[e]);return o}(e.values(this._layerConfigs),this.keyCache);for(const e of s){const t=e.map((e=>this._layers[e.id])),r=t[0];if("none"===r.visibility)continue;const i=r.source||"";let o=this.familiesBySource[i];o||(o=this.familiesBySource[i]={});const s=r.sourceLayer||"_geojsonTileLayer";let n=o[s];n||(n=o[s]=[]),n.push(t);}}}class o{loadTile(t,r){const{uid:i,encoding:o,rawImageData:s,padding:n,buildQuadTree:a}=t,l=e.window.ImageBitmap&&s instanceof e.window.ImageBitmap?this.getImageData(s,n):s;r(null,new e.DEMData(i,l,o,n<1,a));}getImageData(e,t){this.offscreenCanvas&&this.offscreenCanvasContext||(this.offscreenCanvas=new OffscreenCanvas(e.width,e.height),this.offscreenCanvasContext=this.offscreenCanvas.getContext("2d",{willReadFrequently:!0})),this.offscreenCanvas.width=e.width,this.offscreenCanvas.height=e.height,this.offscreenCanvasContext.drawImage(e,0,0,e.width,e.height);const r=this.offscreenCanvasContext.getImageData(-t,-t,e.width+2*t,e.height+2*t);return this.offscreenCanvasContext.clearRect(0,0,this.offscreenCanvas.width,this.offscreenCanvas.height),r}}function s(e,t){if(0!==e.length){n(e[0],t);for(var r=1;r<e.length;r++)n(e[r],!t);}}function n(e,t){for(var r=0,i=0,o=0,s=e.length,n=s-1;o<s;n=o++){var a=(e[o][0]-e[n][0])*(e[n][1]+e[o][1]),l=r+a;i+=Math.abs(r)>=Math.abs(a)?r-l+a:a-l+r,r=l;}r+i>=0!=!!t&&e.reverse();}var a=e.getDefaultExportFromCjs((function e(t,r){var i,o=t&&t.type;if("FeatureCollection"===o)for(i=0;i<t.features.length;i++)e(t.features[i],r);else if("GeometryCollection"===o)for(i=0;i<t.geometries.length;i++)e(t.geometries[i],r);else if("Feature"===o)e(t.geometry,r);else if("Polygon"===o)s(t.coordinates,r);else if("MultiPolygon"===o)for(i=0;i<t.coordinates.length;i++)s(t.coordinates[i],r);return t}));const l=e.VectorTileFeature.prototype.toGeoJSON;var u={exports:{}},h=e.pointGeometry,c=e.vectorTile.VectorTileFeature,d=f;function f(e,t){this.options=t||{},this.features=e,this.length=e.length;}function p(e,t){this.id="number"==typeof e.id?e.id:void 0,this.type=e.type,this.rawGeometry=1===e.type?[e.geometry]:e.geometry,this.properties=e.tags,this.extent=t||4096;}f.prototype.feature=function(e){return new p(this.features[e],this.options.extent)},p.prototype.loadGeometry=function(){var e=this.rawGeometry;this.geometry=[];for(var t=0;t<e.length;t++){for(var r=e[t],i=[],o=0;o<r.length;o++)i.push(new h(r[o][0],r[o][1]));this.geometry.push(i);}return this.geometry},p.prototype.bbox=function(){this.geometry||this.loadGeometry();for(var e=this.geometry,t=1/0,r=-1/0,i=1/0,o=-1/0,s=0;s<e.length;s++)for(var n=e[s],a=0;a<n.length;a++){var l=n[a];t=Math.min(t,l.x),r=Math.max(r,l.x),i=Math.min(i,l.y),o=Math.max(o,l.y);}return [t,i,r,o]},p.prototype.toGeoJSON=c.prototype.toGeoJSON;var g=e.pbf,m=d;function y(e){var t=new g;return function(e,t){for(var r in e.layers)t.writeMessage(3,v,e.layers[r]);}(e,t),t.finish()}function v(e,t){var r;t.writeVarintField(15,e.version||1),t.writeStringField(1,e.name||""),t.writeVarintField(5,e.extent||4096);var i={keys:[],values:[],keycache:{},valuecache:{}};for(r=0;r<e.length;r++)i.feature=e.feature(r),t.writeMessage(2,x,i);var o=i.keys;for(r=0;r<o.length;r++)t.writeStringField(3,o[r]);var s=i.values;for(r=0;r<s.length;r++)t.writeMessage(4,I,s[r]);}function x(e,t){var r=e.feature;void 0!==r.id&&t.writeVarintField(1,r.id),t.writeMessage(2,w,e),t.writeVarintField(3,r.type),t.writeMessage(4,b,r);}function w(e,t){var r=e.feature,i=e.keys,o=e.values,s=e.keycache,n=e.valuecache;for(var a in r.properties){var l=r.properties[a],u=s[a];if(null!==l){void 0===u&&(i.push(a),s[a]=u=i.length-1),t.writeVarint(u);var h=typeof l;"string"!==h&&"boolean"!==h&&"number"!==h&&(l=JSON.stringify(l));var c=h+":"+l,d=n[c];void 0===d&&(o.push(l),n[c]=d=o.length-1),t.writeVarint(d);}}}function S(e,t){return (t<<3)+(7&e)}function M(e){return e<<1^e>>31}function b(e,t){for(var r=e.loadGeometry(),i=e.type,o=0,s=0,n=r.length,a=0;a<n;a++){var l=r[a],u=1;1===i&&(u=l.length),t.writeVarint(S(1,u));for(var h=3===i?l.length-1:l.length,c=0;c<h;c++){1===c&&1!==i&&t.writeVarint(S(2,h-1));var d=l[c].x-o,f=l[c].y-s;t.writeVarint(M(d)),t.writeVarint(M(f)),o+=d,s+=f;}3===i&&t.writeVarint(S(7,1));}}function I(e,t){var r=typeof e;"string"===r?t.writeStringField(1,e):"boolean"===r?t.writeBooleanField(7,e):"number"===r&&(e%1!=0?t.writeDoubleField(3,e):e<0?t.writeSVarintField(6,e):t.writeVarintField(5,e));}u.exports=y,u.exports.fromVectorTileJs=y,u.exports.fromGeojsonVt=function(e,t){t=t||{};var r={};for(var i in e)r[i]=new m(e[i].features,t),r[i].name=i,r[i].version=t.version,r[i].extent=t.extent;return y({layers:r})},u.exports.GeoJSONWrapper=m;var T=e.getDefaultExportFromCjs(u.exports);const P={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:e=>e},k=Math.fround||(_=new Float32Array(1),e=>(_[0]=+e,_[0]));var _;const L=3,C=5,O=6;class j{constructor(e){this.options=Object.assign(Object.create(P),e),this.trees=new Array(this.options.maxZoom+1),this.stride=this.options.reduce?7:6,this.clusterProps=[];}load(e){const{log:t,minZoom:r,maxZoom:i}=this.options;t&&console.time("total time");const o=`prepare ${e.length} points`;t&&console.time(o),this.points=e;const s=[];for(let t=0;t<e.length;t++){const r=e[t];if(!r.geometry)continue;const[i,o]=r.geometry.coordinates,n=k(F(i)),a=k(Z(o));s.push(n,a,1/0,t,-1,1),this.options.reduce&&s.push(0);}let n=this.trees[i+1]=this._createTree(s);t&&console.timeEnd(o);for(let e=i;e>=r;e--){const r=+Date.now();n=this.trees[e]=this._createTree(this._cluster(n,e)),t&&console.log("z%d: %d clusters in %dms",e,n.numItems,+Date.now()-r);}return t&&console.timeEnd("total time"),this}getClusters(e,t){let r=((e[0]+180)%360+360)%360-180;const i=Math.max(-90,Math.min(90,e[1]));let o=180===e[2]?180:((e[2]+180)%360+360)%360-180;const s=Math.max(-90,Math.min(90,e[3]));if(e[2]-e[0]>=360)r=-180,o=180;else if(r>o){const e=this.getClusters([r,i,180,s],t),n=this.getClusters([-180,i,o,s],t);return e.concat(n)}const n=this.trees[this._limitZoom(t)],a=n.range(F(r),Z(s),F(o),Z(i)),l=n.data,u=[];for(const e of a){const t=this.stride*e;u.push(l[t+C]>1?E(l,t,this.clusterProps):this.points[l[t+L]]);}return u}getChildren(e){const t=this._getOriginId(e),r=this._getOriginZoom(e),i="No cluster with the specified id.",o=this.trees[r];if(!o)throw new Error(i);const s=o.data;if(t*this.stride>=s.length)throw new Error(i);const n=this.options.radius/(this.options.extent*Math.pow(2,r-1)),a=o.within(s[t*this.stride],s[t*this.stride+1],n),l=[];for(const t of a){const r=t*this.stride;s[r+4]===e&&l.push(s[r+C]>1?E(s,r,this.clusterProps):this.points[s[r+L]]);}if(0===l.length)throw new Error(i);return l}getLeaves(e,t,r){const i=[];return this._appendLeaves(i,e,t=t||10,r=r||0,0),i}getTile(e,t,r){const i=this.trees[this._limitZoom(e)],o=Math.pow(2,e),{extent:s,radius:n}=this.options,a=n/s,l=(r-a)/o,u=(r+1+a)/o,h={features:[]};return this._addTileFeatures(i.range((t-a)/o,l,(t+1+a)/o,u),i.data,t,r,o,h),0===t&&this._addTileFeatures(i.range(1-a/o,l,1,u),i.data,o,r,o,h),t===o-1&&this._addTileFeatures(i.range(0,l,a/o,u),i.data,-1,r,o,h),h.features.length?h:null}getClusterExpansionZoom(e){let t=this._getOriginZoom(e)-1;for(;t<=this.options.maxZoom;){const r=this.getChildren(e);if(t++,1!==r.length)break;e=r[0].properties.cluster_id;}return t}_appendLeaves(e,t,r,i,o){const s=this.getChildren(t);for(const t of s){const s=t.properties;if(s&&s.cluster?o+s.point_count<=i?o+=s.point_count:o=this._appendLeaves(e,s.cluster_id,r,i,o):o<i?o++:e.push(t),e.length===r)break}return o}_createTree(t){const r=new e.KDBush(t.length/this.stride|0,this.options.nodeSize,Float32Array);for(let e=0;e<t.length;e+=this.stride)r.add(t[e],t[e+1]);return r.finish(),r.data=t,r}_addTileFeatures(e,t,r,i,o,s){for(const n of e){const e=n*this.stride,a=t[e+C]>1;let l,u,h;if(a)l=D(t,e,this.clusterProps),u=t[e],h=t[e+1];else {const r=this.points[t[e+L]];l=r.properties;const[i,o]=r.geometry.coordinates;u=F(i),h=Z(o);}const c={type:1,geometry:[[Math.round(this.options.extent*(u*o-r)),Math.round(this.options.extent*(h*o-i))]],tags:l};let d;d=a||this.options.generateId?t[e+L]:this.points[t[e+L]].id,void 0!==d&&(c.id=d),s.features.push(c);}}_limitZoom(e){return Math.max(this.options.minZoom,Math.min(Math.floor(+e),this.options.maxZoom+1))}_cluster(e,t){const{radius:r,extent:i,reduce:o,minPoints:s}=this.options,n=r/(i*Math.pow(2,t)),a=e.data,l=[],u=this.stride;for(let r=0;r<a.length;r+=u){if(a[r+2]<=t)continue;a[r+2]=t;const i=a[r],h=a[r+1],c=e.within(a[r],a[r+1],n),d=a[r+C];let f=d;for(const e of c){const r=e*u;a[r+2]>t&&(f+=a[r+C]);}if(f>d&&f>=s){let e,s=i*d,n=h*d,p=-1;const g=((r/u|0)<<5)+(t+1)+this.points.length;for(const i of c){const l=i*u;if(a[l+2]<=t)continue;a[l+2]=t;const h=a[l+C];s+=a[l]*h,n+=a[l+1]*h,a[l+4]=g,o&&(e||(e=this._map(a,r,!0),p=this.clusterProps.length,this.clusterProps.push(e)),o(e,this._map(a,l)));}a[r+4]=g,l.push(s/f,n/f,1/0,g,-1,f),o&&l.push(p);}else {for(let e=0;e<u;e++)l.push(a[r+e]);if(f>1)for(const e of c){const r=e*u;if(!(a[r+2]<=t)){a[r+2]=t;for(let e=0;e<u;e++)l.push(a[r+e]);}}}}return l}_getOriginId(e){return e-this.points.length>>5}_getOriginZoom(e){return (e-this.points.length)%32}_map(e,t,r){if(e[t+C]>1){const i=this.clusterProps[e[t+O]];return r?Object.assign({},i):i}const i=this.points[e[t+L]].properties,o=this.options.map(i);return r&&o===i?Object.assign({},o):o}}function E(e,t,r){return {type:"Feature",id:e[t+L],properties:D(e,t,r),geometry:{type:"Point",coordinates:[(i=e[t],360*(i-.5)),z(e[t+1])]}};var i;}function D(e,t,r){const i=e[t+C],o=i>=1e4?`${Math.round(i/1e3)}k`:i>=1e3?Math.round(i/100)/10+"k":i,s=e[t+O],n=-1===s?{}:Object.assign({},r[s]);return Object.assign(n,{cluster:!0,cluster_id:e[t+L],point_count:i,point_count_abbreviated:o})}function F(e){return e/360+.5}function Z(e){const t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function z(e){const t=(180-360*e)*Math.PI/180;return 360*Math.atan(Math.exp(t))/Math.PI-90}var N={exports:{}};N.exports=function(){function e(r,i,o,s){for(var n,a=s,l=o-i>>1,u=o-i,h=r[i],c=r[i+1],d=r[o],f=r[o+1],p=i+3;p<o;p+=3){var g=t(r[p],r[p+1],h,c,d,f);if(g>a)n=p,a=g;else if(g===a){var m=Math.abs(p-l);m<u&&(n=p,u=m);}}a>s&&(n-i>3&&e(r,i,n,s),r[n+2]=a,o-n>3&&e(r,n,o,s));}function t(e,t,r,i,o,s){var n=o-r,a=s-i;if(0!==n||0!==a){var l=((e-r)*n+(t-i)*a)/(n*n+a*a);l>1?(r=o,i=s):l>0&&(r+=n*l,i+=a*l);}return (n=e-r)*n+(a=t-i)*a}function r(e,t,r,o){var s={id:void 0===e?null:e,type:t,geometry:r,tags:o,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return function(e){var t=e.geometry,r=e.type;if("Point"===r||"MultiPoint"===r||"LineString"===r)i(e,t);else if("Polygon"===r||"MultiLineString"===r)for(var o=0;o<t.length;o++)i(e,t[o]);else if("MultiPolygon"===r)for(o=0;o<t.length;o++)for(var s=0;s<t[o].length;s++)i(e,t[o][s]);}(s),s}function i(e,t){for(var r=0;r<t.length;r+=3)e.minX=Math.min(e.minX,t[r]),e.minY=Math.min(e.minY,t[r+1]),e.maxX=Math.max(e.maxX,t[r]),e.maxY=Math.max(e.maxY,t[r+1]);}function o(e,t,i,l){if(t.geometry){var u=t.geometry.coordinates,h=t.geometry.type,c=Math.pow(i.tolerance/((1<<i.maxZoom)*i.extent),2),d=[],f=t.id;if(i.promoteId?f=t.properties[i.promoteId]:i.generateId&&(f=l||0),"Point"===h)s(u,d);else if("MultiPoint"===h)for(var p=0;p<u.length;p++)s(u[p],d);else if("LineString"===h)n(u,d,c,!1);else if("MultiLineString"===h){if(i.lineMetrics){for(p=0;p<u.length;p++)n(u[p],d=[],c,!1),e.push(r(f,"LineString",d,t.properties));return}a(u,d,c,!1);}else if("Polygon"===h)a(u,d,c,!0);else {if("MultiPolygon"!==h){if("GeometryCollection"===h){for(p=0;p<t.geometry.geometries.length;p++)o(e,{id:f,geometry:t.geometry.geometries[p],properties:t.properties},i,l);return}throw new Error("Input data is not a valid GeoJSON object.")}for(p=0;p<u.length;p++){var g=[];a(u[p],g,c,!0),d.push(g);}}e.push(r(f,h,d,t.properties));}}function s(e,t){t.push(l(e[0])),t.push(u(e[1])),t.push(0);}function n(t,r,i,o){for(var s,n,a=0,h=0;h<t.length;h++){var c=l(t[h][0]),d=u(t[h][1]);r.push(c),r.push(d),r.push(0),h>0&&(a+=o?(s*d-c*n)/2:Math.sqrt(Math.pow(c-s,2)+Math.pow(d-n,2))),s=c,n=d;}var f=r.length-3;r[2]=1,e(r,0,f,i),r[f+2]=1,r.size=Math.abs(a),r.start=0,r.end=r.size;}function a(e,t,r,i){for(var o=0;o<e.length;o++){var s=[];n(e[o],s,r,i),t.push(s);}}function l(e){return e/360+.5}function u(e){var t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function h(e,t,i,o,s,n,a,l){if(o/=t,n>=(i/=t)&&a<o)return e;if(a<i||n>=o)return null;for(var u=[],h=0;h<e.length;h++){var f=e[h],g=f.geometry,m=f.type,y=0===s?f.minX:f.minY,v=0===s?f.maxX:f.maxY;if(y>=i&&v<o)u.push(f);else if(!(v<i||y>=o)){var x=[];if("Point"===m||"MultiPoint"===m)c(g,x,i,o,s);else if("LineString"===m)d(g,x,i,o,s,!1,l.lineMetrics);else if("MultiLineString"===m)p(g,x,i,o,s,!1);else if("Polygon"===m)p(g,x,i,o,s,!0);else if("MultiPolygon"===m)for(var w=0;w<g.length;w++){var S=[];p(g[w],S,i,o,s,!0),S.length&&x.push(S);}if(x.length){if(l.lineMetrics&&"LineString"===m){for(w=0;w<x.length;w++)u.push(r(f.id,m,x[w],f.tags));continue}"LineString"!==m&&"MultiLineString"!==m||(1===x.length?(m="LineString",x=x[0]):m="MultiLineString"),"Point"!==m&&"MultiPoint"!==m||(m=3===x.length?"Point":"MultiPoint"),u.push(r(f.id,m,x,f.tags));}}}return u.length?u:null}function c(e,t,r,i,o){for(var s=0;s<e.length;s+=3){var n=e[s+o];n>=r&&n<=i&&(t.push(e[s]),t.push(e[s+1]),t.push(e[s+2]));}}function d(e,t,r,i,o,s,n){for(var a,l,u=f(e),h=0===o?m:y,c=e.start,d=0;d<e.length-3;d+=3){var p=e[d],v=e[d+1],x=e[d+2],w=e[d+3],S=e[d+4],M=0===o?p:v,b=0===o?w:S,I=!1;n&&(a=Math.sqrt(Math.pow(p-w,2)+Math.pow(v-S,2))),M<r?b>r&&(l=h(u,p,v,w,S,r),n&&(u.start=c+a*l)):M>i?b<i&&(l=h(u,p,v,w,S,i),n&&(u.start=c+a*l)):g(u,p,v,x),b<r&&M>=r&&(l=h(u,p,v,w,S,r),I=!0),b>i&&M<=i&&(l=h(u,p,v,w,S,i),I=!0),!s&&I&&(n&&(u.end=c+a*l),t.push(u),u=f(e)),n&&(c+=a);}var T=e.length-3;p=e[T],v=e[T+1],x=e[T+2],(M=0===o?p:v)>=r&&M<=i&&g(u,p,v,x),T=u.length-3,s&&T>=3&&(u[T]!==u[0]||u[T+1]!==u[1])&&g(u,u[0],u[1],u[2]),u.length&&t.push(u);}function f(e){var t=[];return t.size=e.size,t.start=e.start,t.end=e.end,t}function p(e,t,r,i,o,s){for(var n=0;n<e.length;n++)d(e[n],t,r,i,o,s,!1);}function g(e,t,r,i){e.push(t),e.push(r),e.push(i);}function m(e,t,r,i,o,s){var n=(s-t)/(i-t);return e.push(s),e.push(r+(o-r)*n),e.push(1),n}function y(e,t,r,i,o,s){var n=(s-r)/(o-r);return e.push(t+(i-t)*n),e.push(s),e.push(1),n}function v(e,t){for(var i=[],o=0;o<e.length;o++){var s,n=e[o],a=n.type;if("Point"===a||"MultiPoint"===a||"LineString"===a)s=x(n.geometry,t);else if("MultiLineString"===a||"Polygon"===a){s=[];for(var l=0;l<n.geometry.length;l++)s.push(x(n.geometry[l],t));}else if("MultiPolygon"===a)for(s=[],l=0;l<n.geometry.length;l++){for(var u=[],h=0;h<n.geometry[l].length;h++)u.push(x(n.geometry[l][h],t));s.push(u);}i.push(r(n.id,a,s,n.tags));}return i}function x(e,t){var r=[];r.size=e.size,void 0!==e.start&&(r.start=e.start,r.end=e.end);for(var i=0;i<e.length;i+=3)r.push(e[i]+t,e[i+1],e[i+2]);return r}function w(e,t){if(e.transformed)return e;var r,i,o,s=1<<e.z,n=e.x,a=e.y;for(r=0;r<e.features.length;r++){var l=e.features[r],u=l.geometry,h=l.type;if(l.geometry=[],1===h)for(i=0;i<u.length;i+=2)l.geometry.push(S(u[i],u[i+1],t,s,n,a));else for(i=0;i<u.length;i++){var c=[];for(o=0;o<u[i].length;o+=2)c.push(S(u[i][o],u[i][o+1],t,s,n,a));l.geometry.push(c);}}return e.transformed=!0,e}function S(e,t,r,i,o,s){return [Math.round(r*(e*i-o)),Math.round(r*(t*i-s))]}function M(e,t,r,i,o){for(var s=t===o.maxZoom?0:o.tolerance/((1<<t)*o.extent),n={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:r,y:i,z:t,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0;a<e.length;a++){n.numFeatures++,b(n,e[a],s,o);var l=e[a].minX,u=e[a].minY,h=e[a].maxX,c=e[a].maxY;l<n.minX&&(n.minX=l),u<n.minY&&(n.minY=u),h>n.maxX&&(n.maxX=h),c>n.maxY&&(n.maxY=c);}return n}function b(e,t,r,i){var o=t.geometry,s=t.type,n=[];if("Point"===s||"MultiPoint"===s)for(var a=0;a<o.length;a+=3)n.push(o[a]),n.push(o[a+1]),e.numPoints++,e.numSimplified++;else if("LineString"===s)I(n,o,e,r,!1,!1);else if("MultiLineString"===s||"Polygon"===s)for(a=0;a<o.length;a++)I(n,o[a],e,r,"Polygon"===s,0===a);else if("MultiPolygon"===s)for(var l=0;l<o.length;l++){var u=o[l];for(a=0;a<u.length;a++)I(n,u[a],e,r,!0,0===a);}if(n.length){var h=t.tags||null;if("LineString"===s&&i.lineMetrics){for(var c in h={},t.tags)h[c]=t.tags[c];h.mapbox_clip_start=o.start/o.size,h.mapbox_clip_end=o.end/o.size;}var d={geometry:n,type:"Polygon"===s||"MultiPolygon"===s?3:"LineString"===s||"MultiLineString"===s?2:1,tags:h};null!==t.id&&(d.id=t.id),e.features.push(d);}}function I(e,t,r,i,o,s){var n=i*i;if(i>0&&t.size<(o?n:i))r.numPoints+=t.length/3;else {for(var a=[],l=0;l<t.length;l+=3)(0===i||t[l+2]>n)&&(r.numSimplified++,a.push(t[l]),a.push(t[l+1])),r.numPoints++;o&&function(e,t){for(var r=0,i=0,o=e.length,s=o-2;i<o;s=i,i+=2)r+=(e[i]-e[s])*(e[i+1]+e[s+1]);if(r>0===t)for(i=0,o=e.length;i<o/2;i+=2){var n=e[i],a=e[i+1];e[i]=e[o-2-i],e[i+1]=e[o-1-i],e[o-2-i]=n,e[o-1-i]=a;}}(a,s),e.push(a);}}function T(e,t){var r=(t=this.options=function(e,t){for(var r in t)e[r]=t[r];return e}(Object.create(this.options),t)).debug;if(r&&console.time("preprocess data"),t.maxZoom<0||t.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(t.promoteId&&t.generateId)throw new Error("promoteId and generateId cannot be used together.");var i=function(e,t){var r=[];if("FeatureCollection"===e.type)for(var i=0;i<e.features.length;i++)o(r,e.features[i],t,i);else o(r,"Feature"===e.type?e:{geometry:e},t);return r}(e,t);this.tiles={},this.tileCoords=[],r&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),(i=function(e,t){var r=t.buffer/t.extent,i=e,o=h(e,1,-1-r,r,0,-1,2,t),s=h(e,1,1-r,2+r,0,-1,2,t);return (o||s)&&(i=h(e,1,-r,1+r,0,-1,2,t)||[],o&&(i=v(o,1).concat(i)),s&&(i=i.concat(v(s,-1)))),i}(i,t)).length&&this.splitTile(i,0,0,0),r&&(i.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)));}function P(e,t,r){return 32*((1<<e)*r+t)+e}return T.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},T.prototype.splitTile=function(e,t,r,i,o,s,n){for(var a=[e,t,r,i],l=this.options,u=l.debug;a.length;){i=a.pop(),r=a.pop(),t=a.pop(),e=a.pop();var c=1<<t,d=P(t,r,i),f=this.tiles[d];if(!f&&(u>1&&console.time("creation"),f=this.tiles[d]=M(e,t,r,i,l),this.tileCoords.push({z:t,x:r,y:i}),u)){u>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,r,i,f.numFeatures,f.numPoints,f.numSimplified),console.timeEnd("creation"));var p="z"+t;this.stats[p]=(this.stats[p]||0)+1,this.total++;}if(f.source=e,o){if(t===l.maxZoom||t===o)continue;var g=1<<o-t;if(r!==Math.floor(s/g)||i!==Math.floor(n/g))continue}else if(t===l.indexMaxZoom||f.numPoints<=l.indexMaxPoints)continue;if(f.source=null,0!==e.length){u>1&&console.time("clipping");var m,y,v,x,w,S,b=.5*l.buffer/l.extent,I=.5-b,T=.5+b,k=1+b;m=y=v=x=null,w=h(e,c,r-b,r+T,0,f.minX,f.maxX,l),S=h(e,c,r+I,r+k,0,f.minX,f.maxX,l),e=null,w&&(m=h(w,c,i-b,i+T,1,f.minY,f.maxY,l),y=h(w,c,i+I,i+k,1,f.minY,f.maxY,l),w=null),S&&(v=h(S,c,i-b,i+T,1,f.minY,f.maxY,l),x=h(S,c,i+I,i+k,1,f.minY,f.maxY,l),S=null),u>1&&console.timeEnd("clipping"),a.push(m||[],t+1,2*r,2*i),a.push(y||[],t+1,2*r,2*i+1),a.push(v||[],t+1,2*r+1,2*i),a.push(x||[],t+1,2*r+1,2*i+1);}}},T.prototype.getTile=function(e,t,r){var i=this.options,o=i.extent,s=i.debug;if(e<0||e>24)return null;var n=1<<e,a=P(e,t=(t%n+n)%n,r);if(this.tiles[a])return w(this.tiles[a],o);s>1&&console.log("drilling down to z%d-%d-%d",e,t,r);for(var l,u=e,h=t,c=r;!l&&u>0;)u--,h=Math.floor(h/2),c=Math.floor(c/2),l=this.tiles[P(u,h,c)];return l&&l.source?(s>1&&console.log("found parent tile z%d-%d-%d",u,h,c),s>1&&console.time("drilling down"),this.splitTile(l.source,u,h,c,e,t,r),s>1&&console.timeEnd("drilling down"),this.tiles[a]?w(this.tiles[a],o):null):null},function(e,t){return new T(e,t)}}();var J=e.getDefaultExportFromCjs(N.exports);function W(t,r){const i=t.tileID.canonical;if(!this._geoJSONIndex)return r(null,null);const o=this._geoJSONIndex.getTile(i.z,i.x,i.y);if(!o)return r(null,null);const s=new class{constructor(t){this.layers={_geojsonTileLayer:this},this.name="_geojsonTileLayer",this.extent=e.EXTENT,this.length=t.length,this._features=t;}feature(t){return new class{constructor(t){this._feature=t,this.extent=e.EXTENT,this.type=t.type,this.properties=t.tags,"id"in t&&!isNaN(t.id)&&(this.id=parseInt(t.id,10));}loadGeometry(){if(1===this._feature.type){const t=[];for(const r of this._feature.geometry)t.push([new e.Point(r[0],r[1])]);return t}{const t=[];for(const r of this._feature.geometry){const i=[];for(const t of r)i.push(new e.Point(t[0],t[1]));t.push(i);}return t}}toGeoJSON(e,t,r){return l.call(this,e,t,r)}}(this._features[t])}}(o.features);let n=T(s);0===n.byteOffset&&n.byteLength===n.buffer.byteLength||(n=new Uint8Array(n)),r(null,{vectorTile:s,rawData:n.buffer});}class G extends e.VectorTileWorkerSource{constructor(e,t,r,i,o,s){super(e,t,r,i,W,s),o&&(this.loadGeoJSON=o);}loadData(t,r){const i=t&&t.request,o=i&&i.collectResourceTiming;this.loadGeoJSON(t,((s,n)=>{if(s||!n)return r(s);if("object"!=typeof n)return r(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`));{a(n,!0);try{if(t.filter){const r=e.createExpression(t.filter,{type:"boolean","property-type":"data-driven",overridable:!1,transition:!1});if("error"===r.result)throw new Error(r.value.map((e=>`${e.key}: ${e.message}`)).join(", "));const i=n.features.filter((e=>r.value.evaluate({zoom:0},e)));n={type:"FeatureCollection",features:i};}this._geoJSONIndex=t.cluster?new j(function({superclusterOptions:t,clusterProperties:r}){if(!r||!t)return t;const i={},o={},s={accumulated:null,zoom:0},n={properties:null},a=Object.keys(r);for(const t of a){const[s,n]=r[t],a=e.createExpression(n),l=e.createExpression("string"==typeof s?[s,["accumulated"],["get",t]]:s);i[t]=a.value,o[t]=l.value;}return t.map=e=>{n.properties=e;const t={};for(const e of a)t[e]=i[e].evaluate(s,n);return t},t.reduce=(e,t)=>{n.properties=t;for(const t of a)s.accumulated=e[t],e[t]=o[t].evaluate(s,n);},t}(t)).load(n.features):J(n,t.geojsonVtOptions);}catch(s){return r(s)}this.loaded={};const l={};if(o){const r=e.getPerformanceMeasurement(i);r&&(l.resourceTiming={},l.resourceTiming[t.source]=JSON.parse(JSON.stringify(r)));}r(null,l);}}));}reloadTile(e,t){const r=this.loaded;return r&&r[e.uid]?super.reloadTile(e,t):this.loadTile(e,t)}loadGeoJSON(t,r){if(t.request)e.getJSON(t.request,r);else {if("string"!=typeof t.data)return r(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`));try{return r(null,JSON.parse(t.data))}catch(e){return r(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`))}}}getClusterExpansionZoom(e,t){try{t(null,this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));}catch(e){t(e);}}getClusterChildren(e,t){try{t(null,this._geoJSONIndex.getChildren(e.clusterId));}catch(e){t(e);}}getClusterLeaves(e,t){try{t(null,this._geoJSONIndex.getLeaves(e.clusterId,e.limit,e.offset));}catch(e){t(e);}}}class X{constructor(t,r){this.tileID=new e.OverscaledTileID(t.tileID.overscaledZ,t.tileID.wrap,t.tileID.canonical.z,t.tileID.canonical.x,t.tileID.canonical.y),this.tileZoom=t.tileZoom,this.uid=t.uid,this.zoom=t.zoom,this.canonical=t.tileID.canonical,this.pixelRatio=t.pixelRatio,this.tileSize=t.tileSize,this.source=t.source,this.overscaling=this.tileID.overscaleFactor(),this.enableTerrain=!!t.enableTerrain,this.projection=t.projection,this.brightness=r;}async parse(t,r,i,o){this.status="parsing";const s=new e.OverscaledTileID(i.tileID.overscaledZ,i.tileID.wrap,i.tileID.canonical.z,i.tileID.canonical.x,i.tileID.canonical.y),n={},a=r.familiesBySource[i.source],l=new e.FeatureIndex(s,i.promoteId);l.bucketLayerIDs=[];const u=await e.load3DTile(t),h=e.convertB3dm(u.gltf,1/e.tileToMeter(i.tileID.canonical)),c=u.gltf.json.extensionsUsed&&u.gltf.json.extensionsUsed.includes("MAPBOX_mesh_features");for(const t in a)for(const r of a[t]){const t=r[0],i=u.gltf.json.extensionsUsed,o=new e.Tiled3dModelBucket(h,s,i&&i.includes("MAPBOX_mesh_features"),this.brightness);c||(o.needsUpload=!0),n[t.id]=o;}this.status="done",o(null,{buckets:n,featureIndex:l});}}class Y{constructor(e,t,r,i,o,s){this.actor=e,this.layerIndex=t,this.brightness=s,this.loading={},this.loaded={};}loadTile(t,r){const i=t.uid,o=this.loading[i]=new X(t,this.brightness);e.getArrayBuffer(t.request,((e,s)=>{const n=!this.loading[i];return delete this.loading[i],n||e?(o.status="done",n||(this.loaded[i]=o),r(e)):s&&0!==s.byteLength?(o.parse(s,this.layerIndex,t,r),this.loaded=this.loaded||{},void(this.loaded[i]=o)):(o.status="done",this.loaded[i]=o,r())}));}reloadTile(e,t){const r=this.loaded,i=e.uid;if(r&&r[i]){const o=r[i];o.enableTerrain=!!e.enableTerrain,o.projection=e.projection,o.brightness=e.brightness;const s=(r,i)=>{o.reloadCallback&&(delete o.reloadCallback,this.loadTile(e,t)),t(r,i);};"parsing"===o.status?o.reloadCallback=s:"done"===o.status&&this.loadTile(e,t);}}abortTile(e,t){const r=e.uid;this.loading[r]&&delete this.loading[r],t();}removeTile(e,t){const r=this.loaded,i=e.uid;r&&r[i]&&delete r[i],t();}}class V{constructor(t){this.self=t,this.actor=new e.Actor(t,this),this.layerIndexes={},this.availableImages={},this.isSpriteLoaded={},this.projections={},this.defaultProjection=e.getProjection({name:"mercator"}),this.workerSourceTypes={vector:e.VectorTileWorkerSource,geojson:G,"batched-model":Y},this.workerSources={},this.demWorkerSources={},this.self.registerWorkerSource=(e,t)=>{if(this.workerSourceTypes[e])throw new Error(`Worker source with name "${e}" already registered.`);this.workerSourceTypes[e]=t;},this.self.registerRTLTextPlugin=t=>{if(e.plugin.isParsed())throw new Error("RTL text plugin already registered.");e.plugin.applyArabicShaping=t.applyArabicShaping,e.plugin.processBidirectionalText=t.processBidirectionalText,e.plugin.processStyledBidirectionalText=t.processStyledBidirectionalText;};}clearCaches(e,t,r){delete this.layerIndexes[e],delete this.availableImages[e],delete this.workerSources[e],delete this.demWorkerSources[e],r();}checkIfReady(e,t,r){r();}setReferrer(e,t){this.referrer=t;}spriteLoaded(t,r){this.isSpriteLoaded[t]||(this.isSpriteLoaded[t]={}),this.isSpriteLoaded[t][r.scope]=r.isLoaded;for(const i in this.workerSources[t]){const o=this.workerSources[t][i];for(const t in o)o[t]instanceof e.VectorTileWorkerSource&&(o[t].isSpriteLoaded=r.isLoaded,o[t].fire(new e.Event("isSpriteLoaded")));}}setImages(e,t,r){const{scope:i,images:o}=t;this.availableImages[e]||(this.availableImages[e]={}),this.availableImages[e][i]=o;for(const t in this.workerSources[e]){const r=this.workerSources[e][t];for(const e in r)r[e].availableImages=o;}r();}enableTerrain(e,t,r){this.terrain=t,r();}setProjection(t,r){this.projections[t]=e.getProjection(r);}setBrightness(e,t,r){this.brightness=t,r();}setLayers(e,t,r){this.getLayerIndex(e,t.scope).replace(t.layers,t.options),r();}updateLayers(e,t,r){this.getLayerIndex(e,t.scope).update(t.layers,t.removedIds,t.options),r();}loadTile(t,r,i){const o=this.enableTerrain?e.extend({enableTerrain:this.terrain},r):r;o.projection=this.projections[t]||this.defaultProjection,this.getWorkerSource(t,r.type,r.source,r.scope).loadTile(o,i);}loadDEMTile(t,r,i){const o=this.enableTerrain?e.extend({buildQuadTree:this.terrain},r):r;this.getDEMWorkerSource(t,r.source,r.scope).loadTile(o,i);}reloadTile(t,r,i){const o=this.enableTerrain?e.extend({enableTerrain:this.terrain},r):r;o.projection=this.projections[t]||this.defaultProjection,this.getWorkerSource(t,r.type,r.source,r.scope).reloadTile(o,i);}abortTile(e,t,r){this.getWorkerSource(e,t.type,t.source,t.scope).abortTile(t,r);}removeTile(e,t,r){this.getWorkerSource(e,t.type,t.source,t.scope).removeTile(t,r);}removeSource(e,t,r){if(!this.workerSources[e]||!this.workerSources[e][t.type]||!this.workerSources[e][t.type][t.source])return;const i=this.workerSources[e][t.type][t.source];delete this.workerSources[e][t.type][t.source],void 0!==i.removeSource?i.removeSource(t,r):r();}loadWorkerSource(e,t,r){try{this.self.importScripts(t.url),r();}catch(e){r(e.toString());}}syncRTLPluginState(t,r,i){try{e.plugin.setState(r);const t=e.plugin.getPluginURL();if(e.plugin.isLoaded()&&!e.plugin.isParsed()&&null!=t){this.self.importScripts(t);const r=e.plugin.isParsed();i(r?void 0:new Error(`RTL Text Plugin failed to import scripts from ${t}`),r);}}catch(e){i(e.toString());}}setLoadersUrl(e,t){this.loadersUrl=t;}getAvailableImages(e,t){this.availableImages[e]||(this.availableImages[e]={});let r=this.availableImages[e][t];return r||(r=[]),r}getLayerIndex(e,t){this.layerIndexes[e]||(this.layerIndexes[e]={});let r=this.layerIndexes[e][t];return r||(r=this.layerIndexes[e][t]=new i),r}getWorkerSource(e,t,r,i){if(this.workerSources[e]||(this.workerSources[e]={}),this.workerSources[e][t]||(this.workerSources[e][t]={}),this.isSpriteLoaded[e]||(this.isSpriteLoaded[e]={}),!this.workerSources[e][t][r]){const o={send:(t,r,i,o,s,n)=>{this.actor.send(t,r,i,e,s,n);},scheduler:this.actor.scheduler};this.workerSources[e][t][r]=new this.workerSourceTypes[t](o,this.getLayerIndex(e,i),this.getAvailableImages(e,i),this.isSpriteLoaded[e][i],void 0,this.brightness);}return this.workerSources[e][t][r]}getDEMWorkerSource(e,t,r){return this.demWorkerSources[e]||(this.demWorkerSources[e]={}),this.demWorkerSources[e][r]||(this.demWorkerSources[e][r]={}),this.demWorkerSources[e][r][t]||(this.demWorkerSources[e][r][t]=new o),this.demWorkerSources[e][r][t]}enforceCacheSizeLimit(t,r){e.enforceCacheSizeLimit(r);}getWorkerPerformanceMetrics(e,t,r){r(void 0,void 0);}}return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope&&(self.worker=new V(self)),V}));

		define(["./shared"],(function(e){return e.exported}));

		//
		// Our custom intro provides a specialized "define()" function, called by the
		// AMD modules below, that sets up the worker blob URL and then executes the
		// main module, storing its exported value as 'mapboxgl'


		var mapboxgl$1 = mapboxgl;

		return mapboxgl$1;

		}));
		
	} (mapboxGl));

	var mapboxGlExports = mapboxGl.exports;
	var mapboxgl = /*@__PURE__*/getDefaultExportFromCjs(mapboxGlExports);

	/**
	 * Create mapbox control container
	 * @param {string} className
	 */
	function controlContainer(className) {
		const container = document.createElement('div');
		container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group', className);
		return container;
	}

	/**
	 * Create mapbox control button
	 * @param {Object} options
	 * @param {string=} options.title
	 * @param {Node=} options.icon
	 * @param {string=} options.textContent
	 * @param {boolean=} options.disabled
	 * @param {string=} options.className
	 * @param {() => void=} options.onClick
	 */
	function controlButton(options = {}) {
		const button = document.createElement('button');
		button.type = 'button';
		if (options.title) {
			button.title = options.title;
		}
		if (options.icon) {
			button.appendChild(options.icon);
		}
		if (options.textContent) {
			button.textContent = options.textContent;
		}
		if (options.disabled) {
			button.disabled = true;
		}
		if (options.className) {
			button.classList.add(options.className);
		}
		if (options.onClick) {
			button.addEventListener('click', () => {
				if (!options.onClick) return;
				options.onClick();
			});
		}
		return button;
	}

	/**
	 * Create SVG element from string code
	 * @param {string} string
	 */
	function parseSVG(string) {
		return /** @type SVGElement */ ((new DOMParser().parseFromString(string, 'image/svg+xml')).firstChild);
	}

	const compass = parseSVG(`
<svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z"/>
        <path fill="#f44336" d="M12 3l4 8H8z"/>
        <path fill="#9E9E9E" d="M12 21l-4-8h8z"/>
    </g>
</svg>
`);

	const icons$5 = {
		compass,
	};

	/**
	 * @typedef {{
	 * 	instant?: boolean;
	 * }} CompassControlOptions
	 */

	class CompassControl {
		/**
		 * @param {CompassControlOptions} options
		 */
		constructor(options = {}) {
			this.options = { ...options };
			this.container = controlContainer('mapbox-ctrl-compass');
			this.icon = icons$5.compass;
			this.button = controlButton({
				title: 'Compass',
				icon: icons$5.compass,
				onClick: () => this.onControlButtonClick(),
			});
		}

		onControlButtonClick() {
			if (!this.map) throw Error('map is undefined');
			this.map.easeTo({ bearing: 0, pitch: 0 });
		}

		onRotate() {
			if (!this.map) throw Error('map is undefined');
			const angle = this.map.getBearing() * (-1);
			if (!this.options.instant) {
				this.container.hidden = angle === 0;
			}
			this.icon.style.transform = `rotate(${angle}deg)`;
		}

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			if (!this.options.instant) {
				this.container.hidden = true;
			}
			this.container.appendChild(this.button);
			this.onRotate();
			this.map.on('rotate', () => this.onRotate());
			return this.container;
		}

		onRemove() {
			this.container.parentNode?.removeChild(this.container);
		}
	}

	function createFileInput() {
		const node = document.createElement('input');
		node.type = 'file';
		node.accept = '.jpg, .jpeg, .png';
		node.multiple = false;
		return node;
	}

	/**
	 * @param {File} file
	 * @returns {Promise<HTMLImageElement>}
	 */
	function readFile(file) {
		return new Promise((resolve, reject) => {
			const url = URL.createObjectURL(file);
			const node = document.createElement('img');
			node.onload = () => {
				resolve(node);
			};
			node.onerror = reject;
			node.src = url;
		});
	}

	/**
	 * @param {string} url
	 * @return {Promise<HTMLImageElement>}
	 */
	function readUrl(url) {
		return new Promise(((resolve, reject) => {
			const node = document.createElement('img');
			node.onload = () => {
				resolve(node);
			};
			node.onerror = reject;
			node.src = url;
		}));
	}

	/**
	 * @param {HTMLImageElement} image
	 * @param {import('mapbox-gl').Map} map
	 * @param {number} padding
	 */
	function centerPosition(image, map, padding = 20) {
		const canvas = map.getCanvas();
		const canvasWidth = canvas.offsetWidth;
		const canvasHeight = canvas.offsetHeight;
		const maxWidth = canvasWidth - padding * 2;
		const maxHeight = canvasHeight - padding * 2;
		const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
		const scaleWidth = image.width * ratio;
		const scaleHeight = image.height * ratio;
		/** @type {[number, number][]} */
		const position = [
			[(canvasWidth - scaleWidth) / 2, (canvasHeight - scaleHeight) / 2], // left top
			[(canvasWidth + scaleWidth) / 2, (canvasHeight - scaleHeight) / 2], // right top
			[(canvasWidth + scaleWidth) / 2, (canvasHeight + scaleHeight) / 2], // right bottom
			[(canvasWidth - scaleWidth) / 2, (canvasHeight + scaleHeight) / 2], // left bottom
		];

		/**
		 * reset pitch for correct projection
		 */
		map.setPitch(0);

		return /** @type {[number, number][]} */ ([
			map.unproject(position[0]).toArray(),
			map.unproject(position[1]).toArray(),
			map.unproject(position[2]).toArray(),
			map.unproject(position[3]).toArray(),
		]);
	}

	/**
	 * @module helpers
	 */
	/**
	 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
	 *
	 * @memberof helpers
	 * @type {number}
	 */
	const earthRadius = 6371008.8;
	/**
	 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
	 *
	 * Keys are the name of the unit, values are the number of that unit in a single radian
	 *
	 * @memberof helpers
	 * @type {Object}
	 */
	const factors = {
	    centimeters: earthRadius * 100,
	    centimetres: earthRadius * 100,
	    degrees: 360 / (2 * Math.PI),
	    feet: earthRadius * 3.28084,
	    inches: earthRadius * 39.37,
	    kilometers: earthRadius / 1000,
	    kilometres: earthRadius / 1000,
	    meters: earthRadius,
	    metres: earthRadius,
	    miles: earthRadius / 1609.344,
	    millimeters: earthRadius * 1000,
	    millimetres: earthRadius * 1000,
	    nauticalmiles: earthRadius / 1852,
	    radians: 1,
	    yards: earthRadius * 1.0936,
	};
	/**
	 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
	 *
	 * @name feature
	 * @param {Geometry} geometry input geometry
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature} a GeoJSON Feature
	 * @example
	 * var geometry = {
	 *   "type": "Point",
	 *   "coordinates": [110, 50]
	 * };
	 *
	 * var feature = turf.feature(geometry);
	 *
	 * //=feature
	 */
	function feature(geom, properties, options = {}) {
	    const feat = { type: "Feature" };
	    if (options.id === 0 || options.id) {
	        feat.id = options.id;
	    }
	    if (options.bbox) {
	        feat.bbox = options.bbox;
	    }
	    feat.properties = properties || {};
	    feat.geometry = geom;
	    return feat;
	}
	/**
	 * Creates a {@link Point} {@link Feature} from a Position.
	 *
	 * @name point
	 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<Point>} a Point feature
	 * @example
	 * var point = turf.point([-75.343, 39.984]);
	 *
	 * //=point
	 */
	function point(coordinates, properties, options = {}) {
	    if (!coordinates) {
	        throw new Error("coordinates is required");
	    }
	    if (!Array.isArray(coordinates)) {
	        throw new Error("coordinates must be an Array");
	    }
	    if (coordinates.length < 2) {
	        throw new Error("coordinates must be at least 2 numbers long");
	    }
	    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
	        throw new Error("coordinates must contain numbers");
	    }
	    const geom = {
	        type: "Point",
	        coordinates,
	    };
	    return feature(geom, properties, options);
	}
	/**
	 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
	 *
	 * @name polygon
	 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<Polygon>} Polygon Feature
	 * @example
	 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
	 *
	 * //=polygon
	 */
	function polygon$1(coordinates, properties, options = {}) {
	    for (const ring of coordinates) {
	        if (ring.length < 4) {
	            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
	        }
	        if (ring[ring.length - 1].length !== ring[0].length) {
	            throw new Error("First and last Position are not equivalent.");
	        }
	        for (let j = 0; j < ring[ring.length - 1].length; j++) {
	            // Check if first point of Polygon contains two numbers
	            if (ring[ring.length - 1][j] !== ring[0][j]) {
	                throw new Error("First and last Position are not equivalent.");
	            }
	        }
	    }
	    const geom = {
	        type: "Polygon",
	        coordinates,
	    };
	    return feature(geom, properties, options);
	}
	/**
	 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
	 *
	 * @name featureCollection
	 * @param {Feature[]} features input features
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {FeatureCollection} FeatureCollection of Features
	 * @example
	 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
	 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
	 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
	 *
	 * var collection = turf.featureCollection([
	 *   locationA,
	 *   locationB,
	 *   locationC
	 * ]);
	 *
	 * //=collection
	 */
	function featureCollection(features, options = {}) {
	    const fc = { type: "FeatureCollection" };
	    if (options.id) {
	        fc.id = options.id;
	    }
	    if (options.bbox) {
	        fc.bbox = options.bbox;
	    }
	    fc.features = features;
	    return fc;
	}
	/**
	 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
	 *
	 * @name radiansToLength
	 * @param {number} radians in radians across the sphere
	 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
	 * meters, kilometres, kilometers.
	 * @returns {number} distance
	 */
	function radiansToLength(radians, units = "kilometers") {
	    const factor = factors[units];
	    if (!factor) {
	        throw new Error(units + " units is invalid");
	    }
	    return radians * factor;
	}
	/**
	 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
	 *
	 * @name lengthToRadians
	 * @param {number} distance in real units
	 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
	 * meters, kilometres, kilometers.
	 * @returns {number} radians
	 */
	function lengthToRadians(distance, units = "kilometers") {
	    const factor = factors[units];
	    if (!factor) {
	        throw new Error(units + " units is invalid");
	    }
	    return distance / factor;
	}
	/**
	 * Converts any bearing angle from the north line direction (positive clockwise)
	 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
	 *
	 * @name bearingToAzimuth
	 * @param {number} bearing angle, between -180 and +180 degrees
	 * @returns {number} angle between 0 and 360 degrees
	 */
	function bearingToAzimuth(bearing) {
	    let angle = bearing % 360;
	    if (angle < 0) {
	        angle += 360;
	    }
	    return angle;
	}
	/**
	 * Converts an angle in radians to degrees
	 *
	 * @name radiansToDegrees
	 * @param {number} radians angle in radians
	 * @returns {number} degrees between 0 and 360 degrees
	 */
	function radiansToDegrees(radians) {
	    const degrees = radians % (2 * Math.PI);
	    return (degrees * 180) / Math.PI;
	}
	/**
	 * Converts an angle in degrees to radians
	 *
	 * @name degreesToRadians
	 * @param {number} degrees angle between 0 and 360 degrees
	 * @returns {number} angle in radians
	 */
	function degreesToRadians(degrees) {
	    const radians = degrees % 360;
	    return (radians * Math.PI) / 180;
	}
	/**
	 * Converts a length to the requested unit.
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
	 *
	 * @param {number} length to be converted
	 * @param {Units} [originalUnit="kilometers"] of the length
	 * @param {Units} [finalUnit="kilometers"] returned unit
	 * @returns {number} the converted length
	 */
	function convertLength(length, originalUnit = "kilometers", finalUnit = "kilometers") {
	    if (!(length >= 0)) {
	        throw new Error("length must be a positive number");
	    }
	    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
	}
	/**
	 * isNumber
	 *
	 * @param {*} num Number to validate
	 * @returns {boolean} true/false
	 * @example
	 * turf.isNumber(123)
	 * //=true
	 * turf.isNumber('foo')
	 * //=false
	 */
	function isNumber(num) {
	    return !isNaN(num) && num !== null && !Array.isArray(num);
	}
	/**
	 * isObject
	 *
	 * @param {*} input variable to validate
	 * @returns {boolean} true/false, including false for Arrays and Functions
	 * @example
	 * turf.isObject({elevation: 10})
	 * //=true
	 * turf.isObject('foo')
	 * //=false
	 */
	function isObject(input) {
	    return input !== null && typeof input === "object" && !Array.isArray(input);
	}

	/**
	 * Callback for coordEach
	 *
	 * @callback coordEachCallback
	 * @param {Array<number>} currentCoord The current coordinate being processed.
	 * @param {number} coordIndex The current index of the coordinate being processed.
	 * @param {number} featureIndex The current index of the Feature being processed.
	 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
	 * @param {number} geometryIndex The current index of the Geometry being processed.
	 */

	/**
	 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
	 *
	 * @name coordEach
	 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
	 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
	 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
	 * @returns {void}
	 * @example
	 * var features = turf.featureCollection([
	 *   turf.point([26, 37], {"foo": "bar"}),
	 *   turf.point([36, 53], {"hello": "world"})
	 * ]);
	 *
	 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
	 *   //=currentCoord
	 *   //=coordIndex
	 *   //=featureIndex
	 *   //=multiFeatureIndex
	 *   //=geometryIndex
	 * });
	 */
	function coordEach(geojson, callback, excludeWrapCoord) {
	  // Handles null Geometry -- Skips this GeoJSON
	  if (geojson === null) return;
	  var j,
	    k,
	    l,
	    geometry,
	    stopG,
	    coords,
	    geometryMaybeCollection,
	    wrapShrink = 0,
	    coordIndex = 0,
	    isGeometryCollection,
	    type = geojson.type,
	    isFeatureCollection = type === "FeatureCollection",
	    isFeature = type === "Feature",
	    stop = isFeatureCollection ? geojson.features.length : 1;

	  // This logic may look a little weird. The reason why it is that way
	  // is because it's trying to be fast. GeoJSON supports multiple kinds
	  // of objects at its root: FeatureCollection, Features, Geometries.
	  // This function has the responsibility of handling all of them, and that
	  // means that some of the `for` loops you see below actually just don't apply
	  // to certain inputs. For instance, if you give this just a
	  // Point geometry, then both loops are short-circuited and all we do
	  // is gradually rename the input until it's called 'geometry'.
	  //
	  // This also aims to allocate as few resources as possible: just a
	  // few numbers and booleans, rather than any temporary arrays as would
	  // be required with the normalization approach.
	  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
	    geometryMaybeCollection = isFeatureCollection
	      ? geojson.features[featureIndex].geometry
	      : isFeature
	      ? geojson.geometry
	      : geojson;
	    isGeometryCollection = geometryMaybeCollection
	      ? geometryMaybeCollection.type === "GeometryCollection"
	      : false;
	    stopG = isGeometryCollection
	      ? geometryMaybeCollection.geometries.length
	      : 1;

	    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
	      var multiFeatureIndex = 0;
	      var geometryIndex = 0;
	      geometry = isGeometryCollection
	        ? geometryMaybeCollection.geometries[geomIndex]
	        : geometryMaybeCollection;

	      // Handles null Geometry -- Skips this geometry
	      if (geometry === null) continue;
	      coords = geometry.coordinates;
	      var geomType = geometry.type;

	      wrapShrink =
	        excludeWrapCoord &&
	        (geomType === "Polygon" || geomType === "MultiPolygon")
	          ? 1
	          : 0;

	      switch (geomType) {
	        case null:
	          break;
	        case "Point":
	          if (
	            callback(
	              coords,
	              coordIndex,
	              featureIndex,
	              multiFeatureIndex,
	              geometryIndex
	            ) === false
	          )
	            return false;
	          coordIndex++;
	          multiFeatureIndex++;
	          break;
	        case "LineString":
	        case "MultiPoint":
	          for (j = 0; j < coords.length; j++) {
	            if (
	              callback(
	                coords[j],
	                coordIndex,
	                featureIndex,
	                multiFeatureIndex,
	                geometryIndex
	              ) === false
	            )
	              return false;
	            coordIndex++;
	            if (geomType === "MultiPoint") multiFeatureIndex++;
	          }
	          if (geomType === "LineString") multiFeatureIndex++;
	          break;
	        case "Polygon":
	        case "MultiLineString":
	          for (j = 0; j < coords.length; j++) {
	            for (k = 0; k < coords[j].length - wrapShrink; k++) {
	              if (
	                callback(
	                  coords[j][k],
	                  coordIndex,
	                  featureIndex,
	                  multiFeatureIndex,
	                  geometryIndex
	                ) === false
	              )
	                return false;
	              coordIndex++;
	            }
	            if (geomType === "MultiLineString") multiFeatureIndex++;
	            if (geomType === "Polygon") geometryIndex++;
	          }
	          if (geomType === "Polygon") multiFeatureIndex++;
	          break;
	        case "MultiPolygon":
	          for (j = 0; j < coords.length; j++) {
	            geometryIndex = 0;
	            for (k = 0; k < coords[j].length; k++) {
	              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
	                if (
	                  callback(
	                    coords[j][k][l],
	                    coordIndex,
	                    featureIndex,
	                    multiFeatureIndex,
	                    geometryIndex
	                  ) === false
	                )
	                  return false;
	                coordIndex++;
	              }
	              geometryIndex++;
	            }
	            multiFeatureIndex++;
	          }
	          break;
	        case "GeometryCollection":
	          for (j = 0; j < geometry.geometries.length; j++)
	            if (
	              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
	              false
	            )
	              return false;
	          break;
	        default:
	          throw new Error("Unknown Geometry Type");
	      }
	    }
	  }
	}

	/**
	 * Callback for featureEach
	 *
	 * @callback featureEachCallback
	 * @param {Feature<any>} currentFeature The current Feature being processed.
	 * @param {number} featureIndex The current index of the Feature being processed.
	 */

	/**
	 * Iterate over features in any GeoJSON object, similar to
	 * Array.forEach.
	 *
	 * @name featureEach
	 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
	 * @param {Function} callback a method that takes (currentFeature, featureIndex)
	 * @returns {void}
	 * @example
	 * var features = turf.featureCollection([
	 *   turf.point([26, 37], {foo: 'bar'}),
	 *   turf.point([36, 53], {hello: 'world'})
	 * ]);
	 *
	 * turf.featureEach(features, function (currentFeature, featureIndex) {
	 *   //=currentFeature
	 *   //=featureIndex
	 * });
	 */
	function featureEach(geojson, callback) {
	  if (geojson.type === "Feature") {
	    callback(geojson, 0);
	  } else if (geojson.type === "FeatureCollection") {
	    for (var i = 0; i < geojson.features.length; i++) {
	      if (callback(geojson.features[i], i) === false) break;
	    }
	  }
	}

	/**
	 * Computes the centroid as the mean of all vertices within the object.
	 *
	 * @name centroid
	 * @param {GeoJSON} geojson GeoJSON to be centered
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Object} [options.properties={}] an Object that is used as the {@link Feature}'s properties
	 * @returns {Feature<Point>} the centroid of the input object
	 * @example
	 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
	 *
	 * var centroid = turf.centroid(polygon);
	 *
	 * //addToMap
	 * var addToMap = [polygon, centroid]
	 */
	function centroid(geojson, options = {}) {
	    let xSum = 0;
	    let ySum = 0;
	    let len = 0;
	    coordEach(geojson, function (coord) {
	        xSum += coord[0];
	        ySum += coord[1];
	        len++;
	    }, true);
	    return point([xSum / len, ySum / len], options.properties);
	}

	/**
	 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
	 *
	 * @name getCoord
	 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
	 * @returns {Array<number>} coordinates
	 * @example
	 * var pt = turf.point([10, 10]);
	 *
	 * var coord = turf.getCoord(pt);
	 * //= [10, 10]
	 */
	function getCoord(coord) {
	    if (!coord) {
	        throw new Error("coord is required");
	    }
	    if (!Array.isArray(coord)) {
	        if (coord.type === "Feature" &&
	            coord.geometry !== null &&
	            coord.geometry.type === "Point") {
	            return [...coord.geometry.coordinates];
	        }
	        if (coord.type === "Point") {
	            return [...coord.coordinates];
	        }
	    }
	    if (Array.isArray(coord) &&
	        coord.length >= 2 &&
	        !Array.isArray(coord[0]) &&
	        !Array.isArray(coord[1])) {
	        return [...coord];
	    }
	    throw new Error("coord must be GeoJSON Point or an Array of numbers");
	}
	/**
	 * Unwrap coordinates from a Feature, Geometry Object or an Array
	 *
	 * @name getCoords
	 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
	 * @returns {Array<any>} coordinates
	 * @example
	 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
	 *
	 * var coords = turf.getCoords(poly);
	 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
	 */
	function getCoords(coords) {
	    if (Array.isArray(coords)) {
	        return coords;
	    }
	    // Feature
	    if (coords.type === "Feature") {
	        if (coords.geometry !== null) {
	            return coords.geometry.coordinates;
	        }
	    }
	    else {
	        // Geometry
	        if (coords.coordinates) {
	            return coords.coordinates;
	        }
	    }
	    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
	}
	/**
	 * Get GeoJSON object's type, Geometry type is prioritize.
	 *
	 * @param {GeoJSON} geojson GeoJSON object
	 * @param {string} [name="geojson"] name of the variable to display in error message (unused)
	 * @returns {string} GeoJSON type
	 * @example
	 * var point = {
	 *   "type": "Feature",
	 *   "properties": {},
	 *   "geometry": {
	 *     "type": "Point",
	 *     "coordinates": [110, 40]
	 *   }
	 * }
	 * var geom = turf.getType(point)
	 * //="Point"
	 */
	function getType(geojson, _name) {
	    if (geojson.type === "FeatureCollection") {
	        return "FeatureCollection";
	    }
	    if (geojson.type === "GeometryCollection") {
	        return "GeometryCollection";
	    }
	    if (geojson.type === "Feature" && geojson.geometry !== null) {
	        return geojson.geometry.type;
	    }
	    return geojson.type;
	}

	// https://en.wikipedia.org/wiki/Rhumb_line
	/**
	 * Takes two {@link Point|points} and finds the bearing angle between them along a Rhumb line
	 * i.e. the angle measured in degrees start the north line (0 degrees)
	 *
	 * @name rhumbBearing
	 * @param {Coord} start starting Point
	 * @param {Coord} end ending Point
	 * @param {Object} [options] Optional parameters
	 * @param {boolean} [options.final=false] calculates the final bearing if true
	 * @returns {number} bearing from north in decimal degrees, between -180 and 180 degrees (positive clockwise)
	 * @example
	 * var point1 = turf.point([-75.343, 39.984], {"marker-color": "#F00"});
	 * var point2 = turf.point([-75.534, 39.123], {"marker-color": "#00F"});
	 *
	 * var bearing = turf.rhumbBearing(point1, point2);
	 *
	 * //addToMap
	 * var addToMap = [point1, point2];
	 * point1.properties.bearing = bearing;
	 * point2.properties.bearing = bearing;
	 */
	function rhumbBearing(start, end, options = {}) {
	    let bear360;
	    if (options.final) {
	        bear360 = calculateRhumbBearing(getCoord(end), getCoord(start));
	    }
	    else {
	        bear360 = calculateRhumbBearing(getCoord(start), getCoord(end));
	    }
	    const bear180 = bear360 > 180 ? -(360 - bear360) : bear360;
	    return bear180;
	}
	/**
	 * Returns the bearing from ‘this’ point to destination point along a rhumb line.
	 * Adapted from Geodesy: https://github.com/chrisveness/geodesy/blob/master/latlon-spherical.js
	 *
	 * @private
	 * @param   {Array<number>} from - origin point.
	 * @param   {Array<number>} to - destination point.
	 * @returns {number} Bearing in degrees from north.
	 * @example
	 * var p1 = new LatLon(51.127, 1.338);
	 * var p2 = new LatLon(50.964, 1.853);
	 * var d = p1.rhumbBearingTo(p2); // 116.7 m
	 */
	function calculateRhumbBearing(from, to) {
	    // φ => phi
	    // Δλ => deltaLambda
	    // Δψ => deltaPsi
	    // θ => theta
	    const phi1 = degreesToRadians(from[1]);
	    const phi2 = degreesToRadians(to[1]);
	    let deltaLambda = degreesToRadians(to[0] - from[0]);
	    // if deltaLambdaon over 180° take shorter rhumb line across the anti-meridian:
	    if (deltaLambda > Math.PI) {
	        deltaLambda -= 2 * Math.PI;
	    }
	    if (deltaLambda < -Math.PI) {
	        deltaLambda += 2 * Math.PI;
	    }
	    const deltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
	    const theta = Math.atan2(deltaLambda, deltaPsi);
	    return (radiansToDegrees(theta) + 360) % 360;
	}

	// https://en.wikipedia.org/wiki/Rhumb_line
	/**
	 * Calculates the distance along a rhumb line between two {@link Point|points} in degrees, radians,
	 * miles, or kilometers.
	 *
	 * @name rhumbDistance
	 * @param {Coord} from origin point
	 * @param {Coord} to destination point
	 * @param {Object} [options] Optional parameters
	 * @param {string} [options.units="kilometers"] can be degrees, radians, miles, or kilometers
	 * @returns {number} distance between the two points
	 * @example
	 * var from = turf.point([-75.343, 39.984]);
	 * var to = turf.point([-75.534, 39.123]);
	 * var options = {units: 'miles'};
	 *
	 * var distance = turf.rhumbDistance(from, to, options);
	 *
	 * //addToMap
	 * var addToMap = [from, to];
	 * from.properties.distance = distance;
	 * to.properties.distance = distance;
	 */
	function rhumbDistance(from, to, options = {}) {
	    const origin = getCoord(from);
	    const destination = getCoord(to);
	    // compensate the crossing of the 180th meridian (https://macwright.org/2016/09/26/the-180th-meridian.html)
	    // solution from https://github.com/mapbox/mapbox-gl-js/issues/3250#issuecomment-294887678
	    destination[0] +=
	        destination[0] - origin[0] > 180
	            ? -360
	            : origin[0] - destination[0] > 180
	                ? 360
	                : 0;
	    const distanceInMeters = calculateRhumbDistance(origin, destination);
	    const distance = convertLength(distanceInMeters, "meters", options.units);
	    return distance;
	}
	/**
	 * Returns the distance travelling from ‘this’ point to destination point along a rhumb line.
	 * Adapted from Geodesy: https://github.com/chrisveness/geodesy/blob/master/latlon-spherical.js
	 *
	 * @private
	 * @param   {Array<number>} origin point.
	 * @param   {Array<number>} destination point.
	 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
	 * @returns {number} Distance in km between this point and destination point (same units as radius).
	 *
	 * @example
	 *     var p1 = new LatLon(51.127, 1.338);
	 *     var p2 = new LatLon(50.964, 1.853);
	 *     var d = p1.distanceTo(p2); // 40.31 km
	 */
	function calculateRhumbDistance(origin, destination, radius) {
	    // φ => phi
	    // λ => lambda
	    // ψ => psi
	    // Δ => Delta
	    // δ => delta
	    // θ => theta
	    radius = radius === undefined ? earthRadius : Number(radius);
	    // see www.edwilliams.org/avform.htm#Rhumb
	    const R = radius;
	    const phi1 = (origin[1] * Math.PI) / 180;
	    const phi2 = (destination[1] * Math.PI) / 180;
	    const DeltaPhi = phi2 - phi1;
	    let DeltaLambda = (Math.abs(destination[0] - origin[0]) * Math.PI) / 180;
	    // if dLon over 180° take shorter rhumb line across the anti-meridian:
	    if (DeltaLambda > Math.PI) {
	        DeltaLambda -= 2 * Math.PI;
	    }
	    // on Mercator projection, longitude distances shrink by latitude; q is the 'stretch factor'
	    // q becomes ill-conditioned along E-W line (0/0); use empirical tolerance to avoid it
	    const DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
	    const q = Math.abs(DeltaPsi) > 10e-12 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
	    // distance is pythagoras on 'stretched' Mercator projection
	    const delta = Math.sqrt(DeltaPhi * DeltaPhi + q * q * DeltaLambda * DeltaLambda); // angular distance in radians
	    const dist = delta * R;
	    return dist;
	}

	/**
	 * Returns the destination {@link Point} having travelled the given distance along a Rhumb line from the
	 * origin Point with the (varant) given bearing.
	 *
	 * @name rhumbDestination
	 * @param {Coord} origin starting point
	 * @param {number} distance distance from the starting point
	 * @param {number} bearing varant bearing angle ranging from -180 to 180 degrees from north
	 * @param {Object} [options={}] Optional parameters
	 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
	 * @param {Object} [options.properties={}] translate properties to destination point
	 * @returns {Feature<Point>} Destination point.
	 * @example
	 * var pt = turf.point([-75.343, 39.984], {"marker-color": "F00"});
	 * var distance = 50;
	 * var bearing = 90;
	 * var options = {units: 'miles'};
	 *
	 * var destination = turf.rhumbDestination(pt, distance, bearing, options);
	 *
	 * //addToMap
	 * var addToMap = [pt, destination]
	 * destination.properties['marker-color'] = '#00F';
	 */
	function rhumbDestination(origin, distance, bearing, options = {}) {
	    const wasNegativeDistance = distance < 0;
	    let distanceInMeters = convertLength(Math.abs(distance), options.units, "meters");
	    if (wasNegativeDistance)
	        distanceInMeters = -Math.abs(distanceInMeters);
	    const coords = getCoord(origin);
	    const destination = calculateRhumbDestination(coords, distanceInMeters, bearing);
	    // compensate the crossing of the 180th meridian (https://macwright.org/2016/09/26/the-180th-meridian.html)
	    // solution from https://github.com/mapbox/mapbox-gl-js/issues/3250#issuecomment-294887678
	    destination[0] +=
	        destination[0] - coords[0] > 180
	            ? -360
	            : coords[0] - destination[0] > 180
	                ? 360
	                : 0;
	    return point(destination, options.properties);
	}
	/**
	 * Returns the destination point having travelled along a rhumb line from origin point the given
	 * distance on the  given bearing.
	 * Adapted from Geodesy: http://www.movable-type.co.uk/scripts/latlong.html#rhumblines
	 *
	 * @private
	 * @param   {Array<number>} origin - point
	 * @param   {number} distance - Distance travelled, in same units as earth radius (default: metres).
	 * @param   {number} bearing - Bearing in degrees from north.
	 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
	 * @returns {Array<number>} Destination point.
	 */
	function calculateRhumbDestination(origin, distance, bearing, radius) {
	    // φ => phi
	    // λ => lambda
	    // ψ => psi
	    // Δ => Delta
	    // δ => delta
	    // θ => theta
	    radius = radius === undefined ? earthRadius : Number(radius);
	    const delta = distance / radius; // angular distance in radians
	    const lambda1 = (origin[0] * Math.PI) / 180; // to radians, but without normalize to 𝜋
	    const phi1 = degreesToRadians(origin[1]);
	    const theta = degreesToRadians(bearing);
	    const DeltaPhi = delta * Math.cos(theta);
	    let phi2 = phi1 + DeltaPhi;
	    // check for some daft bugger going past the pole, normalise latitude if so
	    if (Math.abs(phi2) > Math.PI / 2) {
	        phi2 = phi2 > 0 ? Math.PI - phi2 : -Math.PI - phi2;
	    }
	    const DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
	    // E-W course becomes ill-conditioned with 0/0
	    const q = Math.abs(DeltaPsi) > 10e-12 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
	    const DeltaLambda = (delta * Math.sin(theta)) / q;
	    const lambda2 = lambda1 + DeltaLambda;
	    return [
	        (((lambda2 * 180) / Math.PI + 540) % 360) - 180,
	        (phi2 * 180) / Math.PI,
	    ]; // normalise to −180..+180°
	}

	/**
	 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
	 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
	 *
	 * @name clone
	 * @param {GeoJSON} geojson GeoJSON Object
	 * @returns {GeoJSON} cloned GeoJSON Object
	 * @example
	 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
	 *
	 * var lineCloned = turf.clone(line);
	 */
	function clone(geojson) {
	    if (!geojson) {
	        throw new Error("geojson is required");
	    }
	    switch (geojson.type) {
	        case "Feature":
	            return cloneFeature(geojson);
	        case "FeatureCollection":
	            return cloneFeatureCollection(geojson);
	        case "Point":
	        case "LineString":
	        case "Polygon":
	        case "MultiPoint":
	        case "MultiLineString":
	        case "MultiPolygon":
	        case "GeometryCollection":
	            return cloneGeometry(geojson);
	        default:
	            throw new Error("unknown GeoJSON type");
	    }
	}
	/**
	 * Clone Feature
	 *
	 * @private
	 * @param {Feature<any>} geojson GeoJSON Feature
	 * @returns {Feature<any>} cloned Feature
	 */
	function cloneFeature(geojson) {
	    const cloned = { type: "Feature" };
	    // Preserve Foreign Members
	    Object.keys(geojson).forEach((key) => {
	        switch (key) {
	            case "type":
	            case "properties":
	            case "geometry":
	                return;
	            default:
	                cloned[key] = geojson[key];
	        }
	    });
	    // Add properties & geometry last
	    cloned.properties = cloneProperties(geojson.properties);
	    if (geojson.geometry == null) {
	        cloned.geometry = null;
	    }
	    else {
	        cloned.geometry = cloneGeometry(geojson.geometry);
	    }
	    return cloned;
	}
	/**
	 * Clone Properties
	 *
	 * @private
	 * @param {Object} properties GeoJSON Properties
	 * @returns {Object} cloned Properties
	 */
	function cloneProperties(properties) {
	    const cloned = {};
	    if (!properties) {
	        return cloned;
	    }
	    Object.keys(properties).forEach((key) => {
	        const value = properties[key];
	        if (typeof value === "object") {
	            if (value === null) {
	                // handle null
	                cloned[key] = null;
	            }
	            else if (Array.isArray(value)) {
	                // handle Array
	                cloned[key] = value.map((item) => {
	                    return item;
	                });
	            }
	            else {
	                // handle generic Object
	                cloned[key] = cloneProperties(value);
	            }
	        }
	        else {
	            cloned[key] = value;
	        }
	    });
	    return cloned;
	}
	/**
	 * Clone Feature Collection
	 *
	 * @private
	 * @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
	 * @returns {FeatureCollection<any>} cloned Feature Collection
	 */
	function cloneFeatureCollection(geojson) {
	    const cloned = { type: "FeatureCollection" };
	    // Preserve Foreign Members
	    Object.keys(geojson).forEach((key) => {
	        switch (key) {
	            case "type":
	            case "features":
	                return;
	            default:
	                cloned[key] = geojson[key];
	        }
	    });
	    // Add features
	    cloned.features = geojson.features.map((feature) => {
	        return cloneFeature(feature);
	    });
	    return cloned;
	}
	/**
	 * Clone Geometry
	 *
	 * @private
	 * @param {Geometry<any>} geometry GeoJSON Geometry
	 * @returns {Geometry<any>} cloned Geometry
	 */
	function cloneGeometry(geometry) {
	    const geom = { type: geometry.type };
	    if (geometry.bbox) {
	        geom.bbox = geometry.bbox;
	    }
	    if (geometry.type === "GeometryCollection") {
	        geom.geometries = geometry.geometries.map((g) => {
	            return cloneGeometry(g);
	        });
	        return geom;
	    }
	    geom.coordinates = deepSlice(geometry.coordinates);
	    return geom;
	}
	/**
	 * Deep Slice coordinates
	 *
	 * @private
	 * @param {Coordinates} coords Coordinates
	 * @returns {Coordinates} all coordinates sliced
	 */
	function deepSlice(coords) {
	    const cloned = coords;
	    if (typeof cloned[0] !== "object") {
	        return cloned.slice();
	    }
	    return cloned.map((coord) => {
	        return deepSlice(coord);
	    });
	}

	/**
	 * Rotates any geojson Feature or Geometry of a specified angle, around its `centroid` or a given `pivot` point.
	 *
	 * @name transformRotate
	 * @param {GeoJSON} geojson object to be rotated
	 * @param {number} angle of rotation in decimal degrees, positive clockwise
	 * @param {Object} [options={}] Optional parameters
	 * @param {Coord} [options.pivot='centroid'] point around which the rotation will be performed
	 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
	 * @returns {GeoJSON} the rotated GeoJSON feature
	 * @example
	 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
	 * var options = {pivot: [0, 25]};
	 * var rotatedPoly = turf.transformRotate(poly, 10, options);
	 *
	 * //addToMap
	 * var addToMap = [poly, rotatedPoly];
	 * rotatedPoly.properties = {stroke: '#F00', 'stroke-width': 4};
	 */
	function transformRotate(geojson, angle, options) {
	  // Optional parameters
	  options = options || {};
	  if (!isObject(options)) throw new Error("options is invalid");
	  var pivot = options.pivot;
	  var mutate = options.mutate;

	  // Input validation
	  if (!geojson) throw new Error("geojson is required");
	  if (angle === undefined || angle === null || isNaN(angle))
	    throw new Error("angle is required");

	  // Shortcut no-rotation
	  if (angle === 0) return geojson;

	  // Use centroid of GeoJSON if pivot is not provided
	  if (!pivot) pivot = centroid(geojson);

	  // Clone geojson to avoid side effects
	  if (mutate === false || mutate === undefined) geojson = clone(geojson);

	  // Rotate each coordinate
	  coordEach(geojson, function (pointCoords) {
	    var initialAngle = rhumbBearing(pivot, pointCoords);
	    var finalAngle = initialAngle + angle;
	    var distance = rhumbDistance(pivot, pointCoords);
	    var newCoords = getCoords(rhumbDestination(pivot, distance, finalAngle));
	    pointCoords[0] = newCoords[0];
	    pointCoords[1] = newCoords[1];
	  });
	  return geojson;
	}

	// http://en.wikipedia.org/wiki/Haversine_formula
	// http://www.movable-type.co.uk/scripts/latlong.html
	/**
	 * Takes two {@link Point|points} and finds the geographic bearing between them,
	 * i.e. the angle measured in degrees from the north line (0 degrees)
	 *
	 * @name bearing
	 * @param {Coord} start starting Point
	 * @param {Coord} end ending Point
	 * @param {Object} [options={}] Optional parameters
	 * @param {boolean} [options.final=false] calculates the final bearing if true
	 * @returns {number} bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)
	 * @example
	 * var point1 = turf.point([-75.343, 39.984]);
	 * var point2 = turf.point([-75.534, 39.123]);
	 *
	 * var bearing = turf.bearing(point1, point2);
	 *
	 * //addToMap
	 * var addToMap = [point1, point2]
	 * point1.properties['marker-color'] = '#f00'
	 * point2.properties['marker-color'] = '#0f0'
	 * point1.properties.bearing = bearing
	 */
	function bearing(start, end, options = {}) {
	    // Reverse calculation
	    if (options.final === true) {
	        return calculateFinalBearing(start, end);
	    }
	    const coordinates1 = getCoord(start);
	    const coordinates2 = getCoord(end);
	    const lon1 = degreesToRadians(coordinates1[0]);
	    const lon2 = degreesToRadians(coordinates2[0]);
	    const lat1 = degreesToRadians(coordinates1[1]);
	    const lat2 = degreesToRadians(coordinates2[1]);
	    const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
	    const b = Math.cos(lat1) * Math.sin(lat2) -
	        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
	    return radiansToDegrees(Math.atan2(a, b));
	}
	/**
	 * Calculates Final Bearing
	 *
	 * @private
	 * @param {Coord} start starting Point
	 * @param {Coord} end ending Point
	 * @returns {number} bearing
	 */
	function calculateFinalBearing(start, end) {
	    // Swap start & end
	    let bear = bearing(end, start);
	    bear = (bear + 180) % 360;
	    return bear;
	}

	class Rotate {
		/**
	   * @param {import('mapbox-gl').Map} map
	   * @param {import('../raster').Raster} raster
	   * @param {(coordinates: [number, number][]) => void} onUpdate
	   */
		constructor(map, raster, onUpdate) {
			this.map = map;
			this.raster = raster;
			this.onUpdate = onUpdate;
			/** @type { [number, number] | null } */
			this.centroid = null;
			/** @type { [number, number] | null } */
			this.startPoint = null;
			this.map.addLayer(this.raster.knobsLayer);
			this.map.on('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
			this.map.on('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
			this.map.on('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
		}

		get id() {
			return 'rotate';
		}

		onPointerEnter = () => {
			this.map.getCanvas().style.cursor = 'pointer';
		};

		onPointerLeave = () => {
			this.map.getCanvas().style.cursor = '';
		};

		/**
	   * @param {import('mapbox-gl').MapLayerMouseEvent} event
	   */
		onPointerDown = (event) => {
			event.preventDefault();
			const geojson = this.raster.polygonSource.source.data;
			this.centroid = /** @type {[number, number]} */ (centroid(geojson).geometry.coordinates);
			this.startPoint = [event.lngLat.lng, event.lngLat.lat];
			this.map.on('mousemove', this.onPointerMove);
			document.addEventListener('pointerup', this.onPointerUp, { once: true });
		};

		/**
		 * @param {import('mapbox-gl').MapMouseEvent} event
		 */
		onPointerMove = (event) => {
			if (!this.centroid) throw Error('centroid is undefined');
			if (!this.startPoint) throw Error('previous position is undefined');
			/** @type {[number, number]} */
			const currentPosition = [event.lngLat.lng, event.lngLat.lat];
			const azimuthA = bearingToAzimuth(bearing(this.startPoint, this.centroid));
			const azimuthB = bearingToAzimuth(bearing(currentPosition, this.centroid));
			const delta = azimuthB - azimuthA;
			const geojson = this.raster.polygonSource.source.data;
			const transformed = transformRotate(geojson, delta);
			const position = /** @type {[number, number][]} */ (transformed.geometry.coordinates[0]);
			this.onUpdate(position.slice(0, 4));
			this.startPoint = currentPosition;
		};

		onPointerUp = () => {
			this.map.getCanvas().style.cursor = 'pointer';
			this.map.off('mousemove', this.onPointerMove);
		};

		destroy() {
			this.centroid = null;
			this.startPoint = null;
			this.map.off('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
			this.map.off('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
			this.map.off('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
			this.map.off('mousemove', this.onPointerMove);
			this.map.removeLayer(this.raster.knobsLayer.id);
			document.removeEventListener('pointerup', this.onPointerUp);
		}
	}

	/**
	 * Calculates the bounding box for any GeoJSON object, including FeatureCollection.
	 * Uses geojson.bbox if available and options.recompute is not set.
	 *
	 * @name bbox
	 * @param {GeoJSON} geojson any GeoJSON object
	 * @param {Object} [options={}] Optional parameters
	 * @param {boolean} [options.recompute] Whether to ignore an existing bbox property on geojson
	 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
	 * @example
	 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
	 * var bbox = turf.bbox(line);
	 * var bboxPolygon = turf.bboxPolygon(bbox);
	 *
	 * //addToMap
	 * var addToMap = [line, bboxPolygon]
	 */
	function bbox(geojson, options = {}) {
	    if (geojson.bbox != null && true !== options.recompute) {
	        return geojson.bbox;
	    }
	    const result = [Infinity, Infinity, -Infinity, -Infinity];
	    coordEach(geojson, (coord) => {
	        if (result[0] > coord[0]) {
	            result[0] = coord[0];
	        }
	        if (result[1] > coord[1]) {
	            result[1] = coord[1];
	        }
	        if (result[2] < coord[0]) {
	            result[2] = coord[0];
	        }
	        if (result[3] < coord[1]) {
	            result[3] = coord[1];
	        }
	    });
	    return result;
	}
	bbox["default"] = bbox;

	/**
	 * Takes a {@link Feature} or {@link FeatureCollection} and returns the absolute center point of all features.
	 *
	 * @name center
	 * @param {GeoJSON} geojson GeoJSON to be centered
	 * @param {Object} [options={}] Optional parameters
	 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
	 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
	 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
	 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
	 * @example
	 * var features = turf.points([
	 *   [-97.522259, 35.4691],
	 *   [-97.502754, 35.463455],
	 *   [-97.508269, 35.463245]
	 * ]);
	 *
	 * var center = turf.center(features);
	 *
	 * //addToMap
	 * var addToMap = [features, center]
	 * center.properties['marker-size'] = 'large';
	 * center.properties['marker-color'] = '#000';
	 */
	function center(geojson, options = {}) {
	    const ext = bbox(geojson);
	    const x = (ext[0] + ext[2]) / 2;
	    const y = (ext[1] + ext[3]) / 2;
	    return point([x, y], options.properties, options);
	}

	/**
	 * Scale a GeoJSON from a given point by a factor of scaling (ex: factor=2 would make the GeoJSON 200% larger).
	 * If a FeatureCollection is provided, the origin point will be calculated based on each individual Feature.
	 *
	 * @name transformScale
	 * @param {GeoJSON} geojson GeoJSON to be scaled
	 * @param {number} factor of scaling, positive values greater than 0. Numbers between 0 and 1 will shrink the geojson, numbers greater than 1 will expand it, a factor of 1 will not change the geojson.
	 * @param {Object} [options={}] Optional parameters
	 * @param {string|Coord} [options.origin='centroid'] Point from which the scaling will occur (string options: sw/se/nw/ne/center/centroid)
	 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
	 * @returns {GeoJSON} scaled GeoJSON
	 * @example
	 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
	 * var scaledPoly = turf.transformScale(poly, 3);
	 *
	 * //addToMap
	 * var addToMap = [poly, scaledPoly];
	 * scaledPoly.properties = {stroke: '#F00', 'stroke-width': 4};
	 */
	function transformScale(geojson, factor, options) {
	  // Optional parameters
	  options = options || {};
	  if (!isObject(options)) throw new Error("options is invalid");
	  var origin = options.origin;
	  var mutate = options.mutate;

	  // Input validation
	  if (!geojson) throw new Error("geojson required");
	  if (typeof factor !== "number" || factor <= 0)
	    throw new Error("invalid factor");
	  var originIsPoint = Array.isArray(origin) || typeof origin === "object";

	  // Clone geojson to avoid side effects
	  if (mutate !== true) geojson = clone(geojson);

	  // Scale each Feature separately
	  if (geojson.type === "FeatureCollection" && !originIsPoint) {
	    featureEach(geojson, function (feature, index) {
	      geojson.features[index] = scale$1(feature, factor, origin);
	    });
	    return geojson;
	  }
	  // Scale Feature/Geometry
	  return scale$1(geojson, factor, origin);
	}

	/**
	 * Scale Feature/Geometry
	 *
	 * @private
	 * @param {Feature|Geometry} feature GeoJSON Feature/Geometry
	 * @param {number} factor of scaling, positive or negative values greater than 0
	 * @param {string|Coord} [origin="centroid"] Point from which the scaling will occur (string options: sw/se/nw/ne/center/centroid)
	 * @returns {Feature|Geometry} scaled GeoJSON Feature/Geometry
	 */
	function scale$1(feature, factor, origin) {
	  // Default params
	  var isPoint = getType(feature) === "Point";
	  origin = defineOrigin(feature, origin);

	  // Shortcut no-scaling
	  if (factor === 1 || isPoint) return feature;

	  // Scale each coordinate
	  coordEach(feature, function (coord) {
	    var originalDistance = rhumbDistance(origin, coord);
	    var bearing = rhumbBearing(origin, coord);
	    var newDistance = originalDistance * factor;
	    var newCoord = getCoords(rhumbDestination(origin, newDistance, bearing));
	    coord[0] = newCoord[0];
	    coord[1] = newCoord[1];
	    if (coord.length === 3) coord[2] *= factor;
	  });

	  delete feature.bbox;

	  return feature;
	}

	/**
	 * Define Origin
	 *
	 * @private
	 * @param {GeoJSON} geojson GeoJSON
	 * @param {string|Coord} origin sw/se/nw/ne/center/centroid
	 * @returns {Feature<Point>} Point origin
	 */
	function defineOrigin(geojson, origin) {
	  // Default params
	  if (origin === undefined || origin === null) origin = "centroid";

	  // Input Coord
	  if (Array.isArray(origin) || typeof origin === "object")
	    return getCoord(origin);

	  // Define BBox
	  var bbox$1 = geojson.bbox
	    ? geojson.bbox
	    : bbox(geojson, { recalculate: true });
	  var west = bbox$1[0];
	  var south = bbox$1[1];
	  var east = bbox$1[2];
	  var north = bbox$1[3];

	  switch (origin) {
	    case "sw":
	    case "southwest":
	    case "westsouth":
	    case "bottomleft":
	      return point([west, south]);
	    case "se":
	    case "southeast":
	    case "eastsouth":
	    case "bottomright":
	      return point([east, south]);
	    case "nw":
	    case "northwest":
	    case "westnorth":
	    case "topleft":
	      return point([west, north]);
	    case "ne":
	    case "northeast":
	    case "eastnorth":
	    case "topright":
	      return point([east, north]);
	    case "center":
	      return center(geojson);
	    case undefined:
	    case null:
	    case "centroid":
	      return centroid(geojson);
	    default:
	      throw new Error("invalid origin");
	  }
	}

	class Scale {
		/**
		 * @param {import('mapbox-gl').Map} map
		 * @param {import('../raster').Raster} raster
		 * @param {(coordinates: [number, number][]) => void} onUpdate
		 */
		constructor(map, raster, onUpdate) {
			this.map = map;
			this.raster = raster;
			this.onUpdate = onUpdate;
			/** @type { number | null } */
			this.knobIndex = null;
			this.map.addLayer(this.raster.knobsLayer);
			this.map.on('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
			this.map.on('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
			this.map.on('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
		}

		get id() {
			return 'scale';
		}

		/**
	   * @param {import('mapbox-gl').MapLayerMouseEvent} event
	   */
		onPointerEnter = (event) => {
			if (!event.features) return;
			this.map.getCanvas().style.cursor = 'pointer';
		};

		onPointerLeave = () => {
			this.map.getCanvas().style.cursor = '';
		};

		/**
	   * @param {import('mapbox-gl').MapLayerMouseEvent} event
	   */
		onPointerDown = (event) => {
			event.preventDefault();
			if (!event.features) return;
			this.map.getCanvas().style.cursor = 'grabbing';
			this.knobIndex = event.features[0].properties?.index;
			this.map.on('mousemove', this.onPointerMove);
			document.addEventListener('pointerup', this.onPointerUp, { once: true });
		};

		/**
	   * @param {import('mapbox-gl').MapMouseEvent} event
	   */
		onPointerMove = (event) => {
			if (typeof this.knobIndex !== 'number') throw Error('knob index is undefined');
			const index0 = (this.knobIndex + 2) % 4;
			const point0 = this.raster.coordinates[index0];
			const pointA = this.raster.coordinates[this.knobIndex];
			const pointB = [event.lngLat.lng, event.lngLat.lat];
			const distA0 = rhumbDistance(pointA, point0);
			const distB0 = rhumbDistance(pointB, point0);
			const scale = distB0 / distA0;
			const geojson = this.raster.polygonSource.source.data;
			const transformed = transformScale(geojson, scale, { origin: point0 });
			const position = /** @type {[number, number][]} */ (transformed.geometry.coordinates[0]);
			this.onUpdate(position.slice(0, 4));
		};

		onPointerUp = () => {
			this.map.getCanvas().style.cursor = '';
			this.map.off('mousemove', this.onPointerMove);
		};

		destroy() {
			this.map.off('mouseenter', this.raster.knobsLayer.id, this.onPointerEnter);
			this.map.off('mouseleave', this.raster.knobsLayer.id, this.onPointerLeave);
			this.map.off('mousedown', this.raster.knobsLayer.id, this.onPointerDown);
			this.map.off('mousemove', this.onPointerMove);
			this.map.removeLayer(this.raster.knobsLayer.id);
			document.removeEventListener('pointerup', this.onPointerUp);
		}
	}

	/**
	 * Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line
	 * on the provided direction angle.
	 *
	 * @name transformTranslate
	 * @param {GeoJSON} geojson object to be translated
	 * @param {number} distance length of the motion; negative values determine motion in opposite direction
	 * @param {number} direction of the motion; angle from North in decimal degrees, positive clockwise
	 * @param {Object} [options={}] Optional parameters
	 * @param {string} [options.units='kilometers'] in which `distance` will be express; miles, kilometers, degrees, or radians
	 * @param {number} [options.zTranslation=0] length of the vertical motion, same unit of distance
	 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
	 * @returns {GeoJSON} the translated GeoJSON object
	 * @example
	 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
	 * var translatedPoly = turf.transformTranslate(poly, 100, 35);
	 *
	 * //addToMap
	 * var addToMap = [poly, translatedPoly];
	 * translatedPoly.properties = {stroke: '#F00', 'stroke-width': 4};
	 */
	function transformTranslate(geojson, distance, direction, options) {
	  // Optional parameters
	  options = options || {};
	  if (!isObject(options)) throw new Error("options is invalid");
	  var units = options.units;
	  var zTranslation = options.zTranslation;
	  var mutate = options.mutate;

	  // Input validation
	  if (!geojson) throw new Error("geojson is required");
	  if (distance === undefined || distance === null || isNaN(distance))
	    throw new Error("distance is required");
	  if (zTranslation && typeof zTranslation !== "number" && isNaN(zTranslation))
	    throw new Error("zTranslation is not a number");

	  // Shortcut no-motion
	  zTranslation = zTranslation !== undefined ? zTranslation : 0;
	  if (distance === 0 && zTranslation === 0) return geojson;

	  if (direction === undefined || direction === null || isNaN(direction))
	    throw new Error("direction is required");

	  // Invert with negative distances
	  if (distance < 0) {
	    distance = -distance;
	    direction = direction + 180;
	  }

	  // Clone geojson to avoid side effects
	  if (mutate === false || mutate === undefined) geojson = clone(geojson);

	  // Translate each coordinate
	  coordEach(geojson, function (pointCoords) {
	    var newCoords = getCoords(
	      rhumbDestination(pointCoords, distance, direction, { units: units })
	    );
	    pointCoords[0] = newCoords[0];
	    pointCoords[1] = newCoords[1];
	    if (zTranslation && pointCoords.length === 3)
	      pointCoords[2] += zTranslation;
	  });
	  return geojson;
	}

	class Move {
		/**
		 * @param {import('mapbox-gl').Map} map
		 * @param {import('../raster').Raster} raster
		 * @param {(coordinates: [number, number][]) => void} onUpdate
		 */
		constructor(map, raster, onUpdate) {
			this.map = map;
			this.raster = raster;
			this.onUpdate = onUpdate;
			/** @type { [number, number] | null } */
			this.prevPosition = null;
			this.map.on('mouseenter', this.raster.fillLayer.id, this.onPointerEnter);
			this.map.on('mouseleave', this.raster.fillLayer.id, this.onPointerLeave);
			this.map.on('mousedown', this.raster.fillLayer.id, this.onPointerDown);
		}

		get id() {
			return 'move';
		}

		onPointerEnter = () => {
			this.map.getCanvas().style.cursor = 'move';
		};

		onPointerLeave = () => {
			this.map.getCanvas().style.cursor = '';
		};

		/**
	   * @param {import('mapbox-gl').MapLayerMouseEvent} event
	   */
		onPointerDown = (event) => {
			event.preventDefault();
			this.prevPosition = [event.lngLat.lng, event.lngLat.lat];
			this.map.on('mousemove', this.onPointerMove);
			this.map.getCanvas().style.cursor = 'grabbing';
			document.addEventListener('pointerup', this.onPointerUp, { once: true });
		};

		/**
		 * @param {import('mapbox-gl').MapMouseEvent} event
		 */
		onPointerMove = (event) => {
			if (!this.prevPosition) throw Error('previous position is undefined');
			/** @type {[number, number]} */
			const currentPosition = [event.lngLat.lng, event.lngLat.lat];
			const bearingBetween = rhumbBearing(this.prevPosition, currentPosition);
			const distanceBetween = rhumbDistance(this.prevPosition, currentPosition);
			const geojson = this.raster.polygonSource.source.data;
			const transformed = transformTranslate(geojson, distanceBetween, bearingBetween);
			const position = /** @type {[number, number][]} */ (transformed.geometry.coordinates[0]);
			this.onUpdate(position.slice(0, 4));
			this.prevPosition = currentPosition;
		};

		onPointerUp = () => {
			this.map.getCanvas().style.cursor = 'move';
			this.map.off('mousemove', this.onPointerMove);
		};

		destroy() {
			this.prevPosition = null;
			this.map.getCanvas().style.cursor = '';
			this.map.off('mouseenter', this.raster.fillLayer.id, this.onPointerEnter);
			this.map.off('mouseleave', this.raster.fillLayer.id, this.onPointerLeave);
			this.map.off('mousedown', this.raster.fillLayer.id, this.onPointerDown);
			this.map.off('mousemove', this.onPointerMove);
			document.removeEventListener('pointerup', this.onPointerUp);
		}
	}

	class Raster {
		/**
		 * @param {HTMLImageElement} image
		 * @param {[number, number][]} coordinates
		 */
		constructor(image, coordinates) {
			this.src = image.src;
			this.width = image.width;
			this.height = image.height;
			this.coordinates = coordinates;
		}

		get id() {
			const id = this.src.split('/').pop();
			if (!id) throw Error(`can't get id from '${this.src}' source`);
			return id;
		}

		/**
		 * @type {{
		 * 	id: string,
		 * 	source: import('mapbox-gl').ImageSourceRaw
		 * }}
		 */
		get rasterSource() {
			return {
				id: `$raster:${this.id}`,
				source: {
					type: 'image',
					url: this.src,
					coordinates: this.coordinates,
				},
			};
		}

		/**
		 * @type {{
		 * 	id: string,
		 * 	source: {
		 * 		type: 'geojson',
		 * 		data: import('geojson').Feature<import('geojson').Polygon>
		 * 	}
		 * }}
		 */
		get polygonSource() {
			const feature = polygon$1([[...this.coordinates, this.coordinates[0]]], { id: this.id });
			return {
				id: `$polygon:${this.id}`,
				source: {
					type: 'geojson',
					data: feature,
				},
			};
		}

		/**
		 * @type {{
		 * 	id: string,
		 * 	source: {
		 * 		type: 'geojson',
		 * 		data: import('geojson').FeatureCollection<import('geojson').Point>
		 * 	}
		 * }}
		 */
		get pointsSource() {
			const features = this.coordinates.map((coordinate, index) => point(coordinate, { index }));
			return {
				id: `$points:${this.id}`,
				source: {
					type: 'geojson',
					data: featureCollection(features),
				},
			};
		}

		/** @type {import('mapbox-gl').RasterLayer} */
		get rasterLayer() {
			return {
				id: `$raster:${this.id}`,
				type: 'raster',
				source: this.rasterSource.id,
				paint: {
					'raster-fade-duration': 0,
					'raster-opacity': 0.7,
				},
			};
		}

		/** @type {import('mapbox-gl').FillLayer} */
		get fillLayer() {
			return {
				id: `$fill:${this.id}`,
				type: 'fill',
				source: this.polygonSource.id,
				paint: {
					'fill-opacity': 0,
				},
			};
		}

		/** @type {import('mapbox-gl').LineLayer} */
		get contourLayer() {
			return {
				id: `$contour:${this.id}`,
				type: 'line',
				source: this.polygonSource.id,
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-dasharray': [0.2, 2],
					'line-color': 'rgb(61, 90, 254)',
					'line-width': [
						'interpolate', ['linear'], ['zoom'],
						12, 1,
						14, 2,
					],
				},
			};
		}

		/** @type {import('mapbox-gl').CircleLayer} */
		get knobsLayer() {
			return {
				id: `$knobs:${this.id}`,
				type: 'circle',
				source: this.pointsSource.id,
				paint: {
					'circle-radius': 5,
					'circle-color': 'rgb(61, 90, 254)',
					'circle-stroke-width': 3,
					'circle-stroke-color': '#fff',
				},
			};
		}
	}

	const image$1 = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
</svg>
`);

	const move = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
</svg>
`);

	const scale = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <rect fill="none" height="24" width="24"/>
    <polygon points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71"/>
</svg>
`);

	const rotate = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
</svg>
`);

	const icons$4 = {
		move,
		image: image$1,
		scale,
		rotate,
	};

	class ImageControl {
		constructor() {
			this.container = controlContainer('mapbox-ctrl-image');
			this.fileInput = createFileInput();
			this.buttonAdd = controlButton({
				title: 'Add image',
				icon: icons$4.image,
				className: 'mapbox-ctrl-image-add',
				onClick: () => this.fileInput.click(),
			});
			this.buttonMove = controlButton({
				disabled: true,
				title: 'Move image',
				icon: icons$4.move,
				onClick: () => this.setMode('move'),
			});
			this.buttonScale = controlButton({
				disabled: true,
				title: 'Scale image',
				icon: icons$4.scale,
				onClick: () => this.setMode('scale'),
			});
			this.buttonRotate = controlButton({
				disabled: true,
				title: 'Rotate image',
				icon: icons$4.rotate,
				onClick: () => this.setMode('rotate'),
			});
			/** @type {Record<string, Raster>} */
			this.rasters = {};
			/** @type {Raster | null} */
			this.currentRaster = null;
			/** @type {Move | Scale | Rotate | null} */
			this.currentMode = null;
		}

		/**
	   * @param {File} file
		 * @param {[number, number][]=} coordinates
	   */
		async addFile(file, coordinates) {
			const image = await readFile(file);
			this.addImage(image, coordinates);
		}

		/**
		 * @param {string} url
		 * @param {[number, number][]=} coordinates
		 */
		async addUrl(url, coordinates) {
			const image = await readUrl(url);
			this.addImage(image, coordinates);
		}

		/**
		 * @param {HTMLImageElement} image
		 * @param {[number, number][]=} coordinates
		 */
		async addImage(image, coordinates) {
			if (!this.map) throw Error('map is undefined');
			const position = coordinates ?? centerPosition(image, this.map);
			const raster = new Raster(image, position);
			this.rasters[raster.id] = raster;
			this.addRaster(raster);
		}

		/**
	   * @param {Raster} raster
	   */
		addRaster(raster) {
			if (!this.map) throw Error('map is undefined');
			this.map.addSource(raster.rasterSource.id, raster.rasterSource.source);
			this.map.addSource(raster.polygonSource.id, raster.polygonSource.source);
			this.map.addSource(raster.pointsSource.id, raster.pointsSource.source);
			this.map.addLayer(raster.rasterLayer);
			this.map.addLayer(raster.fillLayer);
		}

		/**
	   * @param {string} id
	   */
		selectRaster(id) {
			if (!this.map) throw Error('map is undefined');
			this.deselectRaster();
			this.currentRaster = this.rasters[id];
			this.map.addLayer(this.currentRaster.contourLayer);
			this.buttonMove.disabled = false;
			this.buttonScale.disabled = false;
			this.buttonRotate.disabled = false;
			this.map.fire('image.select', { id: this.currentRaster.id });
		}

		deselectRaster() {
			if (!this.map) throw Error('map is undefined');
			if (!this.currentRaster) return;
			this.map.removeLayer(this.currentRaster.contourLayer.id);
			this.map.fire('image.deselect', { id: this.currentRaster.id });
			this.setMode(null);
			this.currentRaster = null;
			this.buttonMove.disabled = true;
			this.buttonScale.disabled = true;
			this.buttonRotate.disabled = true;
		}

		/**
	   * @param {'move' | 'scale' | 'rotate' | null} mode
	   */
		setMode(mode) {
			if (!this.map) throw Error('map is undefined');
			if (!this.currentRaster) throw Error('no raster is selected');
			if (this.currentMode) {
				const currentId = this.currentMode.id;
				this.buttonMove.classList.remove('-active');
				this.buttonScale.classList.remove('-active');
				this.buttonRotate.classList.remove('-active');
				this.currentMode.destroy();
				this.currentMode = null;
				this.map.fire('image.mode', { mode: this.currentMode });
				// click on active button just deactivates current mode
				if (currentId === mode) return;
			}
			if (mode === 'move') {
				this.buttonMove.classList.add('-active');
				this.currentMode = new Move(this.map, this.currentRaster, (coordinates) => {
					this.updateCoordinates(coordinates);
				});
			}
			if (mode === 'scale') {
				this.buttonScale.classList.add('-active');
				this.currentMode = new Scale(this.map, this.currentRaster, (coordinates) => {
					this.updateCoordinates(coordinates);
				});
			}
			if (mode === 'rotate') {
				this.buttonRotate.classList.add('-active');
				this.currentMode = new Rotate(this.map, this.currentRaster, (coordinates) => {
					this.updateCoordinates(coordinates);
				});
			}
			if (this.currentMode) {
				this.map.fire('image.mode', { mode: this.currentMode.id });
			}
		}

		/**
		 * @typedef {import('mapbox-gl').ImageSource} ImageSource
		 * @typedef {import('mapbox-gl').GeoJSONSource} GeoJSONSource
		 * @param {[number, number][]} coordinates
		 */
		updateCoordinates(coordinates) {
			if (!this.map) throw Error('map is undefined');
			if (!this.currentRaster) throw Error('no raster is selected');
			const raster = this.currentRaster;
			raster.coordinates = coordinates;
			const rasterSource = /** @type {ImageSource} */ (this.map.getSource(raster.rasterSource.id));
			const polygonSource = /** @type {GeoJSONSource} */ (this.map.getSource(raster.polygonSource.id));
			const pointsSource = /** @type {GeoJSONSource} */ (this.map.getSource(raster.pointsSource.id));
			rasterSource.setCoordinates(raster.coordinates);
			polygonSource.setData(raster.polygonSource.source.data);
			pointsSource.setData(raster.pointsSource.source.data);
			this.map.fire('image.update', { coordinates });
		}

		/**
	   * @param {import('mapbox-gl').MapMouseEvent} event
	   */
		onMapClick = (event) => {
			if (!this.map) throw Error('map is undefined');
			const layersId = Object.values(this.rasters).map((i) => i.fillLayer.id);
			const features = this.map.queryRenderedFeatures(event.point, { layers: layersId });
			if (features[0]) {
				/** @type {string} */
				const id = features[0].properties?.id;
				if (!id) throw Error('id property is undefined');
				this.selectRaster(id);
				return;
			}
			if (this.currentRaster) {
				// add extra padding to not deselect raster on it's knobs layer click
				let padding = 0;
				if (typeof this.currentRaster.knobsLayer.paint?.['circle-radius'] === 'number') {
					padding = this.currentRaster.knobsLayer.paint['circle-radius'] * 2;
				}
				const { x, y } = event.point;
				/** @type {[[number, number], [number, number]]} */
				const bbox = [[x - padding, y - padding], [x + padding, y + padding]];
				const features = this.map.queryRenderedFeatures(bbox, { layers: layersId });
				if (!features.length) {
					this.deselectRaster();
				}
			}
		};

		/**
	   * @param {import('mapbox-gl').Map} map
	   * @returns {HTMLElement}
	   */
		onAdd(map) {
			this.map = map;
			this.container.appendChild(this.fileInput);
			this.container.appendChild(this.buttonAdd);
			this.container.appendChild(this.buttonMove);
			this.container.appendChild(this.buttonScale);
			this.container.appendChild(this.buttonRotate);
			this.fileInput.addEventListener('change', async () => {
				const file = this.fileInput.files?.[0];
				if (!file) return;
				await this.addFile(file);
			});
			this.map.on('click', this.onMapClick);
			return this.container;
		}

		onRemove() {
			this.map?.off('click', this.onMapClick);
			this.container.parentNode?.removeChild(this.container);
		}
	}

	const inspect = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"/>
</svg>
`);

	const icons$3 = {
		inspect,
	};

	/**
	 * @typedef {import('mapbox-gl').MapboxGeoJSONFeature} GeoJSONFeature
	 */

	/**
	 * @param {GeoJSONFeature[]} features
	 * @param {number} current
	 * @returns {string}
	 */
	function html(features, current) {
		const feature = features[current];
		const withProperties = feature.properties && Object.keys(feature.properties).length;
		const properties = feature.properties || {};

		return (`
    <header>
      ${features.length > 1 ? '<button data-prev>←</button>' : ''}
      <nav>
        ${current + 1} / ${features.length}
      </nav>
      ${features.length > 1 ? '<button data-next>→</button>' : ''}
    </header>
    <table>
      ${feature.id ? (`
        <tr>
          <th>$id</th>
          <td>${feature.id}</td>
        </tr>  
      `) : ''}
      <tr>
        <td colspan="2">layer</td>
      </tr>
      <tr>
        <th>id</th>
        <td>${feature.layer.id}</td>
      </tr>
      <tr>
        <th>type</th>
        <td>${feature.layer.type}</td>
      </tr>
      <tr>
        <th>source</th>
        <td>${feature.layer.source}</td>
      </tr>
      <tr>
        <th>source-layer</th>
        <td>${feature.layer['source-layer'] ?? '-'}</td>
      </tr>
      ${withProperties ? (`
        <tr>
          <td colspan="2">properties</td>
        </tr>
      `) : ''}
      ${withProperties ? Object.entries(properties).map(([key, value]) => (`
        <tr>
          <th>${key}</th>
          <td>${value}</td>
        </tr>  
      `)).join('') : ''}
    </table>
  `);
	}

	/**
	 * @param {GeoJSONFeature[]} features
	 * @returns {HTMLDivElement}
	 */
	function popup(features) {
		const node = document.createElement('div');
		let current = 0;
		node.classList.add('mapbox-ctrl-inspect-popup');

		if (!features.length) {
			node.textContent = 'No features';
			return node;
		}

		node.innerHTML = html(features, current);

		node.addEventListener('click', (event) => {
			const target = /** @type {HTMLElement} */(event.target);
			if (target.matches('[data-prev]')) {
				const isFirst = current === 0;
				current = isFirst ? features.length - 1 : current - 1;
			} else if (target.matches('[data-next]')) {
				const isLast = current === features.length - 1;
				current = isLast ? 0 : current + 1;
			}
			node.innerHTML = '';
			node.innerHTML = html(features, current);
		});

		return node;
	}

	/**
	 * @typedef {{
	* 	console?: boolean
	* }} InspectControlOptions
	*/

	class InspectControl {
		/** @param {InspectControlOptions} options */
		constructor(options = {}) {
			this.options = { ...options };
			this.container = controlContainer('mapbox-ctrl-inspect');
			this.button = controlButton({
				title: 'Inspect',
				icon: icons$3.inspect,
				onClick: () => this.onControlButtonClick(),
			});
			this.isActive = false;
		}

		onControlButtonClick() {
			if (this.isActive) {
				this.deactivate();
			} else {
				this.activate();
			}
		}

		activate() {
			if (!this.map) throw Error('map is undefined');
			this.isActive = true;
			this.button.classList.add('-active');
			this.map.on('click', this.mapClickListener);
			this.map.on('move', this.updatePosition);
			this.map.getCanvas().style.cursor = 'pointer';
		}

		deactivate() {
			if (!this.map) throw Error('map is undefined');
			this.isActive = false;
			this.button.classList.remove('-active');
			this.map.off('click', this.mapClickListener);
			this.map.off('move', this.updatePosition);
			this.map.getCanvas().style.cursor = '';
			this.hideDetails();
		}

		/** @param {import('mapbox-gl').Point} point */
		getPointFeatures(point) {
			if (!this.map) throw Error('map is undefined');
			const selectThreshold = 3;

			/** @type {[[number, number], [number, number]]} */
			const queryBox = [
				[point.x - selectThreshold, point.y + selectThreshold], // bottom left (SW)
				[point.x + selectThreshold, point.y - selectThreshold], // top right (NE)
			];

			return this.map.queryRenderedFeatures(queryBox);
		}

		/** @param {import('mapbox-gl').MapboxGeoJSONFeature[]} features */
		showDetails(features) {
			if (!this.map) throw Error('map is undefined');
			this.detailsNode = popup(features);
			this.map.getContainer().appendChild(this.detailsNode);
			this.updatePosition();
			if (this.options.console) {
				console.log(features);
			}
		}

		hideDetails() {
			if (!this.map) throw Error('map is undefined');
			if (!this.detailsNode) return;
			this.map.getContainer().removeChild(this.detailsNode);
			this.detailsNode = undefined;
		}

		updatePosition = () => {
			if (!this.map) throw Error('map is undefined');
			if (!this.lngLat) return;
			if (!this.detailsNode) return;
			const canvasRect = this.map.getCanvas().getBoundingClientRect();
			const pos = this.map.project(this.lngLat);
			this.detailsNode.style.left = `${pos.x - canvasRect.left}px`;
			this.detailsNode.style.top = `${pos.y - canvasRect.top}px`;
		};

		/** @param {import('mapbox-gl').MapMouseEvent} event */
		mapClickListener = (event) => {
			this.lngLat = event.lngLat;
			const features = this.getPointFeatures(event.point);
			this.hideDetails();
			this.showDetails(features);
		};

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			this.container.appendChild(this.button);
			return this.container;
		}

		onRemove() {
			this.deactivate();
			this.container.parentNode?.removeChild(this.container);
		}
	}

	/** @typedef {import('mapbox-gl').StyleFunction} StyleFunction */
	/** @typedef {import('mapbox-gl').Expression} Expression */
	/** @typedef {string | StyleFunction | Expression} TextField */

	/**
	 * @typedef {{
	 * 	supportedLanguages?: string[]
	 * 	language?: string
	 * 	getLanguageKey?: (language: string) => string
	 * 	excludedLayerIds?: string[]
	 * }} LanguageControlOptions
	 */

	const defaults$2 = {
		// Supported languages: https://docs.mapbox.com/help/troubleshooting/change-language/
		supportedLanguages: ['en', 'es', 'fr', 'de', 'ru', 'zh', 'pt', 'ar', 'ja', 'ko', 'mul'],
		getLanguageKey: (/** @type {string} */ language) => (language === 'mul' ? 'name' : `name_${language}`),
		excludedLayerIds: [],
	};

	class LanguageControl {
		/** @param {LanguageControlOptions} options */
		constructor(options = {}) {
			this.options = { ...defaults$2, ...options };
			this.container = document.createElement('div');
		}

		styleChangeListener = () => {
			if (!this.map) throw Error('map is undefined');
			this.map.off('styledata', this.styleChangeListener);
			this.setLanguage(this.options.language);
		};

		/** @param {string=} lang */
		setLanguage(lang) {
			if (!this.map) throw Error('map is undefined');
			let language = lang || this.browserLanguage();
			if (this.options.supportedLanguages.indexOf(language) < 0) {
				language = 'mul';
			}
			const style = this.map.getStyle();
			if (!style.layers) return;
			const languageKey = this.options.getLanguageKey(language);
			const layers = style.layers.map((layer) => {
				if (layer.type !== 'symbol') return layer;
				if (!layer.layout || !layer.layout['text-field']) return layer;
				if (this.options.excludedLayerIds.indexOf(layer.id) !== -1) return layer;

				const textField = layer.layout['text-field'];
				const textFieldLocalized = this.localizeTextField(textField, languageKey);

				return {
					...layer,
					layout: {
						...layer.layout,
						'text-field': textFieldLocalized,
					},
				};
			});

			this.map.setStyle({ ...style, layers });
		}

		browserLanguage() {
			const language = navigator?.languages[0] ?? navigator.language;
			const parts = language.split('-');
			const languageCode = parts.length > 1 ? parts[0] : language;
			if (this.options.supportedLanguages.indexOf(languageCode) > -1) return languageCode;

			return 'mul';
		}

		/**
	   * @param {TextField} field
	   * @param {string} languageKey
	   * @returns {TextField}
	   */
		localizeTextField(field, languageKey) {
			// string
			if (typeof field === 'string') {
				return field.replace(/{name.*?}/, `{${languageKey}}`);
			}

			const str = JSON.stringify(field);

			// expression
			if (Array.isArray(field)) {
				return JSON.parse(str.replace(
					/"coalesce",\["get","name.*?"]/g,
					`"coalesce",["get","${languageKey}"]`,
				));
			}

			// style function
			return JSON.parse(str.replace(/{name.*?}/g, `{${languageKey}}`));
		}

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			this.map.on('styledata', this.styleChangeListener);
			return this.container;
		}

		onRemove() {
			this.map?.off('styledata', this.styleChangeListener);
			this.container.parentNode?.removeChild(this.container);
		}
	}

	const ruler = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <rect fill="none" height="24" width="24"/>
    <path d="M20,6H4C2.9,6,2,6.9,2,8v8c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,16H4V8h3v3c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1V8h2v3c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V8h2v3c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V8h3V16z"/>
</svg>
`);

	const icons$2 = {
		ruler,
	};

	//http://en.wikipedia.org/wiki/Haversine_formula
	//http://www.movable-type.co.uk/scripts/latlong.html
	/**
	 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
	 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
	 *
	 * @name distance
	 * @param {Coord | Point} from origin point or coordinate
	 * @param {Coord | Point} to destination point or coordinate
	 * @param {Object} [options={}] Optional parameters
	 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
	 * @returns {number} distance between the two points
	 * @example
	 * var from = turf.point([-75.343, 39.984]);
	 * var to = turf.point([-75.534, 39.123]);
	 * var options = {units: 'miles'};
	 *
	 * var distance = turf.distance(from, to, options);
	 *
	 * //addToMap
	 * var addToMap = [from, to];
	 * from.properties.distance = distance;
	 * to.properties.distance = distance;
	 */
	function distance(from, to, options = {}) {
	    var coordinates1 = getCoord(from);
	    var coordinates2 = getCoord(to);
	    var dLat = degreesToRadians(coordinates2[1] - coordinates1[1]);
	    var dLon = degreesToRadians(coordinates2[0] - coordinates1[0]);
	    var lat1 = degreesToRadians(coordinates1[1]);
	    var lat2 = degreesToRadians(coordinates2[1]);
	    var a = Math.pow(Math.sin(dLat / 2), 2) +
	        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	    return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
	}

	/**
	 * @param {number} number
	 */
	function labelFormat(number) {
		return number < 1
			? `${(number * 1000).toFixed()} m`
			: `${number.toFixed(2)} km`;
	}

	/** @type {import('mapbox-gl').LineLayer & { source: string }} */
	const lineLayer = {
		id: 'mapbox-control-ruler-line',
		type: 'line',
		source: 'mapbox-control-ruler-lines',
		layout: {},
		paint: {
			'line-color': '#263238',
			'line-width': 2,
		},
	};

	/** @type {import('mapbox-gl').SymbolLayer & { source: string }} */
	const symbolLayer = {
		id: 'mapbox-control-ruler-symbol',
		type: 'symbol',
		source: 'mapbox-control-ruler-points',
		layout: {
			'text-field': '{text}',
			'text-font': ['Roboto Medium'],
			'text-anchor': 'top',
			'text-size': 12,
			'text-offset': [0, 0.8],
		},
		paint: {
			'text-color': '#263238',
			'text-halo-color': '#fff',
			'text-halo-width': 1,
		},
	};

	/**
	 * @typedef {import('@turf/helpers').Units} Units
	 * @typedef {{
	 *  units?: Units
	 *  labelFormat?: (n: number) => string
	 *  symbolLayout?: import('mapbox-gl').SymbolLayout
	 *  symbolPaint?: import('mapbox-gl').SymbolPaint
	 *  lineLayout?: import('mapbox-gl').LineLayout
	 *  linePaint?: import('mapbox-gl').LinePaint
	 *  markerCSS?: Partial<CSSStyleDeclaration>
	 * 	invisible?: boolean
	 * }} RulerControlOptions
	 */

	/**
	 * @type {{
	 * 	units: Units
	 *  labelFormat: (n: number) => string
	 * }}
	 */
	const defaults$1 = {
		units: 'kilometers',
		labelFormat,
	};

	class RulerControl {
		/**
	   * @param {RulerControlOptions} options
	   */
		constructor(options = {}) {
			this.options = { ...defaults$1, ...options };
			this.container = controlContainer('mapbox-ctrl-ruler');
			this.isActive = false;
			/** @type {[number, number][]} */
			this.coordinates = [];
			/** @type {import('mapbox-gl').Marker[]} */
			this.markers = [];
			/** @type {HTMLButtonElement | null} */
			this.button = null;
			if (!this.options.invisible) {
				this.button = controlButton({
					title: 'Ruler',
					icon: icons$2.ruler,
					onClick: () => this.onControlButtonClick(),
				});
			}
		}

		onControlButtonClick() {
			if (this.isActive) {
				this.deactivate();
			} else {
				this.activate();
			}
		}

		draw = () => {
			if (!this.map) throw Error('map is undefined');

			this.map.addSource(lineLayer.source, {
				type: 'geojson',
				data: this.asLine(),
			});

			this.map.addSource(symbolLayer.source, {
				type: 'geojson',
				data: this.asPoints(),
			});

			this.map.addLayer({
				...lineLayer,
				layout: {
					...lineLayer.layout,
					...this.options.lineLayout,
				},
				paint: {
					...lineLayer.paint,
					...this.options.linePaint,
				},
			});

			this.map.addLayer({
				...symbolLayer,
				layout: {
					...symbolLayer.layout,
					...this.options.symbolLayout,
				},
				paint: {
					...symbolLayer.paint,
					...this.options.symbolPaint,
				},
			});
		};

		activate() {
			if (!this.map) throw Error('map is undefined');
			this.isActive = true;
			this.markers = [];
			this.coordinates = [];
			this.map.getCanvas().style.cursor = 'crosshair';
			this.draw();
			this.map.on('click', this.mapClickListener);
			this.map.on('style.load', this.draw);
			this.map.fire('ruler.on');
			if (this.button) {
				this.button.classList.add('-active');
			}
		}

		deactivate() {
			if (!this.map) throw Error('map is undefined');
			this.isActive = false;
			this.map.getCanvas().style.cursor = '';
			// remove layers, sources and event listeners
			this.map.removeLayer(lineLayer.id);
			this.map.removeLayer(symbolLayer.id);
			this.map.removeSource(lineLayer.source);
			this.map.removeSource(symbolLayer.source);
			this.markers.forEach((m) => m.remove());
			this.map.off('click', this.mapClickListener);
			this.map.off('style.load', this.draw);
			this.map.fire('ruler.off');
			if (this.button) {
				this.button.classList.remove('-active');
			}
		}

		/**
	   * @param {import('mapbox-gl').MapMouseEvent} event
	   */
		mapClickListener = (event) => {
			if (!this.map) throw Error('map is undefined');
			this.addCoordinate([event.lngLat.lng, event.lngLat.lat]);
		};

		/**
		 * @param {[number, number]} coordinate - [lng, lat] of new point
		 */
		addCoordinate(coordinate) {
			if (!this.map) throw Error('map is undefined');
			if (!this.isActive) throw Error('ruler is not active');
			this.coordinates.push(coordinate);
			const markerElement = this.newMarkerElement();
			const marker = new mapboxgl.Marker({ element: markerElement, draggable: true })
				.setLngLat(coordinate)
				.addTo(this.map);
			this.markers.push(marker);
			this.updateSource();
			const markerIndex = this.markers.length - 1;
			marker.on('drag', () => {
				const lngLat = marker.getLngLat();
				this.coordinates[markerIndex] = [lngLat.lng, lngLat.lat];
				this.updateSource();
			});
		}

		updateSource() {
			if (!this.map) throw Error('map is undefined');
			this.map.fire('ruler.change', { coordinates: this.coordinates });
			const lineSource = /** @type {import('mapbox-gl').GeoJSONSource} */(this.map.getSource(lineLayer.source));
			const symbolSource = /** @type {import('mapbox-gl').GeoJSONSource} */(this.map.getSource(symbolLayer.source));
			lineSource.setData(this.asLine());
			symbolSource.setData(this.asPoints());
		}

		newMarkerElement() {
			const node = document.createElement('div');
			node.style.width = '12px';
			node.style.height = '12px';
			node.style.borderRadius = '50%';
			node.style.background = '#fff';
			node.style.boxSizing = 'border-box';
			node.style.border = '2px solid #263238';

			if (this.options.markerCSS) {
				Object.entries(this.options.markerCSS).forEach(([key, value]) => {
					node.style.setProperty(key, String(value));
				});
			}

			return node;
		}

		/**
	   * @returns {import('geojson').Feature<import('geojson').LineString>}
	   */
		asLine() {
			return {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: this.coordinates,
				},
			};
		}

		/**
	   * @returns {import('geojson').FeatureCollection<import('geojson').Point>}
	   */
		asPoints() {
			let sum = 0;
			return {
				type: 'FeatureCollection',
				features: this.coordinates.map((coordinate, index) => {
					if (index > 0) {
						sum += distance(this.coordinates[index - 1], coordinate, { units: this.options.units });
					}
					return {
						type: 'Feature',
						properties: {
							text: this.options.labelFormat(sum),
						},
						geometry: {
							type: 'Point',
							coordinates: coordinate,
						},
					};
				}),
			};
		}

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			if (this.button) {
				this.container.appendChild(this.button);
			}
			return this.container;
		}

		onRemove() {
			if (this.isActive) this.deactivate();
			this.map?.off('click', this.mapClickListener);
			this.container.parentNode?.removeChild(this.container);
		}
	}

	const layers = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="22" width="22">
  <path d="m24 41.5-18-14 2.5-1.85L24 37.7l15.5-12.05L42 27.5Zm0-7.6-18-14 18-14 18 14Zm0-15.05Zm0 11.25 13.1-10.2L24 9.7 10.9 19.9Z"/>
</svg>
`);

	const icons$1 = {
		layers,
	};

	/**
	 * @typedef {{
	 * 	label: string
	 * 	styleName: string
	 * 	styleUrl: string
	 * }} Style
	 *
	 * @typedef {{
	 * 	styles?: Style[]
	 * 	onChange?: (style: Style) => void
	 * 	compact?: boolean
	 * }} StylesControlOptions
	 */

	const defaults = [
		{
			label: 'Streets',
			styleName: 'Mapbox Streets',
			styleUrl: 'mapbox://styles/mapbox/streets-v12',
		}, {
			label: 'Satellite',
			styleName: 'Mapbox Satellite Streets',
			styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v12',
		},
	];

	class StylesControl {
		/** @param {StylesControlOptions} options */
		constructor(options = {}) {
			this.options = { styles: defaults, ...options };
			this.container = controlContainer('mapbox-ctrl-styles');
			this.container.classList.add(options.compact ? 'mapbox-ctrl-styles-compact' : 'mapbox-ctrl-styles-expanded');
		}

		/** @param {string} name */
		findStyleByName(name) {
			const style = this.options.styles.find((s) => s.styleName === name);
			if (!style) throw Error(`can't find style with name ${name}`);
			return style;
		}

		expanded() {
			if (!this.map) throw Error('map is undefined');
			/** @type HTMLButtonElement[] */
			const buttons = [];
			this.options.styles.forEach((style) => {
				const button = controlButton({
					title: style.label,
					textContent: style.label,
					onClick: () => {
						if (!this.map) throw Error('map is undefined');
						if (button.classList.contains('-active')) return;
						this.map.setStyle(style.styleUrl);
						if (this.options.onChange) this.options.onChange(style);
					},
				});
				buttons.push(button);
				this.container.appendChild(button);
			});

			this.map.on('styledata', () => {
				if (!this.map) throw Error('map is undefined');
				buttons.forEach((button) => {
					button.classList.remove('-active');
				});
				const styleNames = this.options.styles.map((style) => style.styleName);
				const styleName = this.map.getStyle().name;
				if (!styleName) throw Error('style must have name');
				const currentStyleIndex = styleNames.indexOf(styleName);
				if (currentStyleIndex !== -1) {
					const currentButton = buttons[currentStyleIndex];
					currentButton.classList.add('-active');
				}
			});
		}

		compact() {
			if (!this.map) throw Error('map is undefined');
			const button = controlButton({ title: 'Styles', icon: icons$1.layers });
			const select = document.createElement('select');
			this.container.appendChild(button);
			button.appendChild(select);

			this.options.styles.forEach((style) => {
				const option = document.createElement('option');
				select.appendChild(option);
				option.textContent = style.label;
				option.value = style.styleName;
			});

			select.addEventListener('change', () => {
				if (!this.map) throw Error('map is undefined');
				const style = this.findStyleByName(select.value);
				this.map.setStyle(style.styleUrl);
				if (this.options.onChange) this.options.onChange(style);
			});

			this.map.on('styledata', () => {
				if (!this.map) throw Error('map is undefined');
				const styleName = this.map.getStyle().name;
				if (!styleName) throw Error('style must have name');
				select.value = styleName;
			});
		}

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			if (this.options.compact) {
				this.compact();
			} else {
				this.expanded();
			}
			return this.container;
		}

		onRemove() {
			this.container.parentNode?.removeChild(this.container);
		}
	}

	/**
	 * @typedef {import('mapbox-gl').MapLayerMouseEvent} MapLayerMouseEvent
	 * @typedef {import('mapbox-gl').MapLayerEventType} MapLayerEventType
	 * @typedef {{
	 *  getContent: (event: MapLayerMouseEvent) => string
	 *  layer?: string
	 * }} TooltipControlOptions
	 */

	class TooltipControl {
		/** @param {TooltipControlOptions} options */
		constructor(options) {
			if (typeof options.getContent !== 'function') {
				throw Error('getContent function must be defined');
			}
			this.options = { ...options };
			this.container = document.createElement('div');
			/** @type {keyof MapLayerEventType} */
			this.eventShow = this.options.layer ? 'mouseenter' : 'mouseover';
			/** @type {keyof MapLayerEventType} */
			this.eventHide = this.options.layer ? 'mouseleave' : 'mouseout';
			this.node = document.createElement('div');
			this.node.classList.add('mapbox-ctrl-tooltip');
			this.lngLat = undefined;
			this.cursorStyle = '';
		}

		show = () => {
			if (!this.map) throw Error('map is undefined');
			this.map.getContainer().appendChild(this.node);
			this.cursorStyle = this.map.getCanvas().style.cursor;
			this.map.getCanvas().style.cursor = 'pointer';
			this.map.on('move', this.updatePosition);
		};

		hide = () => {
			if (!this.map) throw Error('map is undefined');
			this.node.innerHTML = '';
			this.map.getContainer().removeChild(this.node);
			this.map.getCanvas().style.cursor = this.cursorStyle;
			this.map.off('move', this.updatePosition);
		};

		/** @param {MapLayerMouseEvent} event */
		move = (event) => {
			this.node.innerHTML = this.options.getContent(event);
			this.lngLat = event.lngLat;
			this.updatePosition();
		};

		updatePosition = () => {
			if (!this.lngLat) return;
			if (!this.map) throw Error('map is undefined');
			const pos = this.map.project(this.lngLat);
			this.node.style.left = `${pos.x}px`;
			this.node.style.top = `${pos.y}px`;
		};

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			if (this.options.layer) {
				this.map.on(this.eventShow, this.options.layer, this.show);
				this.map.on('mousemove', this.options.layer, this.move);
				this.map.on(this.eventHide, this.options.layer, this.hide);
			} else {
				this.map.on(this.eventShow, this.show);
				this.map.on('mousemove', this.move);
				this.map.on(this.eventHide, this.hide);
			}

			return this.container;
		}

		onRemove() {
			if (!this.map) throw Error('map is undefined');
			if (this.options.layer) {
				this.map.off(this.eventShow, this.options.layer, this.show);
				this.map.off('mousemove', this.options.layer, this.move);
				this.map.off(this.eventHide, this.options.layer, this.hide);
			} else {
				this.map.off(this.eventShow, this.show);
				this.map.off('mousemove', this.move);
				this.map.off(this.eventHide, this.hide);
			}
			this.hide();
			this.container.parentNode?.removeChild(this.container);
		}
	}

	const plus = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <rect fill="none" height="24" width="24"/>
    <path d="M18,13h-5v5c0,0.55-0.45,1-1,1l0,0c-0.55,0-1-0.45-1-1v-5H6c-0.55,0-1-0.45-1-1l0,0c0-0.55,0.45-1,1-1h5V6 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v5h5c0.55,0,1,0.45,1,1l0,0C19,12.55,18.55,13,18,13z"/>
</svg>
`);

	const minus = parseSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <rect fill="none" height="24" width="24"/>
    <path d="M18,13H6c-0.55,0-1-0.45-1-1l0,0c0-0.55,0.45-1,1-1h12c0.55,0,1,0.45,1,1l0,0C19,12.55,18.55,13,18,13z"/>
</svg>
`);

	const icons = {
		plus,
		minus,
	};

	class ZoomControl {
		constructor() {
			this.container = controlContainer('mapbox-ctrl-zoom');
			this.buttonIn = controlButton({
				title: 'Zoom In',
				icon: icons.plus,
				onClick: () => this.map?.zoomIn(),
			});
			this.buttonOut = controlButton({
				title: 'Zoom Out',
				icon: icons.minus,
				onClick: () => this.map?.zoomOut(),
			});
		}

		/**
		 * @param {import('mapbox-gl').Map} map
		 * @returns {HTMLElement}
		 */
		onAdd(map) {
			this.map = map;
			this.container.appendChild(this.buttonIn);
			this.container.appendChild(this.buttonOut);
			return this.container;
		}

		onRemove() {
			this.container.parentNode?.removeChild(this.container);
		}
	}

	const polygon = {
		id: 1234567890,
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[30.51611423492432, 50.452667766971196],
					[30.514655113220215, 50.449006093706274],
					[30.516843795776367, 50.44862351447756],
					[30.518345832824707, 50.45217591688964],
					[30.51611423492432, 50.452667766971196],
				],
			],
		},
	};

	const map = new mapboxgl.Map({
		accessToken: 'pk.eyJ1Ijoia29yeXdrYSIsImEiOiJja2p1ajdlOWozMnF2MzBtajRvOTVzZDRpIn0.nnlX7TDuZ3zuGkZGr_oA3A',
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v12',
		zoom: 14,
		center: [30.5234, 50.4501],
	});

	map.on('style.load', () => {
		map.addLayer({
			id: 'polygon-fill',
			type: 'fill',
			source: { type: 'geojson', data: polygon },
			paint: { 'fill-opacity': 0.2, 'fill-color': '#4264fb' },
		});
		map.addLayer({
			id: 'polygon-line',
			type: 'line',
			source: { type: 'geojson', data: polygon },
			paint: { 'line-width': 2, 'line-color': '#4264fb' },
		});
	});

	map.addControl(new ZoomControl(), 'bottom-right');

	map.addControl(new CompassControl({ instant: true }), 'bottom-right');

	map.addControl(new InspectControl({ console: true }), 'bottom-right');

	map.addControl(new RulerControl(), 'bottom-right');
	map.on('ruler.on', () => console.log('Ruler activated'));
	map.on('ruler.off', () => console.log('Ruler deactivated'));

	const image = new ImageControl();
	map.addControl(image, 'bottom-right');
	image.addUrl('https://korywka.github.io/mapbox-controls/preview/plan.jpg', [
		[
			30.622053488641882,
			50.43926060648866,
		],
		[
			30.627144888757584,
			50.43197654403531,
		],
		[
			30.617797873099676,
			50.429326551923964,
		],
		[
			30.612705668630156,
			50.436610940291615,
		],
	]);
	map.on('image.select', ({ id }) => console.log(`Selected image ${id}`));
	map.on('image.deselect', ({ id }) => console.log(`Deselected image ${id}`));
	map.on('image.update', ({ coordinates }) => console.log('Updated position:', coordinates));
	map.on('image.mode', ({ mode }) => console.log(`Changed mode: ${mode}`));

	map.addControl(new TooltipControl({
		layer: 'polygon-fill',
		getContent: (event) => `TooltipControl example ${event.lngLat.lng.toFixed(6)}, ${event.lngLat.lat.toFixed(6)}`,
	}));

	const languageControl = new LanguageControl();
	map.addControl(languageControl);
	document.getElementById('languages').addEventListener('change', (event) => {
		languageControl.setLanguage(event.target.value);
	});

	map.addControl(new StylesControl(), 'top-left');
	map.addControl(new StylesControl({ compact: true }), 'top-left');

})();