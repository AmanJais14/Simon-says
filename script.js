let start = false;
let level = 0;
let maxLevel = level;

let gameSeq = [];
let userSeq = [];


let color = ['red','yellow','purple','green'];
let h2 = document.querySelector("h3")

document.addEventListener("keypress",(e) => {
    e.preventDefault()
    if(!start) {
        start = true;
        setTimeout(levelUp,1000);
    }
})
document.addEventListener("touchstart",() => {
    if(!start) {
        start = true;
        levelUp();
    }
})

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`
    let i = Math.floor(Math.random() * 4);
    let rndmColor = color[i];
    let rndmBtn = document.querySelector(`.${rndmColor}`);
    gameSeq.push(rndmColor);
    // console.log(gameSeq)
    btnflash(rndmBtn);
}

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },180)
}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },180)
}
function btnPress() {
    if(!start) return;
    let btn = this;
    userflash(btn);
    userSeq.push(this.getAttribute('id'));
    // console.log(userSeq);    
    check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".button");
for (btn of allBtns) {
        btn.addEventListener("click",btnPress)
}

function check(idx) {
    // console.log(level);
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
            userSeq = [];
        }
    } else {
        let body = document.querySelector('body');
        body.classList.add("bodyflash");
        setTimeout(()=>{
            body.classList.remove("bodyflash")
        },180)
        maxLevel = Math.max(level-1,maxLevel);
        let score = document.querySelector('#score');
        score.innerText = `${maxLevel}`
        gameSeq = []
        userSeq = []
        h2.innerHTML = `Your score was ${level-1}.<br> Press any key to start !`
        start = false;
        level = 0
    }
   
}