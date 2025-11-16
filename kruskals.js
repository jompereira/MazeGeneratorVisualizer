class Kruskals extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);

        this.name = "Kruskal's";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = 0;
        this.y = 0;

        this.edges = [];
        for (let col = 0; col < grid.sizeX; col++)
        {
            for (let row = 0; row < grid.sizeY; row++)
            {
                if(col < grid.sizeX - 1)
                    this.edges.push({cellA: grid.cells[col][row], cellB: grid.cells[col + 1][row], direction: Grid.directions.Right, weight : random(0, 10)});
                
                if(row < grid.sizeY - 1)
                    this.edges.push({cellA: grid.cells[col][row], cellB: grid.cells[col][row + 1], direction: Grid.directions.Down, weight : random(0, 10)});
            }
        }

        // Sort edges by weight
        shuffle(this.edges, true);
        this.edges.sort((a, b) => a.weight - b.weight);

        this.sets = [];


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

        let link = this.edges.pop();
        this.carved.push({x: link.cellA.col,  y: link.cellA.row});
        this.carved.push({x: link.cellB.col,  y: link.cellB.row});
        
        let cellASet = this.findSetContainingCell(link.cellA);
        let cellBSet = this.findSetContainingCell(link.cellB);

        // if they are in different sets, carve the path and union the sets
        if((cellASet == null && cellBSet == null) || (cellASet != cellBSet))
        {
            this.x = link.cellA.col;
            this.y = link.cellA.row;
            this.carvePath(link.direction);


            if(cellASet == null && cellBSet == null)
            {
                let set = {
                    cells : [link.cellA, link.cellB],
                    color : color(random(0,255), random(0,255), random(0,255), 200)
                }
                this.sets.push(set);
            }
            else if(cellASet != null && cellBSet != null)
            {
                // merge sets   
                cellASet.cells.push(...cellBSet.cells);
                this.sets.splice(this.sets.indexOf(cellBSet), 1);
            }
            else if(cellASet != null)
            {
                cellASet.cells.push(link.cellB);
            }
            else if(cellBSet != null)
            {
                cellBSet.cells.push(link.cellA);
            }
            else
            {
                print("What is going on here?");
            }
        }

        if(this.edges.length == 0)
        {
            this.isGenerationComplete = true;
        }
    }

    draw()
    {
        super.draw();

        for(let set of this.sets)
        {
            let setColor = color(0, 0, this.sets.indexOf(set) + 1 * (255 / this.sets.length), 200);
            for(let cell of set.cells)
            {
                    cell.highlight(set.color);
            }
        }
    }

    findSetContainingCell(cell)
    {
        for (let set of this.sets)
        {
            if (set.cells.includes(cell))
            {
                return set;
            }
        }
        return null;
    }   
}