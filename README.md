# Endless-Dungeon
簡単なDungeon crawlerゲーム。JavaScriptの練習として作っています。  


# Goals
General-  
    -Append and customize HTML elements using JavaScript. (Done!)  
    -Randomly generate enemies as the player moves forward (Done!)  
    -Stop forward movement until the current enemy is defeated (Done!)  
    -If the enemy drops the player's HP to 0, Game over.  

Combat-  
    -Use attack/defense multipliers to change damage inflicted. (Done!)  
    -If an enemy is defeated on a turn, stop them from attacking for that turn. (Done!)  

Inventory Management-  
    -Enemies drop loot, such as weapons, armor, healing items, etc.  
    -Player can open an inventory menu at any time, without disturbing their spot in the story. (Done!)  
    -Allow player to equip different item types (helmet, chestplate, boots, accessories, etc.)  
    -Allow player to consume certain items (e.g a healing potion)  
    -Loot should have effects on stats (Increase or decrease attack, defense, health, etc.)  
    -Store potential loot spawns in an array (with the name, type, effects, etc.)  
    -Some loot should be purely aesthetic/roleplay focused (e.g trinkets)  
    -When hovering over an inventory item (equipped or not) it should display the stats and description.  
    -Bonus: Some items should change the game itself (e.g an alcoholic drink that makes the text wavy)  
    


Random Events-  
    -Generate random non-combat encounters (Treasure chests, mimics, traps, puzzles, healing pool, etc.)  
    -Events should have multiple options to deal with them (e.g to open a chest or ignore it)  


Randomized rooms-  
    -Randomly generate mutliple room types  
    -The same room type persists for a random number of rooms (not changing each time)  
    -Each room type has its own randomly generated description.  
    -Enemy types and loot vary based on room type.  




Devlog (Problems and Solutions)-  
    
Problem: Since copied array entries are shallow copies, every time currentEnemy took damage, the HP of the base enemy changes.  
Solution: Used JSON.parse(JSON.stringify() to create a deep copy of the array.  

Problem: How to display the inventory text without messing up the current progress in travel/combat?  
Solution: Just hide the container div and replace it with another inventory div.  
    
Problem: Upon opening the inventory page, all the contents are populated in an unordered list. However, if you close and reopen the inventory, the contents are listed twice.  
Solution: Upon closing the inventory, a 'while' loop checks if inventoryContents.firstChild is 'true', then removes said child one-by-one, until there are none left.