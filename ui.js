// ui.js
import { getSavedProgress, getTotalSeenCount } from './data.js'; // Import helper


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

export function updateDashboard(currentLevels) {
    const solvedIds = getSavedProgress();
    const totalSeen = getTotalSeenCount(); // This will be your cumulative denominator (e.g., 50)
    
    // 1. Calculate Stats Counts
    let easy = 0, medium = 0, hard = 0;
    solvedIds.forEach(id => {
        if (id.toLowerCase().includes('easy')) easy++;
        if (id.toLowerCase().includes('medium')) medium++;
        if (id.toLowerCase().includes('hard')) hard++;
    });

    document.getElementById('stat-easy').innerText = easy;
    document.getElementById('stat-medium').innerText = medium;
    document.getElementById('stat-hard').innerText = hard;
    document.getElementById('stat-total').innerText = solvedIds.length;

    // 2. TRUE CAREER COMPLETION
    // Logic: If they have seen 0 puzzles, prevent dividing by zero.
    let percent = 0;
    if (totalSeen > 0) {
        percent = Math.round((solvedIds.length / totalSeen) * 100);
    }

    // Now it will say "100%" (3 wins / 3 seen) or "50%" (50 wins / 100 seen)
    document.getElementById('stat-completion-rate').innerText = `${percent}% Career Completion`;
}