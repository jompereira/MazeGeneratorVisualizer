class AldousBroderGenerator extends MazeGenerator
{
   AldousBroderGenerator(Grid inGrid)
   {
     grid = inGrid;
     
     directions = new IntList();
     directions.append(0);
     directions.append(1);
     directions.append(2);
     directions.append(3);
     
     currentX = (int)random(0, grid.gridSizeX);
     currentY = (int)random(0, grid.gridSizeY);
     
     numCellsToVisit = grid.gridSizeX * grid.gridSizeY;
   }
   
   int currentX, currentY;
   IntList directions;
   int numCellsToVisit;
   
   void update(int framesPerUpdate)
   {
      if(!UpdateVisualization(framesPerUpdate) || isGenerationCompleted)
        return;
        
        Cell cell = grid.cells[currentX][currentY];
        
        if(!cell.visited)
        {
          cell.visited = true;
          numCellsToVisit--;
        }
          
        directions.shuffle();
        for(int direction : directions)
        {
          if(isDirectionValid(currentX, currentY, direction))
          {
            if(!isDirectionVisited(currentX, currentY, direction))
            {
              carvePath(currentX, currentY, direction);
            }
            moveTo(currentX, currentY, direction);
            break;
          }
        }
      
      if(numCellsToVisit == 0)
      { //<>//
       isGenerationCompleted = true; 
      }
        
   }
   
   void moveTo(int currentX, int currentY, int direction)
   {
    switch(direction)
    {
      case 0:
        this.currentY = currentY-1;
        break;
        
        case 1:
        this.currentY = currentY+1;
        break;
        
        case 2:
        this.currentX = currentX-1;
        break;
        
        case 3:
        this.currentX = currentX+1;
        break;
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
   }
}
