class Player {
  constructor(player = 1, king = false) {
    this.player = player;
    this.king = king;
  }
}







let emptyEvenLine = [0, 1, 0, 1, 0, 1, 0, 1];
let playerOneEvenLine = [0, new Player, 0, new Player, 0, new Player, 0, new Player];
let playerTwoEvenLine = [0, new Player(2), 0, new Player(2), 0, new Player(2), 0, new Player(2)];
let emptyOddLine = [1, 0, 1, 0, 1, 0, 1, 0];
let playerOneOddLine = [new Player, 0, new Player, 0, new Player, 0, new Player, 0];
let playerTwoOddLine = [new Player(2), 0, new Player(2), 0, new Player(2), 0, new Player(2), 0];

window.playField = [[...playerOneEvenLine], [...playerOneOddLine], [...emptyEvenLine], [...emptyOddLine], [...emptyEvenLine], [...emptyOddLine], [...playerTwoEvenLine], [...playerTwoOddLine]];

function giveDifferentHtmlElementsDependingOnContentFromPlayField(box, index, index2) {
  switch (box) {
    case 0:
      return (<section className="nonPlayableBox"></section>);
    case 1:
      return (<section className="playableBox"></section>);
    default:
      return (<section className="playableBox"> <img onClick={selectPiece} data-player={box.player} data-xIndex={index2} data-yIndex={index} className="player" /></section>)
  }

}

function selectPiece(event) {
  let currentPiece = event.target;
  window.selectedPiece = { x: Number(currentPiece.dataset.xindex), y: Number(currentPiece.dataset.yindex) };
}

export default function PlayField() {

  function displayPlayField() {
    let transformedPlayfield = [[], [], [], [], [], [], [], []];
    window.playField.forEach(transformPlayFieldForHtml);

    function transformPlayFieldForHtml(line, index) {
      let lineContent = line.map((box, index2) => { return giveDifferentHtmlElementsDependingOnContentFromPlayField(box, index, index2) });
      transformedPlayfield[index] = <div key={index} data-lineNumber={index}>{lineContent}</div>;
    }
    return transformedPlayfield;
  }

  let boxContent = displayPlayField();

  return (
    <article id="playField">
      {boxContent}
    </article>)

}
