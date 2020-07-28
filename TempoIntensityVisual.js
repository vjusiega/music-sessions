class TempoIntensityVisual{
  constructor(_tempo, _energy, _x, _y, _width, _maxHeight){
    // assume maxHeight is passed in as the max height that is related to intensity
    
    this.tempo = _tempo;
    this.energy = int(_energy * 100); 
    //this.myColor = _color;
    this.x = _x; 
    this.y = _y; 
    this.columnWidth = _width; 
    //this.maxHeight = _maxHeight * (_tempo / 208); 
    this.maxMaxHeight = _maxHeight; 
    this.maxHeight = _maxHeight * _energy;
    this.counter = 0;
    this.res = 30; 
    this.setBPM = Math.round(int(this.tempo)/this.res)*this.res;
    this.deltaHeight = this.maxHeight / (30*60/this.setBPM) * (1/2);
    this.currentHeight = this.deltaHeight; 
    
    this.selected = false; 
    this.hover = false; 
    
    this.addBase = 5; 
    
    this.myMainColors = [color(255, 236, 59), color(255, 206, 0), color(254, 130, 56), color(255, 94, 92), color(233, 50, 123), 
    color(255, 67, 172), color(203, 27, 222), color(168, 0, 255), color(118, 0, 255), color(72, 0, 216)];
    
    
    this.a = 50;
    this.myMainColorsAlpha = [color(255, 236, 59, this.a), color(255, 206, 0, this.a), color(255, 123, 47, this.a), color(255, 94, 92, this.a), 
      color(233, 50, 123, this.a), color(255, 67, 172, this.a), 
      color(203, 27, 222, this.a), color(168, 0, 255, this.a), color(118, 0, 255, this.a), color(72, 0, 216, this.a)];
      
      
   this.a = 20;
   this.myMainColorsAlpha2 = [color(255, 236, 59, this.a), color(255, 206, 0, this.a), color(255, 123, 47, this.a), color(255, 94, 92, this.a), 
      color(233, 50, 123, this.a), color(255, 67, 172, this.a), 
      color(203, 27, 222, this.a), color(168, 0, 255, this.a), color(118, 0, 255, this.a), color(72, 0, 216, this.a)];
      
      
    //this.myMainColors = [color(255, 231, 53), color(254, 178, 40), color(252, 136, 78), color(248, 108, 99), color(234, 74, 154), color(198, 42, 204), 
    //  color(157, 26, 236), color(119, 14, 232), color(92, 2, 223)];
      
    //this.a = 50;
    //this.myMainColorsAlpha = [color(255, 231, 53, this.a), color(254, 178, 40, this.a), color(252, 136, 78, this.a), color(248, 108, 99, this.a), 
    //  color(234, 74, 154, this.a), color(198, 42, 204, this.a), color(157, 26, 236, this.a), color(119, 14, 232, this.a), color(92, 2, 223, this.a)];
      
    //this.a = 20;
    //this.myMainColorsAlpha2 = [color(255, 231, 53, this.a), color(254, 178, 40, this.a), color(252, 136, 78, this.a), color(248, 108, 99, this.a), 
    //  color(234, 74, 154, this.a), color(198, 42, 204, this.a), color(157, 26, 236, this.a), color(119, 14, 232, this.a), color(92, 2, 223, this.a)];
}
  
  drawFadedTempo(somethingSelected){
    noStroke();
    if(!somethingSelected){
      fill(this.myMainColorsAlpha[9 - int(this.tempo / 220 * 10)]);
    }
    else{
      fill(this.myMainColorsAlpha2[9 - int(this.tempo / 220 * 10)]);
    }
    rect(this.x, this.y - this.maxHeight - this.addBase, this.columnWidth, this.maxHeight + this.addBase);
  }
  
  drawTempo(somethingSelected){
    noStroke();
    if(this.selected || !somethingSelected){
      fill(this.myMainColors[9 - int(this.tempo / 220 * 10)]);
    }
    else{
      fill(this.myMainColorsAlpha[9 - int(this.tempo / 220 * 10)]);
    }
    
    rect(this.x, this.y - this.currentHeight - this.addBase, this.columnWidth, this.currentHeight + this.addBase);
    
    if(this.hover && this.selected){
      this.drawStats();
    }
  }
  
  drawStats(){
    push();
    textSize(11); 
    stroke(0);
    strokeWeight(1.5);
    fill(this.myMainColors[9 - int(this.tempo / 220 * 10)]); 
    var bpmText = "";
    bpmText += int(this.tempo);
    bpmText += " BPM";
    text(bpmText, mouseX + 20, mouseY - 10 ); 
    //text(bpmText, this.x, windowHeight - this.maxMaxHeight + 15); 
    fill(255);
    var intensityText = "Energy: "; 
    intensityText += this.energy; 
    intensityText += "%";
    text(intensityText, mouseX + 20 , mouseY + 15 - 10); 
    //text(intensityText, this.x, windowHeight - this.maxMaxHeight); 
    pop();
  }
  
  playTempo(){
    //if(this.counter%int(30*60/this.setBPM) != 0){
      if(this.currentHeight >= this.maxHeight || this.currentHeight <= 0){
        this.deltaHeight = this.deltaHeight * -1; 
      }
      
      this.currentHeight += this.deltaHeight; 

    //}
    //else{
    //  this.currentHeight = this.deltaHeight;  
    //  this.deltaHeight = this.deltaHeight * -1; 
    //}
    this.counter++;
  }
  
  checkHover(){
    var isHover = mouseX < this.x + this.columnWidth + 1;
    isHover = isHover && mouseX > this.x - 1;
    isHover = isHover && mouseY < this.y; 
    isHover = isHover && mouseY > this.y - this.maxHeight - this.addBase * 2;
    
    this.hover = isHover; 
    return isHover; 
  }
  
}
