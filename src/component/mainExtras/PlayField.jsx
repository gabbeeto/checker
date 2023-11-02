class Player{
constructor(player = 1,king = false){
this.player = player;
this.king = king;
}
}







let emptyEvenLine = [0,1,0,1,0,1,0,1];
let playerOneEvenLine = [0,new Player,0,new Player,0,new Player,0,new Player];
let playerTwoEvenLine = [0,new  Player(2),0,new Player(2),0,new Player(2),0,new Player(2)];
let emptyOddLine = [1,0,1,0,1,0,1,0];
let playerOneOddLine = [new Player,0,new Player,0,new Player,0,new Player,0];
let playerTwoOddLine = [new Player(2),0,new Player(2),0,new Player(2),0,new Player(2),0];

window.playField = [[...playerOneEvenLine],[...playerOneOddLine],[...emptyEvenLine],[...emptyOddLine],[...emptyEvenLine],[...emptyOddLine],[...playerTwoEvenLine],[...playerTwoOddLine]];

function giveDifferentContentDependingOnBox(box){
	switch(box){
		case 0:
			return (<section className="nonPlayableBox"></section>);
		case 1:
			return (<section className="playableBox"></section>);
		default:
			return (<section className="playableBox"> <img data-player={box.player} className="player"/></section>)
	}

}


export default function PlayField(){

function displayPlayField(){
let transformedPlayfield = [[],[],[],[],[],[],[],[]];
window.playField.forEach(transformPlayFieldForHtml);

function transformPlayFieldForHtml(line,index){
let lineContent = line.map(box => {return giveDifferentContentDependingOnBox(box)});
transformedPlayfield[index] = <div key={index} data-lineNumber={index}>{lineContent}</div>;
}
return transformedPlayfield;
}

let boxContent = displayPlayField();

return (
<article>
{boxContent}
</article>)

}
