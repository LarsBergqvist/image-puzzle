
import shuffle from 'shuffle-array';

export function generateTileSet(size) {
    let newTilesArray = [];
    for (let i = 0; i < size * size; i++) {
        let newTile = {
            id: i,
            top: -(Math.floor(i / size)) * 100,
            left: i < size ? -i * 100 : -(i % size) * 100,
        };
        newTilesArray.push(newTile);
    }
    return newTilesArray;
}

export function reverseTileSet(tiles) {
    return [...tiles].reverse();
}

export function shuffleTileSet(tiles) {
    return shuffle([...tiles]);
}

export function swapTilesInSet(tiles, sourceId, destId) {
    const copy = [...tiles];
    let sourceIdx = copy.findIndex(t => t.id === sourceId);
    let source = copy[sourceIdx];
    let destIdx = copy.findIndex(t => t.id === destId);
    let dest = Object.assign({}, copy[destIdx]);
    copy[destIdx] = source;
    copy[sourceIdx] = dest;
    return copy;
}

export function allTilesAreAligned(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].id !== i) {
            return false;
        }
    }
    return true;
}

export function getIndexInHighScoreList(newUserId, userTime, score, highScoreList) {
    const resultsCopy = highScoreList.results.map(r => {
        return {
            id: r.id,
            score: r.score,
            time: isNaN(Date.parse(r.utcDateTime)) ? 0 : Date.parse(r.utcDateTime)
        }
    });
    resultsCopy.push({
        id: newUserId,
        score,
        time: userTime
    });
    resultsCopy.sort((a, b) => (a.score - b.score) || (b.time - a.time));

    let idxInHighScoreList = resultsCopy.findIndex(r => r.id === newUserId);
    if (idxInHighScoreList > -1 && (idxInHighScoreList + 1 <= highScoreList.maxSize)) {
        return idxInHighScoreList;
    } else {
        return -1;
    }
}
