/*!
 * JRaiser 2 Javascript Library
 * selectmenu - v1.0.0 (2014-08-22T16:27:51+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("selectmenu/1.0.x/",["widget/1.0.x/","tmpl/2.0.x/","dom/1.0.x/","uadetector/1.0.x/","draggable/1.0.x/","scrollbar/1.0.x/"],function(e,t,n){"use strict";var l=e("widget/1.0.x/"),i=e("tmpl/2.0.x/"),s=e("dom/1.0.x/"),a=e("scrollbar/1.0.x/"),c=new i({SELECT_MENU:'<div class="selectmenu"><div class="selectmenu-button"><span class="selectmenu-currenttext"><%=defaultText%></span><span class="selectmenu-triangle"></span></div><input<% if (name) { %> name="<%=name%>"<% } %> type="hidden"></input><div class="selectmenu-menu"><div class="selectmenu-menu-inner"><ul class="selectmenu-options"></ul></div></div></div>',OPTION_ITEMS:'<% data.forEach(function(d) { %><li class="selectmenu-option" data-value="<%=(d.value == null ? d.text : d.value)%>"><%=d.text%></li><% }); %>'});return l.create(function(){},{_init:function(e){var t=this,n=t._wrapper=s(c.render("SELECT_MENU",{name:e.name||"",defaultText:e.defaultText||""}));e.appendTo.append(n),n.click(function(){t._clickOnMe=!0}),t._onDocumentClick=function(){t._clickOnMe||t.hideMenu(),t._clickOnMe=!1},s(document).click(t._onDocumentClick),t._optionList=n.find("ul.selectmenu-options").on("click",function(){t.hideMenu(),t.val(this.getAttribute("data-value"))},{delegator:"li"}),n.find("div.selectmenu-button").click(function(){t.toggleMenu()}),t._addOptionItems(e.optionItems),null!=e.value&&t.val(e.value)},_destroy:function(e){var t=this;t._scrollbar&&(t._scrollbar.destroy(),delete t._scrollbar),delete t._clickOnMe,s(document).off("click",t._onDocumentClick),delete t._onDocumentClick,delete t._scrollTimer,t._wrapper.remove(),delete t._wrapper,delete t._optionList,delete t._data},toggleMenu:function(){this._wrapper.hasClass("selectmenu-open")?this.hideMenu():this.showMenu()},showMenu:function(){var e=this;if(e._data.length){var t=e._wrapper.addClass("selectmenu-open").find("div.selectmenu-menu").css("height","").show();e._scrollbar?e._scrollbar.refresh():e._scrollbar=new a({scrollOuter:t,scrollBody:e._optionList,mouseWheelStep:35,events:{scroll:function(){e._clickOnMe=!0,e._scrollTimer&&clearTimeout(e._scrollTimer),e._scrollTimer=setTimeout(function(){e._clickOnMe=!1},120)}}});var n=e._optionList.outerHeight(!0);n<=t.height()&&t.css("height",n)}},hideMenu:function(){this._wrapper.removeClass("selectmenu-open").find("div.selectmenu-menu").hide()},_addOptionItems:function(e){var t=this;t._data=t._data||[],e&&e.length&&(t._data=t._data.concat(e),t._optionList.empty().html(c.render("OPTION_ITEMS",{data:t._data}))),t._data.length?t._wrapper.removeClass("selectmenu-nooptions"):t._wrapper.addClass("selectmenu-nooptions")},val:function(e){var t=this,n=t._value;if(!arguments.length)return n;if(e=String(e),e!==n){for(var l=t._data,i=l.length-1;i>=0&&String(l[i].value)!==e;i--);var s;-1===i?(s=t._options.defaultText,e=""):s=l[i].text,t._wrapper.find("span.selectmenu-currenttext").text(s),t._optionList.children().eq(i).addClass("selectmenu-option-selected").siblings().removeClass("selectmenu-option-selected"),t._value=e,t._wrapper.find("input").val(e),t.trigger("change",{newValue:e,oldValue:n})}}})});