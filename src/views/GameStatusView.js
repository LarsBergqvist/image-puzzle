import React from 'react';

function GameStatusView(props) {
    if (props.gameComplete) {
        return <>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
        </>;
    } else {
        return <>
            <div>
                Turn: <b>{props.turnNo}</b>
                <div className='game-instructions'>
                    {props.numClicksWithinTurn === 0 &&
                        <div>
                            Click on the tile that should be moved
                        </div>
                    }
                    {props.numClicksWithinTurn === 1 &&
                        <div>
                            Click on the tile that should be swapped with the first selected tile
                        </div>
                    }
                </div>
            </div>
        </>;
    }
}

export default GameStatusView;
