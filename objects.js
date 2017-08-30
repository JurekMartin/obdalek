

var mantinel = function (x,y,vyska,delka){
    this.x=x;
    this.y=y;
    this.vyska=vyska;
    this.delka=delka;
    this.stredx=this.x+this.delka/2;
    this.stredy=this.y+this.vyska/2;
    this.barva="blue";
    this.typ="mantinel";
    this.leva = 1000;
    this.prava = 1000;
    this.horni = 1000;
    this.dolni = 1000;
    this.ex=0;
    this.ey=0;
    this.novaex=0;
    this.novaey=0;
    this.budx=x;
    this.budy=y;
    this.budstredx=this.stredx;
    this.budstredy=this.stredy;
    this.ereflection=1;
    this.freflection=1;
    this.AI=false;
    this.krokreplay=0;
    this.replay=[];
    this.replax=[];
};

var hrac = function () {
    this.x=0;
    this.y=0;
    this.vyska=60;
    this.delka=40;
    this.stredx=this.x+this.delka/2;
    this.stredy=this.y+this.vyska/2;
    this.ex=10;
    this.ey=10;
    this.tahmotoru = 3; //o kolik se změní energie za 1 tick při zmáčknutí příslušné klávesy!
    this.novaex=0;
    this.zmenaex=0;
    this.novaey=0;
    this.zmenaey=0;
    this.budx=this.x;
    this.budy=this.y;
    this.hmotnost=7;
    this.barva="white";
    this.typ="hrac";
    this.budstredx=this.stredx;
    this.budstredy=this.stredy;
    this.ereflection=0.5;
    this.freflection=0.5;
    this.friction = 0.05;
    this.AI=false;
    this.AIstredy=0;
    this.AIstredxmax=0;
    this.AIstredxmin=0;
    this.AIzlevazprava="zprava";
    this.krokreplay=0;
    this.replay=[];
    this.replax=[];
    this.stouchu=0;
    this.strana=1; //1 = levá, -1 = pravá
    this.name="";

};

var mic = function (x,y,barva) {
    this.x=x;
    this.y=y;
    this.vyska=12;
    this.delka=12;
    this.stredx=this.x+this.delka/2;
    this.stredy=this.y+this.vyska/2; //Y souřadnice jsou vlastně dolů záporné!!
    this.ex=0;
    this.ey=0;
    this.novaex=0;
    this.zmenaex=0;
    this.novaey=0;
    this.zmenaey=0;
    this.budx=x;
    this.budy=y;
    this.budstredx=this.stredx;
    this.budstredy=this.stredy;
    this.hmotnost=2;
    this.barva = barva;
    this.typ = "mic";
    this.leva = 1000;
    this.prava = 1000;
    this.horni = 1000;
    this.dolni = 1000;
    this.ereflection=0.5;
    this.freflection = 0.5;
    this.friction = 0.000;
    this.AI=false;
    this.krokreplay=0;
    this.replay=[];
    this.replax=[];
};

var brana = function (x,y,vyska,delka,barva,cije){
  this.x=x;
  this.y=y;
  this.vyska=vyska;
  this.delka=delka;
  this.stredx=this.x+this.delka/2;
  this.stredy=this.y+this.vyska/2;
  this.barva=barva;
  this.typ="brany";
  this.cije = cije;
};


hrac.prototype.nastavai = function (ystredmin, ystredmax, xstred, levaprava){
  this.AI = true;
  this.AIstredx = xstred;
  this.AIstredymax = ystredmax;
  this.AIstredymin = ystredmin;
  this.AIzlevazprava = levaprava; 
 this.ereflection=1.1;
 this.freflection=0.05;
 
// this.vyska=100;

};

hrac.prototype.pohybai = function(){
    // nastasvuje, jak se bude hýbat AI
    //xstred: kde to AI zakotví na rozměru levo-pravo, ystredmax - kam maximálně dolů zajede, ystredmin - kam maximálně nahoru zajede, levaprava - nakonec zatím nepoužívám
    
    var totohonim = 0;
    var delkahoneni = 0;
    var xrychlosthoneneho = 0;
    var yrychlosthoneneho = 0;
    
    klavesy[this.prava]=false;
            klavesy[this.leva]=false;
            klavesy[this.horni]=false;
            klavesy[this.dolni]=false;
            
            for (z=0; z<objekty.length;z++){
              if (objekty[z].typ==="mic"){
                  
                  totohonim = objekty[z].stredy;
                  delkahoneni = Math.abs( Math.abs(this.stredx - objekty[z].stredx) - this.delka/2 - objekty[z].delka/2);
                  xrychlosthoneneho = Math.abs(objekty[z].ex/objekty[z].hmotnost);
                  yrychlosthoneneho = objekty[z].ey/objekty[z].hmotnost;
                  
                  if ( (this.stredx-objekty[z].stredx)*objekty[z].ex>0 && delkahoneni < 1680 && xrychlosthoneneho>3 ){
                      totohonim = objekty[z].stredy+delkahoneni/xrychlosthoneneho*yrychlosthoneneho;
                  };
                  

                if (this.stredy>totohonim &&this.stredy>this.AIstredymin && (Math.abs(this.stredy - this.AIstredymin)>35 || (this.ey/this.hmotnost)>-3 )   ||this.stredy>this.AIstredymax){
                  klavesy[this.horni]=true;  
                };
                if (this.stredy<totohonim &&this.stredy<this.AIstredymax && (Math.abs(this.stredy - this.AIstredymax)>35 || (this.ey/this.hmotnost)<3) ||this.stredy<this.AIstredymin){
                klavesy[this.dolni]=true;  
                };
                        
                  
              };  
            };

            if (this.stredx<this.AIstredx){
            klavesy[this.prava]=true;
            };     
            if (this.stredx>this.AIstredx){
            klavesy[this.leva]=true;
            };
            
};

hrac.prototype.nastavovladani = function (leva, prava,horni,dolni){
  // nastaví, které klávesy budou ovládat hráče
  this.leva = leva;
  this.prava = prava;
  this.horni = horni;
  this.dolni = dolni;
};

var pridejmic = function(x,y,barva){
    
  // pozor, AI se teď neumí vypořádat se stavem více míčů :) Jinak není problém jich mít víc
    
  delka = objekty.length;
  objekty[delka] = new mic (x,y,barva);
};

var pridejbranku = function(x,y,vyska,sirka,otvor,cijebranka,barvabranky) {
    
    //vyrobí branku ze tří mantinelů!
    // pro připomenutí parametry mantinelu: x,y,vyska,delka
    
    delka = objekty.length;
    delkabrankovist = brany.length;
    
    switch (otvor){
        case "zleva":
            objekty[delka]=new mantinel (x,y,10,sirka-10);
            objekty[delka+1]=new mantinel(x+sirka-10,y+10,vyska-20,10);
            objekty[delka+2]=new mantinel(x,y+vyska-10,10,sirka-10);
            brany[delkabrankovist]=new brana (x,y+10,vyska-20,sirka-10,barvabranky,cijebranka);
            
        break;
        
        case "zprava":
            objekty[delka]=new mantinel (x+10,y,10,sirka-10);
            objekty[delka+1]=new mantinel(x,y+10,vyska-20,10);
            objekty[delka+2]=new mantinel(x+10,y+vyska-10,10,sirka-10);
            brany[delkabrankovist]=new brana (x+10,y+10,vyska-20,sirka-10,barvabranky,cijebranka);
        break;
    };    
    
};
