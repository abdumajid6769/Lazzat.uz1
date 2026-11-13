const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
function setup(home=true,page='seller.html'){
 const storage=new Map(),session=new Map(),elements=new Map(),events={};let bar,reloaded=false;
 const get=q=>{if(!elements.has(q))elements.set(q,{innerHTML:'',textContent:''});return elements.get(q);};
 const context=vm.createContext({console,Intl,Date,crypto:require('node:crypto').webcrypto,
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},sessionStorage:{getItem:k=>session.get(k)||null,setItem:(k,v)=>session.set(k,v)},
 document:{querySelector:get,createElement:()=>({}),body:{classList:{contains:()=>home,add(){}},prepend:b=>bar=b}},
 window:{addEventListener:(type,fn)=>events[type]=fn},location:{pathname:'/'+page,reload(){reloaded=true;}}
 });
 for(const f of ['shared.js','access.js','suite.js'])vm.runInContext(fs.readFileSync(__dirname+'/dist/'+f,'utf8'),context);
 return {context,storage,session,elements,events,get,bar:()=>bar,reloaded:()=>reloaded,run:s=>vm.runInContext(s,context)};
}
let checks=0;function check(name,fn){fn();checks++;console.log('PASS '+name);}
check('All entry pages resolve local scripts, styles and links',()=>{for(const file of ['index.html','seller.html','owner.html','courier.html']){const html=fs.readFileSync(__dirname+'/dist/'+file,'utf8');for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){const url=match[1];if(/^[a-z]+:/i.test(url))continue;assert(fs.existsSync(path.join(__dirname,'dist',url)),file+' -> '+url);}assert(html.includes('suite.js'));assert(html.includes('suite.css'));}});
check('Hub reads seed without creating or replacing user data',()=>{const h=setup();assert.equal(h.storage.size,0);assert(h.get('#hub-stats').innerHTML.includes('<strong>6<small>'));assert(h.get('#hub-status').textContent.includes('Boshlang‘ich'));});
check('Hub refreshes shared delivery status without changing saved state',()=>{const h=setup();h.run("const s=seed();s.orders[0].delivery={status:'picked_up'};localStorage.setItem('teztaom-seller-v1',JSON.stringify(s));");const before=h.storage.get('teztaom-seller-v1');h.events.storage({key:'teztaom-seller-v1'});assert(h.get('#hub-stats').innerHTML.includes('<strong>1<small>'));assert.equal(h.storage.get('teztaom-seller-v1'),before);});
check('Hub respects assigned branch for selected demo staff',()=>{const h=setup();h.run("const s=seed();s.staff[1].branchId='other';localStorage.setItem('teztaom-seller-v1',JSON.stringify(s));chooseActor('s2',s)");h.events.pageshow();assert.equal((h.get('#hub-stats').innerHTML.match(/<strong>0<small>/g)||[]).length,4);});
check('Each panel highlights its route and keeps all three links',()=>{for(const file of ['seller.html','owner.html','courier.html']){const h=setup(false,file),html=h.bar().innerHTML;assert(html.includes('href="'+file+'" aria-current="page"'));for(const dest of ['seller.html','owner.html','courier.html','index.html'])assert(html.includes('href="'+dest+'"'));assert.equal(h.storage.size,0);assert.equal(h.session.size,0);h.events.pageshow({persisted:true});assert(h.reloaded());}});
check('Corrupt saved data is reported and preserved',()=>{const h=setup();h.storage.set('teztaom-seller-v1','broken');h.events.pageshow();assert(h.get('#hub-status').textContent.includes('o‘zgartirilmadi'));assert.equal(h.storage.get('teztaom-seller-v1'),'broken');});
console.log(`${checks} suite integration checks passed. Browser visual verification remains unavailable.`);
