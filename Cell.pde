class Cell
{
    int idX, idY;
    int x, y;
    float size;
    float halfSize;
   
   public Cell(int inIdX, int inIdY, int InX, int InY, float InSize)
   {
     idX = inIdX;
     idY = inIdY;
     x = InX;
     y = InY;
     size = InSize;
     halfSize = InSize * 0.5f;
     
     hasUp = hasDown = hasLeft = hasRight = true;
     visited = false;
   }
  
  
  boolean hasUp, hasDown, hasLeft, hasRight;
  boolean visited;
  
  int getNumberOfLinks()
  {
    int count = 0;
    
    if(!hasUp)
      count++;
      
    if(!hasDown)
      count++;
      
    if(!hasLeft)
      count++;
      
    if(!hasRight)
      count++;
      
    return count;
    
  }
  
  void draw()
  {
    stroke(0,0,0,0);
    fill(256,256,256);
    rect(x - halfSize, y - halfSize, size, size);
    
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
  }
}
