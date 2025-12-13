// levels.js
export const levels = [
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