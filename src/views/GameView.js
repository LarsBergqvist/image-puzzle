import React from 'react';
import './Game.css';
import GameStatusView from './GameStatusView';
import PuzzleView from './PuzzleView';
import RestartButtonsView from './RestartButtonsView';
import GameHeaderView from './GameHeaderView';
import LeaderBoardView from './LeaderBoardView';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Game = (props) =>
    <div className='game'>
        <GameHeaderView gameName={props.gameName} />
        <GameStatusView />
        <PuzzleView />
        <RestartButtonsView />
        <LeaderBoardView highScoreList={props.highScoreList} />
    </div>

Game.propTypes = {
    gameName: PropTypes.string,
    highScoreList: PropTypes.object
};

const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        highScoreList: state.highScoreList
    }
}

const GameView = connect(
    mapStateToProps
)(Game)

export default GameView;
