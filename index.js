/* HTML Elements */
const container = document.getElementById('container');
let title = document.createElement("h1");
let roomDescription = document.createElement("p");
let playButton = document.createElement("button");
let enemyDescription = document.createElement("p");
let playerStats = document.createElement("p");
let enemyStats = document.createElement("p");
let attackButton = document.createElement("button");
attackButton.setAttribute("onclick", "combat()");
attackButton.innerText = "Attack";
let playerDamage = document.createElement("p");
let enemyDamage = document.createElement("p");
let victoryText = document.createElement("p");
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
let hideInventoryButton = document.createElement("button");
hideInventoryButton.setAttribute("onclick", "hideInventory()");
hideInventoryButton.setAttribute("style", "float:right; margin-right: 10px");
hideInventoryButton.innerText = "Inventory";
let itemBar = document.createElement("div");
itemBar.setAttribute("id", "itemBar");
let equipBar = document.createElement("div");
equipBar.setAttribute("id", "equipBar");
let inventoryTitle = document.createElement("h1"); //Inventory
inventoryTitle.innerText = "Inventory";
let inventoryContents = document.createElement("ul");
let equipmentTitle = document.createElement("h1"); //Equipment (Current weapon, armor, etc.)
equipmentTitle.innerText = "Equipment";
let wornHelmet = document.createElement("p"); 
wornHelmet.setAttribute("class", "equipment");
let wornChest = document.createElement("p");
wornChest.setAttribute("class", "equipment");
let wornArms = document.createElement("p");
wornArms.setAttribute("class", "equipment");
let wornLegs = document.createElement("p");
wornLegs.setAttribute("class", "equipment");
let wornAccessory = document.createElement("p");
wornAccessory.setAttribute("class", "equipment");
let wornWeapon = document.createElement("p");
wornWeapon.setAttribute("class", "equipment");

/* Game Stats */
let name;
let hp = 100;
let attackMult = 1;
let defenseMult = 1;
let roomNum = 1;
let currentEnemy;
let inventory = [["Katana", 1.8, 1, 0, "A simple blade with a slight curve."], ["Katana", 1.8, 1, 0, "A simple blade with a slight curve."], ["Katana", 1.8, 1, 0, "A simple blade with a slight curve."], ["Katana", 1.8, 1, 0, "A simple blade with a slight curve."]];
//TODO: Replace filler inventory with a proper management system.

//Equip Menu
let equippedHelmet = [];
let equippedChest = [];
let equippedArms = [];
let equippedLegs = [];
let equippedAccessory = [];
let equippedWeapon = [];



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


//Weapons [Name, attackMult, defenseMult, Description]
weaponList = [
    ["Rusty sword", 1.1, 1, 0, "A rusty old sword. In its current condition, it serves little purpose."], 
    ["Iron sword", 1.5, 1, 0, "A typical iron sword. Somewhat worn, but still sharp enough to cut"], 
    ["Flail", 1.8, 1, 0, "A heavy lump of iron, attached to a stick by a chain."], 
    ["Katana", 1.8, 1, 0, "A simple blade with a slight curve."], 
    ["Iron glaive", 2.5, 1, 0, "A long pole with a large, crescent-shaped blade on the end."], 
    ["Goblin dagger", 1.6, 1, 0, "A small, shoddily crafted dagger. Nonetheless, it has been sharpened to a razor edge, and the tip is slick with lethal venom"], 
    ["Battle axe", 1.8, 1, 0, "A two-handed axe with a large iron head, covered in dark stains."], 
    ["Rapier", 1.6, 1, 0, "A long pointed blade. Light and easy to wield with deadly efficiency."], 
    ["Wooden staff", 1, 1.3, 0, "A long wooden pole. Not particularly good in offense, but surprisingly good at defense."], 
    ["Noble sword", 1.7, 1, 0, "A finely crafted blade, with ornate designs and a deadly edge."]
];

//Armors [Name, attackMult, defenseMult, armorType, desc]
// Item Types- 0: weapon, 1: Helmet, 2: Chest, 3: Arms, 4: Legs, 5: Accessory 
armorList = [
    ["Iron helmet", 1, 1.3, 1, "A simple iron helmet. Sturdy enough."], 
    ["Fancy helmet", 1, 1.6, 1, "An ornate helmet. Below the decorations and engravings, it provides ample protection."],
    ["Red bandana", 1, 1, 1, "A square piece of red cloth. Provides no meaningful protection, but the pop of color compliments your outfit."],
    ["Horned helmet", 1.1, 1.3, 1, "An iron helmet, with two large goat horns attached at each temple."],
    ["Iron chestplate", 1, 1.2, 2,"A sturdy iron chestplate. A simple design, but it gets the job done."], 
    ["Noble's chestplate", 1, 1.3, 2,"A finely crafted chestplate, decorated with ornate floral designs."], 
    ["Goblin chestplate", 1.3, 1.1, 2,"Shabby salvaged chestplate. It's too small to wear comfortably and doesn't protect much, but it's strapped with vials of poison that may come in handy..."], 
    ["Plate mail", 0.8, 1.6, 2,"A tremendously sturdy chestplate, providing near-complete protection against damage, at the expense of mobility."], 
    ["Spiked iron chestplate", 1.2, 1.2, 2,"An iron chestplate, covered in sharp spikes."],
    ["Cloth gambeson", 1, 1.1, 2, "A thick cloth gambeson, providing some degree of protection against strikes, cuts and stabs."]
    ["Leather gloves", 1, 1.1, 3, "Gloves of thick cowhide."],
    ["Iron gauntlets", 1, 1.3, 3, "Gauntlets of iron, lined with leather."],
    ["Ceremonial gloves", 1.2, 1.0, 3, "Long gloves of a silky, smooth material. While heavenly soft to the touch, it also gives a surprising amount of grip to your hands."],
    ["Cloth pants", 1, 1.1, 4, "Simple cloth pants. The dye has faded after many washes, and there are a few stains and tears at the fringes."],
    ["Iron leggings", 1, 1.3, 4, "Plates of iron to protect your legs."],
    ["Sapphire necklace", 1, 1, 5, "A gold necklace, with a striking sapphire stone at its center."],
    ["Silver chain", 1, 1, 5, "A simple silver chain. Can be worn as a sign of status for a lower-class citizen."],
    ["Emblem ring", 1, 1, 5, "A golden signet ring, emblazoned with the family crest of a house you're unfamiliar with."]

];


/* Item Ideas-
Beer- Turns all text to italics/changes color for # turns





*/




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
        roomDescription.innerText = random(descOpen) + ' ' + random(dungeonAdj) + ' ' + random(dungeonNoun) + ', ' + random(dungeonExtra) + '.'
    }
    else if (currentRoomType === "cave") {
        roomDescription.innerText = random(descOpen) + ' ' + random(caveAdj) + ' ' + random(caveNoun) + ', ' + random(caveExtra) + '.'
    }
    else {console.error("roomDesc() isn't working correctly!")}
}





/* Opening Screen */

title.innerText = "Dungeon Crawler";
roomDescription.innerText = "You are a fledgling adventurer, about to step foot into the endless dungeon of doom. \n\n You will not survive this journey, but perhaps you will find glory before your doom. \n\nAre you ready?";
playButton.innerText = "I was born for this.";
playButton.setAttribute('onclick', 'startGame()');
playerStats.innerText = "\nPlayer:\n" + "HP: " + hp + "\nDamage: x" + attackMult + "\nDefense: x" + defenseMult;
container.append(title, roomDescription, playButton, playerStats);
title.insertAdjacentElement("afterend", inventoryButton)





 

/* Basic Game Loop */
function startGame() {
    playButton.innerText = "Continue forward";
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
    playButton.remove();
    playerStats.insertAdjacentElement("beforebegin", enemyDescription);
    playerStats.insertAdjacentElement("beforebegin", attackButton);
    playerStats.insertAdjacentElement("beforebegin", enemyStats);
    enemyDescription.innerText = "\nSuddenly, you see a " + currentEnemy[0].toLowerCase() + ". \n Description:\n" + currentEnemy[4];
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
        victoryText.innerText = "\nYou defeated the " + currentEnemy[0].toLowerCase() + ".";
        playerDamage.insertAdjacentElement("afterend", victoryText);
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
    attackButton.remove();
    enemyStats.remove();
    victoryText.insertAdjacentElement("afterend", resumeButton);
}

function resumeTravel() {
    enemyDescription.remove();
    victoryText.remove();
    resumeButton.remove();
    roomDescription.insertAdjacentElement("afterend", playButton);
    startGame();
}


// New Inventory system
function equipItem(element) {
    itemData = element.getAttribute("data-item");
};


function openInventory() {
    container.remove();
    document.body.append(inventoryContainer);
    inventoryContainer.append(itemBar, equipBar);
    inventory.forEach((element) => {
        let li = document.createElement("li");
        li.textContent = element[0];
        li.setAttribute("onclick", "equipItem(this)"); //TODO: Make equipItem() select the current item, check its type, equip, and remove from inventory
        li.setAttribute("style", "cursor:pointer");
        li.setAttribute("data-item", JSON.stringify(element));
        console.log(element[0]);
        inventoryContents.append(li);
    });
    itemBar.append(inventoryTitle, inventoryContents);
    equipBar.append(hideInventoryButton, equipmentTitle, wornHelmet, wornChest, wornArms, wornLegs, wornAccessory, wornWeapon);
    wornHelmet.innerText = "Head: " + equippedHelmet[0];
    wornChest.innerText = "Chest: " + equippedChest[0];
    wornArms.innerText = "Arms: " + equippedArms[0];
    wornLegs.innerText = "Legs: " + equippedLegs[0];
    wornAccessory.innerText = "Accessory: " + equippedAccessory[0];
    wornWeapon.innerText = "Weapon: " + equippedWeapon[0];
    
}

function hideInventory() {
    while (inventoryContents.firstChild) {
        inventoryContents.removeChild(inventoryContents.firstChild)
    };
    inventoryContainer.remove();
    document.body.append(container);
    
}