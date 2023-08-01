let num1 = Math.ceil(Math.random() * 10);
let num2 = Math.ceil(Math.random() * 10);

let question = document.querySelector('#quees');

let form = document.querySelector('#form');

let input = document.querySelector('#input');

let scoreBoard = document.querySelector('#score');

let score = 0;
score = JSON.parse(localStorage.getItem('score'));

question.innerText = `What is ${num1} multiply by ${num2} ?`;

scoreBoard.innerText = `Score: ${score}`;
let answer = num1 * num2;

form.addEventListener('submit', () => {
    let getAnswer = +input.value;
    if (getAnswer === answer) {
        score++;
        update();
    } else {
        score--;
        update();
    }
})

function update() {
    localStorage.setItem("score", JSON.stringify(score));
}