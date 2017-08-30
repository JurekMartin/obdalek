var game = new Object();
var hC = window.innerHeight*0.85/600;
var wC = window.innerWidth*0.85/1300;
var C = Math.min(hC,wC);
game.height = 600;
game.width = 1300;

canvas=document.getElementById("hracipole");
var ctx=canvas.getContext("2d");

var gameResize = function(){

var hC = window.innerHeight*0.85/600;
var wC = window.innerWidth*0.85/1300;
var C = Math.min(hC,wC);

canvas.height = 600*C;
canvas.width = 1300*C;
ctx.scale(C,C);

};


var kreslivse = function(){
    
    //nejdřív to smaže celý canvas a pak to nakreslí všechny objekty - mantinely, hráče a míč
    //nekreslí hlášky při gólu, na to slouží kresliend()
    
  var ctx=canvas.getContext("2d");
  var delkamantinelu=mantinely.length;
  var objektu=objekty.length;
  var brankovist = brany.length;
  
  ctx.clearRect(0, 0, game.width, game.height);

  
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

var pxtext = function(pocetpx,font){
    return(Math.round(pocetpx)+"px "+font);  
};
var bFont = "Comic Sans MS";

var kresliend = function(){
    
// nakreslí hlášky při padnutí gólu

var hlaskakegolu = "";
if (kampadlgol+objekty[poslednistouch].strana ===0){
  hlaskakegolu=", dobře "+objekty[poslednistouch].name+"!!";
} else {
  hlaskakegolu =", ajajaj, vlastňák!";  
};

var ctx = canvas.getContext("2d");
ctx.font = pxtext(100,bFont);
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Góóóól!", game.width/2, game.height/2-200);

ctx.font = pxtext(100,bFont);
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText(skore[0]+" : "+skore[1], game.width/2, game.height/2-100);

ctx.font = pxtext(20,bFont);
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("(Pro pokračování stiskni enter, bacha ať zároveň neentruješ tlačítko dole)", game.width/2, game.height/2-70);

ctx.font = pxtext(40,bFont);
ctx.fillStyle = objekty[poslednistouch].barva;
ctx.textAlign = "center";
ctx.fillText("Gól dal: " + objekty[poslednistouch].name +hlaskakegolu, game.width/2, game.height/2-20);

ctx.font = pxtext(40,bFont);
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("počet dotyků hráčů s míčem: " + pocetkopnuti, game.width/2, game.height/2+30);

var aktualnipx = 40;

for (i=0;i<pocethracu;i++){
    ctx.font = pxtext(40,bFont);
    ctx.fillStyle = hraci[i].barva;
    ctx.textAlign = "center";
    ctx.fillText(hraci[i].name+" skóre " +statistika[hraci[i].name].skore[0]+":"+statistika[hraci[i].name].skore[1]+" ("+(statistika[hraci[i].name].skore[0]-statistika[hraci[i].name].skore[1])*hraci[i].strana+")"  +", držení míče: "+statistika[hraci[i].name].stouchu+"/"+statistika.stouchucelkem+"("+Math.round(statistika[hraci[i].name].stouchu/statistika.stouchucelkem*100)+" %)", game.width/2, game.height/2+aktualnipx+(1+i)*aktualnipx);

};

for (i=0;i<pocetai;i++){
    ctx.font = pxtext(40,bFont);
    ctx.fillStyle = ai[i].barva;
    ctx.textAlign = "center";
    ctx.fillText(ai[i].name+" skóre " +statistika[ai[i].name].skore[0]+":"+statistika[ai[i].name].skore[1]+", držení míče:"+statistika[ai[i].name].stouchu+"/"+statistika.stouchucelkem+"("+Math.round(statistika[ai[i].name].stouchu/statistika.stouchucelkem*100)+" %)", game.width/2, game.height/2+aktualnipx+(1+i)*aktualnipx+pocethracu*aktualnipx);

};


};