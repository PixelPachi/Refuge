import sys,glob,os,numpy as np
from PIL import Image
# args: name:suffix  (suffix = unique part of blob filename)
for arg in sys.argv[1:]:
    n,s=arg.split(':')
    f=[x for x in glob.glob('/tmp/claude-tool-results/*/mcp-claude-in-chrome-blob-*.png')+glob.glob('/tmp/claude-tool-results/*/mcp-claude-in-chrome-blob-*.jpg') if s in x][0]
    im=Image.open(f).convert("RGB"); a=np.array(im).astype(int).sum(-1)
    cols=np.where((a>25).mean(0)>0.3)[0]; rows=np.where((a>25).mean(1)>0.3)[0]
    im=im.crop((cols[0]+1,rows[0]+1,cols[-1],rows[-1]))
    W,H=im.size; t=2/3
    if W/H>t: nw=int(H*t); im=im.crop(((W-nw)//2,0,(W-nw)//2+nw,H))
    else: nh=int(W/t); im=im.crop((0,0,W,nh))
    im.resize((320,480),Image.LANCZOS).save(f"/home/claude/refuge/assets/art/card-{n}.webp","WEBP",quality=80)
    print(n,'ok')
