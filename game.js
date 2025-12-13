// game.js
import { levels } from './levels.js';
import { saveWin, getSavedProgress } from './data.js';
import { updateDashboard, showScreen } from './ui.js';

let currentLevelIndex = 0;

// --- CORE GAME FUNCTIONS ---

function loadLevel(index) {
    const levelData = levels[index];
    currentLevelIndex = index;
    
    // Update Image
    const imgContainer = document.getElementById('game-container');
    imgContainer.innerHTML = `<img src="images/${levelData.image}" alt="Level ${levelData.id} Image">`;

    // Update List
    const listContainer = document.getElementById('layer-list');
    listContainer.innerHTML = '';

    levelData.items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item.text;
        li.className = 'layer-card';
        li.setAttribute('data-id', item.id);
        listContainer.appendChild(li);
    });
}

// --- EVENT LISTENERS ---

// 1. Difficulty Buttons
document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', () => {
        const levelIndex = button.getAttribute('data-level');
        loadLevel(levelIndex);
        
        // Use your UI module to switch screens
        showScreen('game-screen');
    });
});

// 2. Back Button
document.getElementById('back-button').addEventListener('click', () => {
    showScreen('menu-screen');
    // Refresh stats when returning to menu
    updateDashboard(); 
});

// 3. Check Answer Button
document.getElementById('check-button').addEventListener('click', () => {
    const currentOrder = sortable.toArray();
    const correctOrder = levels[currentLevelIndex].correctOrder;
    
    console.log("Correct:", correctOrder);
    console.log("Yours:", currentOrder);

    if (currentOrder.join(',') === correctOrder.join(',')) {
        // Use Data module to save logic
        const isNewWin = saveWin(levels[currentLevelIndex].id);
        
        // Get fresh stats for the alert
        const totalWins = getSavedProgress().length;

        if (isNewWin) {
            alert(`Correct! That's a new solved puzzle.\nTotal Solved: ${totalWins}`);
        } else {
            alert(`Correct! (You already solved this one before).\nTotal Solved: ${totalWins}`);
        } 
        
        if(confirm('Return to menu?')) {
            document.getElementById('back-button').click();
        }
    } else { 
        alert('Sorry, try again.');
    }
});


// --- INITIALIZATION ---

// 1. Setup Sortable (Your advanced mobile config)
const layerList = document.getElementById('layer-list');
const sortable = new Sortable(layerList, {
    animation: 150,
    dataIdAttr: 'data-id',
    ghostClass: "sortable-ghost",
    forceFallback: true,
    fallbackTolerance: 0,
    touchStartThreshold: 0,
    preventOnFilter: false,
    fallbackOnBody: true, 
    swapThreshold: 0.65, 
    invertSwap: true 
});

// 2. Initial Render
updateDashboard(); // Load stats on startup