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
  makeAllTheWalkableBoxesFalse()
  // change the orientation where the player moves
  let yOrientation = y;
  let currentPlayer;

  if (playerOneTurn) {
    yOrientation = y - 1;
    currentPlayer = 1;
  }
  else {
    yOrientation = y + 1;
    currentPlayer = 2;
  }

  if (x + 1 < 8) {
    searchValidBoxesToWalk(x, yOrientation, currentPlayer)
  }
  if (x - 1 >= 0) {
    searchValidBoxesToWalk(x, yOrientation, currentPlayer, true)
  }

}

function searchValidBoxesToWalk(x, yOrientation, currentPlayer, left = false) {
  alert(yOrientation);
  let movement;
  let movementWhenKilling;
  if (left == false) {
    movement = x + 1;
    movementWhenKilling = x + 2;
  }
  else {
    movement = x - 1;
    movementWhenKilling = x - 2;
  }

  switch (window.playField[yOrientation][movement]) {
    case 'false':
      window.playField[yOrientation][movement] = WalkableBox('true');
      break;
    default:
      if (window.playField[yOrientation][movement].player == 1) {
        if (currentPlayer == 2) {
          if (yOrientation != 7) {
            if (window.playField[yOrientation + 1][movementWhenKilling] == 'false') {
              window.playField[yOrientation + 1][movementWhenKilling] = WalkableBox('trueAndKill');
            }
          }
        }
      }
      else {
        if (currentPlayer == 1) {
          if (yOrientation != 0) {
            if (window.playField[yOrientation - 1][movementWhenKilling] == 'false') {
              window.playField[yOrientation - 1][movementWhenKilling] = WalkableBox('trueAndKill');
            }
          }
        }
      }
  }
}

export function makeAllTheWalkableBoxesFalse() {
  for (let index in window.playField) {
    playField[index] = playField[index].map((box) => {
      if (box == 'true' || box == 'trueAndKill') {
        box = 'false';
      }
      return box;
    })
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
