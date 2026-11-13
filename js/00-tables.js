// Déclarations des tables partagées (remplies par les saisons)
// Tables remplies par les fichiers js/saisons/*.js (une entrée par client)
const CL = {};
const TALK = {};
const WIPE = {};
const LETTERS = {};
const REGULARS = {};
const ROOM_SAY = {};
const ROOM_KW = {};
const BOSS = {};
const LEGEND_CARD = {};
const CLIENT_CARD = {};
// Toutes les cartes : les cartes propres à un client sont dans son fichier de saison
const CARDS = {
  frappe:{n:"Frappe",c:1,t:"atk",dmg:6,r:"base",i:"👊"},
  garde:{n:"Garde",c:1,t:"skill",block:5,r:"base",i:"🛡️"},
  flammeche:{n:"Flammèche",c:1,t:"atk",dmg:4,burn:3,r:"base",i:"🔥",typ:"feu"},
  feufollet:{n:"Feu Follet",c:1,t:"skill",burn:5,r:"base",i:"👻",typ:"feu"},
  lanceflammes:{n:"Lance-Flammes",c:2,t:"atk",dmg:8,burn:4,r:"peu",i:"🔥",typ:"feu"},
  deflagration:{n:"Déflagration",c:2,t:"skill",burnX2:true,exhaust:true,r:"rare",i:"💥",typ:"feu",d:"Double la Brûlure de l'ombre. Épuise."},
  nitrocharge:{n:"Nitrocharge",c:1,t:"atk",dmg:5,str:1,r:"base",i:"🔥",typ:"feu"},
  vampigraine:{n:"Vampigraine",c:1,t:"atk",dmg:2,seed:2,r:"base",i:"🌱",typ:"plante"},
  megasangsue:{n:"Méga-Sangsue",c:1,t:"atk",dmg:6,heal:3,seed:2,r:"peu",i:"🍃",typ:"plante"},
  pouvoirantique:{n:"Racines",c:1,t:"skill",block:6,seed:2,r:"commune",i:"🌳",typ:"plante"},
  tranchherbe:{n:"Tranch'Herbe",c:1,t:"atk",dmg:6,r:"base",i:"🍃",typ:"plante"},
  pistolet:{n:"Pistolet à O",c:1,t:"atk",dmg:4,soak:2,r:"base",i:"💧",typ:"eau"},
  dansepluie:{n:"Danse Pluie",c:1,t:"skill",soak:4,draw:1,r:"commune",i:"🌧️",typ:"eau"},
  hydrocanon:{n:"Hydrocanon",c:2,t:"atk",dmg:10,soak:3,r:"peu",i:"🌊",typ:"eau"},
  repli:{n:"Repli",c:1,t:"skill",block:7,draw:1,r:"base",i:"🐚",typ:"eau"},
  viveattaque:{n:"Vive-Attaque",c:0,t:"atk",dmg:3,r:"base",i:"⚡",typ:"normal"},
  rugissement:{n:"Rugissement",c:1,t:"skill",block:3,weak:2,r:"commune",i:"📣",typ:"normal"},
  cageeclair:{n:"Cage-Éclair",c:1,t:"skill",para:1,block:4,r:"base",i:"⚡",typ:"electrik"},
  etincelle:{n:"Étincelle",c:0,t:"atk",dmg:3,para:1,r:"commune",i:"✨",typ:"electrik"},
  tonnerre:{n:"Tonnerre",c:2,t:"atk",dmg:10,para:2,r:"peu",i:"🌩️",typ:"electrik"},
  morsure:{n:"Morsure",c:1,t:"atk",dmg:6,weak:1,fear:1,r:"base",i:"🦷",typ:"tenebres"},
  regardnoir:{n:"Regard Noir",c:1,t:"skill",vuln:1,fear:1,r:"base",i:"👁️",typ:"tenebres"},
  grimace:{n:"Grimace",c:0,t:"skill",fear:2,exhaust:true,r:"commune",i:"😝",typ:"tenebres"},
  ballombre:{n:"Ball'Ombre",c:2,t:"atk",dmg:12,fear:2,r:"peu",i:"🌑",typ:"tenebres"},
  cruaile:{n:"Cru-Aile",c:1,t:"atk",dmg:3,hits:2,elan:1,r:"base",i:"🪶",typ:"vol"},
  ventarriere:{n:"Vent Arrière",c:1,t:"skill",elan:3,block:3,r:"base",i:"🌬️",typ:"vol"},
  tornade:{n:"Tornade",c:2,t:"atk",dmg:3,hits:4,r:"peu",i:"🌪️",typ:"vol"},
  hate:{n:"Hâte",c:0,t:"skill",energy:1,draw:1,exhaust:true,r:"base",i:"💨",typ:"vol"},
  lettre_c:{n:"Accusé de réception",c:0,t:"skill",draw:2,exhaust:true,r:"jour",i:"📮",from:"cadoizo"},
  boularmure:{n:"Boul'Armure",c:1,t:"skill",block:10,r:"jour",i:"🪨",from:"racaillou"},
  douxbaiser:{n:"Doux Baiser",c:1,t:"skill",weak:2,heal:2,r:"jour",i:"💗",from:"melofee"},
  griffe:{n:"Griffe",c:0,t:"atk",dmg:3,draw:1,r:"jour",i:"🐾",from:"chaglam"},
  bavardage:{n:"Bavardage",c:1,t:"atk",dmg:4,weak:1,draw:1,r:"jour",i:"🦜",from:"pijako"},
  charge:{n:"Charge",c:1,t:"atk",dmg:8,r:"commune",i:"💥"},
  abri:{n:"Abri",c:2,t:"skill",block:14,r:"commune",i:"🧱"},
  coupdboule:{n:"Coud'Boule",c:2,t:"atk",dmg:12,vuln:1,r:"commune",i:"🐏"},
  armure:{n:"Armure",c:1,t:"skill",block:6,str:0,draw:0,r:"commune",i:"🔰",blockNext:4,d:"6 de Bouclier, et 4 de plus au prochain tour."},
  griffacier:{n:"Griffe Acier",c:1,t:"atk",dmg:6,str:1,r:"peu",i:"⚙️"},
  dansedeslames:{n:"Danse-Lames",c:1,t:"power",str:2,r:"peu",i:"🗡️"},
  ultimapoing:{n:"Ultimapoing",c:2,t:"atk",dmg:16,r:"peu",i:"👊"},
  rafale:{n:"Rafale",c:1,t:"atk",dmg:2,hits:4,r:"peu",i:"🌪️"},
  telekinesie:{n:"Télékinésie",c:1,t:"skill",draw:3,r:"peu",i:"✨"},
  repos:{n:"Repos",c:2,t:"skill",heal:12,exhaust:true,r:"rare",i:"😴"},
  mur:{n:"Mur Lumière",c:2,t:"power",blockTurn:4,r:"rare",i:"🔷",d:"Au début de chaque tour, gagne 4 de Bouclier."},
  gonflette:{n:"Gonflette",c:1,t:"power",str:1,regen:2,r:"rare",i:"💪",d:"+1 Force, et soigne 2 PV au début de chaque tour."},
  giga:{n:"Giga-Impact",c:3,t:"atk",dmg:28,r:"rare",i:"☄️"},
  prevoyance:{n:"Prévoyance",c:1,t:"skill",block:8,retain:true,r:"commune",i:"🧭"},
  belier:{n:"Bélier",c:1,t:"atk",dmgBlock:true,r:"commune",i:"🐑",d:"Inflige des dégâts égaux à son Bouclier."},
  feinte:{n:"Feinte",c:0,t:"atk",dmg:5,draw:1,ethereal:true,r:"commune",i:"🎭"},
  meteores:{n:"Météores",c:1,t:"atk",dmg:3,hits:3,innate:true,r:"commune",i:"🌠"},
  coupbas:{n:"Coup Bas",c:1,t:"atk",dmg:7,execute:true,r:"peu",i:"🗡️"},
  riposte:{n:"Riposte",c:1,t:"power",thorns:3,r:"peu",i:"🌵",d:"Chaque fois qu'une ombre le frappe, elle subit 3 dégâts."},
  dansefeu:{n:"Danse du Feu",c:1,t:"power",burnOnAtk:1,r:"peu",i:"💃",typ:"feu",d:"Ses attaques infligent aussi Brûlure 1."},
  reflet:{n:"Reflet",c:1,t:"skill",block:4,copyLast:true,exhaust:true,r:"peu",i:"🪞",d:"4 de Bouclier, puis rejoue la dernière carte jouée ce tour. Épuise."},
  furie:{n:"Furie",c:0,x:true,t:"atk",xHits:5,r:"rare",i:"😤",d:"X : inflige 5 dégâts X fois (X = toute son énergie)."},
  frenesie:{n:"Frénésie",c:1,t:"power",rage:1,r:"rare",i:"🔴",d:"Chaque fois qu'il subit des dégâts, +1 Force."},
  aurorepure:{n:"Aurore Pure",c:1,t:"skill",heal:10,block:10,draw:1,r:"legende",i:"💧",from:"suicune",d:"Soigne 10 PV, 10 de Bouclier, pioche 1. L'eau redevient claire."},
  lettre:{n:"Lettre d'un ami",c:0,t:"skill",heal:5,draw:2,exhaust:true,r:"legende",i:"✉️",from:"cadoizo",d:"Soigne 5 PV et pioche 2 : quelqu'un pense à lui. Épuise."},
  explosion:{n:"Explosion",c:2,t:"atk",dmg:30,selfDmg:6,exhaust:true,r:"legende",i:"💣",from:"racaillou",d:"30 dégâts, mais le client perd 6 PV. Épuise."},
  metronome:{n:"Métronome",c:1,t:"skill",metronome:true,r:"legende",i:"🎵",from:"melofee",d:"Agite le doigt : joue l'effet d'une carte au hasard (commune, peu commune ou rare)."},
  larcin:{n:"Larcin",c:0,t:"skill",steal:true,retain:true,r:"legende",i:"😼",from:"chaglam",d:"Vole tout le Bouclier de l'ombre et 1 de sa Force. Retenue."},
  babil:{n:"Babil",c:1,t:"atk",dmg:6,para:1,copyLast:true,r:"legende",i:"🦜",from:"pijako",d:"Répète la dernière carte jouée ce tour, puis 6 dégâts et Paralysie 1."},
  courage:{n:"Courage",c:0,t:"skill",block:6,str:1,exhaust:true,r:"temp",i:"🌟"},
  souffle:{n:"Second souffle",c:1,t:"skill",heal:5,draw:1,r:"temp",i:"🌬️"},
  doute:{n:"Doute",c:1,t:"curse",unplayable:true,r:"temp",i:"🌫️",d:"Injouable. Encombre la main."}
};
