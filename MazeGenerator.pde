class MazeGenerator
{
  boolean UpdateVisualization(int framesPerUpdate)
  {
     if(frameCount % framesPerUpdate != 0)
      return false;
      
     return true;
  }
  
  boolean isDirectionValid(int x, int y, int direction)
  {
    switch(direction)
    {
     case 0: // Up
      return y > 0 && grid.cells[x][y].hasUp;   
     
     case 1: // Down
      return y < grid.gridSizeY-1 && grid.cells[x][y].hasDown;
     
     case 2: // Left
      return x > 0 && grid.cells[x][y].hasLeft;       
     
     case 3: // Right
      return x < grid.gridSizeX-1 && grid.cells[x][y].hasRight;
    }
    
    return false;
  }
  
  void carvePath(int x, int y, int direction)
  {
    switch(direction)
    {
    case 0: // UP
      grid.cells[x][y].hasUp = false;
      grid.cells[x][y - 1].hasDown = false;
      break;

    case 1: // DOWN
      grid.cells[x][y].hasDown = false;
      grid.cells[x][y + 1].hasUp = false;              
      break;

    case 2: // LEFT
      grid.cells[x][y].hasLeft = false;
      grid.cells[x - 1][y].hasRight = false;                
      break;

    case 3: // RIGHT
      grid.cells[x][y].hasRight = false;
      grid.cells[x + 1][y].hasLeft = false;   
      break;
    }
  }
}
