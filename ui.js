import { getSavedProgress, getTotalSeenCount } from './data.js';

// --- NEW EXPORT: Handles switching between Menu and Game ---
export function showScreen(screenId) {
    // 1. Hide everything marked as a "screen"
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    
    // 2. Show the specific screen requested (e.g., 'game-screen')
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
    } else {
        console.error(`Screen ID '${screenId}' not found in HTML.`);
    }
}

// --- DASHBOARD UPDATER ---
export function updateDashboard(currentLevels) {
    const solvedIds = getSavedProgress(); // Already deduplicated
    const totalSeen = getTotalSeenCount(); // The "Denominator" (Total unique puzzles ever loaded)
    
    // Ensure we're using unique counts
    const uniqueSolved = new Set(solvedIds).size;
    const uniqueSeen = totalSeen; // Already unique from getTotalSeenCount()
    
    // Debug logging for lifetime stats
    console.log('📊 Lifetime Stats Update:');
    console.log(`  - Total Solved (unique): ${uniqueSolved}`);
    console.log(`  - Total Seen (lifetime, unique): ${uniqueSeen}`);
    console.log(`  - Solved IDs:`, solvedIds);
    
    // 1. Calculate Counts (Wins by difficulty)
    let easy = 0, medium = 0, hard = 0;
    solvedIds.forEach(id => {
        // Case-insensitive check to be safe
        if (id.toLowerCase().includes('easy')) easy++;
        if (id.toLowerCase().includes('medium')) medium++;
        if (id.toLowerCase().includes('hard')) hard++;
    });

    // 2. Update the HTML numbers
    // (Ensure these IDs exist in your index.html Trophy Case)
    const elEasy = document.getElementById('stat-easy');
    const elMed = document.getElementById('stat-medium');
    const elHard = document.getElementById('stat-hard');
    const elTotal = document.getElementById('stat-total');
    const elRate = document.getElementById('stat-completion-rate');

    if (elEasy) elEasy.innerText = easy;
    if (elMed) elMed.innerText = medium;
    if (elHard) elHard.innerText = hard;
    if (elTotal) elTotal.innerText = uniqueSolved; // Use unique count

    // 3. TRUE CAREER COMPLETION RATE
    // Logic: (Total Unique Solved) / (Total Unique Puzzles Ever Seen)
    let percent = 0;
    if (uniqueSeen > 0) {
        percent = Math.round((uniqueSolved / uniqueSeen) * 100);
        console.log(`  - Completion Rate: ${uniqueSolved}/${uniqueSeen} = ${percent}%`);
    } else {
        console.log(`  - Completion Rate: Cannot calculate (no puzzles seen yet)`);
    }

    if (elRate) {
        elRate.innerText = `${percent}% Career Completion`;
    }
}