(function(){'use strict';var a=Math.max,b={normalize:(b)=>{let c=new THREE.Box3().setFromObject(b),d=new THREE.Vector3;c.getCenter(b.position),c.getSize(d);let e=1/a(d.x,d.y);return b.position.multiplyScalar(-e),b.scale.set(e,e,e),b},createDebugBoundingBox:()=>{let a=new THREE.LineBasicMaterial({color:65280}),b=new THREE.PlaneGeometry(1,1),c=new THREE.WireframeGeometry(b),d=new THREE.LineSegments(c,a);return d},createContainer:(a)=>{let b=new THREE.Object3D;return!1,b.add(a),b}},c={getFileExtension:(a)=>{let b=a.split(/[?#]/)[0],c=b.split('/'),d=c.pop(),e=d.split('.');if(0<e.length)return'.'+e.pop()}};const d={},e=(a)=>{let e,f,g=c.getFileExtension(a);return(g&&(e=d[g]),!e)?(console.error(`Couldn't load "${a}". Unknown object format "${g}"`),Promise.reject()):(f=e.objectCache[a],f||(f=e.load(a).then((a)=>(b.normalize(a),b.createContainer(a))),e.objectCache[a]=f),f.then((a)=>a.clone()))};var f={load:e,register:(a,b)=>{d[a]={load:b,objectCache:{}}}};const g=(a)=>parseFloat(a||0);var h={parseTransformValue:(a,b)=>{var d=a.split(/\s*[(),]\s*/).slice(1,-1);6===d.length?b.set(+d[0],-d[2],0,+d[4],-d[1],+d[3],0,-d[5],0,0,1,0,0,0,0,1):16===d.length?b.set(+d[0],-d[4],+d[8],+d[12],-d[1],+d[5],-d[9],-d[13],+d[2],-d[6],+d[10],+d[14],+d[3],+d[7],+d[11],+d[15]):b.identity()},parseOriginValue:(a,b)=>{let c=a.split(' ');b.set(g(c[0]),g(c[1]),g(c[2]))},parseUnitValue:g};const i=(a)=>{let b=document.createElement('style');return b.textContent=a,b};var j={getTransformForElement:(a)=>{let b=new THREE.Matrix4,c=new THREE.Matrix4,d=new THREE.Vector3,e=new THREE.Matrix4,f=a,g=[],i=0,j=0;if(0===a.offsetWidth||0===a.offsetHeight)return b;for(i-=a.offsetWidth/2,j+=a.offsetHeight/2;a;)a===f&&(i+=a.offsetLeft,j+=a.offsetTop,f=a.offsetParent),g.push(a),i-=a.scrollLeft,j-=a.scrollTop,a=a.parentElement;for(b.makeTranslation(i,-j,0);a=g.pop();){let f=getComputedStyle(a);h.parseOriginValue(f.transformOrigin,d),h.parseTransformValue(f.transform,c);let g=d.x-a.offsetWidth/2,i=d.y-a.offsetHeight/2,j=d.z;0!=g||0!=i||0!==j?(b.multiply(e.makeTranslation(g,-i,j)),b.multiply(c),b.multiply(e.makeTranslation(-g,i,-j))):b.multiply(c)}return b},getProjectionForElement:(b)=>{var c=Math.min;let d,e=new THREE.Vector3,f={left:0,top:0,right:innerWidth,bottom:innerHeight},g={left:0,top:0,right:innerWidth,bottom:innerHeight};for(;b;){let i=getComputedStyle(b),j=b.getBoundingClientRect(),k=i.perspective;if(!d&&'none'!==k){d=h.parseUnitValue(k),g.top=j.top,g.left=j.left,g.right=j.right,g.bottom=j.bottom;let a=i.perspectiveOrigin;a&&h.parseOriginValue(a,e)}'visible'!==i.overflow&&(f.top=a(j.top,f.top),f.left=a(j.left,f.left),f.right=c(j.right,f.right),f.bottom=c(j.bottom,f.bottom)),b=b.parentElement}return{perspective:d,perspectiveOrigin:e,clipBounds:f,cameraBounds:g}},createStylesheet:i};let k,l,m,n,o,p,q,r;const s=[],t=()=>!q&&(q=new THREE.Scene,r=new THREE.PointLight(8421504,2,0),r.position.set(0,0,0),q.add(r),p=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),p.setScissorTest(!0),p.setClearColor(0,0),p.autoClear=!1,p.sortObjects=!1,requestAnimationFrame(x),p.domElement),u=()=>(l=window.innerWidth,m=window.innerHeight,k=null,p.setSize(l,m),p.clear(),s.forEach((a)=>{let b=a.elem;if(b){let c,d,e,f,g=b.offsetWidth;if(0===g)return;if(c=j.getProjectionForElement(b),e=c.clipBounds.bottom-c.clipBounds.top,f=c.clipBounds.right-c.clipBounds.left,0>=f||0>=e)return;d=j.getTransformForElement(b),a.rotation.setFromRotationMatrix(d),a.position.setFromMatrixPosition(d),a.scale.setFromMatrixScale(d),a.scale.multiplyScalar(g),a.position.x+=g-l/2,a.position.y+=m/2,k=c.perspective?w(c.cameraBounds,c.perspective,c.perspectiveOrigin):v(c.cameraBounds),r.position.x=c.cameraBounds.left+(c.cameraBounds.right-c.cameraBounds.left)/2-l/2,r.position.y=m/2-c.cameraBounds.top-(c.cameraBounds.bottom-c.cameraBounds.top)/2,r.position.z=k.far,p.setScissor(c.clipBounds.left,c.clipBounds.top,f,e),q.add(a),p.render(q,k),q.remove(a)}}),!!k),v=(a)=>{let b;return o||(o=new THREE.OrthographicCamera),b=o,b.left=a.left-l/2,b.top=-a.top+m/2,b.bottom=-a.bottom+m/2,b.right=a.right-l/2,b.near=-700,b.updateProjectionMatrix(),b},w=(a,b,c)=>{let d;n||(n=new THREE.PerspectiveCamera),d=n,d.fov=180*(2*Math.atan(m/2/b))/Math.PI,d.aspect=l/m,d.position.set(0,0,b),d.updateProjectionMatrix();let e=l/2-a.left-c.x,f=m/2-a.top-c.y;if(0!=e||0!=f){let a=d.projectionMatrix.clone();d.projectionMatrix.makeTranslation(-e/(l/2),f/(m/2),0),d.projectionMatrix.multiply(a),a.makeTranslation(e,-f,0),d.projectionMatrix.multiply(a)}return d},x=()=>{requestAnimationFrame(x),u()};var y={init:t,add:(a)=>{let b=s.indexOf(a);return!(-1!==b)&&(s.push(a),!0)},remove:(a)=>{let b=s.indexOf(a);return!!(-1<b)&&(s.splice(b,1),!0)},render:x};const z=new WeakMap;let A;const B=()=>{A=j.createStylesheet('#x-model-renderLayer{position:fixed;top:0;left:0;pointer-events:none;z-index:10}x-model{width:25%;height:25%}');let a=document.documentElement.firstChild;a.insertBefore(A,a.firstChild);let b=y.init();b.setAttribute('id','x-model-renderLayer'),document.documentElement.appendChild(b)};class C extends HTMLElement{constructor(){super()}static get observedAttributes(){return['src']}connectedCallback(){A||B();let a=z.get(this);a&&a.elem!==this&&(a.elem=this,y.add(a))}disconnectedCallback(){let a=z.get(this);a&&a.elem===this&&(y.remove(a),a.elem=null)}attributeChangedCallback(a,b,c){'src'===a&&(this.disconnectedCallback(),f.load(c).then((a)=>{let b=new UIEvent('load');this.dispatchEvent(b),z.set(this,a),this.connectedCallback()}).catch(()=>{let a=new UIEvent('error');this.dispatchEvent(a)}))}}let D;var E=(a)=>new Promise((b,c)=>{return D||(D=new THREE.GLTFLoader),D.load(a,(a)=>{b(a.scene)},null,()=>{c()})});let F;var G=(a)=>new Promise((b,c)=>{return F||(F=new THREE.OBJLoader),F.load(a,(a)=>{b(a)},null,()=>{c()})});if('customElements'in window){if(!('THREE'in window))throw'THREE (threejs.org) is required.';'GLTFLoader'in THREE&&(f.register('.gltf',E),f.register('.glb',E)),'OBJLoader'in THREE&&f.register('.obj',G),customElements.define('x-model',C)}})();
