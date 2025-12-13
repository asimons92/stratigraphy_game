export function getSavedProgress() {
    try {
        return JSON.parse(localStorage.getItem('stratigraphy_solved_ids')) || [];
    } catch (e) {
        return [];
    }
}

export function saveWin(puzzleId) {
    const list = getSavedProgress();
    if (!list.includes(puzzleId)) {
        list.push(puzzleId);
        localStorage.setItem('stratigraphy_solved_ids', JSON.stringify(list));
        return true; // New win
    }
    return false; // Already solved
}