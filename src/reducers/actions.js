export const INIT_GAME = 'INIT_GAME';
export const SHUFFLE_TILES = 'SHUFFLE_TILES';
export const REVERSE_TILES = 'REVERSE_TILES';
export const SELECT_TILE = 'SELECT_TILE';
export const HIGHSCORE_LIST_LOADED = 'HIGHSCORE_LIST_LOADED';
export const NAME_CHANGED = 'NAME_CHANGED';
export const HIGHSCORE_LIST_SAVED = 'HIGHSCORE_LIST_SAVED';

export function initGame(gameId, imageNumber) {
    return { type: INIT_GAME, gameId, imageNumber };
}

export function selectTile(id) {
    return { type: SELECT_TILE, id };
}

export function shuffleTiles() {
    return {
        type: SHUFFLE_TILES
    };
}

export function reverseTiles() {
    return {
        type: REVERSE_TILES
    };
}

export function highScoreListLoaded(highScoreList) {
    return { type: HIGHSCORE_LIST_LOADED, highScoreList };
}

export function nameChanged(name) {
    return { type: NAME_CHANGED, name };
}

export function highScoreListSaved(highScoreList) {
    return { type: HIGHSCORE_LIST_SAVED, highScoreList };
}