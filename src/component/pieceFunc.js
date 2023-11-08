import { reRender } from "../main";
import { WalkableBox } from "./PlayField";

export function selectPiece(event, isPlayerOneTurn, changePlayerOneTurn) {
  try {
    console.log(isPlayerOneTurn);
    let currentPiece = event.target;
    let x = Number(currentPiece.dataset.xindex);
    let y = Number(currentPiece.dataset.yindex);
    if (isPlayerOneTurn && currentPiece.dataset.player == '1') {
      // make this a function later on so we can determinate whether something is walkable or not
      let yOrientation = y;
      if (isPlayerOneTurn) {
        yOrientation = y - 1;
      }
      else {
        yOrientation = y + 1;
      }

      if (x + 1 < 8) {
        window.playField[yOrientation][x + 1] = WalkableBox('true');
      }
      if (x - 1 >= 0) {
        window.playField[yOrientation][x - 1] = WalkableBox('true');
      }
      // you have to turn other walkable boxes into false right here and remember to make player 2 turn after the player clicks on a walkable box

    }
    else if (!isPlayerOneTurn && currentPiece.dataset.player == '2') {
      // changePlayerOneTurn(true);
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

function unSelectRemainingPieces() {
  for (let line of window.playField) {
    line.map((piece) => {
      if (piece.selected) {
        piece.selected = false;
      }
    })
  }
}
