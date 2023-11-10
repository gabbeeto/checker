import { reRender } from "../main";
import { WalkableBox } from "./PlayField";
import { makeAllTheWalkableBoxesFalse } from "./pieceFunc";

export function checkifWalkable(event, isPlayerOneTurn, setPlayerOneTurn) {
  let currentBox = event.target;
  let xFromBox = Number(currentBox.dataset.xindex);
  let yFromBox = Number(currentBox.dataset.yindex);


  if (currentBox.dataset.walkable == 'true') {
    let { x: xFromPlayer, y: yFromPlayer } = window.selectedPiece;
    // transfer player one in the walkable box that's been clicked
    window.playField[yFromBox][xFromBox] = window.playField[yFromPlayer][xFromPlayer]
    window.playField[yFromBox][xFromBox].selected = false;

    makeAllTheWalkableBoxesFalse();

    // make the previous player position into a walkable box
    window.playField[yFromPlayer][xFromPlayer] = WalkableBox()

    // change player turn
    if (isPlayerOneTurn) {
      setPlayerOneTurn(false)
    }
    else {
      setPlayerOneTurn(true)
    }
  }


  else if (currentBox.dataset.walkable == 'trueAndKill') {
    let { x: xFromPlayer, y: yFromPlayer } = window.selectedPiece;


    // make the previous player position into a walkable box
    window.playField[yFromBox][xFromBox] = window.playField[yFromPlayer][xFromPlayer];
    console.log(window.playField[yFromBox][xFromBox])
    console.log(window.selectedPiece)

    window.playField[yFromBox][xFromBox].selected = false;


    let opositePlayerY;
    let opositePlayerX;
    // get the y axis of the piece from the oposite player that we're going to kill
    if (isPlayerOneTurn) {
      opositePlayerY = yFromBox + 1
    }
    else {
      opositePlayerY = yFromBox - 1
    }

    // get the x axis of the piece from the oposite player that we're going to kill
    if (xFromBox > xFromPlayer) {
      opositePlayerX = xFromPlayer + 1;
    }
    else {
      opositePlayerX = xFromPlayer - 1;
    }

    // kill the enemy
    window.playField[opositePlayerY][opositePlayerX] = WalkableBox()


    makeAllTheWalkableBoxesFalse();

    // make the previous player position into a walkable box
    window.playField[yFromPlayer][xFromPlayer] = WalkableBox()
  }

  for (let piece of window.playField[0]) {
    if (piece.player == 1) {
      piece.king = true;
    }
  }

  for (let piece of window.playField[7]) {
    if (piece.player == 2) {
      piece.king = true;
    }
  }


  reRender();

}
