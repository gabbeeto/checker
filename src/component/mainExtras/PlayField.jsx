class Player{
constructor(king = false){
this.king = king;
}
}

class PlayerOne extends Player{
constructor(king = false){
super(king)
}
}


class PlayerTwo extends Player{
constructor(king = false){
super(king)
}
}




let emptyEvenLine = [0,1,0,1,0,1,0,1];
let playerOneEvenLine = [0,new PlayerOne,0,new PlayerOne,0,new PlayerOne,0,new PlayerOne];
let playerTwoEvenLine = [0,new  PlayerTwo,0,new PlayerTwo,0,new PlayerTwo,0,new PlayerTwo];
let emptyOddLine = [1,0,1,0,1,0,1,0];
let playerOneOddLine = [new PlayerOne,0,new PlayerOne,0,new PlayerOne,0,new PlayerOne,0];
let playerTwoOddLine = [new PlayerTwo,0,new PlayerTwo,0,new PlayerTwo,0,new PlayerTwo,0];

window.playField = [[...playerOneEvenLine],[...playerOneOddLine],[...evenLine],[...oddLine],[...evenLine],[...oddLine],[...playerTwoEvenLine],[...playerTwoOddLine]];


export default function PlayField(){

	return  (

<article>
		</article>
	)

}
