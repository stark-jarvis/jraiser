/*!
 * JRaiser 2 Javascript Library
 * calendar - v1.0.1 (2014-07-22T15:56:25+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("calendar/1.0.x/",["dom/1.0.x/","widget/1.0.x/","tmpl/1.0.x/"],function(e,t,a){"use strict";var n=e("base/1.0.x/"),r=(e("dom/1.0.x/"),e("widget/1.0.x/")),s=e("tmpl/1.0.x/"),i=/^([+-])(\d+)$/,h=["sun","mon","tues","wed","thur","fri","sat"],d=n.createClass(function(e,t){this.year(e),this.month(t)},{year:function(e){return arguments.length?(e=e||(new Date).getFullYear(),void(this._year=i.test(e)?this._year+parseInt(e):parseInt(e))):this._year},month:function(e){if(!arguments.length)return this._month;e=e||(new Date).getMonth()+1;var t=i.test(e)?this._month+parseInt(e):parseInt(e),a=new Date(this._year,t-1);this._month=a.getMonth()+1,this._year=a.getFullYear()},build:function(e){e&&(n.isArray(e)||(e=[e]),e=e.map(function(e){return e=new Date(e),e.setHours(0,0,0,0),e.getTime()}));var t=new Date(this._year,this._month-1,1),a=t.getDay(),r=new Date(this._year,this._month-1,a?1-a:-6).getTime();t.setMonth(this._month),t.setDate(0),a=t.getDay();var s=new Date(this._year,this._month-1,t.getDate()+(6===a?7:6-a)).getTime();35424e5>s-r&&(s+=6048e5);var i,d,o,m={year:this._year,month:this._month,weeks:[]},y=864e5,l=new Date;for(l.setHours(0,0,0,0),l=l.getTime();s>=r;)i=new Date(r),d={year:i.getFullYear(),month:i.getMonth()+1,date:i.getDate(),weekDay:i.getDay(),timestamp:i.getTime(),states:[]},d.states.push("calendar-day-week-"+h[d.weekDay]),d.states.push(d.weekDay>0&&d.weekDay<6?"calendar-day-weekday":"calendar-day-weekend"),d.states.push(d.year<this._year||d.year===this._year&&d.month<this._month?"calendar-day-last-month":d.year>this._year||d.year===this._year&&d.month>this._month?"calendar-day-next-month":"calendar-day-current-month"),d.states.push(d.timestamp>l?"calendar-day-future":d.timestamp<l?"calendar-day-past":"calendar-day-today"),e&&e.some(function(e){return e===d.timestamp?(d.states.push("calendar-day-selected"),!0):void 0}),o&&7!==o.length||(o=[],m.weeks.push(o)),o.push(d),r+=y;return m}});return r.create(function(e){},{_init:function(e){},render:function(e){var t=this,a=t._options;t._model?(t._model.month(e.month),t._model.year(e.year)):t._model=new d(e.year,e.month);var n=t._model.build(e.selectedDates);a.wrapper.empty().html(s.render(a.template,{weekDayNames:a.weekDayNames,data:n})).find("td").click(function(e){e.preventDefault();var a=new Date(parseInt(this.getAttribute("data-timestamp")));t.trigger("dayselect",{selectedDate:a,dayGrid:this})}),t.trigger("render",{calendarData:n})},nextMonth:function(e){this.render({year:"+0",month:"+1",selectedDates:e})},prevMonth:function(e){this.render({year:"+0",month:"-1",selectedDates:e})},prevYear:function(e){this.render({year:"-1",month:"+0",selectedDates:e})},nextYear:function(e){this.render({year:"+1",month:"+0",selectedDates:e})},_destroy:function(e){e.wrapper.empty(),delete this._model}},{weekDayNames:"日一二三四五六".split(""),template:'<table class="calendar"><% if (weekDayNames) { %><thead><tr><% for (var i = 0; i < 7; i++) { %><th><span class="calendar-grid"><%=weekDayNames[i]%></span></th><% } %></tr></thead><% } %><tbody><% for (var i = 0, j, weeks = data.weeks; i < weeks.length; i++) { %><tr><% for (j = 0; j < weeks[i].length; j++) { %><td class="calendar-day <%=weeks[i][j].states.join(" ")%>" data-timestamp="<%=weeks[i][j].timestamp%>"><a href="#" class="calendar-grid"><%=weeks[i][j].date%></a></td><% } %></tr><% } %></tbody></table>'})});