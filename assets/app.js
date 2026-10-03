var IMG={"tinago": "assets/img/tinago.webp", "mariacristina": "assets/img/mariacristina.webp", "mimbalot": "assets/img/mimbalot.webp", "limunsudan": "assets/img/limunsudan.webp", "dodiongan": "assets/img/dodiongan.webp", "pagangon": "assets/img/pagangon.webp", "timoga": "assets/img/timoga.webp", "hindang": "assets/img/hindang.webp", "buhanginan": "assets/img/buhanginan.webp", "cathedral": "assets/img/cathedral.webp"};

/* ===== EDIT DATA HERE ===== */
var TOURISM_EMAIL=""; /* fallback: tourism office email */
var FORM_ENDPOINT=""; /* e.g. https://formspree.io/f/xxxx : submissions post here, no email app needed */
var LAST_REVIEWED=""; /* e.g. "Oct 2026" once fees are verified */
var CONTACTS=[{n:"Iligan City Tourism Office",tel:""},{n:"Police",tel:""},{n:"Fire",tel:""},{n:"Hospital",tel:""},{n:"CDRRMO / DRRMO",tel:""}]; /* add verified numbers */
/* lat/lng are approximate: verify each before launch. f = fee per person in PESOS (0 = not set). img = photo URL (optional). */
var D=[
/* r = fame rank (1 = best known; only ranked falls appear on the Waterfall Trail). dist: 1 near city, 2 mid, 3 far. h: 1 easy access, 2 stairs/trail, 3 trek. hrs = typical [open,close] hour or null. Values marked "confirm" are provisional. */
{n:"Maria Cristina Falls",c:"Waterfalls",e:"🌊",r:1,dist:1,h:1,hrs:[7,17],d:"Iligan's best-known falls, also a hydropower source. Great viewpoints.",lat:8.1867,lng:124.2033,f:0,img:IMG.mariacristina,q:"Maria Cristina Falls Iligan"},
{n:"Tinago Falls",c:"Waterfalls",e:"💧",r:2,dist:1,h:2,hrs:[8,17],d:"A hidden falls reached by a long staircase, with a cool blue pool.",lat:8.1789,lng:124.2081,f:0,img:IMG.tinago,q:"Tinago Falls Iligan"},
{n:"Mimbalot Falls",c:"Waterfalls",e:"🌿",r:3,dist:2,h:2,hrs:null,d:"A scenic falls with pools, good for a half-day trip.",lat:8.1560,lng:124.1880,f:0,img:IMG.mimbalot,q:"Mimbalot Falls Iligan"},
{n:"Limunsudan Falls",c:"Waterfalls",e:"🥾",r:4,dist:3,h:3,hrs:null,d:"A tall multi-tiered falls in the highlands. Trek with a guide.",lat:8.1128,lng:124.5233,f:0,img:IMG.limunsudan,q:"Limunsudan Falls"},
{n:"Dodiongan Falls",c:"Waterfalls",e:"💦",r:5,dist:2,h:2,hrs:null,d:"One of Iligan's lesser-known falls. Details to be confirmed by the tourism office.",lat:null,lng:null,f:0,img:IMG.dodiongan,q:"Dodiongan Falls Iligan"}, /* confirm rank, distance, access */
{n:"Pagangon Falls (Sikyup)",c:"Waterfalls",e:"💦",r:6,dist:2,h:2,hrs:null,d:"A lesser-known falls, also called Sikyup. Details to be confirmed by the tourism office.",lat:null,lng:null,f:0,img:IMG.pagangon,q:"Pagangon Falls Iligan"}, /* confirm rank, distance, access */
{n:"Timoga Springs",c:"Nature",e:"🏊",dist:1,h:1,hrs:null,d:"Spring-fed swimming pools close to the city.",lat:8.191261,lng:124.179791,f:0,img:IMG.timoga,q:"Timoga Springs Iligan"},
{n:"Hindang Caves",c:"Caves",e:"🕳️",dist:2,h:2,hrs:null,d:"Cave formations in Hindang. Details to be confirmed by the tourism office.",lat:null,lng:null,f:0,img:IMG.hindang,q:"Hindang Caves Iligan"}, /* confirm distance, access */
{n:"Buhanginan Hill (City Hall Viewpoint)",c:"Viewpoint",e:"🌄",dist:1,h:1,hrs:null,d:"A hilltop viewpoint near Iligan City Hall with views over the city and bay.",lat:null,lng:null,f:0,img:IMG.buhanginan,q:"Buhanginan Hill Iligan City Hall viewpoint"},
{n:"St. Michael's Cathedral",c:"Heritage",e:"⛪",dist:1,h:1,hrs:null,d:"The city's main church, in the heart of Iligan.",lat:8.2283,lng:124.2436,f:0,img:IMG.cathedral,q:"St. Michael's Cathedral Iligan"}];
/* tel: phone number, fb: Facebook/Messenger link, ver: true when checked, upd: "Mon YYYY" */
var B=[
{n:"Cheding's Peanuts",c:"Products",d:"Iligan's best-known pasalubong: toasted peanuts packed to take home. An older source lists 25-A Sabayle St.; confirm the current address.",tel:"",fb:"",ver:false,upd:""},
{n:"Go Hotels Iligan",c:"Stay",d:"Budget hotel right beside Robinsons Iligan mall, 158 Macapagal Ave.",tel:"",fb:"",ver:false,upd:""}];
var T={fil:{hero:"Planuhin ang iyong pagbisita sa Lungsod ng mga Maringal na Talon: mga destinasyon, bayarin, sasakyan, itinerary, kaligtasan at mga lokal na produkto.",dest:"Mga Destinasyon",map:"Mapa",fees:"Bayarin",go:"Paano Pumunta",trip:"Mga Itinerary",mytrip:"Aking Biyahe",safe:"Kaligtasan",food:"Pagkain at Produkto",biz:"Direktoryo"},
ceb:{hero:"Planoha ang imong pagbisita sa Siyudad sa Maanindot nga mga Busay: mga destinasyon, bayranan, sakyanan, itinerary, kaluwasan ug lokal nga produkto.",dest:"Mga Destinasyon",map:"Mapa",fees:"Bayranan",go:"Unsaon Pag-adto",trip:"Mga Itinerary",mytrip:"Akong Biyahe",safe:"Kaluwasan",food:"Pagkaon ug Produkto",biz:"Direktoryo"}};
/* ===== END DATA ===== */
function $(i){return document.getElementById(i)||document.createElement("div")}function HAS(i){return !!document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;e.innerHTML=h||"";return e}
function gm(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q+", Philippines")}
function uniq(a){return a.map(function(x){return x.c}).filter(function(v,i,s){return s.indexOf(v)==i})}
function chips(id,list,cb){var box=$(id);["All"].concat(list).forEach(function(v,i){var b=el("button","chip"+(i?"":" on"),esc(v));b.onclick=function(){[].forEach.call(box.children,function(x){x.classList.remove("on")});b.classList.add("on");cb(v)};box.appendChild(b)})}
/* saved trip */
var S=[];try{S=JSON.parse(localStorage.getItem("ilg_trip")||"[]")}catch(e){}
function persist(){try{localStorage.setItem("ilg_trip",JSON.stringify(S))}catch(e){}}
var fee=D.map(function(p){return p.f});var CFG={};
(function(){try{CFG=JSON.parse(localStorage.getItem("ilg_cfg")||"{}");(CFG.fee||[]).forEach(function(v,i){if(i<fee.length&&v!=null)fee[i]=v})}catch(e){CFG={}}
try{var u=new URLSearchParams(location.search),t=u.get("trip");if(t){var l=t.split("|").filter(function(n){return ix(n)>-1});if(l.length){S=l;persist()}}if(u.get("g"))CFG.grp=u.get("g")}catch(e){}})();
function ix(n){return D.map(function(p){return p.n}).indexOf(n)}
function calc(){var s=0;S.forEach(function(n){s+=+fee[ix(n)]||0});$("tot").textContent="₱"+(s*(+$("grp").value||1)+(+$("trn").value||0)).toLocaleString();try{localStorage.setItem("ilg_cfg",JSON.stringify({fee:fee,grp:$("grp").value,trn:$("trn").value}))}catch(e){}}
function trip(){var tb=$("tb");tb.textContent=S.length||"";tb.hidden=!S.length;if(!HAS("tl"))return;$("tl").innerHTML=S.length?S.map(function(n){var i=ix(n);return "<div class='row'><span>"+esc(n)+"</span><label>₱ <input type='number' min='0' data-fee='"+i+"' value='"+esc(fee[i])+"'> /person</label></div>"}).join(""):"<p class='sub'>Tap ☆ on a destination to add it here.</p>";calc()}
/* destinations */
var dc="All",dq="";
var LV=["","Easy","Moderate","Hard"],DS=["","Near city","Mid-distance","Far"],ST={};
function tier(r){return r<=3?"Iconic":r<=4?"Well-known":"Hidden gem"}
function stat(p){var s=ST[p.n];
if(s&&s.upd&&Date.now()-new Date(s.upd)<1728e5){var m={open:"🟢 Open",closed:"🔴 Closed",limited:"🟠 Limited access",unknown:"⚪ Status unknown"};return "<span class='st'>"+(m[s.s]||m.unknown)+(s.note?" · "+esc(s.note):"")+"</span> <small>Updated "+esc(new Date(s.upd).toLocaleString("en-PH",{dateStyle:"medium",timeStyle:"short"}))+"</small>"}
if(p.hrs){var h=+new Intl.DateTimeFormat("en-GB",{hour:"numeric",hour12:false,timeZone:"Asia/Manila"}).format(new Date()),o=h>=p.hrs[0]&&h<p.hrs[1];return "<span class='st'>"+(o?"🟡 Usually open now":"⚫ Usually closed now")+"</span> <small>Typical "+p.hrs[0]+":00–"+p.hrs[1]+":00, not confirmed</small>"}
return "<span class='st'>⚪ Status not confirmed</span>"}
function loadST(){fetch("status.json?"+Date.now()).then(function(r){return r.json()}).then(function(j){ST=j;showD();showT();showF()}).catch(function(){})}
function cardHTML(p,i){var on=S.indexOf(p.n)>-1;return "<div class='ph'>"+(p.img?"<img loading='lazy' alt='"+esc(p.n)+"' src='"+esc(p.img)+"'>":p.e)+"</div><button class='star' data-fav='"+i+"' aria-pressed='"+on+"' aria-label='Save "+esc(p.n)+"'>"+(on?"★":"☆")+"</button><div class='bd'>"+(p.r?"<span class='tag'>#"+p.r+" · "+tier(p.r)+"</span>":"")+"<span class='tag'>"+esc(p.c)+"</span><span class='tag'>"+LV[p.h]+"</span><span class='tag'>"+DS[p.dist]+"</span><h3>"+esc(p.n)+"</h3><p>"+esc(p.d)+"</p><p>"+stat(p)+"</p><a class='btn' target='_blank' rel='noopener' href='"+gm(p.q)+"'>Open in Maps →</a></div>"}
function showD(){if(!HAS("dgrid"))return;var g=$("dgrid");g.innerHTML="";D.forEach(function(p,i){if((dc!="All"&&p.c!=dc)||(p.n+p.d+p.c).toLowerCase().indexOf(dq)<0)return;var c=el("div","card pic hl",cardHTML(p,i));c.id="d"+i;g.appendChild(c)});
if(!g.children.length)g.appendChild(el("p","sub","No matches."))}
var tt="All";
function showT(){if(!HAS("tgrid"))return;var k=$("tsort").value,a=D.map(function(p,i){return [p,i]}).filter(function(x){var p=x[0];return p.c=="Waterfalls"&&p.r&&(tt=="All"||tier(p.r)==tt)&&p.h<=+$("thas").value});
a.sort(function(x,y){var p=x[0],q=y[0];return k=="rr"?q.r-p.r:k=="r"?p.r-q.r:(p[k]-q[k])||(p.r-q.r)});
var g=$("tgrid");g.innerHTML="";a.forEach(function(x){g.appendChild(el("div","card pic",cardHTML(x[0],x[1])))});if(!a.length)g.appendChild(el("p","sub","No falls match these filters."))}
chips("tchips",["Iconic","Well-known","Hidden gem"],function(v){tt=v;showT()});$("tsort").onchange=$("thas").onchange=showT;
function showF(){if(!HAS("fgrid"))return;var g=$("fgrid");g.innerHTML="";D.forEach(function(p,i){if(p.r&&p.r<=3)g.appendChild(el("div","card pic",cardHTML(p,i)))})}
var lastPlan=[];
function plan(){var nd=+$("pd").value,per=+$("pp").value,st=$("ps").value,mh=+$("pc").value,now=Date.now();
var c=D.filter(function(p){var s=ST[p.n];return p.h<=mh&&!(s&&s.s=="closed"&&s.upd&&now-new Date(s.upd)<1728e5)});
function k(p){return p.r||6}
c.sort(function(a,b){return st=="gems"?k(b)-k(a):st=="mix"?(a.dist-b.dist)||(k(a)-k(b)):k(a)-k(b)});
var hard=c.filter(function(p){return p.h==3}).slice(0,nd>=5?2:nd>=3?1:0),rest=c.filter(function(p){return p.h<3}),days=[];
for(var i=0;i<nd-hard.length;i++)days.push(rest.slice(i*per,(i+1)*per));
hard.forEach(function(p,j){days.splice(Math.min(1+j*2,days.length),0,[p])});
days=days.filter(function(d){return d.length});lastPlan=[];
var T=["Morning","Midday","Afternoon","Late afternoon"];
var h=days.map(function(d,i){return "<div class='card' style='margin-bottom:10px'><h3>Day "+(i+1)+"</h3>"+d.map(function(p,j){lastPlan.push(p.n);return "<div class='day'><b>"+T[j]+"</b> "+esc(p.n)+" <small>"+LV[p.h]+" · "+DS[p.dist]+"</small><br>"+stat(p)+" <a class='btn' target='_blank' rel='noopener' href='"+gm(p.q)+"'>Directions →</a></div>"}).join("")+(d[0].h==3?"<p class='sub'>Trek day: start at dawn with an accredited guide.</p>":"")+"</div>"}).join("");
$("planout").innerHTML=(h||"<p class='sub'>No places match. Try a higher comfort level.</p>")+(h&&days.length<nd?"<p class='sub'>Fewer places than days match, so the plan is shorter.</p>":"")+(h?"<button class='go' id='psave'>Save all to My Trip</button> <small>Check status again the day before you go.</small>":"");
if($("psave"))$("psave").onclick=function(){lastPlan.forEach(function(n){if(S.indexOf(n)<0)S.push(n)});persist();showD();showT();showF();trip();this.textContent="Saved ✓"}}
$("pgo").onclick=plan;
chips("dchips",uniq(D),function(v){dc=v;showD()});$("qd").oninput=function(e){dq=e.target.value.toLowerCase();showD()};
document.addEventListener("click",function(e){var b=e.target.closest("[data-fav]");if(!b)return;var n=D[b.dataset.fav].n,k=S.indexOf(n);if(k<0)S.push(n);else S.splice(k,1);persist();showD();showT();showF();trip()});
document.addEventListener("input",function(e){var t=e.target;if(t.dataset&&t.dataset.fee!=null){fee[t.dataset.fee]=t.value;calc()}else if(t.id=="grp"||t.id=="trn")calc()});
/* map */
if(window.L){var m=L.map("lmap",{scrollWheelZoom:false}).setView([8.2,124.23],11);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"© OpenStreetMap contributors"}).addTo(m);
var layer=L.layerGroup().addTo(m);
function pop(p,i){return "<div style='min-width:170px'>"+(p.img?"<img alt='' src='"+esc(p.img)+"' style='width:100%;height:80px;object-fit:cover;border-radius:6px'>":"")+"<b>"+esc(p.n)+"</b><br>"+stat(p)+"<br><a href='destinations.html#d"+i+"'>View card →</a> · <a target='_blank' rel='noopener' href='"+gm(p.q)+"'>Directions</a></div>"}
function pins(cat){layer.clearLayers();var b=[];D.forEach(function(p,i){if(p.lat==null||(cat!="All"&&p.c!=cat))return;b.push([p.lat,p.lng]);
L.marker([p.lat,p.lng],{title:p.n}).addTo(layer).bindPopup(pop(p,i)).on("click",function(){$("mapinfo").innerHTML="<h3 style='margin:0'>"+esc(p.n)+"</h3><p>"+esc(p.d)+"</p><p>"+stat(p)+"</p><a class='btn' target='_blank' rel='noopener' href='"+gm(p.q)+"'>Get directions →</a>"})});
if(b.length)m.fitBounds(b,{padding:[24,24]})}
chips("mchips",uniq(D.filter(function(p){return p.lat!=null})),pins);pins("All")}else{$("lmap").innerHTML="<p class='sub' style='padding:12px'>The map needs an internet connection. Use “Open in Maps” on any destination card.</p>"}
/* directory */
var bc="All",bq="";
function showB(){if(!HAS("bgrid"))return;var g=$("bgrid");g.innerHTML="";B.filter(function(b){return (bc=="All"||b.c==bc)&&(b.n+b.d+b.c).toLowerCase().indexOf(bq)>-1}).forEach(function(b){
var a=(b.tel?"<a class='btn' href='tel:"+esc(b.tel.replace(/[^\d+]/g,""))+"'>📞 Call</a>":"")+(/^https?:\/\//.test(b.fb)?"<a class='btn' target='_blank' rel='noopener' href='"+esc(b.fb)+"'>💬 Facebook / Messenger</a>":"");
g.appendChild(el("div","card","<span class='tag'>"+esc(b.c)+"</span>"+(b.ver?"<span class='ok'>✔ Verified"+(b.upd?" · "+esc(b.upd):"")+"</span>":"")+"<h3>"+esc(b.n)+"</h3><p>"+esc(b.d)+"</p>"+(a||"<p style='color:var(--mu)'>Contact details coming soon</p>")))});
if(!g.children.length)g.appendChild(el("p","sub","No matches."))}
chips("bchips",uniq(B),function(v){bc=v;showB()});$("q").oninput=function(e){bq=e.target.value.toLowerCase();showB()};
$("fs").onclick=function(){if(!$("fn").value.trim()){alert("Please enter your business name.");return}
if(FORM_ENDPOINT){var fm=$("fmsg");fm.textContent="Sending…";fetch(FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({business:$("fn").value,category:$("fc").value,contact:$("fk").value,details:$("fd").value})}).then(function(r){if(!r.ok)throw 0;fm.textContent="Thank you! Your request was sent.";["fn","fk","fd"].forEach(function(i){$(i).value=""})}).catch(function(){fm.textContent="Could not send. Please try again later."});return}
if(!TOURISM_EMAIL){alert("Set TOURISM_EMAIL in the page code first.");return}
location.href="mailto:"+TOURISM_EMAIL+"?subject="+encodeURIComponent("Directory listing: "+$("fn").value)+"&body="+encodeURIComponent("Business: "+$("fn").value+"\nCategory: "+$("fc").value+"\nContact: "+$("fk").value+"\nDetails: "+$("fd").value)};
/* language */
[].forEach.call(document.querySelectorAll("[data-t]"),function(x){x.dataset.en=x.textContent});
$("lang").onchange=function(){var l=this.value;try{localStorage.setItem("ilg_lang",l)}catch(e){}document.documentElement.lang=l=="en"?"en":l=="fil"?"fil":"ceb";[].forEach.call(document.querySelectorAll("[data-t]"),function(x){x.textContent=(T[l]&&T[l][x.dataset.t])||x.dataset.en})};
if(CFG.grp)$("grp").value=CFG.grp;if(CFG.trn)$("trn").value=CFG.trn;
if(!FORM_ENDPOINT&&!TOURISM_EMAIL)$("lform").hidden=true;
loadST();showD();showT();showF();showB();trip();
/* nav menu */
$("mb").onclick=function(){var o=$("nl").classList.toggle("open");this.setAttribute("aria-expanded",o)};
$("nl").onclick=function(e){if(e.target.closest("a")){$("nl").classList.remove("open");$("mb").setAttribute("aria-expanded","false")}};
/* map popup -> card */
function goCard(i){dc="All";dq="";$("qd").value="";[].forEach.call($("dchips").children,function(x,k){x.classList.toggle("on",k==0)});showD();var e=$("d"+i);if(e){e.scrollIntoView({behavior:"smooth",block:"center"});e.style.outline="3px solid var(--ac)";setTimeout(function(){e.style.outline=""},2500)}}
document.addEventListener("click",function(e){var a=e.target.closest("[data-card]");if(a){e.preventDefault();goCard(+a.dataset.card)}});
/* share / export */
function shareURL(){return location.href.split(/[?#]/)[0]+"?trip="+encodeURIComponent(S.join("|"))+"&g="+encodeURIComponent($("grp").value)}
function sumTxt(){return "My Iligan trip ("+(+$("grp").value||1)+" pax)\n"+S.map(function(n,i){return (i+1)+". "+n}).join("\n")+"\nEstimated total: "+$("tot").textContent+"\n"+shareURL()}
function cp(t,ok){var m=$("tmsg");if(!S.length){m.textContent="Save a place first.";return}
(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){m.textContent=ok},function(){prompt("Copy this:",t)})}
$("tcopy").onclick=function(){cp(sumTxt(),"Summary copied ✓")};
$("tshare").onclick=function(){if(S.length&&navigator.share){navigator.share({title:"My Iligan trip",text:sumTxt()}).catch(function(){})}else cp(shareURL(),"Link copied ✓")};
/* contacts + fee meta */
(function(){var ok=CONTACTS.filter(function(c){return c.tel});
if(ok.length&&HAS("ctl")){var l=$("ctl");l.insertAdjacentHTML("beforebegin",ok.map(function(c){return "<li>"+esc(c.n)+": <a href='tel:"+esc(c.tel.replace(/[^\d+]/g,""))+"'><b>"+esc(c.tel)+"</b></a></li>"}).join(""));l.hidden=true}
var tel=CONTACTS[0]&&CONTACTS[0].tel,p=[];if(LAST_REVIEWED)p.push("Last reviewed: <b>"+esc(LAST_REVIEWED)+"</b>.");if(tel)p.push("Tourism office: <a href='tel:"+esc(tel.replace(/[^\d+]/g,""))+"'><b>"+esc(tel)+"</b></a>.");
$("feemeta").innerHTML=p.join(" ")||"Rates are being verified. Confirm with the tourism office before you go."})();
/* weather advisory (Open-Meteo, no key) */
HAS("wx")&&fetch("https://api.open-meteo.com/v1/forecast?latitude=8.2&longitude=124.23&daily=precipitation_sum,precipitation_probability_max&timezone=Asia%2FManila&forecast_days=1").then(function(r){return r.json()}).then(function(j){
var mm=j.daily.precipitation_sum[0],pr=j.daily.precipitation_probability_max[0],hi=mm>=20||pr>=70,b=$("wx");
b.innerHTML=(hi?"⚠️ <b>Heavy rain likely today</b> ("+pr+"% chance, ~"+mm+" mm). Rivers and falls can rise fast: avoid swimming and treks, and check with the tourism office.":"🌤️ <b>Today:</b> "+pr+"% chance of rain (~"+mm+" mm). Water levels can still change quickly; confirm locally before swimming.");b.hidden=false}).catch(function(){});
if("serviceWorker" in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register("sw.js").catch(function(){});

/* multi-page glue */
(function(){var p=document.body.dataset.page;[].forEach.call(document.querySelectorAll("nav .nl a"),function(a){if(a.getAttribute("href")==p){a.classList.add("on");a.setAttribute("aria-current","page")}});
try{var sl=localStorage.getItem("ilg_lang");if(sl&&sl!="en"){$("lang").value=sl;$("lang").onchange()}}catch(e){}
var hm=location.hash.match(/^#d(\d+)$/);if(hm&&HAS("dgrid"))setTimeout(function(){goCard(+hm[1])},300)})();
