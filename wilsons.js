class Wilsons extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);
        this.name = "Wilsons";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = int(random(0, this.grid.sizeX)); // Start at the top left corner
        this.y = int(random(0, this.grid.sizeY));

        this.visited.push({x: 0, y: 0});
        this.RemoveFromUnvisited(this.visited[0].x, this.visited[0].y);
    }

    update()
    {
        if(this.isGenerationComplete)
        {
            this.carved = [];
            return;
        }
        
        if(frameCount % framesPerUpdate != 0)
        {
            return;
        }

        this.carved = [];

        this.directions = shuffle(this.directions);
        for(let direction of this.directions)
        {
            if(this.isDirectionValidFromCurrentPos(direction))
            {
                let nextPos = this.getPosition(this.x, this.y, direction);
                const isVisited = this.visited.find(cell => nextPos.x === cell.x && nextPos.y === cell.y);

                // Check if the random neighbour cell is visited
                if(!isVisited)
                {
                    this.x = nextPos.x;
                    this.y = nextPos.y;

                    const isInQueue = this.queue.find(cell => nextPos.x === cell.x && nextPos.y === cell.y);
                    if(isInQueue)
                    {
                        let queueIndex = this.queue.findIndex(cell => nextPos.x === cell.x && nextPos.y === cell.y);
                        this.queue.length = queueIndex + 1; // Keep only the path to the current cell
                    }
                    else
                    {
                        this.queue.push({x: nextPos.x, y: nextPos.y});
                        this.x = nextPos.x;
                        this.y = nextPos.y;
                    }
                    break;
                }
                else  // cell is visited, end the random walk
                {
                    this.queue.push({x: nextPos.x, y: nextPos.y});
                    for(let i = 0; i < this.queue.length - 1; i++)
                    {
                        this.x = this.queue[i].x;
                        this.y = this.queue[i].y;

                        this.visited.push({x: this.x, y: this.y});
                        // Remove from unvisited
                        let idx = this.unvisited.findIndex(cell => cell.x === this.x && cell.y === this.y);
                        if (idx !== -1) 
                        {
                            this.unvisited.splice(idx, 1);
                        }

                        let dir = this.getDirection(this.queue[i].x, this.queue[i].y, this.queue[i + 1].x, this.queue[i + 1].y);
                        this.carvePath(dir);
                        this.carved.push(this.getPosition(this.x, this.y));

                        this.x = this.queue[i + 1].x;
                        this.y = this.queue[i + 1].y;

                        // this.setVisited(true);
                        this.visited.push({x: this.x, y: this.y});
                        idx = this.unvisited.findIndex(cell => cell.x === this.x && cell.y === this.y);
                        if (idx !== -1) 
                        {
                            this.unvisited.splice(idx, 1);
                        }
                    }
                    
                    if(this.unvisited.length > 0)
                    {
                        let randomCell = random(this.unvisited);
                        this.x = randomCell.x;
                        this.y = randomCell.y;
    
                        this.queue = [];
                        this.queue.push({x: this.x, y: this.y});
                    }
                    else
                    {
                        this.isGenerationComplete = true;
                        this.queue = [];
                    }

                    break;
                }
            }
        }
    }

    draw()
    {
        super.drawCurrentCell();
        super.draw();
    }
}