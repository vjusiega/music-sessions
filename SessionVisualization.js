class SessionVisualization{
  constructor(sess, _disWidth, _artistY, _uSongY, _songY){
    this.session = sess; 
    
    this.visualArtists = [];
    this.visualUniqueSongs = [];
    this.visualSongs = [];
    
    this.somethingSelected = false; 
    this.hoverObject = null; 
    this.selected = [];
    
    this.connectionLines = [];
    
    this.setUpVisualObjects(_disWidth, _artistY, _uSongY, _songY);
  }
  
  setUpVisualObjects(disWidth, artistX, uSongX, songX){
    
    var my_white = color(242, 211, 221); 
    var artistWidth = this.getSectionWidth(20, this.session.distinctArtists.length); 
    var uSongWidth = this.getSectionWidth(20, this.session.distinctSongs.length);
    var songWidth = this.getSectionWidth(20, this.session.songOrder.length);
    
    var artist_start = (windowHeight - (artistWidth * this.session.distinctArtists.length)) / 2;
    var unique_start = (windowHeight - (uSongWidth * this.session.distinctSongs.length)) / 2;
    var song_start = (windowHeight - (songWidth * this.session.songOrder.length)) / 2;
    
    var circle_size = 9; 
    
    // create objects with no connections
    var aLength = this.session.distinctArtists.length - 1; 
    for(var a = 0; a < this.session.distinctArtists.length; a++){
      this.visualArtists.push(new ArtistVisualObject(this.session.distinctArtists[a], artistX, artist_start + ((aLength - a) * artistWidth), circle_size, my_white, this.session.songOrder.length, song_start));
    }
    var uLength = this.session.distinctSongs.length - 1; 
    for(var u = 0; u < this.session.distinctSongs.length; u++){
      this.visualUniqueSongs.push(new UniqueSongVisualObject(this.session.distinctSongs[u], uSongX, unique_start + ((uLength - u) * uSongWidth), circle_size, my_white, this.session.songOrder.length, song_start));
    }
    var sLength = this.session.songOrder.length - 1; 
    for(var s = 0; s < this.session.songOrder.length; s++){
      this.visualSongs.push(new SongVisualObject(this.session.songOrder[s], songX, song_start + ((sLength - s) * songWidth), circle_size, my_white, this.session.times[s], song_start));
    }
    
    //this.visualArtists = reverse(this.visualArtists); 
    //this.visualUniqueSongs = reverse(this.visualUniqueSongs); 
    this.visualSongs = reverse(this.visualSongs); 
    
    
    // add connections to each 
    for(u = 0; u < this.visualUniqueSongs.length; u++){
      for(a = 0; a < this.visualArtists.length; a++){
        if(this.visualUniqueSongs[u].uniqueSong.artist == this.visualArtists[a].artist){
          this.visualUniqueSongs[u].artistConnections.push(this.visualArtists[a]);
          this.visualArtists[a].uniqueSongConnections.push(this.visualUniqueSongs[u]);
          
          //this.connectionLines.push(new ConnectionLine(this.visualUniqueSongs[u], this.visualArtists[a]));
        }
      }
      for(s = 0; s < this.visualSongs.length; s++){
        if(this.visualUniqueSongs[u].uniqueSong.artist == this.visualSongs[s].song.artist && this.visualUniqueSongs[u].uniqueSong.track == this.visualSongs[s].song.track){
          this.visualUniqueSongs[u].songConnections.push(this.visualSongs[s]);
          this.visualSongs[s].uniqueSongConnections.push(this.visualUniqueSongs[u]);
          
          this.connectionLines.push(new ConnectionLine(this.visualUniqueSongs[u], this.visualSongs[s]));
        }
        
      }
    }
    
    for(s = 0; s < this.visualSongs.length; s++){
      for(a = 0; a < this.visualArtists.length; a++){
        if(this.visualSongs[s].song.artist == this.visualArtists[a].artist){
          this.connectionLines.push(new ConnectionLine(this.visualSongs[s], this.visualArtists[a]));
        }
      }
    }
    
    for(var u2 = 0; u2 < this.visualUniqueSongs.length; u2++){
      this.visualUniqueSongs[u2].getIncreaseValue();
      this.visualUniqueSongs[u2].calculateDuration(); 
    }
    
    for(var a2 = 0; a2 < this.visualArtists.length; a2++){
      this.visualArtists[a2].getIncreaseValue();
      this.visualArtists[a2].calculateDuration(); 
    }

    var columnWidth = 20;
    var totalWidth = columnWidth * this.visualSongs.length; 
    var startWidth = (windowWidth / 2) - (totalWidth / 2); 
    for(s = 0; s < this.visualSongs.length; s++){
      this.visualSongs[s].addTempoGraph(startWidth + columnWidth * s, windowHeight, columnWidth, windowHeight /4);
    }
    
  }
  
  drawSession(){
    for(var s = this.visualSongs.length - 1; s >= 0; s--){
      this.visualSongs[s].drawTempo(this.somethingSelected);
    }
    for(var c = 0; c < this.connectionLines.length; c++){
      this.connectionLines[c].drawLine(this.somethingSelected);
    }
    for(s = 0; s < this.visualSongs.length; s++){
      this.visualSongs[s].drawObject(this.somethingSelected);
    }
    for(var a = 0; a < this.visualArtists.length; a++){
      this.visualArtists[a].drawObject(this.somethingSelected);
      this.visualArtists[a].showArtistText();
    }
    for(var u = 0; u < this.visualUniqueSongs.length; u++){
      this.visualUniqueSongs[u].drawObject(this.somethingSelected);
      this.visualUniqueSongs[u].showSongText();
    }
    
    this.drawSessionText();
  }
  
  drawSessionText(){
    push(); 
    fill(199, 185, 191); 
    textSize(30); 
    var txt = "Session #";
    txt += this.session.sessionNumber;
    var sessionWidth = textWidth(txt); 
    
    fill(242, 211, 221); 
    text(txt, 50, 70); 
    
    if(showHint){
      textSize(12);
      fill(100);
      text("- use arrow keys to explore listening sessions -", 60 + sessionWidth, 70); 
      fill(242, 211, 221); 
    }
    
    textSize(16);
    var outputText = "";
    var dateText = this.session.times[this.session.times.length - 1];
    var dateTextList = split(dateText, " ");
    if(dateTextList[1] == "Apr"){
      outputText += "April ";
    }
    outputText += dateTextList[0];
    outputText += ", ";
    outputText += dateTextList[2];
    
    //dateText += " - ";
    //var splitDate = this.session.times[0];
    //splitDate = split(splitDate, " ");
    //dateText += splitDate[splitDate.length - 1];
    //fill(255, 236, 59); 
    text(outputText, 50 + (sessionWidth - textWidth(outputText)) / 2, 100); 
    
    var timeText = "";
    var firstTime = dateTextList[dateTextList.length - 1];
    firstTime = split(firstTime, ":");
    var ampm = "AM";
    if(int(firstTime[0]) > 12){
      timeText += int(firstTime[0]) - 12;
      ampm = "PM";
    }
    else{
      if(firstTime[0][0] == "0"){
        timeText += firstTime[0][1];
      }
      else{
        timeText += firstTime[0];
      }
    }
    timeText += ":";
    timeText += firstTime[1];
    timeText += ampm; 
    
    timeText += " - ";
    
    
    var dateText2 = this.session.times[0];
    var dateTextList2 = split(dateText2, " ");
    var secondTime = dateTextList2[dateTextList2.length - 1];
    secondTime = split(secondTime, ":");
    ampm = "AM";
    print(int(secondTime[0])); 
    if(int(secondTime[0]) > 12){
      timeText += int(secondTime[0]) - 12;
      ampm = "PM";
    }
    else{
      if(int(secondTime[0]) == 0){
        timeText += "12";
      }
      else if(secondTime[0][0] == "0"){
        timeText += secondTime[0][1];
      }
      else{
        timeText += secondTime[0];
      }
    }
    timeText += ":";
    timeText += secondTime[1];
    timeText += ampm; 
    
    //fill(255, 236, 59); 
    textSize(13);
    text(timeText, 50 + (sessionWidth - textWidth(timeText)) / 2, 125); 
    
    pop(); 
  }
  
  checkHover(){
    var foundHover = this.artistHover();
    if(foundHover != null){
      this.deselect();
      foundHover.highlight(true); 
      //this.highlightByArtist(foundHover.info);
      //foundHover.showArtistText();
      this.somethingSelected = true;
    }
    else{
      foundHover = this.uniqueSongHover();
      if(foundHover != null){
        this.deselect();
        foundHover.highlight(true); 
        foundHover.showSongText();
        this.somethingSelected = true;
      }
      else{
        foundHover = this.songHover();
        if(foundHover != null){
          this.deselect();
          foundHover.highlight(true);  
          this.somethingSelected = true;
        }
        else{
          this.deselect();
          this.somethingSelected = false; 
        }
      }
    }
  }
  
  deselect(){
    if(this.somethingSelected){
      for(var a = 0; a < this.visualArtists.length; a++){
        if(this.visualArtists[a].visualObject.selected){
          this.visualArtists[a].highlight(false);
        }
      }
    }
  }
  
  artistHover(){
    var foundHover = null; 
    
    for(var a = 0; a < this.visualArtists.length; a++){
      if(this.visualArtists[a].checkHover()){
        foundHover = this.visualArtists[a]; 
        this.visualArtists[a].highlight(true);
        this.visualArtists[a].showData(); 
        
        this.selected.push(this.visualArtists[a]);
        this.somethingSelected = true;
      
        break; 
      }
    }
    
    return foundHover;
  }
  
  uniqueSongHover(){
    var foundHover = null; 
    
    for(var u = 0; u < this.visualUniqueSongs.length; u++){
      if(this.visualUniqueSongs[u].checkHover()){
        foundHover = this.visualUniqueSongs[u];
        this.visualUniqueSongs[u].highlight(true);
        this.visualUniqueSongs[u].showData(); 
        
        //this.selected.push(this.visualUniqueSongs[u]);
        this.somethingSelected = true;
        
        break;
      }
    }
    
    return foundHover; 
  }
  
  songHover(){
    var foundHover = null; 
    
    for(var s = this.visualSongs.length - 1; s >= 0; s--){
      if(this.visualSongs[s].checkHover()){
        foundHover = this.visualSongs[s];
        this.visualSongs[s].highlight(true);
        this.visualSongs[s].showData(); 
        
        //this.selected.push(this.visualSongs[s]);
        this.somethingSelected = true;
        
        break;
      }
    }
    
    return foundHover; 
  }
  
  getSectionWidth(size, lengt){
    var spacing = -3; 
    var l = lengt - 1; 
    return size + spacing;
  }
}
