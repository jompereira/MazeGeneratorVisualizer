class AldousBroder extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);
        this.name = "Aldous-Broder";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = 0; // Start at the top left corner
        this.y = 0;
        this.visited = [];
        this.queue = [];
        this.carved = [];

        this.visited.push({x: this.x, y: this.y});
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
                const found = this.visited.find(cell => nextPos.x === cell.x && nextPos.y === cell.y);
                if(!found)
                {
                    this.carvePath(direction);
                    this.x = nextPos.x;
                    this.y = nextPos.y;
                    this.carved.push(nextPos);
                    this.visited.push({x: this.x, y: this.y});
                    break;
                }
                else
                {
                    this.x = nextPos.x;
                    this.y = nextPos.y;
                    break;
                }
            }
        }

        if(this.visited.length === this.grid.sizeX * this.grid.sizeY)
        {
            this.isGenerationComplete = true;
        }
    }

    draw()
    {
        super.drawCurrentCell();
        super.draw();
    }
}