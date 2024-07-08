// Simon Game Challenge Starting Files\index.js
var buttons = document.querySelectorAll('div[type="button"]');
var level = 0;
var started = false;
var buttonsPatern = new Array();
var indexOfButton = 0;

buttons.forEach(element => {
    element.addEventListener("click",async function(){
        pressButtonSound(element);
        pressButtonAnimation(element);
        var color = element.id;

        if(color === buttonsPatern[indexOfButton]){
            pressButtonSound(color);
            pressButtonAnimation(color);
            if(indexOfButton === buttonsPatern.length-1){
                await pause(1000);
                upLevel();
            }
            else{
                indexOfButton++;
            }
        }
        else{
            overGame();
        }
    });
});


//press key to start game
document.addEventListener("keypress",function(event){
    if(!started){
        upLevel();
    }
});


async function pressButtonAnimation(color)
{
    var buttonId = "#" + color;
    var button = document.querySelector(buttonId);
    button.classList.add("pressed");
    setTimeout(function(){
        button.classList.remove("pressed");
    },100);
}

function pressButtonSound(color){
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function getRandomColor(){
    var colors = ["green","red","yellow","blue"];
    return colors[Math.floor(Math.random()*4)];
}

function upLevel(){
    level++;
    document.querySelector('#level-title').textContent = "Level " + level;
    indexOfButton = 0;
    var nextColor = getRandomColor();
    buttonsPatern.push(nextColor);
    pressButtonSound(nextColor);
    pressButtonAnimation(nextColor);
}

function overGame(){
    started = false;
    level = 0;
    indexOfButton = 0;
    buttonsPatern = new Array();
    document.querySelector('#level-title').textContent = "Game Over, Press Any Key to Restart";
    var sound = new Audio("./sounds/wrong.mp3");
    sound.play();
    document.querySelector('body').classList.add("game-over");
    setTimeout(function(){
        document.querySelector('body').classList.remove("game-over");
    },200);
}


function pause(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
}