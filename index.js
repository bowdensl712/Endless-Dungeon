/* HTML Elements */
const container = document.getElementById('container');
let title = document.createElement("h1");
let text1 = document.createElement("p");
let button1 = document.createElement("button");
let text2 = document.createElement("p");
let playerStats = document.createElement("p");
let enemyStats = document.createElement("p");
let button2 = document.createElement("button");
button2.setAttribute("onclick", "combat()");
button2.innerText = "Attack";
let playerDamage = document.createElement("p");
let enemyDamage = document.createElement("p");
let text3 = document.createElement("p");
let resumeButton = document.createElement("button");
resumeButton.setAttribute("onclick", "resumeTravel()");
resumeButton.innerText = "Resume Travel";

//Inventory System
let inventoryButton = document.createElement("button");
inventoryButton.setAttribute("onclick", "openInventory()");
inventoryButton.setAttribute("style", "float:right; margin-right:10px; margin-top:-26px");
inventoryButton.innerText = "Inventory";
let inventoryContainer = document.createElement("div");
inventoryContainer.setAttribute("id", "inventoryContainer");
let inventoryTitle = document.createElement("h1");
inventoryTitle.innerText = "Inventory";
let hideInventoryButton = document.createElement("button");
hideInventoryButton.setAttribute("onclick", "hideInventory()");
hideInventoryButton.setAttribute("style", "float:right; margin-right: 10px");
hideInventoryButton.innerText = "Inventory";
let itemBar = document.createElement("div");
itemBar.setAttribute("id", "itemBar")
let equipBar = document.createElement("div");
equipBar.setAttribute("id", "equipBar")

/* Game Stats */
let name;
let hp = 100;
let attackMult = 1;
let defenseMult = 1;
let roomNum = 1;
let currentEnemy;

/* Room Descriptions */
const roomType = ["dungeon", "cave"];
let roomTypeDuration = 0;
let currentRoomType;
const descOpen = ["You stand in", "You find yourself in", "This is", "You enter", "You step into", "You arrive at", "It's", "You're faced with", "You see before you"];
/* Generic Dungeon */
const dungeonAdj = ["a dank", "a dark", "a gloomy", "a moldy old", "a long unused", "a long abandoned", "a cavernous", "a surprisingly well-preserved", "an old, decaying", "a dark and gloomy", "a barren", "an unremarkable"];
const dungeonNoun = ["stone room", "chamber", "area", "crypt", "catacomb", "room"];
const dungeonExtra = ["with bloodstains on the wall, seemingly from many years ago", "with old, rusted contraptions scattered about", "with round wooden tables and chairs, arranged like a dining area", "with old rusted cages, some with bones remaining inside", "with no furnishings that you can see", "bare walls, and only bits of stone and brick littering the floor", "with torches lining the walls, illuminating the space", "with solid wooden doors lining the walls, sealed with sturdy iron locks"];

/* Cave */
const caveAdj = ["a dank", "a dark", "a gloomy", "a naturally formed", "a long unused", "an expansive", "a very dark", "a creepy", "a surprisingly beautiful", "a dark and imposing", "a narrow", "a spacious and expansive", "a cramped"];
const caveNoun = ["cave", "cave", "cave", "cave corridor", "cavern", "section of cave", "tunnel of stone", "stone cavern"];
const caveExtra = ["with the occasional sound of dripping water", "with long stalactites hanging from above", "with small stalagmites creating a bumpy texture to the stone below your feet", "with a small pool of water to one side"];


/* Enemies [Name,  HP, Attack, Defense, Description]*/
dungeonEnemies = [
    ["Frail skeleton", 40, 0.7, 0.5, "A small skeleton with thin, fragile bones. It wields a sharpened femur, and is ready to fight"], 
    ["Young goblin", 70, 1, 0.7, "A small goblin, barely past maturity. While their size is small, they wield a razor-sharp spear that's more than capable of ending a human life."]
];

caveEnemies = [
    ["Cave slime", 50, 0.4, 2.0, "A large, robust slime. It has a murky, pale color, but seems to sparkle in the light, like a glistening pool hidden deep under the earth."],
    ["Stone spider", 50, 1.5, 0.4, "A giant spider with long, spindly legs made of stone. Its venom is capable of causing immense injury and death, but it fragile limbs make it rather weak to attacks."]
]


/* Functions */

function random(x) {
    return x[Math.floor(Math.random() * x.length)];
};

function selectRoomType() {
    roomTypeDuration = Math.floor(Math.random() * 10);
    currentRoomType = random(roomType);
};

function roomDesc() {
    if (currentRoomType === "dungeon") {
        text1.innerText = random(descOpen) + ' ' + random(dungeonAdj) + ' ' + random(dungeonNoun) + ', ' + random(dungeonExtra) + '.'
    }
    else if (currentRoomType === "cave") {
        text1.innerText = random(descOpen) + ' ' + random(caveAdj) + ' ' + random(caveNoun) + ', ' + random(caveExtra) + '.'
    }
    else {console.error("roomDesc() isn't working correctly!")}
}





/* Opening Screen */

title.innerText = "Dungeon Crawler";
text1.innerText = "You are a fledgling adventurer, about to step foot into the endless dungeon of doom. \n\n You will not survive this journey, but perhaps you will find glory before your doom. \n\nAre you ready?";
button1.innerText = "I was born for this.";
button1.setAttribute('onclick', 'startGame()');
playerStats.innerText = "\nPlayer:\n" + "HP: " + hp + "\nDamage: x" + attackMult + "\nDefense: x" + defenseMult;
container.append(title, text1, button1, playerStats);
title.insertAdjacentElement("afterend", inventoryButton)





 

/* Basic Game Loop */
function startGame() {
    button1.innerText = "Continue forward";
    title.innerText = "Room " + roomNum;
    roomNum ++;
    if (roomTypeDuration < 1) {selectRoomType()};
    roomTypeDuration --;
    roomDesc();
    selectEnemy();
   
};

/* Selects an enemy based on room type*/
function selectEnemy() {
    spawnChance = Math.random();
    if (currentRoomType === "dungeon" && spawnChance > .5) {
        currentEnemy = JSON.parse(JSON.stringify(random(dungeonEnemies)));
        spawnEnemy();
    }
    else if (currentRoomType === "cave" && spawnChance > .5) {
        currentEnemy = random(caveEnemies);
        spawnEnemy();
    }
    console.log(spawnChance);
};

/* Spawns the enemy */
function spawnEnemy() {
    button1.remove();
    playerStats.insertAdjacentElement("beforebegin", text2);
    playerStats.insertAdjacentElement("beforebegin", button2);
    playerStats.insertAdjacentElement("beforebegin", enemyStats);
    text2.innerText = "\nSuddenly, you see a " + currentEnemy[0].toLowerCase() + ". \n Description:\n" + currentEnemy[4];
    enemyStats.innerText = "\n" + currentEnemy[0] + ":\n" + "HP: " + currentEnemy[1] + "\nDamage: x" + currentEnemy[2] + "\nDefense: x" + currentEnemy[3];
};



function combat() {
    /* Player Attack */
    playerAttack = Math.floor((Math.random() * 11) * attackMult / currentEnemy[3]);
    currentEnemy[1] -= playerAttack;
    if (playerAttack === 0) {
        playerDamage.innerText = "You try to attack, but it has no effect!";
    } else {
        playerDamage.innerText = "You attack, and deal " + playerAttack + " damage!";
    };
    enemyStats.innerText = "\n" + currentEnemy[0] + ":\n" + "HP: " + currentEnemy[1] + "\nDamage: x" + currentEnemy[2] + "\nDefense: x" + currentEnemy[3];
    playerStats.insertAdjacentElement("afterend", playerDamage);

    /* Enemy Attack */
    if (currentEnemy[1] <= 0) {
        text3.innerText = "\nYou defeated the " + currentEnemy[0].toLowerCase() + ".";
        playerDamage.insertAdjacentElement("afterend", text3);
        clearEnemy();
    }
    else {
        enemyAttack = Math.floor((Math.random() * 11) * currentEnemy[2] / defenseMult);
        hp -= enemyAttack;
        if (enemyAttack === 0) {
            enemyDamage.innerText = "The " + currentEnemy[0] + " attacks, but you manage to dodge it!";
        } else {
            enemyDamage.innerText = "The " + currentEnemy[0] + " attacks, and deals " + enemyAttack + " damage!";
        }
        playerDamage.insertAdjacentElement("afterend", enemyDamage);
        playerStats.innerText = "\nPlayer:\n" + "HP: " + hp + "\nDamage: x" + attackMult + "\nDefense: x" + defenseMult;
        console.log("Player attack: " + playerAttack + " Enemy Attack: " + enemyAttack + " Your Health: " + hp + " Enemy Health: " + currentEnemy[1]);
    }   
}

function clearEnemy() {
    playerDamage.remove();
    enemyDamage.remove();
    button2.remove();
    enemyStats.remove();
    text3.insertAdjacentElement("afterend", resumeButton);
}

function resumeTravel() {
    text2.remove();
    text3.remove();
    resumeButton.remove();
    text1.insertAdjacentElement("afterend", button1);
    startGame();
}


// New Inventory system

function openInventory() {
    container.remove();
    document.body.append(inventoryContainer);
    inventoryContainer.append(itemBar, equipBar);
    itemBar.append(inventoryTitle);
    equipBar.append(hideInventoryButton);
}

function hideInventory() {
    inventoryContainer.remove();
    document.body.append(container);
}