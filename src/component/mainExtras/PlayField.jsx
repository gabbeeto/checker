import ReactDOM from 'react-dom/client'
import React from 'react'
import { reRender } from '../../main';

class Player {
  constructor(player = 1, king = false, selected = false) {
    this.player = player;
    this.king = king;
    this.selected = selected;
  }
}







let emptyEvenLine = [0, 1, 0, 1, 0, 1, 0, 1];
let playerOneEvenLine = [0, new Player, 0, new Player, 0, new Player, 0, new Player];
let playerTwoEvenLine = [0, new Player(2), 0, new Player(2), 0, new Player(2), 0, new Player(2)];
let emptyOddLine = [1, 0, 1, 0, 1, 0, 1, 0];
let playerOneOddLine = [new Player, 0, new Player, 0, new Player, 0, new Player, 0];
let playerTwoOddLine = [new Player(2), 0, new Player(2), 0, new Player(2), 0, new Player(2), 0];

window.playField = [[...playerTwoEvenLine], [...playerTwoOddLine] , [...emptyEvenLine], [...emptyOddLine], [...emptyEvenLine], [...emptyOddLine] ,[...playerOneEvenLine], [...playerOneOddLine]];

function giveDifferentHtmlElementsDependingOnContentFromPlayField(box, index, index2) {
  switch (box) {
    case 0:
      return (<section className="nonPlayableBox"></section>);
    case 1:
      return (<section className="playableBox"></section>);
    default:
      return (<section className="playableBox"> <img onClick={selectPiece} data-selected={box.selected} data-player={box.player} data-xindex={index2} data-yindex={index} className="player" /></section>)
  }
}

function selectPiece(event) {
  let currentPiece = event.target;
  let x = Number(currentPiece.dataset.xindex);
  let y = Number(currentPiece.dataset.yindex);
  window.selectedPiece = { x, y };
  window.playField[y][x].selected = true;
  reRender()
}

export default function PlayField() {

  function displayPlayField() {
    let transformedPlayfield = [[], [], [], [], [], [], [], []];
    window.playField.forEach(transformPlayFieldForHtml);

    function transformPlayFieldForHtml(line, index) {
      let lineContent = line.map((box, index2) => { return giveDifferentHtmlElementsDependingOnContentFromPlayField(box, index, index2) });
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
