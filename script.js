// 1.
// Select elements from the HTML using query selector.
// name the selected elements as following:
// container, instructionsButton, progressBar, ship, word & letters.
let letterDivsContainer = document.querySelector(".letters-divs-container")
// 2.
// create all variables:
// wordsArray: an array that contains multiple words (20 words) to be given to the player to guess its letters.
// newWordArray: an array of the word that will have the letters when the player guesses a correct letter.
// randomWordArray: contains the random generated word letters in an array.
// guessedLetter: stores the newly guessed letter.
// faultLetter: counts the number of letters that were guessed incorectly which will be used to diplay lose
// message (max number of wrong guesses is 7)
// 3.
// create a function called "generateDivs" to generate divs to contain the letters A-Z using for-loop, the
// loop will run 26 times to make a div for each letter.
// use document create element to create the divs
// give all the created divs a class name of "letter" & append them to the div letters.
// use fromCharCode to fill inner text of each div with an alphabetic letter.
// add event listener for click on each div
// add a round/circle border OR a bubble background to the created divs.
const generateDivs = () => {
    for(let i=0; i<26; i++) {
        const lettersDivs = document.createElement("div")
        lettersDivs.classList.add("letter")
        lettersDivs.innerText = String.fromCharCode(i+65)
        lettersDivs.addEventListener("click", guessedLetter)
        letterDivsContainer.appendChild(lettersDivs)
        console.log("div created")
    }
}
// 4.
// create a function called "wordGenerator" to randomly generate a word from the "wordsArray"
// use Math.floor(Math.random()*20) to generate a random index for the "wordsArray"
// convert the random word from a string to an array using Array.from() & save it in "randomWordArray"
// fill the "newWordArray" with an empty space based on the length of the random word array, save the random
// word array in the newWordArray & then replace all array elements with an empty space.
// 5.
// create a function called "guessWord" to generate divs for the letters of the random word to be guessed
// use a for-loop to create the divs & the number of times the loop will run has to be < the length of the
// new word array.
// save each element of the new word array in one of the new divs.
// give the new divs a class name "word" & append them to the div word-guess.
// 6.
// create a function called "guessedLetter" to check if the chosen letter is correct or not.
const guessedLetter = () => {

}
// store the new chosen letter in "guessedLetter" with event.target.innerText
// use if statement that checks if the chosen letter is correct using randomWordArray.includes(guessedLetter)
// if the statement is correct then check in which index the letter exists.
// add the letter to the newWordArray using newWordArray.splice(index, howmany, guessedLetter) to
// update the newWordArray with the guessed letter.
// update the inner text of the "word" divs using a for-loop
// compare the newWordArray with randomWordArray if they are matching then generate a win, else do nothing.
// use the else statement for if the chosen letter is not correct & change the letter color & remove the
// event listener to disable the letter from being clicked again. Also, add an image of a hole on the ship.
// update the faulLetter count with +1.
// check if the faultLetter count has reached 7 & display the lose message, else do nothing.
// 7.
// update the progress bar whith the faultLetter count & decrease the level.
// 8.
// add event listener for click on instructionsButton
// create function called "showInstructions" for when the instructionsButton is clicked
// add image infront of the container div with the instructions in it & make the container div blurry
// add event listener for click on the blurry container div to remove the instructions image.


document.addEventListener("DOMContentLoaded", ()=> {
    generateDivs()
})