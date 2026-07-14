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


const gameData = {
    genshin: {
        characters: genshinCharacters.map(c => ({
            ...c,
            game: "Genshin Impact",
            icon: `assets/genshin_images/${c.icon}`
        })),
        background: "assets/backgrounds/genshin.webp"
    },

    hsr: {
        characters: hsrCharacters.map(c => ({
            ...c,
            game: "Honkai: Star Rail",
            icon: `assets/hsr_images/${c.icon}`
        })),
        background: "assets/backgrounds/hsr.webp"
    },

    zzz: {
        characters: zzzCharacters.map(c => ({
            ...c,
            game: "Zenless Zone Zero",
            icon: `assets/zzz_images/${c.icon}`
        })),
        background: "assets/backgrounds/zzz.webp"
    }
};
const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();




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
const splashFolder = {
    "Genshin Impact": "genshin_splash",
    "Zenless Zone Zero": "zzz_splash"
};

function renderCharacters(characters) {

    const container = document.getElementById("birthday-container");
    container.innerHTML = "";

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const birthdayToday = characters.filter(c => {

        if (!c.birthday || c.birthday === "unknown")
            return false;

        const [month, day] = c.birthday.split("-").map(Number);

        return month === currentMonth &&
               day === currentDay;
    });

    characters.sort((a,b)=>
        getBirthdayValue(a.birthday)-getBirthdayValue(b.birthday)
    );

    characters.forEach(character=>{

        const isBirthday =
            birthdayToday.some(c=>c.name===character.name);

        container.innerHTML +=
`
            <div class="card ${character.element.toLowerCase().replaceAll(" ","-")}
            ${isBirthday ? "birthday-card" : ""}"
            style="--splash:url('assets/${splashFolder[character.game]}/${character.name.replaceAll(" ","_")}.webp')">

            <div class="splash ${character.game === "Zenless Zone Zero" ? "zzz-splash" : "genshin-splash"}"></div>

            <img src="${character.icon}"
            class="character-icon">

            <div class="card-info">

            <h3>${character.name}</h3>

            <p>${character.game}</p>

            <p>🎂 ${formatBirthday(character.birthday)}</p>

            </div>

            </div>
            `;
    });

    const birthdayMessage =
        document.getElementById("birthday-message");

    if(birthdayToday.length){

        birthdayMessage.innerHTML=
        `🎉 Happy Birthday, ${birthdayToday.map(c=>c.name).join(", ")}! 🎂`;

    }else{

        birthdayMessage.innerHTML="";
    }
}



document.querySelectorAll(".game-tab").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".game-tab")
            .forEach(b => b.classList.remove("active"));

        button.classList.add("active");

        const game = button.dataset.game;

        const selectedGame = gameData[game];

        renderCharacters(selectedGame.characters);

        document.body.style.backgroundImage =
            `url(${selectedGame.background})`;

        // Change background
        document.body.style.backgroundImage = `
            linear-gradient(
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.45)
            ),
            url(${selectedGame.background})
            `;

    });

});

renderCharacters(gameData.genshin.characters);

const defaultGame = gameData.genshin;

renderCharacters(defaultGame.characters);

document.body.style.backgroundImage = `
linear-gradient(
    rgba(0,0,0,0.45),
    rgba(0,0,0,0.45)
),
url(${defaultGame.background})
`;