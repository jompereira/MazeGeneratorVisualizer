class Sidewinder extends MazeGenerator
{
  Sidewinder(Grid inGrid)
  {
    grid = inGrid;
    
    currentX = 0;
    currentY = grid.gridSizeY-1;
    cellHistory = new ArrayList<PVector>();
    movingPositively = true;
  }
  
  boolean movingPositively;
  int currentX, currentY;
  ArrayList<PVector> cellHistory;
  
  void update(int framesPerUpdate)
  {
    if(!UpdateVisualization(framesPerUpdate) || isGenerationCompleted)
      return;
    
   int next = (int)random(0,2);
   
   if(next == 1 || currentY == 0) //<>//
   {
     cellHistory.add(new PVector(currentX, currentY));
     if(isDirectionWithWall(currentX, currentY, 3))
     {
       carvePath(currentX, currentY, 3);
     }
     else if(isDirectionWithWall(currentX, currentY, 2))
     {
       carvePath(currentX, currentY, 2);
     }
   }
   else
   {
     cellHistory.add(new PVector(currentX, currentY));
     int chosenCellIndex = (int)random(0, cellHistory.size());
     PVector chosenIndexes = cellHistory.get(chosenCellIndex);
     
     if(isDirectionWithWall((int)chosenIndexes.x, (int)chosenIndexes.y, 0))
     {
       carvePath((int)chosenIndexes.x, (int)chosenIndexes.y, 0);
     }
     
     cellHistory.clear();
   }
   
     advancePosition();
  }
  
  void advancePosition()
  {
    if(movingPositively)
    {
      if(currentX < grid.gridSizeX-1)
      {
        currentX++;
      }
      else
      {
        movingPositively = false;
        currentY--;
      }
    }
    else
    {
      if(currentX > 0)
      {
       currentX--; 
      }
      else
      {
        movingPositively = true;
        currentY--;
      }
    }
    
    if(currentY < 0)
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
