# Simple RPG Game
The Hunt action is the basic progression action and gives a base level of gains in gold and exp in exchange for a set amount of health, which can be decreased by the users attack and defense. The Adventure action is the big risk, big reward version of Hunt. This action will do more damage in exchange for a bigger gold and exp reward if the player survives. The Work action gives the user side material that will be used for crafting swords and armor in the future. There is a random chance of getting each of the following: Wood, Fish, Apple, Ruby, Gold. The Training action is focused on giving the user purely exp to help progress their level. Unlike the hunt and adventure action, this action deals no damage but gives no gold as well. The Dungeon action would let the user face a boss and try to progress to the next area to increase their gains from the other actions.


## Change log

- base backend and frontend made, not connected
- register/login complete
- started hunt page
- added action buttons on monster page, with timers
- preparing for deployment
- registration now makes full user details, simplied monster screen
- updates database when hunting
- remakes localstorage so refreshes dont reset stats
- redid how stats are stored, added display variables for each stat, added outline to each buttons function
- fix updateUser on backend to include new stats layout
- damage, exp, gold calculations added, level display added
- fixed bug where stats wouldnt update on DB
- working inventory, moved status updates to useEffect, now updates right when you click on hunt or adventure
- function dungeon added

