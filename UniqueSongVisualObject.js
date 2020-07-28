class UniqueSongVisualObject{
  constructor(_info, _x, _y, _size, _col, totSongs, _infoY){
    this.uniqueSong = _info;
    this.visualObject = new VisualObject(_x, _y, _size, _col);
    
    this.artistConnections = []; 
    this.songConnections = [];
    
    this.totalSongs = totSongs;  
    this.infoY = _infoY; 
  }
  
  calculateDuration(){
    this.duration = this.uniqueSong.duration * this.songConnections.length; 
    
    this.duration = this.duration / 60000; 
  }
  
  showData(){

    
    fill(200);
    textSize(10);
    var dur = str(this.duration); 
    dur = split(dur, ".");
    var txt = "";
    txt += dur[0];
    txt += ":";
    txt += dur[1][0];
    txt += dur[1][1];
    //txt += " min"; 
    var txtWidth = textWidth(txt); 
    text(txt, windowWidth / 2 - txtWidth / 2, this.infoY - 15); 
  }
  
  getIncreaseValue(){
    this.increaseVal = (this.songConnections.length / this.totalSongs) * 15; 
    this.increaseVal = 2;
  }
  
  highlight(highlight){
    this.visualObject.selected = highlight;
    for(var a = 0; a < this.artistConnections.length; a++){
      this.artistConnections[a].visualObject.selected = highlight; 
    }
    for(var s = 0; s < this.songConnections.length; s++){
      this.songConnections[s].visualObject.selected = highlight; 
      this.songConnections[s].tempoVis.selected = highlight;
    }
  }
  
  drawObject(somethingSelected){
    this.visualObject.drawObjectBasic(this.increaseVal, somethingSelected);
  }
  
  showSongText(){
    fill(this.visualObject.objectColor);
    textSize(12);
    
    var artist = this.artist;
    var tWidth = textWidth(artist);
    
    text(this.uniqueSong.track, this.visualObject.x + this.visualObject.size + 5, this.visualObject.y + 4);
  }
  
  checkHover(){
    var textHover = false; 
    textSize(12);
    var tWidth = textWidth(this.uniqueSong.track);
    if(this.visualObject.x + this.visualObject.size + 5 < mouseX && mouseX < this.visualObject.x + this.visualObject.size + 5 + tWidth){
      if(this.visualObject.y + 4 + 4> mouseY && mouseY > this.visualObject.y + 4 - 12 - 3){
        textHover = true; 
      }
    }
    
    return textHover || this.visualObject.checkHover();
  }
}
