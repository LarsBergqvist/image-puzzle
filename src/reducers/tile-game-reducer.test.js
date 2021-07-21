import { INIT_GAME, SELECT_TILE, REVERSE_TILES } from './actions';
import deepFreeze from 'deep-freeze';
import tileGame from './tile-game-reducer';
import { GameId_4x4 } from '../constants';

test('Reducers should not mutate data', () => {
    const initialState = {
        turnNo: 1,
        numClicksWithinTurn: 0,
        selectedId: undefined,
        gameComplete: false,
        imageNumber: 1,
        tiles: [],
        size: undefined,
        gameId: undefined,
        gameName: undefined,
        highScoreList: undefined,
        highScorePosition: -1,
        userName: undefined,
        userId: undefined,
        highScoreListSaved: false
    };
    deepFreeze([initialState]);
    const action1 = { type: INIT_GAME, gameId: GameId_4x4, imageNumber: 1 };
    const newState1 = tileGame(initialState, action1);
    expect(newState1.size).toBe(4);
    expect(newState1.tiles[0].id).toBe(0);

    //
    // Reverse the tile set so that we
    // have something predictable to work on
    //
    deepFreeze([newState1]);
    const action2 = { type: REVERSE_TILES };
    const newState2 = tileGame(newState1, action2);
    // The first tile should now be id 15
    expect(newState2.tiles[0].id).toBe(15);

    //
    // Select the first tile (id = 15)
    //
    deepFreeze([newState2]);
    const action3 = { type: SELECT_TILE, id: 15 };
    const newState3 = tileGame(newState2, action3);
    expect(newState3.tiles[0].id).toBe(15);
    expect(newState3.selectedId).toBe(15);

    //
    // Select the second tile (id = 14)
    // This action should swap places with the
    // previously selected tile
    //
    deepFreeze([newState3]);
    const action4 = { type: SELECT_TILE, id: 14 };
    const newState4 = tileGame(newState3, action4);
    expect(newState4.tiles[0].id).toBe(14);
    expect(newState4.tiles[1].id).toBe(15);
});
