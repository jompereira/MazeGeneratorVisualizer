class BinaryTree extends MazeGenerator
{
  BinaryTree(Grid InGrid)
  {
    grid = InGrid;
    
    currentX = 0;
    currentY = 0;
    
    directions = new IntList();
    directions.append(0);
    directions.append(3);
    
    movingPositively = true;
  }
  
  Grid grid;
  int currentX, currentY;
  IntList directions;
  boolean movingPositively = true;
  
  void update(int framesPerUpdate)
  {

    if(!UpdateVisualization(framesPerUpdate))
      return;
    
    if(!isGenerationCompleted)
    {
      directions.shuffle();
      
      for(int dir : directions)
      {
        if(isDirectionWithWall(currentX, currentY, dir))
        {
          carvePath(currentX, currentY, dir);
          break;
        }
      }
      
      advancePosition();
    } //<>// //<>// //<>//
  }
  
  void advancePosition()
  {
    if(movingPositively)
    {
      if(currentY < grid.gridSizeY-1)
      {
         currentY++; 
      }
      else
      {
        movingPositively = false;
        currentX++;
      }
    }
    else
    {
      if(currentY > 0)
      {
        currentY--;
      }
      else
      {
       movingPositively = true;
       currentX++;
      }
    }
   
   if(currentX >= grid.gridSizeX)
     isGenerationCompleted = true;
  }
  
  void draw()
  {
    grid.draw();
    
    if(currentX >= 0 && currentX < grid.gridSizeX && currentY >= 0 && currentY < grid.gridSizeY)
    {
      fill(0,0,256);
      rect(grid.cells[currentX][currentY].x - grid.cells[currentX][currentY].halfSize,
      grid.cells[currentX][currentY].y - grid.cells[currentX][currentY].halfSize,
      grid.cells[currentX][currentY].size, grid.cells[currentX][currentY].size);
    }    
  }
  
}
  
  
