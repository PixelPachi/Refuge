import glob,numpy as np
from PIL import Image
from scipy import ndimage
M={'1':'qlk70x','0':'fytn4l','2':'d8y1kk','3':'nfo6z8','4':'uq57g1'}
def load(s):
    f=[x for x in glob.glob('/tmp/claude-tool-results/*/*blob-*.png') if s in x][0]
    a=np.array(Image.open(f).convert("RGB")).astype(int); return a
def keys(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    green=(g>140)&(g>r+50)&(g>b+50); black=a.sum(-1)<40
    return green|black, green
a1=load(M['1']); bg,green=keys(a1)
fr=~bg; ys,xs=np.where(fr); box=(xs.min(),ys.min(),xs.max()+1,ys.max()+1); print(box)
# inner window = green component containing center of frame
lab,_=ndimage.label(green); cy=(box[1]+box[3])//2; cx=(box[0]+box[2])//2
win=lab==lab[cy,cx]
mask=(fr|win)
x0,y0,x1,y1=box
Image.fromarray((mask[y0:y1,x0:x1]*255).astype(np.uint8),"L").resize((320,480),Image.LANCZOS).save('/home/claude/refuge/assets/art/mask-leg.png')
for k,s in M.items():
    a=load(s); bg,_=keys(a)
    ring=ndimage.binary_dilation(bg,iterations=2)&~bg
    g=a[...,1]; mx=np.maximum(a[...,0],a[...,2]); r0=a[...,0].copy(); near=ndimage.binary_dilation(bg,iterations=8); lime=(g>=r0)&(g>a[...,2]+30)&~bg&near
    a[...,1]=np.where(g>mx,mx,g); a[...,1]=np.where(lime,(r0*0.82).astype(int),a[...,1])
    sp=((g>mx+25)|lime)&~bg
    al_extra=sp
    al=np.where(bg,0,np.where(ring,200,255)); al=np.where(al_extra,np.minimum(al,45),al).astype(np.uint8)
    im=Image.fromarray(np.dstack([a.astype(np.uint8),al]),"RGBA").crop(box).resize((320,480),Image.LANCZOS)
    im.save(f'/home/claude/refuge/assets/art/frame-leg-{k}.webp','WEBP',quality=92)
# inner window bounds (%) for text placement
W=win[y0:y1,x0:x1]; ys,xs=np.where(W); h,w=W.shape
print('win %', xs.min()/w*100, xs.max()/w*100, ys.min()/h*100, ys.max()/h*100)
