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

// --- FUNCTION: Just handles the Visuals ---
function loadLevel(index) {
    const levelData = levels[index];
    currentLevelIndex = index;
    const imgContainer = document.getElementById('game-container');
    // Ensure you have an 'images' folder or remove 'images/' if not
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
} // <--- Function ends here! Sortable logic removed from here.


const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');

document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', () =>{
        const levelIndex = button.getAttribute('data-level');
        loadLevel(levelIndex);
        menuScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    })
});

document.getElementById('back-button').addEventListener('click', () => {
    menuScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
});


const layerList = document.getElementById('layer-list');
const sortable = new Sortable(layerList, {
    animation: 150,
    dataIdAttr: 'data-id'
});

const checkButton = document.getElementById('check-button');
checkButton.addEventListener('click', () => {
    const currentOrder = sortable.toArray();
    console.log(currentOrder);
    const correctOrder = levels[currentLevelIndex].correctOrder;
    console.log(correctOrder);
    if (currentOrder.join(',') === correctOrder.join(',')) {
        alert('Congratulations! You have solved the puzzle.');
    } else {
        alert('Sorry, try again.');
    }
});