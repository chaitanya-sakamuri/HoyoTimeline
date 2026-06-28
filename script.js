function formatBirthday(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [month, day] = date.split("-");

    return `${months[Number(month) - 1]} ${Number(day)}`;
}

const allCharacters = [
    ...genshinCharacters.map(character => ({
        ...character,
        game: "Genshin Impact"
    })),

    ...hsrCharacters.map(character => ({
        ...character,
        game: "Honkai: Star Rail"
    })),

    ...zzzCharacters.map(character => ({
        ...character,
        game: "Zenless Zone Zero"
    }))
];
allCharacters.sort((a, b) => a.birthday.localeCompare(b.birthday));

const container = document.getElementById("birthday-container");


allCharacters.forEach(character => {
    
    container.innerHTML += `
        <div class="card">
           <h3>${character.name}</h3>
           <p>${character.game}</p>
           <p>🎂 ${formatBirthday(character.birthday)}</p>
        </div>
    `;

});