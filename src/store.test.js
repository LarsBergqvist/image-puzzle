import { createStore } from 'redux'
import tileGame from './reducers'
import { initGame, reverseTiles, selectTile } from './actions';

//
// With an unshuffled tile set, the id and position of a tile are identical
//
test('InitGame should create correct state', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(1, 4));
    const state = store.getState();
    expect(state.tiles.length).toBe(16);
    expect(state.imageNumber).toBe(1);
    expect(state.gameComplete).toBeFalsy();
});

test('Tile should be marked as selected', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(1, 3));

    expect(store.getState().tiles[0].selected).toBeFalsy();

    store.dispatch(selectTile(0));
    expect(store.getState().tiles[0].selected).toBeTruthy();
});

test('Selecting two tiles should swap their position', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(1, 4));

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
    store.dispatch(initGame(1, 4));

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
