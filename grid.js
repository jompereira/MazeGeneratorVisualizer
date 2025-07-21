
class Grid 
{
  static directions = {Up: 0, Right : 1, Down : 2, Left : 3};

  constructor(sizeX, sizeY, cellSize) 
  {
    this.x = 0;
    this.y = 0;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.cellSize = cellSize;
    this.cells = [];
    
    this.initialize();

  }

  initialize()
  {
    // Initialize 2D grid
    this.cells = [];
    for (let col = 0; col < this.sizeX; col++) 
    {
        let currentRow = [];
        for (let row = 0; row < this.sizeY; row++) 
        {
        currentRow.push(new Cell(col, row, this.cellSize, 0, 20));
        }
        this.cells.push(currentRow);
    }
  }

  draw()
  {
    // Draw all cells
    for (let row of this.cells) 
    {
        for (let cell of row) 
        {
            cell.show();
        }
    }
  }
}