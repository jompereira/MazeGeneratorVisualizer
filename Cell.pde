class Cell
{
    float x, y;
    float halfSize;
   
   public Cell(int InX, int InY, int InHalfSize)
   {
     x = InX;
     y = InY;
     halfSize = InHalfSize;
     
     hasUp = hasDown = hasLeft = hasRight = true;
   }
  
  
  boolean hasUp, hasDown, hasLeft, hasRight;
  
  void draw()
  {
    stroke(0,0,0,255);
    strokeWeight(4);

    
    if(hasUp)
    {
     line(x - halfSize, y - halfSize, x + halfSize, y - halfSize);
    }
    
    if(hasDown)
    {
     line(x - halfSize, y + halfSize, x + halfSize, y + halfSize); 
    }
    
    if(hasRight)
    {
     line(x + halfSize, y - halfSize, x + halfSize, y + halfSize); 
    }
    
    if(hasLeft)
    {
     line(x - halfSize, y - halfSize, x - halfSize, y + halfSize); 
    }
    
    stroke(0,0,0,0);
    fill(256,256,256);
    rect(x - halfSize, y - halfSize, halfSize * 2, halfSize * 2);
  }
}
