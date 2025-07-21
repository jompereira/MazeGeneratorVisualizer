class HuntAndKill extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);

        this.name = "Hunt and Kill";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = int(random(0, grid.sizeX)); // Start at a random position
        this.y = int(random(0, grid.sizeY));

        this.unvisited = [];
        for(let i = 0; i < this.grid.sizeY; i++)
        {
            for(let j = 0; j < this.grid.sizeX; j++)
            {
                this.unvisited.push({x: j, y: i});
            }
        }
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

                // Remove from unvisited
                this.RemoveFromUnvisited(nextPos.x);
                foundPath = true;
                break;
            }
        }

        if(!foundPath)
        {
            if(this.unvisited.length === 0)
            {
                this.isGenerationComplete = true;
                return;
            }

            // Hunt for a path
            for(let cell of this.unvisited)
            {
                if(this.isCellVisited(cell.x, cell.y))
                {
                    continue;
                }

                // Check if we can carve a path from this cell
                for(let direction of this.directions)
                {
                    let nextPos = this.getPosition(cell.x, cell.y, direction);
                    if(this.isDirectionValidFromCurrentPos(direction) && this.isCellVisited(nextPos.x, nextPos.y))
                    {
                        this.x = cell.x;
                        this.y = cell.y;
                        this.carvePath(direction);
                        this.visited.push({x: this.x, y: this.y});
                        this.carved.push(this.getPosition(this.x, this.y, direction));
                        break;
                    }
                }
                
                break; // Exit after finding the first unvisited cell
            }
            let unvisitedCell = this.unvisited[0];
            if(unvisitedCell)
            {
                this.x = unvisitedCell.x;
                this.y = unvisitedCell.y;
                this.visited.push({x: this.x, y: this.y});
                this.RemoveFromUnvisited(unvisitedCell);
            }
        }
    }

    draw()
    {
        super.drawCurrentCell();
        super.draw();
    }
}