const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const storage = new Map(), elements = new Map();
function element(key) { if (!elements.has(key)) elements.set(key, {innerHTML:'',textContent:'',hidden:true,addEventListener(){},classList:{add(){},remove(){}},focus(){}}); return elements.get(key); }
const context = vm.createContext({ console, Intl, Date, structuredClone, setTimeout(){}, clearTimeout(){}, setInterval(){}, crypto:require('node:crypto').webcrypto,
 localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},
 document:{querySelector:element,querySelectorAll:()=>[],addEventListener(){},activeElement:{}},window:{addEventListener(){},scrollTo(){}}
});
vm.runInContext(fs.readFileSync(__dirname+'/dist/app.js','utf8'),context);
const run = source => vm.runInContext(source,context);
let checks = 0;
function check(name,fn){fn();checks++;console.log('PASS '+name);}
check('All nine sections render',()=>{for(const id of ['orders','menu','clock','promo','wallet','chart','star','users','settings']){run(`page='${id}';render()`);assert(element('#main').innerHTML.length>500);assert(!element('#main').innerHTML.includes('undefined'));}});
check('Seed backup validates',()=>assert.equal(run('backupValid(seed())'),true));
check('New order accepts with preparation time',()=>{assert.equal(run("transition('1048','new','preparing',{accepted:Date.now(),prepTime:25})"),true);assert.equal(run("state.orders.find(o=>o.id==='1048').prepTime"),25);});
check('Duplicate accept is prevented',()=>assert.equal(run("transition('1048','new','preparing')"),false));
check('Preparing order is excluded from completed revenue',()=>assert.equal(run('financials(state.orders).sales'),123000));
check('Order moves to ready then completed',()=>{assert.equal(run("transition('1048','preparing','ready')"),true);assert.equal(run("transition('1048','ready','completed',{completed:Date.now()})"),true);assert.equal(run('financials(state.orders).sales'),209000);});
check('Order cannot complete twice',()=>assert.equal(run("transition('1048','ready','completed')"),false));
check('Reject excludes order from revenue',()=>{run("transition('1047','new','rejected',{reason:'Mahsulot qolmagan'})");assert.equal(run('financials(state.orders).sales'),209000);});
check('Commission matches row-level rounding',()=>{run('state.profile.commission=12.7');assert.equal(run('financials(state.orders).commission'),run("state.orders.filter(o=>o.status==='completed').reduce((s,o)=>s+Math.round(total(o)*.127),0)"));});
check('State persists and reloads',()=>{run('save()');assert.equal(run("load().orders.find(o=>o.id==='1048').status"),'completed');});
check('Quoted CSV with delimiters and line breaks',()=>assert.equal(run(`JSON.stringify(parseCSV(${JSON.stringify('nomi;kategoriya;narx;tavsif\r\n"Osh; maxsus";Milliy;38000;"Issiq\nmazali"')}))`),JSON.stringify([['nomi','kategoriya','narx','tavsif'],['Osh; maxsus','Milliy','38000','Issiq\nmazali']])));
check('CSV escaped quotes',()=>assert.equal(run(`parseCSV(${JSON.stringify('nomi,narx\n"""Mazali"" osh",38000')})[1][0]`),'"Mazali" osh'));
check('CSV rejects unclosed quoted fields',()=>assert.throws(()=>run(`parseCSV(${JSON.stringify('nomi,narx\n"osh,30000')})`)));
check('HTML escaping',()=>assert.equal(run(`esc('<script>"&')`),'&lt;script&gt;&quot;&amp;'));
check('CSV export protects formula injection',()=>assert(run(`csv([['=1+1']])`).includes("'=1+1")));
check('Invalid restore cannot pass validation',()=>{assert.equal(run('backupValid({version:1,orders:[]})'),false);assert.equal(run("(()=>{const s=seed();s.products[0].image='javascript:alert(1)';return backupValid(s)})()"),false);});
check('Persistence failure rolls back changes',()=>{const before=run('state.busy');run("localStorage.setItem=()=>{throw new Error('QuotaExceededError')}");assert.equal(run('update(s=>s.busy=!s.busy)'),false);assert.equal(run('state.busy'),before);});
console.log(`${checks} checks passed. Browser layout and native XLSX import require manual browser verification.`);
