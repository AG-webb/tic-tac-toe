import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

class Board extends React.Component {

    renderSquare(i) {
        let isWinnerSquare = false;
        if(this.props.winnerSquares) {
            this.props.winnerSquares.map(squareNumber => {
                if(squareNumber === i) {
                    isWinnerSquare = true;
                }
                return null;
            });
        }

        return(
            <Square
                isWinnerSquare={isWinnerSquare}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="board">
                <div className="board__row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board__row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board__row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;