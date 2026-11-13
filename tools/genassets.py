"""Régénère js/assets.js : la liste des illustrations présentes dans assets/art.
À relancer après chaque ajout d'image (python3 tools/genassets.py)."""
import os, json
R='/home/claude/refuge'
art=sorted(f[:-5] for f in os.listdir(R+'/assets/art') if f.endswith('.webp'))
open(R+'/js/assets.js','w').write("// Fichier généré par tools/genassets.py : ne pas modifier à la main.\n// Liste des illustrations présentes dans assets/art (sans extension .webp).\nconst ART_FILES = "+json.dumps(art,ensure_ascii=False)+";\n")
print(len(art),"illustrations")
