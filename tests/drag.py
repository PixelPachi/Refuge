exec(open('/tmp/audit.py').read().split("SKIP=")[0])
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome"); pg=b.new_page(viewport={"width":390,"height":844},device_scale_factor=2)
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e))); E=pg.evaluate; M=pg.mouse
    def setup():
        pg.goto("file:///home/claude/refuge/index.html"); pg.wait_for_timeout(900); E(BASE); E("()=>{S.omens={'1-3':'calme'}; S.equip={};}")
        E("()=>{ U.night={out:{},recruits:[],confident:[]}; U.dawn={list:[{k:'machopeur',ten:0,euph:false,hang:0}],i:0}; setupDungeon(); U.dawn.tuto={combat:1,intent:1,frag:1}; enterNode('b'); const C=U.dawn.combat; C.hand=['frappe','garde','flammeche','prevoyance','revanche'].map(id=>({id})); C.energy=3; renderDungeon(); }"); pg.wait_for_timeout(900)
    def center(sel):
        bb=pg.locator(sel).first.bounding_box(); return bb['x']+bb['width']/2, bb['y']+bb['height']/2
    setup()
    hp0=E("()=>U.dawn.combat.en.hp")
    cx,cy=center('.dcard[data-hi="0"]'); fx,fy=center('[data-foe] .foespr')
    M.move(cx,cy); M.down(); M.move(cx,cy-40,steps=4); M.move((cx+fx)/2,(cy+fy)/2,steps=6); M.move(fx,fy,steps=6); pg.wait_for_timeout(200)
    pg.screenshot(path="/home/claude/captures10/8_fleche_visee.png")
    M.up(); pg.wait_for_timeout(400); print("frappe glissée sur l'ombre :", hp0, "->", E("()=>U.dawn.combat.en.hp"))
    b0=E("()=>U.dawn.combat.block"); gx,gy=center('.dcard[data-hi="0"]')  # garde est maintenant index 0
    M.move(gx,gy); M.down(); M.move(gx,gy-150,steps=8); pg.wait_for_timeout(150); pg.screenshot(path="/home/claude/captures10/9_garde_glissee.png"); M.up(); pg.wait_for_timeout(300)
    print("garde glissée vers le haut : bouclier", b0, "->", E("()=>U.dawn.combat.block"))
    setup(); hp0=E("()=>U.dawn.combat.en.hp"); cx,cy=center('.dcard[data-hi="2"]'); fx,fy=center('[data-foe] .foespr')
    M.click(cx,cy); pg.wait_for_timeout(200); print("toucher flammèche → visée :", E("()=>!!U.aim")); M.click(fx,fy); pg.wait_for_timeout(300)
    print("puis toucher l'ombre :", hp0, "->", E("()=>U.dawn.combat.en.hp"), "brûlure", E("()=>U.dawn.combat.en.burn"))
    setup(); hp0=E("()=>U.dawn.combat.en.hp"); cx,cy=center('.dcard[data-hi="0"]')
    M.move(cx,cy); M.down(); M.move(cx+10,cy-200,steps=8); M.up(); pg.wait_for_timeout(300); print("frappe lâchée dans le vide (annulée) :", hp0, "->", E("()=>U.dawn.combat.en.hp"), "main", E("()=>U.dawn.combat.hand.length"))
    print(errs); b.close()
