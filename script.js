function formatBirthday(date) {
    if (!date || date.toLowerCase() === "unknown") return "Unknown";

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [month, day] = date.split("-");

    if (!month || !day) return date;

    return `${months[Number(month) - 1]} ${Number(day)}`;
}

// Combine all character datasets
const allCharacters = [
    ...genshinCharacters.map(c => ({
        ...c,
        game: "Genshin Impact",
icon: `fandom_icons/${c.icon}.webp`    })),

    ...hsrCharacters.map(c => ({
        ...c,
        game: "Honkai: Star Rail",
icon: `fandom_icons/${c.icon}.webp`    })),

    ...zzzCharacters.map(c => ({
        ...c,
        game: "Zenless Zone Zero",
icon: `fandom_icons/${c.icon}.webp`    }))
];

// Sort by birthday (month-day string)
allCharacters.sort((a, b) => {
    if (a.birthday === "unknown") return 1;
    if (b.birthday === "unknown") return -1;
    return a.birthday.localeCompare(b.birthday);
});

const container = document.getElementById("birthday-container");

// Render cards
allCharacters.forEach(character => {
    container.innerHTML += `
        <div class="card ${character.element ? character.element.toLowerCase() : ''}">
            <img src="${character.icon}" class="character-icon" alt="${character.name}">
            
            <h3>${character.name}</h3>
            <p>${character.game}</p>
            <p>🎂 ${formatBirthday(character.birthday)}</p>
        </div>
    `;
});