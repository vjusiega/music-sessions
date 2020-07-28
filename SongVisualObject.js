class SongVisualObject{
  constructor(_info, _x, _y, _size, _col, _time, _infoY){
    this.song = _info;
    this.visualObject = new VisualObject(_x, _y, _size, _col);
    
    this.uniqueSongConnections = []; 
    this.increaseVal = 2; 
    this.time = this.formatTime(_time); 
    this.infoY = _infoY; 
  }
  
  formatTime(time){
    var splitTime = split(time, " ");
    var actualTime = splitTime[splitTime.length - 1];
    var hourSecond = split(actualTime, ":");
    var hour = hourSecond[0];
    var second = hourSecond[1];
    var amPM = "AM";
    if(int(hour) > 12){
      amPM = "PM";
      hour = int(hour) - 12; 
    }
    if(int(hour) == 0){
      hour = 12; 
    }
    
    var timeString = "";
    timeString += hour;
    timeString += ":";
    timeString += second; 
    timeString += " "; 
    timeString += amPM;
    return timeString; 
  }
  
  addTempoGraph(x, y, _width, maxHeight){
    this.tempoVis = new TempoIntensityVisual(this.song.tempo, this.song.energy, x, y, _width, maxHeight);
  }
  
  highlight(highlight){
    this.visualObject.selected = highlight;
    for(var u = 0; u < this.uniqueSongConnections.length; u++){
      this.uniqueSongConnections[u].visualObject.selected = highlight; 
      this.uniqueSongConnections[u].highlight(highlight);
    }
    this.tempoVis.selected = highlight;
    //if(highlight){
    //  this.increaseVal = 3.5;
    //}
    //else{
    //  this.increaseVal = 0;
    //}
  }
  
  drawObject(somethingSelected){
    this.visualObject.drawObjectBasic(this.increaseVal, somethingSelected);
  }
  
  drawTempo(somethingSelected){
    this.tempoVis.playTempo();
    this.tempoVis.drawTempo(somethingSelected);
    this.tempoVis.drawFadedTempo(somethingSelected);
  }
  
  showSongText(){
    stroke(200);
    fill(200);
    textSize(20);
    text(this.song.track, 100, 100);
  }
  
  showData(){
    fill(200);
    textSize(10);
    var splitText = split(this.time, ":");
    splitText = splitText[0];
    var txtWidth = textWidth(splitText); 
    text(this.time, this.visualObject.x - txtWidth - 10, this.infoY - 15); 
  }
  
  checkHover(){
    return this.visualObject.checkHover() || this.tempoVis.checkHover();
  }
}
