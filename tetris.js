

let gameContainer = document.createElement('div');

gameContainer.style.position = "absolute";
gameContainer.style.overflow = "hidden";
gameContainer.style.width = "300px";
gameContainer.style.height = "600px";

gameContainer.style.marginLeft = String((window.innerWidth - 300)/2) + "px";
gameContainer.style.marginTop = "50px";

gameContainer.style.backgroundColor = "grey";

document.body.appendChild(gameContainer);

let gridTable = [];

for (let x=0; x < 10; x++)
{
  gridTable.push([]);
  for (let y=0; y < 20; y++)
  {
    let gridDiv = document.createElement('div');

    gridDiv.style.outline = "1px solid black";

    gridDiv.style.position = "absolute";

    gridDiv.style.width = "30px";
    gridDiv.style.height = "30px";

    gridDiv.style.left = String(x * 30) + "px";
    gridDiv.style.top = String(y * 30) + "px";

    gameContainer.appendChild(gridDiv);

    gridDiv.empty = true;

    gridDiv.isEmpty = function()
    {
      return this.empty;
    }

    gridTable[x].push(gridDiv);
  }
}

function Block()
{
  let type = Math.floor(Math.random() * 7);
  this.type = type;

  let rotation = Math.floor(Math.random() * 4);
  this.rotation = rotation;

  let color = "#" + ((1<<24) * Math.random() | 0).toString(16);
  this.color = color;

  this.x = 5;
  this.y = 0;

  this.generateBlock = function ()
  {
    let block document.createElement('div');

    block.style.backgroundColor = this.color;
    block.style.position = "absolute";

    block.style.width = "30px";
    block.style.height = "30px";

    block.that = this;

    block.update = function (offsetX, offsetY)
    {
      this.style.left = String((this.that.x + offsetX) * 30) + "px";
      this.style.top  = String((this.that.y + offsetY) * 30) + "px";
    }

    gameContainer.appendChild(block);
    return block;
  }

  this.updateBlock = function()
  {
    if (true && this.type === 0) // caré
    {
      this.blockList[0].update(0, 0);
      this.blockList[1].update(1, 0);
      this.blockList[2].update(0, 1);
      this.blockList[3].update(1, 1);
    }
  }


  this.blockList[0] = this.generateBlock();
  this.blockList[1] = this.generateBlock();
  this.blockList[2] = this.generateBlock();
  this.blockList[3] = this.generateBlock();

  if (true && type === 0)
  {
    
  }

}
