// Up    North  0
// Down  South  1
// Left  West   2
// Right East   3

class Grid
{
  Grid(Cell[][] InCells, int InSizeX, int InSizeY, int InCellHalfSize, int InX, int InY)
  {
    gridSizeX = InSizeX;
    gridSizeY = InSizeY;
    cells = InCells;
    
    int CurrentX = InX;
    int CurrentY = InY;
    
    for(int x = 0; x < gridSizeX; ++x)
    {
      CurrentX += InCellHalfSize * 2;
      CurrentY = InY;
      
       for(int y = 0; y < gridSizeY; ++y)
       {
           cells[x][y] = new Cell(CurrentX, CurrentY, InCellHalfSize);
           CurrentY += InCellHalfSize * 2;
       }
    }
  }
  
  Cell[][] cells;
  int gridSizeX;
  int gridSizeY;
  
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
