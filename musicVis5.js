allSongs = {};
maxTimeDifference = 15;
sessionKey = 0; 

showHint = true; 
count = 0; 

function preload() {
  listeningTable = loadTable('data/viosiega.csv', 'csv', 'header');
  songTable = loadTable('data/first_attempt.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  registerAllSongs(songTable); 
  
  sessions = registerSessions(listeningTable);
  sessionVisualizations = [];
  for(var i = 0; i < sessions.length; i++){
    sessionVisualizations.push(setUpBasicVisuals(sessions[i]));
  }
  
  textFont('Verdana');
}

function draw(){
  background(0);
  strokeWeight(1);
  
  sessionVisualizations[sessionKey].checkHover();
  sessionVisualizations[sessionKey].drawSession();
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    showHint = false; 
    sessionKey--; 
    if(sessionKey < 0){
      sessionKey = sessions.length - 1; 
    }
  }
  else if(keyCode === RIGHT_ARROW){
    showHint = false; 
    sessionKey++;
    if(sessionKey > sessions.length - 1){
      sessionKey = 0; 
    }
  }
  if(keyCode == 65){
    save("mySVG" + count + ".svg");
    count += 1; 
  }
}

function registerSessions(listeningTable){
  var sessions = [];
  var currentSession = [];
  var anotherCounter = 1; 
  var counter = 1; 
  
  var times = [];
  //times.push(allSongs[listeningTable.get(0, 3)]);
  
  currentSession.push(allSongs[listeningTable.get(0, 2)]);
  times.push(listeningTable.get(0, 3));
  
  for(r = 1; r < listeningTable.getRowCount(); r++){
    songTime = Date.parse(listeningTable.get(r, 3)); 
    previousSongTime = Date.parse(listeningTable.get(r - 1, 3)); 
    
    // in the same song session
    if((((previousSongTime - songTime) % 86400000) % 3600000) / 60000 < maxTimeDifference && checkTheseEdges(listeningTable.get(r - 1, 3))){
      currentSession.push(allSongs[listeningTable.get(r, 2)]);
      times.push(listeningTable.get(r, 3));
    }
    else{      
      if(currentSession.length >= 5 && currentSession.length < 35){
        sessions.push(new Session(currentSession, times, anotherCounter));
        anotherCounter++;
      }
      times = [];
      times.push(listeningTable.get(r, 3)); 
      currentSession = [allSongs[listeningTable.get(r, 2)]]; 
       
    }
  }
  
  
  if(currentSession.length >= 5 && currentSession.length < 50){
    sessions.push(new Session(currentSession, times, anotherCounter)); 
  }
  
  
  print(sessions.length); 
  for(var z = 0; z < sessions.length; z++){
    sessions[z].adjustNumber(sessions.length + 1); 
  }
  
  sessions = sessions.reverse(); 
  
  return sessions; 
}

function checkTheseEdges(previousTime){
  //idk why in these cases the value is calculated incorrectly, very sad
  
  var parsedTime = Date.parse(previousTime); 
  
  if(parsedTime == Date.parse("18 Apr 2020 18:22")){
    return false; 
  }
  if(parsedTime == Date.parse("16 Apr 2020 01:11")){
    return false; 
  }
  if(parsedTime == Date.parse("16 Apr 2020 19:17")){
    return false; 
  }
  //if(parsedTime == Date.parse("09 Apr 2020 16:40")){
  //  return false; 
  //}
  return true; 
}

function registerAllSongs(songTable){
  columns = [1, 2, 3, 7, 15, 6, 21];
  
  for(r = 0; r < songTable.getRowCount(); r++){
    tempValues = [];
    
    for (c = 0; c < columns.length; c++) {
      tempValues.push(songTable.get(r, columns[c]));
    }
    
    allSongs[tempValues[0]] = new Song(tempValues); 
  }
}
