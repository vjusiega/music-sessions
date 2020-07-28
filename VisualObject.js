class VisualObject{
  constructor( _x, _y, _size, _col){
    this.x = _x; 
    this.y = _y; 
    this.size = _size; 
    this.objectColor = _col; 
    this.selected = false; 
    this.increaseSize = 0; 
  }
  
  drawObjectBasic(increase, somethingSelected){
    var currentColor = this.objectColor; 
    if(!this.selected && somethingSelected){
      currentColor = this.getColorAlpha(60);
      increase = 0; 
    }
    else{
      currentColor = this.getColorAlpha(255);
    }
    
    if(!somethingSelected){
      increase = 0;
    }
    
    noStroke();
    fill(0);
    circle(this.x, this.y, this.size + increase, 0);
    
    noStroke();
    fill(currentColor);
    circle(this.x, this.y, this.size + increase, currentColor);
    
    if(!this.selected){
      currentColor = this.getColorAlpha(60);
      fill(currentColor);
    }
  }
  
  //drawObjectTempo(){
  //  var currentColor = this.objectColor; 
  //  if(!this.selected){
  //    currentColor = this.getColorAlpha(100);
  //  }
  //  else{
  //    currentColor = this.getColorAlpha(255);
  //  }
    
  //  stroke(0);
  //  fill(0);
  //  circle(this.x, this.y, this.size, 0);
    
  //  stroke(currentColor);
  //  fill(currentColor);
  //  circle(this.x, this.y, this.size, currentColor);
    
  //  this.tempoVis.drawFadedTempo();
  //  if(this.selected){
  //    this.tempoVis.playTempo();
  //    this.tempoVis.drawTempo();
  //  }
  //}
  
  getColorAlpha(a){
    var newColor = color(this.objectColor);
    newColor.setAlpha(a); 
    return newColor; 
  }
  
  checkHover(){
    if(dist(mouseX, mouseY, this.x, this.y) < (this.size / 2) + 5){
      return true; 
    }
    if(this.x - 15 < mouseX &&  mouseX < this.x + 15){
      if(this.y - 10 < mouseY && mouseY < this.y + 10){
        return true;
      }
    }
    
    return false; 
  }
}
