var rows = 3;
var columns = 3;

var currentTile;
var otherTile;

const blanks = [];
const pieces = [];

window.onload = function () {
  /* --- GAME BOARD --- */
  // initializes the game board
  for (let i = 1; i <= rows * columns; i++) {
    /**
     * {
     *   'index': number (current spot in the array)
     *   'placedImage': number
     * }
     */
    blanks.push({ index: i, placedImage: -1 }); // puts objects named 1-9 into the index, and a placeholder number (-1) in placedImage
  }

  // fills the gameboard with "blank" placeholder images using the blanks[] array
  for (let i = 0; i < blanks.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./puzpics/blanks/" + blanks[i].index + ".jpg";
    tile.id = blanks[i].index;

    // lets user drag pieces
    tile.addEventListener("dragstart", dragStart); // user clicks on image to drop
    tile.addEventListener("dragover", dragOver); // user drags an image
    tile.addEventListener("dragenter", dragEnter); // user drags an image into another one
    tile.addEventListener("dragleave", dragLeave); // user drags an image away from another one
    tile.addEventListener("drop", dragDrop); // user drops image onto another one
    tile.addEventListener("dragend", dragEnd); // after user completes dragDrop (swaps the two images)

    document.getElementById("board").append(tile);
  }

  /* --- PUZZLE PIECES --- */

  // initializes puzzle pieces array
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); // puts puzzle images (named 1-9) into the array
  }

  // randomizes order of puzzle pieces array
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    let temp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = temp;
  }

  // fills placeholder box with the randomized puzzle pieces
  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./puzpics/chopin/" + pieces[i] + ".jpg";

    // lets user drag pieces
    tile.addEventListener("dragstart", dragStart); // user clicks on image to drop
    tile.addEventListener("dragover", dragOver); // user drags an image
    tile.addEventListener("dragenter", dragEnter); // user drags an image into another one
    tile.addEventListener("dragleave", dragLeave); // user drags an image away from another one
    tile.addEventListener("drop", dragDrop); // user drops image onto another one
    tile.addEventListener("dragend", dragEnd); // after user completes dragDrop (swaps the two images)

    document.getElementById("pieces").append(tile);
  }
};

/* --- DRAG FUNCTIONS --- */

function dragStart() {
  currentTile = this; // this refers to image that was clicked on to drag
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; // this refers to image that is being dropped on
}

// both completes the drag AND verifies if the puzzle is correct
/* --- DRAG END --- */
function dragEnd() {
  if (currentTile.src.includes("blank")) {
    return;
  }

  let currentImg = currentTile.src;
  let otherImg = otherTile.src;

  currentTile.src = otherImg;
  otherTile.src = currentImg;

  /* --- PUZZLE COMPLETION --- */

  // Update the blanks array object, at this index, to have the image placed in.
  let currentImageLastIndex = getLastIndex(currentImg);
  let currentOtherLastIndex = getLastIndex(otherImg);

  // Index numbers of the tiles being swapped
  const imageIndex = findPlacedImageIndex(currentImageLastIndex);
  const otherIndex = findOtherImageIndex(currentOtherLastIndex);

  // If the tile that is being traded is a blank image, this if statement sets the placed tile's placedImage number,
  // and also resets the now empty tile's placedImage number back to -1
  if (currentTile.src.includes("blanks")) {
    // set the current tile (the blank one) to be its own image
    if (currentTile.id) {
      // Resets the previous spot's placedImage to -1
      blanks[currentTile.id - 1].placedImage = -1;
    }
    // Sets the new spot with the dragged tile's placedImage number
    blanks[+otherTile.id - 1].placedImage = +currentImageLastIndex;
  }

  // If the tile that is being traded is another puzzle piece, this if statement swaps the tiles' placedImage number
  if (currentTile.src.includes("chopin")) {
    blanks[+otherIndex - 1].placedImage = +currentImageLastIndex;
    blanks[+imageIndex - 1].placedImage = +currentOtherLastIndex;
  }

  // console.log(blanks); left in to validate the index and placedImage numbers, should the puzzle ever fail to complete
  console.log(blanks);

  // Left these in because I felt like it. Bite me.

  // console.log("CurrentOtherLastIndex: ", currentOtherLastIndex);
  // console.log("currentImageLastIndex", currentImageLastIndex);

  // console.log("Current Tile ID: ", currentTile.id);
  // console.log("Other Tile ID: ", otherTile.id);

  validate();
}

/* --- FUNCTIONS FOR dragEnd --- */

// Finds the index of the tile being dragged
function findPlacedImageIndex(currentImageLastIndex) {
  for (let i = 0; i < blanks.length; i++) {
    if (blanks[i].placedImage == currentImageLastIndex) {
      return blanks[i].index;
    }
  }
  return -1; // Return -1 if the desired condition is not found
}

// Finds the infex of the tile being traded
function findOtherImageIndex(currentOtherLastIndex) {
  for (let i = 0; i < blanks.length; i++) {
    if (blanks[i].placedImage == currentOtherLastIndex) {
      return blanks[i].index;
    }
  }
  return -1; // Return -1 if the desired condition is not found
}

// Uses the url link to find the number of the tile
function getLastIndex(url) {
  // Finds url of image and splits the words wherever there's a "/"
  const forwardSlashSplit = url.split("/");

  // Gets the last item in the array
  const lastItem = forwardSlashSplit[forwardSlashSplit.length - 1];

  // replaces .jpg with nothing, which leaves only the number
  const lastItemIndex = lastItem.replace(".jpg", "");

  return lastItemIndex;
}

// Validates if the puzzle is complete or not
function validate() {
  let isSolved = true;

  // If blanks[i].index is not the same as blanks[i].placedImage, the puzzle is not complete
  for (let i = 0; i < blanks.length; i++) {
    if (blanks[i].index !== blanks[i].placedImage) {
      isSolved = false;
      break;
    }
  }
  // When blanks[i].index and blanks[i].placedImage are the same, the puzzle is solved! Move forward to a full picture and song
  if (isSolved) {
    window.location.href = "puzzleEasySolved.html";
  }
}
