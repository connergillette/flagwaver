!function(O){"use strict";O=O&&O.hasOwnProperty("default")?O.default:O;var n={DEXTER:"dexter",SINISTER:"sinister"},d={TOP:"top",LEFT:"left",BOTTOM:"bottom",RIGHT:"right"},t={VERTICAL:"vertical",HORIZONTAL:"horizontal",OUTRIGGER:"outrigger",CROSSBAR:"crossbar",GALLERY:"gallery"};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function M(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?p(e):t}var h=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},v=function(e){return!(!e||"object"!==i(e))},u=function(t,i){return v(t)&&Object.keys(t).some(function(e){return t[e]===i})},l={depth_frag:"uniform sampler2D texture;\nvarying vec2 vUV;\nvec4 pack_depth(const in float depth) {\n    const vec4 bit_shift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);\n    const vec4 bit_mask = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);\n    vec4 res = fract(depth * bit_shift);\n    res -= res.xxyz * bit_mask;\n    return res;\n}\nvoid main() {\n    vec4 pixel = texture2D(texture, vUV);\n    if (pixel.a < 0.5) discard;\n    gl_FragData[0] = pack_depth(gl_FragCoord.z);\n}\n",depth_vert:"varying vec2 vUV;\nvoid main() {\n    vUV = 0.75 * uv;\n    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n    gl_Position = projectionMatrix * mvPosition;\n}\n"},S=function(){function i(e,t){M(this,i),this.position=e.clone(),this.previous=e.clone(),this.original=e.clone(),this.mass=t,this.inverseMass=1/t,this.acceleration=new O.Vector3,this.tmp=new O.Vector3}return o(i,[{key:"applyForce",value:function(e){this.acceleration.addScaledVector(e,this.inverseMass)}},{key:"integrate",value:function(e){var t=this.tmp.subVectors(this.position,this.previous).multiplyScalar(.97).add(this.position).addScaledVector(this.acceleration,e);this.tmp=this.previous,this.previous=this.position,this.position=t,this.acceleration.set(0,0,0)}}]),i}(),c=new O.Vector3,F=function(){function n(e,t,i){M(this,n),this.p1=e,this.p2=t,this.restDistance=i}return o(n,[{key:"resolve",value:function(){var e=this.p1,t=this.p2,i=this.restDistance;c.subVectors(t.position,e.position);var n=c.length();if(0!==n){var a=c.multiplyScalar((1-i/n)/2);e.position.add(a),t.position.sub(a)}}}]),n}(),m=function(){function k(i,e,t,n){M(this,k);for(var a=t*i,r=t*e,o=[],s=[],u=function(e,t){return o[e+t*(i+1)]},l=function(e,t){return new O.Vector3(e*a,t*r,0)},c=0;c<=e;c++)for(var h=0;h<=i;h++)o.push(new S(l(h/i,c/e),n));for(var d=0;d<e;d++)for(var f=0;f<i;f++)s.push(new F(u(f,d),u(f,d+1),t)),s.push(new F(u(f,d),u(f+1,d),t));for(var p=i,g=0;g<e;g++)s.push(new F(u(p,g),u(p,g+1),t));for(var v=e,m=0;m<i;m++)s.push(new F(u(m,v),u(m+1,v),t));for(var y=Math.sqrt(t*t*2),w=0;w<e;w++)for(var b=0;b<i;b++)s.push(new F(u(b,w),u(b+1,w+1),y)),s.push(new F(u(b+1,w),u(b,w+1),y));var j=new O.ParametricGeometry(l,i,e,!0);j.dynamic=!0,j.computeFaceNormals(),this.xSegments=i,this.ySegments=e,this.restDistance=t,this.width=a,this.height=r,this.particles=o,this.constraints=s,this.particleAt=u,this.geometry=j}return o(k,[{key:"reset",value:function(){for(var e=this.particles,t=0,i=e.length;t<i;t++){var n=e[t];n.previous.copy(n.position.copy(n.original))}}},{key:"simulate",value:function(e){for(var t=this.particles,i=this.constraints,n=e*e,a=0,r=t.length;a<r;a++)t[a].integrate(n);for(var o=0,s=i.length;o<s;o++)i[o].resolve()}},{key:"render",value:function(){for(var e=this.particles,t=this.geometry,i=t.vertices,n=0,a=e.length;n<a;n++)i[n].copy(e[n].position);t.computeFaceNormals(),t.computeVertexNormals(),t.normalsNeedUpdate=!0,t.verticesNeedUpdate=!0}}]),k}(),y=new O.Vector3,w=function(e){function t(){return M(this,t),g(this,f(t).apply(this,arguments))}return r(t,F),o(t,[{key:"resolve",value:function(){var e=this.p1,t=this.p2,i=1.2*this.restDistance;y.subVectors(e.position,t.position);var n=y.length()/1.2;y.normalize();var a=y.multiplyScalar(n-i);i<n&&t.position.add(a)}}]),t}(),b=O.ImageUtils.generateDataTexture(1,1,new O.Color(16777215));var j=function(){var u={edges:[],spacing:1};function l(e,t,i,n){var a=e.xSegments,r=e.ySegments,o=e.particleAt,s=n.spacing;switch(i){case d.TOP:for(var u=0;u<=a;u+=s)t.push(o(u,r));break;case d.LEFT:for(var l=0;l<=r;l+=s)t.push(o(0,l));break;case d.BOTTOM:for(var c=0;c<=a;c+=s)t.push(o(c,0));break;case d.RIGHT:for(var h=0;h<=r;h+=s)t.push(o(a,h))}}return function(e,t,i){var n,a=Object.assign({},u,i),r=a.edges;if(a.spacing=(n=a.spacing,h(n)&&1<=n?Math.floor(n):u.spacing),"string"==typeof r)l(e,t,r,a);else if(r&&r.length)for(var o=0,s=r.length;o<s;o++)l(e,t,r[o],a)}}(),k=function(){function a(e){M(this,a);var t,i,n=Object.assign({},a.defaults,e);this.cloth=(i=(t=n).height/t.granularity,new m(Math.round(t.width/i),Math.round(t.height/i),i,t.mass)),this.pins=[],this.lengthConstraints=[],this.mesh=function(e,t){var i=b,n=e.geometry,a=new O.MeshPhongMaterial({alphaTest:.5,color:16777215,specular:197379,shininess:.001,metal:!1,side:O.DoubleSide});t&&t.texture&&(t.texture instanceof O.Texture?((i=t.texture).needsUpdate=!0,i.anisotropy=16,i.minFilter=O.LinearFilter,i.magFilter=O.LinearFilter,i.wrapS=i.wrapT=O.ClampToEdgeWrapping):console.error("FlagWaver.Flag: options.texture must be an instance of THREE.Texture.")),a.map=i;var r=new O.Mesh(n,a);return r.castShadow=!0,r.receiveShadow=!0,r.customDepthMaterial=new O.ShaderMaterial({uniforms:{texture:{type:"t",value:i}},vertexShader:l.depth_vert,fragmentShader:l.depth_frag}),r}(this.cloth,n),this.mesh.position.set(0,-this.cloth.height,0),this.object=new O.Object3D,this.object.add(this.mesh),this.pin(n.pin)}return o(a,[{key:"destroy",value:function(){this.mesh instanceof O.Mesh&&(this.mesh.material.dispose(),this.mesh.geometry.dispose(),this.mesh.material.map.dispose(),this.mesh.customDepthMaterial.dispose())}},{key:"pin",value:function(e){j(this.cloth,this.pins,e)}},{key:"unpin",value:function(){this.pins=[]}},{key:"setLengthConstraints",value:function(e){var t=this.cloth,i=t.xSegments,n=t.ySegments,a=t.restDistance,r=t.particleAt,o=[];if(e===d.LEFT)for(var s=0;s<=n;s++)for(var u=0;u<i;u++)o.push(new w(r(u,s),r(u+1,s),a));else if(e===d.TOP)for(var l=0;l<=i;l++)for(var c=n;0<c;c--)o.push(new w(r(l,c),r(l,c-1),a));this.lengthConstraints=o}},{key:"reset",value:function(){this.cloth.reset()}},{key:"simulate",value:function(e){var t=this.pins,i=this.lengthConstraints;this.cloth.simulate(e);for(var n=0,a=t.length;n<a;n++){var r=t[n];r.previous.copy(r.position.copy(r.original))}for(var o=0,s=i.length;o<s;o++)i[o].resolve()}},{key:"render",value:function(){this.cloth.render()}}]),a}();k.defaults={width:300,height:200,mass:.1,granularity:10,rigidness:1,texture:b,pin:{edges:[d.LEFT]}};var x={noEffect:function(){},blowFromLeftDirection:function(e){e.force.set(2e3,0,1e3)},rotatingDirection:function(e,t){e.force.set(Math.sin(t/2e3),Math.cos(t/3e3),Math.sin(t/1e3))},constantSpeed:function(e){e.force.multiplyScalar(e.speed)},variableSpeed:function(e,t){e.force.multiplyScalar(Math.cos(t/7e3)*(e.speed/2)+e.speed)}},e=function(){function i(e){M(this,i);var t=Object.assign({},this.constructor.defaults,e);this.direction=t.direction,this.speed=t.speed,this.directionModifier=t.directionModifier,this.speedModifier=t.speedModifier,this.force=new O.Vector3}return o(i,[{key:"update",value:function(){var e=this.force,t=Date.now();e.copy(this.direction),this.directionModifier(this,t),e.normalize(),this.speedModifier(this,t)}}]),i}();e.defaults={direction:new O.Vector3(1,0,0),speed:200,directionModifier:x.blowFromLeftDirection,speedModifier:x.constantSpeed};var T=new O.ImageLoader;T.setCrossOrigin("anonymous");var L={width:"auto",height:"auto",hoisting:n.DEXTER,topEdge:d.TOP};function E(e,t){var i={width:t.width,height:t.height};return e&&(i=function(e,t){if("auto"!==t.width||"auto"!==t.height)return"auto"===t.width&&h(t.height)?{width:t.height*e.width/e.height,height:t.height}:h(t.width)&&"auto"===t.height?{width:t.width,height:t.width*e.height/e.width}:{width:t.width,height:t.height};var i=k.defaults.height;return e.width<e.height?{width:i,height:i*e.height/e.width}:{width:i*e.width/e.height,height:i}}(e,i)),h(i.width)&&h(i.height)?i:{width:k.defaults.width,height:k.defaults.height}}function I(e){return e.topEdge===d.LEFT||e.topEdge===d.RIGHT}function C(e){var t={};if(t.width=e.width,t.height=e.height,t.reflect=e.hoisting===n.SINISTER,t.rotate=function(e){switch(e){case d.TOP:return 0;case d.LEFT:return-Math.PI/2;case d.BOTTOM:return Math.PI;case d.RIGHT:return Math.PI/2;default:return 0}}(e.topEdge),I(e)){var i=(e.width-e.height)/2;t.translateX=-i,t.translateY=i,t.flipXY=!0}else t.translateX=0,t.translateY=0,t.flipXY=!1;return t}function U(e,t){var i,n,a,r,o,s,u,l,c=Object.assign({},t);return I(t)&&(c.width=t.height,c.height=t.width),e&&(c.texture=(i=e,n=C(t),a=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),r=a.getContext("2d"),o=i.width,s=i.height,u=o,l=s,v(n)?(0<n.width&&(u=n.width),0<n.height&&(l=n.height),n.flipXY?(a.width=l,a.height=u):(a.width=u,a.height=l),n.reflect&&(r.translate(a.width,0),r.scale(-1,1)),h(n.rotate)&&(r.translate(a.width/2,a.height/2),r.rotate(n.rotate),r.translate(-a.width/2,-a.height/2)),h(n.translateX)&&r.translate(n.translateX,0),h(n.translateY)&&r.translate(0,n.translateY)):(a.width=u,a.height=l),r.drawImage(i,0,0,o,s,0,0,u,l),new O.Texture(a))),c}function R(e,t){return e?(i=e,n=t,a=Object.assign({},L,n),Object.assign(a,E(i,a)),new k(U(i,a))):new k((r=t,o=Object.assign({},r),h(o.width)||(o.width=k.defaults.width),h(o.height)||(o.height=k.defaults.height),o));var i,n,a,r,o}var W=function(){function t(e){M(this,t),this.flag=null,this.object=new O.Object3D,this.setOptions(e)}return o(t,[{key:"destroy",value:function(){this.flag&&(this.object.remove(this.flag.object),this.flag.destroy())}},{key:"setOptions",value:function(e,t){var i,n,a,r=this,o=Object.assign({},e),s=o.imgSrc,u=function(e){r.destroy(),r.flag=e,r.object.add(e.object),t&&t(e)};u(R(null,o)),s&&(i=s,n=function(e){u(R(e,o))},T.load(i,n,null,function(e){console.error("FlagWaver.loadImage: Failed to load image from ".concat(i,".")),a&&a(e)}))}},{key:"reset",value:function(){this.flag.reset()}},{key:"simulate",value:function(e){this.flag.simulate(e)}},{key:"render",value:function(){this.flag.render()}}]),t}();var V,D=function(){function r(e){M(this,r);var t=Object.assign({},this.constructor.defaults,e),i=this.buildGeometry(t),n=new O.MeshPhongMaterial({color:6974058,specular:16777215,metal:!0,shininess:18}),a=new O.Mesh(i,n);a.receiveShadow=!0,a.castShadow=!0,this.mesh=a,this.object=this.mesh}return o(r,[{key:"destroy",value:function(){this.mesh instanceof O.Mesh&&(this.mesh.material.dispose(),this.mesh.geometry.dispose())}},{key:"buildGeometry",value:function(e){return t=e,(i=new O.CylinderGeometry(t.poleWidth,t.poleWidth,t.poleLength)).translate(0,-t.poleLength/2,0),i.merge(new O.CylinderGeometry(t.poleCapSize,t.poleCapSize,t.poleCapSize)),i;var t,i}},{key:"addFlag",value:function(e){e.unpin(),e.pin({edges:[d.LEFT]}),e.setLengthConstraints(d.LEFT)}}]),r}();D.defaults=((V={}).flagpoleType=t.VERTICAL,V.poleWidth=6,V.poleLength=8192,V.poleCapSize=V.poleWidth+2,V.crossbarWidth=V.poleWidth-2,V.crossbarLength=200,V.crossbarCapSize=V.crossbarWidth+2,V.poleTopOffset=60,V);var N=function(){function t(e){var i=this;M(this,t),this.object=new O.Object3D,this.flagpole=null,this.flagInterface=new W(e);var n=this.flagInterface.setOptions.bind(this.flagInterface);this.flagInterface.setOptions=function(e,t){n(e,function(e){i.flagpole&&(i.flagpole.needsUpdate=!0),t&&t(e)})},this.object.add(this.flagInterface.object),this.setFlagpoleOptions(e),this.setFlagOptions(e)}return o(t,[{key:"destroy",value:function(){this.flagpole&&(this.object.remove(this.flagpole.object),this.flagpole.destroy()),this.flagInterface&&(this.object.remove(this.flagInterface.object),this.flagInterface.destroy())}},{key:"setFlagpoleOptions",value:function(e,t){var i,n,a=Object.assign({},e),r=this.flagInterface,o=(i=a,this.flagInterface.flag,n=Object.assign({},i),new D(n));this.flagpole&&(this.object.remove(this.flagpole.object),this.flagpole.destroy()),this.flagpole=o,this.object.add(o.object),o.needsUpdate=!1,r&&r.flag&&o.addFlag(r.flag,0),t&&t(o)}},{key:"setFlagOptions",value:function(e,t){this.flagInterface.setOptions(e,t)}},{key:"reset",value:function(){}},{key:"simulate",value:function(e){}},{key:"render",value:function(){this.flagpole.needsUpdate&&this.setFlagpoleOptions()}}]),t}();N.FlagInterface=W;var P=new O.Vector3,z=new O.Vector3;function _(e,t){return P.copy(e),t instanceof O.Object3D&&(z.setFromMatrixPosition(t.matrixWorld),P.add(z),t.worldToLocal(P)),P}var A=new O.Vector3(0,-1373.4,0);new O.Vector3;var G=new O.Vector3;var H=function(){function e(){M(this,e)}return o(e,[{key:"init",value:function(){}},{key:"deinit",value:function(){}}]),e}();H.displayName="module";var X=function(){function t(e){M(this,t),this.context=e||this,this.modules=[]}return o(t,[{key:"module",value:function(e){for(var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,i=this.modules,n=0,a=i.length,r=0;n<a;n++){var o=i[n];if(o.constructor.displayName===e){if(r===t)return o;r++}}return null}},{key:"add",value:function(e){if(e instanceof H)return e.init&&e.init(this.context),this.modules.push(e),e}},{key:"remove",value:function(e){if(e instanceof H){var t=this.modules,i=t.indexOf(e);if(!(i<0))return e.deinit&&e.deinit(this.context),t.splice(i,1)[0]}}}]),t}(),Y=function(e){function d(e){var r;M(this,d),r=g(this,f(d).call(this));var t=Object.assign({},r.constructor.defaults,e),i=t.scene,n=t.camera,a=t.renderer,o=t.onStart.bind(p(p(r))),s=t.onUpdate.bind(p(p(r))),u=new O.Clock,l=function(){n.lookAt(i.position),a.render(i,n)},c=function(){o(),function(){for(var e=r.modules,t=0,i=e.length;t<i;t++){var n=e[t];n.subject&&n.reset&&n.reset()}}(),l()},h=function(e){s(e),function(e){for(var t=r.modules,i=0,n=t.length;i<n;i++){var a=t[i];(a.subject||a.interact)&&a.update&&a.update(e)}}(e),l()};return i.add(n),i.position.y=-300,u.start(),c(),function e(){requestAnimationFrame(e),u.running&&h(Math.min(u.getDelta(),1/60))}(),r.scene=i,r.renderer=a,r.camera=n,r.canvas=a.domElement,r.clock=u,r.timestep=1/60,r.start=c,r.update=h,r}return r(d,X),d}();Y.defaults={onStart:function(){},onUpdate:function(){}};var B=function(e){function t(){var e;return M(this,t),(e=g(this,f(t).call(this))).app=null,e}return r(t,H),o(t,[{key:"init",value:function(e){this.app=e}},{key:"deinit",value:function(){this.play&&this.play()}},{key:"play",value:function(){var e=this.app.clock;e.running||e.start()}},{key:"pause",value:function(){this.app.clock.stop()}},{key:"step",value:function(){var e=this.app,t=e.clock,i=e.timestep;t.running||(t.elapsedTime+=i,this.app.update(i))}},{key:"reset",value:function(){var e=this.app.clock;e.startTime=0,e.oldTime=0,e.elapsedTime=0,this.app.start()}}]),t}();B.displayName="animationModule";var $=function(e){function t(){var e;return M(this,t),(e=g(this,f(t).call(this))).app=null,e.resize=e.resize.bind(p(p(e))),e}return r(t,H),o(t,[{key:"init",value:function(e){this.app=e,window.addEventListener("resize",this.resize),this.resize()}},{key:"deinit",value:function(){window.removeEventListener("resize",this.resize)}},{key:"resize",value:function(){var e=this.app,t=e.scene,i=e.camera,n=e.renderer,a=n.domElement.parentElement,r=1,o=1;a&&(o=a.clientWidth,r=a.clientHeight),i.aspect=o/r,i.updateProjectionMatrix(),n.setSize(o,r),n.render(t,i)}}]),t}();$.displayName="resizeModule";var q=function(){function t(e){M(this,t),this.validators=e||{}}return o(t,[{key:"validate",value:function(a,r){var o=this.validators;return v(a)?Object.keys(a).reduce(function(e,t){var i=a[t];if(void 0!==i)if(o[t]){var n=o[t](i);null!=n&&(e[t]=n)}else r||(e[t]=i);return e},{}):{}}}]),t}();function K(e){var i=new q(e);return function(e,t){return i.validate(e,t)}}var Q=function(e){function t(){return M(this,t),g(this,f(t).apply(this,arguments))}return r(t,H),t}();Q.displayName="controlModule",Q.Subject=Object;var Z=function(e){function n(e,t){var i;return M(this,n),(i=g(this,f(n).call(this))).subject=e||null,i.context=t||null,i.configOptions=Object.assign({},i.constructor.Subject.defaults),i}return r(n,Q),o(n,[{key:"init",value:function(e){this.subject=this.subject||new this.constructor.Subject,this.context||e.scene.add(this.subject.object)}},{key:"deinit",value:function(e){this.context||(e.scene.remove(this.subject.object),this.subject.destroy())}},{key:"reset",value:function(){this.subject.reset(),this.subject.render()}},{key:"update",value:function(e){this.subject.simulate(e),this.subject.render()}},{key:"setOptions",value:function(e,t){var i=this;v(e)&&this.subject.setOptions(Object.assign(this.configOptions,this.constructor.validate(e)),function(e){t&&t(i.configOptions)})}}]),n}();Z.displayName="flagModule",Z.Subject=W,Z.validate=K({topEdge:function(e){if(u(d,e))return e;console.error("FlagWaver.FlagModule.option: Invalid value.")},hoisting:function(e){if(u(n,e))return e;console.error("FlagWaver.FlagModule.option: Invalid value.")},width:function(e){var t=Number(e);return h(e)&&0<t?t:"auto"===e?e:void console.error("FlagWaver.FlagModule.option: Invalid value.")},height:function(e){var t=Number(e);return h(e)&&0<t?t:"auto"===e?e:void console.error("FlagWaver.FlagModule.option: Invalid value.")},mass:function(e){var t=Number(e);if(h(e)&&0<=t)return t;console.error("FlagWaver.FlagModule.option: Invalid value.")},granularity:function(e){var t=Math.round(e);if(h(e)&&0<t)return t;console.error("FlagWaver.FlagModule.option: Invalid value.")},imgSrc:function(e){if("string"==typeof e)return e;console.error("FlagWaver.FlagModule.option: Invalid value.")},flagpoleType:function(e){if(u(t,e))return e;console.error("FlagWaver.FlagModule.option: Invalid value.")}});var J=function(e){function n(e,t){var i;return M(this,n),(i=g(this,f(n).call(this))).subject=e||null,i.context=t||null,i.flag=null,i}return r(n,Q),o(n,[{key:"init",value:function(e){this.subject=new this.constructor.Subject,this.context||e.scene.add(this.subject.object),this.flag=new Z(this.subject.flagInterface,this.subject.object),e.add(this.flag)}},{key:"deinit",value:function(e){e.remove(this.flag),this.context||(e.scene.remove(this.subject.object),this.subject.destroy())}},{key:"reset",value:function(){this.subject.reset(),this.subject.render()}},{key:"update",value:function(e){this.subject.simulate(e),this.subject.render()}}]),n}();J.displayName="flagGroupModule",J.Subject=N;var ee=function(e){function t(){var e;return M(this,t),(e=g(this,f(t).call(this))).subject=new e.constructor.Subject,e.configOptions=Object.assign({},e.constructor.Subject.defaults),e}return r(t,Q),o(t,[{key:"update",value:function(e){this.subject.update(e)}},{key:"setOptions",value:function(e){this.subject=new this.constructor.Subject(Object.assign(this.configOptions,this.constructor.validate(e)))}}]),t}();ee.displayName="windModule",ee.Subject=e,ee.validate=K({speed:function(e){var t=Number(e);if(h(e)&&0<=t)return t;console.error("FlagWaver.WindModule.option: Invalid value.")}});var te=function(e){function n(e,t){var i;return M(this,n),(i=g(this,f(n).call(this))).app=null,i.subjectTypes=e||[],i.actionTypes=t||[],i.subjects=[],i.actions=[],i.needsUpdate=!1,i}return r(n,H),o(n,[{key:"updateModulesList",value:function(){var e=this.app;if(e){for(var t=e.modules,i=this.subjectTypes,n=this.actionTypes,a=[],r=[],o=0,s=t.length;o<s;o++){var u=t[o];0<=i.indexOf(u.constructor.displayName)&&a.push(u.subject),0<=n.indexOf(u.constructor.displayName)&&r.push(u.subject)}this.subjects=a,this.actions=r}}},{key:"init",value:function(e){this.app=e,this.updateModulesList()}},{key:"interact",value:function(e,t){}},{key:"update",value:function(e){var t=this.interact;this.needsUpdate&&(this.updateModulesList(),this.needsUpdate=!1);var i=this.subjects,n=this.actions;if(n.length)for(var a=0,r=n.length;a<r;a++)for(var o=0,s=i.length;o<s;o++)t(i[o],n[a]);else for(var u=0,l=i.length;u<l;u++)t(i[u])}}]),n}();te.displayName="interactionModule";var ie=function(e){function t(){return M(this,t),g(this,f(t).apply(this,arguments))}return r(t,te),o(t,[{key:"interact",value:function(e){!function(e,t){for(var i=e.particles,n=_(A,t),a=0,r=i.length;a<r;a++)i[a].acceleration.add(n)}(e.flag.cloth,e.flag.object)}}]),t}();ie.displayName="gravityModule";var ne=function(e){function t(){return M(this,t),g(this,f(t).apply(this,arguments))}return r(t,te),o(t,[{key:"interact",value:function(e,t){!function(e,t,i){var n=e.particles,a=e.geometry.faces;if(t)for(var r=_(t.force,i),o=0,s=a.length;o<s;o++){var u=a[o],l=u.normal;G.copy(l).normalize().multiplyScalar(l.dot(r)),n[u.a].applyForce(G),n[u.b].applyForce(G),n[u.c].applyForce(G)}}(e.flag.cloth,t,e.flag.object)}}]),t}();ne.displayName="windForceModule";var ae={defaultValue:"",parse:function(e){return e},stringify:function(e){return e}};function re(e,t){return t===e.defaultValue||""===t||null==t}var oe=function(){function e(i){M(this,e),this.fields=Object.keys(i).reduce(function(e,t){return e[t]=Object.assign({},ae,i[t]),e},{})}return o(e,[{key:"parse",value:function(e){var i,r=this.fields,o=(i=function(e){var t={};if("string"!=typeof e)return t;for(var i=e.split("&"),n=0,a=i.length;n<a;n++){var r=i[n];if(r){var o=r.split("="),s=o[0];s&&(t[s]=void 0!==o[1]?o.slice(1).join("="):null)}}return t}(e),Object.keys(i).reduce(function(e,t){return e[t.toLowerCase()]=i[t],e},{}));return Object.keys(r).reduce(function(e,t){var i=r[t],n=o[t],a=n&&i.parse(n);return e[t]=re(i,a)?i.defaultValue:a,e},{})}},{key:"stringify",value:function(a){var r=this.fields;return function(e){for(var t=Object.keys(e),i=[],n=0,a=t.length;n<a;n++){var r=t[n],o=e[r];null===o?i.push(r):void 0!==o&&i.push(r+"="+o)}return i.join("&")}(Object.keys(r).reduce(function(e,t){var i=r[t],n=a[t];return re(i,n)||(e[t]=i.stringify(n)),e},{}))}}]),e}(),se=window,ue=se.history,le=se.location,ce=!(!ue||!ue.replaceState),he=function(){try{ue.replaceState(null,"",le.href)}catch(e){return!1}return!0}();var de=/^(?:[^#]*(?:#!|#\?|#)|[^\?]*\?)?(.*)$/;function fe(e){!function(e){if(ce&&he){var t=le.href.split("#")[0]+(e?"#"+e:"");ue.replaceState(null,"",t)}else le.hash=e}(e?"?"+e:"")}var pe,ge=function e(t){M(this,e);var i=new oe(t);this.getState=function(){return i.parse(le.href.replace(de,"$1"))},this.setState=function(e){return fe(e?i.stringify(e):"")}},ve=!1;function me(){var e,t,i,n=new Y({scene:(i=new O.Scene,i.fog=new O.Fog(0,1e3,1e4),i.fog.color.setHSL(.6,1,.9),i),camera:(t=new O.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1e4),t.position.y=100,t.position.z=2e3,t),renderer:(e=new O.WebGLRenderer({antialias:!0,alpha:!0}),e.setSize(window.innerWidth,window.innerHeight),e.gammaInput=!0,e.gammaOutput=!0,e.shadowMap.enabled=!0,e)});return function(e){var t=e.scene;t.add(new O.AmbientLight(2236962));var i=new O.DirectionalLight(16777215,1.75);i.color.setHSL(.6,1,.9375),i.position.set(50,175,100),i.position.multiplyScalar(1.3),i.castShadow=!0,i.shadowMapWidth=2048,i.shadowMapHeight=2048,i.shadowCameraTop=300,i.shadowCameraLeft=-300,i.shadowCameraBottom=-300,i.shadowCameraRight=300,i.shadowCameraFar=1e3,i.shadowDarkness=.5,t.add(i);var n=new O.DirectionalLight(16777215,.35);n.color.setHSL(.3,.5,.75),n.position.set(0,-1,0),t.add(n)}(n),n.add(new $),n.add(new B),n.add(new ee),n.add(new J),n.add(new ie(["flagModule"])),n.add(new ne(["flagModule"],["windModule"])),n}!function(n,e,a,t,i){var r,o,s,u,l,c,h,d,f,p={isWindOn:!0,flag:{imgUploadMode:"web",imgURL:"",imgFilePath:"",hoisting:"dexter",topEdge:"top"}},g=a.extend(!0,{},p),v={toggleWind:function(){g.isWindOn=!g.isWindOn,g.isWindOn?b(200):b(.001)},flag:{setImgUploadMode:function(){"web"===g.flag.imgUploadMode?r.removeClass("upload-mode-file").addClass("upload-mode-web").append(a(".input-img-web")):"file"===g.flag.imgUploadMode&&r.removeClass("upload-mode-web").addClass("upload-mode-file").append(a(".input-img-file"))},setImgURL:function(){g.flag.imgFilePath="",g.flag.imgURL&&(w({imgSrc:g.flag.imgURL}),k())},setImgFile:function(){var e=this.files[0],t=new n.FileReader;g.flag.imgFilePath=this.value,t.onload=function(e){g.flag.imgURL="",w({imgSrc:e.target.result}),k()},t.readAsDataURL(e)},setHoisting:function(){w({hoisting:g.flag.hoisting}),k()},setTopEdge:function(){w({topEdge:g.flag.topEdge}),k()}}},m={flagWaverOpts:g,flagWaverControls:v},y=new ge({src:{defaultValue:"",parse:function(e){return decodeURIComponent(e)},stringify:function(e){return encodeURIComponent(e)}},hoisting:{defaultValue:"dexter",parse:function(e){return e.match(/^dex(ter)?$/gi)?"dexter":e.match(/^sin(ister)?$/gi)?"sinister":void 0},stringify:function(e){return"sin"}},topedge:{defaultValue:"top",parse:function(e){if(e.match(/^(top|right|bottom|left)$/gi))return e.toLowerCase()}}});function w(e){pe.module("flagGroupModule").flag.setOptions(e)}function b(e){pe.module("windModule").setOptions({speed:e}),pe.module("windForceModule").needsUpdate=!0}function j(){var e,t=n.location.hash.split("#")[1],i={};t&&(0<=n.location.href.search(/\#(\!|\?)/)?(e=y.getState(),i.imgURL=e.src,i.hoisting=e.hoisting,i.topEdge=e.topedge):i.imgURL=n.unescape(t)),a.extend(g.flag,p.flag,i),w({imgSrc:g.flag.imgURL||"./assets/img/KA_Flag.png",topEdge:g.flag.topEdge,hoisting:g.flag.hoisting})}function k(){g.flag.imgURL?y.setState({src:g.flag.imgURL,hoisting:g.flag.hoisting,topedge:g.flag.topEdge}):y.setState(null)}function O(e){var t=a(e.data("target"));t.hasClass("expanded")?(e.removeClass("closed").addClass("open").val(e.data("text-expanded")).attr("aria-expanded","true"),t.attr("aria-hidden","false")):(e.removeClass("open").addClass("closed").val(e.data("text-collapsed")).attr("aria-expanded","false"),t.attr("aria-hidden","true"))}t.configure({prefix:"data-rv",preloadData:!0,rootInterface:".",templateDelimiters:["{","}"]}),t.formatters.onoff=function(e,t,i){return e?t||"On":i||"Off"},t.formatters.fileName=function(e,t){return e?e.split("\\").pop():t||""},a(e).ready(function(){r=a("#control-img-upload"),o=a("#set-img-upload-mode"),s=a("#input-img-link"),u=a("#set-img-link"),l=a("#set-hoisting"),c=a("#set-top-edge"),h=a("#open-img-file"),d=a("#info-img-file"),f=a("#wind-toggle"),pe=function(){if(ve)throw new Error("Already initialized.");var e=me();return e.module("windModule").setOptions({directionModifier:x.rotatingDirection}),e.module("windForceModule").needsUpdate=!0,ve=!0,e}(),n.FW_App=pe,a(".js-flag-canvas").append(pe.renderer.domElement),n.dispatchEvent(new n.Event("resize")),j(),a('input[type="button"].expander').on("click",function(){var e=a(this);a(e.data("target")).toggleClass("expanded"),O(e)}).each(function(){O(a(this))}),t.bind(o,m),o.trigger("change"),ce&&a(n).on("popstate",j),t.bind(s,m),t.bind(u,m),h.on("focus",function(){h.parent().addClass("active")}).on("blur",function(){h.parent().removeClass("active")}),t.bind(h,m),t.bind(d,m),t.bind(f,m),t.bind(l,m),t.bind(c,m)})}(window,document,jQuery,rivets)}(THREE);