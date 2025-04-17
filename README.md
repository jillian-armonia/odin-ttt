# Tic-Tac-Toe for The Odin Project
## Tasks / Hints
1. Store the gameboard as an array inside of a Gameboard object
2. Store your players as objects
3. Create an object that will control the flow of the game itself
    - Main goal: use as little global code as possible
    - Use inside factory functions
    - If you only need a single instance of something (e.g. the gameboard, the displayController etc.) wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.
    - Think carefully where each bit of logic should reside. Each piece should fit in the game, player or gameboard objects
    - This [article](https://www.ayweb.dev/blog/building-a-house-from-the-inside-out) might help on how to approach this project
4. Get a working game in the **console** first. Include logic that checks for when the game is over.
    - Don't worry about the DOM, HTML/CSS
    - Don't worry about taking user input
    - Call your functions and pass arguments to play the game and check if everything is working as intended
5. Create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage
6. Write functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. click on the board square to place their marker). Don't forget the logic that keeps players from playing in spots that are already taken
7. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon the game end!
