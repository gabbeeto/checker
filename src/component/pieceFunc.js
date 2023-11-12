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
  let yOrientation = y;
  let currentPlayer;
  // detect if it's king or not
  let kingMovement = false;
  if (window.playField[y][x].king == true) {
    kingMovement = true;
  }
  // change the orientation where the player moves
  if (playerOneTurn) {
    yOrientation = y - 1;
    currentPlayer = 1;
  }
  else {
    yOrientation = y + 1;
    currentPlayer = 2;
  }

  if (x + 1 < 8) {
    searchValidBoxesToWalk(x, yOrientation, currentPlayer, false, kingMovement)
  }
  if (x - 1 >= 0) {
    searchValidBoxesToWalk(x, yOrientation, currentPlayer, true, kingMovement)
  }

}

function searchValidBoxesToWalk(x, yOrientation, currentPlayer, left, kingMovement) {
  let movement;
  let movementWhenKilling;

  let action = false;
  if (yOrientation >= 0 && currentPlayer == 1) {
    action = true;
  }
  else if (yOrientation <= 7 && currentPlayer == 2) {
    action = true;
  }

  if (left == false) {
    movement = x + 1;
    movementWhenKilling = x + 2;
  }
  else {
    movement = x - 1;
    movementWhenKilling = x - 2;
  }

  if (action) {
    switch (window.playField[yOrientation][movement]) {
      case 'false':
        window.playField[yOrientation][movement] = WalkableBox('true');
        break;
      default:
        let movingAreaIsPlayer1 = window.playField[yOrientation][movement].player == 1;
        if (movingAreaIsPlayer1) {
          let isTheSecondMovingAreaAWalkableBox = window.playField[yOrientation + 1][movementWhenKilling] == 'false';

          // yOrientation can be higehr than 7(maximum size of the PlayField)
          let isYOrientationPossible = yOrientation != 7;

          // movement when killing
          // currentPlayer has to be the oposite as the moving area player
          if (currentPlayer == 2 && isYOrientationPossible && isTheSecondMovingAreaAWalkableBox) {
            window.playField[yOrientation + 1][movementWhenKilling] = WalkableBox('trueAndKill');
          }
        }
        else {
          // movingAreaIsPlayer2
          let isTheSecondMovingAreaAWalkableBox = window.playField[yOrientation - 1][movementWhenKilling] == 'false';


          // yOrientation can be lower than 0(mimimum size of the PlayField)
          let isYOrientationPossible = yOrientation != 0;

          // movement when killing
          // currentPlayer has to be the oposite as the moving area player
          if (currentPlayer == 1 && isYOrientationPossible && isTheSecondMovingAreaAWalkableBox) {
            window.playField[yOrientation - 1][movementWhenKilling] = WalkableBox('trueAndKill');
          }
        }
    }
  }
  // add these aditional walkable box if there's a king
  if (kingMovement) {
    console.log('kingMovement activated');
    // check the player to add a new yOrientation 
    let newyOrientation;
    if (currentPlayer == 2) {
      newyOrientation = yOrientation - 2;
    }
    else {
      // + 2 instead of +1 because we already decreased the y Orientation in the past
      newyOrientation = yOrientation + 2;
    }

    switch (window.playField[newyOrientation][movement]) {
      case 'false':
        window.playField[newyOrientation][movement] = WalkableBox('true');
        break;
      default:
        if (window.playField[newyOrientation][movement].player == 1) {
          if (currentPlayer == 2) {
            if (yOrientation != 7) {
              if (window.playField[newyOrientation - 1][movementWhenKilling] == 'false') {
                window.playField[newyOrientation - 1][movementWhenKilling] = WalkableBox('trueAndKill');
              }
            }
          }
        }
        else {
          if (currentPlayer == 1) {
            if (yOrientation != 0) {
              if (window.playField[newyOrientation + 1][movementWhenKilling] == 'false') {
                window.playField[newyOrientation + 1][movementWhenKilling] = WalkableBox('trueAndKill');
              }
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
