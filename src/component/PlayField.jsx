import React, { useState } from 'react'
import { selectPiece } from './pieceFunc';

class Player {
  constructor(player = 1, king = false, selected = false) {
    this.player = player;
    this.king = king;
    this.selected = selected;
  }
}
// it's not a boolean because I need it as a string for future comparison
export function WalkableBox(walkable = 'false'){
  return walkable;
}


let emptyEvenLine = [0, WalkableBox(), 0, WalkableBox(), 0, WalkableBox(), 0, WalkableBox()];
let playerOneEvenLine = [0, new Player, 0, new Player, 0, new Player, 0, new Player];
let playerTwoEvenLine = [0, new Player(2), 0, new Player(2), 0, new Player(2), 0, new Player(2)];
let emptyOddLine = [ WalkableBox(), 0,WalkableBox(), 0, WalkableBox(), 0,WalkableBox(), 0];
let playerOneOddLine = [new Player, 0, new Player, 0, new Player, 0, new Player, 0];
let playerTwoOddLine = [new Player(2), 0, new Player(2), 0, new Player(2), 0, new Player(2), 0];

window.playField = [[...playerTwoEvenLine], [...playerTwoOddLine], [...emptyEvenLine], [...emptyOddLine], [...emptyEvenLine], [...emptyOddLine], [...playerOneEvenLine], [...playerOneOddLine]];

function giveDifferentHtmlElementsDependingOnContentFromPlayField(box, index, index2, playerOneTurn, changePlayerOneTurn) {
  switch (box) {
    case 0:
      return (<section className="nonPlayableBox"></section>);
    case 'false':
    case 'true':
      return (<section data-walkable={box} className="playableBox"></section>);
    default:
      return (<section className="playableBox"> <img onClick={() => selectPiece(event, playerOneTurn, changePlayerOneTurn)} data-selected={box.selected} data-player={box.player} data-xindex={index2} data-yindex={index} className="player" /></section>)
  }
}


export default function PlayField() {
  let [isPlayerOneTurn, setPlayerOneTurn] = useState(true);

  function displayPlayField() {
    let transformedPlayfield = [[], [], [], [], [], [], [], []];
    window.playField.forEach(transformPlayFieldForHtml);

    function transformPlayFieldForHtml(line, index) {
      let lineContent = line.map((box, index2) => { return giveDifferentHtmlElementsDependingOnContentFromPlayField(box, index, index2, isPlayerOneTurn, setPlayerOneTurn) });
      transformedPlayfield[index] = <div key={index} data-linenumber={index}>{lineContent}</div>;
    }
    return transformedPlayfield;
  }

  let boxContent = displayPlayField();

  return (
    <article id="playField">
      {boxContent}
    </article>)

}
