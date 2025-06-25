class HuntAndKill extends MazeGenerator
{
   HuntAndKill(Grid inGrid)
   {
    grid = inGrid;
    
    currentX = 0;
    currentY = grid.gridSizeY-1;
    numCellsToVisit = grid.gridSizeX * grid.gridSizeY;
    grid.setVisited(currentX, currentY, true);
    numCellsToVisit--;
    
    directions = new IntList();
    directions.append(0);
    directions.append(1);
    directions.append(2);
    directions.append(3);
    
   }
   
   IntList directions;
   int numCellsToVisit;
   
   void update(int framesPerUpdate)
   {
    if(!UpdateVisualization(framesPerUpdate) || isGenerationCompleted)
      return;
      
    if(numCellsToVisit == 0)
      isGenerationCompleted = true;
      
      boolean foundPath = false;
      directions.shuffle();
      for(int direction : directions)
      {
        if(isDirectionValid(currentX, currentY, direction) && !isDirectionVisited(currentX, currentY, direction))
        {
           carvePath(currentX, currentY, direction);
           moveTo(currentX, currentY, direction);
           grid.setVisited(currentX, currentY, true);
           numCellsToVisit--;
           foundPath = true;
           break;
        }
      }
      
      if(!foundPath)
      {
       boolean foundCell = false;
       for(int x = 0; x < grid.gridSizeX; x++)
       {
         for(int y = 0; y < grid.gridSizeY; y++)
         {
           if(!grid.cells[x][y].visited)
           {
            if(isDirectionValid(x, y, 0) && isDirectionVisited(x,y,0))
            {
                carvePath(x, y, 0);
                foundCell = true;

            }
            if(isDirectionValid(x, y, 1) && isDirectionVisited(x,y,1))
            {
                carvePath(x, y, 1);
                foundCell = true;
            }
            if(isDirectionValid(x, y, 2) && isDirectionVisited(x,y,2))
            {
                carvePath(x, y, 2);
                foundCell = true;
            }
            if(isDirectionValid(x, y, 3) && isDirectionVisited(x,y,3))
            {
                carvePath(x, y, 3);
                foundCell = true;
            }
 
           }
           
           if(foundCell)
           {
            currentX = x;
            currentY = y;
            grid.setVisited(currentX, currentY, true);
            numCellsToVisit--;
            return;
           }
         }
       }
      }
   }
  
  void draw()
  {
      grid.draw();
      
      if(!isGenerationCompleted &&
       currentX >= 0 && currentX < grid.gridSizeX && currentY >= 0 && currentY < grid.gridSizeY)
      {
        fill(0,0,256);
        rect(grid.cells[currentX][currentY].x - grid.cells[currentX][currentY].halfSize,
        grid.cells[currentX][currentY].y - grid.cells[currentX][currentY].halfSize,
        grid.cells[currentX][currentY].size, grid.cells[currentX][currentY].size);
      } 
      
      //saveFrame("HuntAndKill-######.png");
  }
}
