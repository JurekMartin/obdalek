var spravujHrace = function (){

    levyHracOsaX = 20;
    pravyHracOsaX = game.width - 60;
    
    pocethracu = document.getElementById("pocethracuFormular").value*1;
    hracu = [0,0];
    nerozdelenychHracu = [0,0];
    
    for (i=0;i<pocethracu;i++){ //do arraye hracu si dám počet pravých [0] a levých [1] hráčů
        hracu[(document.getElementsByName("hracStrana")[i].value*1+1)/2]+=1;

    };

    nerozdelenychHracu[0] = hracu[0];
    nerozdelenychHracu[1] = hracu[1];
 
    for (i=0;i<pocethracu;i++){

        var nr = hraci.length;
        hraci[nr] = new hrac ();
        
        hraci[nr].barva = document.getElementsByName("hracBarva")[i].value;

        hraci[nr].name = document.getElementsByName("hracName")[i].value;

        hraci[nr].strana = document.getElementsByName("hracStrana")[i].value*1;

        var ovl = document.getElementsByName("hracOvladani")[i].value;

        var ovlTed = ovladaniSety[ovl];

        hraci[nr].nastavovladani(ovlTed[0],ovlTed[1],ovlTed[2],ovlTed[3]);


        if (hraci[nr].strana === -1){
            hraci[nr].x = pravyHracOsaX;

        } else {
          hraci[nr].x = levyHracOsaX;
        };

        hraci[nr].stredx = hraci[nr].x + hraci [nr].delka/2;

        var arrayCounter = (hraci[nr].strana+1)/2;

        hraci[nr].y = game.height/(hracu[arrayCounter]+1)*nerozdelenychHracu[arrayCounter]-30;

        nerozdelenychHracu[arrayCounter] +=-1;

        
        hraci[nr].stredy = hraci[nr].y + hraci [nr].vyska/2;        
    };
    
    
    
    
};

var spravujAI = function (){

	levaAIosaX = 225;
	pravaAIosaX = game.width-225;
	
	pocetai = document.getElementById("pocetai").value*1;
	
	for(i=0;i<pocetai;i++){
	
            var nr = ai.length;
            ai[nr] = new hrac ();

            ai[nr].barva = document.getElementsByName("aiBarva")[i].value;

            ai[nr].name = document.getElementsByName("aiName")[i].value;

//            ai[nr].barva = "blue";

//            ai[nr].name = "ROBOT " +(i+1);
  
            ai[nr].strana = document.getElementsByName("aiStrana")[i].value*1;

//            ai[nr].strana = i*2-1;

            ai[nr].nastavovladani(i*250+1,i*250+2,i*250+3,i*250+4);


            if (ai[nr].strana === -1){
                ai[nr].x = pravaAIosaX;

            } else {
              ai[nr].x = levaAIosaX;
            };
	
	
		ai[nr].stredx = ai[nr].x + ai[nr].delka/2;

 		ai[nr].y = game.height/2+30;
        
            ai[nr].stredy = ai[nr].y + ai [nr].vyska/2;   

		if (ai[nr].strana === -1){
		
				ai[nr].nastavai (game.height/7*2+45,game.height/7*5-45,game.width-225,-1);
		
		} else {
				ai[nr].nastavai (game.height/7*2+45,game.height/7*5-45,225,1);
		};
	
	};
	

};

var restartobjektu = function(){
    objekty = [];
    hraci = [];
    ai = [];
    brany=[];
};

var spoctiHrace = function (){
hracu = [0,0];    
for (i=0;i<pocethracu;i++){
        hracu[(document.getElementsByName("hracStrana")[i].value*1+1)/2]+=1;
    };
};

var aktivujhrace = function(){

for (i=0;i<pocethracu;i++){

        delka = objekty.length;
        objekty[delka] = hraci[i];
        if (hraci[i].strana === -1){

        } else if (hraci[i].strana === 1){
        }
   };
     
for (i=0;i<pocetai;i++){
        delka = objekty.length;
        objekty[delka] = ai[i];

   };    
    
    
};

var restarthry = function(){
    
    //když je gól, tak čekám na enter (klávesa 13), po kterém nastavím hru do původní podoby
    
 if (klavesy[13]===true)   {
    
    restartobjektu();
    nastavhru();
    aktivujhrace();
	
    hrajemeotaznik = 1;
    hralijsmeotaznik = 1;
    pocetkopnuti = 0;
    poslednistouch = 0;
    stouchy = {};
    krokreplay = 0;
    timer = 0;
    playhvizd();
 };
};

var nastavhru = function (){

nastavmantinely();
pridejmic (game.width/2,game.height/2,"red");

pridejbranku(game.width-200,game.height/7*2,game.height/7*3,100,"zleva",0,"mediumpurple");
pridejbranku(100,game.height/7*2,game.height/7*3,100,"zprava",1,"lightgreen");

spravujHrace();
spravujAI();
};
