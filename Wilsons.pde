class Wilsons extends MazeGenerator
{
   Wilsons(Grid inGrid)
   {
    grid = inGrid;
    
    currentX = currentY = 0;
    cellHistory = new ArrayList<Cell>();
    directions = new IntList();
    directions.append(0);
    directions.append(1);
    directions.append(2);
    directions.append(3);
    
    numCellsToVisit = grid.gridSizeX * grid.gridSizeY;
    
    cellHistory.add(grid.cells[currentX][currentY]);
    grid.cells[currentX][currentY].visited = true;
    
    currentX = 10;
    currentY = 10;
   }
   
   ArrayList<Cell> cellHistory;
   IntList directions;
   int numCellsToVisit;
   
   void update(int framesPerUpdate)
   {
     if(!UpdateVisualization(framesPerUpdate) || isGenerationCompleted)
       return;
       
       if(!cellHistory.contains(grid.cells[currentX][currentY]))
       {
         cellHistory.add(grid.cells[currentX][currentY]);
         //if(!grid.cells[currentX][currentY].visited)
         //{
         //  grid.setVisited(currentX, currentY, true);
         //  numCellsToVisit--;
         //}
         directions.shuffle();
         for(int direction : directions)
         {
          if(isDirectionValid(currentX, currentY, direction) && !isDirectionVisited(currentX, currentY, direction))
          {
            PVector newPosition = getNewPosition(currentX, currentY, direction);
            
            //if(!cellHistory.contains(grid.cells[(int)newPosition.x][(int)newPosition.y]))
            //{
              moveTo(currentX, currentY, direction);
              cellHistory.add(grid.cells[currentX][currentY]);
              break;
            //}
          }
         }
       }
       else
       {
          int indexOf = cellHistory.indexOf(grid.cells[currentX][currentY]);
          
          if(indexOf != -1)
          {
            currentX = cellHistory.get(0).idX;
            currentY = cellHistory.get(0).idY;
          }
          
          for(int i = 1; i <= indexOf; i++)
          {
            Cell cell = cellHistory.get(i);
            int direction = getDirection(currentX, currentY, cell.idX, cell.idY);
            
            carvePath(currentX, currentY, direction);
            moveTo(currentX, currentY, direction);
            if(!grid.cells[currentX][currentY].visited)
            {
              grid.setVisited(currentX,currentY, true);
              numCellsToVisit--;
            }
          }         
            
          cellHistory.clear();
          
          if(numCellsToVisit != 0)
          {
            int unvisitedIndex = (int)random(0, numCellsToVisit);
            PVector UnvisitedIndexes = findUnvisitedCellAt(unvisitedIndex);
            currentX = (int)UnvisitedIndexes.x;
            currentY = (int)UnvisitedIndexes.y;
          }
          else
          {
            isGenerationCompleted = true;
          }
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
   
   PVector getNewPosition(int x, int y, int direction)
   {
      switch(direction)
      {
        case 0:
        return new PVector(x, y-1);
        
        case 1:
        return new PVector(x, y+1);
        
        case 2:
        return new PVector(x-1, y);
        
        case 3:
        return new PVector(x+1, y);
      }
    
    return new PVector();
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
