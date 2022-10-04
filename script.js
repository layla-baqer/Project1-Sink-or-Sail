// 1.
// Select elements from the HTML using query selector.
// name the selected elements as following:
// container, instructionsButton, progressBar, ship, word & letters.
let letterDivsContainer = document.querySelector(".letters-divs-container")
let wordContainer = document.querySelector(".word-container")
let ship = document.querySelector("#ship")
let instructionsBtn = document.querySelector(".instructions")
let resetBtn = document.querySelector(".reset")
let body = document.querySelector("body")
// 2.
// create all variables:
// wordsArray: an array that contains multiple words (20 words) to be given to the player to guess its letters.
let wordsArray = ["APPLE", "BOX", "BANANA", "WATER", "SHIP", "BOAT", "ANCHOR", "FLAG", "SIREN", "ANTENNA", "LADDER", "FISH", "WAVE", "BUBBLE", "ROCK", "SAND", "ORANGE", "AVOCADO", "SALMON", "STORM"]
let randomWord = wordsArray[Math.floor(Math.random()*19)]
let randomWordArray = Array.from(randomWord)
let lengthRandWordArr = randomWordArray.length
// newWordArray: an array of the word that will have the letters when the player guesses a correct letter.
let newWordArray = []
// randomWordArray: contains the random generated word letters in an array.
// guess: stores the newly guessed letter.
let guess
// faultLetter: counts the number of letters that were guessed incorectly which will be used to diplay lose
faultLetter = 0
disable = 0
// message (max number of wrong guesses is 7)
// 3.
const generateDivs = () => {
    for(let i=0; i<26; i++) {
        const lettersDivs = document.createElement("button")
        lettersDivs.classList.add("letter")
        lettersDivs.innerText = String.fromCharCode(i+65)
        // letterDivs.type = 'number'
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
const wordGenerator = () => {
    console.log(randomWordArray)
    // create an empty array with the same number of letters of the random word.
    newWordArray = [...Array(lengthRandWordArr)].map(x => " ")
    console.log(newWordArray)

    // 5.
    // create a function called "guessWord" to generate divs for the letters of the random word to be guessed
    // use a for-loop to create the divs & the number of times the loop will run has to be < the length of the
    // new word array.
    // save each element of the new word array in one of the new divs.
    // give the new divs a class name "word" & append them to the div word-guess.
    for(let i=0; i<lengthRandWordArr; i++) {
        const wordDivs = document.createElement("div")
        wordDivs.classList.add("word")
        wordDivs.innerText = newWordArray[i]
        wordContainer.appendChild(wordDivs)
    }
}

// 6.
// create a function called "guessedLetter" to check if the chosen letter is correct or not.
const guessedLetter = (event) => {
    if (event.target.style.color == "darkslategrey") {
        return
    }

    if (disable == 0) {
        event.target.style.color = "darkslategrey"
        event.target.style.border = "none"
        guess = event.target.innerText
        console.log(guess)

        if (randomWordArray.includes(guess)) {
            let index = []
            randomWordArray.forEach(function(letter, idx) {
                if (letter == guess){
                    index.push(idx)
                }
            })
            for (let i=0; i<index.length; i++) {
            newWordArray.splice(index[i], 1, guess)
            }

            // stores the new guessed letters in the word shown
            let wordElements = wordContainer.getElementsByTagName("div")
            for (let i=0; i<wordElements.length; i++) {
                wordElements[i].innerText = newWordArray[i]
            }
        } else {
            faultLetter++
            console.log(faultLetter)
            ship.src = `Images/Boat ${faultLetter}.png`
        }
        winLoseMessage()
    }
}
// store the new chosen letter in "guessedLetter" with event.target.innerText
// use if statement that checks if the chosen letter is correct using randomWordArray.includes(guessedLetter)
// if the statement is correct then check in which index the letter exists.
// add the letter to the newWordArray using newWordArray.splice(index, howmany, guessedLetter) to
// update the newWordArray with the guessed letter.
// update the inner text of the "word" divs using a for-loop
// compare the newWordArray with randomWordArray if they are matching then generate a win, else do nothing.
const winLoseMessage = () => {
    let newWordString = newWordArray.toString()
    let randomWordString = randomWordArray.toString()
    if (newWordString == randomWordString) {
        console.log("Winner")
        disable = 1
    } else if (faultLetter == 8) {
        console.log("Lost")
        disable = 1
    }
}
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
    wordGenerator()
    instructionsBtn.addEventListener("click", ()=>{
        const popInstruction = document.createElement("div")
        popInstruction.classList.add("pop-up")
        popInstruction.innerText = "This is the instructions -0fe-ifoejfe kwnvjwernv oewnmvkldnmv kewnvpken wmvkmds fekwmfp fmkewnmvw wekfm;ewfmew fkemfe;kf"
        body.appendChild(popInstruction)
    })
    resetBtn.addEventListener("click", ()=>{
        const clearWordDiv = document.querySelectorAll(".word")
        for(let i=0; i<lengthRandWordArr; i++) {
            clearWordDiv[i].innerText = " "
        }
        const resetLetter = document.querySelectorAll(".letter")
        for(let i=0; i<26; i++) {
            resetLetter[i].style.color = "white"
            resetLetter[i].style.border = "2px solid white"
        }
        ship.src = `Images/Boat.png`
        disable = 0
        faultLetter = 0
    })
})