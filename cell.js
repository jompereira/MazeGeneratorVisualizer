// Cell class with walls and 2D access
class Cell 
{
  constructor(row, col, cellSize, offsetX = 0, offsetY = 0) 
  {
    this.row = row;
    this.col = col;
    this.x = row * cellSize;
    this.y = col * cellSize;
    this.cellSize = cellSize;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
  }

  show() 
  {
    let x = this.x;
    let y = this.y;

    stroke(0);
    strokeWeight(wallThickness);

    // Draw walls
    if (this.walls.top)    line(x + wallThickness + this.offsetX, y + wallThickness + this.offsetY, x + cellSize + wallThickness + this.offsetX, y + wallThickness + this.offsetY);
    if (this.walls.right)  line(x + cellSize + wallThickness + this.offsetX, y + wallThickness + this.offsetY, x + cellSize + wallThickness + this.offsetX, y + cellSize + wallThickness + this.offsetY);
    if (this.walls.bottom) line(x + cellSize + wallThickness + this.offsetX, y + cellSize + wallThickness + this.offsetY, x + wallThickness + this.offsetX, y + cellSize + wallThickness + this.offsetY);
    if (this.walls.left)   line(x + wallThickness + this.offsetX, y + cellSize + wallThickness + this.offsetY, x + wallThickness + this.offsetX, y + wallThickness + this.offsetY);

    // Optional: mark visited cells
    // if (this.visited) {
    //   noStroke();
    //   fill(100, 200, 255, 100);
    //   rect(this.x + wallThickness * 1.5, this.y + wallThickness * 1.5, this.cellSize - wallThickness, this.cellSize - wallThickness);
    // }
  }

  highlight(color) 
  {
    noStroke();
    fill(red(color), green(color), blue(color), alpha(color));
    rect(this.x + wallThickness + this.offsetX, this.y + wallThickness + this.offsetY, this.cellSize, this.cellSize);
  }

  // For clicking or generation logic
  contains(px, py) 
  {
    return px > this.x && px < this.x + this.cellSize &&
           py > this.y && py < this.y + this.cellSize;
  }
}