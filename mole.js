// Steps for the game

// 1. on windows load, we need to set the game environment, such as structuring the grids and tiles
//  2. after the grid, set the mole
// 3. for that first generate a random tile number on which the mole needs to be displayed


let currMoleTile;
let currPlantTile;
let score = 0;
let clicked = false;
let gameOver = false;

window.onload = function(){
    let play = document.createElement("img");
    play.src = "./assets/imgs/play.png";
    play.id = "playButton"
    play.addEventListener('click',setGame);
    document.getElementById("board").appendChild(play);
}

function setGame(){
    // document.getElementById("board").removeChild(play);
    // play.style.display = 'none';
    // Set up the grid for the game board in html
    if(playButton){
        playButton.remove();
    }
    for (let i=0; i<9 ; i++){               //goes from 0 to 8
        let tile = document.createElement("div");
        // create <div id='0-8'></div>
        tile.id = i.toString();
        tile.setAttribute("clicked","false");
        console.log(clicked);
        tile.addEventListener('click',selectTile);
        document.getElementById("board").appendChild(tile);

    }
    
    setInterval(setMole,2000)   //set interval time of 1s 
    setInterval(setPlant,3000)   //set interval time of 3s 
}
function getRandomTile(){
    // get a random number from 0 to 1 * 9  (0-9)  floor --> round down to  (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}
function setMole(){
    if(gameOver){
        return;
    }
    if (currMoleTile){
        currMoleTile.innerHTML ="";
        currMoleTile.setAttribute("clicked", "false"); // Reset the clicked state for the previous mole tile
    }
    let mole = document.createElement("img");
    mole.src = "./assets/imgs/monty-mole.png";
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num){
        return;
    }
    currMoleTile= document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant(){
    if(gameOver){
        return;
    }
    if(currPlantTile){
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src =  "./assets/imgs/piranha-plant.png";
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num){
        return;
    }
    currPlantTile= document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameOver){
        return;
    }
    console.log("HEY");
    if (this == currMoleTile  && this.getAttribute("clicked") === "false"){
        score += 10;
        document.getElementById("score").innerText = "Current Score : " + score.toString();   //Update the score
        let moleImage = this.querySelector("img");
        if (moleImage) {
            moleImage.src = "./assets/imgs/hit-mole.png"; // Change to a "hit" mole image
        }
        this.setAttribute("clicked","true");
    }
    if (this == currPlantTile){
        clicked = true;
        let finalScore=document.getElementById("score")
        finalScore.innerText = "Game Over " + " Final Score "+score.toString();   //Update the score, adn show game over
        finalScore.classList.add("game-over");
        gameOver = true;
    }
}