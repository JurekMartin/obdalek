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
            
            if (zkousim.typ === "mic" && testuju.typ === "hrac"){
                
                // počítá statistiku šťouchanců a posledního kdo se dotkl
                pocetkopnuti++;poslednistouch=y;
                statistika.stouchucelkem++;
                statistika[testuju.name].stouchu++;
            };
            
            
            
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
  
             
    for (cislopokusu=0; cislopokusu<2;cislopokusu++){
   
 
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



            if (zkousim.typ!=="mantinel" && zkousim.kolize===0 && zkousim.kolize2===0 && zkousim.hybalse===0){
            zkousim.x=zkousim.x+zkousim.ex/zkousim.hmotnost;
            zkousim.stredx=zkousim.stredx+zkousim.ex/zkousim.hmotnost;
            zkousim.y=zkousim.y+zkousim.ey/zkousim.hmotnost;
            zkousim.stredy=zkousim.stredy+zkousim.ey/zkousim.hmotnost;
            zkousim.hybalse = 1;
            };
            zkousim.kolize=0;
            zkousim.kolize2=0;
            
            if (cislopokusu===1){
              zkousim.hybalse = 0;  
            };
            
            
        };


    };
    
};