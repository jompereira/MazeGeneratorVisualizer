class BinaryTree extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);
        this.directions = [Grid.directions.Up, Grid.directions.Right];
        this.x = 0;
        this.y = grid.sizeY - 1; // Start at the bottom left corner

        this.visited = [];
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
        this.ran = true;
        let directions = shuffle(this.directions);

        this.visited.push({x: this.x, y: this.y});
        
        for (let direction of directions)
        {
            if(this.isDirectionValidFromCurrentPos(direction))
            {
                this.carvePath(direction);
                this.carved.push(this.getPosition(this.x, this.y, direction));
                break;
            }
        }

        this.advancePosition();
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

        if(this.y < 0)
        {
            this.isGenerationComplete = true;
        }
    }

    draw()
    {
        super.draw();
    }
}