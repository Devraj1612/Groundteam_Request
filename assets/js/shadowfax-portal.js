const $=s=>document.querySelector(s),app=$('#app');
const logo=document.querySelector('header img');
const favicon=document.createElement('link');
favicon.rel='icon';
favicon.type='image/png';
favicon.href='assets/img/company-favicon.png?v=2';
document.head.append(favicon);
const watermark=logo.cloneNode();
watermark.className='watermark';watermark.alt='';watermark.setAttribute('aria-hidden','true');document.body.append(watermark);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* >>> PASTE your Apps Script Web App URL (ends with /exec) between the quotes <<< */
const API_URL='https://script.google.com/macros/s/AKfycbxsMIgVpgHMNOif8RhPos4d29HmUwRu8vf5m2-ncxtqW9pXYDCdhUOzfCQauUoEdmTs8g/exec';
const api=async(fn,...a)=>{
 if(!/^https:\/\/script\.google(usercontent)?\.com\//.test(API_URL))throw new Error('API_URL is not set in this HTML file');
 const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({fn,args:a})});
 const j=await r.json();if(j.error)throw new Error(j.error);return j.data};
const TYPES=['Order Cancellation','Manual Mark Deliver','Manual Mark Undelivered','Bulk Order'];
const DEFAULT_HUBS={
 Ahmedabad:['AMD_Bhagoddt_ANow_TEC1','AMD_Chenpur_ANow_TEA6','AMD_Motera_ANow_TEA2','AMD_PramukhPraise_ANow_TED1','AMD_RealtoVavol_ANow_TED4','AMD_SahpurBridge_ANow_TEC9','AMD_Saibabatemple_ANow_TEA9','AMD_Solaoverbridge_ANow_TEA3','AMD_SouthBopal_ANow_TEC6','AMD_SterlingCity_ANow_TED2'],
 Bengaluru:['AMZ_NOW_TEST_2','BLR_Agara_ANow_TBF8','BLR_AnnapoorneshwariNagar_ANow_TBW1','BLR_AttibeleHobli_ANow_TBV1','BLR_Banaswadi_ANow_TBW5','BLR_Begurhobli_ANow_TBX1','BLR_Channasandra_ANow_TBS9','BLR_Channasandra_ANow_TBY5','BLR_Doddakallasandra_ANow_TBP9','BLR_DoddanekkundiMainRd_ANow_TBX2','BLR_Domlur_ANow_TBV9','BLR_Jayanagar_ANow_TBS8','BLR_Junnasandra_ANow_TBW6','BLR_kaggadasapura_ANow_TBJ4','BLR_MarigowdaRoad_ANow_TBW8','BLR_MMPalya_ANow_TBW9','BLR_Muddinapalya_ANow_TBX9','BLR_Nyappanahalli_ANow_TBW7','BLR_Sagayapuram_ANow_TBW3','BLR_Sidedahalli_ANow_TBW4','BLR_UttarahalliHobli_ANow_TBV8','BLR_VarthurHobli_ANow_TBV2','BLR_Yelahanka_ANow_TBT9','BLR_YelahankaHobli,ANow_TBU1'],
 Chandigarh:['CHA_AjitSinghNagar_ANow_TOB6','CHA_Mohali_ANow_TOB1','CHA_Punchkula_ANow_TOA9'],
 Chennai:['CHN_Anujannagar_ANow_TCD2','CHN_Arasanakalani_ANow_TCE3','CHN_Athipattu_ANow_TCC7','CHN_BalajiNagar_ANow_TCE5','CHN_DevarajNagar_ANow_TCF5','CHN_EKestate_ANow_TCE2','CHN_KamarajAvenue_ANow_TCC3','CHN_KannigaPuram_ANow_TCE6','CHN_KarumariammanNagar_ANow_TCG8','CHN_Kattupakkam_ANow_TCC4','CHN_Kodambakkam_ANow_TCF9','CHN_Korattur_ANow_TCB5','CHN_Madhavaram_ANow_TCE4','CHN_Maraimalainagar_ANow_TCH7','CHN_Medavakkam_ANow_TCB2','CHN_Mugalivakkam_ANow_TCD7','CHN_NatesanRoad_ANow_TCB7','CHN_Nolambur_ANow_TCB4','CHN_OMRNavalur_ANow_TCD6','CHN_Ponniammanmedu_ANow_TCF3','CHN_Purasaiwakkam_ANow_TCC8','CHN_RamNagar_ANow_TCE1','CHN_Revathipuram_ANow_TCF6','CHN_Royapettah_ANow_TCF7','CHN_SarathyNagar_ANow_TCE9','CHN_Teynampetsignal_ANow_TCG1','CHN_Thirumullaivayal_ANow_TCD8','CHN_Tiruvallur_TCF8','CHN_Tondiarpet_ANow_TCG3','CHN_Venkatapuram_ANow_TCB6'],
 Delhi:['NCR_AmberhaiVillage_ANow_TDP2','NCR_AmritVihar_ANow_TDM7','NCR_AnarkaliShahdara_ANow_TDV5','NCR_Badshahpur_ANow_TSB2','NCR_BandhuGuptaRd_Anow_TDP3','NCR_BuddhaNagar_ANow_TZC2','NCR_Burati_ANow_TDD1','NCR_Daryaganj_ANow_TDP1','NCR_Kakrola_ANow_TDM4','NCR_KhanpurRd_ANow_TDI1','NCR_MaidanGarhi_ANow_TDP6','NCR_Mangolpuri_ANow_TDP4','NCR_Meharulidt_ANow_TDO3','NCR_Narela_ANow_TDJ3','NCR_NebSarai_ANow_TDA8','NCR_NewFriendsColony_ANow_TDB4','NCR_PalamColony_ANow_TDL9','NCR_Pargana_ANow_TZC5','NCR_Pitampura_ANow_TDN2','NCR_PremNagar_ANow_TDM1','NCR_Rithala_ANow_TDM6','NCR_Rohinidt_ANow_TDM3','NCR_Saidulajab_ANow_TDO4','NCR_Samaspur_ANow_TDO5','NCR_SaraiMarket_ANow_TSF6','NCR_ShriRamNagar_ANow_TDO8','NCR_Tughlakabad_ANow_TDJ1','NCR_UttamNagar_ANow_TDL6','NCR_VasantKunj_ANow_TDD2','NCR_WestPatelNgr_ANow_TDO7'],
 Faridabad:['NCR_Faridabad_ANow_TFB1','NCR_MathurRoad_ANow_TFB5','NCR_NITRailwayRoad_ANow_TFA8'],
 Ghaziabad:['NCR_Indrapuram_ANow_TZA4','NCR_Mohannagar_ANow_TZA2'],
 Gurgaon:['NCR_Carterpuri_Anow_TFA2','NCR_Chauma_ANow_TFA5','NCR_IMTManesar_ANow_TDK8','NCR_NavadaFatehpur_ANow_TFA3','NCR_Ramagarden_ANow_TDJ7','NCR_SaraswatiKunj_ANow_TFB4','NCR_SuryaVihar_ANow_TDJ8'],
 Hyderabad:['HYD_Alwal_ANow_TTE3','HYD_Boduppal_ANow_TTB7','HYD_BowenpallyCircle_ANow_TTD6','HYD_Dammaiguda_ANow_TTE6','HYD_Greenhills_ANow_TTC8','HYD_Hayathnagar_ANow_TTE1','HYD_IzzatNagar_ANow_TTB4','HYD_Khanamet_ANow_TTB6','HYD_Malkajgiricircle_ANow_TTA9','HYD_MarredpallyWest_ANow_TTE7','HYD_MedipallyMondal_ANow_TTD7','HYD_Mirchowk_ANow_TTD4','HYD_Moosapet_ANow_TTA5','HYD_Nagole_ANow_TTC5','HYD_RangaReddydt_ANow_TTB9','HYD_RRdist_ANow_TTB8','HYD_Secunderabad_ANow_TTB2','HYD_ShapurNagar_ANow_TTE2','HYD_Uppal_ANow_TTB1'],
 Jaipur:['JAI_Adarshnagar_ANow_TJB3','JAI_ChandanBadi_ANow_TJB8','JAI_GaitorRoad_ANow_TJB6','JAI_Gopalpura_ANow_TJA1','JAI_Jagatpura_ANow_TJA3','JAI_Murlipura_ANow_TJA7','JAI_ShastriNagar_ANow_TJB5','JAI_TonkPhatak_ANow_TJB2'],
 Kanpur:['KAN_Bansmandi_ANow_TZC4'],
 Kolkata:['KOL_GirindraShekharRd_ANow_TKE4','KOL_NorthPargana_ANow_TKD4','KOL_RegentPearl_ANow_TKD8','KOL_Shibpur_ANow_TKE6'],
 Lucknow:['LKO_Chinhat_ANow_TLB9','LKO_Mahanagar_ANow_TLB6','LKO_MeerabaiMarg_ANow_TLC3','LKO_Rajajipuram_ANow_TLB5','LKO_SitapurRd_ANow_TLC6','LKO_Vrindavan_ANow_TLB4'],
 Meerut:['NCR_Bagpatroad_ANow_TZB4','NCR_GangaNagar_ANow_TZB9','NCR_Pallavapuram_ANow_TZB3','NCR_Sharadhapuri_ANow_TLC5','NCR_Vedvyaspuri_ANow_TZA9','NCR_Yojana_ANow_TZA7'],
 Mumbai:['BOM_Borivali_ANow_TMJ9','BOM_Dahisareast_ANow_TML4','BOM_Dahisarwest_ANow_TML3','BOM_JogeshwariEast_ANow_TML2','BOM_VasaiEast_ANow_TMO7','MUM_AmbernarthWest_ANow_TMQ1','MUM_BapatMarg_ANow_TMQ9','MUM_Cholegaon_ANow_TMQ4','MUM_DombivaliEast_ANow_TMP3','MUM_Gundavali_ANow_TMF2','MUM_KalyanWest_ANow_TMP7','MUM_Kamothe_ANow_TMA9','MUM_LBSRoad_ANow_TMR5','MUM_MadhubanChowk_ANow_TMP2','MUM_Sakinaka_ANow_TMJ8','MUM_Sewri_ANow_TMR6','MUM_Shilfataroad_ANow_TMO6','MUM_Siddarthnagar_ANow_TMR1','MUM_SionFort_ANow_TMH8','MUM_SVRoad_ANow_TMS3','MUM_ThaneW_ANow_TMO5','MUM_Ulwe_ANow_TMR3','MUM_Vashi_ANow_TMR7'],
 Noida:['NCR_Barola_ANow_TZB6','NCR_Buddhanagar_ANow_TNF7','NCR_Buddhanagar_ANow_TNG9','NCR_BuddhaNagar_ANow_TZC1'],
 Pune:['PUN_IdealColony_ANow_TPH9','PUN_ModelColony_Anow_TPH8','PUN_Talhaveli_ANow_TPC9','PUN_Tathawade_ANow_TPC4']
};
const mergeHubs=remote=>{
 const hubs=Object.fromEntries(Object.entries(remote||{}).map(([city,list])=>[city,Array.isArray(list)?list.slice():[]]));
 Object.entries(DEFAULT_HUBS).forEach(([city,list])=>{
  hubs[city]=[...new Set([...(list||[]),...(hubs[city]||[])])];
 });
 return hubs;
};
const dateString=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>dateString(new Date());
const dateOffset=days=>{const d=new Date();d.setDate(d.getDate()+days);return dateString(d)};
const S={u:'',p:'',role:'',hubs:{},data:[],tab:'an',analysis:'today',customStart:dateOffset(-6),customEnd:today(),storeCity:'',f:{t:'',c:'',q:''}};
let autoRefreshTimer=null,countdownTimer=null,nextRefreshAt=0,refreshInProgress=false;
const refreshInterval=10*60*1000;
const msg=e=>esc((e&&e.message||String(e)).replace(/^Error:\s*/,''));

function loginView(){
 $('#hr').innerHTML='';
 app.innerHTML=`<div class="login-wrap"><section class="login-banner"><span class="login-kicker">SHADOWFAX · OPERATIONS</span>
 <h1>Every request,<br>moving forward.</h1><p>A clearer way to manage ground operations requests and stay on top of the day.</p>
 <div class="login-badge"><span class="login-badge-dot"></span> Ground operations portal</div></section>
 <div class="card login"><div class="login-mark">SF <span>PORTAL</span></div><h2>Welcome back</h2><p class="login-intro">Sign in to continue to your workspace.</p>
 <label for="u">Login ID</label><input id="u" type="email" autocomplete="username" placeholder="name@company.com">
 <label for="p">Password</label><input id="p" type="password" autocomplete="current-password" placeholder="Enter your password">
 <div class="err" id="e" role="alert"></div><button id="go" style="width:100%;margin-top:8px">Sign in <span aria-hidden="true">→</span></button>
 <p class="login-footnote">Secure access for authorized team members</p></div></div>`;
 const go=async()=>{const b=$('#go');b.disabled=true;$('#e').textContent='';
  try{const u=$('#u').value.trim(),p=$('#p').value,r=await api('login',u,p);
   if(!r){$('#e').textContent='Invalid ID or password';b.disabled=false;return}
   Object.assign(S,{u,p,role:r});S.hubs=mergeHubs(await api('getHubs',u,p));
   $('#hr').innerHTML=`<span>${r==='admin'?'Admin · Control Tower':r==='viewer'?'Admin · View only':'Ground Team'}</span><button class="o" onclick="location.reload()">Logout</button>`;
   if(r==='admin'||r==='viewer'){await adminLoad();startAutoRefresh()}
   else userView();
  }catch(x){$('#e').innerHTML=msg(x);b.disabled=false}};
 $('#go').onclick=go;$('#p').onkeydown=e=>{if(e.key==='Enter')go()};
}

/* ---------- Request form (ground team) ---------- */
function userView(note){
 app.innerHTML=`${note?`<div class="ok">${note}</div>`:''}<section class="request-intro"><p class="eyebrow">Shadowfax · Ground operations</p><h1>Request portal</h1><p>Choose a request workflow to get started.</p></section><div class="card"><h2>Select request type</h2>
 <div class="types">${TYPES.map(t=>`<button class="type" data-t="${t}">${t}</button>`).join('')}</div></div>`;
 app.querySelectorAll('.type').forEach(b=>b.onclick=()=>formView(b.dataset.t));
}
function formView(t){
 const bulk=t==='Bulk Order',cities=Object.keys(S.hubs).sort();
 app.innerHTML=`<div class="card"><h2>${t}</h2><form id="requestForm"><div class="grid">
 <div><label for="date">Date*</label><input id="date" type="date" value="${today()}" required></div>
 <div><label for="city">City Name*</label><select id="city" required><option value="">Select city</option>${cities.map(c=>`<option>${esc(c)}</option>`).join('')}</select></div>
 <div><label for="tl">TL Name*</label><input id="tl" required></div>
 <div><label for="store">Store name*</label><select id="store" required><option value="">Select city first</option></select></div>
 <div><label for="oid">Order ID*</label><input id="oid" required></div>
 <div><label for="request">Request*</label><input id="request" value="${esc(t)}" readonly required></div>
 </div>
 <label for="reason">Reason*</label><textarea id="reason" rows="3" required></textarea>
 ${bulk?'<label for="rider">Secondary rider ID*</label><input id="rider" required><label for="bags">No. of Bags quantity*</label><input id="bags" type="number" min="1" required>':''}
 <label for="file">Proof attachment* (audio, photo or video)</label><input id="file" type="file" accept="image/*,audio/*,video/*" required>
 <div class="err" id="e"></div>
 <div style="display:flex;gap:10px;margin-top:10px"><button id="sub" type="submit">Submit</button><button class="o" id="bk" type="button">Back</button></div></form></div>`;
 $('#bk').onclick=()=>userView();
 $('#city').onchange=e=>{const h=(S.hubs[e.target.value]||[]).slice().sort();
  $('#store').innerHTML='<option value="">Select store</option>'+h.map(x=>`<option>${esc(x)}</option>`).join('')};
 $('#requestForm').onsubmit=async event=>{
  event.preventDefault();
  const v=id=>($('#'+id)?$('#'+id).value.trim():''),err=$('#e');err.textContent='';
  const d={date:v('date'),city:v('city'),store:v('store'),orderId:v('oid'),tl:v('tl'),reason:v('reason'),rider:v('rider'),bags:v('bags')};
  const need=bulk?['date','city','tl','store','orderId','reason','rider','bags']:['date','city','tl','store','orderId','reason'];
  if(need.some(k=>!d[k]))return err.textContent='Please fill all required fields';
  const f=$('#file').files[0];
  if(!f)return err.textContent='Proof attachment is required';
  if(f.type&&!/^(image|audio|video)\//.test(f.type))return err.textContent='Proof attachment must be an audio, photo or video file';
  if(f.size>8e6)return err.textContent='Proof attachment must be under 8 MB';
  const b=$('#sub');b.disabled=true;b.textContent='Submitting…';
  try{let file=null;
   if(f)file=await new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok({name:f.name,mime:f.type||'application/octet-stream',data:r.result.split(',')[1]});r.onerror=no;r.readAsDataURL(f)});
   await api('submitRequest',S.u,S.p,t,d,file);userView(`✓ ${esc(t)} request submitted for Order ${esc(d.orderId)}`);
  }catch(x){err.innerHTML=msg(x);b.disabled=false;b.textContent='Submit'}};
}

/* ---------- Admin ---------- */
async function adminLoad(){S.data=await api('adminData',S.u,S.p);adminView()}
function startAutoRefresh(){
 if(countdownTimer)clearInterval(countdownTimer);
 scheduleNextRefresh();
 countdownTimer=setInterval(updateRefreshCountdown,1000);
}
function scheduleNextRefresh(){
 if(autoRefreshTimer)clearTimeout(autoRefreshTimer);
 nextRefreshAt=Date.now()+refreshInterval;
 autoRefreshTimer=setTimeout(refreshAdmin,refreshInterval);
 updateRefreshCountdown();
}
function updateRefreshCountdown(){
 const countdown=$('#nextRefresh');
 if(!countdown||!nextRefreshAt)return;
 const remaining=Math.max(0,Math.ceil((nextRefreshAt-Date.now())/1000));
 const minutes=String(Math.floor(remaining/60)).padStart(2,'0');
 const seconds=String(remaining%60).padStart(2,'0');
 countdown.textContent=`Next refresh in ${minutes}:${seconds}`;
}
async function refreshAdmin(){
 if(refreshInProgress)return;
 refreshInProgress=true;
 const button=$('#rf');
 if(button){button.disabled=true;button.textContent='Refreshing…'}
 try{
  const data=await api('adminData',S.u,S.p);
  const hubs=S.tab==='hb'?mergeHubs(await api('getHubs',S.u,S.p)):null;
  S.data=data;
  if(hubs)S.hubs=hubs;
  adminView();
  $('#refreshStatus').textContent=`Last refreshed at ${new Date().toLocaleTimeString()}`;
 }catch(x){
  const currentStatus=$('#refreshStatus');
  if(currentStatus)currentStatus.textContent='Refresh failed: '+msg(x);
 }finally{
  refreshInProgress=false;
  const currentButton=$('#rf');
  if(currentButton){currentButton.disabled=false;currentButton.textContent='↻ Refresh'}
  scheduleNextRefresh();
 }
}
function adminView(){
 const tabs=[['an','Report'],['ov','Overview'],['rq','All Requests'],['hb','Cities & Hubs']];
 app.innerHTML=`<div class="tabs">${tabs.map(([k,n])=>`<button class="${S.tab===k?'on':''}" data-k="${k}">${n}</button>`).join('')}
 <span id="refreshStatus" class="refresh-status" role="status" aria-live="polite"></span>
 <span id="nextRefresh" class="refresh-countdown" role="timer" aria-live="off"></span>
 <button class="o" id="rf" title="Automatically refreshes every 10 minutes">↻ Refresh</button></div><div id="pane"></div>`;
 app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.k;adminView()});
 $('#rf').onclick=refreshAdmin;
 updateRefreshCountdown();
 ({ov:overview,an:analysis,rq:requests,hb:hubsPane})[S.tab]();
}
function tally(keyFn,data=S.data){const m={};data.forEach(r=>{const k=keyFn(r),id=k.join('|');(m[id]=m[id]||{k,n:{},tot:0});m[id].n[r.t]=(m[id].n[r.t]||0)+1;m[id].tot++});return Object.values(m)}
function grandTotalRow(rows,labelColumns=1){
 const totals=TYPES.map(t=>rows.reduce((sum,row)=>sum+(row.n[t]||0),0));
 const total=totals.reduce((sum,value)=>sum+value,0);
 return `<tfoot><tr class="grand-total"><th colspan="${labelColumns}">Grand Total</th>${totals.map(value=>`<td>${value}</td>`).join('')}<td>${total}</td></tr></tfoot>`;
}
function analysisRange(){
 const date=today();
 if(S.analysis==='yesterday'){const d=dateOffset(-1);return {start:d,end:d,label:'D-1 · '+d}}
 if(S.analysis==='week'){
  const start=dateOffset(-6);
  return {start,end:date,label:`Last 1 week · ${start} to ${date}`}
 }
 if(S.analysis==='custom')return {start:S.customStart,end:S.customEnd,label:`Custom range · ${S.customStart} to ${S.customEnd}`};
 return {start:date,end:date,label:'Current day · '+date}
}
function overview(){
 const cnt=t=>S.data.filter(r=>r.t===t).length;
 const th=TYPES.map(t=>`<th>${t}</th>`).join(''),cells=r=>TYPES.map(t=>`<td>${r.n[t]||0}</td>`).join('');
 const city=tally(r=>[r.city]).sort((a,b)=>b.tot-a.tot);
 const storeCityOptions=[...new Set(S.data.map(r=>r.city).filter(Boolean))].sort();
 const renderStoreRows=()=>tally(r=>[r.city,r.store]).filter(r=>!S.storeCity||r.k[0]===S.storeCity).sort((a,b)=>b.tot-a.tot);
 $('#pane').innerHTML=`<div class="stats"><div class="stat"><b>${S.data.length}</b><span>All-time requests</span></div>
 ${TYPES.map(t=>`<div class="stat"><b>${cnt(t)}</b><span>${t}</span></div>`).join('')}</div>
 <section class="card table-card"><div class="dash-heading"><div><h3>City-wise requests received</h3><p>Request volume grouped by city and request type</p></div></div>
 <div class="tw"><table><thead><tr><th>City</th>${th}<th>Total</th></tr></thead><tbody>
 ${city.map(r=>`<tr><td class="city-cell">${esc(r.k[0])}</td>${cells(r)}<td class="total-cell">${r.tot}</td></tr>`).join('')||'<tr><td class="table-empty" colspan="6">No requests yet</td></tr>'}</tbody>${grandTotalRow(city)}</table></div></section>
 <section class="card table-card"><div class="dash-heading"><div><h3>Store-wise requests received</h3><p>Request volume grouped by store location</p></div>
 <label class="city-filter" for="storeCity">City<select id="storeCity"><option value="">All cities</option>${storeCityOptions.map(c=>`<option value="${esc(c)}" ${S.storeCity===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label></div>
 <div class="tw"><table><thead><tr><th>City</th><th>Store</th>${th}<th>Total</th></tr></thead><tbody id="storeTableBody"></tbody></table></div></section>`;
 const renderStoreTable=()=>{
  const rows=renderStoreRows();
  $('#storeTableBody').innerHTML=(rows.map(r=>`<tr><td>${esc(r.k[0])}</td><td class="city-cell">${esc(r.k[1])}</td>${cells(r)}<td class="total-cell">${r.tot}</td></tr>`).join('')||'<tr><td class="table-empty" colspan="7">No requests for this city</td></tr>')+grandTotalRow(rows,2);
 };
 $('#storeCity').onchange=e=>{S.storeCity=e.target.value;renderStoreTable()};
 renderStoreTable();
}
function analysis(){
 const {start,end,label}=analysisRange();
 const validRange=Boolean(start&&end&&start<=end);
 const periodData=validRange?S.data.filter(r=>r.date>=start&&r.date<=end):[];
 const typeCounts=TYPES.map(t=>({label:t,value:periodData.filter(r=>r.t===t).length}));
 const cities=tally(r=>[r.city],periodData).filter(r=>r.k[0]).sort((a,b)=>b.tot-a.tot);
 const shownCities=cities.slice(0,8).map(r=>({label:r.k[0],value:r.tot}));
 const chartRows=items=>{
  const max=Math.max(0,...items.map(item=>item.value));
  return items.map(item=>`<div class="chart-row"><span class="chart-label">${esc(item.label)}</span>
   <span class="chart-track"><span class="chart-fill" style="width:${max?item.value/max*100:0}%"></span></span>
   <b class="chart-value">${item.value}</b></div>`).join('')||'<p class="table-empty">No requests for this period</p>';
 };
 const th=TYPES.map(t=>`<th>${t}</th>`).join(''),cells=r=>TYPES.map(t=>`<td>${r.n[t]||0}</td>`).join('');
 const analysisCity=tally(r=>[r.city],periodData).sort((a,b)=>b.tot-a.tot);
 const analysisTypes=typeCounts.map(({label,value})=>`<div class="analysis-type"><b>${value}</b><span>${esc(label)}</span></div>`).join('');
 $('#pane').innerHTML=`<section class="card analysis-card"><div class="dash-heading"><div><span class="section-kicker">REQUEST TRENDS</span><h2>Analysis</h2><p>${esc(label)} · all request types</p></div>
 <div class="period-switch" role="group" aria-label="Analysis period">
 ${[['today','Today'],['yesterday','D-1'],['week','Last 1 week'],['custom','Custom dates']].map(([k,n])=>`<button type="button" class="${S.analysis===k?'on':''}" data-period="${k}">${n}</button>`).join('')}</div></div>
 <div class="date-range" ${S.analysis==='custom'?'':'hidden'}>
 <label for="analysisStart">From<input id="analysisStart" type="date" value="${esc(S.customStart)}" required></label>
 <label for="analysisEnd">To<input id="analysisEnd" type="date" value="${esc(S.customEnd)}" required></label>
 </div>
 ${validRange?'':'<p class="err" role="alert">Select both dates and make sure the start date is on or before the end date.</p>'}
 <div class="analysis-summary"><div class="analysis-total"><b>${periodData.length}</b><span>Requests in period</span></div><div class="analysis-types">${analysisTypes}</div></div>
 <div class="chart-grid">
 <section class="chart-card"><h3>Requests by type</h3><p>Volume for each request type in the selected period</p><div class="chart-rows">${chartRows(typeCounts)}</div></section>
 <section class="chart-card"><h3>Requests by city</h3><p>${cities.length>8?'Top 8 cities by request volume':'Request volume by city'}</p><div class="chart-rows">${chartRows(shownCities)}</div></section></div>
 <section class="analysis-breakdown"><div class="dash-heading"><div><h3>City breakdown</h3><p>Requests by city and request type</p></div></div>
 <div class="tw"><table><thead><tr><th>City</th>${th}<th>Total</th></tr></thead><tbody>
 ${analysisCity.map(r=>`<tr><td class="city-cell">${esc(r.k[0])}</td>${cells(r)}<td class="total-cell">${r.tot}</td></tr>`).join('')||'<tr><td class="table-empty" colspan="6">No requests for this period</td></tr>'}</tbody>${grandTotalRow(analysisCity)}</table></div></section></section>`;
 $('#pane').querySelectorAll('[data-period]').forEach(b=>b.onclick=()=>{S.analysis=b.dataset.period;analysis()});
 if(S.analysis==='custom'){
  $('#analysisStart').onchange=e=>{S.customStart=e.target.value;analysis()};
  $('#analysisEnd').onchange=e=>{S.customEnd=e.target.value;analysis()};
 }
}
function requests(){
 const cities=[...new Set(S.data.map(r=>r.city))].sort();
 $('#pane').innerHTML=`<div class="card"><h3>All requests</h3><div class="bar">
 <select id="ft"><option value="">All request types</option>${TYPES.map(t=>`<option ${S.f.t===t?'selected':''}>${t}</option>`).join('')}</select>
 <select id="fc"><option value="">All cities</option>${cities.map(c=>`<option ${S.f.c===c?'selected':''}>${esc(c)}</option>`).join('')}</select>
 <input id="fq" placeholder="Search order ID / store / TL" value="${esc(S.f.q)}"></div><div class="tw" id="tb"></div></div>`;
 const draw=()=>{const q=S.f.q.toLowerCase();
  const rows=S.data.filter(r=>(!S.f.t||r.t===S.f.t)&&(!S.f.c||r.city===S.f.c)&&(!q||[r.orderId,r.store,r.tl,r.rider].join(' ').toLowerCase().includes(q))).reverse();
  $('#tb').innerHTML=`<p class="mut">${rows.length} request(s)</p><table><tr><th>Type</th><th>Date</th><th>City</th><th>TL</th><th>Store</th><th>Order ID</th><th>Reason / Rider · Bags</th><th>Proof</th>${S.role==='admin'?'<th></th>':''}</tr>
  ${rows.map((r,i)=>`<tr><td>${r.t}</td><td>${esc(r.date)}</td><td>${esc(r.city)}</td><td>${esc(r.tl||'-')}</td><td>${esc(r.store)}</td><td>${esc(r.orderId)}</td>
  <td>${r.t==='Bulk Order'?esc(r.rider)+' · '+esc(r.bags)+' bags':esc(r.reason)}</td>
  <td>${r.photo?`<a href="${esc(r.photo)}" target="_blank" rel="noopener">View</a>`:'-'}</td>${S.role==='admin'?`<td><button class="d" data-i="${S.data.indexOf(r)}">Delete</button></td>`:''}</tr>`).join('')}</table>`;
  $('#tb').querySelectorAll('.d').forEach(b=>b.onclick=async()=>{const r=S.data[b.dataset.i];
   if(!confirm(`Delete ${r.t} request for Order ${r.orderId}? This also removes the row from the sheet.`))return;
   b.disabled=true;try{await api('deleteRequest',S.u,S.p,r.t,r.row,r.orderId);await adminLoad()}catch(x){alert(msg(x));b.disabled=false}})};
 $('#ft').onchange=e=>{S.f.t=e.target.value;draw()};$('#fc').onchange=e=>{S.f.c=e.target.value;draw()};
 $('#fq').oninput=e=>{S.f.q=e.target.value;draw()};draw();
}
function hubsPane(){
 const cities=Object.keys(S.hubs).sort();
 const total=cities.reduce((a,c)=>a+S.hubs[c].length,0);
 $('#pane').innerHTML=`<div class="hub-layout ${S.role==='admin'?'':'hub-readonly'}">${S.role==='admin'?`<section class="card hub-form"><h3>Add City / Hub</h3>
 <label for="nc">City Name</label><input id="nc" list="cl" placeholder="Existing or new city"><datalist id="cl">${cities.map(c=>`<option value="${esc(c)}">`).join('')}</datalist>
 <label for="nh">Hub Name</label><input id="nh" placeholder="e.g. AMD_Motera_ANow_TEA2">
 <div class="err" id="e"></div><button class="add-button" id="ah">Add</button></section>`:''}
 <section class="card hub-directory"><div class="hub-directory-head"><h3>Cities &amp; hubs</h3><span class="hub-count">${cities.length} cities · ${total} hubs</span></div>
 <div class="hub-list">${cities.map(c=>`<details class="hub-item"><summary>${esc(c)} <span>(${S.hubs[c].length})</span></summary>
 <div class="hub-names">${S.hubs[c].map(h=>`<span class="hub-name">${esc(h)}</span>`).join('')}</div></details>`).join('')}</div></section></div>`;
 if(S.role!=='admin')return;
 $('#ah').onclick=async()=>{const b=$('#ah');b.disabled=true;$('#e').textContent='';
  try{S.hubs=mergeHubs(await api('addHub',S.u,S.p,$('#nc').value,$('#nh').value));hubsPane()}catch(x){$('#e').innerHTML=msg(x);b.disabled=false}};
  }
loginView();
