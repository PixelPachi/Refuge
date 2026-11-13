# Simulateur d'équilibrage : rejoue des Labyrinthes à partir de sauvegardes de début de saison (/tmp/snap_sN.json, écrites par tests/bot.py ; snap_s0 = nouvelle partie).
# Usage : python3 tests/sim.py "{atk:1.6}" five 2,5,8,10 2 [fin]   (five = 5 artefacts portés, all = tous ; fin = Grand Écho)
import json, sys, random
from playwright.sync_api import sync_playwright
diff=sys.argv[1]; mode=sys.argv[2]; seasons=[int(x) for x in sys.argv[3].split(',')]; R=int(sys.argv[4]) if len(sys.argv)>4 else 2; FIN=len(sys.argv)>5
POLICY='''(()=>{ const C=U.dawn.combat; if(!C||C.over) return -2; const en=C.en, m=en.moves[en.mi%en.moves.length];
  const inc = (m.a==='atk'? (m.v+(en.str||0))*(m.x||1) : (m.dmg||0));
  const ok = C.hand.map((e,i)=>({e,i,cd:cardOf(e)})).filter(o=>!o.cd.unplayable && o.cd.c<=C.energy);
  if(!ok.length) return -1;
  const blk = ok.filter(o=>o.cd.block && !o.cd.dmg), atk = ok.filter(o=>o.cd.dmg||o.cd.kw), oth = ok.filter(o=>!o.cd.block&&!o.cd.dmg);
  if(C.block < inc && blk.length) return blk[0].i;
  if(oth.length) return oth[0].i;
  if(atk.length) return atk.sort((a,b)=>(b.cd.dmg||0)-(a.cd.dmg||0))[0].i;
  return blk.length? blk[0].i : -1; })()'''
out=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome"); pg=b.new_page(viewport={"width":390,"height":844})
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/refuge/index.html"); pg.wait_for_timeout(1200)
    pg.evaluate(f"Object.assign(DIFF,{diff});")
    pg.evaluate("()=>{ window.__c=[]; const W=winCombat,L=loseRun; winCombat=function(){ const D=U.dawn,C=D.combat; __c.push({b:!!C.en.boss,hp:D.hp,max:D.maxhp,t:C.turn,w:1}); return W(); }; loseRun=function(){ const D=U.dawn; __c.push({b:D.node&&dmap().nodes[D.node].t==='coeur',hp:0,max:D.maxhp,w:0}); return L(); }; }")
    for se in seasons:
        snap=open(f"/tmp/snap_s{se-1}.json").read()
        ks=pg.evaluate(f"CLIENT_ORDER.filter(k=>(CL[k].season||1)==={se})")
        pass
        if FIN: ks=['_fin']
        for k in ks:
          for r in range(R):
            pg.evaluate("(snap)=>{ S=JSON.parse(snap); S.season=%d; CLIENT_ORDER.forEach(k=>{ if(!S.clients[k]) S.clients[k]={aff:0,state:'new',carryOuv:0,carryTen:0,visits:0,shake:false}; }); S.settings.sound=false; relicInit(); }"%se, snap)
            if mode=='all': pg.evaluate("()=>{ relicKeys().forEach(k=>{ if(S.owned[k]) S.equip[k]=true; }); }")
            elif mode=='five': pg.evaluate("()=>{ const o=relicKeys().filter(k=>S.owned[k]); relicKeys().forEach(k=>delete S.equip[k]); o.slice(-5).forEach(k=>S.equip[k]=true); }")
            if k=='_fin': pg.evaluate("()=>{ S.night=8; __c=[]; U.cogPick=[]; for(let i=0;i<S.deck.length&&U.cogPick.length<cogNeed();i++) if(cogPickable(S.deck[i])) U.cogPick.push(i); finaleGo(); }")
            else: pg.evaluate(f"()=>{{ const st=S.clients['{k}']; st.aff=3; st.visits=3; st.stage=3; S.keywords['{k}']=Object.keys(CL['{k}'].reform); CL['{k}'].frags.forEach(f=>S.fragments.push(Object.assign({{from:'{k}'}},f))); U.night={{out:{{}},recruits:[],confident:[]}}; U.dawn={{list:[{{k:'{k}',ten:1,euph:false,hang:0}}],i:0}}; __c=[]; setupDungeon(); }}")
            for step in range(800):
                pg.wait_for_timeout(15)
                names=pg.evaluate("[...document.querySelectorAll('[data-act]')].filter(e=>!e.disabled&&e.offsetParent!==null).map(e=>e.dataset.act)")
                if 'dungeonNext' in names or 'dRunEnd' in names: break
                if 'endTurn' in names:
                    i=pg.evaluate(POLICY)
                    if i>=0: pg.evaluate(f"playCard({i})")
                    elif i==-1: pg.evaluate("endTurn()")
                    continue
                done=False
                for a in ['dlgNext','takeReward','goPath','restPick','eventPick','leaveRoom','dStart','dOpt','dNext']:
                    if a in names:
                        pg.evaluate(f"document.querySelector('[data-act={a}]').click()"); done=True; break
                if not done: pg.wait_for_timeout(200)
            c=pg.evaluate("__c")
            boss=[x for x in c if x['b']]
            nonb=[x for x in c if not x['b']]
            out.append({'s':se,'k':k,'win':bool(boss and boss[-1]['w']),'end':(boss[-1]['hp']/boss[-1]['max']) if boss else 0,'max':c[0]['max'] if c else 0,'n':len(c),'lost':any(not x['w'] for x in c),'bt':boss[-1].get('t',0) if boss else 0})
    b.close()
from collections import defaultdict
d=defaultdict(list)
for x in out: d[x['s']].append(x)
for s in sorted(d):
    L=d[s]; print(s, "runs",len(L),"bosswin%",round(100*sum(x['win'] for x in L)/len(L)),"lost%",round(100*sum(x['lost'] for x in L)/len(L)),"endHP%",round(100*sum(x['end'] for x in L)/len(L)),"maxHP",round(sum(x['max'] for x in L)/len(L)),"bossTurns",round(sum(x['bt'] for x in L)/len(L),1))
print("errs",errs[:3])
