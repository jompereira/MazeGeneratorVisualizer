int ScreenSizeX = 1280;
int ScreenSizeY = 800;

int gridSizeX = 25;
int gridSizeY = 25;
Grid grid;

BinaryTree binaryTree;

int count = 0;
void setup()
{
  size(1280,800);
  background(102);
  frameRate(60);
  
  Cell[][] cells = new Cell[gridSizeX][gridSizeY];
  grid = new Grid(cells, gridSizeX, gridSizeY, 10, 10, 30);
  binaryTree = new BinaryTree(grid);
}

void draw()
{
  binaryTree.update(1);
  binaryTree.draw();
}
