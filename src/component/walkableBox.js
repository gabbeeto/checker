import { WalkableBox } from "./PlayField";

export function checkifWalkable(event,isPlayerOneTurn,setPlayerOneTurn) {
  let currentBox = event.target;
  let xFromBox = Number(currentBox.dataset.xindex);
  let yFromBox = Number(currentBox.dataset.yindex);
  if (currentBox.dataset.walkable == 'true') {
    
    let { x: xFromPlayer, y: yFromPlayer } = window.selectedPiece;
    // transfer player one in the walkable box that's been clicked
    window.playField[yFromBox][xFromBox] = window.playField[yFromPlayer][xFromPlayer]
    window.playField[yFromBox][xFromBox].selected = false;
    // make the previous player position into a walkable box
    window.playField[yFromPlayer][xFromPlayer] = WalkableBox()
    // change player one turn
    if(isPlayerOneTurn){
    setPlayerOneTurn(false)
    }
    else{
    setPlayerOneTurn(true)
    }
  }
}
