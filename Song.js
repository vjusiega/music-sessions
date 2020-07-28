class Song{
  constructor(dataRow){
    this.track = dataRow[0];
    this.artist = dataRow[1];
    this.album = dataRow[2];
    this.musicKey = dataRow[3];
    this.tempo = dataRow[4];
    this.energy = dataRow[5];
    this.duration = dataRow[6];
  }
}
