const $=s=>document.querySelector(s),app=$('#app');
const watermark=document.querySelector('header img').cloneNode();
watermark.className='watermark';watermark.alt='';watermark.setAttribute('aria-hidden','true');document.body.append(watermark);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* >>> PASTE your Apps Script Web App URL (ends with /exec) between the quotes <<< */
const API_URL='https://script.google.com/macros/s/AKfycbw4MODM7fum_PfhwgChNiVUAGjTychbJqacyEzVuVczXSlU-ObYJ9q9jCBwtX4_oSbvbw/exec';
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
const S={u:'',p:'',role:'',hubs:{},data:[],tab:'ov',f:{t:'',c:'',q:''}};
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const msg=e=>esc((e&&e.message||String(e)).replace(/^Error:\s*/,''));

function loginView(){
 $('#hr').innerHTML='';
 app.innerHTML=`<div class="card login"><h2>Welcome back</h2><p class="login-intro">Sign in to manage Shadowfax operations requests.</p>
 <label>Login ID</label><input id="u" type="email" autocomplete="username">
 <label>Password</label><input id="p" type="password" autocomplete="current-password">
 <div class="err" id="e"></div><button id="go" style="width:100%;margin-top:8px">Login</button></div>`;
 const go=async()=>{const b=$('#go');b.disabled=true;$('#e').textContent='';
  try{const u=$('#u').value.trim(),p=$('#p').value,r=await api('login',u,p);
   if(!r){$('#e').textContent='Invalid ID or password';b.disabled=false;return}
   Object.assign(S,{u,p,role:r});S.hubs=mergeHubs(await api('getHubs',u,p));
   $('#hr').innerHTML=`<span>${r==='admin'?'Admin · Control Tower':'Ground Team'}</span><button class="o" onclick="location.reload()">Logout</button>`;
   r==='admin'?await adminLoad():userView();
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
 app.innerHTML=`<div class="card"><h2>${t}</h2><div class="grid">
 <div><label>Date</label><input id="date" type="date" value="${today()}"></div>
 <div><label>City Name</label><select id="city"><option value="">Select city</option>${cities.map(c=>`<option>${esc(c)}</option>`).join('')}</select></div>
 ${bulk?'':'<div><label>TL Name</label><input id="tl"></div>'}
 <div><label>Store name</label><select id="store"><option value="">Select city first</option></select></div>
 <div><label>Order ID</label><input id="oid"></div>
 ${bulk?`<div><label>Secondary rider ID</label><input id="rider"></div>
 <div><label>No. of Bags quantity</label><input id="bags" type="number" min="1"></div>`
 :`<div><label>Request</label><input value="${t}" readonly></div>`}
 </div>
 ${bulk?'':'<label>Reason</label><textarea id="reason" rows="3"></textarea>'}
 <label>Photo attachment${bulk?'':' (optional)'}</label><input id="file" type="file" accept="image/*">
 <div class="err" id="e"></div>
 <div style="display:flex;gap:10px;margin-top:10px"><button id="sub">Submit</button><button class="o" id="bk">Back</button></div></div>`;
 $('#bk').onclick=()=>userView();
 $('#city').onchange=e=>{const h=(S.hubs[e.target.value]||[]).slice().sort();
  $('#store').innerHTML='<option value="">Select store</option>'+h.map(x=>`<option>${esc(x)}</option>`).join('')};
 $('#sub').onclick=async()=>{
  const v=id=>($('#'+id)?$('#'+id).value.trim():''),err=$('#e');err.textContent='';
  const d={date:v('date'),city:v('city'),store:v('store'),orderId:v('oid'),tl:v('tl'),reason:v('reason'),rider:v('rider'),bags:v('bags')};
  const need=bulk?['date','city','store','orderId','rider','bags']:['date','city','tl','store','orderId','reason'];
  if(need.some(k=>!d[k]))return err.textContent='Please fill all required fields';
  const f=$('#file').files[0];
  if(bulk&&!f)return err.textContent='Photo attachment is required';
  if(f&&f.size>8e6)return err.textContent='Photo must be under 8 MB';
  const b=$('#sub');b.disabled=true;b.textContent='Submitting…';
  try{let file=null;
   if(f)file=await new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok({name:f.name,mime:f.type||'image/jpeg',data:r.result.split(',')[1]});r.onerror=no;r.readAsDataURL(f)});
   await api('submitRequest',S.u,S.p,t,d,file);userView(`✓ ${esc(t)} request submitted for Order ${esc(d.orderId)}`);
  }catch(x){err.innerHTML=msg(x);b.disabled=false;b.textContent='Submit'}};
}

/* ---------- Admin ---------- */
async function adminLoad(){S.data=await api('adminData',S.u,S.p);adminView()}
function adminView(){
 const tabs=[['ov','Overview'],['rq','All Requests'],['hb','Cities & Hubs']];
 app.innerHTML=`<div class="tabs">${tabs.map(([k,n])=>`<button class="${S.tab===k?'on':''}" data-k="${k}">${n}</button>`).join('')}
 <button class="o" id="rf" style="margin-left:auto">↻ Refresh</button></div><div id="pane"></div>`;
 app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.k;adminView()});
 $('#rf').onclick=async()=>{try{S.hubs=mergeHubs(await api('getHubs',S.u,S.p));await adminLoad()}catch(x){alert(msg(x))}};
 ({ov:overview,rq:requests,hb:hubsPane})[S.tab]();
}
function tally(keyFn){const m={};S.data.forEach(r=>{const k=keyFn(r);(m[k.join('|')]=m[k.join('|')]||{k,n:{},tot:0});m[k.join('|')].n[r.t]=(m[k.join('|')].n[r.t]||0)+1;m[k.join('|')].tot++});return Object.values(m)}
function overview(){
 const cnt=t=>S.data.filter(r=>r.t===t).length;
 const th=TYPES.map(t=>`<th>${t}</th>`).join(''),cells=r=>TYPES.map(t=>`<td>${r.n[t]||0}</td>`).join('');
 const city=tally(r=>[r.city]).sort((a,b)=>b.tot-a.tot),store=tally(r=>[r.city,r.store]).sort((a,b)=>b.tot-a.tot);
 $('#pane').innerHTML=`<div class="stats"><div class="stat"><b>${S.data.length}</b><span>Total requests</span></div>
 ${TYPES.map(t=>`<div class="stat"><b>${cnt(t)}</b><span>${t}</span></div>`).join('')}</div>
 <section class="card table-card"><div class="dash-heading"><div><h3>City-wise requests received</h3><p>Request volume grouped by city and request type</p></div></div>
 <div class="tw"><table><thead><tr><th>City</th>${th}<th>Total</th></tr></thead><tbody>
 ${city.map(r=>`<tr><td class="city-cell">${esc(r.k[0])}</td>${cells(r)}<td class="total-cell">${r.tot}</td></tr>`).join('')||'<tr><td class="table-empty" colspan="6">No requests yet</td></tr>'}</tbody></table></div></section>
 <section class="card table-card"><div class="dash-heading"><div><h3>Store-wise requests received</h3><p>Request volume grouped by store location</p></div></div>
 <div class="tw"><table><thead><tr><th>City</th><th>Store</th>${th}<th>Total</th></tr></thead><tbody>
 ${store.map(r=>`<tr><td>${esc(r.k[0])}</td><td class="city-cell">${esc(r.k[1])}</td>${cells(r)}<td class="total-cell">${r.tot}</td></tr>`).join('')||'<tr><td class="table-empty" colspan="7">No requests yet</td></tr>'}</tbody></table></div></section>`;
}
function requests(){
 const cities=[...new Set(S.data.map(r=>r.city))].sort();
 $('#pane').innerHTML=`<div class="card"><h3>All requests</h3><div class="bar">
 <select id="ft"><option value="">All request types</option>${TYPES.map(t=>`<option ${S.f.t===t?'selected':''}>${t}</option>`).join('')}</select>
 <select id="fc"><option value="">All cities</option>${cities.map(c=>`<option ${S.f.c===c?'selected':''}>${esc(c)}</option>`).join('')}</select>
 <input id="fq" placeholder="Search order ID / store / TL" value="${esc(S.f.q)}"></div><div class="tw" id="tb"></div></div>`;
 const draw=()=>{const q=S.f.q.toLowerCase();
  const rows=S.data.filter(r=>(!S.f.t||r.t===S.f.t)&&(!S.f.c||r.city===S.f.c)&&(!q||[r.orderId,r.store,r.tl,r.rider].join(' ').toLowerCase().includes(q))).reverse();
  $('#tb').innerHTML=`<p class="mut">${rows.length} request(s)</p><table><tr><th>Type</th><th>Date</th><th>City</th><th>TL</th><th>Store</th><th>Order ID</th><th>Reason / Rider · Bags</th><th>Photo</th><th></th></tr>
  ${rows.map((r,i)=>`<tr><td>${r.t}</td><td>${esc(r.date)}</td><td>${esc(r.city)}</td><td>${esc(r.tl||'-')}</td><td>${esc(r.store)}</td><td>${esc(r.orderId)}</td>
  <td>${r.t==='Bulk Order'?esc(r.rider)+' · '+esc(r.bags)+' bags':esc(r.reason)}</td>
  <td>${r.photo?`<a href="${esc(r.photo)}" target="_blank">View</a>`:'-'}</td><td><button class="d" data-i="${S.data.indexOf(r)}">Delete</button></td></tr>`).join('')}</table>`;
  $('#tb').querySelectorAll('.d').forEach(b=>b.onclick=async()=>{const r=S.data[b.dataset.i];
   if(!confirm(`Delete ${r.t} request for Order ${r.orderId}? This also removes the row from the sheet.`))return;
   b.disabled=true;try{await api('deleteRequest',S.u,S.p,r.t,r.row,r.orderId);await adminLoad()}catch(x){alert(msg(x));b.disabled=false}})};
 $('#ft').onchange=e=>{S.f.t=e.target.value;draw()};$('#fc').onchange=e=>{S.f.c=e.target.value;draw()};
 $('#fq').oninput=e=>{S.f.q=e.target.value;draw()};draw();
}
function hubsPane(){
 const cities=Object.keys(S.hubs).sort();
 const total=cities.reduce((a,c)=>a+S.hubs[c].length,0);
 $('#pane').innerHTML=`<div class="hub-layout"><section class="card hub-form"><h3>Add City / Hub</h3>
 <label for="nc">City Name</label><input id="nc" list="cl" placeholder="Existing or new city"><datalist id="cl">${cities.map(c=>`<option value="${esc(c)}">`).join('')}</datalist>
 <label for="nh">Hub Name</label><input id="nh" placeholder="e.g. AMD_Motera_ANow_TEA2">
 <div class="err" id="e"></div><button class="add-button" id="ah">Add</button></section>
 <section class="card hub-directory"><div class="hub-directory-head"><h3>Cities &amp; hubs</h3><span class="hub-count">${cities.length} cities · ${total} hubs</span></div>
 <div class="hub-list">${cities.map(c=>`<details class="hub-item"><summary>${esc(c)} <span>(${S.hubs[c].length})</span></summary>
 <div class="hub-names">${S.hubs[c].map(h=>`<span class="hub-name">${esc(h)}</span>`).join('')}</div></details>`).join('')}</div></section></div>`;
 $('#ah').onclick=async()=>{const b=$('#ah');b.disabled=true;$('#e').textContent='';
  try{S.hubs=mergeHubs(await api('addHub',S.u,S.p,$('#nc').value,$('#nh').value));hubsPane()}catch(x){$('#e').innerHTML=msg(x);b.disabled=false}};
  }
loginView();
