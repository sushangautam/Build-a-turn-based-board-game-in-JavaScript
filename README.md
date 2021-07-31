# Build-a-turn-based-board-game-in-JavaScript
In this project, I will create an online game written JavaScript in which 2 players play each turn to compete. 

Step 1: 
Generate the map Start by randomly generating the game map. Each box can be either:  
# Empty  
# Unavailable (dimmed)  

On the map, a limited number of weapons (up to 4) will be placed randomly and can be collected by players who pass through.  
You should invent at least 4 types of weapons in the game, each with different damage inflicted (don't worry though, your choice of weapons doesn't need to be violent or come from the classic lineup of weapons. If you count a cupcake as a weapon, that's cool too)! The default weapon must inflict 10 points of damage. Each weapon has a name and associated visual.  
The placement of the two players is also randomly on the map when the game loads. They should not touch (they can not be together).  

Step 2: 
Movements For each turn, a player can move from one to three boxes (horizontally or vertically) before ending their turn. They obviously can not pass through obstacles directly.  
If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.  

Step 3: 
Fight! If players cross over adjacent squares (horizontally or vertically), a battle begins.  
During combat, the game works is as follows:  

## Each player plays in turn;  
## The player can choose to attack or defend against the next shot;  
## The damage depends on the player's weapon;  
## If the player chooses to defend themselves, they sustain 50% less damage than normal;  
## As soon as the life points of a player (initially 100) falls to 0, they lose. 
## A message appears and the game is over.

![image](https://user-images.githubusercontent.com/47807838/127731689-08a62097-d406-4c24-9232-78fbaac7d5cd.png)

![image](https://user-images.githubusercontent.com/47807838/127731730-4951d4ad-4bb4-4bdf-96a2-6b8d7c16a4cd.png)

![image](https://user-images.githubusercontent.com/47807838/127731734-4607a23c-2305-45ef-bc66-3b0facac407f.png)

![image](https://user-images.githubusercontent.com/47807838/127731755-5b92dde3-d7f3-4105-99b9-ce483b74b8ca.png)
