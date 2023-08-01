const buttons = document.querySelectorAll('button');
const resultEl = document.querySelector("#result");
const scoreEl = document.querySelector("#scores");

let pScore = 0;
let cScore = 0;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const result = playRound(button.id, computerPlay());
        resultEl.textContent = result;
        scoreEl.innerHTML = `Your score: <span id="user">${pScore}</span>
        Computer's score: <span id="computer">${cScore}</span>`
        console.log(scoreEl);
    })
})

function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function playRound(player, computer) {
    if (player === computer) {
        return "It's a TIE!!!"
    } else if ((player === "Rock" && computer === "Scissors") || (player === "Paper" && computer === "Rock") || (player === "Scissors" && computer === "Paper")) {
        pScore++;
        return "YOU WON! : " + player + " beats " + computer;
    } else {
        cScore++;
        return "you lose! : " + computer + " beats " + player;
    }
}