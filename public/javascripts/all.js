

/* jQuery UI Slider 1.7.2
*
* Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* http://docs.jquery.com/UI/Slider
*
* Depends:
* ui.core.js
*/
(function(a){a.widget("ui.slider",a.extend({},a.ui.mouse,{_init:function(){var b=this,c=this.options;this._keySliding=false;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");this.range=a([]);if(c.range){if(c.range===true){this.range=a("<div></div>");if(!c.values){c.values=[this._valueMin(),this._valueMin()]}if(c.values.length&&c.values.length!=2){c.values=[c.values[0],c.values[0]]}}else{this.range=a("<div></div>")}this.range.appendTo(this.element).addClass("ui-slider-range");if(c.range=="min"||c.range=="max"){this.range.addClass("ui-slider-range-"+c.range)}this.range.addClass("ui-widget-header")}if(a(".ui-slider-handle",this.element).length==0){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}if(c.values&&c.values.length){while(a(".ui-slider-handle",this.element).length<c.values.length){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}}this.handles=a(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(d){d.preventDefault()}).hover(function(){if(!c.disabled){a(this).addClass("ui-state-hover")}},function(){a(this).removeClass("ui-state-hover")}).focus(function(){if(!c.disabled){a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}else{a(this).blur()}}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(d){a(this).data("index.ui-slider-handle",d)});this.handles.keydown(function(i){var f=true;var e=a(this).data("index.ui-slider-handle");if(b.options.disabled){return}switch(i.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!b._keySliding){b._keySliding=true;a(this).addClass("ui-state-active");b._start(i,e)}break}var g,d,h=b._step();if(b.options.values&&b.options.values.length){g=d=b.values(e)}else{g=d=b.value()}switch(i.keyCode){case a.ui.keyCode.HOME:d=b._valueMin();break;case a.ui.keyCode.END:d=b._valueMax();break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g==b._valueMax()){return}d=g+h;break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g==b._valueMin()){return}d=g-h;break}b._slide(i,e,d);return f}).keyup(function(e){var d=a(this).data("index.ui-slider-handle");if(b._keySliding){b._stop(e,d);b._change(e,d);b._keySliding=false;a(this).removeClass("ui-state-active")}});this._refreshValue()},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy()},_mouseCapture:function(d){var e=this.options;if(e.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();var h={x:d.pageX,y:d.pageY};var j=this._normValueFromMouse(h);var c=this._valueMax()-this._valueMin()+1,f;var k=this,i;this.handles.each(function(l){var m=Math.abs(j-k.values(l));if(c>m){c=m;f=a(this);i=l}});if(e.range==true&&this.values(1)==e.min){f=a(this.handles[++i])}this._start(d,i);k._handleIndex=i;f.addClass("ui-state-active").focus();var g=f.offset();var b=!a(d.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=b?{left:0,top:0}:{left:d.pageX-g.left-(f.width()/2),top:d.pageY-g.top-(f.height()/2)-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};j=this._normValueFromMouse(h);this._slide(d,i,j);return true},_mouseStart:function(b){return true},_mouseDrag:function(d){var b={x:d.pageX,y:d.pageY};var c=this._normValueFromMouse(b);this._slide(d,this._handleIndex,c);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._handleIndex=null;this._clickOffset=null;return false},_detectOrientation:function(){this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(d){var c,h;if("horizontal"==this.orientation){c=this.elementSize.width;h=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{c=this.elementSize.height;h=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}var f=(h/c);if(f>1){f=1}if(f<0){f=0}if("vertical"==this.orientation){f=1-f}var e=this._valueMax()-this._valueMin(),i=f*e,b=i%this.options.step,g=this._valueMin()+i-b;if(b>(this.options.step/2)){g+=this.options.step}return parseFloat(g.toFixed(5))},_start:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("start",d,b)},_slide:function(f,e,d){var g=this.handles[e];if(this.options.values&&this.options.values.length){var b=this.values(e?0:1);if((this.options.values.length==2&&this.options.range===true)&&((e==0&&d>b)||(e==1&&d<b))){d=b}if(d!=this.values(e)){var c=this.values();c[e]=d;var h=this._trigger("slide",f,{handle:this.handles[e],value:d,values:c});var b=this.values(e?0:1);if(h!==false){this.values(e,d,(f.type=="mousedown"&&this.options.animate),true)}}}else{if(d!=this.value()){var h=this._trigger("slide",f,{handle:this.handles[e],value:d});if(h!==false){this._setData("value",d,(f.type=="mousedown"&&this.options.animate))}}}},_stop:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("stop",d,b)},_change:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("change",d,b)},value:function(b){if(arguments.length){this._setData("value",b);this._change(null,0)}return this._value()},values:function(b,e,c,d){if(arguments.length>1){this.options.values[b]=e;this._refreshValue(c);if(!d){this._change(null,b)}}if(arguments.length){if(this.options.values&&this.options.values.length){return this._values(b)}else{return this.value()}}else{return this._values()}},_setData:function(b,d,c){a.widget.prototype._setData.apply(this,arguments);switch(b){case"disabled":if(d){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled")}else{this.handles.removeAttr("disabled")}case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue(c);break;case"value":this._refreshValue(c);break}},_step:function(){var b=this.options.step;return b},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_values:function(b){if(arguments.length){var c=this.options.values[b];if(c<this._valueMin()){c=this._valueMin()}if(c>this._valueMax()){c=this._valueMax()}return c}else{return this.options.values}},_valueMin:function(){var b=this.options.min;return b},_valueMax:function(){var b=this.options.max;return b},_refreshValue:function(c){var f=this.options.range,d=this.options,l=this;if(this.options.values&&this.options.values.length){var i,h;this.handles.each(function(p,n){var o=(l.values(p)-l._valueMin())/(l._valueMax()-l._valueMin())*100;var m={};m[l.orientation=="horizontal"?"left":"bottom"]=o+"%";a(this).stop(1,1)[c?"animate":"css"](m,d.animate);if(l.options.range===true){if(l.orientation=="horizontal"){(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({left:o+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({width:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}else{(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({bottom:(o)+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({height:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}}lastValPercent=o})}else{var j=this.value(),g=this._valueMin(),k=this._valueMax(),e=k!=g?(j-g)/(k-g)*100:0;var b={};b[l.orientation=="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[c?"animate":"css"](b,d.animate);(f=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[c?"animate":"css"]({width:e+"%"},d.animate);(f=="max")&&(this.orientation=="horizontal")&&this.range[c?"animate":"css"]({width:(100-e)+"%"},{queue:false,duration:d.animate});(f=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[c?"animate":"css"]({height:e+"%"},d.animate);(f=="max")&&(this.orientation=="vertical")&&this.range[c?"animate":"css"]({height:(100-e)+"%"},{queue:false,duration:d.animate})}}}));a.extend(a.ui.slider,{getter:"value values",version:"1.7.2",eventPrefix:"slide",defaults:{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null}})})(jQuery);;/*
* jQuery UI Tabs 1.7.2
*
* Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* http://docs.jquery.com/UI/Tabs
*
* Depends:
* ui.core.js
*/
(function(a){a.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable}this._tabify(true)},_setData:function(b,c){if(b=="selected"){if(this.options.collapsible&&c==this.options.selected){return}this.select(c)}else{this.options[b]=c;if(b=="deselectable"){this.options.collapsible=c}this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+a.data(b)},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+a.data(this.list[0]));return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(c,b){return{tab:c,panel:b,index:this.anchors.index(c)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(n){this.list=this.element.children("ul:first");this.lis=a("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);var p=this,d=this.options;var c=/^#.+/;this.anchors.each(function(r,o){var q=a(o).attr("href");var s=q.split("#")[0],u;if(s&&(s===location.toString().split("#")[0]||(u=a("base")[0])&&s===u.href)){q=o.hash;o.href=q}if(c.test(q)){p.panels=p.panels.add(p._sanitizeSelector(q))}else{if(q!="#"){a.data(o,"href.tabs",q);a.data(o,"load.tabs",q.replace(/#.*$/,""));var w=p._tabId(o);o.href="#"+w;var v=a("#"+w);if(!v.length){v=a(d.panelTemplate).attr("id",w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r-1]||p.list);v.data("destroy.tabs",true)}p.panels=p.panels.add(v)}else{d.disabled.push(r)}}});if(n){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(d.selected===undefined){if(location.hash){this.anchors.each(function(q,o){if(o.hash==location.hash){d.selected=q;return false}})}if(typeof d.selected!="number"&&d.cookie){d.selected=parseInt(p._cookie(),10)}if(typeof d.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}d.selected=d.selected||0}else{if(d.selected===null){d.selected=-1}}d.selected=((d.selected>=0&&this.anchors[d.selected])||d.selected<0)?d.selected:0;d.disabled=a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(q,o){return p.lis.index(q)}))).sort();if(a.inArray(d.selected,d.disabled)!=-1){d.disabled.splice(a.inArray(d.selected,d.disabled),1)}this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(d.selected>=0&&this.anchors.length){this.panels.eq(d.selected).removeClass("ui-tabs-hide");this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");p.element.queue("tabs",function(){p._trigger("show",null,p._ui(p.anchors[d.selected],p.panels[d.selected]))});this.load(d.selected)}a(window).bind("unload",function(){p.lis.add(p.anchors).unbind(".tabs");p.lis=p.anchors=p.panels=null})}else{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}this.element[d.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");if(d.cookie){this._cookie(d.selected,d.cookie)}for(var g=0,m;(m=this.lis[g]);g++){a(m)[a.inArray(g,d.disabled)!=-1&&!a(m).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")}if(d.cache===false){this.anchors.removeData("cache.tabs")}this.lis.add(this.anchors).unbind(".tabs");if(d.event!="mouseover"){var f=function(o,i){if(i.is(":not(.ui-state-disabled)")){i.addClass("ui-state-"+o)}};var j=function(o,i){i.removeClass("ui-state-"+o)};this.lis.bind("mouseover.tabs",function(){f("hover",a(this))});this.lis.bind("mouseout.tabs",function(){j("hover",a(this))});this.anchors.bind("focus.tabs",function(){f("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var b,h;if(d.fx){if(a.isArray(d.fx)){b=d.fx[0];h=d.fx[1]}else{b=h=d.fx}}function e(i,o){i.css({display:""});if(a.browser.msie&&o.opacity){i[0].style.removeAttribute("filter")}}var k=h?function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.hide().removeClass("ui-tabs-hide").animate(h,h.duration||"normal",function(){e(o,h);p._trigger("show",null,p._ui(i,o[0]))})}:function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");p._trigger("show",null,p._ui(i,o[0]))};var l=b?function(o,i){i.animate(b,b.duration||"normal",function(){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");e(i,b);p.element.dequeue("tabs")})}:function(o,i,q){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");p.element.dequeue("tabs")};this.anchors.bind(d.event+".tabs",function(){var o=this,r=a(this).closest("li"),i=p.panels.filter(":not(.ui-tabs-hide)"),q=a(p._sanitizeSelector(this.hash));if((r.hasClass("ui-tabs-selected")&&!d.collapsible)||r.hasClass("ui-state-disabled")||r.hasClass("ui-state-processing")||p._trigger("select",null,p._ui(this,q[0]))===false){this.blur();return false}d.selected=p.anchors.index(this);p.abort();if(d.collapsible){if(r.hasClass("ui-tabs-selected")){d.selected=-1;if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){l(o,i)}).dequeue("tabs");this.blur();return false}else{if(!i.length){if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this));this.blur();return false}}}if(d.cookie){p._cookie(d.selected,d.cookie)}if(q.length){if(i.length){p.element.queue("tabs",function(){l(o,i)})}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this))}else{throw"jQuery UI Tabs: Mismatching fragment identifier."}if(a.browser.msie){this.blur()}});this.anchors.bind("click.tabs",function(){return false})},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var c=a.data(this,"href.tabs");if(c){this.href=c}var d=a(this).unbind(".tabs");a.each(["href","load","cache"],function(e,f){d.removeData(f+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){if(a.data(this,"destroy.tabs")){a(this).remove()}else{a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}});if(b.cookie){this._cookie(null,b.cookie)}},add:function(e,d,c){if(c===undefined){c=this.anchors.length}var b=this,g=this.options,i=a(g.tabTemplate.replace(/#\{href\}/g,e).replace(/#\{label\}/g,d)),h=!e.indexOf("#")?e.replace("#",""):this._tabId(a("a",i)[0]);i.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var f=a("#"+h);if(!f.length){f=a(g.panelTemplate).attr("id",h).data("destroy.tabs",true)}f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(c>=this.lis.length){i.appendTo(this.list);f.appendTo(this.list[0].parentNode)}else{i.insertBefore(this.lis[c]);f.insertBefore(this.panels[c])}g.disabled=a.map(g.disabled,function(k,j){return k>=c?++k:k});this._tabify();if(this.anchors.length==1){i.addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[c],this.panels[c]))},remove:function(b){var d=this.options,e=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(e.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(b+(b+1<this.anchors.length?1:-1))}d.disabled=a.map(a.grep(d.disabled,function(g,f){return g!=b}),function(g,f){return g>=b?--g:g});this._tabify();this._trigger("remove",null,this._ui(e.find("a")[0],c[0]))},enable:function(b){var c=this.options;if(a.inArray(b,c.disabled)==-1){return}this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(e,d){return e!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]))},disable:function(c){var b=this,d=this.options;if(c!=d.selected){this.lis.eq(c).addClass("ui-state-disabled");d.disabled.push(c);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))}},select:function(b){if(typeof b=="string"){b=this.anchors.index(this.anchors.filter("[href$="+b+"]"))}else{if(b===null){b=-1}}if(b==-1&&this.options.collapsible){b=this.options.selected}this.anchors.eq(b).trigger(this.options.event+".tabs")},load:function(e){var c=this,g=this.options,b=this.anchors.eq(e)[0],d=a.data(b,"load.tabs");this.abort();if(!d||this.element.queue("tabs").length!==0&&a.data(b,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(e).addClass("ui-state-processing");if(g.spinner){var f=a("span",b);f.data("label.tabs",f.html()).html(g.spinner)}this.xhr=a.ajax(a.extend({},g.ajaxOptions,{url:d,success:function(i,h){a(c._sanitizeSelector(b.hash)).html(i);c._cleanup();if(g.cache){a.data(b,"cache.tabs",true)}c._trigger("load",null,c._ui(c.anchors[e],c.panels[e]));try{g.ajaxOptions.success(i,h)}catch(j){}c.element.dequeue("tabs")}}))},abort:function(){this.element.queue([]);this.panels.stop(false,true);if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup()},url:function(c,b){this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",b)},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.7.2",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(d,f){var b=this,g=this.options;var c=b._rotate||(b._rotate=function(h){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var i=g.selected;b.select(++i<b.anchors.length?i:0)},d);if(h){h.stopPropagation()}});var e=b._unrotate||(b._unrotate=!f?function(h){if(h.clientX){b.rotate(null)}}:function(h){t=g.selected;c()});if(d){this.element.bind("tabsshow",c);this.anchors.bind(g.event+".tabs",e);c()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",c);this.anchors.unbind(g.event+".tabs",e);delete this._rotate;delete this._unrotate}}})})(jQuery);;/*
* jQuery UI Datepicker 1.7.2
*
* Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* http://docs.jquery.com/UI/Datepicker
*
* Depends:
* ui.core.js
*/
(function($){$.extend($.ui,{datepicker:{version:"1.7.2"}});var PROP_NAME="datepicker";function Datepicker(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dateFormat:"mm/dd/yy",firstDay:0,isRTL:false};this._defaults={showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,showMonthAfterYear:false,yearRange:"-10:+10",showOtherMonths:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false};$.extend(this._defaults,this.regional[""]);this.dpDiv=$('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments)}},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase();var inline=(nodeName=="div"||nodeName=="span");if(!target.id){target.id="dp"+(++this.uuid)}var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{});if(nodeName=="input"){this._connectDatepicker(target,inst)}else{if(inline){this._inlineDatepicker(target,inst)}}},_newInst:function(target,inline){var id=target[0].id.replace(/([:\[\]\.])/g,"\\\\$1");return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:$('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(target,inst){var input=$(target);inst.append=$([]);inst.trigger=$([]);if(input.hasClass(this.markerClassName)){return}var appendText=this._get(inst,"appendText");var isRTL=this._get(inst,"isRTL");if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");input[isRTL?"before":"after"](inst.append)}var showOn=this._get(inst,"showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");var buttonImage=this._get(inst,"buttonImage");inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));input[isRTL?"before":"after"](inst.trigger);inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==target){$.datepicker._hideDatepicker()}else{$.datepicker._showDatepicker(target)}return false})}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst)},_inlineDatepicker:function(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst);this._setDate(inst,this._getDefaultDate(inst));this._updateDatepicker(inst);this._updateAlternate(inst)},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;if(!inst){var id="dp"+(++this.uuid);this._dialogInput=$('<input type="text" id="'+id+'" size="1" style="position: absolute; top: -100px;"/>');this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst=this._dialogInst=this._newInst(this._dialogInput,false);inst.settings={};$.data(this._dialogInput[0],PROP_NAME,inst)}extendRemove(inst.settings,settings||{});this._dialogInput.val(dateText);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");inst.settings.onSelect=onSelect;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this.dpDiv)}$.data(this._dialogInput[0],PROP_NAME,inst);return this},_destroyDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);if(nodeName=="input"){inst.append.remove();inst.trigger.remove();$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress)}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()}}},_enableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=false;inst.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().removeClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)})},_disableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=true;inst.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().addClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)});this._disabledInputs[this._disabledInputs.length]=target},_isDisabledDatepicker:function(target){if(!target){return false}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true}}return false},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))}var settings=name||{};if(typeof name=="string"){settings={};settings[name]=value}if(inst){if(this._curInst==inst){this._hideDatepicker(null)}var date=this._getDateDatepicker(target);extendRemove(inst.settings,settings);this._setDateDatepicker(target,date);this._updateDatepicker(inst)}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)},_refreshDatepicker:function(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst)}},_setDateDatepicker:function(target,date,endDate){var inst=this._getInst(target);if(inst){this._setDate(inst,date,endDate);this._updateDatepicker(inst);this._updateAlternate(inst)}},_getDateDatepicker:function(target){var inst=this._getInst(target);if(inst&&!inst.inline){this._setDateFromField(inst)}return(inst?this._getDate(inst):null)},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);var handled=true;var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");inst._keyEvent=true;if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker(null,"");break;case 13:var sel=$("td."+$.datepicker._dayOverClass+", td."+$.datepicker._currentClass,inst.dpDiv);if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])}else{$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"))}return false;break;case 27:$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"));break;case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");break;case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");break;case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)}handled=event.ctrlKey||event.metaKey;break;case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)}handled=event.ctrlKey||event.metaKey;break;case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")}break;case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")}handled=event.ctrlKey||event.metaKey;break;case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")}break;case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")}handled=event.ctrlKey||event.metaKey;break;default:handled=false}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)}else{handled=false}}if(handled){event.preventDefault();event.stopPropagation()}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1)}},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return}var inst=$.datepicker._getInst(input);var beforeShow=$.datepicker._get(inst,"beforeShow");extendRemove(inst.settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));$.datepicker._hideDatepicker(null,"");$.datepicker._lastInput=input;$.datepicker._setDateFromField(inst);if($.datepicker._inDialog){input.value=""}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);$.datepicker._pos[1]+=input.offsetHeight}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";return !isFixed});if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;$.datepicker._pos[1]-=document.documentElement.scrollTop}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null;inst.rangeStart=null;inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});$.datepicker._updateDatepicker(inst);offset=$.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim")||"show";var duration=$.datepicker._get(inst,"duration");var postProcess=function(){$.datepicker._datepickerShowing=true;if($.browser.msie&&parseInt($.browser.version,10)<7){$("iframe.ui-datepicker-cover").css({width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4})}};if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[showAnim](duration,postProcess)}if(duration==""){postProcess()}if(inst.input[0].type!="hidden"){inst.input[0].focus()}$.datepicker._curInst=inst}},_updateDatepicker:function(inst){var dims={width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4};var self=this;inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){$(this).removeClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).removeClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).removeClass("ui-datepicker-next-hover")}}).bind("mouseover",function(){if(!self._isDisabledDatepicker(inst.inline?inst.dpDiv.parent()[0]:inst.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");$(this).addClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).addClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).addClass("ui-datepicker-next-hover")}}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();var numMonths=this._getNumberOfMonths(inst);var cols=numMonths[1];var width=17;if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")}else{inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");if(inst.input&&inst.input[0].type!="hidden"&&inst==$.datepicker._curInst){$(inst.input[0]).focus()}},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();var dpHeight=inst.dpDiv.outerHeight();var inputWidth=inst.input?inst.input.outerWidth():0;var inputHeight=inst.input?inst.input.outerHeight():0;var viewWidth=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)+$(document).scrollLeft();var viewHeight=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)+$(document).scrollTop();offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;offset.left-=(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0;offset.top-=(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(offset.top+dpHeight+inputHeight*2-viewHeight):0;return offset},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling}var position=$(obj).offset();return[position.left,position.top]},_hideDatepicker:function(input,duration){var inst=this._curInst;if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return}if(inst.stayOpen){this._selectDate("#"+inst.id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))}inst.stayOpen=false;if(this._datepickerShowing){duration=(duration!=null?duration:this._get(inst,"duration"));var showAnim=this._get(inst,"showAnim");var postProcess=function(){$.datepicker._tidyDialog(inst)};if(duration!=""&&$.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[(duration==""?"hide":(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide")))](duration,postProcess)}if(duration==""){this._tidyDialog(inst)}var onClose=this._get(inst,"onClose");if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])}this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if($.blockUI){$.unblockUI();$("body").append(this.dpDiv)}}this._inDialog=false}this._curInst=null},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(event){if(!$.datepicker._curInst){return}var $target=$(event.target);if(($target.parents("#"+$.datepicker._mainDivId).length==0)&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker(null,"")}},_adjustDate:function(id,offset,period){var target=$(id);var inst=this._getInst(target[0]);if(this._isDisabledDatepicker(target[0])){return}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);this._updateDatepicker(inst)},_gotoToday:function(id){var target=$(id);var inst=this._getInst(target[0]);if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;inst.drawMonth=inst.selectedMonth=inst.currentMonth;inst.drawYear=inst.selectedYear=inst.currentYear}else{var date=new Date();inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear()}this._notifyChange(inst);this._adjustDate(target)},_selectMonthYear:function(id,select,period){var target=$(id);var inst=this._getInst(target[0]);inst._selectingMonthYear=false;inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target)},_clickMonthYear:function(id){var target=$(id);var inst=this._getInst(target[0]);if(inst.input&&inst._selectingMonthYear&&!$.browser.msie){inst.input[0].focus()}inst._selectingMonthYear=!inst._selectingMonthYear},_selectDay:function(id,month,year,td){var target=$(id);if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return}var inst=this._getInst(target[0]);inst.selectedDay=inst.currentDay=$("a",td).html();inst.selectedMonth=inst.currentMonth=month;inst.selectedYear=inst.currentYear=year;if(inst.stayOpen){inst.endDay=inst.endMonth=inst.endYear=null}this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));if(inst.stayOpen){inst.rangeStart=this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));this._updateDatepicker(inst)}},_clearDate:function(id){var target=$(id);var inst=this._getInst(target[0]);inst.stayOpen=false;inst.endDay=inst.endMonth=inst.endYear=inst.rangeStart=null;this._selectDate(target,"")},_selectDate:function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(inst.input){inst.input.val(dateStr)}this._updateAlternate(inst);var onSelect=this._get(inst,"onSelect");if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{if(inst.input){inst.input.trigger("change")}}if(inst.inline){this._updateDatepicker(inst)}else{if(!inst.stayOpen){this._hideDatepicker(null,this._get(inst,"duration"));this._lastInput=inst.input[0];if(typeof(inst.input[0])!="object"){inst.input[0].focus()}this._lastInput=null}}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");var date=this._getDate(inst);dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function(){$(this).val(dateStr)})}},noWeekends:function(date){var day=date.getDay();return[(day>0&&day<6),""]},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate());var firstMon=new Date(checkDate.getFullYear(),1-1,4);var firstDay=firstMon.getDay()||7;firstMon.setDate(firstMon.getDate()+1-firstDay);if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);return $.datepicker.iso8601Week(checkDate)}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){return 1}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"}value=(typeof value=="object"?value.toString():value+"");if(value==""){return null}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var year=-1;var month=-1;var day=-1;var doy=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var getNumber=function(match){lookAhead(match);var origSize=(match=="@"?14:(match=="y"?4:(match=="o"?3:2)));var size=origSize;var num=0;while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+parseInt(value.charAt(iValue++),10);size--}if(size==origSize){throw"Missing number at position "+iValue}return num};var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);var size=0;for(var j=0;j<names.length;j++){size=Math.max(size,names[j].length)}var name="";var iInit=iValue;while(size>0&&iValue<value.length){name+=value.charAt(iValue++);for(var i=0;i<names.length;i++){if(name==names[i]){return i+1}}size--}throw"Unknown name at position "+iInit};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue}iValue++};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{checkLiteral()}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");break;case"D":getName("D",dayNamesShort,dayNames);break;case"o":doy=getNumber("o");break;case"m":month=getNumber("m");break;case"M":month=getName("M",monthNamesShort,monthNames);break;case"y":year=getNumber("y");break;case"@":var date=new Date(getNumber("@"));year=date.getFullYear();month=date.getMonth()+1;day=date.getDate();break;case"'":if(lookAhead("'")){checkLiteral()}else{literal=true}break;default:checkLiteral()}}}if(year==-1){year=new Date().getFullYear()}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)}}if(doy>-1){month=1;day=doy;do{var dim=this._getDaysInMonth(year,month-1);if(day<=dim){break}month++;day-=dim}while(true)}var date=this._daylightSavingAdjust(new Date(year,month-1,day));if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"}return date},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TIMESTAMP:"@",W3C:"yy-mm-dd",formatDate:function(format,date,settings){if(!date){return""}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=""+value;if(lookAhead(match)){while(num.length<len){num="0"+num}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;case"o":var doy=date.getDate();for(var m=date.getMonth()-1;m>=0;m--){doy+=this._getDaysInMonth(date.getFullYear(),m)}output+=formatNumber("o",doy,3);break;case"m":output+=formatNumber("m",date.getMonth()+1,2);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);break;case"@":output+=date.getTime();break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;default:output+=format.charAt(iFormat)}}}}return output},_possibleChars:function(format){var chars="";var literal=false;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{chars+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'"}else{literal=true}break;default:chars+=format.charAt(iFormat)}}}return chars},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]},_setDateFromField:function(inst){var dateFormat=this._get(inst,"dateFormat");var dates=inst.input?inst.input.val():null;inst.endDay=inst.endMonth=inst.endYear=null;var date=defaultDate=this._getDefaultDate(inst);var settings=this._getFormatConfig(inst);try{date=this.parseDate(dateFormat,dates,settings)||defaultDate}catch(event){this.log(event);date=defaultDate}inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();inst.currentDay=(dates?date.getDate():0);inst.currentMonth=(dates?date.getMonth():0);inst.currentYear=(dates?date.getFullYear():0);this._adjustInstDate(inst)},_getDefaultDate:function(inst){var date=this._determineDate(this._get(inst,"defaultDate"),new Date());var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);return date},_determineDate:function(date,defaultDate){var offsetNumeric=function(offset){var date=new Date();date.setDate(date.getDate()+offset);return date};var offsetString=function(offset,getDaysInMonth){var date=new Date();var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);break;case"w":case"W":day+=parseInt(matches[1],10)*7;break;case"m":case"M":month+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break;case"y":case"Y":year+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break}matches=pattern.exec(offset)}return new Date(year,month,day)};date=(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):date)));date=(date&&date.toString()=="Invalid Date"?defaultDate:date);if(date){date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0)}return this._daylightSavingAdjust(date)},_daylightSavingAdjust:function(date){if(!date){return null}date.setHours(date.getHours()>12?date.getHours()+2:0);return date},_setDate:function(inst,date,endDate){var clear=!(date);var origMonth=inst.selectedMonth;var origYear=inst.selectedYear;date=this._determineDate(date,new Date());inst.selectedDay=inst.currentDay=date.getDate();inst.drawMonth=inst.selectedMonth=inst.currentMonth=date.getMonth();inst.drawYear=inst.selectedYear=inst.currentYear=date.getFullYear();if(origMonth!=inst.selectedMonth||origYear!=inst.selectedYear){this._notifyChange(inst)}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst))}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return startDate},_generateHTML:function(inst){var today=new Date();today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));var isRTL=this._get(inst,"isRTL");var showButtonPanel=this._get(inst,"showButtonPanel");var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");var numMonths=this._getNumberOfMonths(inst);var showCurrentAtPos=this._get(inst,"showCurrentAtPos");var stepMonths=this._get(inst,"stepMonths");var stepBigMonths=this._get(inst,"stepBigMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");var drawMonth=inst.drawMonth-showCurrentAtPos;var drawYear=inst.drawYear;if(drawMonth<0){drawMonth+=12;drawYear--}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate()));maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;if(drawMonth<0){drawMonth=11;drawYear--}}}inst.drawMonth=drawMonth;inst.drawYear=drawYear;var prevText=this._get(inst,"prevText");prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));var nextText=this._get(inst,"nextText");nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));var currentText=this._get(inst,"currentText");var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#'+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";var firstDay=parseInt(this._get(inst,"firstDay"),10);firstDay=(isNaN(firstDay)?0:firstDay);var dayNames=this._get(inst,"dayNames");var dayNamesShort=this._get(inst,"dayNamesShort");var dayNamesMin=this._get(inst,"dayNamesMin");var monthNames=this._get(inst,"monthNames");var monthNamesShort=this._get(inst,"monthNamesShort");var beforeShowDay=this._get(inst,"beforeShowDay");var showOtherMonths=this._get(inst,"showOtherMonths");var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;var endDate=inst.endDay?this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)):currentDate;var defaultDate=this._getDefaultDate(inst);var html="";for(var row=0;row<numMonths[0];row++){var group="";for(var col=0;col<numMonths[1];col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));var cornerClass=" ui-corner-all";var calender="";if(isMultiMonth){calender+='<div class="ui-datepicker-group ui-datepicker-group-';switch(col){case 0:calender+="first";cornerClass=" ui-corner-"+(isRTL?"right":"left");break;case numMonths[1]-1:calender+="last";cornerClass=" ui-corner-"+(isRTL?"left":"right");break;default:calender+="middle";cornerClass="";break}calender+='">'}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var thead="";for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"}calender+=thead+"</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));for(var dRow=0;dRow<numRows;dRow++){calender+="<tr>";var tbody="";for(var dow=0;dow<7;dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":" onclick=\"DP_jQuery.datepicker._selectDay('#"+inst.id+"',"+drawMonth+","+drawYear+', this);return false;"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" ui-state-active":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";printDate.setDate(printDate.getDate()+1);printDate=this._daylightSavingAdjust(printDate)}calender+=tbody+"</tr>"}drawMonth++;if(drawMonth>11){drawMonth=0;drawYear++}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");group+=calender}html+=group}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");inst._keyEvent=false;return html},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,secondary,monthNames,monthNamesShort){minDate=(inst.rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);var changeMonth=this._get(inst,"changeMonth");var changeYear=this._get(inst,"changeYear");var showMonthAfterYear=this._get(inst,"showMonthAfterYear");var html='<div class="ui-datepicker-title">';var monthHtml="";if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span> "}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(var month=0;month<12;month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"}}monthHtml+="</select>"}if(!showMonthAfterYear){html+=monthHtml+((secondary||changeMonth||changeYear)&&(!(changeMonth&&changeYear))?"&#xa0;":"")}if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"}else{var years=this._get(inst,"yearRange").split(":");var year=0;var endYear=0;if(years.length!=2){year=drawYear-10;endYear=drawYear+10}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=drawYear+parseInt(years[0],10);endYear=drawYear+parseInt(years[1],10)}else{year=parseInt(years[0],10);endYear=parseInt(years[1],10)}}year=(minDate?Math.max(year,minDate.getFullYear()):year);endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);html+='<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(;year<=endYear;year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"}html+="</select>"}if(showMonthAfterYear){html+=(secondary||changeMonth||changeYear?"&#xa0;":"")+monthHtml}html+="</div>";return html},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);var month=inst.drawMonth+(period=="M"?offset:0);var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);var date=this._daylightSavingAdjust(new Date(year,month,day));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange(inst)}},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))},_getMinMaxDate:function(inst,minMax,checkRange){var date=this._determineDate(this._get(inst,minMax+"Date"),null);return(!checkRange||!inst.rangeStart?date:(!date||inst.rangeStart>date?inst.rangeStart:date))},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1));if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))}return this._isInRange(inst,date)},_isInRange:function(inst,date){var newMinDate=(!inst.rangeStart?null:this._daylightSavingAdjust(new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay)));newMinDate=(newMinDate&&inst.rangeStart<newMinDate?inst.rangeStart:newMinDate);var minDate=newMinDate||this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate))},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;inst.currentMonth=inst.selectedMonth;inst.currentYear=inst.selectedYear}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))}});function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]}}return target}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))}$.fn.datepicker=function(options){if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);$.datepicker.initialized=true}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)})};$.datepicker=new Datepicker();$.datepicker.initialized=false;$.datepicker.uuid=new Date().getTime();$.datepicker.version="1.7.2";window.DP_jQuery=$})(jQuery);;

/*
 * jQuery Form Plugin
 * version: 2.28 (10-MAY-2009)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    var url = $.trim(this.attr('action'));
    if (url) {
	    // clean url (don't include hash vaue)
	    url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || ''

    options = $.extend({
        url:  url,
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data) {
          if(options.data[n] instanceof Array) {
            for (var k in options.data[n])
              a.push( { name: n, value: options.data[n][k] } );
          }
          else
             a.push( { name: n, value: options.data[n] } );
        }
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i].apply(options, [data, status, $form]);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

	var multipart = false;
//	var mp = 'multipart/form-data';
//	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    // options.iframe allows user to force iframe mode
   if (options.iframe || found || multipart) {
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if (options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;


    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];

        if ($(':input[name=submit]', form).length) {
            alert('Error: Form elements must not be named "submit".');
            return;
        }

        var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" src="about:blank" />');
        var io = $io[0];

        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function() {
                this.aborted = 1;
                $io.attr('src','about:blank'); // abort op in progress
            }
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && $.active--;
			return;
        }
        if (xhr.aborted)
            return;

        var cbInvoked = 0;
        var timedOut = 0;

        // add submitting element to data if we know it
        var sub = form.clk;
        if (sub) {
            var n = sub.name;
            if (n && !sub.disabled) {
                options.extraData = options.extraData || {};
                options.extraData[n] = sub.value;
                if (sub.type == "image") {
                    options.extraData[name+'.x'] = form.clk_x;
                    options.extraData[name+'.y'] = form.clk_y;
                }
            }
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST')
				form.setAttribute('method', 'POST');
			if (form.getAttribute('action') != opts.url)
				form.setAttribute('action', opts.url);

            // ie borks in some cases when setting encoding
            if (! options.skipEncodingOverride) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);

                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
                t ? form.setAttribute('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        var nullCheckFlag = 0;

        function cb() {
            if (cbInvoked++) return;

            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;

                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;

                if ((doc.body == null || doc.body.innerHTML == '') && !nullCheckFlag) {
                    // in some browsers (cough, Opera 9.2.x) the iframe DOM is not always traversable when
                    // the onload callback fires, so we give them a 2nd chance
                    nullCheckFlag = 1;
                    cbInvoked--;
                    setTimeout(cb, 100);
                    return;
                }

                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var form = this.form;
            form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - this.offsetLeft;
                    form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el) {
            	a.push({name: n, value: $(el).val()});
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0], n = input.name;
        if (n && !input.disabled && input.type == 'image') {
        	a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
                	v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b == undefined) b = true;
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select == undefined) select = true;
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);



/*
 * jquery.qtip. The jQuery tooltip plugin
 *
 * Copyright (c) 2009 Craig Thompson
 * http://craigsworks.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : February 2009
 * Version : 1.0.0-rc3
 * Released: Tuesday 12th May, 2009 - 00:00
 * Debug: jquery.qtip.debug.js
 */
(function(f){f.fn.qtip=function(B,u){var y,t,A,s,x,w,v,z;if(typeof B=="string"){if(typeof f(this).data("qtip")!=="object"){f.fn.qtip.log.error.call(self,1,f.fn.qtip.constants.NO_TOOLTIP_PRESENT,false)}if(B=="api"){return f(this).data("qtip").interfaces[f(this).data("qtip").current]}else{if(B=="interfaces"){return f(this).data("qtip").interfaces}}}else{if(!B){B={}}if(typeof B.content!=="object"||(B.content.jquery&&B.content.length>0)){B.content={text:B.content}}if(typeof B.content.title!=="object"){B.content.title={text:B.content.title}}if(typeof B.position!=="object"){B.position={corner:B.position}}if(typeof B.position.corner!=="object"){B.position.corner={target:B.position.corner,tooltip:B.position.corner}}if(typeof B.show!=="object"){B.show={when:B.show}}if(typeof B.show.when!=="object"){B.show.when={event:B.show.when}}if(typeof B.show.effect!=="object"){B.show.effect={type:B.show.effect}}if(typeof B.hide!=="object"){B.hide={when:B.hide}}if(typeof B.hide.when!=="object"){B.hide.when={event:B.hide.when}}if(typeof B.hide.effect!=="object"){B.hide.effect={type:B.hide.effect}}if(typeof B.style!=="object"){B.style={name:B.style}}B.style=c(B.style);s=f.extend(true,{},f.fn.qtip.defaults,B);s.style=a.call({options:s},s.style);s.user=f.extend(true,{},B)}return f(this).each(function(){if(typeof B=="string"){w=B.toLowerCase();A=f(this).qtip("interfaces");if(typeof A=="object"){if(u===true&&w=="destroy"){while(A.length>0){A[A.length-1].destroy()}}else{if(u!==true){A=[f(this).qtip("api")]}for(y=0;y<A.length;y++){if(w=="destroy"){A[y].destroy()}else{if(A[y].status.rendered===true){if(w=="show"){A[y].show()}else{if(w=="hide"){A[y].hide()}else{if(w=="focus"){A[y].focus()}else{if(w=="disable"){A[y].disable(true)}else{if(w=="enable"){A[y].disable(false)}}}}}}}}}}}else{v=f.extend(true,{},s);v.hide.effect.length=s.hide.effect.length;v.show.effect.length=s.show.effect.length;if(v.position.container===false){v.position.container=f(document.body)}if(v.position.target===false){v.position.target=f(this)}if(v.show.when.target===false){v.show.when.target=f(this)}if(v.hide.when.target===false){v.hide.when.target=f(this)}t=f.fn.qtip.interfaces.length;for(y=0;y<t;y++){if(typeof f.fn.qtip.interfaces[y]=="undefined"){t=y;break}}x=new d(f(this),v,t);f.fn.qtip.interfaces[t]=x;if(typeof f(this).data("qtip")=="object"){if(typeof f(this).attr("qtip")==="undefined"){f(this).data("qtip").current=f(this).data("qtip").interfaces.length}f(this).data("qtip").interfaces.push(x)}else{f(this).data("qtip",{current:0,interfaces:[x]})}if(v.content.prerender===false&&v.show.when.event!==false&&v.show.ready!==true){v.show.when.target.bind(v.show.when.event+".qtip-"+t+"-create",{qtip:t},function(C){z=f.fn.qtip.interfaces[C.data.qtip];z.options.show.when.target.unbind(z.options.show.when.event+".qtip-"+C.data.qtip+"-create");z.cache.mouse={x:C.pageX,y:C.pageY};p.call(z);z.options.show.when.target.trigger(z.options.show.when.event)})}else{x.cache.mouse={x:v.show.when.target.offset().left,y:v.show.when.target.offset().top};p.call(x)}}})};function d(u,t,v){var s=this;s.id=v;s.options=t;s.status={animated:false,rendered:false,disabled:false,focused:false};s.elements={target:u.addClass(s.options.style.classes.target),tooltip:null,wrapper:null,content:null,contentWrapper:null,title:null,button:null,tip:null,bgiframe:null};s.cache={mouse:{},position:{},toggle:0};s.timers={};f.extend(s,s.options.api,{show:function(y){var x,z;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"show")}if(s.elements.tooltip.css("display")!=="none"){return s}s.elements.tooltip.stop(true,false);x=s.beforeShow.call(s,y);if(x===false){return s}function w(){if(s.options.position.type!=="static"){s.focus()}s.onShow.call(s,y);if(f.browser.msie){s.elements.tooltip.get(0).style.removeAttribute("filter")}}s.cache.toggle=1;if(s.options.position.type!=="static"){s.updatePosition(y,(s.options.show.effect.length>0))}if(typeof s.options.show.solo=="object"){z=f(s.options.show.solo)}else{if(s.options.show.solo===true){z=f("div.qtip").not(s.elements.tooltip)}}if(z){z.each(function(){if(f(this).qtip("api").status.rendered===true){f(this).qtip("api").hide()}})}if(typeof s.options.show.effect.type=="function"){s.options.show.effect.type.call(s.elements.tooltip,s.options.show.effect.length);s.elements.tooltip.queue(function(){w();f(this).dequeue()})}else{switch(s.options.show.effect.type.toLowerCase()){case"fade":s.elements.tooltip.fadeIn(s.options.show.effect.length,w);break;case"slide":s.elements.tooltip.slideDown(s.options.show.effect.length,function(){w();if(s.options.position.type!=="static"){s.updatePosition(y,true)}});break;case"grow":s.elements.tooltip.show(s.options.show.effect.length,w);break;default:s.elements.tooltip.show(null,w);break}s.elements.tooltip.addClass(s.options.style.classes.active)}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_SHOWN,"show")},hide:function(y){var x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"hide")}else{if(s.elements.tooltip.css("display")==="none"){return s}}clearTimeout(s.timers.show);s.elements.tooltip.stop(true,false);x=s.beforeHide.call(s,y);if(x===false){return s}function w(){s.onHide.call(s,y)}s.cache.toggle=0;if(typeof s.options.hide.effect.type=="function"){s.options.hide.effect.type.call(s.elements.tooltip,s.options.hide.effect.length);s.elements.tooltip.queue(function(){w();f(this).dequeue()})}else{switch(s.options.hide.effect.type.toLowerCase()){case"fade":s.elements.tooltip.fadeOut(s.options.hide.effect.length,w);break;case"slide":s.elements.tooltip.slideUp(s.options.hide.effect.length,w);break;case"grow":s.elements.tooltip.hide(s.options.hide.effect.length,w);break;default:s.elements.tooltip.hide(null,w);break}s.elements.tooltip.removeClass(s.options.style.classes.active)}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_HIDDEN,"hide")},updatePosition:function(w,x){var C,G,L,J,H,E,y,I,B,D,K,A,F,z;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updatePosition")}else{if(s.options.position.type=="static"){return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.CANNOT_POSITION_STATIC,"updatePosition")}}G={position:{left:0,top:0},dimensions:{height:0,width:0},corner:s.options.position.corner.target};L={position:s.getPosition(),dimensions:s.getDimensions(),corner:s.options.position.corner.tooltip};if(s.options.position.target!=="mouse"){if(s.options.position.target.get(0).nodeName.toLowerCase()=="area"){J=s.options.position.target.attr("coords").split(",");for(C=0;C<J.length;C++){J[C]=parseInt(J[C])}H=s.options.position.target.parent("map").attr("name");E=f('img[usemap="#'+H+'"]:first').offset();G.position={left:Math.floor(E.left+J[0]),top:Math.floor(E.top+J[1])};switch(s.options.position.target.attr("shape").toLowerCase()){case"rect":G.dimensions={width:Math.ceil(Math.abs(J[2]-J[0])),height:Math.ceil(Math.abs(J[3]-J[1]))};break;case"circle":G.dimensions={width:J[2]+1,height:J[2]+1};break;case"poly":G.dimensions={width:J[0],height:J[1]};for(C=0;C<J.length;C++){if(C%2==0){if(J[C]>G.dimensions.width){G.dimensions.width=J[C]}if(J[C]<J[0]){G.position.left=Math.floor(E.left+J[C])}}else{if(J[C]>G.dimensions.height){G.dimensions.height=J[C]}if(J[C]<J[1]){G.position.top=Math.floor(E.top+J[C])}}}G.dimensions.width=G.dimensions.width-(G.position.left-E.left);G.dimensions.height=G.dimensions.height-(G.position.top-E.top);break;default:return f.fn.qtip.log.error.call(s,4,f.fn.qtip.constants.INVALID_AREA_SHAPE,"updatePosition");break}G.dimensions.width-=2;G.dimensions.height-=2}else{if(s.options.position.target.add(document.body).length===1){G.position={left:f(document).scrollLeft(),top:f(document).scrollTop()};G.dimensions={height:f(window).height(),width:f(window).width()}}else{if(typeof s.options.position.target.attr("qtip")!=="undefined"){G.position=s.options.position.target.qtip("api").cache.position}else{G.position=s.options.position.target.offset()}G.dimensions={height:s.options.position.target.outerHeight(),width:s.options.position.target.outerWidth()}}}y=f.extend({},G.position);if(G.corner.search(/right/i)!==-1){y.left+=G.dimensions.width}if(G.corner.search(/bottom/i)!==-1){y.top+=G.dimensions.height}if(G.corner.search(/((top|bottom)Middle)|center/)!==-1){y.left+=(G.dimensions.width/2)}if(G.corner.search(/((left|right)Middle)|center/)!==-1){y.top+=(G.dimensions.height/2)}}else{G.position=y={left:s.cache.mouse.x,top:s.cache.mouse.y};G.dimensions={height:1,width:1}}if(L.corner.search(/right/i)!==-1){y.left-=L.dimensions.width}if(L.corner.search(/bottom/i)!==-1){y.top-=L.dimensions.height}if(L.corner.search(/((top|bottom)Middle)|center/)!==-1){y.left-=(L.dimensions.width/2)}if(L.corner.search(/((left|right)Middle)|center/)!==-1){y.top-=(L.dimensions.height/2)}I=(f.browser.msie)?1:0;B=(f.browser.msie&&parseInt(f.browser.version.charAt(0))===6)?1:0;if(s.options.style.border.radius>0){if(L.corner.search(/Left/)!==-1){y.left-=s.options.style.border.radius}else{if(L.corner.search(/Right/)!==-1){y.left+=s.options.style.border.radius}}if(L.corner.search(/Top/)!==-1){y.top-=s.options.style.border.radius}else{if(L.corner.search(/Bottom/)!==-1){y.top+=s.options.style.border.radius}}}if(I){if(L.corner.search(/top/)!==-1){y.top-=I}else{if(L.corner.search(/bottom/)!==-1){y.top+=I}}if(L.corner.search(/left/)!==-1){y.left-=I}else{if(L.corner.search(/right/)!==-1){y.left+=I}}if(L.corner.search(/leftMiddle|rightMiddle/)!==-1){y.top-=1}}if(s.options.position.adjust.screen===true){y=o.call(s,y,G,L)}if(s.options.position.target==="mouse"&&s.options.position.adjust.mouse===true){if(s.options.position.adjust.screen===true&&s.elements.tip){K=s.elements.tip.attr("rel")}else{K=s.options.position.corner.tooltip}y.left+=(K.search(/right/i)!==-1)?-6:6;y.top+=(K.search(/bottom/i)!==-1)?-6:6}if(!s.elements.bgiframe&&f.browser.msie&&parseInt(f.browser.version.charAt(0))==6){f("select, object").each(function(){A=f(this).offset();A.bottom=A.top+f(this).height();A.right=A.left+f(this).width();if(y.top+L.dimensions.height>=A.top&&y.left+L.dimensions.width>=A.left){k.call(s)}})}y.left+=s.options.position.adjust.x;y.top+=s.options.position.adjust.y;F=s.getPosition();if(y.left!=F.left||y.top!=F.top){z=s.beforePositionUpdate.call(s,w);if(z===false){return s}s.cache.position=y;if(x===true){s.status.animated=true;s.elements.tooltip.animate(y,200,"swing",function(){s.status.animated=false})}else{s.elements.tooltip.css(y)}s.onPositionUpdate.call(s,w);if(typeof w!=="undefined"&&w.type&&w.type!=="mousemove"){f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_POSITION_UPDATED,"updatePosition")}}return s},updateWidth:function(w){var x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateWidth")}else{if(w&&typeof w!=="number"){return f.fn.qtip.log.error.call(s,2,"newWidth must be of type number","updateWidth")}}x=s.elements.contentWrapper.siblings().add(s.elements.tip).add(s.elements.button);if(!w){if(typeof s.options.style.width.value=="number"){w=s.options.style.width.value}else{s.elements.tooltip.css({width:"auto"});x.hide();if(f.browser.msie){s.elements.wrapper.add(s.elements.contentWrapper.children()).css({zoom:"normal"})}w=s.getDimensions().width+1;if(!s.options.style.width.value){if(w>s.options.style.width.max){w=s.options.style.width.max}if(w<s.options.style.width.min){w=s.options.style.width.min}}}}if(w%2!==0){w-=1}s.elements.tooltip.width(w);x.show();if(s.options.style.border.radius){s.elements.tooltip.find(".qtip-betweenCorners").each(function(y){f(this).width(w-(s.options.style.border.radius*2))})}if(f.browser.msie){s.elements.wrapper.add(s.elements.contentWrapper.children()).css({zoom:"1"});s.elements.wrapper.width(w);if(s.elements.bgiframe){s.elements.bgiframe.width(w).height(s.getDimensions.height)}}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_WIDTH_UPDATED,"updateWidth")},updateStyle:function(w){var z,A,x,y,B;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateStyle")}else{if(typeof w!=="string"||!f.fn.qtip.styles[w]){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.STYLE_NOT_DEFINED,"updateStyle")}}s.options.style=a.call(s,f.fn.qtip.styles[w],s.options.user.style);s.elements.content.css(q(s.options.style));if(s.options.content.title.text!==false){s.elements.title.css(q(s.options.style.title,true))}s.elements.contentWrapper.css({borderColor:s.options.style.border.color});if(s.options.style.tip.corner!==false){if(f("<canvas>").get(0).getContext){z=s.elements.tooltip.find(".qtip-tip canvas:first");x=z.get(0).getContext("2d");x.clearRect(0,0,300,300);y=z.parent("div[rel]:first").attr("rel");B=b(y,s.options.style.tip.size.width,s.options.style.tip.size.height);h.call(s,z,B,s.options.style.tip.color||s.options.style.border.color)}else{if(f.browser.msie){z=s.elements.tooltip.find('.qtip-tip [nodeName="shape"]');z.attr("fillcolor",s.options.style.tip.color||s.options.style.border.color)}}}if(s.options.style.border.radius>0){s.elements.tooltip.find(".qtip-betweenCorners").css({backgroundColor:s.options.style.border.color});if(f("<canvas>").get(0).getContext){A=g(s.options.style.border.radius);s.elements.tooltip.find(".qtip-wrapper canvas").each(function(){x=f(this).get(0).getContext("2d");x.clearRect(0,0,300,300);y=f(this).parent("div[rel]:first").attr("rel");r.call(s,f(this),A[y],s.options.style.border.radius,s.options.style.border.color)})}else{if(f.browser.msie){s.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function(){f(this).attr("fillcolor",s.options.style.border.color)})}}}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_STYLE_UPDATED,"updateStyle")},updateContent:function(A,y){var z,x,w;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateContent")}else{if(!A){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateContent")}}z=s.beforeContentUpdate.call(s,A);if(typeof z=="string"){A=z}else{if(z===false){return}}if(f.browser.msie){s.elements.contentWrapper.children().css({zoom:"normal"})}if(A.jquery&&A.length>0){A.clone(true).appendTo(s.elements.content).show()}else{s.elements.content.html(A)}x=s.elements.content.find("img[complete=false]");if(x.length>0){w=0;x.each(function(C){f('<img src="'+f(this).attr("src")+'" />').load(function(){if(++w==x.length){B()}})})}else{B()}function B(){s.updateWidth();if(y!==false){if(s.options.position.type!=="static"){s.updatePosition(s.elements.tooltip.is(":visible"),true)}if(s.options.style.tip.corner!==false){n.call(s)}}}s.onContentUpdate.call(s);return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_CONTENT_UPDATED,"loadContent")},loadContent:function(w,z,A){var y;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"loadContent")}y=s.beforeContentLoad.call(s);if(y===false){return s}if(A=="post"){f.post(w,z,x)}else{f.get(w,z,x)}function x(B){s.onContentLoad.call(s);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_CONTENT_LOADED,"loadContent");s.updateContent(B)}return s},updateTitle:function(w){if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateTitle")}else{if(!w){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateTitle")}}returned=s.beforeTitleUpdate.call(s);if(returned===false){return s}if(s.elements.button){s.elements.button=s.elements.button.clone(true)}s.elements.title.html(w);if(s.elements.button){s.elements.title.prepend(s.elements.button)}s.onTitleUpdate.call(s);return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_TITLE_UPDATED,"updateTitle")},focus:function(A){var y,x,w,z;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"focus")}else{if(s.options.position.type=="static"){return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.CANNOT_FOCUS_STATIC,"focus")}}y=parseInt(s.elements.tooltip.css("z-index"));x=6000+f("div.qtip[qtip]").length-1;if(!s.status.focused&&y!==x){z=s.beforeFocus.call(s,A);if(z===false){return s}f("div.qtip[qtip]").not(s.elements.tooltip).each(function(){if(f(this).qtip("api").status.rendered===true){w=parseInt(f(this).css("z-index"));if(typeof w=="number"&&w>-1){f(this).css({zIndex:parseInt(f(this).css("z-index"))-1})}f(this).qtip("api").status.focused=false}});s.elements.tooltip.css({zIndex:x});s.status.focused=true;s.onFocus.call(s,A);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_FOCUSED,"focus")}return s},disable:function(w){if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"disable")}if(w){if(!s.status.disabled){s.status.disabled=true;f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_DISABLED,"disable")}else{f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED,"disable")}}else{if(s.status.disabled){s.status.disabled=false;f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_ENABLED,"disable")}else{f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED,"disable")}}return s},destroy:function(){var w,x,y;x=s.beforeDestroy.call(s);if(x===false){return s}if(s.status.rendered){s.options.show.when.target.unbind("mousemove.qtip",s.updatePosition);s.options.show.when.target.unbind("mouseout.qtip",s.hide);s.options.show.when.target.unbind(s.options.show.when.event+".qtip");s.options.hide.when.target.unbind(s.options.hide.when.event+".qtip");s.elements.tooltip.unbind(s.options.hide.when.event+".qtip");s.elements.tooltip.unbind("mouseover.qtip",s.focus);s.elements.tooltip.remove()}else{s.options.show.when.target.unbind(s.options.show.when.event+".qtip-create")}if(typeof s.elements.target.data("qtip")=="object"){y=s.elements.target.data("qtip").interfaces;if(typeof y=="object"&&y.length>0){for(w=0;w<y.length-1;w++){if(y[w].id==s.id){y.splice(w,1)}}}}delete f.fn.qtip.interfaces[s.id];if(typeof y=="object"&&y.length>0){s.elements.target.data("qtip").current=y.length-1}else{s.elements.target.removeData("qtip")}s.onDestroy.call(s);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_DESTROYED,"destroy");return s.elements.target},getPosition:function(){var w,x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getPosition")}w=(s.elements.tooltip.css("display")!=="none")?false:true;if(w){s.elements.tooltip.css({visiblity:"hidden"}).show()}x=s.elements.tooltip.offset();if(w){s.elements.tooltip.css({visiblity:"visible"}).hide()}return x},getDimensions:function(){var w,x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getDimensions")}w=(!s.elements.tooltip.is(":visible"))?true:false;if(w){s.elements.tooltip.css({visiblity:"hidden"}).show()}x={height:s.elements.tooltip.outerHeight(),width:s.elements.tooltip.outerWidth()};if(w){s.elements.tooltip.css({visiblity:"visible"}).hide()}return x}})}function p(){var s,w,u,t,v,y,x;s=this;s.beforeRender.call(s);s.status.rendered=true;s.elements.tooltip='<div qtip="'+s.id+'" class="qtip '+(s.options.style.classes.tooltip||s.options.style)+'"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:'+s.options.position.type+';">  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">    <div class="qtip-contentWrapper" style="overflow:hidden;">       <div class="qtip-content '+s.options.style.classes.content+'"></div></div></div></div>';s.elements.tooltip=f(s.elements.tooltip);s.elements.tooltip.appendTo(s.options.position.container);s.elements.tooltip.data("qtip",{current:0,interfaces:[s]});s.elements.wrapper=s.elements.tooltip.children("div:first");s.elements.contentWrapper=s.elements.wrapper.children("div:first").css({background:s.options.style.background});s.elements.content=s.elements.contentWrapper.children("div:first").css(q(s.options.style));if(f.browser.msie){s.elements.wrapper.add(s.elements.content).css({zoom:1})}if(s.options.hide.when.event=="unfocus"){s.elements.tooltip.attr("unfocus",true)}if(typeof s.options.style.width.value=="number"){s.updateWidth()}if(f("<canvas>").get(0).getContext||f.browser.msie){if(s.options.style.border.radius>0){m.call(s)}else{s.elements.contentWrapper.css({border:s.options.style.border.width+"px solid "+s.options.style.border.color})}if(s.options.style.tip.corner!==false){e.call(s)}}else{s.elements.contentWrapper.css({border:s.options.style.border.width+"px solid "+s.options.style.border.color});s.options.style.border.radius=0;s.options.style.tip.corner=false;f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED,"render")}if((typeof s.options.content.text=="string"&&s.options.content.text.length>0)||(s.options.content.text.jquery&&s.options.content.text.length>0)){u=s.options.content.text}else{if(typeof s.elements.target.attr("title")=="string"&&s.elements.target.attr("title").length>0){u=s.elements.target.attr("title").replace("\\n","<br />");s.elements.target.attr("title","")}else{if(typeof s.elements.target.attr("alt")=="string"&&s.elements.target.attr("alt").length>0){u=s.elements.target.attr("alt").replace("\\n","<br />");s.elements.target.attr("alt","")}else{u=" ";f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.NO_VALID_CONTENT,"render")}}}if(s.options.content.title.text!==false){j.call(s)}s.updateContent(u);l.call(s);if(s.options.show.ready===true){s.show()}if(s.options.content.url!==false){t=s.options.content.url;v=s.options.content.data;y=s.options.content.method||"get";s.loadContent(t,v,y)}s.onRender.call(s);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_RENDERED,"render")}function m(){var F,z,t,B,x,E,u,G,D,y,w,C,A,s,v;F=this;F.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove();t=F.options.style.border.width;B=F.options.style.border.radius;x=F.options.style.border.color||F.options.style.tip.color;E=g(B);u={};for(z in E){u[z]='<div rel="'+z+'" style="'+((z.search(/Left/)!==-1)?"left":"right")+":0; position:absolute; height:"+B+"px; width:"+B+'px; overflow:hidden; line-height:0.1px; font-size:1px">';if(f("<canvas>").get(0).getContext){u[z]+='<canvas height="'+B+'" width="'+B+'" style="vertical-align: top"></canvas>'}else{if(f.browser.msie){G=B*2+3;u[z]+='<v:arc stroked="false" fillcolor="'+x+'" startangle="'+E[z][0]+'" endangle="'+E[z][1]+'" style="width:'+G+"px; height:"+G+"px; margin-top:"+((z.search(/bottom/)!==-1)?-2:-1)+"px; margin-left:"+((z.search(/Right/)!==-1)?E[z][2]-3.5:-1)+'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'}}u[z]+="</div>"}D=F.getDimensions().width-(Math.max(t,B)*2);y='<div class="qtip-betweenCorners" style="height:'+B+"px; width:"+D+"px; overflow:hidden; background-color:"+x+'; line-height:0.1px; font-size:1px;">';w='<div class="qtip-borderTop" dir="ltr" style="height:'+B+"px; margin-left:"+B+'px; line-height:0.1px; font-size:1px; padding:0;">'+u.topLeft+u.topRight+y;F.elements.wrapper.prepend(w);C='<div class="qtip-borderBottom" dir="ltr" style="height:'+B+"px; margin-left:"+B+'px; line-height:0.1px; font-size:1px; padding:0;">'+u.bottomLeft+u.bottomRight+y;F.elements.wrapper.append(C);if(f("<canvas>").get(0).getContext){F.elements.wrapper.find("canvas").each(function(){A=E[f(this).parent("[rel]:first").attr("rel")];r.call(F,f(this),A,B,x)})}else{if(f.browser.msie){F.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>')}}s=Math.max(B,(B+(t-B)));v=Math.max(t-B,0);F.elements.contentWrapper.css({border:"0px solid "+x,borderWidth:v+"px "+s+"px"})}function r(u,w,s,t){var v=u.get(0).getContext("2d");v.fillStyle=t;v.beginPath();v.arc(w[0],w[1],s,0,Math.PI*2,false);v.fill()}function e(v){var t,s,x,u,w;t=this;if(t.elements.tip!==null){t.elements.tip.remove()}s=t.options.style.tip.color||t.options.style.border.color;if(t.options.style.tip.corner===false){return}else{if(!v){v=t.options.style.tip.corner}}x=b(v,t.options.style.tip.size.width,t.options.style.tip.size.height);t.elements.tip='<div class="'+t.options.style.classes.tip+'" dir="ltr" rel="'+v+'" style="position:absolute; height:'+t.options.style.tip.size.height+"px; width:"+t.options.style.tip.size.width+'px; margin:0 auto; line-height:0.1px; font-size:1px;">';if(f("<canvas>").get(0).getContext){t.elements.tip+='<canvas height="'+t.options.style.tip.size.height+'" width="'+t.options.style.tip.size.width+'"></canvas>'}else{if(f.browser.msie){u=t.options.style.tip.size.width+","+t.options.style.tip.size.height;w="m"+x[0][0]+","+x[0][1];w+=" l"+x[1][0]+","+x[1][1];w+=" "+x[2][0]+","+x[2][1];w+=" xe";t.elements.tip+='<v:shape fillcolor="'+s+'" stroked="false" filled="true" path="'+w+'" coordsize="'+u+'" style="width:'+t.options.style.tip.size.width+"px; height:"+t.options.style.tip.size.height+"px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:"+((v.search(/top/)!==-1)?"bottom":"top")+'"></v:shape>';t.elements.tip+='<v:image style="behavior:url(#default#VML);"></v:image>';t.elements.contentWrapper.css("position","relative")}}t.elements.tooltip.prepend(t.elements.tip+"</div>");t.elements.tip=t.elements.tooltip.find("."+t.options.style.classes.tip).eq(0);if(f("<canvas>").get(0).getContext){h.call(t,t.elements.tip.find("canvas:first"),x,s)}if(v.search(/top/)!==-1&&f.browser.msie&&parseInt(f.browser.version.charAt(0))===6){t.elements.tip.css({marginTop:-4})}n.call(t,v)}function h(t,v,s){var u=t.get(0).getContext("2d");u.fillStyle=s;u.beginPath();u.moveTo(v[0][0],v[0][1]);u.lineTo(v[1][0],v[1][1]);u.lineTo(v[2][0],v[2][1]);u.fill()}function n(u){var t,w,s,x,v;t=this;if(t.options.style.tip.corner===false||!t.elements.tip){return}if(!u){u=t.elements.tip.attr("rel")}w=positionAdjust=(f.browser.msie)?1:0;t.elements.tip.css(u.match(/left|right|top|bottom/)[0],0);if(u.search(/top|bottom/)!==-1){if(f.browser.msie){if(parseInt(f.browser.version.charAt(0))===6){positionAdjust=(u.search(/top/)!==-1)?-3:1}else{positionAdjust=(u.search(/top/)!==-1)?1:2}}if(u.search(/Middle/)!==-1){t.elements.tip.css({left:"50%",marginLeft:-(t.options.style.tip.size.width/2)})}else{if(u.search(/Left/)!==-1){t.elements.tip.css({left:t.options.style.border.radius-w})}else{if(u.search(/Right/)!==-1){t.elements.tip.css({right:t.options.style.border.radius+w})}}}if(u.search(/top/)!==-1){t.elements.tip.css({top:-positionAdjust})}else{t.elements.tip.css({bottom:positionAdjust})}}else{if(u.search(/left|right/)!==-1){if(f.browser.msie){positionAdjust=(parseInt(f.browser.version.charAt(0))===6)?1:((u.search(/left/)!==-1)?1:2)}if(u.search(/Middle/)!==-1){t.elements.tip.css({top:"50%",marginTop:-(t.options.style.tip.size.height/2)})}else{if(u.search(/Top/)!==-1){t.elements.tip.css({top:t.options.style.border.radius-w})}else{if(u.search(/Bottom/)!==-1){t.elements.tip.css({bottom:t.options.style.border.radius+w})}}}if(u.search(/left/)!==-1){t.elements.tip.css({left:-positionAdjust})}else{t.elements.tip.css({right:positionAdjust})}}}s="padding-"+u.match(/left|right|top|bottom/)[0];x=t.options.style.tip.size[(s.search(/left|right/)!==-1)?"width":"height"];t.elements.tooltip.css("padding",0);t.elements.tooltip.css(s,x);if(f.browser.msie&&parseInt(f.browser.version.charAt(0))==6){v=parseInt(t.elements.tip.css("margin-top"))||0;v+=parseInt(t.elements.content.css("margin-top"))||0;t.elements.tip.css({marginTop:v})}}function j(){var s=this;if(s.elements.title!==null){s.elements.title.remove()}s.elements.title=f('<div class="'+s.options.style.classes.title+'">').css(q(s.options.style.title,true)).css({zoom:(f.browser.msie)?1:0}).prependTo(s.elements.contentWrapper);if(s.options.content.title.text){s.updateTitle.call(s,s.options.content.title.text)}if(s.options.content.title.button!==false&&typeof s.options.content.title.button=="string"){s.elements.button=f('<a class="'+s.options.style.classes.button+'" style="float:right; position: relative"></a>').css(q(s.options.style.button,true)).html(s.options.content.title.button).prependTo(s.elements.title).click(function(t){if(!s.status.disabled){s.hide(t)}})}}function l(){var t,v,u,s;t=this;v=t.options.show.when.target;u=t.options.hide.when.target;if(t.options.hide.fixed){u=u.add(t.elements.tooltip)}if(t.options.hide.when.event=="inactive"){s=["click","dblclick","mousedown","mouseup","mousemove","mouseout","mouseenter","mouseleave","mouseover"];function y(z){if(t.status.disabled===true){return}clearTimeout(t.timers.inactive);t.timers.inactive=setTimeout(function(){f(s).each(function(){u.unbind(this+".qtip-inactive");t.elements.content.unbind(this+".qtip-inactive")});t.hide(z)},t.options.hide.delay)}}else{if(t.options.hide.fixed===true){t.elements.tooltip.bind("mouseover.qtip",function(){if(t.status.disabled===true){return}clearTimeout(t.timers.hide)})}}function x(z){if(t.status.disabled===true){return}if(t.options.hide.when.event=="inactive"){f(s).each(function(){u.bind(this+".qtip-inactive",y);t.elements.content.bind(this+".qtip-inactive",y)});y()}clearTimeout(t.timers.show);clearTimeout(t.timers.hide);t.timers.show=setTimeout(function(){t.show(z)},t.options.show.delay)}function w(z){if(t.status.disabled===true){return}if(t.options.hide.fixed===true&&t.options.hide.when.event.search(/mouse(out|leave)/i)!==-1&&f(z.relatedTarget).parents("div.qtip[qtip]").length>0){z.stopPropagation();z.preventDefault();clearTimeout(t.timers.hide);return false}clearTimeout(t.timers.show);clearTimeout(t.timers.hide);t.elements.tooltip.stop(true,true);t.timers.hide=setTimeout(function(){t.hide(z)},t.options.hide.delay)}if((t.options.show.when.target.add(t.options.hide.when.target).length===1&&t.options.show.when.event==t.options.hide.when.event&&t.options.hide.when.event!=="inactive")||t.options.hide.when.event=="unfocus"){t.cache.toggle=0;v.bind(t.options.show.when.event+".qtip",function(z){if(t.cache.toggle==0){x(z)}else{w(z)}})}else{v.bind(t.options.show.when.event+".qtip",x);if(t.options.hide.when.event!=="inactive"){u.bind(t.options.hide.when.event+".qtip",w)}}if(t.options.position.type.search(/(fixed|absolute)/)!==-1){t.elements.tooltip.bind("mouseover.qtip",t.focus)}if(t.options.position.target==="mouse"&&t.options.position.type!=="static"){v.bind("mousemove.qtip",function(z){t.cache.mouse={x:z.pageX,y:z.pageY};if(t.status.disabled===false&&t.options.position.adjust.mouse===true&&t.options.position.type!=="static"&&t.elements.tooltip.css("display")!=="none"){t.updatePosition(z)}})}}function o(u,v,A){var z,s,x,y,t,w;z=this;if(A.corner=="center"){return v.position}s=f.extend({},u);y={x:false,y:false};t={left:(s.left<f.fn.qtip.cache.screen.scroll.left),right:(s.left+A.dimensions.width+2>=f.fn.qtip.cache.screen.width+f.fn.qtip.cache.screen.scroll.left),top:(s.top<f.fn.qtip.cache.screen.scroll.top),bottom:(s.top+A.dimensions.height+2>=f.fn.qtip.cache.screen.height+f.fn.qtip.cache.screen.scroll.top)};x={left:(t.left&&(A.corner.search(/right/i)!=-1||(A.corner.search(/right/i)==-1&&!t.right))),right:(t.right&&(A.corner.search(/left/i)!=-1||(A.corner.search(/left/i)==-1&&!t.left))),top:(t.top&&A.corner.search(/top/i)==-1),bottom:(t.bottom&&A.corner.search(/bottom/i)==-1)};if(x.left){if(z.options.position.target!=="mouse"){s.left=v.position.left+v.dimensions.width}else{s.left=z.cache.mouse.x}y.x="Left"}else{if(x.right){if(z.options.position.target!=="mouse"){s.left=v.position.left-A.dimensions.width}else{s.left=z.cache.mouse.x-A.dimensions.width}y.x="Right"}}if(x.top){if(z.options.position.target!=="mouse"){s.top=v.position.top+v.dimensions.height}else{s.top=z.cache.mouse.y}y.y="top"}else{if(x.bottom){if(z.options.position.target!=="mouse"){s.top=v.position.top-A.dimensions.height}else{s.top=z.cache.mouse.y-A.dimensions.height}y.y="bottom"}}if(s.left<0){s.left=u.left;y.x=false}if(s.top<0){s.top=u.top;y.y=false}if(z.options.style.tip.corner!==false){s.corner=new String(A.corner);if(y.x!==false){s.corner=s.corner.replace(/Left|Right|Middle/,y.x)}if(y.y!==false){s.corner=s.corner.replace(/top|bottom/,y.y)}if(s.corner!==z.elements.tip.attr("rel")){e.call(z,s.corner)}}return s}function q(u,t){var v,s;v=f.extend(true,{},u);for(s in v){if(t===true&&s.search(/(tip|classes)/i)!==-1){delete v[s]}else{if(!t&&s.search(/(width|border|tip|title|classes|user)/i)!==-1){delete v[s]}}}return v}function c(s){if(typeof s.tip!=="object"){s.tip={corner:s.tip}}if(typeof s.tip.size!=="object"){s.tip.size={width:s.tip.size,height:s.tip.size}}if(typeof s.border!=="object"){s.border={width:s.border}}if(typeof s.width!=="object"){s.width={value:s.width}}if(typeof s.width.max=="string"){s.width.max=parseInt(s.width.max.replace(/([0-9]+)/i,"$1"))}if(typeof s.width.min=="string"){s.width.min=parseInt(s.width.min.replace(/([0-9]+)/i,"$1"))}if(typeof s.tip.size.x=="number"){s.tip.size.width=s.tip.size.x;delete s.tip.size.x}if(typeof s.tip.size.y=="number"){s.tip.size.height=s.tip.size.y;delete s.tip.size.y}return s}function a(){var s,t,u,x,v,w;s=this;u=[true,{}];for(t=0;t<arguments.length;t++){u.push(arguments[t])}x=[f.extend.apply(f,u)];while(typeof x[0].name=="string"){x.unshift(c(f.fn.qtip.styles[x[0].name]))}x.unshift(true,{classes:{tooltip:"qtip-"+(arguments[0].name||"defaults")}},f.fn.qtip.styles.defaults);v=f.extend.apply(f,x);w=(f.browser.msie)?1:0;v.tip.size.width+=w;v.tip.size.height+=w;if(v.tip.size.width%2>0){v.tip.size.width+=1}if(v.tip.size.height%2>0){v.tip.size.height+=1}if(v.tip.corner===true){v.tip.corner=(s.options.position.corner.tooltip==="center")?false:s.options.position.corner.tooltip}return v}function b(v,u,t){var s={bottomRight:[[0,0],[u,t],[u,0]],bottomLeft:[[0,0],[u,0],[0,t]],topRight:[[0,t],[u,0],[u,t]],topLeft:[[0,0],[0,t],[u,t]],topMiddle:[[0,t],[u/2,0],[u,t]],bottomMiddle:[[0,0],[u,0],[u/2,t]],rightMiddle:[[0,0],[u,t/2],[0,t]],leftMiddle:[[u,0],[u,t],[0,t/2]]};s.leftTop=s.bottomRight;s.rightTop=s.bottomLeft;s.leftBottom=s.topRight;s.rightBottom=s.topLeft;return s[v]}function g(s){var t;if(f("<canvas>").get(0).getContext){t={topLeft:[s,s],topRight:[0,s],bottomLeft:[s,0],bottomRight:[0,0]}}else{if(f.browser.msie){t={topLeft:[-90,90,0],topRight:[-90,90,-s],bottomLeft:[90,270,0],bottomRight:[90,270,-s]}}}return t}function k(){var s,t,u;s=this;u=s.getDimensions();t='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:'+u.height+"px; width:"+u.width+'px" />';s.elements.bgiframe=s.elements.wrapper.prepend(t).children(".qtip-bgiframe:first")}f(document).ready(function(){f.fn.qtip.cache={screen:{scroll:{left:f(window).scrollLeft(),top:f(window).scrollTop()},width:f(window).width(),height:f(window).height()}};var s;f(window).bind("resize scroll",function(t){clearTimeout(s);s=setTimeout(function(){if(t.type==="scroll"){f.fn.qtip.cache.screen.scroll={left:f(window).scrollLeft(),top:f(window).scrollTop()}}else{f.fn.qtip.cache.screen.width=f(window).width();f.fn.qtip.cache.screen.height=f(window).height()}for(i=0;i<f.fn.qtip.interfaces.length;i++){var u=f.fn.qtip.interfaces[i];if(u.status.rendered===true&&(u.options.position.type!=="static"||u.options.position.adjust.scroll&&t.type==="scroll"||u.options.position.adjust.resize&&t.type==="resize")){u.updatePosition(t,true)}}},100)});f(document).bind("mousedown.qtip",function(t){if(f(t.target).parents("div.qtip").length===0){f(".qtip[unfocus]").each(function(){var u=f(this).qtip("api");if(f(this).is(":visible")&&!u.status.disabled&&f(t.target).add(u.elements.target).length>1){u.hide(t)}})}})});f.fn.qtip.interfaces=[];f.fn.qtip.log={error:function(){return this}};f.fn.qtip.constants={};f.fn.qtip.defaults={content:{prerender:false,text:false,url:false,data:null,title:{text:false,button:false}},position:{target:false,corner:{target:"bottomRight",tooltip:"topLeft"},adjust:{x:0,y:0,mouse:true,screen:false,scroll:true,resize:true},type:"absolute",container:false},show:{when:{target:false,event:"mouseover"},effect:{type:"fade",length:100},delay:140,solo:false,ready:false},hide:{when:{target:false,event:"mouseout"},effect:{type:"fade",length:100},delay:0,fixed:false},api:{beforeRender:function(){},onRender:function(){},beforePositionUpdate:function(){},onPositionUpdate:function(){},beforeShow:function(){},onShow:function(){},beforeHide:function(){},onHide:function(){},beforeContentUpdate:function(){},onContentUpdate:function(){},beforeContentLoad:function(){},onContentLoad:function(){},beforeTitleUpdate:function(){},onTitleUpdate:function(){},beforeDestroy:function(){},onDestroy:function(){},beforeFocus:function(){},onFocus:function(){}}};f.fn.qtip.styles={defaults:{background:"white",color:"#111",overflow:"hidden",textAlign:"left",width:{min:0,max:250},padding:"5px 9px",border:{width:1,radius:0,color:"#d3d3d3"},tip:{corner:false,color:false,size:{width:13,height:13},opacity:1},title:{background:"#e1e1e1",fontWeight:"bold",padding:"7px 12px"},button:{cursor:"pointer"},classes:{target:"",tip:"qtip-tip",title:"qtip-title",button:"qtip-button",content:"qtip-content",active:"qtip-active"}},cream:{border:{width:3,radius:0,color:"#F9E98E"},title:{background:"#F0DE7D",color:"#A27D35"},background:"#FBF7AA",color:"#A27D35",classes:{tooltip:"qtip-cream"}},light:{border:{width:3,radius:0,color:"#E2E2E2"},title:{background:"#f1f1f1",color:"#454545"},background:"white",color:"#454545",classes:{tooltip:"qtip-light"}},dark:{border:{width:3,radius:0,color:"#303030"},title:{background:"#404040",color:"#f3f3f3"},background:"#505050",color:"#f3f3f3",classes:{tooltip:"qtip-dark"}},red:{border:{width:3,radius:0,color:"#CE6F6F"},title:{background:"#f28279",color:"#9C2F2F"},background:"#F79992",color:"#9C2F2F",classes:{tooltip:"qtip-red"}},green:{border:{width:3,radius:0,color:"#A9DB66"},title:{background:"#b9db8c",color:"#58792E"},background:"#CDE6AC",color:"#58792E",classes:{tooltip:"qtip-green"}},blue:{border:{width:3,radius:0,color:"#ADD9ED"},title:{background:"#D0E9F5",color:"#5E99BD"},background:"#E5F6FE",color:"#4D9FBF",classes:{tooltip:"qtip-blue"}}}})(jQuery);

(function($){var check_element=function(name){var obj=null;var check_id=$('#'+name);var check_name=$('input[name='+name+']');if(check_id!=undefined)obj=check_id;else if(check_name!=undefined)obj=check_name;return obj;};$.fn.autotab_magic=function(focus){for(var i=0;i<this.length;i++){var n=i+1;var p=i-1;if(i>0&&n<this.length)$(this[i]).autotab({target:$(this[n]),previous:$(this[p])});else if(i>0)$(this[i]).autotab({previous:$(this[p])});else
$(this[i]).autotab({target:$(this[n])});if(focus!=null&&(isNaN(focus)&&focus==$(this[i]).attr('id'))||(!isNaN(focus)&&focus==i))$(this[i]).focus();}};$.fn.autotab=function(options){var defaults={format:'all',maxlength:2147483647,uppercase:false,lowercase:false,nospace:false,target:null,previous:null,pattern:null};$.extend(defaults,options);if(typeof defaults.target=='string')defaults.target=check_element(defaults.target);if(typeof defaults.previous=='string')defaults.previous=check_element(defaults.previous);var maxlength=$(this).attr('maxlength');if(defaults.maxlength==2147483647&&maxlength!=2147483647)defaults.maxlength=maxlength;else if(defaults.maxlength>0)$(this).attr('maxlength',defaults.maxlength);else
defaults.target=null;if(defaults.format!='all')$(this).autotab_filter(defaults);return $(this).bind('keydown',function(e){if(e.which==8&&this.value.length==0&&defaults.previous)defaults.previous.focus().val(defaults.previous.val());}).bind('keyup',function(e){var keys=[8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,144,145];if(e.which!=8){var val=$(this).val();if($.inArray(e.which,keys)==-1&&val.length==defaults.maxlength&&defaults.target)defaults.target.focus();}});};})(jQuery);


(function($) {
  /**
   * Generic tabs
   */
  $.fn.naSimpleTabs = function() {
    var selector = this;
    var selected = 'active';
    $(selector).click(function() {
      if($(this).hasClass(selected))
        return false;
      // reset selected
      $(selector).filter('.' + selected).each(function(){
        $(this).removeClass(selected);
        $($(this).children('a').attr('href')).hide();
      });
      // clicked elm active
      $(this).addClass(selected);
      $($(this).children('a').attr('href')).show();
      return false;
    });
  };



})(jQuery);

/**
 * Fancy Dropdown
 *
 * Dependencies: none
 *
 *
 */

(function($) {
  /**
   * jQuery plugin interface.
   *
   *
   */
  $.fn.fancyDropdown = function(opts) {
    return $(this).each(function() {
      return (new FancyDropdown).init(this, opts);
    });
  };

  /**
   * Class constructor.
   *
   *
   */
  var FancyDropdown = function() {};

  /**
   * Class prototype.
   *
   *
   */
  FancyDropdown.prototype = {
    /**
     * Initialize.
     *
     *
     */
    init: function(elm, opts) {
      this.opts = {
          multiple: false,
          afterSelect: null
      };
      this.elm = $(elm);
      opts ? $.extend(this.opts, opts) : null;

      if(this.opts.multiple) {
        // no point in continuing if no options exist
        if(this.elm.find('input[type=checkbox]').length == 0) {
          return true;
        }
        this.multi();
      } else {
        this.single();
      }
      this.toggleEvent();
      this.load();
      //return this;
      var self = this;
      // close menu if clicked outside open menu
      $(document).click(function(){
        self.hideOpenDropdowns();
      });

      $('.fancyDropdown, .fancyDropdownMultiple').click(function(e){
        e.stopPropagation();
      });
    },

    hideOpenDropdowns: function() {
      $('.fancyDropdownMultiplePane:visible, ul.fancyDropdownOptions:visible').each(function(i) {
          $(this).hide();
      });
      this.togglePageElements();
    },

    hightlightOption: function(elm) {
      var color = '#f5f5f5';
      if($(elm).children('input').attr('data-type') == 'parent') return false;

      if(this.opts.multiple && !$(elm).children('input').is(':checked')) {
        color = '';
      }

      $(elm).css('background-color', color);
    },

    multi: function() {
      var self = this;

      this.selectionTitle = function() {
        // options = Array(strings), Array(objects), Object
        var options = self.elm.find('input[type=checkbox]:checked:not(input[data-type=parent])');
        var all_options_count = self.elm.find('input[type=checkbox]:not(input[data-type=parent])').length
        if(options.length == 0 && $(this.elm.attr("rel")).val() == "" || all_options_count == options.length) {
          return 'All';
        } else if(options.length == 0) {
          return '&nbsp;';
        } else if(options.length == 1) {
          return options.eq(0).parent().html().replace(/<\/?[^>]+>/gi, '');
        } else if(options.length > 1) {
          return 'Various';
        }
        return '&nbsp;';
      };

      // load options stored in hidden field
      this.load = function() {
        var options = self.elm.find('input[type=checkbox]');
        var selected_option_values = $(this.elm.attr("rel")).val().split(',');
        options.each(function(i) {
          var is_checked = $.inArray($(this).val(), selected_option_values) != -1;
          if(is_checked) {
            $(this).attr('checked', true);
            self.hightlightOption($(this).parent());
          }
        });
        self.setSelectionTitle(self.selectionTitle());
      };

      // stored checked box values in hidden field
      this.storeSelectedFields = function() {
        var ids = new Array;
        self.elm.find('input[type=checkbox]:checked').each(function() {
          ids.push($(this).val());
        });
        self.selectOption(ids.join(','), self.selectionTitle());
      };

      // parent options which select children
      var parent_options = this.elm.find('.fancyDropdownOptions li[data-type=parent]');
      parent_options.unbind('click').click(function(event) {
        // check/uncheck checkbox if li clicked
        var checkbox_field = $(this).children('input');
        if(event.target.nodeName.toLowerCase() == "li") {
          if(checkbox_field.is(':checked')) {
            checkbox_field.attr('checked', false);
          } else {
            checkbox_field.attr('checked', true);
          }
        }

        var parent_id = '~' + checkbox_field.val();
        self.elm.find('.fancyDropdownOptions input[data-parent-ids*='+parent_id+']').each(function() {
          $(this).attr('checked', checkbox_field.is(':checked'));
          self.hightlightOption($(this).parent());
        });

        self.storeSelectedFields();
        ga_track_event('Listing Search', 'Check Parent Neighborhood');
      });

      // options click event
      this.elm.find('.fancyDropdownOptions li:not(li[data-type=parent])').unbind('click').click(function(event) {
        // check/uncheck checkbox if li clicked
        var checkbox_field = $(this).children('input');
        if(event.target.nodeName.toLowerCase() == "li") {
          if(checkbox_field.is(':checked')) {
            checkbox_field.attr('checked', false);
          } else {
            checkbox_field.attr('checked', true);
          }
        }

        // highlight field
        self.hightlightOption(this);

        // de/select parent checkboxes
        if(parent_options.length > 0) {
          var p_ids = checkbox_field.attr('data-parent-ids').split(',');
          $.each(p_ids, function(index, p_id) {
            var s = '.fancyDropdownOptions input[data-parent-ids*='+p_id+']';
            var a = self.elm.find(s).length;
            var c = self.elm.find(s + ':checked').length;
            var p = self.elm.find('.fancyDropdownOptions input[data-type=parent][value='+p_id.replace('~', '')+']');
            p.attr('checked', (a == c));
          });
        }
        self.storeSelectedFields();
      });

      // dropdown close button
      this.elm.find('.closeDropdown').click(function() {
        self.elm.find('.fancyDropdownMultiplePane').hide();
        return false;
      });

      var select_checkboxes = function(state) {
        self.elm.find('.fancyDropdownOptions input[type=checkbox]').each(function() {
          $(this).attr('checked', state);
          self.hightlightOption($(this).parent());
        });
        self.selectOption('', self.selectionTitle());
      };

      // select/unselect buttons
      this.elm.find('.selectAll').click(function() {
        select_checkboxes(true);
        return false;
      });

      this.elm.find('.unselectAll').click(function() {
        select_checkboxes(false);
        return false;
      });
    },

    selectOption: function(value, name) {
      $(this.elm.attr("rel")).val(value);

      if(this.opts.multiple) {
        name = $.trim(name.replace(/(<([^>]+)>)/ig,''));
      }
      if(name.length == 0) name = '&nbsp;';
      //alert(name)
      this.setSelectionTitle(name);
    },

    setSelectionTitle: function(title) {
      this.elm.find('.selected').html(title);
    },

    single: function() {
      var self = this;
      var options = this.elm.find('.fancyDropdownOptions li');

      this.load = function() {
        var selected = $(this.elm.attr("rel")).val();
        options.each(function(i) {
          if($(this).attr("data-id") == selected) {
            self.selectOption($(this).attr('data-id'), $(this).html());
          }
        });
      };

      // options click event
      options.click(function() {
          var id = $(this).attr('data-id');
          self.selectOption(id, $(this).html());

          // unhighlight all fields
          options.each(function(i) {
            $(this).css('background-color', '');
          });

          // highlight field
          self.hightlightOption(this);

          if(typeof self.opts.afterSelect == "function") {
            self.opts.afterSelect(id, self);
          }
       });
    },

    toggleEvent: function() {
      var self = this;
      this.elm.unbind('click').click(function(event) {
        var e = self.opts.multiple ? self.elm.find('.fancyDropdownMultiplePane') : self.elm.find('.fancyDropdownOptions');

        // ie8 doesn't like use of jquery :hidden selector
        if(e.css("display") == "none") {
          self.hideOpenDropdowns();
          e.show();
          self.togglePageElements();
        } else {
          var clicked_elm = $(event.target);
          if(!self.opts.multiple || clicked_elm.parents('.fancyDropdownMultiplePane').length != 1) {
            e.hide();
          }
          self.togglePageElements();
        }
        return true;
      });
    },

    togglePageElements: function(show) {
      if($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
        var map = $('#listingsMap');
        if($('.fancyDropdownMultiplePane:visible').length == 0) {
          map.show();
        } else {
          map.hide();
        }
      }
    }

  };


})(jQuery);

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

// ColorBox v1.3.9 - a full featured, light-weight, customizable lightbox based on jQuery 1.3
// c) 2009 Jack Moore - www.colorpowered.com - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//(function(b,gb){var v="none",t="click",N="LoadedContent",d=false,x="resize.",o="y",u="auto",f=true,M="nofollow",q="on",n="x";function e(a,c){a=a?' id="'+k+a+'"':"";c=c?' style="'+c+'"':"";return b("<div"+a+c+"/>")}function p(a,b){b=b===n?m.width():m.height();return typeof a==="string"?Math.round(a.match(/%/)?b/100*parseInt(a,10):parseInt(a,10)):a}function Q(c){c=b.isFunction(c)?c.call(h):c;return a.photo||c.match(/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i)}function cb(){for(var c in a)if(b.isFunction(a[c])&&c.substring(0,2)!==q)a[c]=a[c].call(h);a.rel=a.rel||h.rel||M;a.href=a.href||b(h).attr("href");a.title=a.title||h.title}function db(d){h=d;a=b.extend({},b(h).data(r));cb();if(a.rel!==M){i=b("."+H).filter(function(){return (b(this).data(r).rel||this.rel)===a.rel});g=i.index(h);if(g===-1){i=i.add(h);g=i.length-1}}else{i=b(h);g=0}if(!w){w=F=f;R=h;try{R.blur()}catch(e){}b.event.trigger(hb);a.onOpen&&a.onOpen.call(h);y.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":u}).show();a.w=p(a.initialWidth,n);a.h=p(a.initialHeight,o);c.position(0);S&&m.bind(x+O+" scroll."+O,function(){y.css({width:m.width(),height:m.height(),top:m.scrollTop(),left:m.scrollLeft()})}).trigger("scroll."+O)}T.add(I).add(J).add(z).add(U).hide();V.html(a.close).show();c.slideshow();c.load()}var eb={transition:"elastic",speed:300,width:d,initialWidth:"600",innerWidth:d,maxWidth:d,height:d,initialHeight:"450",innerHeight:d,maxHeight:d,scalePhotos:f,scrolling:f,inline:d,html:d,iframe:d,photo:d,href:d,title:d,rel:d,opacity:.8,preloading:f,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:d,loop:f,slideshow:d,slideshowAuto:f,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:d,onLoad:d,onComplete:d,onCleanup:d,onClosed:d,overlayClose:f,escKey:f,arrowKey:f},r="colorbox",k="cbox",hb=k+"_open",P=k+"_load",W=k+"_complete",X=k+"_cleanup",fb=k+"_closed",G=b.browser.msie&&!b.support.opacity,S=G&&b.browser.version<7,O=k+"_IE6",y,j,E,s,Y,Z,ab,bb,i,m,l,K,L,U,T,z,J,I,V,C,D,A,B,h,R,g,a,w,F,c,H=k+"Element";c=b.fn[r]=b[r]=function(c,d){var a=this;if(!a[0]&&a.selector)return a;c=c||{};if(d)c.onComplete=d;if(!a[0]||a.selector===undefined){a=b("<a/>");c.open=f}a.each(function(){b(this).data(r,b.extend({},b(this).data(r)||eb,c)).addClass(H)});c.open&&db(a[0]);return a};c.init=function(){var h="hover";m=b(gb);j=e().attr({id:r,"class":G?k+"IE":""});y=e("Overlay",S?"position:absolute":"").hide();E=e("Wrapper");s=e("Content").append(l=e(N,"width:0; height:0"),L=e("LoadingOverlay").add(e("LoadingGraphic")),U=e("Title"),T=e("Current"),J=e("Next"),I=e("Previous"),z=e("Slideshow"),V=e("Close"));E.append(e().append(e("TopLeft"),Y=e("TopCenter"),e("TopRight")),e().append(Z=e("MiddleLeft"),s,ab=e("MiddleRight")),e().append(e("BottomLeft"),bb=e("BottomCenter"),e("BottomRight"))).children().children().css({"float":"left"});K=e(d,"position:absolute; width:9999px; visibility:hidden; display:none");b("body").prepend(y,j.append(E,K));s.children().hover(function(){b(this).addClass(h)},function(){b(this).removeClass(h)}).addClass(h);C=Y.height()+bb.height()+s.outerHeight(f)-s.height();D=Z.width()+ab.width()+s.outerWidth(f)-s.width();A=l.outerHeight(f);B=l.outerWidth(f);j.css({"padding-bottom":C,"padding-right":D}).hide();J.click(c.next);I.click(c.prev);V.click(c.close);s.children().removeClass(h);b("."+H).live(t,function(a){if(a.button!==0&&typeof a.button!=="undefined"||a.ctrlKey||a.shiftKey||a.altKey)return f;else{db(this);return d}});y.click(function(){a.overlayClose&&c.close()});b(document).bind("keydown",function(b){if(w&&a.escKey&&b.keyCode===27){b.preventDefault();c.close()}if(w&&a.arrowKey&&!F&&i[1])if(b.keyCode===37&&(g||a.loop)){b.preventDefault();I.click()}else if(b.keyCode===39&&(g<i.length-1||a.loop)){b.preventDefault();J.click()}})};c.remove=function(){j.add(y).remove();b("."+H).die(t).removeData(r).removeClass(H)};c.position=function(f,b){function c(a){Y[0].style.width=bb[0].style.width=s[0].style.width=a.style.width;L[0].style.height=L[1].style.height=s[0].style.height=Z[0].style.height=ab[0].style.height=a.style.height}var e,h=Math.max(m.height()-a.h-A-C,0)/2+m.scrollTop(),g=Math.max(m.width()-a.w-B-D,0)/2+m.scrollLeft();e=j.width()===a.w+B&&j.height()===a.h+A?0:f;E[0].style.width=E[0].style.height="9999px";j.dequeue().animate({width:a.w+B,height:a.h+A,top:h,left:g},{duration:e,complete:function(){c(this);F=d;E[0].style.width=a.w+B+D+"px";E[0].style.height=a.h+A+C+"px";b&&b()},step:function(){c(this)}})};c.resize=function(b){if(w){b=b||{};if(b.width)a.w=p(b.width,n)-B-D;if(b.innerWidth)a.w=p(b.innerWidth,n);l.css({width:a.w});if(b.height)a.h=p(b.height,o)-A-C;if(b.innerHeight)a.h=p(b.innerHeight,o);if(!b.innerHeight&&!b.height){b=l.wrapInner("<div style='overflow:auto'></div>").children();a.h=b.height();b.replaceWith(b.children())}l.css({height:a.h});c.position(a.transition===v?0:a.speed)}};c.prep=function(o){var d="hidden";function n(t){var o,q,s,n,d=i.length,e=a.loop;c.position(t,function(){function t(){G&&j[0].style.removeAttribute("filter")}if(w){G&&p&&l.fadeIn(100);a.iframe&&b("<iframe frameborder=0"+(a.scrolling?"":" scrolling='no'")+(G?" allowtransparency='true'":"")+"/>").attr({src:a.href,name:(new Date).getTime()}).appendTo(l);l.show();U.show().html(a.title);if(d>1){T.html(a.current.replace(/\{current\}/,g+1).replace(/\{total\}/,d)).show();J[e||g<d-1?"show":"hide"]().html(a.next);I[e||g?"show":"hide"]().html(a.previous);o=g?i[g-1]:i[d-1];s=g<d-1?i[g+1]:i[0];if(a.slideshow){z.show();g===d-1&&!e&&j.is("."+k+"Slideshow_on")&&z.click()}if(a.preloading){n=b(s).data(r).href||s.href;q=b(o).data(r).href||o.href;if(Q(n))b("<img/>")[0].src=n;if(Q(q))b("<img/>")[0].src=q}}L.hide();a.transition==="fade"?j.fadeTo(f,1,function(){t()}):t();m.bind(x+k,function(){c.position(0)});b.event.trigger(W);a.onComplete&&a.onComplete.call(h)}})}if(w){var p,f=a.transition===v?0:a.speed;m.unbind(x+k);l.remove();l=e(N).html(o);l.hide().appendTo(K.show()).css({width:function(){a.w=a.w||l.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}(),overflow:a.scrolling?u:d}).css({height:function(){a.h=a.h||l.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}()}).prependTo(s);K.hide();b("#"+k+"Photo").css({cssFloat:v});S&&b("select").not(j.find("select")).filter(function(){return this.style.visibility!==d}).css({visibility:d}).one(X,function(){this.style.visibility="inherit"});a.transition==="fade"?j.fadeTo(f,0,function(){n(0)}):n(f)}};c.load=function(){var j,d,q,m=c.prep;F=f;h=i[g];a=b.extend({},b(h).data(r));cb();b.event.trigger(P);a.onLoad&&a.onLoad.call(h);a.h=a.height?p(a.height,o)-A-C:a.innerHeight&&p(a.innerHeight,o);a.w=a.width?p(a.width,n)-B-D:a.innerWidth&&p(a.innerWidth,n);a.mw=a.w;a.mh=a.h;if(a.maxWidth){a.mw=p(a.maxWidth,n)-B-D;a.mw=a.w&&a.w<a.mw?a.w:a.mw}if(a.maxHeight){a.mh=p(a.maxHeight,o)-A-C;a.mh=a.h&&a.h<a.mh?a.h:a.mh}j=a.href;L.show();if(a.inline){e("InlineTemp").hide().insertBefore(b(j)[0]).bind(P+" "+X,function(){b(this).replaceWith(l.children())});m(b(j))}else if(a.iframe)m(" ");else if(a.html)m(a.html);else if(Q(j)){d=new Image;d.onload=function(){var e;d.onload=null;d.id=k+"Photo";b(d).css({margin:u,border:v,display:"block",cssFloat:"left"});if(a.scalePhotos){q=function(){d.height-=d.height*e;d.width-=d.width*e};if(a.mw&&d.width>a.mw){e=(d.width-a.mw)/d.width;q()}if(a.mh&&d.height>a.mh){e=(d.height-a.mh)/d.height;q()}}if(a.h)d.style.marginTop=Math.max(a.h-d.height,0)/2+"px";setTimeout(function(){m(d)},1);i[1]&&(g<i.length-1||a.loop)&&b(d).css({cursor:"pointer"}).click(c.next);if(G)d.style.msInterpolationMode="bicubic"};d.src=j}else e().appendTo(K).load(j,function(c,a,b){m(a==="error"?"Request unsuccessful: "+b.statusText:this)})};c.next=function(){if(!F){g=g<i.length-1?g+1:0;c.load()}};c.prev=function(){if(!F){g=g?g-1:i.length-1;c.load()}};c.slideshow=function(){function f(){z.text(a.slideshowStop).bind(W,function(){d=setTimeout(c.next,a.slideshowSpeed)}).bind(P,function(){clearTimeout(d)}).one(t,function(){e()});j.removeClass(b+"off").addClass(b+q)}var e,d,b=k+"Slideshow_";z.bind(fb,function(){z.unbind();clearTimeout(d);j.removeClass(b+"off "+b+q)});e=function(){clearTimeout(d);z.text(a.slideshowStart).unbind(W+" "+P).one(t,function(){f();d=setTimeout(c.next,a.slideshowSpeed)});j.removeClass(b+q).addClass(b+"off")};if(a.slideshow&&i[1])a.slideshowAuto?f():e()};c.close=function(){if(w){w=d;b.event.trigger(X);a.onCleanup&&a.onCleanup.call(h);m.unbind("."+k+" ."+O);y.fadeTo("fast",0);j.stop().fadeTo("fast",0,function(){j.find("iframe").attr("src","about:blank");l.remove();j.add(y).css({opacity:1,cursor:u}).hide();try{R.focus()}catch(c){}setTimeout(function(){b.event.trigger(fb);a.onClosed&&a.onClosed.call(h)},1)})}};c.element=function(){return b(h)};c.settings=eb;b(c.init)})(jQuery,this);

(function ($) {
	//checks if browser object exists
	if (typeof $.browser === "undefined" || !$.browser) {
		var browser = {};
		$.extend(browser);
	}
	var pluginList = {
		flash: {
			activex: ["ShockwaveFlash.ShockwaveFlash", "ShockwaveFlash.ShockwaveFlash.3", "ShockwaveFlash.ShockwaveFlash.4", "ShockwaveFlash.ShockwaveFlash.5", "ShockwaveFlash.ShockwaveFlash.6", "ShockwaveFlash.ShockwaveFlash.7"],
			plugin: /flash/gim
		}
	};
	var isSupported = function (p) {
		if (window.ActiveXObject) {
			$.browser[p] = false;

			for (i = 0; i < pluginList[p].activex.length; i++) {
				try {
					new ActiveXObject(pluginList[p].activex[i]);
					$.browser[p] = true;
				} catch (e) {}
			}
		} else {
			$.each(navigator.plugins, function () {
				if (this.name.match(pluginList[p].plugin)) {
					$.browser[p] = true;
					return false;
				} else {
					$.browser[p] = false;
				}
			});
		}
	};
	$.each(pluginList, function (i, n) {
		isSupported(i);
	});
})(jQuery);

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('o.5=B(9,b,2){6(h b!=\'E\'){2=2||{};6(b===n){b=\'\';2.3=-1}4 3=\'\';6(2.3&&(h 2.3==\'j\'||2.3.k)){4 7;6(h 2.3==\'j\'){7=w u();7.t(7.q()+(2.3*r*l*l*x))}m{7=2.3}3=\'; 3=\'+7.k()}4 8=2.8?\'; 8=\'+(2.8):\'\';4 a=2.a?\'; a=\'+(2.a):\'\';4 c=2.c?\'; c\':\'\';d.5=[9,\'=\',C(b),3,8,a,c].y(\'\')}m{4 e=n;6(d.5&&d.5!=\'\'){4 g=d.5.A(\';\');s(4 i=0;i<g.f;i++){4 5=o.z(g[i]);6(5.p(0,9.f+1)==(9+\'=\')){e=D(5.p(9.f+1));v}}}F e}};',42,42,'||options|expires|var|cookie|if|date|path|name|domain|value|secure|document|cookieValue|length|cookies|typeof||number|toUTCString|60|else|null|jQuery|substring|getTime|24|for|setTime|Date|break|new|1000|join|trim|split|function|encodeURIComponent|decodeURIComponent|undefined|return'.split('|'),0,{}));

/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 *
 * Version: 1.1.1
 * Requires jQuery 1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */
(function(a){a.extend(a.fn,{livequery:function(e,d,c){var b=this,f;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequery.queries,function(g,h){if(b.selector==h.selector&&b.context==h.context&&e==h.type&&(!d||d.$lqguid==h.fn.$lqguid)&&(!c||c.$lqguid==h.fn2.$lqguid)){return(f=h)&&false}});f=f||new a.livequery(this.selector,this.context,e,d,c);f.stopped=false;f.run();return this},expire:function(e,d,c){var b=this;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequery.queries,function(f,g){if(b.selector==g.selector&&b.context==g.context&&(!e||e==g.type)&&(!d||d.$lqguid==g.fn.$lqguid)&&(!c||c.$lqguid==g.fn2.$lqguid)&&!this.stopped){a.livequery.stop(g.id)}});return this}});a.livequery=function(b,d,f,e,c){this.selector=b;this.context=d;this.type=f;this.fn=e;this.fn2=c;this.elements=[];this.stopped=false;this.id=a.livequery.queries.push(this)-1;e.$lqguid=e.$lqguid||a.livequery.guid++;if(c){c.$lqguid=c.$lqguid||a.livequery.guid++}return this};a.livequery.prototype={stop:function(){var b=this;if(this.type){this.elements.unbind(this.type,this.fn)}else{if(this.fn2){this.elements.each(function(c,d){b.fn2.apply(d)})}}this.elements=[];this.stopped=true},run:function(){if(this.stopped){return}var d=this;var e=this.elements,c=a(this.selector,this.context),b=c.not(e);this.elements=c;if(this.type){b.bind(this.type,this.fn);if(e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){a.event.remove(g,d.type,d.fn)}})}}else{b.each(function(){d.fn.apply(this)});if(this.fn2&&e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){d.fn2.apply(g)}})}}}};a.extend(a.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if(a.livequery.running&&a.livequery.queue.length){var b=a.livequery.queue.length;while(b--){a.livequery.queries[a.livequery.queue.shift()].run()}}},pause:function(){a.livequery.running=false},play:function(){a.livequery.running=true;a.livequery.run()},registerPlugin:function(){a.each(arguments,function(c,d){if(!a.fn[d]){return}var b=a.fn[d];a.fn[d]=function(){var e=b.apply(this,arguments);a.livequery.run();return e}})},run:function(b){if(b!=undefined){if(a.inArray(b,a.livequery.queue)<0){a.livequery.queue.push(b)}}else{a.each(a.livequery.queries,function(c){if(a.inArray(c,a.livequery.queue)<0){a.livequery.queue.push(c)}})}if(a.livequery.timeout){clearTimeout(a.livequery.timeout)}a.livequery.timeout=setTimeout(a.livequery.checkQueue,20)},stop:function(b){if(b!=undefined){a.livequery.queries[b].stop()}else{a.each(a.livequery.queries,function(c){a.livequery.queries[c].stop()})}}});a.livequery.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");a(function(){a.livequery.play()})})(jQuery);

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('a k={1C:"1.0.4",19:{},U:\'/22/k.2o\',1y:1,$:6(l){5(Y(l)==\'1V\')l=H.1O(l);5(!l.Q){l.T=6(){3.c.1m=\'2a\'};l.1U=6(){3.c.1m=\'\'};l.Q=6(8){3.N(8);3.Z+=\' \'+8};l.N=6(8){3.Z=3.Z.I(1e 1q("\\\\s*"+8+"\\\\s*")," ").I(/^\\s+/,\'\').I(/\\s+$/,\'\')};l.1N=6(8){C!!3.Z.O(1e 1q("\\\\s*"+8+"\\\\s*"))}}C l},2n:6(1E){3.U=1E},2f:6(j,b,z){a L=3.19[j];5(L){L.V(b,z)}},1x:6(j,L){3.19[j]=L},12:6(h){a 11={v:0,A:0,d:h.d?h.d:h.2e,g:h.g?h.g:h.2d};2b(h){11.v+=h.2c;11.A+=h.2h;h=h.2m}C 11},1t:6(t){3.r={};3.j=k.1y++;3.F=\'2k\'+3.j;k.1x(3.j,3);5(t)3.1s(t)}};k.1t.1Y={j:0,D:p,u:y,1c:\'\',18:P,E:P,r:y,1s:6(t){3.7=k.$(t);a n=k.12(3.7);3.f=H.1X(\'f\');a c=3.f.c;c.1W=\'20\';c.v=\'\'+n.v+\'B\';c.A=\'\'+n.A+\'B\';c.d=\'\'+n.d+\'B\';c.g=\'\'+n.g+\'B\';c.29=21;a w=H.1I(\'w\')[0];w.28(3.f);3.f.1J=3.1g(n.d,n.g)},1g:6(d,g){a S=\'\';a M=\'j=\'+3.j+\'&d=\'+d+\'&g=\'+g;5(14.16.O(/25/)){a 1D=23.24.O(/^1n/i)?\'1n://\':\'1l://\';S+=\'<15 2M="2N:2p-2L-2K-2H-2P" 2I="\'+1D+\'2O.1B.1M/2Q/1p/2U/1k/2R.2S#1C=9,0,0,0" d="\'+d+\'" g="\'+g+\'" j="\'+3.F+\'" 1h="1f"><o 8="1i" q="1j" /><o 8="1o" q="p" /><o 8="u" q="\'+k.U+\'" /><o 8="1u" q="p" /><o 8="1A" q="p" /><o 8="1w" q="1v" /><o 8="1z" q="#1r" /><o 8="M" q="\'+M+\'"/><o 8="1F" q="1T"/></15>\'}17{S+=\'<2v j="\'+3.F+\'" 2w="\'+k.U+\'" 1u="p" 1A="p" 1w="1v" 1z="#1r" d="\'+d+\'" g="\'+g+\'" 8="\'+3.F+\'" 1h="1f" 1i="1j" 1o="p" 2D="2E/x-1p-1k" 2B="1l://2A.1B.1M/2z/2C" M="\'+M+\'" 1F="1T" />\'}C S},T:6(){5(3.f){3.f.c.v=\'-2y\'}},1U:6(){3.1H()},2x:6(){5(3.7&&3.f){3.T();3.f.1J=\'\';a w=H.1I(\'w\')[0];2s{w.2r(3.f)}2q(e){}3.7=y;3.f=y}},1H:6(t){5(t){3.7=k.$(t);5(!3.7)3.T()}5(3.7&&3.f){a n=k.12(3.7);a c=3.f.c;c.v=\'\'+n.v+\'B\';c.A=\'\'+n.A+\'B\'}},1d:6(13){3.1c=13;5(3.D)3.u.1d(13)},2t:6(b,m){b=b.1R().1K().I(/^1L/,\'\');5(!3.r[b])3.r[b]=[];3.r[b].2u(m)},1b:6(G){3.18=G;5(3.D)3.u.1b(G)},2G:6(G){3.E=!!G},V:6(b,z){b=b.1R().1K().I(/^1L/,\'\');2F(b){R\'1a\':3.u=H.1O(3.F);5(!3.u){a 10=3;1G(6(){10.V(\'1a\',y)},1);C}5(!3.D&&14.16.O(/2T/)&&14.16.O(/2J/)){a 10=3;1G(6(){10.V(\'1a\',y)},26);3.D=P;C}3.D=P;3.u.1d(3.1c);3.u.1b(3.18);K;R\'1Z\':5(3.7&&3.E){3.7.Q(\'1P\');5(3.W)3.7.Q(\'J\')}K;R\'27\':5(3.7&&3.E){3.W=p;5(3.7.1N(\'J\')){3.7.N(\'J\');3.W=P}3.7.N(\'1P\')}K;R\'2l\':5(3.7&&3.E){3.7.Q(\'J\')}K;R\'2i\':5(3.7&&3.E){3.7.N(\'J\');3.W=p}K}5(3.r[b]){2g(a X=0,1Q=3.r[b].1S;X<1Q;X++){a m=3.r[b][X];5(Y(m)==\'6\'){m(3,z)}17 5((Y(m)==\'15\')&&(m.1S==2)){m[0][m[1]](3,z)}17 5(Y(m)==\'1V\'){2j[m](3,z)}}}}};',62,181,'|||this||if|function|domElement|name||var|eventName|style|width||div|height|obj||id|ZeroClipboard|thingy|func|box|param|false|value|handlers||elem|movie|left|body||null|args|top|px|return|ready|cssEffects|movieId|enabled|document|replace|active|break|client|flashvars|removeClass|match|true|addClass|case|html|hide|moviePath|receiveEvent|recoverActive|idx|typeof|className|self|info|getDOMObjectPosition|newText|navigator|object|userAgent|else|handCursorEnabled|clients|load|setHandCursor|clipText|setText|new|middle|getHTML|align|allowScriptAccess|always|flash|http|display|https|allowFullScreen|shockwave|RegExp|ffffff|glue|Client|loop|best|quality|register|nextId|bgcolor|menu|macromedia|version|protocol|path|wmode|setTimeout|reposition|getElementsByTagName|innerHTML|toLowerCase|on|com|hasClass|getElementById|hover|len|toString|length|transparent|show|string|position|createElement|prototype|mouseover|absolute|10000|javascripts|location|href|MSIE|100|mouseout|appendChild|zIndex|none|while|offsetLeft|offsetHeight|offsetWidth|dispatch|for|offsetTop|mouseup|window|ZeroClipboardMovie_|mousedown|offsetParent|setMoviePath|swf|d27cdb6e|catch|removeChild|try|addEventListener|push|embed|src|destroy|2000px|go|www|pluginspage|getflashplayer|type|application|switch|setCSSEffects|96b8|codebase|Windows|11cf|ae6d|classid|clsid|download|444553540000|pub|swflash|cab|Firefox|cabs'.split('|'),0,{}))

// na namespace
var na = {};

function ajax_loader() {
  return '<img src="/images/ajax_loader.gif" height="32" width="32" />';
}

function ajax_loader_centered() {
  return '<div class="ajaxLoader center">' + ajax_loader() + '</div>';
}

// emulate some of rails3 remote form functionality
function remote_forms(selector_prefix) {
	$(selector_prefix + 'form[data-remote=true]').livequery(function(){
		var elm = $(this);

		// ajax event
		var options = {
			success: function(response) {
				$.globalEval(response);
				$.colorbox.resize();
			}
    };
    elm.ajaxForm(options);

		// loader
		elm.bind('ajaxSend', function(e, request, options) {
			elm.hide();
			$('#cboxLoadedContent .ajaxLoader').remove();
			elm.after(ajax_loader_centered());
		});

		// submit button
		submit_button('#cboxLoadedContent .submitButton');
		rollover_buttons();
	});
}

// tracking
na.Tracking = {};
na.Tracking.firePixel = function(url) {
	var img = new Image(1,1);
	img.onLoad = function() { };
	img.src = url;
};


$(document).ready(function() {
	remote_forms();

	$('#cboxLoadedContent #closeModal').live('click', function() {
    $.colorbox.close();
    return false;
  });

}).bind('cbox_complete', function(){
	remote_forms('#cboxLoadedContent ');
});



var BoroughsSelection = {
  setup: function() {
    var self = this;
    // Renter & Broker - Signup / Profile
    $('#boroughNav li').click(function() {
      $('#boroughNav li').each(function() {
        $(this).removeClass('active');
      });
      $(this).addClass('active');
      $('.boroughs').each(function() {
        $(this).hide();
      });
      var id = '#borough_' + $(this).attr('data-id');
      $(id).show();
      return false;
    });
    // select / deselect
    // this is quick and dirty, needs to be cleaned up
    $('.boroughs .selectAll').click(function() {
      var id = '#borough_' + $(this).attr('data-id');
      self.changeSelect(id, true);
      return false;
    });
    $('.boroughs .unselectAll').click(function() {
      var id = '#borough_' + $(this).attr('data-id');
      self.changeSelect(id, false);
      return false;
    });
  },
  changeSelect: function(bid, state) {
    $(bid + ' span input[type="checkbox"]').each(function() {
      $(this).attr('checked', state);
    });
  }

};

/*
-------------------------------------------------------------------
Listing Funtions **************************************************
-------------------------------------------------------------------
*/
var ListingImages = function() {
  var li_elm = '#listingImages';
  if($(li_elm).length == 0 || $('#uploadImage').length > 0)
    return false;
  // just in case this is missed in style sheet.
  $(li_elm + ' img').css('cursor', 'pointer');
  // setup event
  $(li_elm + ' img').click(function() {
    var normal_img = $(this).parent('div').parent('li').attr('data-image-normal');
    $('#primaryListingImage img').attr('src', normal_img);
  });
};

var ViewListing = function() {
  ListingImages();

  if($('#listingContent').length > 0){
    // Initialize Galleria
    $('#galleria').galleria({
        data_selector: "img",
        data_config: function(img) {
          i = $(img);
          return {
            image: i.attr('src'), // tell Galleria that the href is the main image,
            title: null,
            thumb: i.attr('data-thumb')
          };
        },
        clicknext: true,
        preload: 0,
        showCounter: false,
        imageCrop: false,
        transitionSpeed: 200
    });
  }

  // tabs
  $('#listingDetailWidget').tabs({
    select: function(event, ui) {
      var p = $(ui.panel);
      var p_id = p.attr('id');

      var tab = (p_id == 'listingMapWrapper') ? 'map' : p_id;
      ga_track_event('Listing Details', 'Click Tab', tab);

      if(p_id == 'listingMapWrapper') {
        p.children('div').html('loading...');
        window.setTimeout(function() {
					na.maps.listing.init();
        }, 100);
      } else if(p_id == 'nabewise') {
        var nabewise_widget = $('#nabewidget');
        if(nabewise_widget.find('iframe').length == 0) {
          window.setTimeout(function() {
            NabewiseWidget("6d2474a1d769", "nabewidget", "small", nabewise_widget.attr('data-name'), "New York City",
              {"fair_housing_compliant":true, "nabe_lookup":{"New York City":
                {
                  "Ditmas Park":"Ditmas Park West",
                  "East Williamsburg":"South Williamsburg",
                  "Park Slope South":"South Slope",
                  "Midtown West":"Midtown",
                  "Midtown East":"Midtown",
                  "Financial District":"Wall Street/Financial District"
                }
            }});
          }, 100);
        }

      }
    }
  });
  $('#listingContent #info').tabs();
};

/*
-------------------------------------------------------------------
Listing Funtions - END ********************************************
-------------------------------------------------------------------
*/


var SearchNav = {
  dropdown: {
    toggleEvent: function(elm, multiple) {
      var self = this;
      multiple = multiple || false
      $(elm).click(function(event) {
        var e = $(elm).find('.dropdown');
        // ie8 doesn't like use of jquery :hidden selector
        if(e.css("display") == "none") {
          self.hideOtherDropdowns();
          e.show();
        } else {
          var clicked_elm = event.target.nodeName.toLowerCase();
          if(!multiple || clicked_elm != "li" && clicked_elm != "input") {
            e.hide();
          }
        }
      });
    },
    hideOtherDropdowns: function() {
      $('#searchWrapper .dropdown').each(function(i) {
          $(this).hide();
      });
    },
    // single option selected
    single: {
      events: function(parent, after) {
        var self = this;
        var elm = parent.id + ' .dropdown li'
         // toggle menu
        SearchNav.dropdown.toggleEvent(parent.id);

        $(elm).click(function() {
            var id = $(this).attr('data-id');
            var val = $(this).html();
            self.selectItem(id, val, parent);
            // highlight field
            self.highlightSelected(elm, this);

            if(typeof(after) == "function") {
              after(id);
            }
         });
      },
      highlightSelected: function(fields, field) {
        $(fields).each(function(i) {
          $(this).css('background-color', '');
        });
        $(field).css('background-color', '#EAEAEA');
      },
      previousState: function(parent) {
        var self = this;
        var f_id = parent.form_id
        var fields = parent.id + ' .dropdown li';
        var id = $(f_id).val();
        $(fields).each(function(i) {
          if($(this).attr('data-id') == id) {
            self.selectItem(id, $(this).html(), parent);
            self.highlightSelected(fields, this);
            return false;
          }
        });
      },
      selectItem: function(id, val, parent) {
        $(parent.form_id).val(id);
        $(parent.id + ' li span').html(val);
      }
    },
    // multiple options selected
    multiple: {
      events: function(parent) {
        var self = this;
        var elm = parent.id

        // toggle menu
        SearchNav.dropdown.toggleEvent(elm, true);

        // dropdown options
        $(elm + ' .dropdown li').click(function(event) {
          // check/uncheck checkbox if li clicked
          if(event.target.nodeName.toLowerCase() == "li") {
            var checkbox_field = $(this).children('input');
            if(checkbox_field.is(':checked')) {
              checkbox_field.attr('checked', false);
            } else {
              checkbox_field.attr('checked', true);
            }
          }

          // would be more efficent to do this on click of "Search"
          var ids = new Array;

          var checked_options = $(elm + ' input[type=checkbox]:checked');
          var title = (checked_options.length == 1) ? checked_options.eq(0).parent().html() : 'Various';
          if(checked_options.length == 0) title = '';

          checked_options.each(function() {
            ids.push($(this).val());
          });
          self.selectItem(ids.join(','), title, parent);

          // highlight fields
          self.highlight.one(this);
        });

        // dropdown close button
        $(elm + ' .closeDropdown').click(function() {
          $(elm + ' .dropdown').hide();
          return false;
        });

        // select/unselect buttons
        $(elm + ' .selectAll').click(function() {
          self.changeOptionsState(elm, true, parent);
          return false;
        });

        $(elm + ' .unselectAll').click(function() {
          self.changeOptionsState(elm, false, parent);
          return false;
        });
      },
      changeOptionsState: function(elm, state, parent) {
        var self = this;
        $(elm + ' input[type=checkbox]').each(function() {
          $(this).attr('checked', state);
        });
        var title = state ? 'All' : '';
        self.selectItem('', title, parent);
        self.highlight.all(elm + ' .dropdown li');
      },
      highlight: {
        all: function(options) {
          var self = this;
          $(options).each(function(i) {
            self.one(this);
          });
        },
        one: function(option) {
          var color = $(option).children('input').is(':checked') ? '#EAEAEA' : '';
          $(option).css('background-color', color);
        }
      },
      previousState: function(parent) {
        var self = this;
        var f_id = parent.form_id
        var elm = parent.id
        var ids = $(f_id).val();

        if(ids == "") {
          self.changeOptionsState(elm, true, parent);
          self.selectItem(ids, 'All', parent);
          return;
        } else if(ids == "0") {
          self.selectItem(ids, '', parent);
          return;
        }

        ids = ids.split(',');
        var options = elm + ' .dropdown li';
        var checked_options = $(options + ' input[type=checkbox]');
        var title = null;
        checked_options.each(function(i) {
          var checkbox = $(this);
          var is_checked = $.inArray(checkbox.val(), ids) != -1;
          checkbox.attr('checked', is_checked);
          if(is_checked && title == null)
            title = checkbox.parent().html()
        });
        SearchNav.dropdown.multiple.highlight.all(options);
        // if multiple options selected, use default title
        if(ids.length > 1) title = 'Various';
        self.selectItem(ids.join(','), title, parent);
      },
      selectItem: function(ids, val, parent) {
        $(parent.form_id).val(ids);
        val = $.trim(val.replace(/(<([^>]+)>)/ig,''))
        if(val == '') val = '&nbsp;';
        $(parent.id + ' span.selected').html(val);
      }
    } // end multiple
  }, // end dropdown
  boroughDropDown: {
    id: '#boroughDropdown',
    form_id: '#bid',
    setup: function() {
      var self = this;
      // Events
      SearchNav.dropdown.single.events(self, function(id) {
        // populate neighborhood dropdown
        SearchNav.neighborhoodDropdown.populateDropdown(id);
      });
      // setup previous state
      SearchNav.dropdown.single.previousState(self);
    }
  },
  neighborhoodDropdown: {
    id: '#neighborhoodDropdown',
    form_id: '#nids',
    init_page_load: true,
    setup: function() {
      var self = this;
      // Events
      // remove any click event before readding
      $(self.id).unbind("click");

      if($(self.id + ' .dropdown li').length > 1) {
        SearchNav.dropdown.multiple.events(self);
      }

      // loading neighborhoods through AJAX if borough is selected
      // instead of doing through rails
      if(self.init_page_load) {
        var bid = $(SearchNav.boroughDropDown.form_id).val();
        self.init_page_load = false;
        if(bid != "0") {
          self.populateDropdown(bid, true);
          // populateDropdown calls setup() again, no need to go further
          return;
        }
      }

      // setup previous state
      SearchNav.dropdown.multiple.previousState(self);
    },
    populateDropdown: function(borough_id, page_load) {
      var self = this;
      page_load = page_load || false;
      if(borough_id == 0) {
        SearchNav.dropdown.multiple.selectItem("", '', self);
        $(self.id + ' .dropdown ul').html('');
        self.setup();
        return false;
      }
      // get neighborhoods from server
      Ajax.get_neighborhoods_by_borough_id(borough_id, function(json) {
        var per_col = Math.ceil(json.neighborhoods.length / 3);
        var col_start = '<div class="neighborhoodOptionColumn"><ul>';
        var html = col_start;
        var r = 0;
        $.each(json.neighborhoods, function(i, n) {
          html += '<li>';
          html += '<input type="checkbox" value="' + n.neighborhood.id + '" /> ' + n.neighborhood.name;
          html += '</li>';
          r++;
          if(r >= per_col) {
            html += '</ul></div>' + col_start;
            r = 0;
          }
        });
        html += '</ul></div>';
        $(self.id + ' .dropdown #neighborhoodOptions').html(html);
        if(!page_load)
          SearchNav.dropdown.multiple.selectItem("0", '', self);
        self.setup();
      });
    }
  },
  apartmentSizeDropdown: {
    id: '#apartmentSizeDropdown',
    form_id: '#aids',
    setup: function() {
      var self = this;
      SearchNav.dropdown.multiple.events(self);
      SearchNav.dropdown.multiple.previousState(self);
    }
  }
};

var HowItWorksTour = {
  setup: function() {
    var self = this;
    if($('#tour').length == 0) {
      return false;
    }
    // sub navigation logic
    $('#tour ul#nav li').click(function() {
      var step = $(this).attr('data-step');

      $('#tour ul#nav li').each(function() {
          $(this).removeClass('active').removeClass('current');
          $('#step' + $(this).attr('data-step')).hide();
      });
      // set selected step active
      $(this).addClass('active').addClass('current');
      $('#step' + $(this).attr('data-step')).fadeIn();

      return false;
    });
  }
};

var FeedbackForm = {
  setup: function() {
    $(".feedbackBox").fancybox({
      'onComplete': this.formEvents
    });
  },
  formEvents: function() {
    rollover_button('#cboxLoadedContent .btnGreen');
    submit_button('#cboxLoadedContent .submitButton');

    if(window.location.href.search('/rental/') > -1) {
      $('#cboxLoadedContent #apartmentNote').show();
      $.colorbox.resize();
    }

    // AJAX form
    var options = {
      'success': function(response) {
        // success message
        $("#cboxLoadedContent").html(response);
        $.colorbox.resize();
      }
    };
    $('#feedbackForm').ajaxForm(options);
    $('#feedbackForm #location').val(window.location);
  }
};

var Login = {
  setup: function() {
    if($('#login').length > 0) {
      $('#password').keypress(function(event) {
        // enter key
        if(event.keyCode == 13) {
          $(this).parents('form').submit();
        }
      });
    }
  }
};


var PersonalizedHomepage = {
  setup: function() {
    // Close Welcome Message
    $('#home #closeWelcomeMessage').click(function() {
      var self = this;
      var url = '/ajax/close_welcome_message';
      $.getJSON(url, function(json) {});
      // hide welcomeMessage
      $(self).parent('.messageMajor').fadeOut();
      return false;
    });

    // Close feature Message
    $('#home #hp_feature .helpClose').click(function() {
      var self = this;
      Ajax.update_user_preference('alert_hp_new_feature', 0);
      $(self).parent('.alertCalmLg').fadeOut();
      return false;
    });

    // Close webby
    $('#home #webby .close').click(function() {
      var self = this;
      Ajax.update_user_preference('alert_hp_new_feature', 0);
      $(self).parent('.alertCalmLg').fadeOut();
      return false;
    });
  }
};


var ContactAgent = function() {
  var self = this;
  var ajax_content = '#cboxLoadedContent';
  var form = '#new_message';
  self.refreshWindow = false;
  var setup_ajax_form = function() {
    // need to resetup buttons
    rollover_buttons();
    submit_button(form + ' .submitButton');
    default_form_message();

    var options = {
      type: 'post',

      beforeSubmit: function() {
        $(ajax_content).html(ajax_loader_centered());
      },

      success: function(response) {
        $(ajax_content).html(response);

        var timeout = window.setTimeout(function() {
          $.colorbox.resize();
        }, 100);

        if($(form).length > 0) {
          setup_ajax_form();
        } else if($('#listingDetail').length > 0) {
          $('#returnLink').html($('#filters').html());
          var id = $('#contactModal').attr('data-id');
          if(id != '') {
            $.get('/renter/listings/ajax_contact_actions/' + id, {listing_id: $('#listingDetail #content').attr('data-id')}, function(html){
              $('#actionsCol .actions').remove();
              $('#actionsCol').prepend(html);
            });
          }
        } else {
          self.refreshWindow = true;
        }
      }
    };
    $(form).ajaxForm(options);
  };

 $(".contactAgentBtn").fancybox({
          'titlePosition':   'over',
          'onComplete':  function() {
              setup_ajax_form();
              var listing_id = $(this).attr('data-listing-id');
              var url = '/tracking/contact_modal_request_open/';
              var params = '?listing_id=' + listing_id + '&location=' + $(this).attr('data-location') + '&cb=' + cache_buster();
              na.Tracking.firePixel(url + params);
          },
          'onCleanup': function() {
              if (self.refreshWindow)
                  refresh_page();
          }
      });
};


na.selectAllRowsCheckbox = function() {
	var select_all = $('#selectAllRows');

	if(select_all.length == 0) {
		return false;
	}

	var hightlighRow = function(checkboxes, checked) {
		var bg = checked ? '#FFC' : '';
		checkboxes.parents('tr').find('td').css('background-color', bg);
	};

	var checkboxes = $(select_all.attr('data-target'));

  select_all.click(function() {
    checkboxes.attr('checked', $(this).attr('checked'));
		hightlighRow(checkboxes, $(this).attr('checked'));
  });

  checkboxes.change(function() {
    var c_state = $(this).attr('checked');
		hightlighRow($(this), c_state);

    if(c_state) {
      t = 0;
      checkboxes.each(function() {
        if($(this).attr('checked') == c_state)
          t++;
      });

      if(t == checkboxes.length)
        select_all.attr('checked', c_state);
    } else {
      select_all.attr('checked', c_state);
    }
  });
};


/*
 * Track Google Analytics Goals for certain pages + actions
 */
var gaGoalTracking = function() {
  var self = this;
  self.successful = false;
  self.retry = 7

  self.track_goal = function(name) {
    try {
      ga_track_pageview('/ga-goal/' + name);
      self.successful = true;
    } catch(err) {}
  };

  self.setup = function(name) {
    $(document).ready(function() {
      // try first on ready...
      self.track_goal(name);
      // if first attempt doesn't work, lets keep trying
      var interval = window.setInterval(function() {
        if(!self.successful && self.retry != 0) {
          self.track_goal(name);
          self.retry -= 1
        } else {
          window.clearInterval(interval);
        }
      }, 3000);
    });
  };
};

function ga_track_pageview(page) {
  try {
    if(typeof(pageTracker) == "object"){
      pageTracker._trackPageview(page);
    }
  } catch(err) {}
}

function ga_track_event(category, action, label) {
  try {
    if(typeof(pageTracker) == "object"){
      pageTracker._trackEvent(category, action, label);
    }
  } catch(err) {}
}

/*
-------------------------------------------------------------------
AJAX HELPER FUNCTIONS *********************************************
-------------------------------------------------------------------
*/
var Ajax = {
  get_neighborhoods_by_borough_id: function(borough_id, callback) {
    if(typeof borough_id == "undefined") {
      return {};
    }
    var url = '/ajax/get_neighborhood_pulldown/' + borough_id;
    $.getJSON(url, callback);
  },
  update_user_preference: function(type_id, value, callback) {
    var url = '/ajax/update_user_preference/' + type_id;
    $.getJSON(url, {value: value}, callback);
  },
  parse_url_params: function(url) {
    var split_url = url.split('?')
    return split_url[1];
  }
};


/*
-------------------------------------------------------------------
AJAX HELPER FUNCTIONS - END ***************************************
-------------------------------------------------------------------
*/


/*
-------------------------------------------------------------------
MISC HELPER FUNCTIONS *********************************************
-------------------------------------------------------------------
*/

function cache_buster() {
  return parseInt(Math.random()*99999999);
}

// change record total after manipulating rows to avoid page reload
function change_total(elm, change_by) {
  var val = parseInt( $(elm).html() );
  $(elm).html( val + parseInt(change_by) );
}

function default_form_message() {
  var input_field_types = ['input[type="text"]', 'input[type="password"]', 'textarea', 'input[type="file"]'];
  $.each(input_field_types, function(i, elm) {
    $(elm).addClass("idleField");
	  $(elm).focus(function() {
    $(this).removeClass("idleField").addClass("focusField");
      if($(this).val() == $(this).attr('default')) {
        $(this).val('')
      }
    });
    $(elm).blur(function() {
      $(this).removeClass("focusField").addClass("idleField");
      if($(this).val() == '' && $(this).attr('default') != "") {
        $(this).val($(this).attr('default'));
      }
    });

    // set defualt values on page load
    $(elm).each(function(x) {
      if($(this).val().length == 0 && $(this).attr('default') != "")
        $(this).val($(this).attr('default'));
    });

  });


  $('form').submit(function() {
    var self = this;
    $.each(input_field_types, function(i, elm) {
      $(self).find(elm).each(function(x) {
        if($(this).val() == $(this).attr('default')) {
          $(this).val('')
        }
      });
    });
  });
}


function submit_button(button_elm, callback, form_elm) {
  var callback = callback || {};
  var form_elm = form_elm || null;

  $(button_elm).unbind('click').click(function() {
    var form = (form_elm == null) ? $(this).parents('form') : $(form_elm);

    if(typeof(form) == 'object') {
      var allow_submit = true;
      // before_submit
      if(typeof(callback.before_submit) == 'function') {
        allow_submit = callback.before_submit(button_elm, this);
        if(typeof(allow_submit) != 'boolean')
          allow_submit = true;
      }
      if(allow_submit) {
        form.submit();
        // after_submit
        if(typeof(callback.after_submit) == 'function') {
          callback.after_submit(button_elm);
        }
      }
    }
    return false;
  });
  // setup
  if(typeof(callback.setup) == 'function') {
    callback.setup(button_elm);
  }
}

function rollover_button(elm) {
  // disable rollovers in IE6
  if($.browser.msie && $.browser.version == '6.0') return false;
  $(elm).mouseover(function() {
    if($(this)[0].nodeName.toLowerCase() == 'a')
      $(this).addClass('active');
    else
      $(this).addClass('active').children('a').addClass('active');
  }).mouseout(function() {
    if (!$(this).hasClass('current')) {
      if($(this)[0].nodeName.toLowerCase() == 'a')
        $(this).removeClass('active');
      else
        $(this).removeClass('active').children('a').removeClass('active');
    }
  });
}

// Buttons with Rollovers
function rollover_buttons() {
    // text links
    rollover_button('a');
    rollover_button('.tooltip.text');
    rollover_button('td.info');
    rollover_button('fieldset.main#planDetails .checkboxCont');
    rollover_button('.checkboxContSm.bg');
    rollover_button('.btnText');
    rollover_button('.btnText.dark');
    rollover_button('.deal');

    // buttons
    rollover_button('a.btnFB');
    rollover_button('a.btnFB span');
    rollover_button('.cssbutton a');
    rollover_button('.featured .cbtn a');
    rollover_button('#anonNav li a');
    rollover_button('#anonNav li.short');
    rollover_button('tr.featureTooltip');
    rollover_button('#bs-listings tr');
    rollover_button('.greenBtn');
    rollover_button('#btn_learnMore');
    rollover_button('#anonNav li.btnHtml a');
    rollover_button('#anonNav li a');
    rollover_button('#footer a.btnHtml');
    rollover_button('#cboxClose');
    rollover_button('#siteNav li a');
		rollover_button('#siteNav li a.faves');
    rollover_button(' #subnav li');
    rollover_button('#claimForm li');
    rollover_button('a.rewardFlag');
    rollover_button('.tooltip.white');
    rollover_button('fieldset.main h2');
    rollover_button('.btnGreenLg');
    rollover_button('.btnGreenLg a');
    rollover_button('.btnGreen');
    rollover_button('.btnGreenSm');
    rollover_button('.btnGreen.white');
    rollover_button('#pricingMsgSm a');
    rollover_button('.btnWhite');
    rollover_button('.btnWhite.upload');
    rollover_button('.plan1Btn');
    rollover_button('.plan2Btn');
    rollover_button('.plan3Btn');
    rollover_button('.acceptBtn');
    rollover_button('.detailBtn');
    rollover_button('.arrow_tour');
    rollover_button('.deleteBtn');
    rollover_button('.whiteBtn');
    rollover_button('.copyBtn');
    rollover_button('.attachBtn');
    rollover_button('.attachBtnSm');
    rollover_button('.removeBtn');
    rollover_button('.faveBtn');
    rollover_button('.blueBtn');
    rollover_button('.searchIconBtn');
    rollover_button('.detailFadeBtn');
    rollover_button('#tour #nav li a');
    rollover_button('#signup2');
    rollover_button('#main .button');

    rollover_button('#home #logos li');
    rollover_button('#home #social li');
    rollover_button('#home #benefits .link a');
    rollover_button('#home #benefits h2');
    rollover_button('#tour ul#nav li');
    rollover_button('.btnSearch');
    rollover_button('.hoverBG');
    rollover_button('.bgGrey');

    rollover_button('#btn_search');

    rollover_button('#relatedListings ul li');
    rollover_button('#features #localNav ul li a.active');

    // NEW buttons
    rollover_button('.button, .hoverable');
}

function refresh_page() {
  window.location.reload(true);
}

function comma(number) {
  number = '' + number;
  if (number.length > 3) {
    var mod = number.length % 3;
    var output = (mod > 0 ? (number.substring(0,mod)) : '');
    for (i=0 ; i < Math.floor(number.length / 3); i++) {
      if ((mod == 0) && (i == 0))
        output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
      else
      output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return (output);
  }
  else return number;
}

function neighborhood_options_for_fancy_select(borough_id, after_html) {
  // get neighborhoods from server
  Ajax.get_neighborhoods_by_borough_id(borough_id, function(json) {
    var per_col = Math.ceil(json.neighborhoods.length / 3);
    var col_start = '<div class="neighborhoodOptionColumn"><ul>';
    var html = col_start;
    var r = 0;
    $.each(json.neighborhoods, function(i, n) {
      html += '<li>';
      html += '<input type="checkbox" value="' + n.neighborhood.id + '" /> ' + n.neighborhood.name;
      html += '</li>';
      r++;
      if(r >= per_col) {
        html += '</ul></div>' + col_start;
        r = 0;
      }
    });
    html += '</ul></div>';
    if(typeof after_html == "function") {
      after_html(html);
    }
  });
}

function toggle_fade_helper() {
  $('.toggleFade').unbind('click').click(function() {
    var target = $(this).attr('data-target');

    if($(target).is(':hidden')) {
      $(target).fadeIn('fast');
    } else {
      $(target).fadeOut('fast');
    }
    return false;
  });
}


function get_url_param( params, name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( params );
  if( results == null )
    return "";
  else
    return results[1];
}

// extended javascript classes

/*
 * String.replace_all
 * note: can't be used like replace method exactly, first
 * param must be a string only.
 */
if(String.prototype.replace_all == null) {
  String.prototype.replace_all = function(replace_string, replacement) {
    return this.replace(new RegExp(replace_string,'g'), replacement);
  };
}

function init_clipboard_events() {
  $('.copyToClipboardBtn').each(function(){
    var c = new ZeroClipboard.Client();
    var t = $(this).attr('data-target');
    if(typeof t == 'string' && t.length > 0) {
      c.glue($(this)[0]);
      c.setText($(t).val());
    }
  });
}


/* Facebook Functions */
function fb_perms() {
  return 'email';
}

function fb_login_header(return_to) {
  ga_track_event('Site Wide', 'Click', 'Facebook top navigation login');
  fb_login(return_to);
}

function fb_login(return_to) {
  if(!return_to)
    return_to = document.location.href;

  FB.login(function(response) {
    if (response.session) {
      if (response.perms) {
        // user is logged in and granted some permissions.
        document.location.href = '/user_sessions/create?return_to=' + escape(return_to);
      } else {
        // user is logged in, but did not grant any permissions
//        alert('nope...');
        // TODO tracking...
      }
    } else {
      // user is not logged in
      // TODO tracking...
    }
  }, {perms: fb_perms()});
}

function fb_create_account() {
  FB.login(function(response) {
    if (response.session) {
      if (response.perms) {
        // user is logged in and granted some permissions.
        document.location.href = '/renter/account/create_profile_via_facebook';
      } else {
        // user is logged in, but did not grant any permissions
//        alert('nope...');
        // TODO tracking...
      }
    } else {
      // user is not logged in
      // TODO tracking...
    }
  }, {perms: fb_perms()});
}

/* end Facebook */


$(document).ready(function() {
  BoroughsSelection.setup();
  HowItWorksTour.setup();
  Login.setup();
  PersonalizedHomepage.setup();
  new ContactAgent();

  /*
  GLOBAL ************************************************************
  */
	$('.infoModal').fancybox({inline:true});
	$('.ajaxModal').fancybox({
		'width': function() {
			return $(this).attr('data-width');
		},
		'height': function() {
			return $(this).attr('data-height');
		}
	});
	$('.shareButton.modal, .customShareButton.modal').fancybox({
		href: function() {
			return $(this).attr('data-url');
		}
	});

  FeedbackForm.setup();

  // allow any element become a submit button for a form
  submit_button('.submitButton');

  // go back
  $('.historyBack').click(function() {
    history.back();
  });

  toggle_fade_helper();

  $('.closeFade').click(function() {
    var target = $(this).attr('data-target');
    $(target).fadeOut('fast');
    return false;
  });

  $('.printPage').click(function() {
    window.print();
    return false;
  });

  default_form_message();

  // note: please place additional rollovers in rollover_buttons() function
  rollover_buttons();
	na.selectAllRowsCheckbox();

  // jquery UI date plugin catching legacy datepicker elements
  $('.dateformat-m-sl-d-sl-Y').each(function() {
    $(this).datepicker({ dateFormat: 'mm/dd/yy', showAnim: 'fadeIn' });
  });

  /*
  TOOLTIPS & NOTES **************************************************
  */

  $('.tooltip').each(function() {
    if(!$(this).hasClass('mouseover')) {
      $(this).qtip({
        style: {
          name: 'dark',
          tip: true
        },
        show: { when: { event: 'click' } },
        hide: { when: { event: 'click' } },
        position: {
          corner: {
            target: 'topMiddle',
            tooltip: 'bottomMiddle'
          }
        }
      });
    }
  });

  // need this event to disable links
  $('.tooltip:not(.clickable):not(.infoModal)').click(function() {
    return false;
  });

  $('.tooltip.mouseover').qtip({
    style: {
        background: '#222',
        color: '#ccc',
        textAlign: 'left',
        padding: 4,
        lineHeight: 1.2,
        width: {
            min: 50,
            max: 160
        },

        border: {
         width: 1,
         radius: 2,
         color: '#222'
      },

      tip: true
    },
    position: {
      corner: {
        target: 'topMiddle',
        tooltip: 'bottomMiddle'
      },
      adjust: {
        screen: true
      }
    }
  });

  // help
  $('.help .helpOpen').click(function() {
    var help_show = $(this).siblings('.helpShow');

    var close = function(elm) {
      help_show.fadeOut('fast');
      $(elm).remove('click');
    };

    if(help_show.is(':hidden')) {
      // open
      help_show.fadeIn('fast');
      help_show.children('.helpClose').click(function() {
        close(this);
        return false;
      });
    } else {
      close(help_show.children('.helpClose'));
    }
    return false;
  });

  // alert
  $('.alert .alertOpen').click(function() {
    var alert_show = $(this).siblings('.alertShow');

    var close = function(elm) {
      alert_show.fadeOut('fast');
      $(elm).remove('click');
    };

    if(alert_show.is(':hidden')) {
      // open
      alert_show.fadeIn('fast');
      alert_show.children('.alertClose').click(function() {
        close(this);
        return false;
      });
    } else {
      close(alert_show.children('.alertClose'));
    }
    return false;
  });


  // search filters
  $('#toggleSearchFilters').click(function() {
    $('.container1, .container2').toggle();
    return false;
  });


  // review extra content reveal
  $('.moreContent').click(function () {
    var id = $(this).attr('data-id');
    var t = $(this).html();
    $(this).html( (t.search('more') > -1) ? t.replace(/more/g, 'less') : t.replace(/less/g, 'more') );
    $('#reviewViewMore' + id).slideToggle('0.9');
    return false;
  });


  init_clipboard_events();

  $('#landing #listingSERPTable .thumbnail img').click(function() {
    window.location = $(this).parent().parent().find('.listingTitle a').attr('href');
    return false;
  });


  // misc page tracking /////////////////////////////////////////////////////////////
  $('#landing #searchButton').click(function() {
    ga_track_event('Landing Page', 'Click', 'listing search button');
  });
  $('#landing #sponsor a').click(function() {
    ga_track_event('Landing Page', 'Click', 'neighborhood sponsorship');
  });

	$('#adminBar #inviteFriends').click(function() {
		ga_track_event('Site Wide', 'Click', 'admin bar: invite friends');
	});

  // listing detail
  if($('#listingDetail').length > 0 && NA_CONFIG['user_type'] != 'broker') {
    var id = $('#listingContent').attr('data-id');
		na.Tracking.firePixel('/tracking/listing_view/' + id);
  }
});


// animated to top/////////////////////////////////////////////////////////////
$(document).ready(function(){

	// hide #back-top first
	$("#back-top").hide();

	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
	});

});





/* Maps */

MAP_TRANSPORTATION_ID = 'transportation';
na.maps = {
	init: function() {
		this.listing.init();
	},
	listing: {
		init: function() {
			if($('#listingMap').length > 0) {
				this.single();
			}
			if($('#listingsMap').length > 0) {
				this.serp();
			}
		},
		serp: function() {
			var self = this;

			var myOptions = {
			  zoom: 11,
			  center: new google.maps.LatLng(40.77, -73.98),
				streetViewControl: false,
				panControl: true,
				maxZoom: 15,
				minZoom: 10,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("listingsMap"), myOptions);

			var bounds = new google.maps.LatLngBounds();
			$('.listingRow').each(function(i) {
        var parent = this;

				var latlng = new google.maps.LatLng($(this).attr('data-latitude'), $(this).attr('data-longitude'));
				var m = self.marker(map, latlng);
				bounds.extend(latlng);

				var infowindow = new google.maps.InfoWindow({
					content: $(parent).find('.mapMarkerHtml').html()
				});

				// marker events
			  google.maps.event.addListener(m, 'click', function() {
					infowindow.open(map,m);
			  });

				google.maps.event.addListener(m, 'mouseout', function() {
					SearchListings.highlightRow(parent, false);
				});

				google.maps.event.addListener(m, 'mouseover', function() {
					SearchListings.highlightRow(parent, true);
				});

				// listing grid events
        $(parent).mouseover(function() {
          SearchListings.highlightRow(parent, true);
          infowindow.open(map,m);
        }).mouseout(function(){
          SearchListings.highlightRow(parent, false);
					infowindow.close();
        });
			});

			// reset new center/zoom level
			map.fitBounds(bounds);

			// allow map to follow scrolling
			var el = $('#listingsMap'),
				w = $(window),
			  offset = el.offset(),
				h = $('#listingSERPTable').height();

			w.scroll(function(){
				var s = w.scrollTop();
				var margin = 0;

				if(s > h) {
					margin = h - el.height() - 20;
				} else if(s > offset.top) {
					margin = s - offset.top;
				}

				el.stop().animate({"marginTop": margin + 'px'}, 'slow');
	    });

		},
		single: function() {
			var l = $('#listingContent');
			var latlng = new google.maps.LatLng(l.attr('data-latitude'), l.attr('data-longitude'));

			var tran_stops = $('#transportation li');

			var myOptions = {
			  zoom: 15,
			  center: latlng,
				streetViewControl: false,
				panControl: true,
				maxZoom: 15,
				minZoom: 11,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			if(tran_stops.length > 0) {
				myOptions.mapTypeControlOptions = {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, MAP_TRANSPORTATION_ID]
				}
			}

			var map = new google.maps.Map(document.getElementById("listingMap"), myOptions);

			// listing marker
			this.marker(map, latlng);

			// transportation
			if(tran_stops.length > 0) {

				var transportation_infowindow = function(el, map, marker) {
					var infowindow = new google.maps.InfoWindow({
						content: $(el).html()
					});

					// marker events
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map,marker);
					});
				};


				// subway maptype
				var style = [
					{
						featureType: "road.local",
						elementType: "geometry"
					}
				];

			  var transMapType = new google.maps.StyledMapType(style, {
			  	name: 'Subways'
			  });
				map.mapTypes.set(MAP_TRANSPORTATION_ID, transMapType);

				var markers = [];
				var _m;
				tran_stops.each(function(i) {
					_m = new google.maps.Marker({
		        position: new google.maps.LatLng($(this).attr('data-latitude'), $(this).attr('data-longitude')),
		        map: map,
						visible: false,
						icon: document.location.protocol + '//www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png'
					});

					transportation_infowindow(this, map, _m);

					markers.push(_m);
				});

				var _v;
				google.maps.event.addListener(map, 'maptypeid_changed', function() {
					_v = (map.getMapTypeId() == MAP_TRANSPORTATION_ID) ? true : false
					for(var i=0; i < markers.length; i++) {
						markers[i].setVisible(_v);
					}
				});
			}
		},

		marker: function(map, latlng) {
			return new google.maps.Marker({
        position: latlng,
        map: map,
        icon: '/images/icons/symbol-on-map.png'
	    });
		}
	},
	loadScript: function() {
	  var script = document.createElement("script");
	  script.type = "text/javascript";
	  script.src = document.location.protocol + '//maps.google.com/maps/api/js?sensor=false&callback=initialize_maps';
	  document.body.appendChild(script);
	}
};

function initialize_maps() {
	na.maps.init();
}


$(document).ready(function() {
	if($('#listingMap,#listingsMap').length > 0) {
		na.maps.loadScript();
	}
});

var LinkTracking = {};

LinkTracking.setup_events = function() {
	$('a[data-tagged-trac]').live('mousedown', function(e) {
		var tracker = new Image();
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;
		var url = '/tracking/link_click?code=' + escape($(this).attr('data-tagged-trac'))
			+ '&page_url=' + escape(document.location)
			+ '&referral_url=' + escape(document.referrer)
			+ '&click_x=' + escape(x) + '&click_y=' + escape(y);
		na.Tracking.firePixel(url);
	});
};

LinkTracking.conversion = function(type) {
	var url = '/tracking/link_conversion?type=' + escape(type);
	na.Tracking.firePixel(url);
};

$(document).ready(function() {
	LinkTracking.setup_events();
});