let rows = 10;
let cols = 10;
let cellSize = 35;
let grid;
let wallThickness = 5;
let algorithms = ["Binary Tree", "Sidewinder", "Aldous-Broder", "Wilsons", "Hunt and Kill", "Recursive Backtracker"];
let guiSizeWidth = 200;
let guiSizeHeight = 50;
let framesPerUpdate = 1;
let gridOffsetY = 50;
let algorithm;
let posX;
let posY;

function setup() 
{
  let offsetWidth =  wallThickness * 75;
  let offsetHeight = gridOffsetY + wallThickness * 15;
  createCanvas((25 * cellSize) + offsetWidth, (25 * cellSize) + offsetHeight);
  grid = new Grid(cols, rows, cellSize, 0, gridOffsetY);
  algorithm = new BinaryTree(grid);

  posX = width - guiSizeWidth - wallThickness;
  posY = wallThickness + gridOffsetY;
  
  colorMode(RGB);
  
  gui();
}

function draw() {
  background(220);

  noStroke();
  textSize(50);
  fill(0);
  textAlign(CENTER);
  textStyle(NORMAL);
  textFont('Arial');
  text("Maze Generator", 0,0, width, 50);

  textSize(20);
  textAlign(LEFT);
  text("Columns: " + cols, posX, posY + guiSizeHeight * 1.6);
  text("Rows: " + rows, posX, posY + guiSizeHeight * 3.2);
  text("Frames per update: " + framesPerUpdate, posX, posY + guiSizeHeight * 4.8);

  algorithm.update();
  algorithm.draw();
}

function gui()
{
  let selector = createSelect();
  selector.position(posX, posY);
  selector.size(guiSizeWidth, guiSizeHeight);

  for (let i=0; i< algorithms.length; i++)
  {
    selector.option(algorithms[i]);
  }

  selector.selected(algorithms[0]);
  selector.addClass("myElements");

  let widthSlider = createSlider(5, 25, cols);
  widthSlider.position(posX, posY + guiSizeHeight * 1.5);
  widthSlider.style('margin-top', '5px');
  widthSlider.size(guiSizeWidth, guiSizeHeight);
  widthSlider.addClass("mySliders");
  widthSlider.input(() => {
    cols = widthSlider.value();
  });

  let heightSlider = createSlider(5, 25, rows);
  heightSlider.position(posX, posY + guiSizeHeight * 3.1);
  heightSlider.size(guiSizeWidth, guiSizeHeight);
  heightSlider.addClass("mySliders");
  heightSlider.input(() => {
    rows = heightSlider.value();
  });

  let framesPerUpdateSlider = createSlider(1, 50, 1);
  framesPerUpdateSlider.position(posX, posY + guiSizeHeight * 4.8);
  framesPerUpdateSlider.size(guiSizeWidth, guiSizeHeight);
  framesPerUpdateSlider.addClass("mySliders");
  framesPerUpdateSlider.input(() => {
    framesPerUpdate = framesPerUpdateSlider.value();
  });

    let generateButton = createButton('Generate');
  generateButton.position(posX, posY + guiSizeHeight * 8);
  generateButton.size(guiSizeWidth, guiSizeHeight);
  generateButton.addClass("myElements");
  generateButton.mousePressed(() => {
    let selectedAlgorithm = selector.value();

    grid = new Grid(cols, rows, cellSize, 0, gridOffsetY);

    if (selectedAlgorithm === "Binary Tree")
    {
      algorithm = new BinaryTree(grid);
    }
    else if (selectedAlgorithm === "Sidewinder")
    {
      algorithm = new Sidewinder(grid);
    }
    else if (selectedAlgorithm === "Wilsons")
    {
      algorithm = new Wilsons(grid);
    }
    else if(selectedAlgorithm == "Aldous-Broder")
    {
      algorithm = new AldousBroder(grid);
    }
    else if(selectedAlgorithm == "Hunt and Kill")
    {
      algorithm = new HuntAndKill(grid);
    }
    else if(selectedAlgorithm == "Recursive Backtracker")
    {
      algorithm = new RecursiveBacktracker(grid);
    }
  });
}