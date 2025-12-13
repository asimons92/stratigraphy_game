// "Database"
const levels = [
    {
        id: "easy_121225",
        image: "puzzle_easy.png",
        correctOrder: ['A', 'E', 'D', 'C', 'B'],
        items: [
            { id: "A", text: "Layer A (Igneous Rock)" },
            { id: "B", text: "Layer B (Shale)" },
            { id: "C", text: "Layer C (Limestone)" },
            { id: "D", text: "Layer D (Sandstone)" },
            { id: "E", text: "Layer E (Sandstone)" },
        ]
    },
    {
        id: "medium_121225",
        image: "puzzle_medium.png",
        correctOrder: ['A','F','E','C','D','B'],
        items: [
            { id: "A", text: "Layer A (Quaternary Deposits)" },
            { id: "B", text: "Layer B (Limestone)" },
            { id: "C", text: "Layer C (Slate)" },
            { id: "D", text: "Layer D (Sandstone)" },
            { id: "E", text: "Layer E (Sandstone)" },
            { id: "F", text: "Layer F (Erosional Surface (Unconformity))" },
        ]
    },
    {
        id: "hard_121225",
        image: "puzzle_hard.png",
        correctOrder: ['J','A','B','C','I','H','G','D','E','F'],
        items: [
            { id: "A", text: "Layer A (Conglomerate)" },
            { id: "B", text: "Layer B (Slate)" },
            // FIX 1: Added Layer C back in so the puzzle is solvable
            { id: "C", text: "Layer C (Sandstone)" }, 
            { id: "D", text: "Layer D (Limestone)" },
            { id: "E", text: "Layer E (Limestone)" },
            { id: "F", text: "Layer F (Sandstone)" },
            { id: "G", text: "Layer G (Cross-bedded Sandstone)" },
            { id: "H", text: "Layer H (Fault)" },
            { id: "I", text: "Layer I (Disconformity)" },
            { id: "J", text: "Layer J (Fault)" },
        ]
    }
];

let currentLevelIndex = 0;

function loadLevel(index) {
    const levelData = levels[index];
    currentLevelIndex = index;
    const imgContainer = document.getElementById('game-container');
    
    // Make sure your images are actually in an 'images' folder!
    imgContainer.innerHTML = `<img src="images/${levelData.image}" alt="Level ${levelData.id} Image">`;

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

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');

// NOTE: Make sure your HTML buttons have class="difficulty-button" (we called them difficulty-btn before)
document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', () =>{
        const levelIndex = button.getAttribute('data-level');
        loadLevel(levelIndex);
        menuScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    })
});

// NOTE: Make sure your HTML button has id="back-button"
document.getElementById('back-button').addEventListener('click', () => {
    menuScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
});

const layerList = document.getElementById('layer-list');
const sortable = new Sortable(layerList, {
    animation: 150,
    dataIdAttr: 'data-id',
});

const checkButton = document.getElementById('check-button');
checkButton.addEventListener('click', () => {
    const currentOrder = sortable.toArray();
    const correctOrder = levels[currentLevelIndex].correctOrder;
    
    console.log("Correct:", correctOrder);
    console.log("Yours:", currentOrder);

    if (currentOrder.join(',') === correctOrder.join(',')) {
        const isNewWin = recordWin(levels[currentLevelIndex].id);
        updateStats();
        // FIX 2: Ensure we look up the same key name we saved to
        const totalWins = JSON.parse(localStorage.getItem('stratigraphy_solved_ids') || "[]").length;

        if (isNewWin) {
            alert(`Correct! That's a new solved puzzle.\nTotal Solved: ${totalWins}`);
        } else {
            alert(`Correct! (You already solved this one before).\nTotal Solved: ${totalWins}`);
        } 
        
        if(confirm('Return to menu?')) {
            document.getElementById('back-button').click();
        }

    } else { 
        // FIX 4: Removed the extra curly brace } that was here
        alert('Sorry, try again.');
    }
});

function recordWin(puzzleId) {
    // FIX 2: Changed 'solvedList' to 'stratigraphy_solved_ids' to match the save line
    let solvedList = JSON.parse(localStorage.getItem('stratigraphy_solved_ids')) || [];
    
    if (!solvedList.includes(puzzleId)) {
        solvedList.push(puzzleId);
        localStorage.setItem('stratigraphy_solved_ids', JSON.stringify(solvedList));
        
        // FIX 3: Fixed typo 'solvedlist' -> 'solvedList'
        console.log(`New win recorded! Total wins: ${solvedList.length}`);
        return true;
    } else {
        console.log("Already solved this puzzle.");
        return false;
    }
}

function updateStats() {
    const solvedList = JSON.parse(localStorage.getItem('stratigraphy_solved_ids')) || [];

    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;

    solvedList.forEach(id =>{
        if (id.includes('easy')) easyCount++;
        if (id.includes('medium')) mediumCount++;
        if (id.includes('hard')) hardCount++;
    });

    document.getElementById('stat-easy').textContent = easyCount;
    document.getElementById('stat-medium').textContent = mediumCount;
    document.getElementById('stat-hard').textContent = hardCount;
    document.getElementById('stat-total').textContent = solvedList.length;
    document.getElementById('stat-completion-rate').textContent = ((solvedList.length / levels.length) * 100).toFixed(0) + '%';
}

updateStats();