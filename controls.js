

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
};


var ovladaniSety = {
    sipky:[cislaklaves.leva,cislaklaves.prava,cislaklaves.horni,cislaklaves.dolni],
    wsad:[cislaklaves.a,cislaklaves.d,cislaklaves.w,cislaklaves.s],
    numpad:[cislaklaves.num4,cislaklaves.num6,cislaklaves.num8,cislaklaves.num5],
    jkli:[cislaklaves.j,cislaklaves.l,cislaklaves.i,cislaklaves.k]
};

function mackanisipky(e){
    klavesy[e.keyCode]=true;
};

function odmackanisipky (e){
    klavesy[e.keyCode]=false;
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