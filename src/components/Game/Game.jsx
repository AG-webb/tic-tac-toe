import React from 'react';
import Board from '../Board/Board';
import './Game.scss';
import sortIcon from '../../img/order.svg';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            ascending: true,
            winnerSquares: null,
        };
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = [...current.squares];
        if(this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: [
                ...history,
                {squares: [...squares]},
            ],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winnerSquares: null,
        });
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                if(!this.state.winnerSquares) {
                    this.setState({
                        winnerSquares: [...lines[i]],
                    });
                }

                return squares[a];
            }
        }
        return null;
    }

    sortSteps = () => {
        const ascending = this.state.ascending;

        this.setState({
            ascending: !ascending,
        });
    }

    render()  {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            const desc = move ? 
            "Move to step #" + move :
            "Move to game start";

            return (
                <div className="step" key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </div>
            );
        });

        let filterStatus = "Filter Ascending";
        if(!this.state.ascending) {
            moves = [...moves.reverse()];
            filterStatus = "Filter Descending";
        }

        let status;
        if(winner) {
            status = "Winner is: " + winner;
        } else if (!winner && history.length === 10) {
            status = "WOW! The game ended in a draw!!"
        } else {
            status = `Next Player: ${this.state.xIsNext ? "X" : "O"}`;
        }

        return(
            <div className="game">
                <div className="game__status">
                    {status}
                </div>
                <div className="game__wrap">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerSquares={this.state.winnerSquares}
                    />
                    <div className="game__info">
                        <div></div>
                        <div className="steps">
                            <div className="steps__sort" onClick={() => this.sortSteps()}>
                                <img src={sortIcon} alt="sort"/>
                                <div>{filterStatus}</div>
                            </div>
                            <div className="steps__moves">
                                {moves}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Game;