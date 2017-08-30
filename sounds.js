var nactizvuky = function (){
  //Create the audio tag
    hvizd = document.createElement("audio");
    hvizd.preload = "auto";

    //Load the sound file (using a source element for expandability)
    var src = document.createElement("source");
    src.src = "hvizd.mp3";
    hvizd.appendChild(src);
    
    //Load the audio tag
    hvizd.load();
    
    
      //Create the audio tag
    horn = document.createElement("audio");
    horn.preload = "auto";

    //Load the sound file (using a source element for expandability)
    var src = document.createElement("source");
    src.src = "gol_horn.mp3";
    horn.appendChild(src);
    
    //Load the audio tag
    horn.load();
    
    
};

function playhvizd() {
   //Set the current time for the audio file to the beginning
   hvizd.volume = 1;
   hvizd.play();

};

function playhorn() {
   //Set the current time for the audio file to the beginning
   horn.volume = 1;
   horn.play();

}  