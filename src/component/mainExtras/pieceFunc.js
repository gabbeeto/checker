import { reRender } from "../../main";

export function selectPiece(event, isPlayerOneTurn, changePlayerOneTurn) {
  try {
    console.log(isPlayerOneTurn);
    let currentPiece = event.target;
    if (isPlayerOneTurn && currentPiece.dataset.player == '1') {
      changePlayerOneTurn(false);
    
    }
    else if (!isPlayerOneTurn && currentPiece.dataset.player == '2') {
      changePlayerOneTurn(true);
    }
    else {
      throw new Error(`it's not player ${currentPiece.dataset.player} turn`)
    }
    let x = Number(currentPiece.dataset.xindex);
    let y = Number(currentPiece.dataset.yindex);
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
