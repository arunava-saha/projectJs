let timer = 60;
let score = 0;
function getScore() {
    score += 10;
    document.querySelector('#score').innerText = score;
}

function getHit() {
    let hit = Math.floor(Math.random() * 10);
    document.querySelector('#hit').innerText = hit;
}

function makeBubble() {
    let bubble = "";

    for (let i = 0; i <= 132; i++) {
        let num = Math.floor(Math.random() * 10);
        bubble += `<div class="bubble">${num}</div>`;
    }
    document.querySelector("#bottomSection").innerHTML = bubble;
}

function runTimer() {
    let time = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector('#timer').innerText = timer;
        } else {
            clearInterval(time);
            document.querySelector('#bottomSection').innerHTML = `<h1>Game Over</h1> 
            <div><h3>Score: ${score}</h3></div>`;
        }
    }, 1000);
}

document.querySelector('#bottomSection').addEventListener("click", function (ele) {
    let num = Number(ele.target.innerText);
    if (num == document.querySelector('#hit').innerText) {
        getScore();
        makeBubble();
        getHit();
    }
})
runTimer();
makeBubble();
getHit();
