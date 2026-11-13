"""Découpe index.html (fichier unique) en fichiers organisés :
css/style.css, js/*.js, js/saisons/saisonN.js (tout ce qui concerne un client au même endroit)."""
import re, os, json, sys
SRC='/tmp/mono.html'; OUT='/home/claude/refuge'
s=open(SRC).read()
css=s[s.index('<style>')+7:s.index('</style>')]
js=s[s.index('<script>')+8:s.rindex('</script>')]
head=s[:s.index('<style>')]; body=s[s.index('</style>')+8:s.index('<script>')]

# ---------- petit analyseur d'objets JS (chaînes, gabarits, commentaires) ----------
def skip_str(t,i):
    q=t[i]; i+=1
    while i<len(t):
        c=t[i]
        if c=='\\': i+=2; continue
        if q=='`' and c=='$' and t[i+1:i+2]=='{':
            i=match(t,i+1)+1; continue
        if c==q: return i+1
        i+=1
    raise Exception('unterminated string')
def match(t,i):
    """t[i] est { [ ou ( ; renvoie l'index de la fermeture"""
    o=t[i]; cl={'{':'}','[':']','(':')'}[o]; d=0
    while i<len(t):
        c=t[i]
        if c in '"\'`': i=skip_str(t,i); continue
        if t.startswith('//',i): i=t.index('\n',i); continue
        if t.startswith('/*',i): i=t.index('*/',i)+2; continue
        if c in '{[(': d+=1
        elif c in '}])':
            d-=1
            if d==0: return i
        i+=1
    raise Exception('no match')
def entries(t,a,b):
    """entrées de premier niveau d'un objet entre t[a]='{' et t[b]='}' : liste (clé, texte valeur)"""
    out=[]; i=a+1
    while i<b:
        m=re.compile(r'\s*(?://[^\n]*\n\s*)*([A-Za-z_$][\w$]*)\s*:').match(t,i)
        if not m or m.end()>b: break
        k=m.group(1); j=m.end()
        while t[j] in ' \t\n': j+=1
        v0=j
        while j<b:
            c=t[j]
            if c in '"\'`': j=skip_str(t,j); continue
            if c in '{[(': j=match(t,j)+1; continue
            if c==',': break
            if t.startswith('//',j): j=t.index('\n',j); continue
            j+=1
        out.append((k,t[v0:j].rstrip()))
        i=j+1
    return out
def table(name):
    m=re.search(r'\nconst '+name+r' = \{', js); a=m.end()-1; b=match(js,a)
    end=b+1
    if js[end]==';': end+=1
    return m.start()+1, end, entries(js,a,b)

# ---------- tables par client ----------
TABLES=["CL","TALK","WIPE","LETTERS","REGULARS","ROOM_SAY","ROOM_KW","BOSS","LEGEND_CARD","CLIENT_CARD"]
order=json.loads(re.search(r'const CLIENT_ORDER = (\[.*?\]);',js).group(1))
data={}; spans={}
for t in TABLES:
    a,b,e=table(t); spans[t]=(a,b); data[t]=e
cards_a,cards_b,cards_e=table("CARDS")
client_cards={}; rest_cards=[]
for k,v in cards_e:
    m=re.search(r'from:"(\w+)"',v)
    if m and m.group(1) in order: client_cards.setdefault(m.group(1),[]).append((k,v))
    else: rest_cards.append((k,v))
remnant={t:[(k,v) for k,v in data[t] if k not in order] for t in TABLES}
season=lambda k: int(re.search(r'season:(\d+)',dict(data["CL"])[k]).group(1)) if re.search(r'season:(\d+)',dict(data["CL"])[k]) else 1

LABEL={"CL":"fiche (histoire, confidences, Labyrinthe)","TALK":"petites conversations","WIPE":"moments au torchon","LETTERS":"lettre (Cadoizo)",
 "REGULARS":"visite de jour en habitué","ROOM_SAY":"phrases dans les salles","ROOM_KW":"mots-clés des salles","BOSS":"ombre finale",
 "LEGEND_CARD":"carte légendaire offerte","CLIENT_CARD":"carte offerte"}
SEASON_TITLE={1:"Saison 1 · Chapitre 1 « Portes ouvertes »",2:"Saison 2 · Chapitre 1 « Portes ouvertes »",3:"Saison 3 · Chapitre 2 « La saison des pluies »",4:"Saison 4 · Chapitre 2 « La saison des pluies »",5:"Saison 5 · Chapitre 3 « Les métamorphoses »",6:"Saison 6 · Chapitre 3 « Les métamorphoses »"}
files={}
for k in order:
    se=season(k); d=dict
    name=re.search(r'n:"([^"]+)"',dict(data["CL"])[k]).group(1)
    blk=[f"\n// =====================================================================\n// {name.upper()}  ({k})\n// =====================================================================\n"]
    for t in TABLES:
        v=dict(data[t]).get(k)
        if v is None: continue
        blk.append(f"// {LABEL[t]}\n{t}.{k} = {v};\n")
    for ck,cv in client_cards.get(k,[]):
        blk.append(f"// carte « {re.search(r'n:\"([^\"]+)\"',cv).group(1)} »\nCARDS.{ck} = {cv};\n")
    files.setdefault(se,[]).append("".join(blk))
os.makedirs(OUT+'/js/saisons',exist_ok=True)
for se,blks in files.items():
    hdr=f"// {SEASON_TITLE.get(se,f'Saison {se}')}\n// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.\n// (L'ordre d'arrivée est dans CLIENT_ORDER, js/01-base.js ; les images à faire sont dans GEMINI.md.)\n"
    open(f"{OUT}/js/saisons/saison{se}.js","w").write(hdr+"".join(blks))

# ---------- reconstruire le reste du script ----------
def objtxt(name,ents):
    if not ents: return f"const {name} = {{}};"
    return f"const {name} = {{\n"+",\n".join(f"  {k}:{v}" for k,v in ents)+"\n};"
cuts=[spans[t] for t in TABLES]+[(cards_a,cards_b)]
# CLIENT_ORDER: reconstruit après chargement des saisons
m=re.search(r'\nconst CLIENT_ORDER = \[.*?\];',js); cuts.append((m.start()+1,m.end()))
# remplacer ces blocs par rien (on note les positions)
pieces=[]; last=0
for a,b in sorted(cuts):
    pieces.append(js[last:a]); last=b
pieces.append(js[last:])
js2="".join(pieces)
tables_js = ("// Tables remplies par les fichiers js/saisons/*.js (une entrée par client)\n"
 + "\n".join(objtxt(t,remnant[t]) for t in TABLES) + "\n"
 + "// Toutes les cartes : les cartes propres à un client sont dans son fichier de saison\n" + objtxt("CARDS",rest_cards) + "\n")
order_js = "// Ordre d'arrivée des âmes (toutes saisons)\nconst CLIENT_ORDER = "+json.dumps(order)+";\n"

# ---------- découpage du reste en fichiers par thème (sur les bannières existantes) ----------
def at(marker):
    i=js2.find(marker); assert i>=0, marker; return i
plan=[("01-base.js","// ---------- Données ----------"),
      ("02-village.js","// Petites conversations et moments au torchon"),
      ("03-medias.js","// ---------- URLs PokeAPI ----------"),
      ("04-audio.js","// ---------- Audio : cri officiel"),
      ("05-moteur.js","// ---------- État ----------"),
      ("06-histoire.js","// ---------- Écran titre ----------"),
      ("07-journee.js","// ---------- Journée : marché + villageois ----------"),
      ("08-nuit.js","// ---------- Nuit ----------"),
      ("09-labyrinthe.js","// ---------- Aube : le Donjon Inversé"),
      ("10-combat.js","// =====================================================================\n// LABYRINTHE EN DECK BUILDING"),
      ("11-saison.js","// ---------- Le Grand Écho : la finale de chaque saison ----------"),
      ("12-registre.js","// ---------- Ledger & menu ----------"),
      ("13-actions.js","// ---------- Actions ----------")]
pos=[(f,at(mk)) for f,mk in plan]
pre=js2[:pos[0][1]]
chunks={}
for i,(f,p) in enumerate(pos):
    e=pos[i+1][1] if i+1<len(pos) else len(js2)
    chunks[f]=js2[p:e]
chunks["01-base.js"]=pre+chunks["01-base.js"]+"\n"+order_js
open(f"{OUT}/js/00-tables.js","w").write("// Déclarations des tables partagées (remplies par les saisons)\n"+tables_js)
for f,c in chunks.items(): open(f"{OUT}/js/{f}","w").write(c.strip("\n")+"\n")
os.makedirs(OUT+'/css',exist_ok=True); open(OUT+'/css/style.css','w').write(css.strip("\n")+"\n")
seasons=sorted(files)
scripts=["js/assets.js","js/00-tables.js","js/01-base.js"]+[f"js/saisons/saison{n}.js" for n in seasons]+["js/"+f for f,_ in plan if f!="01-base.js"]
tags="\n".join(f'<script src="{x}"></script>' for x in scripts)
html=head+'<link rel="stylesheet" href="css/style.css">\n'+body+tags+"\n</body>\n</html>\n"
open(OUT+'/index.html','w').write(html)
print("ok", {k:len(v) for k,v in files.items()}, len(rest_cards))
