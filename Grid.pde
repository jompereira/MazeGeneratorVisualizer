// Up    North  0
// Down  South  1
// Left  West   2
// Right East   3

class Grid
{
  Grid(Cell[][] InCells, int InSizeX, int InSizeY, float InCellSize, int InX, int InY)
  {
    gridSizeX = InSizeX;
    gridSizeY = InSizeY;
    cells = InCells;
    
    int CurrentX = InX;
    int CurrentY = InY;
    
    for(int x = 0; x < gridSizeX; ++x)
    {
      CurrentX += InCellSize;
      CurrentY = InY;
      
       for(int y = 0; y < gridSizeY; ++y)
       {
           cells[x][y] = new Cell(CurrentX, CurrentY, InCellSize);
           CurrentY += InCellSize;
       }
    }
  }
  
  Cell[][] cells;
  int gridSizeX;
  int gridSizeY;
  
  int getNumberOfDeadEnds()
  {
     int count = 0;
     
     for(int x = 0; x < gridSizeX; ++x)
     {
       for(int y = 0; y < gridSizeY; ++y)
       {
          if(cells[x][y].getNumberOfLinks() == 1)
            count++;
       }
     }
     
     return count;
  }
  
  void draw()
  {
     for(int x = 0; x < gridSizeX; ++x)
     {
       for(int y = 0; y < gridSizeY; ++y)
       {
          cells[x][y].draw();   
       }
     }
  }
}
