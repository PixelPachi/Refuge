import sys,glob,os,numpy as np
from PIL import Image
from scipy import ndimage
name=sys.argv[1]
f=sys.argv[2] if len(sys.argv)>2 else max(glob.glob('/tmp/claude-tool-results/*/mcp-claude-in-chrome-blob-*.png'), key=os.path.getmtime)
a=np.array(Image.open(f).convert("RGB")).astype(int)
r,g,b=a[...,0],a[...,1],a[...,2]
green=(g>150)&(g>r+60)&(g>b+60)
black=(a.sum(-1)<40)
bg=green|black
alpha=np.where(bg,0,255).astype(np.uint8)
# despill ring
ring=ndimage.binary_dilation(bg,iterations=2)&~bg
a[...,1]=np.where(ring&(g>np.maximum(r,b)),np.maximum(r,b),g)
alpha=np.where(ring,np.minimum(alpha,220),alpha)
im=Image.fromarray(np.dstack([a.astype(np.uint8),alpha]),"RGBA")
im=im.crop(im.getbbox())
im=im.resize((320,480),Image.LANCZOS)
im.save(f"/home/claude/refuge/assets/art/{name}.webp","WEBP",quality=92)
# also report inner window
A=np.array(im)[...,3]; print(name, im.size)
