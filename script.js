// 1.
// Select elements from the HTML using query selector.
let letterDivsContainer = document.querySelector(".letters-divs-container")
let wordContainer = document.querySelector(".wordDivsContainer")
let ship = document.querySelector("#ship")
let instructionsBtn = document.querySelector("#instructions")
let modal = document.querySelector("#modal-id")
let modalText = document.querySelector(".text-content")
let closeModal = document.querySelector(".close")
let modalBtn = document.querySelector(".close-button")
let modalResetBtn = document.querySelector(".modal-reset")
let resetBtn = document.querySelector(".reset")
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
// 3.
// create alphabetic letters divs
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
// create random word divs
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
            ship.src = `Images/Boat ${faultLetter}.png`
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
        modalText.innerText = "Winner"
        modalBtn.innerText = "Return to Game"
        modalBtn.addEventListener("click", ()=>{
            modal.style.display = "none"
            modalText.innerText = ""
        })
        closeModal.addEventListener("click", ()=>{
            modal.style.display = "none"
            modalText.innerText = ""
        })
        disable = 1
    } else if (faultLetter == 8) {
        console.log("Lost")
        modal.style.display = "block"
        modalText.innerText = `You Lost.<br>The correct answer is ${randomWord}`
        modalBtn.innerText = "Return to Game"
        modalBtn.addEventListener("click", ()=>{
            modal.style.display = "none"
            modalText.innerText = ""
        })
        closeModal.addEventListener("click", ()=>{
            modal.style.display = "none"
            modalText.innerText = ""
        })
        disable = 1
    }
}

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
        modal.style.display = "block"
        modalText.innerText = "Instructions"
    })
    modalBtn.addEventListener("click", ()=>{
        modal.style.display = "none"
        modalText.innerText = ""
    })
    closeModal.addEventListener("click", ()=>{
        modal.style.display = "none"
        modalText.innerText = ""
    })
    resetBtn.addEventListener("click", ()=>{
        // const clearWordDiv = document.querySelectorAll(".word")
        const wordDivsContainer = document.querySelector(".wordDivsContainer")
        console.log(wordDivsContainer)
        while(wordDivsContainer.firstChild){
            wordDivsContainer.removeChild(wordDivsContainer.firstChild)
        }
        // for(let i=0; i<lengthRandWordArr; i++) {
        //     clearWordDiv[i].innerText = " "
        // }
        console.log(newWordArray)
        const resetLetter = document.querySelectorAll(".letter")
        for(let i=0; i<26; i++) {
            resetLetter[i].style.color = "white"
            resetLetter[i].style.border = "2px solid white"
        }
        ship.src = `Images/Boat.png`
        disable = 0
        faultLetter = 0
    })
    modalResetBtn.addEventListener("click", ()=>{
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
        modal.style.display = "none"
    })
})