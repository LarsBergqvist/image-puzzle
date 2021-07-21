import { gameConfigs } from '../game-configs';
import {
    HIGHSCORE_LIST_LOADED, HIGHSCORE_LIST_SAVED, INIT_GAME, NAME_CHANGED, REVERSE_TILES, SELECT_TILE, SHUFFLE_TILES
} from './actions';
import { allTilesAreAligned, generateTileSet, reverseTileSet, shuffleTileSet, swapTilesInSet, getIndexInHighScoreList } from './tileset-functions';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    turnNo: 1,
    numClicksWithinTurn: 0,
    selectedId: undefined,
    gameComplete: false,
    imageNumber: 1,
    tiles: [],
    size: undefined,  // number of rows/columns in the puzzle matrix
    gameId: undefined,
    gameName: undefined,
    highScoreList: undefined,
    highScorePosition: -1,
    userName: undefined,
    userId: undefined,
    highScoreListSaved: false
};


// The reducer for the game
// State is an object with game status and an array of tiles
// The array represents a size*size matrix with a unique 
// numerical value 0...size*size-1 per tile
// A tile is an object with these properties:
// {
//    id: number, // the number/value for the tile
//    top: number, // pixel offset for the image that is projected on the tile
//    left: number // pixel offset for the image that is projected on the tile
// }
//    
function tileGame(state = initialState, action) {
    switch (action.type) {
        case INIT_GAME: {
            const size = gameConfigs[action.gameId].size
            return Object.assign({}, initialState,
                {
                    gameId: action.gameId,
                    size,
                    gameName: gameConfigs[action.gameId].name,
                    imageNumber: action.imageNumber,
                    tiles: generateTileSet(size),
                    highScoreListId: gameConfigs[action.gameId].highscorelistid
                });
        }

        case SELECT_TILE: {
            if (state.gameComplete) {
                return state;
            }
            if (action.id < 0 || action.id > (state.size * state.size - 1)) {
                return state;
            }
            const numClicks = state.numClicksWithinTurn + 1;
            if (numClicks === 1) {
                const newTiles = state.tiles.map(t => t);
                return Object.assign({}, state, {
                    selectedId: action.id,
                    numClicksWithinTurn: numClicks,
                    gameComplete: false,
                    tiles: newTiles
                });
            }

            const newTiles = state.tiles.map(t => t);
            if (action.id === state.selectedId) {
                return Object.assign({}, state, {
                    selectedId: undefined,
                    numClicksWithinTurn: 0,
                    tiles: newTiles
                });
            }
            const setWithSwappedTiles = swapTilesInSet(newTiles, state.selectedId, action.id);
            const gameComplete = allTilesAreAligned(setWithSwappedTiles);

            if (gameComplete && state.highScoreList) {
                const newUserId = uuidv4();
                const time = Date.now();
                const idxInHighScoreList = getIndexInHighScoreList(newUserId, time, state.turnNo + 1, state.highScoreList);
                if (idxInHighScoreList > -1) {
                    // User made it into the leaderboard
                    return Object.assign({}, state, {
                        selectedId: undefined,
                        numClicksWithinTurn: 0,
                        gameComplete,
                        turnNo: state.turnNo + 1,
                        tiles: setWithSwappedTiles,
                        highScorePosition: idxInHighScoreList + 1,
                        userId: newUserId
                    });
                } else {
                    // User dit not make it into the leaderboard
                    return Object.assign({}, state, {
                        selectedId: undefined,
                        numClicksWithinTurn: 0,
                        gameComplete,
                        turnNo: state.turnNo + 1,
                        tiles: setWithSwappedTiles,
                        highScorePosition: idxInHighScoreList + 1
                    });
                }
            }
            return Object.assign({}, state, {
                selectedId: undefined,
                numClicksWithinTurn: 0,
                gameComplete,
                turnNo: state.turnNo + 1,
                tiles: setWithSwappedTiles
            });
        }

        case SHUFFLE_TILES: {
            const newTiles = shuffleTileSet(state.tiles);
            return Object.assign({}, state, { tiles: newTiles });
        }

        case REVERSE_TILES: {
            const newTiles = reverseTileSet(state.tiles);
            return Object.assign({}, state, { tiles: newTiles });
        }

        case HIGHSCORE_LIST_LOADED: {
            return Object.assign({}, state, {
                highScoreList: action.highScoreList
            });
        }
        case NAME_CHANGED: {
            return Object.assign({}, state, {
                userName: action.name
            });
        }
        case HIGHSCORE_LIST_SAVED: {
            return Object.assign({}, state, {
                highScoreListSaved: true,
                highScoreList: action.highScoreList
            });
        }
        default:
            return state;
    }
}

export default tileGame;
