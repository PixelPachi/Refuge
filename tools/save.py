import sys,glob,subprocess,numpy as np
from PIL import Image
# args: name:suffix[:mode]   mode = bg (default) | icon
for arg in sys.argv[1:]:
    parts=arg.split(':'); n,sfx=parts[0],parts[1]; mode=parts[2] if len(parts)>2 else 'bg'
    f=[x for x in glob.glob('/tmp/claude-tool-results/*/*blob-*.png') if sfx in x][0]
    im=Image.open(f).convert("RGB"); a=np.array(im).astype(int).sum(-1)
    cols=np.where((a>30).mean(0)>0.15)[0]; rows=np.where((a>30).mean(1)>0.15)[0]
    im=im.crop((cols[0]+2,rows[0]+2,cols[-1]-1,rows[-1]-1)); tmp=f"/tmp/save_{n}.png"; im.save(tmp)
    r=subprocess.run(["python3","/home/claude/tools/art.py",n,tmp]+([mode] if mode!='bg' else []),capture_output=True,text=True)
    print(r.stdout.strip(), r.stderr.strip()[-200:])
