# Test de l'après-fin : part d'une fin de saison 12, lance le post-game et joue N jours (service de jour + donjon de la Faille).
# usage : python3 tests/postgame.py index.html snapshot.json [jours] [dossier_captures]
import sys, json
from playwright.sync_api import sync_playwright
path=sys.argv[1]; snap=sys.argv[2]; DAYS=int(sys.argv[3]) if len(sys.argv)>3 else 6; shots=sys.argv[4] if len(sys.argv)>4 else None
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    pg=b.new_page(viewport={"width":390,"height":844})
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("file://"+path); pg.wait_for_timeout(600)
    pg.evaluate("(s)=>{ S=s; CLIENT_ORDER.forEach(k=>{ if(!S.clients[k]) S.clients[k]={aff:0,state:'new',carryOuv:0,carryTen:0,visits:0,shake:false}; S.clients[k].state= S.staff.includes(k)?'staff':'apaise'; reg(k).met=true; }); S.season=12; S.night=8; S.settings.sound=false; S.money=Math.max(S.money,400); U={}; shinyRoll=()=>Math.random()<0.3; endSeason(); }", json.load(open(snap)))
    pg.click('[data-act=startPostgame]')
    seen=set(); steps=0; runs=[]; shots_n=0; stuck=0
    def acts(): return pg.evaluate("()=>[...document.querySelectorAll('[data-act]')].filter(e=>!e.disabled&&(e.offsetParent!==null||e.closest('#modal'))).map(e=>e.dataset.act)")
    def mark(n):
        global shots_n
        if shots and n not in seen: seen.add(n); shots_n+=1; pg.screenshot(path=f"{shots}/pg{shots_n:02d}_{n}.png")
    while steps<6000:
        steps+=1
        if pg.evaluate("S.night")>DAYS: break
        if pg.evaluate("()=>!!document.getElementById('cine')"): pg.evaluate("()=>{ if(U.cineNext) U.cineNext(); }"); pg.wait_for_timeout(300); continue
        n=acts()
        if 'pickCard' in n: mark('cartes'); pg.click('[data-act=pickCard] >> nth=0'); continue
        if 'dlgNext' in n:
            if pg.evaluate("!!(U.vill&&U.vill.shiny)"): mark('chromatique')
            pg.click('[data-act=dlgNext]'); continue
        if 'leaveMarket' in n:
            mark('marche')
            for o in pg.evaluate("U.day.guests.map(g=>g.order).filter(Boolean)"):
                for k in ([o['base']] if o['base']!='eau' else [])+o['add']:
                    pg.evaluate(f"()=>{{ if(S.money>=ingPrice('{k}')){{ S.money-=ingPrice('{k}'); S.stock['{k}']=(S.stock['{k}']||0)+1; }} }}")
            pg.click('[data-act=leaveMarket]'); continue
        if 'openBuilder' in n:
            mark('client_jour')
            pg.evaluate("()=>{ const o=U.order; villagerServed({drink:o?{base:o.base,add:o.add.slice(),ess:[]}:{base:'lait',add:[],ess:[]}, q:'P'}); }"); continue
        if 'pgGo' in n:
            mark('nuit_choix')
            pg.click('[data-act=pgGo]:not([disabled]) >> nth=%d'%(steps%3)); continue
        if 'endTurn' in n:
            mark('combat')
            i=pg.evaluate('''(()=>{ const C=U.dawn.combat; if(!C||C.over) return -2; const en=C.en, m=en.moves[en.mi%en.moves.length];
              const inc=(m.a==='atk'?(m.v+(en.str||0))*(m.x||1):(m.v&&['drain','shatter'].includes(m.a)?m.v:(m.dmg||0)));
              const ok=C.hand.map((e,i)=>({e,i,cd:cardOf(e)})).filter(o=>!o.cd.unplayable&&o.cd.c<=C.energy);
              if(!ok.length) return -1; const blk=ok.filter(o=>o.cd.block&&!o.cd.dmg), atk=ok.filter(o=>o.cd.dmg), oth=ok.filter(o=>!o.cd.block&&!o.cd.dmg);
              if(C.block<inc&&blk.length) return blk[0].i; if(oth.length) return oth[0].i; if(atk.length) return atk.sort((a,b)=>(b.cd.dmg||0)-(a.cd.dmg||0))[0].i; return blk.length?blk[0].i:-1; })()''')
            if i>=0: pg.evaluate(f"()=>playCard({i})")
            elif i==-1: pg.click('[data-act=endTurn]')
            continue
        done=False
        for a in ['dStart','takeReward','goPath','restPick','eventPick','leaveRoom','dRunEnd','dungeonNext','closeModal']:
            if a in n:
                if a=='dStart': mark('donjon_intro')
                if a=='goPath': mark('carrefour')
                if a=='dungeonNext':
                    runs.append(pg.evaluate("({k:U.dawn.x.k,out:U.dawn.out,hp:U.dawn.hp,max:U.dawn.maxhp,depth:S.pg.depth})"))
                pg.click(f'[data-act={a}] >> nth=0'); done=True; break
        if done: continue
        stuck+=1; pg.wait_for_timeout(300)
        if stuck>8: print("STUCK", n); break
    if shots: pg.evaluate("()=>{ closeModal(); showRegistre(); goBook('chromatiques'); }"); pg.wait_for_timeout(500); pg.screenshot(path=f"{shots}/pg90_registre.png")
    pg.evaluate("()=>{ closeModal(); showRegistre(); U.book.P.forEach(p=>goBook(p.id)); }")
    print(json.dumps({"day":pg.evaluate("S.night"),"pg":pg.evaluate("S.pg"),"shinies":pg.evaluate("S.shinies"),"world":pg.evaluate("WORLD_ORDER.map(k=>k+':'+S.clients[k].aff+'/'+(S.clients[k].dayVisits||0))"),"money":pg.evaluate("S.money"),"deck":pg.evaluate("S.deck.length"),"owned":pg.evaluate("Object.keys(S.owned||{}).length")},ensure_ascii=False))
    print("RUNS",json.dumps(runs)); print("steps",steps); print("ERRORS",errs[:15])
    b.close()
