class RecursiveBacktracker extends MazeGenerator
{
   RecursiveBacktracker(Grid inGrid)
   {
    grid = inGrid;
    
    currentX = 0;
    currentY = grid.gridSizeY-1;
    grid.setVisited(currentX, currentY, true);
    
    directions = new IntList();
    directions.append(0);
    directions.append(1);
    directions.append(2);
    directions.append(3);
    
    cellHistory = new ArrayList<PVector>();
    cellHistory.add(new PVector(currentX, currentY));
   }
   
   IntList directions;
   ArrayList<PVector> cellHistory;
   
   void update(int framesPerUpdate)
   {
       if(!UpdateVisualization(framesPerUpdate) || isGenerationCompleted)
        return;
        
        directions.shuffle();
        boolean noDirectionValid = true;
        for(int direction : directions)
        {
          if(isDirectionValid(currentX, currentY, direction) && !isDirectionVisited(currentX, currentY, direction))
          {
             carvePath(currentX, currentY, direction);
             moveTo(currentX, currentY, direction);
             grid.setVisited(currentX, currentY, true);
             cellHistory.add(new PVector(currentX, currentY));
             noDirectionValid = false;
          }
        }
        
        if(noDirectionValid)
        {
           for(int cellIndex = cellHistory.size() - 1; cellIndex >= 0; cellIndex--)
           {
             PVector cellIndexes = cellHistory.get(cellIndex);
             
             for(int direction : directions)
             {
              if(isDirectionValid((int)cellIndexes.x, (int)cellIndexes.y, direction) && !isDirectionVisited((int)cellIndexes.x, (int)cellIndexes.y, direction))
              {
                 carvePath((int)cellIndexes.x, (int)cellIndexes.y, direction);
                 currentX = (int)cellIndexes.x;
                 currentY = (int)cellIndexes.y;
                 cellHistory.add(new PVector(currentX, currentY));
                 grid.setVisited(currentX, currentY, true);
                 noDirectionValid = false;
                 break;
              }
            }
            
            if(!noDirectionValid)
            {
             break; 
            }
           }
           
           if(noDirectionValid)
           {
            isGenerationCompleted = true; 
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
   }
}
