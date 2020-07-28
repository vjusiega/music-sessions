class Session{
  constructor(songs, _times, _count){ // rows as in rows of data that pertain to this session
    this.songOrder = songs;
    this.distinctSongs = this.getDistinctSongs(this.songOrder);
    this.distinctArtists = this.getDistinctArtists(this.songOrder);
    this.times = _times; 
    this.sessionNumber = _count; 
  }
  
  getDistinctSongs(songs){
    var distinctS = [];
    for(var s = 0; s < songs.length; s++){
      if(distinctS.indexOf(songs[s]) < 0){
        distinctS.push(songs[s]);
      }
    }
    return distinctS; 
  }
  
  getDistinctArtists(songs){
    var distinctA = [];
    for(var s = 0; s < songs.length; s++){
      if(distinctA.indexOf(songs[s].artist) < 0){
        distinctA.push(songs[s].artist);
      }
    }
    return distinctA; 
  }
  
  adjustNumber(newVal){
    this.sessionNumber = newVal - this.sessionNumber;
  }
  
}
