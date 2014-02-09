function buttonEvent(e,t,n){var r=InvalidField;var i=ValidField;var s=Submitting;$(e).click(function(){var e=true;var o=[];InvalidatedMessages=[];var u=[];for(var a in t){var f=t[a];if(u.indexOf(f.Element)<0){var l=$(f.Element).val();if(l===undefined){l=""}if(!f.Func(l)){e=false;if(typeof r=="function"){r(f.Element);o.push(f.Element)}}u.push(f.Element)}}for(var c in u){if(o.indexOf(c)<=0){if(typeof i=="function"){i(c)}}}if(!e){var h="";for(var p in InvalidatedMessages){h+='<span class="error">'+InvalidatedMessages[p]+"</span>"}$("."+n+"CorrectionBox").html(h)}if(e){if(typeof s[n]=="function"){s[n]()}}return e})}function BuildMenu(e){var t="";for(var n in e){t+="<li>";if(e[n].URL!=null){t+='<a href="'+e[n].URL+'">'}t+=e[n].Text;if(e[n].URL!=null){t+="</a>"}if(e[n].SubMenus.length>0){t+="<ul>"+BuildMenu(e[n].SubMenus)+"</ul>"}t+="</li>"}return t}function GetMenu(e){var t=function(){this.MenuId=0;this.Text="";this.URL="";this.SubMenus=[]};var n={};for(var r in e){var i=new t;i.Text=e[r].Menu.Text;i.URL=e[r].Menu.URL;i.MenuId=e[r].Menu.MenuId;if(e[r].Menu.ParentMenuId&&n[e[r].Menu.ParentMenuId+""]){n[e[r].Menu.ParentMenuId].SubMenus.push(i)}else{n[i.MenuId+""]=i}}return n}function Apply(e,t,n){if(Object.prototype.toString.call(e)==="[object Array]"){var r='[repeat$="in '+n+'"]';var i=$(r);if(i.length>0){i.each(function(t,i){for(var s in e){if(s<e.length){$(r+":first").clone().appendTo($(r+":first").parent())}var o=$(this).attr("repeat").replace(" in "+n,"");Apply(e[s],r+":last",o)}});$(r+":first").remove()}}else if(typeof e==="object"){for(var s in e){var o="";if(n==null||typeof n==="undefined"||n==""){o=s}else{o=n+"."+s}Apply(e[s],t,o)}}else{var u=new RegExp(n,"g");$(t).html($(t).html().replace(u,e))}}var InvalidatedMessages=[];var InvalidField=null;var ValidField=null;var Submitting={};var cp=$.mobile.changePage;

$(function(){

$.mobile.changePage=function(e,t){
	if(typeof e==="string" && (e.substring(1,1) == "#" || e.substring(1,1) == '.')) {  e=$(e); }
	if(typeof e!=="string") {
	if(e.find("[data-role=header]").length==1){
		return cp(e,t)
	}else{
		if(e.find("[data-role=header]").length==0){
			e.prepend($.mobile.activePage.find("[data-role=header]").detach())
		}
		if(e.find("[data-role=footer]").length==0){
			e.append($.mobile.activePage.find("[data-role=footer]").detach())
		}
		cp(e,t)
	}
	} else {
		cp(e,t);
	}
};

$.changePage=$.mobile.changePage;
//$.ajaxSetup({beforeSend:function(e){e.setRequestHeader("User-Agent","Perspicuous")}});
if($(".pagesToAdd").length>0){
	$(".pagesToAdd [data-role=page]").each(function(e,t){
		$("#currentPages").prepend($(t).detach())
	})
	}
	if($("[data-role=page]").length>1){
		if($("[data-role=page]:eq(1)").length==1){
		
			if(window.location.hash){
				$.mobile.changePage($("[data-default=true]"),{"changeHash":false});
				$.mobile.changePage($(window.location.hash))
			}
			else{
				$.mobile.changePage($("[data-role=page]:eq(1)"))
			}
		}
	}
})