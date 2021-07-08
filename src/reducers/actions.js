export const INIT_GAME = 'INIT_GAME';
export const SHUFFLE_TILES = 'SHUFFLE_TILES';
export const REVERSE_TILES = 'REVERSE_TILES';
export const SELECT_TILE = 'SELECT_TILE';

export function initGame(imageNumber, size) {
    return { type: INIT_GAME, imageNumber, size };
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
