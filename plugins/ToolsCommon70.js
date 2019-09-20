
/**** JQuery was removed from toolsCommon70. You should include one of the JQuery files under the "JQuery" folder ****/


if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());

/* jQuery cookie */
jQuery.cookie=function(d,c,a){if(typeof c!="undefined"){a=a||{};if(c===null)c="",a.expires=-1;var b="";if(a.expires&&(typeof a.expires=="number"||a.expires.toUTCString))typeof a.expires=="number"?(b=new Date,b.setTime(b.getTime()+a.expires*864E5)):b=a.expires,b="; expires="+b.toUTCString();var e=a.path?"; path="+a.path:"",f=a.domain?"; domain="+a.domain:"",a=a.secure?"; secure":"";document.cookie=[d,"=",encodeURIComponent(c),b,e,f,a].join("")}else{c=null;if(document.cookie&&document.cookie!=""){a=document.cookie.split(";");for(b=0;b<a.length;b++)if(e=jQuery.trim(a[b]),e.substring(0,d.length+1)==d+"="){c=decodeURIComponent(e.substring(d.length+1));break}}return c}};

/* color picker */
"use strict"; window.jscolor || (window.jscolor = function () { var e = { register: function () { e.attachDOMReadyEvent(e.init), e.attachEvent(document, "mousedown", e.onDocumentMouseDown), e.attachEvent(document, "touchstart", e.onDocumentTouchStart), e.attachEvent(window, "resize", e.onWindowResize) }, init: function () { e.jscolor.lookupClass && e.jscolor.installByClassName(e.jscolor.lookupClass) }, tryInstallOnElements: function (t, n) { var r = new RegExp("(^|\\s)(" + n + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i"); for (var i = 0; i < t.length; i += 1) { if (t[i].type !== undefined && t[i].type.toLowerCase() == "color" && e.isColorAttrSupported) continue; var s; if (!t[i].jscolor && t[i].className && (s = t[i].className.match(r))) { var o = t[i], u = null, a = e.getDataAttr(o, "jscolor"); a !== null ? u = a : s[4] && (u = s[4]); var f = {}; if (u) try { f = (new Function("return (" + u + ")"))() } catch (l) { e.warn("Error parsing jscolor options: " + l + ":\n" + u) } o.jscolor = new e.jscolor(o, f) } } }, isColorAttrSupported: function () { var e = document.createElement("input"); if (e.setAttribute) { e.setAttribute("type", "color"); if (e.type.toLowerCase() == "color") return !0 } return !1 } (), isCanvasSupported: function () { var e = document.createElement("canvas"); return !!e.getContext && !!e.getContext("2d") } (), fetchElement: function (e) { return typeof e == "string" ? document.getElementById(e) : e }, isElementType: function (e, t) { return e.nodeName.toLowerCase() === t.toLowerCase() }, getDataAttr: function (e, t) { var n = "data-" + t, r = e.getAttribute(n); return r !== null ? r : null }, attachEvent: function (e, t, n) { e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n) }, detachEvent: function (e, t, n) { e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n) }, _attachedGroupEvents: {}, attachGroupEvent: function (t, n, r, i) { e._attachedGroupEvents.hasOwnProperty(t) || (e._attachedGroupEvents[t] = []), e._attachedGroupEvents[t].push([n, r, i]), e.attachEvent(n, r, i) }, detachGroupEvents: function (t) { if (e._attachedGroupEvents.hasOwnProperty(t)) { for (var n = 0; n < e._attachedGroupEvents[t].length; n += 1) { var r = e._attachedGroupEvents[t][n]; e.detachEvent(r[0], r[1], r[2]) } delete e._attachedGroupEvents[t] } }, attachDOMReadyEvent: function (e) { var t = !1, n = function () { t || (t = !0, e()) }; if (document.readyState === "complete") { setTimeout(n, 1); return } if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1); else if (document.attachEvent) { document.attachEvent("onreadystatechange", function () { document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), n()) }), window.attachEvent("onload", n); if (document.documentElement.doScroll && window == window.top) { var r = function () { if (!document.body) return; try { document.documentElement.doScroll("left"), n() } catch (e) { setTimeout(r, 1) } }; r() } } }, warn: function (e) { window.console && window.console.warn && window.console.warn(e) }, preventDefault: function (e) { e.preventDefault && e.preventDefault(), e.returnValue = !1 }, captureTarget: function (t) { t.setCapture && (e._capturedTarget = t, e._capturedTarget.setCapture()) }, releaseTarget: function () { e._capturedTarget && (e._capturedTarget.releaseCapture(), e._capturedTarget = null) }, fireEvent: function (e, t) { if (!e) return; if (document.createEvent) { var n = document.createEvent("HTMLEvents"); n.initEvent(t, !0, !0), e.dispatchEvent(n) } else if (document.createEventObject) { var n = document.createEventObject(); e.fireEvent("on" + t, n) } else e["on" + t] && e["on" + t]() }, classNameToList: function (e) { return e.replace(/^\s+|\s+$/g, "").split(/\s+/) }, hasClass: function (e, t) { return t ? -1 != (" " + e.className.replace(/\s+/g, " ") + " ").indexOf(" " + t + " ") : !1 }, setClass: function (t, n) { var r = e.classNameToList(n); for (var i = 0; i < r.length; i += 1) e.hasClass(t, r[i]) || (t.className += (t.className ? " " : "") + r[i]) }, unsetClass: function (t, n) { var r = e.classNameToList(n); for (var i = 0; i < r.length; i += 1) { var s = new RegExp("^\\s*" + r[i] + "\\s*|" + "\\s*" + r[i] + "\\s*$|" + "\\s+" + r[i] + "(\\s+)", "g"); t.className = t.className.replace(s, "$1") } }, getStyle: function (e) { return window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle }, setStyle: function () { var e = document.createElement("div"), t = function (t) { for (var n = 0; n < t.length; n += 1) if (t[n] in e.style) return t[n] }, n = { borderRadius: t(["borderRadius", "MozBorderRadius", "webkitBorderRadius"]), boxShadow: t(["boxShadow", "MozBoxShadow", "webkitBoxShadow"]) }; return function (e, t, r) { switch (t.toLowerCase()) { case "opacity": var i = Math.round(parseFloat(r) * 100); e.style.opacity = r, e.style.filter = "alpha(opacity=" + i + ")"; break; default: e.style[n[t]] = r } } } (), setBorderRadius: function (t, n) { e.setStyle(t, "borderRadius", n || "0") }, setBoxShadow: function (t, n) { e.setStyle(t, "boxShadow", n || "none") }, getElementPos: function (t, n) { var r = 0, i = 0, s = t.getBoundingClientRect(); r = s.left, i = s.top; if (!n) { var o = e.getViewPos(); r += o[0], i += o[1] } return [r, i] }, getElementSize: function (e) { return [e.offsetWidth, e.offsetHeight] }, getAbsPointerPos: function (e) { e || (e = window.event); var t = 0, n = 0; return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (t = e.changedTouches[0].clientX, n = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (t = e.clientX, n = e.clientY), { x: t, y: n} }, getRelPointerPos: function (e) { e || (e = window.event); var t = e.target || e.srcElement, n = t.getBoundingClientRect(), r = 0, i = 0, s = 0, o = 0; return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (s = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (s = e.clientX, o = e.clientY), r = s - n.left, i = o - n.top, { x: r, y: i} }, getViewPos: function () { var e = document.documentElement; return [(window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0), (window.pageYOffset || e.scrollTop) - (e.clientTop || 0)] }, getViewSize: function () { var e = document.documentElement; return [window.innerWidth || e.clientWidth, window.innerHeight || e.clientHeight] }, redrawPosition: function () { if (e.picker && e.picker.owner) { var t = e.picker.owner, n, r; t.fixed ? (n = e.getElementPos(t.targetElement, !0), r = [0, 0]) : (n = e.getElementPos(t.targetElement), r = e.getViewPos()); var i = e.getElementSize(t.targetElement), s = e.getViewSize(), o = e.getPickerOuterDims(t), u, a, f; switch (t.position.toLowerCase()) { case "left": u = 1, a = 0, f = -1; break; case "right": u = 1, a = 0, f = 1; break; case "top": u = 0, a = 1, f = -1; break; default: u = 0, a = 1, f = 1 } var l = (i[a] + o[a]) / 2; if (!t.smartPosition) var c = [n[u], n[a] + i[a] - l + l * f]; else var c = [-r[u] + n[u] + o[u] > s[u] ? -r[u] + n[u] + i[u] / 2 > s[u] / 2 && n[u] + i[u] - o[u] >= 0 ? n[u] + i[u] - o[u] : n[u] : n[u], -r[a] + n[a] + i[a] + o[a] - l + l * f > s[a] ? -r[a] + n[a] + i[a] / 2 > s[a] / 2 && n[a] + i[a] - l - l * f >= 0 ? n[a] + i[a] - l - l * f : n[a] + i[a] - l + l * f : n[a] + i[a] - l + l * f >= 0 ? n[a] + i[a] - l + l * f : n[a] + i[a] - l - l * f]; var h = c[u], p = c[a], d = t.fixed ? "fixed" : "absolute", v = (c[0] + o[0] > n[0] || c[0] < n[0] + i[0]) && c[1] + o[1] < n[1] + i[1]; e._drawPosition(t, h, p, d, v) } }, _drawPosition: function (t, n, r, i, s) { var o = s ? 0 : t.shadowBlur; e.picker.wrap.style.position = i, e.picker.wrap.style.left = n + "px", e.picker.wrap.style.top = r + "px", e.setBoxShadow(e.picker.boxS, t.shadow ? new e.BoxShadow(0, o, t.shadowBlur, 0, t.shadowColor) : null) }, getPickerDims: function (t) { var n = !!e.getSliderComponent(t), r = [2 * t.insetWidth + 2 * t.padding + t.width + (n ? 2 * t.insetWidth + e.getPadToSliderPadding(t) + t.sliderSize : 0), 2 * t.insetWidth + 2 * t.padding + t.height + (t.closable ? 2 * t.insetWidth + t.padding + t.buttonHeight : 0)]; return r }, getPickerOuterDims: function (t) { var n = e.getPickerDims(t); return [n[0] + 2 * t.borderWidth, n[1] + 2 * t.borderWidth] }, getPadToSliderPadding: function (e) { return Math.max(e.padding, 1.5 * (2 * e.pointerBorderWidth + e.pointerThickness)) }, getPadYComponent: function (e) { switch (e.mode.charAt(1).toLowerCase()) { case "v": return "v" } return "s" }, getSliderComponent: function (e) { if (e.mode.length > 2) switch (e.mode.charAt(2).toLowerCase()) { case "s": return "s"; case "v": return "v" } return null }, onDocumentMouseDown: function (t) { t || (t = window.event); var n = t.target || t.srcElement; n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "mouse") : e.picker && e.picker.owner && e.picker.owner.hide() }, onDocumentTouchStart: function (t) { t || (t = window.event); var n = t.target || t.srcElement; n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "touch") : e.picker && e.picker.owner && e.picker.owner.hide() }, onWindowResize: function (t) { e.redrawPosition() }, onParentScroll: function (t) { e.picker && e.picker.owner && e.picker.owner.hide() }, _pointerMoveEvent: { mouse: "mousemove", touch: "touchmove" }, _pointerEndEvent: { mouse: "mouseup", touch: "touchend" }, _pointerOrigin: null, _capturedTarget: null, onControlPointerStart: function (t, n, r, i) { var s = n._jscInstance; e.preventDefault(t), e.captureTarget(n); var o = function (s, o) { e.attachGroupEvent("drag", s, e._pointerMoveEvent[i], e.onDocumentPointerMove(t, n, r, i, o)), e.attachGroupEvent("drag", s, e._pointerEndEvent[i], e.onDocumentPointerEnd(t, n, r, i)) }; o(document, [0, 0]); if (window.parent && window.frameElement) { var u = window.frameElement.getBoundingClientRect(), a = [-u.left, -u.top]; o(window.parent.window.document, a) } var f = e.getAbsPointerPos(t), l = e.getRelPointerPos(t); e._pointerOrigin = { x: f.x - l.x, y: f.y - l.y }; switch (r) { case "pad": switch (e.getSliderComponent(s)) { case "s": s.hsv[1] === 0 && s.fromHSV(null, 100, null); break; case "v": s.hsv[2] === 0 && s.fromHSV(null, null, 100) } e.setPad(s, t, 0, 0); break; case "sld": e.setSld(s, t, 0) } e.dispatchFineChange(s) }, onDocumentPointerMove: function (t, n, r, i, s) { return function (t) { var i = n._jscInstance; switch (r) { case "pad": t || (t = window.event), e.setPad(i, t, s[0], s[1]), e.dispatchFineChange(i); break; case "sld": t || (t = window.event), e.setSld(i, t, s[1]), e.dispatchFineChange(i) } } }, onDocumentPointerEnd: function (t, n, r, i) { return function (t) { var r = n._jscInstance; e.detachGroupEvents("drag"), e.releaseTarget(), e.dispatchChange(r) } }, dispatchChange: function (t) { t.valueElement && e.isElementType(t.valueElement, "input") && e.fireEvent(t.valueElement, "change") }, dispatchFineChange: function (e) { if (e.onFineChange) { var t; typeof e.onFineChange == "string" ? t = new Function(e.onFineChange) : t = e.onFineChange, t.call(e) } }, setPad: function (t, n, r, i) { var s = e.getAbsPointerPos(n), o = r + s.x - e._pointerOrigin.x - t.padding - t.insetWidth, u = i + s.y - e._pointerOrigin.y - t.padding - t.insetWidth, a = o * (360 / (t.width - 1)), f = 100 - u * (100 / (t.height - 1)); switch (e.getPadYComponent(t)) { case "s": t.fromHSV(a, f, null, e.leaveSld); break; case "v": t.fromHSV(a, null, f, e.leaveSld) } }, setSld: function (t, n, r) { var i = e.getAbsPointerPos(n), s = r + i.y - e._pointerOrigin.y - t.padding - t.insetWidth, o = 100 - s * (100 / (t.height - 1)); switch (e.getSliderComponent(t)) { case "s": t.fromHSV(null, o, null, e.leavePad); break; case "v": t.fromHSV(null, null, o, e.leavePad) } }, _vmlNS: "jsc_vml_", _vmlCSS: "jsc_vml_css_", _vmlReady: !1, initVML: function () { if (!e._vmlReady) { var t = document; t.namespaces[e._vmlNS] || t.namespaces.add(e._vmlNS, "urn:schemas-microsoft-com:vml"); if (!t.styleSheets[e._vmlCSS]) { var n = ["shape", "shapetype", "group", "background", "path", "formulas", "handles", "fill", "stroke", "shadow", "textbox", "textpath", "imagedata", "line", "polyline", "curve", "rect", "roundrect", "oval", "arc", "image"], r = t.createStyleSheet(); r.owningElement.id = e._vmlCSS; for (var i = 0; i < n.length; i += 1) r.addRule(e._vmlNS + "\\:" + n[i], "behavior:url(#default#VML);") } e._vmlReady = !0 } }, createPalette: function () { var t = { elm: null, draw: null }; if (e.isCanvasSupported) { var n = document.createElement("canvas"), r = n.getContext("2d"), i = function (e, t, i) { n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height); var s = r.createLinearGradient(0, 0, n.width, 0); s.addColorStop(0, "#F00"), s.addColorStop(1 / 6, "#FF0"), s.addColorStop(2 / 6, "#0F0"), s.addColorStop(.5, "#0FF"), s.addColorStop(4 / 6, "#00F"), s.addColorStop(5 / 6, "#F0F"), s.addColorStop(1, "#F00"), r.fillStyle = s, r.fillRect(0, 0, n.width, n.height); var o = r.createLinearGradient(0, 0, 0, n.height); switch (i.toLowerCase()) { case "s": o.addColorStop(0, "rgba(255,255,255,0)"), o.addColorStop(1, "rgba(255,255,255,1)"); break; case "v": o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(1, "rgba(0,0,0,1)") } r.fillStyle = o, r.fillRect(0, 0, n.width, n.height) }; t.elm = n, t.draw = i } else { e.initVML(); var s = document.createElement("div"); s.style.position = "relative", s.style.overflow = "hidden"; var o = document.createElement(e._vmlNS + ":fill"); o.type = "gradient", o.method = "linear", o.angle = "90", o.colors = "16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0"; var u = document.createElement(e._vmlNS + ":rect"); u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u); var a = document.createElement(e._vmlNS + ":fill"); a.type = "gradient", a.method = "linear", a.angle = "180", a.opacity = "0"; var f = document.createElement(e._vmlNS + ":rect"); f.style.position = "absolute", f.style.left = "-1px", f.style.top = "-1px", f.stroked = !1, f.appendChild(a), s.appendChild(f); var i = function (e, t, n) { s.style.width = e + "px", s.style.height = t + "px", u.style.width = f.style.width = e + 1 + "px", u.style.height = f.style.height = t + 1 + "px", o.color = "#F00", o.color2 = "#F00"; switch (n.toLowerCase()) { case "s": a.color = a.color2 = "#FFF"; break; case "v": a.color = a.color2 = "#000" } }; t.elm = s, t.draw = i } return t }, createSliderGradient: function () { var t = { elm: null, draw: null }; if (e.isCanvasSupported) { var n = document.createElement("canvas"), r = n.getContext("2d"), i = function (e, t, i, s) { n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height); var o = r.createLinearGradient(0, 0, 0, n.height); o.addColorStop(0, i), o.addColorStop(1, s), r.fillStyle = o, r.fillRect(0, 0, n.width, n.height) }; t.elm = n, t.draw = i } else { e.initVML(); var s = document.createElement("div"); s.style.position = "relative", s.style.overflow = "hidden"; var o = document.createElement(e._vmlNS + ":fill"); o.type = "gradient", o.method = "linear", o.angle = "180"; var u = document.createElement(e._vmlNS + ":rect"); u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u); var i = function (e, t, n, r) { s.style.width = e + "px", s.style.height = t + "px", u.style.width = e + 1 + "px", u.style.height = t + 1 + "px", o.color = n, o.color2 = r }; t.elm = s, t.draw = i } return t }, leaveValue: 1, leaveStyle: 2, leavePad: 4, leaveSld: 8, BoxShadow: function () { var e = function (e, t, n, r, i, s) { this.hShadow = e, this.vShadow = t, this.blur = n, this.spread = r, this.color = i, this.inset = !!s }; return e.prototype.toString = function () { var e = [Math.round(this.hShadow) + "px", Math.round(this.vShadow) + "px", Math.round(this.blur) + "px", Math.round(this.spread) + "px", this.color]; return this.inset && e.push("inset"), e.join(" ") }, e } (), jscolor: function (t, n) { function i(e, t, n) { e /= 255, t /= 255, n /= 255; var r = Math.min(Math.min(e, t), n), i = Math.max(Math.max(e, t), n), s = i - r; if (s === 0) return [null, 0, 100 * i]; var o = e === r ? 3 + (n - t) / s : t === r ? 5 + (e - n) / s : 1 + (t - e) / s; return [60 * (o === 6 ? 0 : o), 100 * (s / i), 100 * i] } function s(e, t, n) { var r = 255 * (n / 100); if (e === null) return [r, r, r]; e /= 60, t /= 100; var i = Math.floor(e), s = i % 2 ? e - i : 1 - (e - i), o = r * (1 - t), u = r * (1 - t * s); switch (i) { case 6: case 0: return [r, u, o]; case 1: return [u, r, o]; case 2: return [o, r, u]; case 3: return [o, u, r]; case 4: return [u, o, r]; case 5: return [r, o, u] } } function o() { e.unsetClass(d.targetElement, d.activeClass), e.picker.wrap.parentNode.removeChild(e.picker.wrap), delete e.picker.owner } function u() { function l() { var e = d.insetColor.split(/\s+/), n = e.length < 2 ? e[0] : e[1] + " " + e[0] + " " + e[0] + " " + e[1]; t.btn.style.borderColor = n } d._processParentElementsInDOM(), e.picker || (e.picker = { owner: null, wrap: document.createElement("div"), box: document.createElement("div"), boxS: document.createElement("div"), boxB: document.createElement("div"), pad: document.createElement("div"), padB: document.createElement("div"), padM: document.createElement("div"), padPal: e.createPalette(), cross: document.createElement("div"), crossBY: document.createElement("div"), crossBX: document.createElement("div"), crossLY: document.createElement("div"), crossLX: document.createElement("div"), sld: document.createElement("div"), sldB: document.createElement("div"), sldM: document.createElement("div"), sldGrad: e.createSliderGradient(), sldPtrS: document.createElement("div"), sldPtrIB: document.createElement("div"), sldPtrMB: document.createElement("div"), sldPtrOB: document.createElement("div"), btn: document.createElement("div"), btnT: document.createElement("span") }, e.picker.pad.appendChild(e.picker.padPal.elm), e.picker.padB.appendChild(e.picker.pad), e.picker.cross.appendChild(e.picker.crossBY), e.picker.cross.appendChild(e.picker.crossBX), e.picker.cross.appendChild(e.picker.crossLY), e.picker.cross.appendChild(e.picker.crossLX), e.picker.padB.appendChild(e.picker.cross), e.picker.box.appendChild(e.picker.padB), e.picker.box.appendChild(e.picker.padM), e.picker.sld.appendChild(e.picker.sldGrad.elm), e.picker.sldB.appendChild(e.picker.sld), e.picker.sldB.appendChild(e.picker.sldPtrOB), e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB), e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB), e.picker.sldPtrIB.appendChild(e.picker.sldPtrS), e.picker.box.appendChild(e.picker.sldB), e.picker.box.appendChild(e.picker.sldM), e.picker.btn.appendChild(e.picker.btnT), e.picker.box.appendChild(e.picker.btn), e.picker.boxB.appendChild(e.picker.box), e.picker.wrap.appendChild(e.picker.boxS), e.picker.wrap.appendChild(e.picker.boxB)); var t = e.picker, n = !!e.getSliderComponent(d), r = e.getPickerDims(d), i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize, s = e.getPadToSliderPadding(d), o = Math.min(d.borderRadius, Math.round(d.padding * Math.PI)), u = "crosshair"; t.wrap.style.clear = "both", t.wrap.style.width = r[0] + 2 * d.borderWidth + "px", t.wrap.style.height = r[1] + 2 * d.borderWidth + "px", t.wrap.style.zIndex = d.zIndex, t.box.style.width = r[0] + "px", t.box.style.height = r[1] + "px", t.boxS.style.position = "absolute", t.boxS.style.left = "0", t.boxS.style.top = "0", t.boxS.style.width = "100%", t.boxS.style.height = "100%", e.setBorderRadius(t.boxS, o + "px"), t.boxB.style.position = "relative", t.boxB.style.border = d.borderWidth + "px solid", t.boxB.style.borderColor = d.borderColor, t.boxB.style.background = d.backgroundColor, e.setBorderRadius(t.boxB, o + "px"), t.padM.style.background = t.sldM.style.background = "#FFF", e.setStyle(t.padM, "opacity", "0"), e.setStyle(t.sldM, "opacity", "0"), t.pad.style.position = "relative", t.pad.style.width = d.width + "px", t.pad.style.height = d.height + "px", t.padPal.draw(d.width, d.height, e.getPadYComponent(d)), t.padB.style.position = "absolute", t.padB.style.left = d.padding + "px", t.padB.style.top = d.padding + "px", t.padB.style.border = d.insetWidth + "px solid", t.padB.style.borderColor = d.insetColor, t.padM._jscInstance = d, t.padM._jscControlName = "pad", t.padM.style.position = "absolute", t.padM.style.left = "0", t.padM.style.top = "0", t.padM.style.width = d.padding + 2 * d.insetWidth + d.width + s / 2 + "px", t.padM.style.height = r[1] + "px", t.padM.style.cursor = u, t.cross.style.position = "absolute", t.cross.style.left = t.cross.style.top = "0", t.cross.style.width = t.cross.style.height = i + "px", t.crossBY.style.position = t.crossBX.style.position = "absolute", t.crossBY.style.background = t.crossBX.style.background = d.pointerBorderColor, t.crossBY.style.width = t.crossBX.style.height = 2 * d.pointerBorderWidth + d.pointerThickness + "px", t.crossBY.style.height = t.crossBX.style.width = i + "px", t.crossBY.style.left = t.crossBX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) - d.pointerBorderWidth + "px", t.crossBY.style.top = t.crossBX.style.left = "0", t.crossLY.style.position = t.crossLX.style.position = "absolute", t.crossLY.style.background = t.crossLX.style.background = d.pointerColor, t.crossLY.style.height = t.crossLX.style.width = i - 2 * d.pointerBorderWidth + "px", t.crossLY.style.width = t.crossLX.style.height = d.pointerThickness + "px", t.crossLY.style.left = t.crossLX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) + "px", t.crossLY.style.top = t.crossLX.style.left = d.pointerBorderWidth + "px", t.sld.style.overflow = "hidden", t.sld.style.width = d.sliderSize + "px", t.sld.style.height = d.height + "px", t.sldGrad.draw(d.sliderSize, d.height, "#000", "#000"), t.sldB.style.display = n ? "block" : "none", t.sldB.style.position = "absolute", t.sldB.style.right = d.padding + "px", t.sldB.style.top = d.padding + "px", t.sldB.style.border = d.insetWidth + "px solid", t.sldB.style.borderColor = d.insetColor, t.sldM._jscInstance = d, t.sldM._jscControlName = "sld", t.sldM.style.display = n ? "block" : "none", t.sldM.style.position = "absolute", t.sldM.style.right = "0", t.sldM.style.top = "0", t.sldM.style.width = d.sliderSize + s / 2 + d.padding + 2 * d.insetWidth + "px", t.sldM.style.height = r[1] + "px", t.sldM.style.cursor = "default", t.sldPtrIB.style.border = t.sldPtrOB.style.border = d.pointerBorderWidth + "px solid " + d.pointerBorderColor, t.sldPtrOB.style.position = "absolute", t.sldPtrOB.style.left = -(2 * d.pointerBorderWidth + d.pointerThickness) + "px", t.sldPtrOB.style.top = "0", t.sldPtrMB.style.border = d.pointerThickness + "px solid " + d.pointerColor, t.sldPtrS.style.width = d.sliderSize + "px", t.sldPtrS.style.height = m + "px", t.btn.style.display = d.closable ? "block" : "none", t.btn.style.position = "absolute", t.btn.style.left = d.padding + "px", t.btn.style.bottom = d.padding + "px", t.btn.style.padding = "0 15px", t.btn.style.height = d.buttonHeight + "px", t.btn.style.border = d.insetWidth + "px solid", l(), t.btn.style.color = d.buttonColor, t.btn.style.font = "12px sans-serif", t.btn.style.textAlign = "center"; try { t.btn.style.cursor = "pointer" } catch (c) { t.btn.style.cursor = "hand" } t.btn.onmousedown = function () { d.hide() }, t.btnT.style.lineHeight = d.buttonHeight + "px", t.btnT.innerHTML = "", t.btnT.appendChild(document.createTextNode(d.closeText)), a(), f(), e.picker.owner && e.picker.owner !== d && e.unsetClass(e.picker.owner.targetElement, d.activeClass), e.picker.owner = d, e.isElementType(v, "body") ? e.redrawPosition() : e._drawPosition(d, 0, 0, "relative", !1), t.wrap.parentNode != v && v.appendChild(t.wrap), e.setClass(d.targetElement, d.activeClass) } function a() { switch (e.getPadYComponent(d)) { case "s": var t = 1; break; case "v": var t = 2 } var n = Math.round(d.hsv[0] / 360 * (d.width - 1)), r = Math.round((1 - d.hsv[t] / 100) * (d.height - 1)), i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize, o = -Math.floor(i / 2); e.picker.cross.style.left = n + o + "px", e.picker.cross.style.top = r + o + "px"; switch (e.getSliderComponent(d)) { case "s": var u = s(d.hsv[0], 100, d.hsv[2]), a = s(d.hsv[0], 0, d.hsv[2]), f = "rgb(" + Math.round(u[0]) + "," + Math.round(u[1]) + "," + Math.round(u[2]) + ")", l = "rgb(" + Math.round(a[0]) + "," + Math.round(a[1]) + "," + Math.round(a[2]) + ")"; e.picker.sldGrad.draw(d.sliderSize, d.height, f, l); break; case "v": var c = s(d.hsv[0], d.hsv[1], 100), f = "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")", l = "#000"; e.picker.sldGrad.draw(d.sliderSize, d.height, f, l) } } function f() { var t = e.getSliderComponent(d); if (t) { switch (t) { case "s": var n = 1; break; case "v": var n = 2 } var r = Math.round((1 - d.hsv[n] / 100) * (d.height - 1)); e.picker.sldPtrOB.style.top = r - (2 * d.pointerBorderWidth + d.pointerThickness) - Math.floor(m / 2) + "px" } } function l() { return e.picker && e.picker.owner === d } function c() { d.importColor() } this.value = null, this.valueElement = t, this.styleElement = t, this.required = !0, this.refine = !0, this.hash = !1, this.uppercase = !0, this.onFineChange = null, this.activeClass = "jscolor-active", this.minS = 0, this.maxS = 100, this.minV = 0, this.maxV = 100, this.hsv = [0, 0, 100], this.rgb = [255, 255, 255], this.width = 181, this.height = 101, this.showOnClick = !0, this.mode = "HSV", this.position = "bottom", this.smartPosition = !0, this.sliderSize = 16, this.crossSize = 8, this.closable = !1, this.closeText = "Close", this.buttonColor = "#000000", this.buttonHeight = 18, this.padding = 12, this.backgroundColor = "#FFFFFF", this.borderWidth = 1, this.borderColor = "#BBBBBB", this.borderRadius = 8, this.insetWidth = 1, this.insetColor = "#BBBBBB", this.shadow = !0, this.shadowBlur = 15, this.shadowColor = "rgba(0,0,0,0.2)", this.pointerColor = "#4C4C4C", this.pointerBorderColor = "#FFFFFF", this.pointerBorderWidth = 1, this.pointerThickness = 2, this.zIndex = 1e3, this.container = null; for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]); this.hide = function () { l() && o() }, this.show = function () { u() }, this.redraw = function () { l() && u() }, this.importColor = function () { this.valueElement ? e.isElementType(this.valueElement, "input") ? this.refine ? !this.required && /^\s*$/.test(this.valueElement.value) ? (this.valueElement.value = "", this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.fromString(this.valueElement.value) || this.exportColor() : this.fromString(this.valueElement.value, e.leaveValue) || (this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.exportColor() : this.exportColor() }, this.exportColor = function (t) { if (!(t & e.leaveValue) && this.valueElement) { var n = this.toString(); this.uppercase && (n = n.toUpperCase()), this.hash && (n = "#" + n), e.isElementType(this.valueElement, "input") ? this.valueElement.value = n : this.valueElement.innerHTML = n } t & e.leaveStyle || this.styleElement && (this.styleElement.style.backgroundImage = "none", this.styleElement.style.backgroundColor = "#" + this.toString(), this.styleElement.style.color = this.isLight() ? "#000" : "#FFF"), !(t & e.leavePad) && l() && a(), !(t & e.leaveSld) && l() && f() }, this.fromHSV = function (e, t, n, r) { if (e !== null) { if (isNaN(e)) return !1; e = Math.max(0, Math.min(360, e)) } if (t !== null) { if (isNaN(t)) return !1; t = Math.max(0, Math.min(100, this.maxS, t), this.minS) } if (n !== null) { if (isNaN(n)) return !1; n = Math.max(0, Math.min(100, this.maxV, n), this.minV) } this.rgb = s(e === null ? this.hsv[0] : this.hsv[0] = e, t === null ? this.hsv[1] : this.hsv[1] = t, n === null ? this.hsv[2] : this.hsv[2] = n), this.exportColor(r) }, this.fromRGB = function (e, t, n, r) { if (e !== null) { if (isNaN(e)) return !1; e = Math.max(0, Math.min(255, e)) } if (t !== null) { if (isNaN(t)) return !1; t = Math.max(0, Math.min(255, t)) } if (n !== null) { if (isNaN(n)) return !1; n = Math.max(0, Math.min(255, n)) } var o = i(e === null ? this.rgb[0] : e, t === null ? this.rgb[1] : t, n === null ? this.rgb[2] : n); o[0] !== null && (this.hsv[0] = Math.max(0, Math.min(360, o[0]))), o[2] !== 0 && (this.hsv[1] = o[1] === null ? null : Math.max(0, this.minS, Math.min(100, this.maxS, o[1]))), this.hsv[2] = o[2] === null ? null : Math.max(0, this.minV, Math.min(100, this.maxV, o[2])); var u = s(this.hsv[0], this.hsv[1], this.hsv[2]); this.rgb[0] = u[0], this.rgb[1] = u[1], this.rgb[2] = u[2], this.exportColor(r) }, this.fromString = function (e, t) { var n; if (n = e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) return n[1].length === 6 ? this.fromRGB(parseInt(n[1].substr(0, 2), 16), parseInt(n[1].substr(2, 2), 16), parseInt(n[1].substr(4, 2), 16), t) : this.fromRGB(parseInt(n[1].charAt(0) + n[1].charAt(0), 16), parseInt(n[1].charAt(1) + n[1].charAt(1), 16), parseInt(n[1].charAt(2) + n[1].charAt(2), 16), t), !0; if (n = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) { var r = n[1].split(","), i = /^\s*(\d*)(\.\d+)?\s*$/, s, o, u; if (r.length >= 3 && (s = r[0].match(i)) && (o = r[1].match(i)) && (u = r[2].match(i))) { var a = parseFloat((s[1] || "0") + (s[2] || "")), f = parseFloat((o[1] || "0") + (o[2] || "")), l = parseFloat((u[1] || "0") + (u[2] || "")); return this.fromRGB(a, f, l, t), !0 } } return !1 }, this.toString = function () { return (256 | Math.round(this.rgb[0])).toString(16).substr(1) + (256 | Math.round(this.rgb[1])).toString(16).substr(1) + (256 | Math.round(this.rgb[2])).toString(16).substr(1) }, this.toHEXString = function () { return "#" + this.toString().toUpperCase() }, this.toRGBString = function () { return "rgb(" + Math.round(this.rgb[0]) + "," + Math.round(this.rgb[1]) + "," + Math.round(this.rgb[2]) + ")" }, this.isLight = function () { return .213 * this.rgb[0] + .715 * this.rgb[1] + .072 * this.rgb[2] > 127.5 }, this._processParentElementsInDOM = function () { if (this._linkedElementsProcessed) return; this._linkedElementsProcessed = !0; var t = this.targetElement; do { var n = e.getStyle(t); n && n.position.toLowerCase() === "fixed" && (this.fixed = !0), t !== this.targetElement && (t._jscEventsAttached || (e.attachEvent(t, "scroll", e.onParentScroll), t._jscEventsAttached = !0)) } while ((t = t.parentNode) && !e.isElementType(t, "body")) }; if (typeof t == "string") { var h = t, p = document.getElementById(h); p ? this.targetElement = p : e.warn("Could not find target element with ID '" + h + "'") } else t ? this.targetElement = t : e.warn("Invalid target element: '" + t + "'"); if (this.targetElement._jscLinkedInstance) { e.warn("Cannot link jscolor twice to the same element. Skipping."); return } this.targetElement._jscLinkedInstance = this, this.valueElement = e.fetchElement(this.valueElement), this.styleElement = e.fetchElement(this.styleElement); var d = this, v = this.container ? e.fetchElement(this.container) : document.getElementsByTagName("body")[0], m = 3; if (e.isElementType(this.targetElement, "button")) if (this.targetElement.onclick) { var g = this.targetElement.onclick; this.targetElement.onclick = function (e) { return g.call(this, e), !1 } } else this.targetElement.onclick = function () { return !1 }; if (this.valueElement && e.isElementType(this.valueElement, "input")) { var y = function () { d.fromString(d.valueElement.value, e.leaveValue), e.dispatchFineChange(d) }; e.attachEvent(this.valueElement, "keyup", y), e.attachEvent(this.valueElement, "input", y), e.attachEvent(this.valueElement, "blur", c), this.valueElement.setAttribute("autocomplete", "off") } this.styleElement && (this.styleElement._jscOrigStyle = { backgroundImage: this.styleElement.style.backgroundImage, backgroundColor: this.styleElement.style.backgroundColor, color: this.styleElement.style.color }), this.value ? this.fromString(this.value) || this.exportColor() : this.importColor() } }; return e.jscolor.lookupClass = "jscolor", e.jscolor.installByClassName = function (t) { var n = document.getElementsByTagName("input"), r = document.getElementsByTagName("button"); e.tryInstallOnElements(n, t), e.tryInstallOnElements(r, t) }, e.register(), e.jscolor } ());

/*
New API enums. Generated from Freeze20
*/
var ActionCode = {}; ActionCode.AC_FLYTO = 0; ActionCode.AC_CIRCLEPATTERN = 1; ActionCode.AC_OVALPATTERN = 2; ActionCode.AC_LINEPATTERN = 3; ActionCode.AC_ARCPATTERN = 4; ActionCode.AC_FOLLOWBEHIND = 5; ActionCode.AC_FOLLOWABOVE = 6; ActionCode.AC_FOLLOWBELOW = 7; ActionCode.AC_FOLLOWRIGHT = 8; ActionCode.AC_FOLLOWLEFT = 9; ActionCode.AC_FOLLOWBEHINDANDABOVE = 10; ActionCode.AC_FOLLOWCOCKPIT = 11; ActionCode.AC_FOLLOWFROMGROUND = 12; ActionCode.AC_STOP = 13; ActionCode.AC_JUMP = 14; ActionCode.AC_DELETE = 15; ActionCode.AC_EDIT_FINISHED = 16; ActionCode.AC_OBJECT_ADDED = 17; ActionCode.AC_PLAY = 18; ActionCode.AC_SHOW = 19; ActionCode.AC_EDIT_STARTED = 20; ActionCode.AC_SELCHANGED = 21; ActionCode.AC_WAYPOINT_REACHED = 22; ActionCode.AC_GROUP_ADDED = 23; ActionCode.AC_LAYER_ADDED = 24; ActionCode.AC_LAYER_REFRESHED = 25; ActionCode.AC_ITEM_MOVED=26; var AltitudeTypeCode = {}; AltitudeTypeCode.ATC_TERRAIN_RELATIVE = 0; AltitudeTypeCode.ATC_PIVOT_RELATIVE = 1; AltitudeTypeCode.ATC_ON_TERRAIN = 2; AltitudeTypeCode.ATC_TERRAIN_ABSOLUTE = 3; AltitudeTypeCode.ATC_DEFAULT = 999; var DynamicMotionStyle = {}; DynamicMotionStyle.MOTION_GROUND_VEHICLE = 0; DynamicMotionStyle.MOTION_AIRPLANE = 1; DynamicMotionStyle.MOTION_HELICOPTER = 2; DynamicMotionStyle.MOTION_HOVER = 3; var DynamicObjectType = {}; DynamicObjectType.DYNAMIC_3D_MODEL = 0; DynamicObjectType.DYNAMIC_TEXT_LABEL = 1; DynamicObjectType.DYNAMIC_IMAGE_LABEL = 2; DynamicObjectType.DYNAMIC_VIRTUAL = 3; var LabelStyle = {}; LabelStyle.LS_DEFAULT = 0; LabelStyle.LS_STREET = 1; LabelStyle.LS_STATE = 2; var MsgClient6 = {}; MsgClient6.MC_LEFT = 0; MsgClient6.MC_MAIN = 2; MsgClient6.MC_MESSAGE_BAR = 3; MsgClient6.MC_FLOAT = 4; MsgClient6.MC_POPUP = 5; var MsgType = {}; MsgType.TYPE_TEXT = 0; MsgType.TYPE_URL = 1; MsgType.TYPE_SCRIPT = 3; var ModelTypeCode = {}; ModelTypeCode.MT_NORMAL = 0; ModelTypeCode.MT_ANIMATION = 1; ModelTypeCode.MT_PROGRESSIVE = 2; var LayerGeometryType = {}; LayerGeometryType.LGT_POINT = 0; LayerGeometryType.LGT_POLYLINE = 1; LayerGeometryType.LGT_POLYGON = 2; LayerGeometryType.LGT_COLLECTION = 3; LayerGeometryType.LGT_NONE = -1; var SphereStyle = {}; SphereStyle.SPHERE_NORMAL = 0; SphereStyle.SPHERE_UPPER_HALF = 1; SphereStyle.SPHERE_LOWER_HALF = 2; SphereStyle.SPHERE_UPPER_HALF_BASE = 3; SphereStyle.SPHERE_LOWER_HALF_BASE = 4; var ElevationBehaviorMode = {}; ElevationBehaviorMode.EB_REPLACE = 0; ElevationBehaviorMode.EB_BELOW = 1; ElevationBehaviorMode.EB_ABOVE = 2; var EditItemFlags = {}; EditItemFlags.EDIT_ITEM_USE_PROPERTY = 0; EditItemFlags.EDIT_ITEM = 1; EditItemFlags.EDIT_ITEM_VERTICES = 2; EditItemFlags.EDIT_ITEM_BUILDING_ROOF = 3; var ItemCode = {}; ItemCode.SELECTED = 10; ItemCode.CHILD = 11; ItemCode.FIRSTVISIBLE = 12; ItemCode.NEXT = 13; ItemCode.NEXTVISIBLE = 14; ItemCode.PARENT = 15; ItemCode.PREVIOUS = 16; ItemCode.PREVIOUSVISIBLE = 17; ItemCode.ROOT = 18; var SortType = {}; SortType.SORT_ALPHABETICALLY_AZ = 0; SortType.SORT_ALPHABETICALLY_ZA = 1; SortType.SORT_BY_TYPE = 2; SortType.SORT_NO_SORT = 3; var WorldPointType = {}; WorldPointType.WPT_MODEL = 1; WorldPointType.WPT_LABEL = 2; WorldPointType.WPT_PRIMITIVE = 4; WorldPointType.WPT_ANIM = 8; WorldPointType.WPT_BUILDING = 16; WorldPointType.WPT_SKY = 32; WorldPointType.WPT_ACCURATE_CPT = 64; WorldPointType.WPT_BBOX_CPT = 128; WorldPointType.WPT_VIDEO = 256; WorldPointType.WPT_UNDERGROUND = 512; WorldPointType.WPT_SCREEN_OVERLAY = 1024; WorldPointType.WPT_SCREEN_CONTROL = 2048; WorldPointType.WPT_SCREEN_COVERED = 4096; WorldPointType.WPT_ALL = -1; var MouseInputMode = {}; MouseInputMode.MI_FREE_FLIGHT = 0; MouseInputMode.MI_COM_CLIENT = 1; MouseInputMode.MI_CONTROLLED_FLIGHT = 2; MouseInputMode.MI_EDIT = 3; MouseInputMode.MI_MEASURAMENT = 4; var MessageBarTextAlignment = {}; MessageBarTextAlignment.MBT_LEFT = 0; MessageBarTextAlignment.MBT_CENTER = 1; MessageBarTextAlignment.MBT_RIGHT = 2; var AccuracyLevel = {}; AccuracyLevel.ACCURACY_NORMAL = 0; AccuracyLevel.ACCURACY_BEST_FROM_MEMORY = 1; AccuracyLevel.ACCURACY_BEST_FROM_MPT = 2; var PermissionType = {}; PermissionType.LMP_ENABLE_ALL = 0; PermissionType.LMP_DISABLE_API = 1; PermissionType.LMP_DISABLE_UI = 2; PermissionType.LMP_DISABLE_ALL = -1; var SliderDisplayMode = {}; SliderDisplayMode.MODE_TIME_NONE = 0; SliderDisplayMode.MODE_FIXED_TIME = 1; SliderDisplayMode.MODE_TIME = 2; SliderDisplayMode.MODE_RANGE_PROJECT = 4; SliderDisplayMode.MODE_RANGE_CUSTOM = 8; SliderDisplayMode.MODE_ADJUST_FOR_GROUP = 16; var TimeZoneType = {}; TimeZoneType.TIME_ZONE_TYPE_MY_COMPUTER = 0; TimeZoneType.TIME_ZONE_TYPE_UTC = 1; TimeZoneType.TIME_ZONE_TYPE_SPECIFIC = 2; var TEVesrionType = {}; TEVesrionType.TEVT_PRO = 0; TEVesrionType.TEVT_PLUS = 1; TEVesrionType.TEVT_VIEWER = 2; TEVesrionType.TEVT_UNKNOWN = -1; var ObjectTypeCode = {}; ObjectTypeCode.OT_UNDEFINED = 0; ObjectTypeCode.OT_POLYLINE = 1; ObjectTypeCode.OT_POLYGON = 2; ObjectTypeCode.OT_RECTANGLE = 3; ObjectTypeCode.OT_REGULAR_POLYGON = 4; ObjectTypeCode.OT_CIRCLE = 5; ObjectTypeCode.OT_3D_POLYGON = 6; ObjectTypeCode.OT_BUILDING = 7; ObjectTypeCode.OT_BOX = 8; ObjectTypeCode.OT_PYRAMID = 9; ObjectTypeCode.OT_CYLINDER = 10; ObjectTypeCode.OT_CONE = 11; ObjectTypeCode.OT_ELLIPSE = 12; ObjectTypeCode.OT_ARC = 13; ObjectTypeCode.OT_ARROW = 14; ObjectTypeCode.OT_3D_ARROW = 15; ObjectTypeCode.OT_SPHERE = 16; ObjectTypeCode.OT_MODEL = 17; ObjectTypeCode.OT_LABEL = 18; ObjectTypeCode.OT_LOCATION = 19; ObjectTypeCode.OT_TREE_HOTLINK = 20; ObjectTypeCode.OT_ROUTE = 21; ObjectTypeCode.OT_MESSAGE = 22; ObjectTypeCode.OT_DYNAMIC = 23; ObjectTypeCode.OT_IMAGE_LABEL = 24; ObjectTypeCode.OT_THREAT_DOME = 25; ObjectTypeCode.OT_IMAGERY_LAYER = 26; ObjectTypeCode.OT_TERRAIN_VIDEO = 27; ObjectTypeCode.OT_POINT_CLOUD = 28; ObjectTypeCode.OT_ELEVATION_LAYER = 29; ObjectTypeCode.OT_TERRAIN_MODIFIER = 30; ObjectTypeCode.OT_TERRAIN_HOLE = 31; ObjectTypeCode.OT_POPUP_MESSAGE = 32; ObjectTypeCode.OT_FEATURE = 33; ObjectTypeCode.OT_PRESENTATION = 34; ObjectTypeCode.OT_ANALYSIS_LOS = 35; var SGGeometryTypeId = {}; SGGeometryTypeId.SG_POINT = 0; SGGeometryTypeId.SG_LINESTRING = 1; SGGeometryTypeId.SG_LINEARRING = 2; SGGeometryTypeId.SG_POLYGON = 3; SGGeometryTypeId.SG_MULTIPOINT = 4; SGGeometryTypeId.SG_MULTILINESTRING = 5; SGGeometryTypeId.SG_MULTIPOLYGON = 6; var BuildingStyleCode = {}; BuildingStyleCode.BS_STRETCH_TERRAIN = 0; BuildingStyleCode.BS_POLYGONS = 1; var IntersectionType = {}; IntersectionType.IT_NONE = 0; IntersectionType.IT_INTERSECT = 1; IntersectionType.IT_WITHIN = 2; var StreamLayerStatus = {}; StreamLayerStatus.SLS_NOT_STREAMED_LAYER = 0; StreamLayerStatus.SLS_STREAMING = 1; StreamLayerStatus.SLS_STREAM_PAUSED = 2; var AltitudeUnitCode = {}; AltitudeUnitCode.AU_METER = 0; AltitudeUnitCode.AU_FEET = 1; AltitudeUnitCode.AU_CENTIMETER = 2; AltitudeUnitCode.AU_DECIMETER = 3; AltitudeUnitCode.AU_INCHE = 4; AltitudeUnitCode.AU_YARD = 5; AltitudeUnitCode.AU_UNDEFINED = -1; var LabelLockMode = {}; LabelLockMode.LM_DECAL = 0; LabelLockMode.LM_AXIS = 1; LabelLockMode.LM_AXIS_TEXTUP = 2; LabelLockMode.LM_AXIS_AUTOPITCH = 3; LabelLockMode.LM_AXIS_AUTOPITCH_TEXTUP = 4; var DistributionDir = {}; DistributionDir.DOWN_UP = 0; DistributionDir.UP_DOWN = 1; DistributionDir.RIGHT_LEFT = 2; DistributionDir.LEFT_RIGHT = 3; DistributionDir.FRONT_BACK = 4; DistributionDir.BACK_FRONT = 5; var CPTDataFormat = {}; CPTDataFormat.CPT_DF_INTENSITY = 0; CPTDataFormat.CPT_DF_RGB = 1; var _HTML_POPUP_FLAGS = {}; _HTML_POPUP_FLAGS.HTML_POPUP_NONE = 0; _HTML_POPUP_FLAGS.HTML_POPUP_ANCHOR_3D_WINDOW = 1; _HTML_POPUP_FLAGS.HTML_POPUP_ALLOW_DRAG = 2; _HTML_POPUP_FLAGS.HTML_POPUP_NO_CAPTION = 4; _HTML_POPUP_FLAGS.HTML_POPUP_USE_DEFAULT_POS = 8; _HTML_POPUP_FLAGS.HTML_POPUP_USE_LAST_SIZE = 16; _HTML_POPUP_FLAGS.HTML_POPUP_ALLOW_RESIZE = 32; _HTML_POPUP_FLAGS.HTML_POPUP_ADD_SHADOW = 64; _HTML_POPUP_FLAGS.HTML_POPUP_NO_BORDER = 128; _HTML_POPUP_FLAGS.HTML_POPUP_SET_FOCUS_TO_RENDER = 256; _HTML_POPUP_FLAGS.HTML_POPUP_NOT_USE_POINTER = 512; _HTML_POPUP_FLAGS.HTML_POPUP_ALWAYS_VISIBLE = 1024; _HTML_POPUP_FLAGS.HTML_POPUP_USE_LAST_POS = 2048; _HTML_POPUP_FLAGS.HTML_POPUP_USE_TEXT_AS_INNER_HTML = 4096; var PresentationStepContinue = {}; PresentationStepContinue.PSC_MOUSECLICK = 0; PresentationStepContinue.PSC_WAIT = 1; var PresentationStepFlightSpeed = {}; PresentationStepFlightSpeed.PSFS_VERYSLOW = 0; PresentationStepFlightSpeed.PSFS_SLOW = 1; PresentationStepFlightSpeed.PSFS_NORMAL = 2; PresentationStepFlightSpeed.PSFS_FAST = 3; PresentationStepFlightSpeed.PSFS_VERYFAST = 4; var PresentationPlayAlgorithm = {}; PresentationPlayAlgorithm.PPA_FLYTO = 0; PresentationPlayAlgorithm.PPA_SPLINE = 1; var PresentationPlayMode = {}; PresentationPlayMode.PPM_AUTOMATIC = 0; PresentationPlayMode.PPM_MANUAL = 1; var PresentationCaptionSizeType = {}; PresentationCaptionSizeType.PCST_FIXED = 0; PresentationCaptionSizeType.PCST_AUTOMATICALLYADJUST = 1; var PresentationCaptionPosition = {}; PresentationCaptionPosition.PCP_TOPLEFT = 0; PresentationCaptionPosition.PCP_TOPCENTER = 1; PresentationCaptionPosition.PCP_TOPRIGHT = 2; PresentationCaptionPosition.PCP_BOTTOMLEFT = 3; PresentationCaptionPosition.PCP_BOTTOMCENTER = 4; PresentationCaptionPosition.PCP_BOTTOMRIGHT = 5; var PresentationStatus = {}; PresentationStatus.PS_PLAYING = 0; PresentationStatus.PS_NOTPLAYING = 1; PresentationStatus.PS_PAUSED = 2; PresentationStatus.PS_WAITINGTIME = 3; PresentationStatus.PS_WAITINGCLICK = 4; var VideoPlayStatus = {}; VideoPlayStatus.VPS_PAUSE = 0; VideoPlayStatus.VPS_PLAY = 1; VideoPlayStatus.VPS_STOP = 2; var ContainerSite = {}; ContainerSite.CS_DOCK_LEFT = 0; ContainerSite.CS_DOCK_RIGHT = 1; ContainerSite.CS_DOCK_TOP = 2; ContainerSite.CS_DOCK_BOTTOM = 3; ContainerSite.CS_DOCK_FLOAT = 4; ContainerSite.CS_MAIN = 5; ContainerSite.CS_NOT_VALID = -1; var FaceFillTypeCode = {}; FaceFillTypeCode.FACE_COLOR = 0; FaceFillTypeCode.FACE_TEXTURE = 1; FaceFillTypeCode.FACE_TERRAIN_TEXTURE = 2; FaceFillTypeCode.FACE_UNDEFINED = -1; var RoofStyleCode = {}; RoofStyleCode.ROOFTOP_FLAT = 0; RoofStyleCode.ROOFTOP_ANGULAR = 1; var PresentationStepType = {}; PresentationStepType.ST_LOCATION = 0; PresentationStepType.ST_DYNAMICOBJECT = 1; PresentationStepType.ST_GROUPOROBJECT = 2; PresentationStepType.ST_UNDERGROUNDMODE = 3; PresentationStepType.ST_TIMESLIDER = 4; PresentationStepType.ST_CURRENTTIME = 5; PresentationStepType.ST_MESSAGE = 6; PresentationStepType.ST_TOOL = 7; PresentationStepType.ST_CAPTION = 8; PresentationStepType.ST_RESTARTDYNAMICOBJECT = 9; PresentationStepType.ST_FLIGHTSPEEDFACTOR = 10; PresentationStepType.ST_CLEARCAPTION = -1; var TilingMethodCode = {}; TilingMethodCode.TM_TILES_PER_SIDE = 0; TilingMethodCode.TM_TILES_PER_AXIS = 0; TilingMethodCode.TM_METERS_PER_TILE = 1; TilingMethodCode.TM_UNDEFINED = -1; var AttributeTypeCode = {}; AttributeTypeCode.AT_TEXT = 0; AttributeTypeCode.AT_INTEGER = 1; AttributeTypeCode.AT_DOUBLE = 2; AttributeTypeCode.AT_UNKNOWN = -1; var FeatureState = {}; FeatureState.FS_NONE = 0; FeatureState.FS_NEW = 1; FeatureState.FS_MODIFIED = 2; FeatureState.FS_DELETED = 3;

SGLang = {
    lang : {},
    /** 
     * APIProperty: defaultCode
     * {String} Default language to use when a specific language can't be
     *     found.  Default is "en".
     */
    defaultCode: "0",
        
    /**
     * APIFunction: getCode
     * Get the current language code.
     *
     * Returns:
     * The current language code.
     */
    getCode: function() {
		var lang = SGLang.getUrlParameters()["lang"];
		if(!lang)
			lang = SGLang.defaultCode;
		return lang;
    },
    
	getUrlParameters: function()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split(/&|\?/ig);
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	},

    /**
     * APIMethod: translate
     * Looks up a key from a dictionary based on the current language string.
     *     The value of <getCode> will be used to determine the appropriate
     *     dictionary.  Dictionaries are stored in <SGLang>.
     *
     * Parameters:
     * key - {String} The key for an i18n string value in the dictionary.
     * context - {Object} Optional context to be used with
     *     <SGAPI.String.format>.
     * 
     * Returns:
     * {String} A internationalized string.
     */
    i18n: function(key, context) {
        var message = SGLang.lang[key];
        if(!message) {
			// Message not found, fall back to message key
			message = key;
        }
        if(context) {
            message = SGLang.format(message, context);
        }
        return message;
    },
	
	i18nFile: function(file) {
		var code = this.getCode();
		if(code == "0" || code == "1033")
			return file;
        return code + "/" + file;
    },
	
    format: function(template, context, args) {
        if(!context) {
            context = window;
        }

        // Example matching: 
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function(str, match) {
            var replacement;

            // Loop through all subs. Example: ${a.b.c}
            // 0 -> replacement = context[a];
            // 1 -> replacement = context[a][b];
            // 2 -> replacement = context[a][b][c];
            var subs = match.split(/\.+/);
            for (var i=0; i< subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }

                replacement = replacement[subs[i]];
            }

            if(typeof replacement == "function") {
                replacement = args ?
                    replacement.apply(null, args) :
                    replacement();
            }

            // If replacement is undefined, return the string 'undefined'.
            // This is a workaround for a bugs in browsers not properly 
            // dealing with non-participating groups in regular expressions:
            // http://blog.stevenlevithan.com/archives/npcg-javascript
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement; 
            }
        };

        return template.replace(SGLang.tokenRegEx, replacer);
    },

    /**
     * Property: SGLang.tokenRegEx
     * Used to find tokens in a string.
     * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
     */
    tokenRegEx:  /\$\{([\w.]+?)\}/g
};

//-------------------
// load requested lang file
(function() {
    document.write("<script language='javascript' src='Lang.js'></script>");
	var code = SGLang.getCode();
	document.write("<script  language='javascript' src='" + code + "/Lang.js'></script>");
})();

// hide document body, so that TextXXX won't be visible until we replace them on document ready
$(document.body).hide();
//-------------------
$(document).ready(function ()
{
    $(document.body).hide();
	var translateDocument = function() 
	{
	    document.title = SGLang.i18n(document.title);
	    $(".i18n").each(function ()
	    {
	        if (this.tagName == "INPUT")
	        {
	            this.value = SGLang.i18n(this.value);
	        }
	        else if (this.tagName == "IMG")
	        {
	            $(this).attr("src",SGLang.i18n($(this).attr("src")));
	            $(this).attr("alt", SGLang.i18n($(this).attr("alt")));
	            $(this).attr("title", SGLang.i18n($(this).attr("title")));
	        }
	        else
	        {
	            $(this).attr("title", SGLang.i18n($(this).attr("title")));
	            $(this).attr("alt", SGLang.i18n($(this).attr("alt")));
	            // set element html only if it does not contain any other html elements.
	            // otherwise it will erase them.
	            if ($(this).children().length == 0)
	            {
	                $(this).html(SGLang.i18n($.trim($(this).text())));
	            }
	        }
	    });
	    $(".i18nFile").each(function ()
	    {
	        if (this.tagName == "IMG")
	        {
	            $(this).attr("src",SGLang.i18nFile($(this).attr("src")));
	        }
	    });
	    $(document.body).show();
	}
	// make sure that hiding document body really worked.
	// I am not sure if IE will update the document view, until the function has finished executing.
	// so I am giving it here a few milliseconds of unused time.
	setTimeout(translateDocument,1);
});

$(document).ready(function ()
{
    if (GetParamValue("inSG","") == "1")
    {
        document.getElementById("TopAreaTD").style.height = "57";
        document.getElementById("TitleTD").align = "left";
        document.getElementById("CloseHelpTd").style.display = "none";
    }
});

//-------------------
// DisplayHelpPopup
function DisplayHelpPopup(HTMLSrc, title) {
    if (title == null || title == "")
        title = "?";
	var Cont = TE.interface("IContainer2");
	Cont.HTMLPopup(1, 5, 5, 850, 500, title, abspath() + "/" + HTMLSrc, 10, -1);
}
//-------------------
// DisplayMessagePopup
function DisplayMessagePopup(title, header, icon,body, x, y, width, height, CloseButton) {

    var HTMLString = "<html><head><meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\"/><link rel='StyleSheet' href='" + abspath() + "/../Style.css' type='text/css'></head><body leftmargin='0' topmargin='0' marginwidth='0' marginheight='0'><object id='SGWorld' classid='CLSID:3a4f9197-65a8-11d5-85c1-0001023952c1' style='display:none'></object>";
    HTMLString += "<table width='100%' height='100%' cellpadding=4pt cellspacing=0 border=0> <tr height='20pt'>";
    if (icon != "")
        HTMLString += "<td align='left' width='50pt'><img src='"+icon+"' alt='' ></td>";
    if (header != "")
        HTMLString += "<td align='middle'><span class='s12b'>" + header + "</span></td>";
    HTMLString += "<td width='50pt'></td></tr><tr><td valign='top' colspan=3><span class='s9'>" + body + "</span></td></tr>";
    if (CloseButton)
        HTMLString += "<tr><td align='right' valign=bottom colspan=3><input type='button' class='MenuButtonSmall' value='Close' onClick='SGWorld.Window.RemovePopupByCaption(\"" + title + "\");' /></td></tr>";
    HTMLString += "</body></html>";
    var popupMsg = SGWorld.Creator.CreatePopupMessage(title, "", x, y, width, height, -1);
    popupMsg.Flags = 2 + 32;
    popupMsg.InnerText = HTMLString;
    SGWorld.Window.ShowPopup(popupMsg);        

}
//-------------------
// DisplayHelpPopup6
function DisplayHelpPopup6(HTMLSrc, title) {
    if (title == null || title == "")
        title = "?";
    var popup = SGWorld.Creator.CreatePopupMessage(title, abspath() + "/" + HTMLSrc, 5, 5, 850, 500);
    popup.AllowDrag = true;
    popup.AllowResize = true;
    SGWorld.Window.ShowPopup(popup);        
    
}
//-------------------
// CloseTool
function CloseTool (ToolName)
{
	var Cont = TE.interface("IContainer2");
	Cont.RemoveURL (1,ToolName);
}
//-------------------
// SGAPIDisplayHelpPopup
function SGAPIDisplayHelpPopup(HTMLSrc,title)
{
	//globe.teCore.IContainer.HTMLPopup (1, 5,5,500,500,"Help", SGAPI.toAbspath(HTMLSrc), 10, -1 );
    if (title == null || title == "")
        title = "?";
	var popup = new SGPopup(title, HTMLSrc,0,0,650,500);
    popup.align = "TopLeft";
    
    globe.showPopup(popup);
}
//-------------------
// SGAPICloseTool
function SGAPICloseTool (ToolName)
{
    globe.teCore.IContainer.RemoveURL (1,ToolName);
}
//--------------
// abspath
function abspath()
{
    var abspath = unescape(window.location.href);

    // Remove query String 
    var index=abspath.indexOf("?");
    if (index > 0) abspath = abspath.substr (0,index-1);    
        
    index=abspath.lastIndexOf("/");
    var index2 = abspath.lastIndexOf("\\");
    
    index = (index > index2) ? index : index2;
    if (index <= 0) return abspath;

    abspath = abspath.substring(0,index);

    if(abspath.substring(0,1) == "/") abspath = abspath.slice(1);    

    var re = /file:\/\/\//gi;
    if (abspath.match(re) != null) abspath = abspath.replace(re,""); // if this is indeed a local file, we strip the "file://" prefix from it.    

    return(abspath);
}
// GetParamValue
function GetParamValue(findParam, defaultValue) 
{
    var arr = document.location.href.split("?");
    
    if (arr.length <= 1) return defaultValue;
    arr = arr[1].split("&");    
        
    for (var i = 0; i < arr.length; i++) {    	
        if (arr[i].indexOf(findParam) == 0 && arr[i].indexOf("=") == findParam.length) {
            arr = arr[i].split("=");
            return arr[1];
        }
    }
    return defaultValue;
}  
//-----------------
// validateNumber
function validateNumber(strNum)
{
    strNum =     strNum.replace(/,/, ".");
    return parseFloat (strNum);
}
//--------------
// validateNumberEx
function validateNumberEx(field, defVal, MinNum, MaxNum) {
    try {
        field.val (validateNumber(field.val()));

        if (field.val() < MinNum)
            field.val(MinNum);
        if (field.val() > MaxNum)
            field.val( MaxNum);
    }
    catch (e) {field.val(defVal); }
}
//********************************************
var gDrawPolyAltitudeType = 2;

//----------
// DrawPolyLButtonDown
//----------
function DrawPolyLButtonDown(Flags, X, Y) {
    DrawPolyLButtonClicked(Flags, X, Y);
}
//----------
// DrawPolyLButtonClicked
//----------
function DrawPolyLButtonClicked(Flags, X, Y) {
    var CursorCoord = SGWorld.Window.pixelToWorld(X, Y, -1 & ~(128 | 1024));

    
    if (gPolyObj == null) {
        // We always start with a polyline and change it to Polygon (for area) after the second click)
        var myGeometry = SGWorld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, CursorCoord.Position.Altitude, CursorCoord.Position.x, CursorCoord.Position.y, CursorCoord.Position.Altitude])
        gPolyObj = SGWorld.Creator.createPolyline(myGeometry, SGWorld.Creator.CreateColor(0, 255, 0, 1), gDrawPolyAltitudeType, -1, gPolylineText);
        gPolyObj.LineStyle.Width = -2;
        gPolyObj.Geometry.StartEdit();
    }
    else {

        if (gPolyMethod == 2) // Polygon 
        {
            if (gPolyObj.ObjectType == 1) {
                // Deleting the temporary line
                var x = gPolyObj.Geometry.Points.Item(0).X;
                var y = gPolyObj.Geometry.Points.Item(0).Y;
                var z = gPolyObj.Geometry.Points.Item(0).Z;
                SGWorld.Creator.DeleteObject(gPolyObj.ID);

                // Creating the polygon
                var myGeometry = SGWorld.Creator.GeometryCreator.CreateLinearRingGeometry([x, y, z, CursorCoord.Position.x, CursorCoord.Position.y, CursorCoord.Position.Altitude, CursorCoord.Position.x, CursorCoord.Position.y, CursorCoord.Position.Altitude])
                gPolyObj = SGWorld.Creator.createPolygon(myGeometry, SGWorld.Creator.CreateColor(0, 255, 0, 1), SGWorld.Creator.CreateColor(0, 255, 0, 0.5), gDrawPolyAltitudeType, -1, gPolygonText);
                gPolyObj.LineStyle.Width = -2;
                // gPolyObj.Terrain.GroundObject = true;   // Arik removed it. Caused a bug in Viewshed query (got wrong GetGroundHeight values because of the polygon)
                gPolyObj.Geometry.StartEdit();
            }
            else {
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Z = CursorCoord.Position.Altitude;
                gPolyObj.Geometry.Rings(0).Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, CursorCoord.Position.Altitude);
            }
        }
        else {
            gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
            gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
            gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).Z = CursorCoord.Position.Altitude;
            gPolyObj.Geometry.Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, CursorCoord.Position.Altitude);
        }
    }
    if (gDrawPolyClick != null)
        gDrawPolyClick(gPolyObj.Geometry, gPolyObj.ObjectType);
    gPolyObj.SetParam(5440, 1);
    return false;
}
//-----------
// onFrame
//-----------
function DrawPolyOnFrame() {
    if (gPolyObj != null) {

        try {
            var mouseInfo = SGWorld.Window.GetMouseInfo()
            var CursorCoord = SGWorld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y, -1 & ~(128|1024));
            if (CursorCoord == null)
                return false;
            if (gPolyObj.ObjectType == 2) {
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Z = CursorCoord.Position.Altitude;
            }
            else {
                gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
                gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
                gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).Z = CursorCoord.Position.Altitude;
            }
            gPolyObj.SetParam(5440, 1);
        }
        catch (e) { }
    }
}

//-------------
//DrawPolyInputModeChanged
function DrawPolyInputModeChanged(NewMode) {

    if (NewMode != 1)
        if (gPolyObj != null)
        Reset(0, 1);
}
//-------------
// DrawPolyRButtonUp
function DrawPolyRButtonUp(Flags, X, Y) {
    if (gPolyObj == null || ((gPolyObj.ObjectType == 1 && gPolyObj.Geometry.Points.count <= 2) || (gPolyObj.ObjectType == 2 && gPolyObj.Geometry.Rings(0).Points.count <= 3))) {
        Reset(0, 0);
        return false;
    }
    if (gPolyObj.ObjectType == 1)
        gPolyObj.Geometry.Points.DeletePoint(gPolyObj.Geometry.Points.count - 1);
    else
        gPolyObj.Geometry.Rings(0).Points.DeletePoint(gPolyObj.Geometry.Rings(0).Points.count - 1);

    gPolyObj.Geometry.EndEdit();

    gEndDrawPoly(gPolyObj.Geometry, gPolyObj.ObjectType, gPolyObj.Position.AltitudeType);
    Reset(0, 0);
    return true;
}
//-------------------
//searchGeometries
function searchGeometries2(parentNode, callbackFunc) {
    SGWorld.ProjectTree.EnableRedraw(0);
    searchGeometriesLeaf2(parentNode, callbackFunc);
    SGWorld.ProjectTree.EnableRedraw(1);
}
//-------------------
// searchGeometries
function searchGeometriesLeaf2(parentNode, callbackFunc) {

    if (SGWorld.ProjectTree.IsLayer(parentNode))  // Layer
    {
        var layer = SGWorld.ProjectTree.GetLayer(parentNode);
        var featureGroups = layer.FeatureGroups;
        for (var i = 0; i < featureGroups.Count; i++) // Traverse all sub-layers
        {
            var featureGroup = featureGroups.Item(i);
            var altitudeType = AltitudeMethodToAltitudeType(featureGroup.GetProperty("Altitude Method"));
            var features = featureGroup.Features;
            for (var j = 0; j < features.Count; j++) {
                var ret;
                if (featureGroup.GeometryType != 0)
                    ret = callbackFunc(features.Item(j).Geometry, featureGroup.GeometryType, altitudeType);
                else {
                    if (features.Item(j).Geometry.GeometryType == 0) // Point
                    {
                        var position = SGWorld.Creator.CreatePosition(features.Item(j).Geometry.X, features.Item(j).Geometry.Y, features.Item(j).Geometry.Z);
                        ret = callbackFunc(position, featureGroup.GeometryType, altitudeType);
                    }
                }
                if (!ret)
                    return;
            }
        }
    }
    else {
        var node = SGWorld.ProjectTree.GetNextItem(parentNode, 11);
        while (node != "") {
            if (SGWorld.ProjectTree.IsGroup(node) || SGWorld.ProjectTree.IsLayer(node))
                searchGeometriesLeaf2(node, callbackFunc);
            else {
                var Object = SGWorld.Creator.GetObject(node);
                if (Object != null) {
                    var altitudeType = Object.Position.AltitudeType;
                    var ret;
                    if (Object.ObjectType == 1 || Object.ObjectType == 2)
                        ret = callbackFunc(Object.Geometry, Object.ObjectType, altitudeType, Object.Position);
                    else
                        ret = callbackFunc(Object.Position, Object.ObjectType, altitudeType, Object.Position);

                    if (!ret)
                        return;
                }
            }

            node = SGWorld.ProjectTree.GetNextItem(node, 13);
        }
    }
}

function AltitudeMethodToAltitudeType(altitudeMethod)
{
	switch(altitudeMethod)
	{
		case 10: return AltitudeTypeCode.ATC_TERRAIN_RELATIVE;
		case 11: return AltitudeTypeCode.ATC_TERRAIN_ABSOLUTE;
		case 12: return AltitudeTypeCode.ATC_ON_TERRAIN;
		case 13: return AltitudeTypeCode.ATC_PIVOT_RELATIVE;
	}
}
//-------------------
//searchGeometriesClipbaord
function searchGeometriesClipboard(callbackFunc) {
    SGWorld.ProjectTree.EnableRedraw(0);
        var Object;
        for (i = 0; i < SGWorld.Application.Clipboard.Count; i++) {
            try {
                Object = SGWorld.Application.Clipboard.Item(i);
                var altitudeType = Object.Position.AltitudeType;
                var ret;
                if (Object.ObjectType == 1 || Object.ObjectType == 2)
                    ret = callbackFunc(Object.Geometry, Object.ObjectType, altitudeType, Object.Position);
                else
                    ret = callbackFunc(Object.Position, Object.ObjectType, altitudeType, Object.Position);
                if (!ret) {
                    SGWorld.ProjectTree.EnableRedraw(1);
                    return;
                }
            }
            catch (e) { }
          }
    SGWorld.ProjectTree.EnableRedraw(1);
}
