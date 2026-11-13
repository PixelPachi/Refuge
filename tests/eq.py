from playwright.sync_api import sync_playwright
import json
T=["CL","TALK","WIPE","LETTERS","REGULARS","ROOM_SAY","ROOM_KW","BOSS","LEGEND_CARD","CLIENT_CARD","CARDS","ING","VILLAGERS","OMENS","STATUS","POOL","FINALE_MAP","FINALE_MAP_S4","CLIENT_ORDER"]
JS="""()=>{ const norm=v=>{ if(typeof v==='function') return 'fn:'+v.toString(); if(v instanceof Set) return [...v].sort(); if(Array.isArray(v)) return v.map(norm); if(v&&typeof v==='object'){ const o={}; Object.keys(v).sort().forEach(k=>o[k]=norm(v[k])); return o;} return v; };
 const out={}; for(const t of %s){ try{ out[t]=JSON.stringify(norm(eval(t))); }catch(e){ out[t]='ERR '+e; } } out.ACTS=Object.keys(ACT).sort().join(','); out.CARDART=[...CARD_ART].sort().join(','); return out; }""" % json.dumps(T)
res={}; errs={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for name,url in [("mono","file:///tmp/mono_test/index.html"),("split","file:///home/claude/refuge/index.html")]:
        pg=b.new_page(); e=[]; pg.on("pageerror",lambda x,e=e:e.append(str(x))); pg.goto(url); pg.wait_for_timeout(1500)
        res[name]=pg.evaluate(JS); errs[name]=e
    b.close()
print("errors",errs)
for k in res["mono"]:
    print(k, "OK" if res["mono"][k]==res["split"][k] else "DIFF")
