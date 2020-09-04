

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
    gridDiv.style.outlineOffset = "-1px";

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

  this.x = 4;
  this.y = 0;

  this.xReach = 0;
  this.yReach = 0;

  this.lastXReach = 0;
  this.lastYReach = 0;

  this.generateBlock = function ()
  {
    this.x = 4;
    this.y = 0;

    this.type = Math.floor(Math.random() * 7);
    this.rotation = Math.floor(Math.random() * 4);

    this.blockList.forEach( block => {
      block.style.backgroundColor = "#" + ((1<<24) * Math.random() | 0).toString(16);
      block.style.position = "absolute";

      block.style.width = "30px";
      block.style.height = "30px";

      block.style.outline = "1px solid grey";
      block.style.outlineOffset = "-1px";

      block.style.zIndex = 100;

      block.that = this;

      block.update = function (offsetX, offsetY)
      {
        this.style.left = String((this.that.x + offsetX) * 30) + "px";
        this.style.top  = String((this.that.y + offsetY) * 30) + "px";

        this.x = this.that.x + offsetX;
        this.y = this.that.y + offsetY;
      }
    });

    this.updateBlock();
  }

  this.updateBlock = function()
  {
    this.lastXReach = this.xReach;
    this.lastYReach = this.yReach;

    if (this.type === 0) // caré
    {
      this.blockList[0].update(0, 0);
      this.blockList[1].update(1, 0);
      this.blockList[2].update(0, 1);
      this.blockList[3].update(1, 1);

      this.xReach = 1;
      this.yReach = 1;
    }
    else if (this.type === 1) // ligne
    {
      if (this.rotation === 0 || this.rotation === 2)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(0, 1);
        this.blockList[2].update(0, 2);
        this.blockList[3].update(0, 3);

        this.xReach = 0;
        this.yReach = 3;
      }
      else
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(2, 0);
        this.blockList[3].update(3, 0);

        this.xReach = 3;
        this.yReach = 0;
      }
    }
    else if (this.type === 2) // ???
    {
      if (this.rotation === 0)
      {
        this.blockList[0].update(1, 0);
        this.blockList[1].update(0, 1);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(2, 1);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 1)
      {
        this.blockList[0].update(0, 1);
        this.blockList[1].update(0, 0);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(0, 2);

        this.xReach = 2;
        this.yReach = 1;
      }
      else if (this.rotation === 2)
      {
        this.blockList[0].update(1, 0);
        this.blockList[1].update(0, 0);
        this.blockList[2].update(2, 0);
        this.blockList[3].update(1, 1);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 3)
      {
        this.blockList[0].update(1, 1);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(1, 2);
        this.blockList[3].update(0, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
    }
    else if (this.type === 3) // L1
    {console.log('test');
      if (this.rotation === 0)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(0, 1);
        this.blockList[2].update(0, 2);
        this.blockList[3].update(1, 2);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 1)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(2, 0);
        this.blockList[3].update(0, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
      else if (this.rotation === 2)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(1, 2);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 3)
      {
        this.blockList[0].update(0, 1);
        this.blockList[1].update(1, 1);
        this.blockList[2].update(2, 1);
        this.blockList[3].update(2, 0);

        this.xReach = 2;
        this.yReach = 1;
      }
    }
    else if (this.type === 4) // L2
    {
      if (this.rotation === 0)
      {
        this.blockList[0].update(1, 0);
        this.blockList[1].update(1, 1);
        this.blockList[2].update(1, 2);
        this.blockList[3].update(0, 2);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 1)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(0, 1);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(2, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
      else if (this.rotation === 2)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(1, 2);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 3)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(2, 0);
        this.blockList[3].update(2, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
    }
    else if (this.type === 5) // escalier1
    {
      if (this.rotation === 0 || this.rotation === 2)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(0, 1);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(1, 2);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 1 || this.rotation === 3)
      {
        this.blockList[0].update(1, 0);
        this.blockList[1].update(2, 0);
        this.blockList[2].update(0, 1);
        this.blockList[3].update(1, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
    }
    else if (this.type === 6) // escalier2
    {
      if (this.rotation === 0 || this.rotation === 2)
      {
        this.blockList[0].update(0, 1);
        this.blockList[1].update(0, 2);
        this.blockList[2].update(1, 0);
        this.blockList[3].update(1, 1);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 1 || this.rotation === 3)
      {
        this.blockList[0].update(0, 0);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(2, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
    }
  }

  this.canGoDown = function ()
  {
    if (block.y === 19) return false;

    this.blockList.forEach( b => {
      if (gridTable[b.x][b.y+1].isEmpty() === false)
      {console.log('test');
        return false;
      }
    });

    return true;
  }

  this.dropBlock = function ()
  {
    this.blockList.forEach( b => {
      gridTable[b.x][b.y].style.backgroundColor = b.style.backgroundColor;
      gridTable[b.x][b.y].empty = false;
    });

  }

  this.blockList = [];

  this.blockList[0] = document.createElement('div');
  this.blockList[1] = document.createElement('div');
  this.blockList[2] = document.createElement('div');
  this.blockList[3] = document.createElement('div');

  gameContainer.appendChild(this.blockList[0]);
  gameContainer.appendChild(this.blockList[1]);
  gameContainer.appendChild(this.blockList[2]);
  gameContainer.appendChild(this.blockList[3]);

  this.generateBlock();

  this.updateBlock();

}


let block = new Block();

window.addEventListener('keydown', keydown);

function keydown()
{console.log(event.which);
  if (event.which === 37)
  {
    if (block.x > 0)
    {
      block.x--;
      block.updateBlock();
    }
  }
  else if (event.which === 39)
  {
    if (block.x < 9 - block.xReach)
    {
      block.x++;
      block.updateBlock();
    }
  }
  else if (event.which === 38)
  {
    if (block.x < 10 - block.lastXReach && block.y < 20 - block.lastYReach)
    {
      block.rotation++;
      if (block.rotation > 3) block.rotation = 0;
      block.updateBlock();
    }
  }
  else if (event.which === 40)
  {
    if (block.y < 19 - block.yReach && block.canGoDown() === true)
    {
      block.y++;
      block.updateBlock();
    }
    else
    {
      block.dropBlock();
      block.generateBlock();
    }
  }
  else if (event.which === 32)
  {
    if (block.x < 10 - block.lastXReach && block.y < 20 - block.lastYReach)
    {
      block.rotation++;
      if (block.rotation > 3) block.rotation = 0;
      block.updateBlock();
    }
  }
  updateTable();
}

function updateTable()
{
  gridTable.forEach( table => {
    table.forEach( b => {
      if (b.isEmpty() === false)
      {
        b.style.backgroundColor = "black";
      }
    });

  });

}
