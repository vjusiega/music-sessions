class ArtistVisualObject {
  constructor(_info, _x, _y, _size, _col, totSongs, _infoY) {

    this.artist = _info; 
    this.visualObject = new VisualObject(_x, _y, _size, _col);

    this.uniqueSongConnections = []; 
    this.totalSongs = totSongs;
    this.infoY = _infoY; 
  }
  
  calculateDuration(){
    this.duration = 0; 
    for(var u = 0; u < this.uniqueSongConnections.length; u++){
      this.duration += this.uniqueSongConnections[u].duration; 
    }
  }

  getIncreaseValue() {
    var sum = 0; 

    for (var u = 0; u < this.uniqueSongConnections.length; u++) {
      sum += this.uniqueSongConnections[u].songConnections.length;
    }

    this.increaseVal = (sum / this.totalSongs) * 15;
    this.increaseVal = 2; 
  }

  highlight(highlight) {    
    this.visualObject.selected = highlight;

    for (var u = 0; u < this.uniqueSongConnections.length; u++) {
      this.uniqueSongConnections[u].visualObject.selected = highlight; 
      for (var s = 0; s < this.uniqueSongConnections[u].songConnections.length; s++) {
        this.uniqueSongConnections[u].songConnections[s].visualObject.selected = highlight;
        this.uniqueSongConnections[u].songConnections[s].tempoVis.selected = highlight;
      }
    }
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

  drawObject(somethingSelected) {
    this.visualObject.drawObjectBasic(this.increaseVal, somethingSelected);
  }

  showArtistText() {
    //stroke(200);
    fill(this.visualObject.objectColor);
    textSize(12);

    var artist = this.artist;
    var tWidth = textWidth(artist);

    text(this.artist, this.visualObject.x - tWidth - this.visualObject.size - 5, this.visualObject.y + 4);
  }
  
  checkHover(){
    var textHover = false;
    textSize(12);
    var tWidth = textWidth(this.artist);
    
    if(this.visualObject.x - tWidth - this.visualObject.size - 5 < mouseX && mouseX < this.visualObject.x - tWidth - this.visualObject.size - 5 + tWidth){
      if(this.visualObject.y + 4 + 4 > mouseY && mouseY > this.visualObject.y + 4 - 12 - 3){
        textHover = true;
      }
    }
    
    return textHover || this.visualObject.checkHover();
  }
}
