
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
var allpages=document.querySelectorAll(".page");

//select all subtopic pages
function show(pgno){ //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    onepage.style.display="block"; //show the page
    if (pgno == 2) {
        onepage.style.display="flex";
    }
}

var pageNum = 0;
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    pageNum = 1;
    show(pageNum);
});
page2btn.addEventListener("click", function () {
    pageNum = 2;
    show(pageNum);
});
page3btn.addEventListener("click", function () {
    pageNum = 3;
    show(pageNum);
    maximumLeft = game.offsetWidth-covid.offsetWidth;
    maximumTop = game.offsetHeight-covid.offsetHeight;

});
page4btn.addEventListener("click", function () {
    pageNum = 4;
    show(pageNum);
});



function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}
hideall();

//game start

const slider = document.querySelector("#diffculty");
const winVal = document.querySelector("#winValue");
slider.addEventListener("input", function(){
    winVal.innerHTML = "Reach " + slider.value + " points to win the game without touching the virus.";
    console.log(slider.value);
    totalDuration = slider.value;
});

const startGame = document.querySelector("#StartGame");
const pauseGameBtn = document.querySelector("#PauseGame");
const resumeGameBtn = document.querySelector("#ResumeGame");
const increasingScore = document.querySelector("#hitless");
const theGame = document.querySelector("#game");
const vaccine = document.querySelector("#syringe");
var vaccineLeft;
var vaccineTop;
var maximumLeft, maximumTop;
const covid = document.querySelector("#covid");
var covidX = 0;
var covidY = 0;
var speedX, speedY;
function measureVaccine(){ 
    const vaccineWidth = vaccine.offsetWidth; // returns the width of the syringe in pixels
    const vaccineHeight = vaccine.offsetHeight; // returns the height of the syringe in pixels

    vaccineLeft = (theGame.offsetWidth/2)-(vaccineWidth/2); // returns the game width in pixels
    vaccineTop = (theGame.offsetHeight/2)-(vaccineHeight/2); // returns the game height in pixels

    vaccine.style.left = vaccineLeft + "px";
    vaccine.style.top = vaccineTop + "px";

}
vaccineHeight = 100;
vaccineWidth = 100;
var covidHeight = 100;
var covidWidth = 100;
vaccine.addEventListener("load", measureVaccine); // ensures vaccine img loads before measurements is taken
const game=document.querySelector("#game");
const minimumLeft = 0;
const minimumTop = 0;
var totalDuration = slider.value;
var collision = false;
var overclocked = 0;

function checkCollision(){
    if (covidX + covidWidth >= vaccineX && covidX <= vaccineX + vaccineWidth && covidY + covidHeight >= vaccineY && covidY <= vaccineY + vaccineHeight){
        collision = true;

    }
}

function randRange(min, max) {
    return Math.round(Math.random()*(max-min) + min);
}

const bounce = new Audio("audio/Bounce.wav");
const walk = new Audio("audio/Walk.mp3");
const clank = new Audio("audio/Clank.mp3");
const winSound = new Audio("audio/Win.mp3");
function moveVirus() {

    if (pageNum == 3) {
        if (overclocked == 5){
            increasingScore.innerHTML = "Game overclocked! Refresh the page.";
            pauseGame();
            return;
        }
        if (survive == totalDuration) {
            winSound.play();
            increasingScore.innerHTML = "Score: " + survive + " You win the game!";
            pauseGame();
            return;
        }
        checkCollision();
        if (collision){
            clank.play();
            increasingScore.innerHTML = "You've scored: " + survive + " Do you want to play again?";
            pauseGame();
            return;
        }
        else {
            covidX += speedX;
            covidY += speedY;
            if (speedX > 15 || speedY > 15){
                speedX--;
                speedY--;
            }
            if (covidX > maximumLeft) {
                speedX = -speedX;
                covidX = maximumLeft;
                bounce.play();
            }
            if (covidY > maximumTop) {
                speedY = -speedY;
                covidY = maximumTop;
                bounce.play();
            }
            if (covidX < minimumLeft) {
                speedX = -speedX;
                covidX = minimumLeft;
                bounce.play();
            }
            if (covidY < minimumTop) {
                speedY = -speedY;
                covidY = minimumTop;
                bounce.play();
            }
        }
        covid.style.left = covidX + "px";
        covid.style.top = covidY + "px";
    }
}
var survive = 0;
var pause = 1;
var moving;
var points;

function gainPoints(){
    if (pause == 0) {
        survive++;
        increasingScore.innerHTML = "Score: " + survive;
    }
}

function resumeMove(){
    pause = 0;
    moving = setInterval(moveVirus, 30);
    points = setInterval(gainPoints, 15);
    gameOverclocked = setInterval(function () {overclocked--}, 100)
    if (pause == 0){
        speedX = randRange(-10,10);
        speedY = randRange(-10,10);
    }
}
function commenceGame(){
    pause = 0;
    survive = 0;
    collision = false;
    covidX = 0;
    covidY = 0;
    speedX = 0;
    speedY = 0;
    vaccineWidth = 100;
    vaccineHeight = 100;
    covidWidth = 100;
    covidHeight = 100;
    measureVaccine();
    resumeMove();
    gainPoints();
}

function pauseGame(){
    pause = 1;
    speedX = 0;
    speedY = 0;
    clearInterval(moving);
    clearInterval(points);
}

startGame.addEventListener("click", commenceGame);
pauseGameBtn.addEventListener("click", pauseGame);
resumeGameBtn.addEventListener("click", resumeMove);


const up = document.querySelector("#Up");
const down = document.querySelector("#Down");
const left = document.querySelector("#Left");
const right = document.querySelector("#Right");
var vaccineX = 250;
var vaccineY = 250;

function MovePos(left, top) {
    vaccineX = vaccineX + left;
    vaccineY = vaccineY + top;
    vaccine.style.left = vaccineX+"px"; //set left css property to vaccine x variable
    vaccine.style.top = vaccineY+"px"; //set top css property to vaccine y variable
}

left.addEventListener("click", function () {
    if (vaccineX > 10 && !collision) {
        MovePos(-40, 0)
        walk.play();
    }
});
right.addEventListener("click", function () {
    if (vaccineX < 400 && !collision) {
        MovePos(40, 0)
        walk.play();
    }
});
down.addEventListener("click", function () {
    if (vaccineY < 400 && !collision) {
        MovePos(0, 40)
        walk.play();
    }
});
up.addEventListener("click", function () {
    if (vaccineY > 10 && !collision) {
        MovePos(0, -40)
        walk.play();
    }
});

document.addEventListener("keydown", function(key){
    if (pause == 0) {
        if (key.code == "KeyW"){
            if (vaccineY > 10 && !collision) {
                MovePos(0, -30)
                walk.play();
            }
        }
        if (key.code == "KeyS"){
            if (vaccineY < 400 && !collision) {
                MovePos(0, 30)
                walk.play();
            } 
        }
        if (key.code == "KeyA"){
            if (vaccineX > 10 && !collision) {
                MovePos(-30, 0)
                walk.play();
            } 
        }
        if (key.code == "KeyD"){
            if (vaccineX < 400 && !collision) {
                MovePos(30, 0)
                walk.play();
            }
        }
    }   
});

//quiz
const btnQuiz = document.querySelector("#Finish");
btnQuiz.addEventListener("click", checkAns);
const totalScore = document.querySelector("#score");
var q1,q2,q3,q4,q5,score = 0;
function checkAns(){
    score = 0;
    q1 = document.querySelector("input[name='q1']:checked").value;
    if (q1 == "right"){
        score++;
    }
    q2 = document.querySelector("input[name='q2']:checked").value;
    if (q2 == "right"){
        score++;
    }
    q3 = document.querySelector("input[name='q3']:checked").value;
    if (q3 == "right"){
        score++;
    }
    q4 = document.querySelector("input[name='q4']:checked").value;
    if (q4 == "right"){
        score++;
    }
    q5 = document.querySelector("input[name='q5']:checked").value;
    if (q5 == "right"){
        score++;
    }

    if (score == 5){
        totalScore.innerHTML="Total score: " + score + " Perfect score :D";
    }
    else {totalScore.innerHTML="Total score: " + score;}

}

//interactables
const dVal = document.querySelector("#death");
const iVal = document.querySelector("#infection");
const tVal = document.querySelector("#time");
const Calculation = document.querySelector("#Finalize");
Calculation.addEventListener("click", calculate);
const I = document.querySelector("#i");
const D = document.querySelector("#d");
function calculate() {
    let deaths = parseInt(dVal.value);
    let infections = parseInt(iVal.value);
    let time = parseInt(tVal.value);
    let Totalinfections = (infections ** 7.7) * (365*time) / Math.sqrt(deaths)**2;
    let Totaldeaths = (deaths / 100) * Totalinfections;
    if (deaths > 100) {
        I.innerHTML = "Infections: " + Math.round(Totalinfections);
        D.innerHTML = "Deaths: Invalid Number";
    }
    else {
        I.innerHTML = "Infections: " + Math.round(Totalinfections);
        D.innerHTML = "Deaths: " + Math.round(Totaldeaths);
    }
}

const opacity = document.querySelector("#switch");
const Singapore = document.getElementsByClassName("singapore");
const World = document.getElementsByClassName("world");
var opacitySG = 0;
var opacityWorld = 100;
var tempOpacity = 0;
function changeImage(){
    tempOpacity = opacitySG;
    opacitySG = opacityWorld;
    opacityWorld = tempOpacity;
    for (let s = 0; s < Singapore.length; s++) {
        Singapore[s].style.opacity = opacitySG;
    }
    for (let w = 0; w < World.length; w++){
        World[w].style.opacity = opacityWorld;
    } // collection of items (class) requires a for loop to loop through all elements
}
opacity.addEventListener("click", changeImage);