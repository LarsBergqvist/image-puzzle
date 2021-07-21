import { gameConfigs } from '../game-configs';
import {
    SHUFFLE_TILES,
    INIT_GAME,
    SELECT_TILE,
    REVERSE_TILES,
    HIGHSCORE_LIST_LOADED,
    NAME_CHANGED,
    HIGHSCORE_LIST_SAVED,
} from './actions';
import { generateTileSet, shuffleTileSet, swapTilesInSet, allTilesAreAligned, reverseTileSet } from './tileset-functions';

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
                    gameComplete: allTilesAreAligned(newTiles),
                    tiles: newTiles
                });
            } else if (numClicks === 2) {
                const newTiles = state.tiles.map(t => t);
                if (action.id === state.selectedId) {
                    return Object.assign({}, state, {
                        selectedId: undefined,
                        numClicksWithinTurn: 0,
                        tiles: newTiles
                    });
                }
                const setWithSwappedTiles = swapTilesInSet(newTiles, state.selectedId, action.id);

                return Object.assign({}, state, {
                    selectedId: undefined,
                    numClicksWithinTurn: 0,
                    gameComplete: allTilesAreAligned(setWithSwappedTiles),
                    turnNo: state.turnNo + 1,
                    tiles: setWithSwappedTiles
                });
            } else {
                return state;
            }
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
