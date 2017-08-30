var mantinely = [];
var objekty = [];
var brany=[];
var pocethracu = 3;
var pocetai = 0;

var statistika = {};
var hraci = [];
var ai = [];

var skore = [0,0];
var hrajemeotaznik = 1;
var hralijsmeotaznik = 1;

var hracu = [0,0];
var levychHracu = 0;
var pravychHracu = 0;

var krokreplay = 0;
var timer = 0;
var pocetkopnuti = 0;
var poslednistouch = 0;
var kampadlgol = 0; //1 vlevo, -1 vpravo
// krokreplay a timer slouží k nastavení replaye, pocetkopnuti a poslednistouch na statistiku kdo dal gól a kolik bylo dotyků s míčem

gameResize();

window.addEventListener ("resize",gameResize,false);

var vidimHru = 1;

var toggleHru = function(){
    
    if (vidimHru === 1){
      
        vidimHru = 0;
        document.getElementById("hracipole").style.display="none";
        document.getElementById("menu").style.display="block";
        
    } else {
        vidimHru = 1;
        document.getElementById("hracipole").style.display="block";
        document.getElementById("menu").style.display="none";        
    };
    
};

var toggleHraci = function(){
    var X = document.getElementById("pocethracuFormular").value;
    var XX = document.getElementById("pocetai").value;
    
    for (i=0;i<4;i++){
        if (i<X){
        document.getElementById("hrac"+(i+1)).style.display="block";
        } else {
        document.getElementById("hrac"+(i+1)).style.display="none";
        }
    };

    for (i=0;i<2;i++){
        if (i<XX){
        document.getElementById("AI"+(i+1)).style.display="block";
        } else {
        document.getElementById("AI"+(i+1)).style.display="none";
        }
    };

};

document.addEventListener("keydown", mackanisipky, false);
document.addEventListener("keyup", odmackanisipky, false);


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
                  statistika[objekty[poslednistouch].name].skore[y] +=  1;
                  kampadlgol = y*2-1;
                  hrajemeotaznik = 0;
                };
        
            };
        };
    };
    
};

var opakovanyzaber = function (){

//    každému objektu nastavuje x a y podle minulých hodnot zapsaných v replay a replax
//    jede to smyčku - po x to zase najede odzačátku


  if (this.krokreplay>249){

                this.timer++;
                if (this.timer>35){
                this.krokreplay=0;
                this.timer=0;
                };
    } else {
            for (i=0;i<objekty.length;i++){
            objekty[i].y=objekty[i].replay[this.krokreplay];
            objekty[i].x=objekty[i].replax[this.krokreplay];
        };
            this.krokreplay++;       
          
    };   
    
};

var zaznamenejpohyb = function (){
    
    // vezme každý objekt a do replay a replax mu zapíše aktuální polohu. v případě, že není
    // historie dost velká, natáhne to na 251 údajů v arrayi
   
    for (i=0;i<objekty.length;i++){


    while (objekty[i].replay.length<251){
    objekty[i].replay.push(objekty[i].y);
    objekty[i].replax.push(objekty[i].x);
    };
    
    objekty[i].replay.shift();
    objekty[i].replax.shift(); 
    }; 
};

var nastavmantinely = function(){

// nastavuje 4 mantinely okolo hrací plochy
    
delka = objekty.length;
objekty[delka] = new mantinel (0,0,game.height-10,10);
objekty[delka+1] = new mantinel (10,00,10,game.width-10);
objekty[delka+2] = new mantinel (0,game.height-10,10,game.width-10);
objekty[delka+3] = new mantinel (game.width-10,10,game.height-10,10);

};

var restartstatistik = function(){

statistika ={};
statistika.stouchucelkem=0;
    
for (i=0;i<pocethracu;i++){
    statistika[hraci[i].name]={};
    statistika[hraci[i].name].skore=[0,0];
    statistika[hraci[i].name].stouchu=0;
   };
     
for (i=0;i<pocetai;i++){
        statistika[ai[i].name]={};
        statistika[ai[i].name].skore=[0,0];
        statistika[ai[i].name].stouchu=0;
   };
};

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
    zaznamenejpohyb();
    
    } else if (hrajemeotaznik ===0) {
        
        // pořád kreslím objekty jak byly, ale už s ničím nehýbu, nakreslím góol a skóre a čekám na enter
        
        if (hralijsmeotaznik === 1){
          hralijsmeotaznik = 0;
          playhorn();
          // tady bude hraní gólové sirény
        };
        
        opakovanyzaber();
        kreslivse();
        kresliend();
        restarthry();

    };
    
};

nastavhru();
restartstatistik();
nactizvuky();
klavesy[13]=true;restarthry();klavesy[13]=false;
setInterval(hra, 20);