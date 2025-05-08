let canvas = document.getElementById("meuCanvas");
let ctx = canvas.getContext("2d");

let x = 300;
let y = 200;
let ang = 0;
let centerX = 300;
let centerY = 200;

let x2 = 300;
let y2 = 200;
let ang2 = Math.random()*2*Math.PI;
let speed2 = 5;
let speedX2 = speed2*2*Math.cos(ang2);
let speedY2 = speed2*2*Math.sin(ang2);

let player = new Image();
player.src = "airplane.png";

let background = new Image();
background.src = "background.png";

let bgY = 0;
let bgW = canvas.width;
let bgH = canvas.height;
let playerSpeed = 1;
let pX = 400;
let pY = 500;
let pW = 100;
let pH = 100;

let bullet = new Image();
bullet.src = "new_bullet.png";

let bW = 16;
let bH = 16;
let bSpeed = 5;
let bullets = [[400, 400], [400,-100], [400, -100]];

let enemy = new Image();
enemy.src = "balloon_red.png";

let eW = 40;
let eH = 60;
let eSpeed = 2;
let enemies = [[200, 100, eSpeed]];

function desenha()
{
    ctx.clearRect(0, 0, 600, 400);

    ang += 0.01;
    x = centerX + 100*(Math.cos(ang));
    y = centerY + 100*(Math.sin(ang));

    ctx.beginPath();
    ctx.fillStyle = "cyan";
    ctx.arc(x, y, 25, 0, 2*Math.PI);
    ctx.fill();

    x2 += speedX2;
    y2 += speedY2;

    if(x2 <= 0 || x2 >= 600)
    {
        x2 -= speedX2;
        speedX2 *= -1;
    }
    if (y2 <= 0 || y2 >= 400)
    {
        y2 -= speedY2;
        speedY2 *= -1;
    }
    
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x2, y2, 20, 0, 2*Math.PI);
    ctx.fill();
}

canvas.addEventListener(
    "mousemove",
    function(event)
    {
        let rect = canvas.getBoundingClientRect();
        let cX = event.clientX - rect.left;
        let cY = event.clientY - rect.top;
        //console.log("Coords: " + cX + ", " + cY);

        pX = cX - pW/2;
        //pY = cY - pH/2;
    }    
);

canvas.addEventListener(
    "click",
    function(event)
    {
        //console.log("atirou");
        for(let i = 0; i < bullets.length; i++)
        {
            //if (bullets[i][0] > 900) // lateral)
            if (bullets[i][1] < -100) 
            {
                bullets[i][0] = pX + pW/2;
                bullets[i][1] = pY;
                //bullets[i][1] = pY + pH/2;
                break;
            }
        }
    }
);

function drawBullets()
{
    for (let i = 0; i < bullets.length; i++)
    {
        bullets[i][1] -= bSpeed;
        //bullets[i][0] += bSpeed; // LATERAL
        ctx.beginPath();
        ctx.drawImage(
            bullet,
            bullets[i][0],
            bullets[i][1],
            bW,
            bH           
        );
    }
}

function drawEnemies()
{
    for (let i = 0; i < enemies.length; i++)
    {
        enemies[i][0] -= enemies[i][2];
        ctx.beginPath();
        ctx.drawImage(
            enemy,
            enemies[i][0],
            enemies[i][1],
            eW,
            eH
        );
    }
}

function jogar()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgY += playerSpeed;
    if(bgY >= bgH)
    {
        bgY -= bgH;
    }

    ctx.drawImage(background, 0, bgY, bgW, bgH);
    ctx.drawImage(background, 0, bgY - bgH, bgW, bgH);

    ctx.drawImage(player, pX, pY, pW, pH);

    drawBullets();
    drawEnemies();
}   

setInterval(jogar, 1000/60);

function jogarLateral()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgY -= playerSpeed;
    if(bgY <= -bgW)
    {
        bgY += bgW;
    }
    ctx.drawImage(background, bgY, 0, bgW, bgH);
    ctx.drawImage(background, bgY + bgW, 0, bgW, bgH);
}   