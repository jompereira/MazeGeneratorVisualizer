class Ellers extends MazeBuilder
{
    constructor(grid)
    {
        super(grid);

        this.name = "Eller's";
        this.directions = [Grid.directions.Up, Grid.directions.Right, Grid.directions.Down, Grid.directions.Left];
        this.x = 0;
        this.y = 0;

        this.sets = [];
        this.connectingHorizontal = true;
        this.setsToConnect = [];

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

        let cellA = this.grid.cells[this.x][this.y];
        this.visited.push({x: this.x, y: this.y});

        if(this.connectingHorizontal)
        {
            this.horizontalCarve(cellA);
        }
        else
        {
            this.verticalCarve(cellA);
        }
        

        this.advancePosition();
    }

    draw()
    {
        super.draw();

        for(let set of this.sets)
        {
            for(let cell of set.cells)
            {
                cell.highlight(set.color);
            }
        }
    }

    advancePosition()
    {

        if (this.setsToConnect.length > 0)
        {
            let setToConnect = this.setsToConnect.pop();
            let cellsInRow = this.getCellsOfSetInRow(setToConnect, this.y);
            let randomCellIndex = floor(random(0, cellsInRow.length));
            let cellA = cellsInRow[randomCellIndex];
            this.x = cellA.col;
            this.y = cellA.row;
        }
        else if(this.x < this.grid.sizeX - 1)
        {
            this.x++;
        }
        else
        {
            this.x = 0;

            if(!this.connectingHorizontal)
            {
                if(this.setsToConnect.length > 0)
                {
                    let setToConnect = this.setsToConnect.pop();
                    let cellsInRow = this.getCellsOfSetInRow(setToConnect, this.y);
                    let randomCellIndex = floor(random(0, cellsInRow.length));
                    let cellA = cellsInRow[randomCellIndex];
                    this.x = cellA.col;
                    this.y = cellA.row;
                }
                else
                {
                    this.connectingHorizontal = true;
                    this.x = 0;
                    this.y++;
                }
            }
            else
            {
                this.connectingHorizontal = false;
            }
        }

        if(this.y >= this.grid.sizeY)
        {
            this.isGenerationComplete = true;
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

    horizontalCarve(cellA)
    {
        if(this.x < this.grid.sizeX - 1)
        {
            let cellB = this.grid.cells[this.x + 1][this.y];
            let cellASet = this.findSetContainingCell(cellA);
            let cellBSet = this.findSetContainingCell(cellB);
    
            if((cellASet == null && cellBSet == null) || cellASet != cellBSet)
            {
                if(random() < 0.5 ||
                    this.y == this.grid.sizeY - 1 && cellASet != cellBSet)
                {
                    this.carvePath(Grid.directions.Right);
    
                    // merge sets if they exist
                    if(cellASet == null && cellBSet == null)
                    {
                        let newSet = {cells: [cellA, cellB], color : color(random(0,255), random(0,255), random(0,255), 200)};
                        this.sets.push(newSet);
                    }
                    else if(cellASet != null && cellBSet != null)
                    {
                        // merge sets   
                        cellASet.cells.push(...cellBSet.cells);
                        this.sets.splice(this.sets.indexOf(cellBSet), 1);
                    }
                    else if(cellASet != null)
                    {
                        cellASet.cells.push(cellB);
                    }
                    else if(cellBSet != null)
                    {
                        cellBSet.cells.push(cellA);
                    }
                    else
                    {
                        print("What is going on here?");
                    }
                }
                else  
                {
                    if(cellASet == null)
                    {
                        let newSet = {cells: [cellA], color : color(random(0,255), random(0,255), random(0,255), 200)};
                        this.sets.push(newSet);
                    }
                    if(cellBSet == null)
                    {
                        let newSet = {cells: [cellB], color : color(random(0,255), random(0,255), random(0,255), 200)};
                        this.sets.push(newSet);
                    }
                }
            }
        }
    }

    findHigherColumnInSet(set)
    {
        let x = -1;
        for(let cell of set.cells)
        {
            if(cell.col > x)
            {
                x = cell.col;
            }
        }

        return x;
    }

    findSetsWithoutDownwardConnections(sets, currentRow)
    {
        let setsToReturn = [];

        for(let set of this.sets)
        {
            let foundDownConnection = false;
            for(let cell of set.cells)
            {
                if(cell.row == currentRow && !cell.walls.bottom)
                {
                    foundDownConnection = true;
                    break;
                }
            }

            if(!foundDownConnection)
            {
                setsToReturn.push(set);
            }
        }

        return setsToReturn;
    }

    getCellsOfSetInRow(set, row)
    {
        let cellsInRow = [];

        for(let cell of set.cells)
        {
            if(cell.row == row)
            {
                cellsInRow.push(cell);
            }
        }

        return cellsInRow;
    }

    verticalCarve(cellA)
    {
        if(this.y < this.grid.sizeY - 1)
        {
            let cellB = this.grid.cells[this.x][this.y + 1];
            let cellASet = this.findSetContainingCell(cellA);
            let cellBSet = this.findSetContainingCell(cellB);

            if(cellASet != null)
            {
                if(cellASet.cells.count < 2 || random() < 0.5)
                {
                    this.carvePath(Grid.directions.Down);

                    if(cellBSet == null)
                    {
                        cellASet.cells.push(cellB);
                    }
                    else
                    {

                    }
                }
            }
            else
            {
                // this should never happen, but just in case
                let newSet = {cells: [cellA, cellB], color : color(random(0,255), random(0,255), random(0,255), 200)};
                this.sets.push(newSet);
                this.carvePath(Grid.directions.Down);
            }

            if(this.x == this.grid.sizeX - 1)
            {
                // last column, make sure all cells are connected
                this.setsToConnect = this.findSetsWithoutDownwardConnections(this.sets, this.y);
            }
        }
    }
}