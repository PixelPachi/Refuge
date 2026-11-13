import json
from playwright.sync_api import sync_playwright
BASE="""()=>{ S=newState(); initClients(); S.ten={id:4,n:'Salamèche',c:'#f08030',aura:'braise',t:Object.keys(TALENTS)[0]}; S.cog='pichu'; S.tutoDone=true; S.dungeonDeckTuto=true; S.dungeonTuto=true; S.dungeonKnown=true; S.hectorJoke=true; ensureDeck();
  S.night=3; S.money=600; ['machopeur','ponchiot'].forEach(k=>{S.clients[k].state='apaise';S.clients[k].visits=3;S.clients[k].aff=3;reg(k).met=true;});
  ['magicarpe','rondoudou'].forEach(k=>{S.clients[k].visits=1;reg(k).met=true;S.clients[k].stage=1;});
  ['machopeur','ponchiot','magicarpe'].forEach(k=>CL[k].frags.forEach(f=>S.fragments.push(Object.assign({from:k},f))));
  S.keywords.magicarpe=['Léviator']; S.equip.ceinture=true; S.equip.collier=true; S.recipes=['shake']; S.deck.push('revanche','fidele','prevoyance'); S.reserve=['garde'];
  S.bibelots=['tasse']; S.villFav={racaillou:true}; S.villLeg={pijako:true}; S.chronicles=[]; save(); }"""
PHASES={
 "jour":"()=>{ startDay(); }",
 "nuit_client":"()=>{ startNight(); for(let i=0;i<30&&U.dlg;i++) dlgNext(); }",
 "aube_intro":"()=>{ U.night={out:{},recruits:[],confident:[]}; U.dawn={list:[{k:'magicarpe',ten:0,euph:false,hang:0}],i:0}; setupDungeon(); }",
 "combat":"()=>{ U.night={out:{},recruits:[],confident:[]}; U.dawn={list:[{k:'magicarpe',ten:0,euph:false,hang:0}],i:0}; setupDungeon(); enterNode('a'); }",
 "carrefour":"()=>{ U.night={out:{},recruits:[],confident:[]}; U.dawn={list:[{k:'magicarpe',ten:0,euph:false,hang:0}],i:0}; setupDungeon(); U.dawn.visited=['a','b']; enterNode('c'); }",
 "recap":"()=>{ U.night={out:{magicarpe:'Apaisé'},recruits:[],confident:[],earned0:0,served0:0,perfect0:0}; renderRecap(); }",
 "chronique":"()=>{ S.night=8; endSeason(); }",
 "finale":"()=>{ S.night=8; renderFinaleChoice(); }",
}
SKIP={"newGame","toTitle"}
res={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844})
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
    def setup(ph):
        pg.goto("file:///home/claude/refuge/index.html"); pg.wait_for_timeout(900)
        pg.evaluate(BASE); pg.evaluate(PHASES[ph]); pg.wait_for_timeout(500)
    for ph in PHASES:
        errs.clear(); setup(ph)
        if errs: res[ph+":setup"]=list(errs)
        acts=pg.evaluate("()=>[...document.querySelectorAll('[data-act]')].filter(e=>e.offsetParent!==null).map((e,i)=>({a:e.dataset.act,i:[...document.querySelectorAll('[data-act]')].indexOf(e)}))")
        seen=set()
        for a in acts:
            key=a['a']
            if key in SKIP or key in seen: continue
            seen.add(key); errs.clear(); setup(ph)
            try:
                pg.evaluate(f"()=>document.querySelectorAll('[data-act]')[{a['i']}].click()"); pg.wait_for_timeout(350)
                # second level: inside a modal, click every distinct act once
                sub=pg.evaluate("()=>[...document.querySelectorAll('#modal [data-act]')].map(e=>e.dataset.act)")
                for s2 in dict.fromkeys(sub):
                    if s2 in SKIP: continue
                    pg.evaluate(f"()=>{{ const e=document.querySelector('#modal [data-act=\"{s2}\"]'); e&&e.click(); }}"); pg.wait_for_timeout(250)
            except Exception as ex: errs.append("PW:"+str(ex)[:120])
            if errs: res[f"{ph}:{key}"]=list(errs)
        print(ph, len(seen), "actions testées", flush=True)
    # book: every page
    errs.clear(); setup("jour"); pg.evaluate("()=>showRegistre()")
    n=pg.evaluate("()=>U.book.P.length")
    for i in range(n+1): pg.evaluate("()=>turnBook(1)"); pg.wait_for_timeout(80)
    for i in range(n+1): pg.evaluate("()=>turnBook(-1)"); pg.wait_for_timeout(80)
    ids=pg.evaluate("()=>U.book.P.map(p=>p.id)")
    for pid in ids: pg.evaluate(f"()=>goBook('{pid}')"); pg.wait_for_timeout(60)
    if errs: res["livre"]=list(errs)
    print("livre", n, "pages")
    b.close()
print(json.dumps(res,ensure_ascii=False,indent=1))
