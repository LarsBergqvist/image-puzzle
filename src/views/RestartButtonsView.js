import React from 'react';
import { connect } from 'react-redux'
import { NumImages } from '../constants';
import { initGame, shuffleTiles } from '../reducers/actions';
import './Game.css';
import PropTypes from 'prop-types';

const RestartButtons = (props) =>
    <>
        <button className='game-button' onClick={() => props.onInitGame(4)}>Restart 4x4</button>
        <button className='game-button' onClick={() => props.onInitGame(5)}>Restart 5x5</button>
        <button className='game-button' onClick={() => props.onInitGame(6)}>Restart 6x6</button>
        <button className='game-button' onClick={() => props.onInitGame(7)}>Restart 7x7</button>
    </>;

RestartButtons.propTypes = {
    onInitGame: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: size => {
            dispatch(initGame(Math.floor(Math.random() * NumImages) + 1, size));
            dispatch(shuffleTiles())
        }
    }
}

const RestartButtonsView = connect(
    null,
    mapDispatchToProps
)(RestartButtons)

export default RestartButtonsView;
