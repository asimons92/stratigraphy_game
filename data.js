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


export function registerSeenPuzzles(levelList) {
    // 1. Get the list of everything they've EVER seen
    let seen = JSON.parse(localStorage.getItem('stratigraphy_seen_ids')) || [];
    let isChanged = false;

    // 2. Loop through the NEW levels from the sheet
    levelList.forEach(level => {
        // If we haven't seen this ID before, remember it!
        if (!seen.includes(level.id)) {
            seen.push(level.id);
            isChanged = true;
        }
    });

    // 3. Save back to storage
    if (isChanged) {
        localStorage.setItem('stratigraphy_seen_ids', JSON.stringify(seen));
    }
}

export function getTotalSeenCount() {
    const seen = JSON.parse(localStorage.getItem('stratigraphy_seen_ids')) || [];
    return seen.length;
}