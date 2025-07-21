class RecursiveBacktracker extends MazeBuilder
{
    constructor(grid) 
    {
        super(grid);
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = int(random(0, grid.sizeX)); // Start at a random position
        this.y = int(random(0, grid.sizeY));

        this.visited.push({x: this.x, y: this.y});
        this.queue.push({x: this.x, y: this.y});
        this.RemoveFromUnvisited(this.x, this.y);
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
        
        let foundPath = false;

        for(let direction of this.directions)
        {
            let nextPos = this.getPosition(this.x, this.y, direction);
            if(this.isDirectionValidFromCurrentPos(direction) && !this.isCellVisited(nextPos.x, nextPos.y))
            {
                let nextPos = this.getPosition(this.x, this.y, direction);
                    this.carvePath(direction);
                    this.x = nextPos.x;
                    this.y = nextPos.y;
                    this.carved.push(nextPos);
                    this.visited.push({x: this.x, y: this.y});
                    this.RemoveFromUnvisited(this.x, this.y);

                    foundPath = true;
                    break;
            }
        }

        if(!foundPath)
        {
            if(this.visited.length === this.grid.sizeX * this.grid.sizeY)
            {
                this.isGenerationComplete = true;
            }
            else
            {
                for(let i = this.visited.length - 1; i >= 0; i--)
                {
                    let cell = this.visited[i];
                    for(let direction of this.directions)
                    {
                        let nextPos = this.getPosition(cell.x, cell.y, direction);
                        if(this.isDirectionValidFromPos(cell.x, cell.y, direction) && !this.isCellVisited(nextPos.x, nextPos.y))
                        {
                            this.x = cell.x;
                            this.y = cell.y;
                            this.carvePath(direction);
                            this.x = nextPos.x;
                            this.y = nextPos.y;
                            this.carved.push(nextPos);
                            this.visited.push({x: this.x, y: this.y});
                            return;
                        }
                    }
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