//var mainColors = [color(255, 241, 16), color(255, 211, 0), color(255, 180, 0), color(255, 148, 23), color(255, 113, 49), color(255, 75, 70), 
//      color(255, 22, 89), color(250, 0, 108), color(224, 0, 125), color(191, 0, 141), color(150, 0, 154), color(97, 0, 162)];
      
//var mainColorsAlpha = [color(255, 241, 16, a), color(255, 211, 0, a), color(255, 180, 0, a), color(255, 148, 23, a), color(255, 113, 49, a), color(255, 75, 70, a), 
//      color(255, 22, 89, a), color(250, 0, 108, a), color(224, 0, 125, a), color(191, 0, 141, a), color(150, 0, 154, a), color(97, 0, 162, a)];
      
var a = 100; //alpha that can be set at any time


function setUpBasicVisuals(session){
  var artistY = 3 * windowWidth / 8;
  var uSongY = 5 * windowWidth / 8; 
  var songY =  windowWidth / 2; // song plays are in the center
  
  return new SessionVisualization(session, windowWidth, artistY, uSongY, songY); 
}

function visualizeBasic(session, visualizationSession){
  
}
