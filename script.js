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
icon: `assets/genshin_images/${c.icon}`   })),

    ...hsrCharacters.map(c => ({
        ...c,
        game: "Honkai: Star Rail",
icon: `assets/hsr_images/${c.icon}`   })),

    ...zzzCharacters.map(c => ({
        ...c,
        game: "Zenless Zone Zero",
icon: `assets/zzz_images/${c.icon}`   }))
];

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();


const birthdayToday = allCharacters.filter(c => {
    if (!c.birthday || c.birthday === "unknown") return false;

    const [month, day] = c.birthday.split("-").map(Number);

    return month === currentMonth && day === currentDay;
});
console.log("Today's birthdays:", birthdayToday);

const birthdayMessage = document.getElementById("birthday-message");

if (birthdayToday.length > 0) {
    birthdayMessage.innerHTML = `🎉 Happy Birthday, ${birthdayToday.map(c => c.name).join(", ")}! 🎂`;
} else {
    birthdayMessage.innerHTML = "";
}

function getBirthdayValue(date) {
    if (!date || date.toLowerCase() === "unknown") {
        return 9999;
    }

    const [month, day] = date.split("-").map(Number);

    let value = month * 100 + day;

    const todayValue = currentMonth * 100 + currentDay;

    // Already passed this year -> push to next year
    if (value < todayValue) {
        value += 1200;
    }

    return value;
}

allCharacters.sort((a, b) => {
    return getBirthdayValue(a.birthday) - getBirthdayValue(b.birthday);
});
const container = document.getElementById("birthday-container");

// Render cards
allCharacters.forEach(character => {
    const isBirthday = birthdayToday.some(c => c.name === character.name);
    container.innerHTML += `
        <div class="card ${character.element ? character.element.toLowerCase() : ''} ${isBirthday ? 'birthday-card' : ''}">
            <img src="${character.icon}" class="character-icon" alt="${character.name}">
            
            <h3>${character.name}</h3>
            <p>${character.game}</p>
            <p>🎂 ${formatBirthday(character.birthday)}</p>
        </div>
    `;
});