import {
    SHUFFLE_TILES,
    INIT_GAME,
    SELECT_TILE,
    REVERSE_TILES,
} from './actions';
import { generateTileSet, shuffleTileSet, swapTilesInSet, allTilesAreAligned, reverseTileSet } from './tileSetFunctions';

const initialState = {
    turnNo: 1,
    numClicksWithinTurn: 0,
    sourceId: undefined,
    destId: undefined,
    gameComplete: false,
    imageNumber: 1,
    tiles: [],
    size: 4  // number of rows/columns in the puzzle matrix
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
        case INIT_GAME:
            {
                return Object.assign({}, initialState,
                    {
                        imageNumber: action.imageNumber,
                        tiles: generateTileSet(action.size),
                        size: action.size
                    });
            }

        case SELECT_TILE:
            if (state.gameComplete) {
                return state;
            }
            const numClicks = state.numClicksWithinTurn + 1;

            if (numClicks === 1) {
                const newTiles = state.tiles.map((tile) => {
                    if (action.id === tile.id) {
                        return Object.assign({}, tile, { selected: true });
                    }
                    return tile;
                });

                return Object.assign({}, state, {
                    sourceId: action.id,
                    numClicksWithinTurn: numClicks,
                    gameComplete: allTilesAreAligned(newTiles),
                    tiles: newTiles
                });
            } else if (numClicks === 2) {
                const newTiles = state.tiles.map(t => {
                    t.selected = false;
                    return t;
                });
                const setWithSwappedTiles = swapTilesInSet(newTiles, state.sourceId, action.id);

                return Object.assign({}, state, {
                    destId: action.id,
                    numClicksWithinTurn: 0,
                    gameComplete: allTilesAreAligned(setWithSwappedTiles),
                    turnNo: state.turnNo + 1,
                    tiles: setWithSwappedTiles
                });
            } else {
                return state;
            }

        case SHUFFLE_TILES:
            {
                const newTiles = shuffleTileSet(state.tiles);
                return Object.assign({}, state, { tiles: newTiles });
            }

        case REVERSE_TILES:
            {
                const newTiles = reverseTileSet(state.tiles);
                return Object.assign({}, state, { tiles: newTiles });
            }

        default:
            return state;
    }
}

export default tileGame;
