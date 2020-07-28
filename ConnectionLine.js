class ConnectionLine{
  constructor(visObject1, visObject2){
    this.obj1 = visObject1;
    this.obj2 = visObject2; 
    this.lineColor = color(250, 250, 250);
  }
  
  drawLine(somethingSelected){
    if(this.obj1.visualObject.selected && this.obj2.visualObject.selected || !somethingSelected){
      strokeWeight(1.25);
      stroke(this.getColorAlpha(255));
    }
    else{
      strokeWeight(1.5);
      stroke(this.getColorAlpha(50));
    }
    if(!somethingSelected){
      strokeWeight(0.7);
    }
    
    line(this.obj1.visualObject.x, this.obj1.visualObject.y, this.obj2.visualObject.x, this.obj2.visualObject.y);
    strokeWeight(1);
  }
  
  getColorAlpha(a){
    var newColor = color(this.lineColor);
    newColor.setAlpha(a); 
    return newColor; 
  }
}
