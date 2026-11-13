const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const storage=new Map(),elements=new Map(),handlers={};
function element(key){if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',hidden:true,focus(){},classList:{add(){},remove(){}},querySelector(){return element('error');},querySelectorAll(){return [];}});return elements.get(key);}
const context=vm.createContext({console,Intl,Date,structuredClone,crypto:require('node:crypto').webcrypto,setTimeout(){},clearTimeout(){},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
 document:{querySelector:element,querySelectorAll:()=>[],activeElement:{focus(){}},addEventListener:(type,fn)=>handlers[type]=fn},window:{addEventListener(){}},
 FormData:class{constructor(form){this.fields=form.fields;}get(k){return this.fields[k]??null;}has(k){return k in this.fields;}}
});
for(const file of ['shared.js','access.js','courier-core.js','owner-insights.js','owner.js'])vm.runInContext(fs.readFileSync(__dirname+'/dist/'+file,'utf8'),context);
const run=s=>vm.runInContext(s,context);let checks=0;
function check(name,fn){fn();checks++;console.log('PASS '+name);}
function submit(id,fields,dataId=''){const error=element('error');error.textContent='';handlers.submit({preventDefault(){},target:{id,fields,dataset:{id:dataId},reportValidity(){return true;},querySelector(){return error;}}});return error.textContent;}
check('Eight owner sections render',()=>{for(const v of ['overview','branches','orders','finance','dishes','daily','team','settings']){run(`view='${v}';render()`);assert(element('#main').innerHTML.length>500);assert(!element('#main').innerHTML.includes('undefined'));}});
check('Owner and seller share initial revenue and commission',()=>{assert.equal(run('summary().sales'),123000);assert.equal(run('summary().fee'),14760);assert(storage.has('teztaom-seller-v1'));});
check('Branch creation preserves seller data and weekly schedule',()=>{assert.equal(submit('branch-form',{name:'Chilonzor',address:'Chilonzor, 10',active:'on'}),'');assert.equal(run('state.branches.length'),2);assert.equal(run('state.branches[1].schedule.length'),7);assert.equal(run('state.products.length'),6);});
check('Staff gets standard permissions and persists',()=>{assert.equal(submit('staff-form',{name:'Test menejer',phone:'+998 90 123 45 67',role:'Menejer',branchId:'b1'}),'');assert.equal(run('state.staff.at(-1).permissions.length'),7);assert.equal(JSON.parse(storage.get('teztaom-seller-v1')).staff.length,4);});
check('Expense affects selected finance totals',()=>{assert.equal(submit('expense-form',{name:'Mahsulot xarajati',amount:'10000',date:new Date().toISOString().slice(0,10),branch:'b1'}),'');assert.equal(run('summary().cost'),10000);assert.equal(run('summary().net'),98240);});
check('Branch filter excludes other branch orders and expenses',()=>{run("branchFilter=state.branches[1].id");assert.equal(run('selectedOrders().length'),0);assert.equal(run('summary().cost'),0);run("branchFilter='all'");});
check('Invalid expense rejected without storage mutation',()=>{const before=storage.get('lazzat-owner-costs-v1');assert(submit('expense-form',{name:'Bad',amount:'-10',date:'2026-11-13',branch:'b1'}));assert.equal(storage.get('lazzat-owner-costs-v1'),before);});
check('Latest seller updates survive owner writes',()=>{const s=JSON.parse(storage.get('teztaom-seller-v1'));s.orders[0].status='completed';s.orders[0].completed=Date.now();storage.set('teztaom-seller-v1',JSON.stringify(s));run('mutate(s=>s.branches[0].active=false)');assert.equal(run('summary().sales'),209000);assert.equal(run('state.orders[0].status'),'completed');});
check('Quota failure leaves existing storage intact',()=>{const before=storage.get('teztaom-seller-v1');run('localStorage.setItem=()=>{throw Error("Quota")}');assert(submit('branch-form',{name:'Not saved',address:'Test',active:'on'}));assert.equal(storage.get('teztaom-seller-v1'),before);});
console.log(`${checks} owner checks passed. Browser visual verification was unavailable.`);
