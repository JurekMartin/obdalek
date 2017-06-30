var mantinely = [];
var objekty = [];
var brany=[];

var skore = [0,0];
var hrajemeotaznik = 1;


canvas=document.getElementById("hracipole");
canvas.height = 600;
canvas.width = 1300;

var klavesy=[];
var cislaklaves={
  leva:37,
  prava:39,
  horni:38,
  dolni:40,
  w:87,
  a:65,
  s:83,
  d:68,
  num4:100,
  num6:102,
  num8:104,
  num5:101,
  j:74,
  k:75,
  l:76,
  i:73,
  enter:13
}; // obsahuje info o číslech kláves aby je bylo možné rychle potom přiřazovat

document.addEventListener("keydown", mackanisipky, false);
document.addEventListener("keyup", odmackanisipky, false);

function mackanisipky(e){
    klavesy[e.keyCode]=true;
};

function odmackanisipky (e){
    klavesy[e.keyCode]=false;
};

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

};

var hrac = function (x,y,barva) {
    this.x=x;
    this.y=y;
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
    this.budx=x;
    this.budy=y;
    this.hmotnost=7;
    this.barva=barva;
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

hrac.prototype.nastavovladani = function (leva, prava,horni,dolni){
  // nastaví, které klávesy budou ovládat hráče
  this.leva = leva;
  this.prava = prava;
  this.horni = horni;
  this.dolni = dolni;
};

var vyhodnotovladani = function(){
    // tam, kde je to aktuální, upraví energii o tah motorů na základě zmáčklých kláves
    // pro objekty ovládané AI si nejdřív zavolá funkci která zmáčne za AI klávesy
    
    var delka = objekty.length;

    for (i=0; i<delka; i++){
        
        var timtohybu = objekty[i];

        if (timtohybu.AI===true){
          timtohybu.pohybai();
        };


        if (klavesy[timtohybu.prava]){
        timtohybu.ex=timtohybu.ex+timtohybu.tahmotoru;
        timtohybu.novaex=timtohybu.ex;
        };
    
        if (klavesy[timtohybu.leva]){
        timtohybu.ex=timtohybu.ex-timtohybu.tahmotoru;  
        timtohybu.novaex=timtohybu.ex;
        };
 
        if (klavesy[timtohybu.horni]){
        timtohybu.ey=timtohybu.ey-timtohybu.tahmotoru;
        timtohybu.novaey=timtohybu.ey;
        };
    
        if (klavesy[timtohybu.dolni]){
        timtohybu.ey=timtohybu.ey+timtohybu.tahmotoru;  
        timtohybu.novaey=timtohybu.ey;
        };
       
    };
};

var kamkdochce = function(){
  
  //podle energie vypočítám, kam se který objekt chce pohnout - s tím následně pracuju v tom, jestli tam, kam se chce hýbat, nastane kolize či nikoli
    
  var objektu = objekty.length;

  for (i = 0; i<objektu; i++) {
    var toto = objekty[i];
    if (toto.typ !=="mantinel"){
    toto.budx=toto.x+toto.ex/toto.hmotnost;
    toto.budstredx=toto.stredx+toto.ex/toto.hmotnost;
    toto.budy=toto.y+toto.ey/toto.hmotnost;
    toto.budstredy=toto.stredy+toto.ey/toto.hmotnost;
      };
  };
 
};

var vyhodnotkolize1 = function(){
    
    /*
    
    PRVOTNÍ vyhodnocení kolizí a vypočtení, jak se co od čeho odráží - a co čemu odevzdá jakou energii a kolik si vezme
    
    podívám se, jestli to koliduje
    pokud ano, tak:
        - určím z jakého směru
        - určím, jestli měli stejnou nebo jinou orientaci rychlosti
        - když měli jinou orientaci rychlosti, tak se od sebe prostě odrazí, tzn. půlku energie předají a půlkou se odrazí na druhou stranu a půlku kamarádovy přijmou
        - když měli stejnou orientaci rychlost, tak to znamená, že jeden doháněl druhého, potom:
            - spočítám rychlost obou a rozdíl těchto rychlostí
            - dohánějícímu klesne energie na energii odpovídající rychlosti nárazu, tzn. jeho nová energie bude rozdílrychlostí*hmotnost dohánějícího
            - dohánějící pak půlku nové energie dá doháněnému a druhou půlkou se odrazí na druhou stranu
            - doháněný si zachová svoji energii a k tomu přičte ten kus který dohánějící odevzdal
     */
    
    var objektu = objekty.length;
    
    for (i=0;i<objektu;i++){
        var zkousim = objekty[i];
        if (zkousim.typ !=="mantinel"){
            zkousim.kolize=0;
      for (y=0;y<objektu;y++){
        var testuju = objekty[y];
        
        
        // tohle testuje, že to má spolu v tomto ticku kolidovat!
        if (i!==y 
                &&
                Math.abs(zkousim.budstredx-testuju.budstredx)<=Math.abs(zkousim.delka+testuju.delka)/2
                &&
                Math.abs(zkousim.budstredy-testuju.budstredy)<=Math.abs(zkousim.vyska+testuju.vyska)/2  )
        {
            //TADY BUDE KÓD PRO PŘÍPAD, ŽE TO KOLIDUJE!!
            // TEDY: CHCI Z KAŽDÉ KOLIZE SPOČÍTAT ZMĚNY ENERGIE PRO KAŽDÉHO!!
            
            zkousim.kolize = 1;
            
            if (zkousim.budstredx+zkousim.delka/2>testuju.budstredx-testuju.delka/2
                &&
                zkousim.stredx+zkousim.delka/2<=testuju.stredx-testuju.delka/2){

                // kolize zprava!!!
                
                zkousim.zmenaey = -zkousim.ey*(1-testuju.freflection) + testuju.ey*zkousim.freflection;
                
                switch (zkousim.ex*testuju.ex>0){
                        case true:  //měly stejnou orientaci rychlosti x!
                            
                               var rozdilrychlosti =Math.abs(zkousim.ex/zkousim.hmotnost - testuju.ex/testuju.hmotnost);
                            
                               if (Math.abs(zkousim.ex/zkousim.hmotnost)<Math.abs(testuju.ex/testuju.hmotnost)){
                              // Zkouším je doháněno testujuem!
                            //  zkousim.novaex = zkousim.novaex;
                              zkousim.zmenaex = zkousim.zmenaex - rozdilrychlosti*testuju.hmotnost*(1-testuju.ereflection);
                              
                              
                            } else {
                              //testuju je doháněno zkoušímem!
                              zkousim.novaex = 0;
                              zkousim.zmenaex = - rozdilrychlosti*zkousim.hmotnost*testuju.ereflection; 
                                    
                            };
                            
                            
                            break;
                        
                        case false: //šly proti sobě!
                            
                            //zkouším otočí svoji energii
                            
                            zkousim.novaex=-zkousim.ex*testuju.ereflection;
                            zkousim.zmenaex=zkousim.zmenaex + testuju.ex*(1-zkousim.ereflection);
                            
                            break;                    
                };
                
                };
            
            if (zkousim.budstredx-zkousim.delka/2<testuju.budstredx+testuju.delka/2
                &&
                zkousim.stredx-zkousim.delka/2>=testuju.stredx+testuju.delka/2){
            
                // kolize zleva!!!
                
                zkousim.zmenaey = -zkousim.ey*(1-testuju.freflection) + testuju.ey*zkousim.freflection;

                switch (zkousim.ex*testuju.ex>0){
                  
                        case true:  //měly stejnou orientaci rychlosti x!
                            
                            var rozdilrychlosti =Math.abs(zkousim.ex/zkousim.hmotnost - testuju.ex/testuju.hmotnost);
                            
                            if (Math.abs(zkousim.ex/zkousim.hmotnost)<Math.abs(testuju.ex/testuju.hmotnost)){
                              // Zkouším je doháněno testujuem!
                            //  zkousim.novaex = zkousim.novaex;
                              zkousim.zmenaex = zkousim.zmenaex + rozdilrychlosti*testuju.hmotnost*(1-testuju.ereflection);
                            } else {
                              //testuju je doháněno zkoušímem!
                              zkousim.novaex = 0;
                              zkousim.zmenaex = rozdilrychlosti*zkousim.hmotnost*testuju.ereflection; 
                                    
                            };
                             
                            
                            break;
                        
                        case false: //šly proti sobě! UDELAT TO INTELIGENTNE!!!
                            zkousim.novaex=-zkousim.ex*testuju.ereflection;
                            zkousim.zmenaex=zkousim.zmenaex + testuju.ex*(1-zkousim.ereflection);                            
                            break;
                        
                        
                };
                
                };
            
            if (zkousim.budstredy-zkousim.vyska/2<testuju.budstredy+testuju.vyska/2
                &&
                zkousim.stredy-zkousim.vyska/2>=testuju.stredy+testuju.vyska/2){
            
                // kolize shora!!!
                
                zkousim.zmenaex = -zkousim.ex*(1-testuju.freflection) + testuju.ex*zkousim.freflection;
                    
                switch (zkousim.ey*testuju.ey>0){
                  
                        case true:  //měly stejnou orientaci rychlosti x!
                            
                            var rozdilrychlosti =Math.abs(zkousim.ey/zkousim.hmotnost - testuju.ey/testuju.hmotnost);
                            
                            if (Math.abs(zkousim.ey/zkousim.hmotnost)<Math.abs(testuju.ey/testuju.hmotnost)){
                                // zkouším je doháněno testujuem!
                                
                            //    zkousim.novaey = zkousim.novaey;
                                zkousim.zmenaey = zkousim.zmenaey + rozdilrychlosti*testuju.hmotnost*(1-zkousim.ereflection);
                                
                            } else {
                              // testuju je doháněno zkoušímem!!
                              
                              zkousim.novaey = 0;
                              zkousim.zmenaey = rozdilrychlosti*zkousim.hmotnost*testuju.ereflection;
                                    
                            };
                            
                            break;
                        
                        case false: //šly proti sobě! UDELAT TO INTELIGENTNE!!!
                            zkousim.novaey=-zkousim.ey*testuju.ereflection;
                            zkousim.zmenaey=zkousim.zmenaey + testuju.ey*(1-zkousim.ereflection);                            
                            break;
                        
                        
                };    
                    
                
                };
            
            if (zkousim.budstredy+zkousim.vyska/2>testuju.budstredy-testuju.vyska/2
                &&
                zkousim.stredy+zkousim.vyska/2<=testuju.stredy-testuju.vyska/2){
            
                // kolize zdola!!!
                
                zkousim.zmenaex = -zkousim.ex*(1-testuju.freflection) + testuju.ex*zkousim.freflection;
                
                        switch (zkousim.ey*testuju.ey>0){
                  
                        case true:  //měly stejnou orientaci rychlosti x!
                            
                                 
                            var rozdilrychlosti =Math.abs(zkousim.ey/zkousim.hmotnost - testuju.ey/testuju.hmotnost);
                            
                            if (Math.abs(zkousim.ey/zkousim.hmotnost)<Math.abs(testuju.ey/testuju.hmotnost)){
                                // zkouším je doháněno testujuem!
                                
                            //    zkousim.novaey = zkousim.novaey;
                                zkousim.zmenaey = zkousim.zmenaey - rozdilrychlosti*testuju.hmotnost*(1-zkousim.ereflection);
                                
                            } else {
                              // testuju je doháněno zkoušímem!!
                              
                              zkousim.novaey = 0;
                              zkousim.zmenaey = -rozdilrychlosti*zkousim.hmotnost*testuju.ereflection;
                                    
                            };
                            
                            
                        break;
                        
                        case false: //šly proti sobě! UDELAT TO INTELIGENTNE!!!
                            zkousim.novaey=-zkousim.ey*testuju.ereflection;
                            zkousim.zmenaey=zkousim.zmenaey + testuju.ey*(1-zkousim.ereflection);                            
                        break;
                        
                        
                };    

                };
                
                
        };
            
      };
      };
    };
    
};

var vyhodnotgoly = function(){
    
//    koukám se, jestli je nějaký míč v nějakém brankovišti, pokud ano, tak přidávám gól příslušné straně a zastavuju hru
    
    var objektu = objekty.length;
    var brankovist = brany.length;
    
    for (i=0;i<objektu;i++){
        var zkousim = objekty[i];
        if (zkousim.typ==="mic"){
        
            for (y=0;y<brankovist;y++){
            var testuju = brany[y];
       
                if (
                 Math.abs(zkousim.stredx-testuju.stredx)<=Math.abs(testuju.delka-zkousim.delka-1)/2
                 &&
                 Math.abs(zkousim.stredy-testuju.stredy)<=Math.abs(testuju.vyska-zkousim.vyska-1)/2  )
                {
                  skore[y]=skore[y]+1;
                  hrajemeotaznik = 0;
                };
        
            };
        };
    };
    
};

var nastavnovouenergii = function (){
    
    // dle změn energií, které jsou výsledky kolizí, nastaví nové energie objektům (je třeba to dělat takhle zvlášť, jinak by to mohlo dělat míň hezký bordel u vícenásobných kolizí)
    
    var delkahraci = objekty.length;
  
    for (i=0; i<delkahraci; i++){
        var toto = objekty[i];
        if (toto.typ!=="mantinel"){
        toto.ex=Math.max(-toto.hmotnost*9.9,Math.min(toto.novaex+toto.zmenaex,toto.hmotnost*9.9));
        toto.ex = toto.ex*(1-toto.friction);
        toto.zmenaex=0;
        toto.novaex=toto.ex;
        toto.ey=Math.max(-toto.hmotnost*9.9, Math.min( toto.novaey+toto.zmenaey,toto.hmotnost*9.9));
        toto.ey = toto.ey*(1-toto.friction);
        toto.zmenaey=0;     
        toto.novaey=toto.ey;
        };
    };
  
};

var finalnipohyb = function () {
    
    //zkontroluje, jestli tam, kam chtějí aktuálně objekty, je kolize - pokud tam není, tak se tam objekt posune. Pokud tam je, tak pro tento tick se nehýbe (obrana proti tomu, aby se objekty vnořily do sebe)
  
    var objektu = objekty.length;
    
    for (i=0;i<objektu;i++){
        var zkousim = objekty[i];
        if (zkousim.typ !=="mantinel"){
      for (y=0;y<objektu;y++){
        var testuju = objekty[y];
        
        if (i!==y 
                &&
                Math.abs(zkousim.budstredx-testuju.stredx)<=Math.abs(zkousim.delka+testuju.delka)/2
                &&
                Math.abs(zkousim.budstredy-testuju.stredy)<=Math.abs(zkousim.vyska+testuju.vyska)/2
               )
        {zkousim.kolize2=1;
        } else {};
                
            };
        };
        
    if (zkousim.typ!=="mantinel" && zkousim.kolize===0 && zkousim.kolize2===0){
    zkousim.x=zkousim.x+zkousim.ex/zkousim.hmotnost;
    zkousim.stredx=zkousim.stredx+zkousim.ex/zkousim.hmotnost;
    zkousim.y=zkousim.y+zkousim.ey/zkousim.hmotnost;
    zkousim.stredy=zkousim.stredy+zkousim.ey/zkousim.hmotnost;
    };
    zkousim.kolize=0;
    zkousim.kolize2=0;
        
    };
  

    
    
};

var opakovanyzaber = function (){
  
  for (i=0;i<objekty.length;i++){
    
    
    
  };
    
};

var kreslivse = function(){
    
    //nejdřív to smaže celý canvas a pak to nakreslí všechny objekty - mantinely, hráče a míč
    //nekreslí hlášky při gólu, na to slouží kresliend()
    
  var ctx=canvas.getContext("2d");
  var delkamantinelu=mantinely.length;
  var objektu=objekty.length;
  var brankovist = brany.length;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (i=0;i<brankovist;i++){
    totokreslim=brany[i];
    
    ctx.beginPath();
    ctx.rect(totokreslim.x,totokreslim.y,totokreslim.delka,totokreslim.vyska);
    ctx.fillStyle = totokreslim.barva;
    ctx.fill();
    ctx.closePath(); //u rectanglu asi být nemusí
    ctx.stroke();
    };
  
  
  for (i=0;i<delkamantinelu;i++){
    totokreslim=mantinely[i];
    
    ctx.beginPath();
    ctx.rect(totokreslim.x,totokreslim.y,totokreslim.delka,totokreslim.vyska);
    ctx.fillStyle = totokreslim.barva;
    ctx.fill();
    ctx.closePath(); //u rectanglu asi být nemusí
    ctx.stroke();  
  };  
  
    for (i=0;i<objektu;i++){
    totokreslim=objekty[i];
    
    ctx.beginPath();
    ctx.rect(totokreslim.x,totokreslim.y,totokreslim.delka,totokreslim.vyska);
    ctx.fillStyle = totokreslim.barva;
    ctx.fill();
    ctx.closePath(); //u rectanglu asi být nemusí
    ctx.stroke();
  };
    
};

var kresliend = function(){
    
// nakreslí hlášky při padnutí gólu

var ctx = canvas.getContext("2d");
ctx.font = "150px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Góóóól!", canvas.width/2, canvas.height/2-50);

ctx.font = "150px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText(skore[0]+" : "+skore[1], canvas.width/2, canvas.height/2+100);

ctx.font = "40px Comic Sans MS";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("(Pro pokračování stiskni enter)", canvas.width/2, canvas.height/2+180);

};

var nastavmantinely = function(){

// nastavuje 4 mantinely okolo hrací plochy
    
delka = objekty.length;
objekty[delka] = new mantinel (0,0,canvas.height-10,10);
objekty[delka+1] = new mantinel (10,00,10,canvas.width-10);
objekty[delka+2] = new mantinel (0,canvas.height-10,10,canvas.width-10);
objekty[delka+3] = new mantinel (canvas.width-10,10,canvas.height-10,10);

};

var pridejhrace = function(x,y,barva,leva,prava,horni,dolni,AI,ystredmin, ystredmax, xstred, levaprava){
  
  // pokud není AI = true, tak se všechno za AI dá ignorovat
    
  delka = objekty.length;
  objekty[delka] = new hrac (x,y,barva);
  objekty[delka].nastavovladani(leva,prava,horni,dolni);
  
  if (AI===true){
      objekty[delka].nastavai (ystredmin, ystredmax, xstred, levaprava);
  };
     
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

var restarthry = function(){
    
    //když je gól, tak čekám na enter (klávesa 13), po kterém nastavím hru do původní podoby
    
 if (klavesy[13]===true)   {
    mantinely = [];
    objekty = [];
    brany=[];
    
    nastavhru();
    
    hrajemeotaznik = 1;
 };
};

var nastavhru = function (){

//výhledově bych to mohl upravit, aby se věci přidávaly inteligentněji (ideálně nějaký dotaz na začátku kolik chci hráčů a jestli chci AI brankáře a jak chytré...), ale není to teď priorita

nastavmantinely();
pridejmic (canvas.width/2,canvas.height/2,"red");

pridejbranku(canvas.width-200,canvas.height/7*2,canvas.height/7*3,100,"zleva",0,"purple");
pridejbranku(100,canvas.height/7*2,canvas.height/7*3,100,"zprava",1,"green");

//pridejhrace(900,canvas.height/2-130,"orange",200,201,202,203,true,canvas.height/7*2+45,canvas.height/7*5-45,canvas.width-225,0);
//pridejhrace(400,canvas.height/2-130,"brown",300,301,302,303,true,canvas.height/7*2+45,canvas.height/7*5-45,225,0);

pridejhrace(canvas.width-60,canvas.height/2-30,"purple",cislaklaves.leva, cislaklaves.prava, cislaklaves.horni, cislaklaves.dolni);
pridejhrace(20,canvas.height/2-30,"green",cislaklaves.a, cislaklaves.d, cislaklaves.w, cislaklaves.s);


// pridejhrace(canvas.width-60,canvas.height/2+60,"pink",cislaklaves.j,cislaklaves.l, cislaklaves.i, cislaklaves.k);
// pridejhrace(20,canvas.height/2+60,"yellow",cislaklaves.num4, cislaklaves.num6, cislaklaves.num8, cislaklaves.num5);

};

nastavhru();
kreslivse();
var hra = function (){


    if (hrajemeotaznik === 1) {

    // VYHODNOŤ OVLÁDÁNÍ - změna energie
    // VYHODNOŤ kam chce kdo jít
    // VYHODNOŤ kdo s kým koliduje
    // VYHODNOŤ jak si kdo popředává energii
    // NASTAV novou energii
    // VYHODNOŤ ZNOVU kam chce kdo jít
    // POHNI s každým postupně - podívej se, jestli je na novém místě kolize. POKUD ANO nehýbej se, POKUD NE pohni se tam
    // NAKRESLI VŠE
    
    vyhodnotovladani();
    kamkdochce();
    vyhodnotkolize1();
    
    nastavnovouenergii();
    kamkdochce();
    finalnipohyb();
    vyhodnotgoly();
    kreslivse();
    
    } else {
        
        // pořád kreslím objekty jak byly, ale už s ničím nehýbu, nakreslím góol a skóre a čekám na enter
        
        kreslivse();
        kresliend();
        restarthry();

    };
    
};

hrajemeotaznik = 1;
setInterval(hra, 20);