import sys
from PIL import Image
name, src = sys.argv[1], sys.argv[2]
icon = len(sys.argv)>3 and sys.argv[3].startswith("icon")
nodesp = len(sys.argv)>3 and sys.argv[3]=="icon-keepgreen"
im = Image.open(src).convert("RGBA")
import numpy as _np
_a=_np.array(im.convert("RGB")).astype(int).sum(-1)
_cols=_np.where((_a>12).mean(0)>0.2)[0]; _rows=_np.where((_a>12).mean(1)>0.2)[0]
if len(_cols) and len(_rows): im=im.crop((0,0,_cols[-1]+1,_rows[-1]+1))
if icon:
    import numpy as np
    from scipy import ndimage
    arr = np.array(im).astype(int)
    corners = np.concatenate([arr[:8,:8,:3].reshape(-1,3),arr[:8,-8:,:3].reshape(-1,3),arr[-8:,:8,:3].reshape(-1,3),arr[-8:,-8:,:3].reshape(-1,3)])
    bgc = np.median(corners,axis=0)
    dist = np.sqrt(((arr[...,:3]-bgc)**2).sum(-1))
    near = dist < 90
    lab,_ = ndimage.label(near)
    edge = set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]]))) - {0}
    bgmask = np.isin(lab, list(edge)) | (dist < 45)
    bgmask = ndimage.binary_dilation(bgmask, iterations=1)
    arr[...,3] = np.where(bgmask,0,255)
    if not nodesp:
        r,g,b = arr[...,0],arr[...,1],arr[...,2]
        ring = ndimage.binary_dilation(bgmask, iterations=3) & ~bgmask
        arr[...,1] = np.where((ring&(g>r)&(g>b)) | (g>np.maximum(r,b)+25), np.maximum(r,b)+np.where(ring,0,10), g)
    out = Image.fromarray(arr.astype('uint8'),"RGBA")
    bb = out.getbbox(); out = out.crop(bb) if bb else out
    sz=max(out.size); sq=Image.new("RGBA",(sz,sz),(0,0,0,0)); sq.paste(out,((sz-out.width)//2,(sz-out.height)//2))
    sq.resize((128,128),Image.LANCZOS).save(f"/home/claude/refuge/assets/art/{name}.webp","WEBP",quality=90)
else:
    w = min(im.width, 1024 if im.width>=im.height else 768)
    im = im.convert("RGB"); im = im.resize((w, round(im.height*w/im.width)), Image.LANCZOS)
    im.save(f"/home/claude/refuge/assets/art/{name}.webp","WEBP",quality=82)
print(name, im.size)
