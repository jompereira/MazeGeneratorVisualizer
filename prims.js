class Prims extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);

        this.name = "Prim's";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = int(random(0, grid.sizeX));
        this.y = int(random(0, grid.sizeY));

        this.edges = [];
        for (let col = 0; col < grid.sizeX; col++)
        {
            for (let row = 0; row < grid.sizeY; row++)
            {
                if(row < grid.sizeY - 1)
                    this.edges.push({cellA: grid.cells[col][row], cellB: grid.cells[col][row + 1], direction: Grid.directions.Down, weight : random(0, 10)});
                
                if(col < grid.sizeX - 1)
                    this.edges.push({cellA: grid.cells[col][row], cellB: grid.cells[col + 1][row], direction: Grid.directions.Right, weight : random(0, 10)});
            }
        }

        this.frontierCells = [];
        this.maze = [];

    }

    update()
    {
        if(this.isGenerationComplete)
        {
            this.carved = [];
            this.frontierCells = [];
            return;
        }

        if(frameCount % framesPerUpdate != 0)
        {
            return;
        }

        this.carved = [];
        this.frontierCells = [];

        let currentCell = this.grid.cells[this.x][this.y];
        this.maze.push(currentCell);
        this.visited.push({x: this.x, y: this.y});

        let frontierEdges = this.edges.filter(edge => (this.maze.includes(edge.cellA) != 
                                                    this.maze.includes(edge.cellB)));


        if(frontierEdges.length != 0)
        {
            // find the edge with the lowest cost
            frontierEdges.sort((a, b) => a.weight - b.weight);
    
            // carve the path to the lowest cost edge
            let lowestCostEdge = frontierEdges.shift();
            this.x = lowestCostEdge.cellA.col;
            this.y = lowestCostEdge.cellA.row;
            this.carvePath(lowestCostEdge.direction);
            this.carved.push({x: lowestCostEdge.cellA.col, y: lowestCostEdge.cellA.row});
            this.carved.push({x: lowestCostEdge.cellB.col, y: lowestCostEdge.cellB.row});
            this.edges.splice(this.edges.indexOf(lowestCostEdge), 1);

            if(this.maze.includes(lowestCostEdge.cellA))
            {
                this.x = lowestCostEdge.cellB.col;
                this.y = lowestCostEdge.cellB.row;
            }
            else
            {
                this.x = lowestCostEdge.cellA.col;
                this.y = lowestCostEdge.cellA.row;
            }
    
            for(let edge of frontierEdges)
            {
                if(!this.maze.includes(edge.cellB))
                {
                    this.frontierCells.push(edge.cellB);
                }
                else if(!this.maze.includes(edge.cellA))
                {
                    this.frontierCells.push(edge.cellA);
                }
            }
        }
    }

    draw()
    {
        super.draw();

        for(let cell of this.frontierCells)
        {
            this.grid.cells[cell.col][cell.row].highlight(color(255, 165, 0, 150));
        }
    }
}