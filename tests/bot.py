import sys, json
from playwright.sync_api import sync_playwright
path = sys.argv[1]; shots = sys.argv[2]
errs=[]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width":390,"height":844}, device_scale_factor=1)
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append("console:"+m.text) if m.type=="error" and "Failed to load resource" not in m.text and "ERR_" not in m.text else None)
    pg.goto("file://"+path)
    pg.wait_for_timeout(500)
    pg.evaluate('''()=>{ window.__runs=[]; const W=winCombat, L=loseRun;
      winCombat=function(){ const D=U.dawn,C=D.combat; if(C.en.boss) __runs.push({s:S.season,k:D.x.k,w:1,hp:D.hp,max:D.maxhp,fin:!!D.finale,turns:C.turn}); return W(); };
      loseRun=function(){ const D=U.dawn; __runs.push({s:S.season,k:D.x.k,w:0,hp:0,max:D.maxhp,fin:!!D.finale,node:D.node}); return L(); }; }''')
    pg.screenshot(path=f"{shots}/00_title.png")
    def acts():
        return pg.evaluate("""()=>[...document.querySelectorAll('[data-act]')].filter(e=>!e.disabled&&e.offsetParent!==null||e.closest('#modal')).map(e=>({a:e.dataset.act,i:e.dataset.i,k:e.dataset.k,v:e.dataset.v,id:e.dataset.id,ctx:e.dataset.ctx,dis:!!e.disabled}))""")
    def click(sel):
        pg.click(sel, timeout=3000)
    click('[data-act=newGame]')
    pg.evaluate("S.settings.assist=true; S.settings.sound=false")
    shot_marks=set(); steps=0; log=[]
    while steps<19000:
        steps+=1
        a=acts(); names=[x['a'] for x in a if not x['dis']]
        st=pg.evaluate("({scr:document.querySelector('.parch')?'chron':'', night:S&&S.night, money:S&&S.money, frags:S&&S.fragments.length, cur:U.cur?{k:U.cur.k,o:U.cur.ouv,t:U.cur.ten,tu:U.cur.turns}:null, dawn:!!U.dawn})")
        if st['scr']=='chron' and not pg.locator('[data-act=nextSeason]').count():
            pg.screenshot(path=f"{shots}/99_chron.png", full_page=True); break
        def mark(name):
            if name not in shot_marks:
                shot_marks.add(name); pg.screenshot(path=f"{shots}/{len(shot_marks):02d}_{name}.png")
        if 'pickCard' in names: mark('cardpick'); click('[data-act=pickCard] >> nth=0'); continue
        if pg.evaluate("()=>!!document.getElementById('cine')"): pg.evaluate("()=>{ if(U.cineNext) U.cineNext(); }"); pg.wait_for_timeout(500); continue
        if 'cogPick' in names and pg.locator('[data-act=finaleGo][disabled]').count(): mark('duopick'); click('.cogsel:not(.on) [data-act=cogPick] >> nth=0'); continue
        if 'finaleGo' in names: mark('finale'); click('[data-act=finaleGo] >> nth=0'); continue
        if 'pickBib' in names: mark('bibelot'); click('[data-act=pickBib] >> nth=0'); continue
        if 'miaPick' in names: mark('miaouss'); click('[data-act=miaPick] >> nth=%d'%(steps%3)); continue
        if 'nextSeason' in names: pg.screenshot(path=f"{shots}/98_chron_s1.png", full_page=True); print('SEASON END', pg.evaluate("JSON.stringify(S.chronicles)"), flush=True); open(f"/tmp/snap_s{pg.evaluate('S.season||1')}.json",'w').write(pg.evaluate('JSON.stringify(S)')); click('[data-act=nextSeason]'); continue
        if 'dlgNext' in names: pg.click('[data-act=dlgNext]'); continue
        if 'answer' in names: mark('test'); pg.click('[data-act=answer] >> nth=%d'%(steps%3)); continue
        if 'acceptTen' in names: mark('reveal'); click('[data-act=acceptTen]'); continue
        if 'shiny' in names: mark('shinyq'); click('[data-act=shiny][data-v="1"]'); continue
        if 'pickCog' in names: mark('cogpick'); click('[data-act=pickCog] >> nth=3'); continue
        if 'leaveMarket' in names:
            mark('market')
            for o in pg.evaluate("U.day.guests.map(g=>g.order).filter(Boolean)"):
                for k in ([o['base']] if o['base']!='eau' else [])+o['add']:
                    if pg.evaluate(f"S.money>=ING['{k}'].price"): pg.evaluate(f"U.mTab=('{k}'.startsWith('gel_')?'gel':ING['{k}'].cat);renderMarket()"); click(f'[data-act=buy][data-k={k}]')
            for k in ['gel_psy','gel_normal','gel_vol','gel_feu','gel_eau','gel_combat','pommeacide','lait','sitrus','mago','oran','miel','framby','menthe','ceriz','wiki','pommesucree','fraive']:
                if pg.evaluate(f"S.money>=('{k}'.startsWith('gel_')?gelPrice():ING['{k}'].price)"): pg.evaluate(f"U.mTab=('{k}'.startsWith('gel_')?'gel':ING['{k}'].cat);renderMarket()"); click(f'[data-act=buy][data-k={k}]')
            click('[data-act=leaveMarket]'); continue
        if 'bGo' in names:
            mark('builder')
            ctx=pg.evaluate("U.b.ctx")
            if ctx=='client':
                k=pg.evaluate("U.cur.k")
                plan={'machopeur':('lait',['psy'],['sitrus','ceriz']),'ponchiot':('lait',['normal'],['mago','oran']),'magicarpe':('eau',['vol'],['oran','menthe']),'rondoudou':('lait',['feu'],['miel','framby']),'leveinard':('lait',['eau'],['oran','sitrus']),'psykokwak':('eau',['psy'],['menthe','wiki']),'ronflex':('lait',['normal'],['miel','pommesucree']),'tiplouf':('lait',['vol'],['oran','fraive']),'canarticho':('lait',['combat'],['menthe','pommeacide']),'goupix':('lait',['feu'],['miel','framby']),'hypotrempe':('lait',['eau'],['oran','mago']),'osselait':('lait',['normal'],['pommesucree','mago']),'lokhlass':('the',['eau'],['oran','miel']),'kangourex':('lait',['combat'],['mago','miel']),'lucario':('the',['psy'],['sitrus','menthe']),'absol':('lait',['normal'],['pommesucree','sitrus']),'granivol':('lait',['vol'],['miel','pecha']),'apireine':('the',['feu'],['miel','sitrus']),'metamorph':('lait',['normal'],['pierrestase','mago']),'insecateur':('the',['combat'],['menthe','pommeacide']),'kadabra':('the',['psy'],['miel','sitrus']),'chrysacier':('lait',['vol'],['miel','pecha']),'ramoloss':('eau',['eau'],['miel','oran']),'embrylex':('lait',['combat'],['pommesucree','biscuit']),'parasect':('the',['psy'],['sitrus','mago']),'ecremeuh':('the',['normal'],['miel','biscuit']),'tropius':('eau',['vol'],['sitrus','pecha']),'arcanin':('the',['feu'],['sitrus','grochampi']),'branette':('lait',['psy'],['miel','pecha']),'kecleon':('the',['normal'],['miel','mago']),'mimiqui':('lait',['psy'],['pecha','coeursucre']),'miaouss':('lait',['combat'],['miel','pommesucree']),'dracolosse':('the',['vol'],['miel','craquiroc']),'spiritomb':('lait',['psy'],['pecha','eaumystique']),'muciole':('lait',['normal'],['miel','pommesucree']),'demolosse':('the',['feu'],['grochampi','sitrus']),'ptera':('eau',['vol'],['grochampi','sitrus']),'jirachi':('lait',['psy'],['miel','pecha']),'noctali':('the',['normal'],['miel','mago']),'togepi':('lait',['vol'],['miel','pecha']),'ptiravi':('the',['eau'],['miel','oran']),'relicanth':('eau',['combat'],['grochampi','craquiroc']),'mordudor':('lait',['combat'],['miel','craquiroc']),'zarbi':('the',['psy'],['miel','pecha']),'evoli':('lait',['normal'],['miel','mago'])}[k]
                base,ess,add=plan
                if not pg.evaluate("S.pc<prepCost()"):
                    if pg.evaluate(f"!!S.stock['{base}']||ING['{base}'].free"): click(f'[data-act=bBase][data-k={base}]')
                    for e in ess:
                        if pg.evaluate(f"(S.stock['gel_{e}']||0)>0"): click(f'[data-act=bEss][data-k={e}]')
                    for ad in add:
                        if pg.evaluate(f"(S.stock['{ad}']||0)>0"): click(f'[data-act=bAdd][data-k={ad}]')
            else:
                o=pg.evaluate("U.order")
                if o:
                    if pg.evaluate(f"ING['{o['base']}'].free||(S.stock['{o['base']}']||0)>0"): click(f"[data-act=bBase][data-k={o['base']}]")
                    for ad in o['add']:
                        if pg.evaluate(f"(S.stock['{ad}']||0)>0"): click(f'[data-act=bAdd][data-k={ad}]')
            click('[data-act=bGo]'); continue
        if 'openBuilder' in names and st['cur'] is None:
            mark('villager'); click('[data-act=openBuilder]'); continue
        if 'relancer' in names:
            mark('client')
            if pg.evaluate("U.cur.k")=='psykokwak': print('PSY',pg.evaluate("JSON.stringify([U.cur.ouv,U.cur.ten,U.cur.turns,U.cur.stage,S.pc,U.night.served.includes('psykokwak')])"),flush=True)
            c=st['cur']
            served=pg.evaluate("U.night.served.includes(U.cur.k)")
            if not served or pg.evaluate('U.cur.confTonight>=1 && U.cur.ouv<5'): click('[data-act=openBuilder]')
            elif pg.evaluate('(U.cur.talkI||0)<1'): click('[data-act=discuter]')
            elif pg.evaluate('(U.cur.wipeI||0)<1'): click('[data-act=essuyer]')
            else: click('[data-act=relancer]')
            continue
        if 'taire' in names and 'relancer' not in names:
            mark('client'); click('[data-act=taire]'); continue
        if 'finChoice' in names: mark('fin'); click('[data-act=finChoice][data-v="0"]'); continue
        if 'endTurn' in names:
            mark('d_combat')
            i = pg.evaluate('''(()=>{ const C=U.dawn.combat; if(!C||C.over) return -2; const en=C.en, m=en.moves[en.mi%en.moves.length];
              const inc = (m.a==='atk'? (m.v+(en.str||0))*(m.x||1) : (m.dmg||0));
              const ok = C.hand.map((e,i)=>({e,i,cd:cardOf(e)})).filter(o=>!o.cd.unplayable && o.cd.c<=C.energy);
              if(!ok.length) return -1;
              const blk = ok.filter(o=>o.cd.block && !o.cd.dmg), atk = ok.filter(o=>o.cd.dmg||o.cd.kw), oth = ok.filter(o=>!o.cd.block&&!o.cd.dmg);
              if(C.block < inc && blk.length) return blk[0].i;
              if(oth.length) return oth[0].i;
              if(atk.length) return atk.sort((a,b)=>(b.cd.dmg||0)-(a.cd.dmg||0))[0].i;
              return blk.length? blk[0].i : -1; })()''')
            if i>=0: pg.evaluate(f'()=>playCard({i})'); pg.wait_for_timeout(60)
            elif i==-1: click('[data-act=endTurn]')
            continue
        if 'takeReward' in names: mark('d_reward'); click('[data-act=takeReward] >> nth=0'); continue
        if 'goPath' in names: click('[data-act=goPath] >> nth=0'); continue
        if 'restPick' in names: click('[data-act=restPick] >> nth=0'); continue
        if 'eventPick' in names: click('[data-act=eventPick] >> nth=0'); continue
        if 'leaveRoom' in names: click('[data-act=leaveRoom]'); continue
        if 'dRunEnd' in names: click('[data-act=dRunEnd]'); continue
        if 'dStart' in names: mark('d_intro'); click('[data-act=dStart]'); pg.wait_for_timeout(200); continue
        if 'dOpt' in names:
            mark('d_room'); 
            if pg.locator('[data-act=dOpt].rec').count(): click('[data-act=dOpt].rec')
            else:
                # joueur « qui réfléchit » : 60 % du temps le bon choix, sinon un choix au hasard (peut être mauvais)
                i = pg.evaluate("(()=>{const o=U.dawn.opts; const g=o.findIndex(x=>x.good); const t=o.findIndex(x=>x.kind==='tank'||x.kind==='go'||x.kind==='safe'||x.kind==='rest'); if(g>=0 && Math.random()<0.6) return g; return Math.random()<0.5 ? Math.floor(Math.random()*o.length) : Math.max(0,t);})()")
                click(f'[data-act=dOpt] >> nth={i}')
            continue
        if 'dNext' in names: mark('d_after'); click('[data-act=dNext]'); pg.wait_for_timeout(300); continue
        if 'dungeonNext' in names:
            pg.wait_for_timeout(100); mark('dungeon_done'); click('[data-act=dungeonNext]'); continue
        if 'rHire' in names or 'rLetGo' in names:
            mark('recap')
            if 'rHire' in names: click('[data-act=rHire] >> nth=0')
            else: click('[data-act=rLetGo] >> nth=0')
            continue
        if 'recapDone' in names: print('NIGHT',pg.evaluate("S.night"),pg.evaluate("JSON.stringify(U.night.out)"),flush=True); mark('recap_done'); click('[data-act=recapDone]'); continue
        if 'hire' in names or 'letGo' in names:
            mark('staff')
            if 'hire' in names: click('[data-act=hire]')
            else: click('[data-act=letGo]')
            continue
        # waiting for dungeon animation
        log.append(("stuck",names,st)); pg.wait_for_timeout(500)
        if len(log)>5: break
    final=pg.evaluate("({night:S.night,money:S.money,lvl:S.level,staff:S.staff,clients:S.clients,stats:S.stats,pages:S.pages,frags:S.fragments.length,finale:S.finale,cmd:S.cmd,equip:S.equip})")
    print(json.dumps(final,ensure_ascii=False))
    print("steps",steps,"stuck",log[-3:])
    print('RUNS', pg.evaluate("JSON.stringify(window.__runs)"))
    print("ERRORS",errs[:20])
    b.close()
