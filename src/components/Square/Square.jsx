import React from 'react';
import './Square.scss';

let Square = (props) => {
    let squareClass = "";
    if(props.isWinnerSquare) {
        squareClass = "square_winner";
    }

    return (
        <button className={`square ${squareClass}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;