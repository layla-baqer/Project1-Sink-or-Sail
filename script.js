// 1.
// Select elements from the HTML using query selector.
let letterDivsContainer = document.querySelector(".letters-divs-container")
let wordContainer = document.querySelector(".word-container")
// let ship = document.querySelector("#ship")
let ship = document.querySelector(".main-container")
let instructionsBtn = document.querySelector("#instructions")
let modal = document.querySelector("#modal-id")
let modalText = document.querySelector(".text-content")
let closeModal = document.querySelector(".close")
let modalBtn = document.querySelector(".close-button")
let modalResetBtn = document.querySelector(".modal-reset")
let resetBtn = document.querySelector(".reset")
let progressBar = document.querySelector("#progress-bar-change")
let body = document.querySelector("body")
// 2.
// create all variables:
let wordsArray = ["APPLE", "BOX", "BANANA", "WATER", "SHIP", "BOAT", "ANCHOR", "FLAG", "SIREN", "ANTENNA", "LADDER", "FISH", "WAVE", "BUBBLE", "ROCK", "SAND", "ORANGE", "AVOCADO", "SALMON", "STORM"]
let randomWord = wordsArray[Math.floor(Math.random()*19)]
let randomWordArray = Array.from(randomWord)
let lengthRandWordArr = randomWordArray.length
let newWordArray = []
let guess
faultLetter = 0
disable = 0
progress = 100
// 3.
// create functions
const generateDivs = () => {
    for(let i=0; i<26; i++) {
        const lettersDivs = document.createElement("button")
        lettersDivs.classList.add("letter")
        lettersDivs.innerText = String.fromCharCode(i+65)
        lettersDivs.addEventListener("click", guessedLetter)
        letterDivsContainer.appendChild(lettersDivs)
    }
}
// 4.
const wordGenerator = () => {
    console.log(randomWordArray)
    newWordArray = [...Array(lengthRandWordArr)].map(x => " ")
    console.log(newWordArray)

    // 5.
    for(let i=0; i<lengthRandWordArr; i++) {
        const wordDivs = document.createElement("div")
        wordDivs.classList.add("word")
        wordDivs.innerText = newWordArray[i]
        wordContainer.appendChild(wordDivs)
    }
}

// 6.
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
            ship.style.backgroundImage = `url("Images/Sea_Background_${faultLetter}.png")`
            // ship.src = `Images/Sea_Background_${faultLetter}.png`
            progress = progress-(100/7)
            progressBar.style.width = `${progress}%`
            progressBar.innerText = `${faultLetter}/7`
        }
        winLoseMessage()
    }
}

const winLoseMessage = () => {
    let newWordString = newWordArray.toString()
    let randomWordString = randomWordArray.toString()
    if (newWordString == randomWordString) {
        console.log("Winner")
        modal.style.display = "block"
        modalText.innerText = "Congratulations! You won the game"
        modalText.style.color = "#18716f"
        modalClose()
        disable = 1
    } else if (faultLetter == 7) {
        console.log("Lost")
        progress = 0
        progressBar.style.width = `${progress}%`
        progressBar.innerText = `0/7`
        modal.style.display = "block"
        modalText.innerHTML = `You Lost<br>The correct answer is ${randomWord}`
        modalText.style.color = "#e13236"
        modalClose()
        disable = 1
    }
}

const modalClose = () => {
    modalBtn.addEventListener("click", ()=>{
        modal.style.display = "none"
        modalText.innerText = ""
    })
    closeModal.addEventListener("click", ()=>{
        modal.style.display = "none"
        modalText.innerText = ""
    })
}

// 7.
// update the progress bar whith the faultLetter count & decrease the level.
// 8.
// add event listener for click on instructionsButton
// create function called "showInstructions" for when the instructionsButton is clicked
// add image infront of the container div with the instructions in it & make the container div blurry
// add event listener for click on the blurry container div to remove the instructions image.

const startGame = () => {

    document.addEventListener("DOMContentLoaded", ()=> {
        generateDivs()
        wordGenerator()

        instructionsBtn.addEventListener("click", ()=>{
            modal.style.display = "block"
            modalText.innerHTML = "Instructions:<br><br>1. A random word is generated by the computer.<br>2. You have to guess the letters of the word.<br>3. Choose a letter from the bubbles under the sea by clicking on it.<br>4. If you click on a wrong letter your ship will be damaged.<br>5. You have 7 tries until the ship sinks.<br>6. To reset the game at any time click on RESET GAME button.<br>Good luck!"
            modalText.style.color = "black"
        })
        modalClose()
        modalResetBtn.addEventListener("click", ()=>{
            modal.style.display = "none"
            resetAll()
        })
    })
}

startGame()

resetBtn.addEventListener("click", ()=>{
    resetAll()
})

const resetAll = () => {
    startGame()
    const clearWordDiv = document.querySelectorAll(".word")
    for(let i=0; i<lengthRandWordArr; i++) {
        clearWordDiv[i].innerText = " "
    }
    const resetLetter = document.querySelectorAll(".letter")
    for(let i=0; i<26; i++) {
        resetLetter[i].style.color = "white"
        resetLetter[i].style.border = "2px solid white"
    }
    randomWord = wordsArray[Math.floor(Math.random()*19)]
    randomWordArray = Array.from(randomWord)
    lengthRandWordArr = randomWordArray.length
    newWordArray = []
    // to delete the word divs
    wordContainer.innerHTML = ""
    wordGenerator()
    ship.style.backgroundImage = `url("Images/Sea_Background_0.png")`
    // ship.src = `Images/Boat.png`
    disable = 0
    faultLetter = 0
    progress = 100
    progressBar.style.width = `${progress}%`
    progressBar.innerText = `7/7`
}