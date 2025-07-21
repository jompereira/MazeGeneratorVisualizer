class Sidewinder extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);
        this.name = "Sidewinder";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        // this.movingPositively = true; // Used to alternate between moving down and up
        
        this.x = 0;
        this.y = grid.sizeY - 1; // Start at the bottom left corner
        this.visited = [];
        this.queue = [];
        this.carved = [];
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
        this.queue.push({x: this.x, y: this.y});

        let rnd = int(random(0,2));
        if((rnd == 0 || this.y == 0) && this.isDirectionValidFromPos(this.x, this.y, Grid.directions.Right))
        {
            // Move right
            this.carvePath(Grid.directions.Right);
            this.carved.push(this.getPosition(this.x, this.y, Grid.directions.Right));

        }
        else
        {
            let randomCell = random(this.queue);

            if(this.isDirectionValidFromPos(randomCell.x, randomCell.y, Grid.directions.Up))
            {
                // Move up
                this.carvePath(Grid.directions.Up);
                this.carved.push(this.getPosition(randomCell.x, randomCell.y, Grid.directions.Up));
            }

            this.queue = [];
        }
    
        this.visited.push({x: this.x, y: this.y});
        this.advancePosition();
    }

    draw()
    {
        super.draw();
    }

    advancePosition()
    {
        if(this.x < this.grid.sizeX - 1)
        {
            this.x++;
        }
        else
        {
            this.x = 0;
            this.y--;
        }

        // if(this.movingPositively)
        // {
        //     if(this.x < this.grid.sizeX - 1)
        //     {
        //         this.x++;
        //     }
        //     else
        //     {
        //         this.movingPositively = false;
        //         this.y--;
        //     }
        // }
        // else
        // {
        //     if(this.x > 0)
        //     {
        //         this.x--;
        //     }
        //     else
        //     {
        //         this.movingPositively = true;
        //         this.y--;
        //     }
        // }

        if(this.y < 0)
        {
            this.isGenerationComplete = true;
        }
    }
}