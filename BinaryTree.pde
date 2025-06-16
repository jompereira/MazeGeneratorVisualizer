//class BinaryTreeCell extends Cell
//{
//  BinaryTreeCell(int InX, int InY, int InHalfSize)
//  {
//    super(InX, InY, InHalfSize);
    
//    visited = false;
//  }
  
//  boolean visited;
//}

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
  }
  
  Grid grid;
  int currentX, currentY;
  IntList directions;
  
  void update(int framesPerUpdate)
  {

    if(!UpdateVisualization(framesPerUpdate))
      return;
    
    if(currentX < grid.gridSizeX && currentY < grid.gridSizeY)
    {
      directions.shuffle();
      
      for(int dir : directions)
      {
        if(isDirectionValid(currentX, currentY, dir))
        {
          carvePath(currentX, currentY, dir);
          break;
        }
      }
      
      advancePosition();
    }
    else
    {
      advancePosition(); //<>//
    }
  }
  
  void advancePosition()
  {
   if(currentY == grid.gridSizeY-1)
   {
     currentX++;
     currentY = 0;
   }
   else
   {
     currentY++;
   }
  }
  
  void draw()
  {
    grid.draw();
    
    if(currentX >= 0 && currentX < grid.gridSizeX && currentY >= 0 && currentY < grid.gridSizeY)
    {
      fill(256,0,0);
      rect(grid.cells[currentX][currentY].x - grid.cells[currentX][currentY].halfSize,
      grid.cells[currentX][currentY].y - grid.cells[currentX][currentY].halfSize,
      grid.cells[currentX][currentY].halfSize * 2, grid.cells[currentX][currentY].halfSize * 2);
    }    
  }
  
}
  
  
