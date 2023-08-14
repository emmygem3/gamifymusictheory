var rows = 5;
var columns = 5;

var currentTile;
var otherTile;

const blanks = [];
const pieces = [];

window.onload = function () {
  // initializes the game board
  for (let i = 1; i <= rows * columns; i++) {
    /**
     * {
     *   'index': number (current spot in the array)
     *   'placedImage': number
     * }
     */
    blanks.push({ index: i, placedImage: -1 }); // puts objects named 1-25 into the index, and a placeholder number (-1) in placedImage
  }

  for (let i = 0; i < blanks.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./puzpics/blanks/" + blanks[i].index + ".jpg";

    // lets user drag pieces
    tile.addEventListener("dragstart", dragStart); // user clicks on image to drop
    tile.addEventListener("dragover", dragOver); // user drags an image
    tile.addEventListener("dragenter", dragEnter); // user drags an image into another one
    tile.addEventListener("dragleave", dragLeave); // user drags an image away from another one
    tile.addEventListener("drop", dragDrop); // user drops image onto another one
    tile.addEventListener("dragend", dragEnd); // after user completes dragDrop (swaps the two images)

    document.getElementById("board").append(tile);
  }

  /* ------- */

  // initializes pieces
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); // puts puzzle images (named 1-25) into the array
  }

  // randomizes order of puzzle pieces
  for (let i = 0; i < pieces.length; i++) {
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
};

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

function dragLeave() {}

function dragDrop() {
  otherTile = this; // this refers to image that is being dropped on
}

function dragEnd() {
  if (currentTile.src.includes("blank")) {
    return;
  }

  let currentImg = currentTile.src;
  let otherImg = otherTile.src;
  currentTile.src = otherImg;
  otherTile.src = currentImg;

  // Update the blanks array object, at this index, to have the image i placed in.
  let currentImageLastIndex = getLastIndex(currentImg);
  let currentOtherLastIndex = getLastIndex(otherImg);

  const imageIndex = findPlacedImageIndex(currentImageLastIndex);
  const otherIndex = findOtherImageIndex(currentOtherLastIndex);

  //   update the blanks array at this index to have the new images number
  //   if (currentTile.src.includes("blank")) {
  //     blanks[+currentOtherLastIndex - 1].placedImage = +currentImageLastIndex;
  //     //blanks[+otherIndex - 1].placedImage = +currentImageLastIndex;
  //     if (imageIndex !== -1) {
  //       blanks[+imageIndex - 1].placedImage = -1;
  //     }
  //   }

  if (currentTile.src.includes("blanks")) {
    for (let i = 0; i < blanks.length; i++) {
      if (blanks[i].placedImage !== currentImageLastIndex) {
        //blanks[+otherIndex - 1].placedImage = +currentImageLastIndex;
        blanks[+currentOtherLastIndex - 1].placedImage = +currentImageLastIndex;
        break;
      } else {
        //blanks[+currentOtherLastIndex - 1].placedImage = +currentImageLastIndex;
        blanks[+otherIndex - 1].placedImage = +currentImageLastIndex;
        break;
      }
    }
    if (imageIndex !== -1) {
      blanks[+imageIndex - 1].placedImage = -1;
    }
  }

  if (currentTile.src.includes("beethoven")) {
    blanks[+otherIndex - 1].placedImage = +currentImageLastIndex;
    blanks[+imageIndex - 1].placedImage = +currentOtherLastIndex;
  }

  console.log(blanks);
  console.log(currentImageLastIndex);
  console.log(currentOtherLastIndex);
  console.log(imageIndex);
  console.log(otherIndex);

  validate();
}

// function alreadyOnBoard(currentImageLastIndex) {
//   for (let i = 0; i < blanks.length; i++) {
//     if (blanks[i].placedImage == currentImageLastIndex) {
//       blanks[+otherIndex - 1].placedImage = +currentImageLastIndex;
//     } else {
//       blanks[+currentOtherLastIndex - 1].placedImage = +currentImageLastIndex;
//     }
//   }
//   return -1; // Return -1 if the desired condition is not found
// }

function findPlacedImageIndex(currentImageLastIndex) {
  for (let i = 0; i < blanks.length; i++) {
    if (blanks[i].placedImage == currentImageLastIndex) {
      return blanks[i].index;
    }
  }
  return -1; // Return -1 if the desired condition is not found
}

function findOtherImageIndex(currentOtherLastIndex) {
  for (let i = 0; i < blanks.length; i++) {
    if (blanks[i].placedImage == currentOtherLastIndex) {
      return blanks[i].index;
    }
  }
  return -1; // Return -1 if the desired condition is not found
}

function getLastIndex(url) {
  //   Update blanks array to have the number of the image we placed in it
  const forwardSlashSplit = url.split("/");

  //   Get the last item in the array
  const lastItem = forwardSlashSplit[forwardSlashSplit.length - 1];

  // replace .jpg
  const lastItemIndex = lastItem.replace(".jpg", "");

  return lastItemIndex;
}

function validate() {
  let isSolved = true;

  for (let i = 0; i < blanks.length; i++) {
    if (blanks[i].index !== blanks[i].placedImage) {
      isSolved = false;
      break;
    }
  }

  if (isSolved) {
    alert("Puzzle complete!");
    window.location.href = "index.html";
  }
}

/*
var errors = pieces.length;

// assigns these img elements an id
for (let i = 0; i < pieces.length; i++) {
    let img = pieces[i];
  
    // Assign an id to each img element
    img.id = img - $(i + 1);
  }

  for (let i = 0; i < pieces.length; i++) {
      if (img.id = 
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
