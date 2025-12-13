import { getSavedProgress } from './data.js';

export function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

export function updateDashboard(allLevels) {
    const solved = getSavedProgress();
    
    // Calculate stats
    let counts = { easy: 0, medium: 0, hard: 0 };
    solved.forEach(id => {
        if (id.includes('easy')) counts.easy++;
        if (id.includes('medium')) counts.medium++;
        if (id.includes('hard')) counts.hard++;
    });

    // Calculate completion rate
    const totalLevels = allLevels ? allLevels.length : 0;
    const completionRate = totalLevels > 0 ? Math.round((solved.length / totalLevels) * 100) : 0;

    // Update HTML
    document.getElementById('stat-easy').innerText = counts.easy;
    document.getElementById('stat-medium').innerText = counts.medium;
    document.getElementById('stat-hard').innerText = counts.hard;
    document.getElementById('stat-total').innerText = solved.length;
    document.getElementById('stat-completion-rate').innerText = `${completionRate}%`;
}