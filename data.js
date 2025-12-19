export function getSavedProgress() {
    try {
        const list = JSON.parse(localStorage.getItem('stratigraphy_solved_ids')) || [];
        // Deduplicate: remove any duplicates that might have been added
        const unique = [...new Set(list)];
        // If we found duplicates, clean up the storage
        if (unique.length !== list.length) {
            console.log(`🧹 Cleaned up duplicates: ${list.length} → ${unique.length} solved puzzles`);
            localStorage.setItem('stratigraphy_solved_ids', JSON.stringify(unique));
        }
        return unique;
    } catch (e) {
        return [];
    }
}

export function saveWin(puzzleId) {
    const list = getSavedProgress();
    // Use Set to ensure uniqueness, then convert back to array
    const uniqueSet = new Set(list);
    const beforeSize = uniqueSet.size;
    uniqueSet.add(puzzleId);
    const afterSize = uniqueSet.size;
    
    // Save the deduplicated list
    const uniqueList = Array.from(uniqueSet);
    localStorage.setItem('stratigraphy_solved_ids', JSON.stringify(uniqueList));
    
    return afterSize > beforeSize; // Returns true if it was a new win
}


export function registerSeenPuzzles(levelList) {
    // 1. Get the list of everything they've EVER seen (deduplicated)
    let seen = JSON.parse(localStorage.getItem('stratigraphy_seen_ids')) || [];
    // Deduplicate existing data
    let seenSet = new Set(seen);
    const initialCount = seenSet.size;
    let isChanged = false;

    // 2. Loop through the NEW levels from the sheet
    levelList.forEach(level => {
        // Skip invalid IDs (empty, null, undefined, or whitespace-only)
        if (!level.id || level.id.trim() === '') {
            return;
        }
        // If we haven't seen this ID before, remember it!
        if (!seenSet.has(level.id)) {
            seenSet.add(level.id);
            isChanged = true;
            console.log(`📝 New puzzle registered: ${level.id}`);
        }
    });

    // 3. Save back to storage (as array, deduplicated)
    if (isChanged || seenSet.size !== seen.length) {
        const uniqueSeen = Array.from(seenSet);
        localStorage.setItem('stratigraphy_seen_ids', JSON.stringify(uniqueSeen));
        console.log(`💾 Lifetime seen count updated: ${initialCount} → ${uniqueSeen.length}`);
    } else {
        console.log(`ℹ️  All ${levelList.length} puzzles already registered (lifetime total: ${seenSet.size})`);
    }
}

export function getTotalSeenCount() {
    try {
        const seen = JSON.parse(localStorage.getItem('stratigraphy_seen_ids')) || [];
        // Return unique count to handle any duplicates
        return new Set(seen).size;
    } catch (e) {
        return 0;
    }
}