int ScreenSizeX = 1280;
int ScreenSizeY = 800;

int gridSizeX = 25;
int gridSizeY = 25;
Grid grid;

BinaryTree binaryTree;
Sidewinder sidewinder;
AldousBroderGenerator aldousBroder;
Wilsons wilsons;
HuntAndKill huntAndKill;
RecursiveBacktracker recursiveBacktracker;

int count = 0;
void setup()
{
  size(1280,800);
  background(102);
  frameRate(60);
  
  Cell[][] cells = new Cell[gridSizeX][gridSizeY];
  grid = new Grid(cells, gridSizeX, gridSizeY, 20.f, 10, 30);
  
  //binaryTree = new BinaryTree(grid);
  //sidewinder = new Sidewinder(grid);
  //aldousBroder = new AldousBroderGenerator(grid);
  //wilsons = new Wilsons(grid);
  //huntAndKill = new HuntAndKill(grid);
  recursiveBacktracker = new RecursiveBacktracker(grid);
}

void draw()
{
  //binaryTree.update(1); //<>//
  //binaryTree.draw();
  
  //sidewinder.update(1);
  //sidewinder.draw();
  
  //aldousBroder.update(1);
  //aldousBroder.draw();
  
  //wilsons.update(1);
  //wilsons.draw();
  
  //huntAndKill.update(1);
  //huntAndKill.draw();
  
  recursiveBacktracker.update(1);
  recursiveBacktracker.draw();
}
