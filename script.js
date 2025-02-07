// orange: rgb(227,124,60)
// blue:  rgb(116,116,252)
//https://michaelbach.de/ot/cog-EbbingDyn/index.html

let orangeX, orangeY; 
let orangeXLowerLimit,orangeYLowerLimit,orangeXUpperLimit,orangeYUpperLimit; 
let orangeCircleWidth = 50; 

let speed, distanceToCenter, distanceToRightEdge,speedCenter,speedRightEdge;

let xDirection = -1; 
let yDirection = -1;

let blueCircles = []

function setup() { 
  let canvas = createCanvas(800, 800);

    // Center the canvas on the page
    let canvasX = (windowWidth - width) / 2;
    let canvasY = (windowHeight - height) / 2;
    
    // Position the canvas
    canvas.position(canvasX, canvasY);


  angleMode(DEGREES)
  
  orangeX = width-100; 
  orangeY = height-100;

  orangeXLowerLimit = width/2; 
  orangeYLowerLimit = height/2; 
  orangeXUpperLimit = orangeX; 
  orangeYUpperLimit = orangeY; 

  
  for (let i =0; i < 360; i+= (360/6)){
    blueCircles.push(new BlueCircle(i))
  }
}

function draw() {
  background(220);

  orangeCircle(); 

 for (let i = 0; i < blueCircles.length; i++){
  blueCircles[i].drawCircle(); 
  blueCircles[i].moveCircle(); 
 }
 
}

function orangeCircle() {
  noStroke(); 
  fill(277,125,60,200)
   
  if(orangeX < orangeXLowerLimit || orangeX > orangeXUpperLimit){
    xDirection*=-1
  }
  if(orangeY < orangeYLowerLimit || orangeY > orangeXUpperLimit){
    yDirection*=-1
  }
  
  distanceToCenter = dist(orangeX, orangeY, width/2, height/2);
  distanceToRightEdge = dist(orangeX, orangeY, width, orangeY);
  speedCenter = map(distanceToCenter, 0, width / 2, 0.05, 2);
  speedRightEdge = map(distanceToRightEdge, 0, width / 2, 0.05, 2);
  
  speed = (speedCenter + speedRightEdge) / 2;

  orangeX += xDirection*speed; 
  orangeY += yDirection*speed; 
  
  ellipse(orangeX,orangeY,orangeCircleWidth)
}

class BlueCircle {
  constructor(angle){
    
    this.distRight = orangeCircleWidth/4.25; // right
    this.distLeft = orangeCircleWidth*2; // left
    this.widthRight = orangeCircleWidth/4; // right
    this.widthLeft = orangeCircleWidth*3.5; // left

    //initializing shape
    this.angle = angle; 
    this.width = this.widthRight
    this.dist = this.distRight
    this.angleCos = this.dist * cos(angle);
    this.angleSin = this.dist * sin(angle); 
    this.x = orangeX + this.angleCos;
    this.y = orangeY + this.angleSin;

  
    //boundaries
    this.xLeftLimit = width/2+this.angleCos;
    this.yLeftLimit = height/2+this.angleSin;
    this.xRightLimit = this.x; 
    this.yRightLimit = this.y;

  }
  
  drawCircle() {
    noStroke(); 
    fill(116,116,252,230)
    ellipse(this.x+this.angleCos,this.y+this.angleSin,this.width) 
  }

  
  moveCircle(){
    if (this.xDirection == -1 ){
      
      let distanceToLeft = dist(this.x, 
                                this.y,
                                this.xLeftLimit, 
                                this.yLeftLimit)
      
      
      this.width = map(distanceToLeft, 
                       0, 
                       283, 
                       this.widthLeft, 
                       this.widthRight); 
     
     
      this.dist = map(distanceToLeft, 
                      0, 
                      283, 
                      this.distLeft, 
                      this.distRight); 

    this.angleCos = this.dist*1.7 * cos(this.angle)*speed
    this.angleSin = this.dist*1.7 * sin(this.angle)*speed
      
    }
    else {
    this.angleCos = this.dist*1.7 * cos(this.angle)*speed
    this.angleSin = this.dist*1.7 * sin(this.angle)*speed
      let distanceToRight = dist(this.x, 
                                this.y,
                                this.xRightLimit, 
                                this.yRightLimit);
      
      this.width = map(distanceToRight, 
                       0, 
                       283, 
                       this.widthRight, 
                       this.widthLeft); 
      
      this.dist = map(distanceToRight, 
                      0, 
                      283, 
                      this.distRight, 
                      this.distLeft); 
      
    }
    this.x += xDirection * speed;
    this.y += yDirection  * speed;
  }
}


