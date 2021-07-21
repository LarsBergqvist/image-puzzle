import { createStore } from 'redux';
import tileGame from './tile-game-reducer';
import { initGame, reverseTiles, selectTile } from './actions';
import { GameId_4x4 } from '../constants';

//
// With an unshuffled tile set, the id and position/index of a tile are identical
//
test('InitGame should create correct state', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_4x4, 1));
    const state = store.getState();
    expect(state.tiles.length).toBe(16);
    expect(state.imageNumber).toBe(1);
    expect(state.gameComplete).toBeFalsy();
});

test('Tile should be marked as selected', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_4x4, 1));

    expect(store.getState().selectedId).toBeUndefined();

    store.dispatch(selectTile(0));
    expect(store.getState().selectedId).toBe(0);
});

test('Selecting tile with id outside bounds should not affect state', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_4x4, 1));

    const startState = store.getState();

    store.dispatch(selectTile(-1));
    expect(JSON.stringify(startState) === JSON.stringify(store.getState())).toBeTruthy();

    store.dispatch(selectTile(4 * 4));
    expect(JSON.stringify(startState) === JSON.stringify(store.getState())).toBeTruthy();
});

test('Tile should be unselected if clicked twice', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_4x4, 1));
    // Use a non-random shuffle
    store.dispatch(reverseTiles());

    expect(store.getState().selectedId).toBeUndefined();

    store.dispatch(selectTile(5));
    expect(store.getState().selectedId).toBe(5);

    store.dispatch(selectTile(5));
    expect(store.getState().selectedId).toBeUndefined();
});


test('Selecting two tiles should swap their position', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_4x4, 1));

    // Use a non-random shuffle
    store.dispatch(reverseTiles());

    // In the reversed tile set, id 0 is on pos 15, id 1 is on pos 14
    store.dispatch(selectTile(0));
    store.dispatch(selectTile(1));

    expect(store.getState().tiles[15].id).toBe(1);
    expect(store.getState().tiles[14].id).toBe(0);
});

test('Should reach game complete', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_4x4, 1));

    // Use a non-random shuffle
    store.dispatch(reverseTiles());

    // Restore the reversed tiles by swapping
    // Leave the last two tiles
    for (let id = 0; id < 7; id++) {
        store.dispatch(selectTile(id));
        store.dispatch(selectTile(15 - id));
        expect(store.getState().gameComplete).toBeFalsy();
    }

    // Swapping the last two tiles should yield game complete
    store.dispatch(selectTile(7));
    store.dispatch(selectTile(8));

    expect(store.getState().gameComplete).toBeTruthy();
});
