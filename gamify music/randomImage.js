window.onload = choosePic;
var lastRandom = 0; // this should be outside of function and be global to access
var randomNum

// Array of all available notes, found in the pictures folder
var myPix = new Array();
    myPix [0] = "pictures/noteC4.jpg";
    myPix [1] = "pictures/noteD4.jpg";
    myPix [2] = "pictures/noteE4.jpg";
    myPix [3] = "pictures/noteF4.jpg";
    myPix [4] = "pictures/noteG4.jpg";
    myPix [5] = "pictures/noteA4.jpg";
    myPix [6] = "pictures/noteB4.jpg";
    myPix [7] = "pictures/noteC5.jpg";
    myPix [8] = "pictures/noteD5.jpg";
    myPix [9] = "pictures/noteE5.jpg";
    myPix [10] = "pictures/noteF5.jpg";
    myPix [11] = "pictures/noteG5.jpg";
    myPix [12] = "pictures/noteA5.jpg";

function choosePic() {

    randomNum = Math.floor(Math.random() * myPix.length);

    while (randomNum == lastRandom) {
        randomNum = Math.floor(Math.random() * myPix.length);
        if(randomNum != lastRandom) {break;}
    }

    lastRandom = randomNum;

    document.getElementById("myPicture").src = myPix[randomNum];

// -------------------------------------------------------------

    document.getElementById("puzzleNum").innerHTML = 
    "Puzzle Pieces: <br>" + tally(); + "/10";
}

function answerC() {
    document.getElementById('buttC').onclick;
    if (randomNum == 0 || randomNum == 7) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}

function answerD() {
    document.getElementById('buttD').onclick;
    if (randomNum == 1 || randomNum == 8) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}

function answerE() {
    document.getElementById('buttE').onclick;
    if (randomNum == 2 || randomNum == 9) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}

function answerF() {
    document.getElementById('buttF').onclick;
    if (randomNum == 3 || randomNum == 10) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}
function answerG() {
    document.getElementById('buttG').onclick;
    if (randomNum == 4 || randomNum == 11) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}

function answerA() {
    document.getElementById('buttD').onclick;
    if (randomNum == 5 || randomNum == 12) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}

function answerB() {
    document.getElementById('buttB').onclick;
    if (randomNum == 6) {
        correct();
        tallyCount();
        choosePic();
    }
    else {incorrect();}
}

function correct() {
    document.getElementById("correctness").innerHTML = 
    "Correct!"
}

function incorrect() {
    document.getElementById("correctness").innerHTML = 
    "Incorrect!"
}

let tallyNum = 0;

function tally(){
    return tallyNum + "/10";
}

function tallyCount() {
    tallyNum = tallyNum + 1;

    if (tallyNum == 10) {
        alert("Identification exercise complete! Time to assemble your puzzle pieces!")
        window.location.href = 'puzzle.html';
    }
}