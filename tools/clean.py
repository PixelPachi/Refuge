"""Nettoyage : supprime les fonctions, actions et règles CSS qui ne sont plus utilisées nulle part.
Itère jusqu'à ce qu'il n'y ait plus rien à retirer. Affiche ce qui a été retiré."""
import re, glob, sys
sys.path.insert(0,'/home/claude/tools')
R='/home/claude/refuge'
KEEP={'screenTitle'}  # points d'entrée
def match(t,i,css=False):
    o=t[i]; cl={'{':'}','[':']','(':')'}[o]; d=0
    while i<len(t):
        c=t[i]
        if c in '"\'`':
            q=c; i+=1
            while t[i]!=q:
                if t[i]=='\\': i+=1
                elif q=='`' and t[i]=='$' and t[i+1]=='{': i=match(t,i+1)
                i+=1
            i+=1; continue
        if not css and t.startswith('//',i): i=t.index('\n',i); continue
        if t.startswith('/*',i): i=t.index('*/',i)+2; continue
        if c in '{[(': d+=1
        elif c in '}])':
            d-=1
            if d==0: return i
        i+=1
files=sorted(glob.glob(R+'/js/*.js')+glob.glob(R+'/js/saisons/*.js'))
removed=[]
def alltext(): return "".join(open(f).read() for f in files)+open(R+'/index.html').read()
for it in range(6):
    s=alltext(); changed=False
    for f in files:
        t=open(f).read()
        for m in list(re.finditer(r'^function\s+([A-Za-z_$][\w$]*)\s*\(',t,re.M)):
            n=m.group(1)
            if n in KEEP: continue
            if len(re.findall(r'(?<![\w$.])'+re.escape(n)+r'(?![\w$])',s))<=1:
                a=m.start(); p=t.index('(',m.end()-1); b=match(t,match(t,p)+1 if False else t.index('{',match(t,p)))
                end=b+1
                if t[end:end+1]=='\n': end+=1
                t=t[:a]+t[end:]; removed.append(('fonction',n,f.split('/')[-1])); changed=True
                open(f,'w').write(t); s=alltext(); break
    # actions ACT jamais déclenchées (aucun data-act / dataset.act / ACT.x)
    f=R+'/js/13-actions.js'; t=open(f).read(); s=alltext()
    a=t.index('const ACT = {'); b=match(t,t.index('{',a))
    body=t[a:b]
    for m in list(re.finditer(r'(?:(?<=\n)\s*|,\s*)([A-Za-z_]\w*)\s*:\s*\(',body)):
        k=m.group(1)
        used=re.search(r'data-act=\\?["\']'+k+r'\b',s) or re.search(r'act\s*[:=]\s*["\']'+k+'["\']',s) or re.search(r'ACT\.'+k+r'\b',s) or re.search(r'["\']'+k+r'["\']',s)
        if not used:
            # retirer « k:(...)=>... » jusqu'à la virgule de premier niveau
            i=a+m.start(1); j=i
            while True:
                c=t[j]
                if c in '([{': j=match(t,j)+1; continue
                if c in '"\'`':
                    q=c; j+=1
                    while t[j]!=q: j+=2 if t[j]=='\\' else 1
                    j+=1; continue
                if c==',' or c=='\n' or c=='}': break
                j+=1
            if t[j]==',': j+=1
            t=t[:i]+t[j:].lstrip(' '); removed.append(('action',k,'13-actions.js')); changed=True
            open(f,'w').write(t); break
    if not changed: break
# CSS : règles dont tous les sélecteurs visent une classe absente du code
s=alltext()
css=open(R+'/css/style.css').read()
def cls_used(c): return re.search(r'(?<![\w-])'+re.escape(c)+r'(?![\w-])',s) or re.search(r'(?<![\w-])'+re.escape(c.split('-')[0])+r'-\$\{',s)
out=[]; i=0
while i<len(css):
    j=css.find('{',i)
    if j<0: out.append(css[i:]); break
    sel=css[i:j]; k=match(css,j,True)
    if sel.strip().startswith('@'):
        out.append(css[i:k+1]); i=k+1; continue
    sels=[x for x in sel.split(',')]
    keep=[x for x in sels if all(cls_used(c) for c in re.findall(r'\.([a-zA-Z][\w-]*)',re.sub(r'\d+\.\d+','',x)))]
    if not keep: removed.append(('css',sel.strip()[:60],'style.css'))
    elif len(keep)<len(sels): out.append(','.join(keep)+css[j:k+1]); removed.append(('css-part',sel.strip()[:60],'style.css'))
    else: out.append(css[i:k+1])
    i=k+1
open(R+'/css/style.css','w').write(''.join(out))
for r in removed: print(*r)
