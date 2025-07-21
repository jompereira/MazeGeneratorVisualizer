class MazeBuilder
{
    constructor(grid)
    {
        this.grid = grid;
        this.x = 0;
        this.y = 0;
        this.isGenerationComplete = false;

        this.visited = [];
        this.unvisited = [];
        for(let i = 0; i < this.grid.sizeX; i++)
        {
            for(let j = 0; j < this.grid.sizeY; j++)
            {
                this.unvisited.push({x: i, y: j});
            }
        }
        this.queue = [];
        this.carved = [];
        this.isGenerationComplete = false;
    }

    draw()
    {
        this.drawVisited();
        // this.drawQueue();
        this.drawCarved();

        this.grid.draw();
    }

    drawCurrentCell() {
        if (!this.isGenerationComplete) {
            this.grid.cells[this.x][this.y].highlight(color(0, 0, 255, 150));
        }
    }

    drawCarved() {
        let count = 0;
        for (let cell of this.carved) {
            count++;
            this.grid.cells[cell.x][cell.y].highlight(color(0, 255, 0, 255));
        }
    }

    drawQueue() {
        let count = 0;
        for (let cell of this.queue) {
            count++;
            this.grid.cells[cell.x][cell.y].highlight(color(0, 255, 0, 150));
        }
    }

    drawVisited() {
        let fromColor = color(128, 0, 0, 200);
        let toColor = color(255, 0, 0, 200);
        let count = 0;
        for (let cell of this.visited) {
            count++;
            let color = lerpColor(fromColor, toColor, (count / this.visited.length));
            this.grid.cells[cell.x][cell.y].highlight(color);
        }
    }

    isDirectionValidFromCurrentPos(direction)
    {
        switch(direction)
        {
        case Grid.directions.Up:
            return this.y - 1 >= 0;

        case Grid.directions.Right:
            return this.x + 1 < this.grid.sizeX;

        case Grid.directions.Down:
            return this.y + 1 < this.grid.sizeY;

        case Grid.directions.Left:
            return this.x - 1 >= 0;
        }
    }

    isDirectionValidFromPos(x, y, direction)
    {
        switch(direction)
        {
        case Grid.directions.Up:
            return y - 1 >= 0;

        case Grid.directions.Right:
            return x + 1 < this.grid.sizeX;

        case Grid.directions.Down:
            return y + 1 < this.grid.sizeY;

        case Grid.directions.Left:
            return x - 1 >= 0;
        }
    }

  isDirectionWithWall(direction)
  {
    switch(direction)
    {
     case Grid.directions.Up: // Up
      return this.y > 0 && this.grid.cells[this.x][this.y].walls.top;   
     
     case Grid.directions.Down: // Down
      return this.y < this.grid.sizeY && this.grid.cells[this.x][this.y].walls.bottom;
     
     case Grid.directions.Left: // Left
      return this.x > 0 && this.grid.cells[this.x][this.y].walls.left;       
     
     case Grid.directions.Right: // Right
      return this.x < this.grid.sizeX && this.grid.cells[this.x][this.y].walls.right;
    }
    
    return false;
  }

  getPosition(x, y, direction)
  {
    switch(direction)
    {
      case Grid.directions.Up:
        return {x: x, y: y - 1};

      case Grid.directions.Right:
        return {x: x + 1, y: y};

      case Grid.directions.Down:
        return {x: x, y: y + 1};

      case Grid.directions.Left:
        return {x: x - 1, y: y};
    }
    return {x: x, y: y}; // Default case, should not happen
  }

  carvePath(direction)
  {
    switch(direction)
    {
    case Grid.directions.Up: // UP
      this.grid.cells[this.x][this.y].walls.top = false;
      this.grid.cells[this.x][this.y - 1].walls.bottom = false;
      break;

    case Grid.directions.Down: // DOWN
      this.grid.cells[this.x][this.y].walls.bottom = false;
      this.grid.cells[this.x][this.y + 1].walls.top = false;              
      break;

    case Grid.directions.Left: // LEFT
      this.grid.cells[this.x][this.y].walls.left = false;
      this.grid.cells[this.x - 1][this.y].walls.right = false;                
      break;

    case Grid.directions.Right: // RIGHT
      this.grid.cells[this.x][this.y].walls.right = false;
      this.grid.cells[this.x + 1][this.y].walls.left = false;   
      break;
    }
  }

  isCellVisited(x, y)
  {
    return this.visited.some(cell => cell.x === x && cell.y === y);
  }

  getDirection(x, y, neighbourX, neighbourY)
  {
    if(y < neighbourY)
    {
        return Grid.directions.Down; 
    }
    else if(y > neighbourY)
    {
        return Grid.directions.Up;
    }
    else if(x > neighbourX)
    {
        return Grid.directions.Left;
    }
    else if(x < neighbourX)
    {
        return Grid.directions.Right; 
    }
    
    return -1;
  }

  RemoveFromUnvisited(cell) 
    {
        let idx = this.unvisited.findIndex(cell => cell.x === this.x && cell.y === this.y);
        if (idx !== -1) {
            this.unvisited.splice(idx, 1);
        }
    }
}