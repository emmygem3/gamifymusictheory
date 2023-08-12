var rows = 5;
var columns = 5;

var currentTile;
var otherTile;

window.onload = function() {
    // initializes the game board 
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./puzpics/blank.jpg"

            // lets user drag pieces
            tile.addEventListener("dragstart", dragStart); // user clicks on image to drop
            tile.addEventListener("dragover", dragOver); // user drags an image
            tile.addEventListener("dragenter", dragEnter); // user drags an image into another one
            tile.addEventListener("dragleave", dragLeave); // user drags an image away from another one
            tile.addEventListener("drop", dragDrop); // user drops image onto another one
            tile.addEventListener("dragend", dragEnd); // after user completes dragDrop (swaps the two images)

            document.getElementById("board").append(tile);
            } 
        }
    }

    // initializes pieces
    const pieces = [];
    for (let i = 1; i <= rows*columns; i++) {
        pieces.push(i.toString()); // puts puzzle images (named 1-25) into the array
    } 

    /*
    var pieces = new Array();
    pieces [0] = "/puzpics/beethoven/1.jpg";
    pieces [1] = "/puzpics/beethoven/2.jpg";
    pieces [2] = "/puzpics/beethoven/3.jpg";
    pieces [3] = "/puzpics/beethoven/4.jpg";
    pieces [4] = "/puzpics/beethoven/5.jpg";
    pieces [5] = "/puzpics/beethoven/6.jpg";
    pieces [6] = "/puzpics/beethoven/7.jpg";
    pieces [7] = "/puzpics/beethoven/8.jpg";
    pieces [8] = "/puzpics/beethoven/9.jpg";
    pieces [9] = "/puzpics/beethoven/10.jpg";
    pieces [10] = "/puzpics/beethoven/11.jpg";
    pieces [11] = "/puzpics/beethoven/12.jpg";
    pieces [12] = "/puzpics/beethoven/13.jpg";
    pieces [13] = "/puzpics/beethoven/14.jpg";
    pieces [14] = "/puzpics/beethoven/15.jpg";
    pieces [15] = "/puzpics/beethoven/16.jpg";
    pieces [16] = "/puzpics/beethoven/17.jpg";
    pieces [17] = "/puzpics/beethoven/18.jpg";
    pieces [18] = "/puzpics/beethoven/19.jpg";
    pieces [19] = "/puzpics/beethoven/20.jpg";
    pieces [20] = "/puzpics/beethoven/21.jpg";
    pieces [21] = "/puzpics/beethoven/22.jpg";
    pieces [22] = "/puzpics/beethoven/23.jpg";
    pieces [23] = "/puzpics/beethoven/24.jpg";
    pieces [24] = "/puzpics/beethoven/25.jpg"; */

    // randomizes order of puzzle pieces
    for(let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        let temp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = temp;
    }

    // puts image tiles into placeholder box
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./puzpics/beethoven/" + pieces[i] + ".jpg";

        // lets user drag pieces
        tile.addEventListener("dragstart", dragStart); // user clicks on image to drop
        tile.addEventListener("dragover", dragOver); // user drags an image
        tile.addEventListener("dragenter", dragEnter); // user drags an image into another one
        tile.addEventListener("dragleave", dragLeave); // user drags an image away from another one
        tile.addEventListener("drop", dragDrop); // user drops image onto another one
        tile.addEventListener("dragend", dragEnd); // after user completes dragDrop (swaps the two images)

        document.getElementById("pieces").append(tile);
    }


function validate(pieces) {
    var x = 0;
    for (let i = 1; i < pieces.length; i++) {
        c.push(pieces[i - 1].localeCompare(pieces[i]));
    }
    if (c.every((n) => n <= x)) window.location.href = 'index.html';
    x += 1;
}

// drag functions
function dragStart() {
    currentTile = this; // this refers to image that was clicked on to drag
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; // this referse to image that is being dropped on
}

function dragEnd() {
    if (currentTile.src.includes("blank")) {
        return;
    }

    let currentImg = currentTile.src;
    let otherImg = otherTile.src;
    currentTile.src = otherImg;
    otherTile.src = currentImg;
}
