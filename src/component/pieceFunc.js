import { reRender } from "../main";
import { WalkableBox } from "./PlayField";

export function selectPiece(event, isPlayerOneTurn, changePlayerOneTurn) {
  try {
    console.log(isPlayerOneTurn);
    let currentPiece = event.target;
    let x = Number(currentPiece.dataset.xindex);
    let y = Number(currentPiece.dataset.yindex);
    if (isPlayerOneTurn && currentPiece.dataset.player == '1') {
      determinateWetherPlayerCanWalkOverAnotherBox(x, y, isPlayerOneTurn);
    }

    else if (!isPlayerOneTurn && currentPiece.dataset.player == '2') {
      // changePlayerOneTurn(true);
      determinateWetherPlayerCanWalkOverAnotherBox(x, y, isPlayerOneTurn);
    }
    else {
      throw new Error(`it's not player ${currentPiece.dataset.player} turn`)
    }
    window.selectedPiece = { x, y };

    unSelectRemainingPieces()
    window.playField[y][x].selected = true;
    reRender()
  }
  catch (error) {
    window.stats = `${error}`;
    reRender();
    console.log(error);
  }
}

function determinateWetherPlayerCanWalkOverAnotherBox(x, y, playerOneTurn) {
  // make all the walkable boxes false
  
  // this doesn't work, fix it
  for (let index in window.playField) {
    playField[index] = playField[index].map((box) => {
      if (box == 'true') {
        box = 'false';
      }
      return box;
    })
  }

  let yOrientation = y;
  if (playerOneTurn) {
    yOrientation = y - 1;
  }
  else {
    yOrientation = y + 1;
  }
  if (x + 1 < 8) {
    window.playField[yOrientation][x + 1] = WalkableBox('true');
  }
  if(x - 1 >= 0) {
    window.playField[yOrientation][x - 1] = WalkableBox('true');
  }

}


function unSelectRemainingPieces() {
  for (let line of window.playField) {
    line.forEach((piece) => {
      if (piece.selected) {
        piece.selected = false;
      }
    })
  }
}
