"""Régénère js/items.js : les icônes d'objets (assets/items/*.png) intégrées en data URI,
pour ne pas compter un fichier par icône (limite de 512 fichiers par version de l'artifact)."""
import os, base64, json
R='/home/claude/refuge'
d={f[:-4]:"data:image/png;base64,"+base64.b64encode(open(f"{R}/assets/items/{f}",'rb').read()).decode() for f in sorted(os.listdir(R+'/assets/items')) if f.endswith('.png')}
open(R+'/js/items.js','w').write("// Fichier généré par tools/genitems.py : icônes d'objets (sprites PokeAPI) en data URI.\nconst ITEM_ICONS = "+json.dumps(d)+";\nfunction itemSrc(name){ return ITEM_ICONS[name] || itemUrl(name); }\n")
print(len(d),"icônes")
