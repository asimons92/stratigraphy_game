const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTUfJsRXsM7a5CQ_-CM0zhUOxTmjnCZJu3RE_Oo_KhLndYFgHSofLd_xfmC6yIj6cFwxTu9ikU_d-eO/pub?output=csv'

export async function getLevels() {
    try{
        console.log("Fetching levels from Google Sheets...");
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("Could not load levels.", error);
        return [];
    }
}

function parseCSV(text) {
    const lines = text.split('\n');
    const levels = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].trim();
        if (!row) continue;

        // descriptions cannot have commas

        const cols = row.split(',')

        const id = cols[0].trim();
        const image = cols[1].trim();
        const correctOrder = cols[2].trim().split('|');

        const items = [];

        for (let k = 3; k < cols.length; k++) {
            const textValue = cols[k]

            if (textValue && textValue.trim() !== "") {
                const charCode = 65 + (k - 3);
                const layerID = String.fromCharCode(charCode);

                items.push({
                    id: layerID,
                    text: textValue.trim()
                })
            }
        }
        
        levels.push({
            id: id,
            image: image,
            correctOrder: correctOrder,
            items: items
        });
    }
    return levels;
}