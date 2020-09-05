

let gameContainer = document.createElement('div');

gameContainer.style.position = "absolute";
gameContainer.style.overflow = "hidden";
gameContainer.style.width = "300px";
gameContainer.style.height = "650px";

gameContainer.style.marginLeft = String((window.innerWidth - 300)/2) + "px";
gameContainer.style.marginTop = "10px";

gameContainer.style.backgroundColor = "grey";

document.body.appendChild(gameContainer);

let scoreDiv = document.createElement('div');

scoreDiv.style.position = "absolute";
scoreDiv.style.width = "300px";
scoreDiv.style.height = "50px";

scoreDiv.style.top = "600px";

scoreDiv.style.backgroundColor = "blue";

scoreDiv.style.textAlign = "center";
scoreDiv.style.fontSize = "25px";

scoreDiv.score = 0;
scoreDiv.level = 1;
scoreDiv.line = 0;
scoreDiv.gameOver = false;

scoreDiv.appendChild(document.createTextNode('Score: '));
scoreDiv.appendChild(document.createTextNode(scoreDiv.score));
scoreDiv.appendChild(document.createTextNode('Level: '));
scoreDiv.appendChild(document.createTextNode(scoreDiv.level));

scoreDiv.update = function ()
{
  if (this.gameOver === true) return false;

  this.level = Math.floor(this.line / 10);

  this.firstChild.nextSibling.nodeValue = this.score;
  this.lastChild.nodeValue = this.level;
}
scoreDiv.setGameOver = function ()
{
  this.innerHTML = "GAME OVER";
  this.gameOver = true;
}

gameContainer.appendChild(scoreDiv);

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

    if (x < 3 && y < 16) gridDiv.setAttribute('onclick', 'block.goLeft()');
    else if (x > 6 && y < 16) gridDiv.setAttribute('onclick', 'block.goRight()');
    else if (y > 15) gridDiv.setAttribute('onclick', 'block.goDown()');
    else if (x > 2 && x < 7 && y < 16) gridDiv.setAttribute('onclick', 'block.rotate()');

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
      let color_list = ['red', 'blue', 'yellow', 'green', 'purple', 'pink'];

      block.style.backgroundColor = color_list[Math.floor(Math.random() * color_list.length)];
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

        this.xReach = 2;
        this.yReach = 1;
      }
      else if (this.rotation === 1)
      {
        this.blockList[0].update(0, 1);
        this.blockList[1].update(0, 0);
        this.blockList[2].update(1, 1);
        this.blockList[3].update(0, 2);

        this.xReach = 1;
        this.yReach = 2;
      }
      else if (this.rotation === 2)
      {
        this.blockList[0].update(1, 0);
        this.blockList[1].update(0, 0);
        this.blockList[2].update(2, 0);
        this.blockList[3].update(1, 1);

        this.xReach = 2;
        this.yReach = 1;
      }
      else if (this.rotation === 3)
      {
        this.blockList[0].update(1, 1);
        this.blockList[1].update(1, 0);
        this.blockList[2].update(1, 2);
        this.blockList[3].update(0, 1);

        this.xReach = 1;
        this.yReach = 2;
      }
    }
    else if (this.type === 3) // L1
    {
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
        this.blockList[1].update(0, 1);
        this.blockList[2].update(0, 2);
        this.blockList[3].update(1, 0);

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
    if (block.y > 18 - block.yReach) return false;

    for (let b of this.blockList)
    {
      if (gridTable[b.x][b.y+1].isEmpty() === false)
      {
        return false;
      }
    }
    return true;
  }

  this.goDown = function ()
  {
    if (block.canGoDown() === true)
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

  this.canGoLeft = function ()
  {

    for (let block of this.blockList)
    if (block.x < 1) return false;

    for (let b of this.blockList)
    {
      if (gridTable[b.x-1][b.y].isEmpty() === false)
      {
        return false;
      }
    }
    return true;
  }

  this.rotate = function ()
  {
    if (block.x < 9 - block.lastXReach && block.y < 19 - block.lastYReach)
    {
      block.rotation++;
      if (block.rotation > 3) block.rotation = 0;
      block.updateBlock();
    }
  }

  this.canGoRight = function ()
  {
    if (block.x > 8 - block.xReach) return false;

    for (let b of this.blockList)
    {
      if (gridTable[b.x+1][b.y].isEmpty() === false)
      {
        return false;
      }
    }
    return true;
  }

  this.goLeft = function ()
  {
    block.x--;
    block.updateBlock();
  }

  this.goRight = function ()
  {
    block.x++;
    block.updateBlock();
  }

  this.dropBlock = function ()
  {
    if (this.y === 0)
    {
      scoreDiv.setGameOver();
    }
    this.blockList.forEach( b => {
      gridTable[b.x][b.y].style.backgroundColor = b.style.backgroundColor;
      gridTable[b.x][b.y].empty = false;
    });

    scoreDiv.score += scoreDiv.level * 10;
    scoreDiv.update();

    for (let block of this.blockList)
    {
      let lineIncomplet = false;
      for (let column of gridTable)
      {
        lineIncomplet = lineIncomplet || column[block.y].isEmpty();
      }

      if (lineIncomplet === false)
      {
        scoreDiv.score += scoreDiv.level * 10 * (19 - block.y);
        scoreDiv.line++;
        scoreDiv.update();
        for (let column of gridTable)
        {
          for (let y = block.y; y > 0; y--)
          {
            column[y].style.backgroundColor = column[y-1].style.backgroundColor;
            column[y].empty = column[y-1].isEmpty();
          }
        }
      }
    }

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
{
  if (scoreDiv.gameOver === true) return false;

  if (event.which === 37)
  {
    if (block.canGoLeft() === true)
    {
      block.goLeft();
    }
  }
  else if (event.which === 39)
  {
    if (block.canGoRight() === true)
    {
      block.goRight();
    }
  }
  else if (event.which === 38)
  {
    block.rotate();
  }
  else if (event.which === 40)
  {
    block.goDown();
  }
  else if (event.which === 32)
  {
    block.rotate();
  }
}

let frame = 0;
function gameLoop()
{
  if (frame === (60 - scoreDiv.level))
  {
    frame = 0;

    block.goDown();
  }

  frame++;
  if (scoreDiv.gameOver === false) window.requestAnimationFrame(gameLoop);
}

gameLoop();
