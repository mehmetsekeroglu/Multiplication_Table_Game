/**
 * Okul Kayit Sistemi
 * 1.Ekranin sol tarafinda bir form olusturulacak,
 * 2.Forma girilen bilgiler kategorisine göre kontrol edilecek (rakam veya alfabetik kontrol),
 * 3.Form'a bir ekle butuno koyulacak,
 * 4.Butona tiklandiginda Form bilgileri bir arraye atilacak, 
 * 5.Array'de tutulan bilgiler ekranin sag tarafina yazdirilacak,
 * 6.Listenin sonuna toplam ögrenci sayisi yazdirilacak.
 */
const mainElement = document.querySelector("#app");
let counter = 0;
let firstNumber, secondNumber, resultNumber;
let studentName = ""
let downloadTimer = ""
var audio = new Audio("./Corporate-Business.mp3");


createStartUI()

mainElement.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.id === "add-player") {
        setLocalPlayerList()
    }
   
})

function setLocalPlayerList() {
    let playerNameArea = document.querySelector("#input-player");
    let playerList = []
    playerList.push({
        playerName: playerNameArea.value,
        playerPuan: 0
    })
    let key = playerList[0].playerName
    localStorage.setItem(key, JSON.stringify(playerList));
    createStartUI();
}

mainElement.addEventListener("click", function (event) {
    if (event.target.className === "player-name") {
        studentName = event.target.id
        refreshUI();
        toggleFullScreen();
        audio.play();
    }
})

function refreshUI() {
    clearInterval(downloadTimer);
    startTimer();
    countQuestion();
}

function countQuestion() {
     if (counter < 2) {
        mainElement.innerHTML = createGameArea();
    } else {
        clearInterval(downloadTimer)
        counter = 0;
        audio.pause();
        exitFullScreen();
        createStartUI();
    }
}

function createGameArea() {
    counter++
    firstNumber = Math.floor(Math.random() * 8)+2;
    secondNumber = Math.floor(Math.random() * 8)+2;
    return createQuestion(firstNumber, secondNumber, counter)
}

function createQuestion(pFirstNumber, pSecondNumber, pCounter) {
    return `<div id="calculation-place">
    <div id="question-number">Question-${pCounter}</div>
    <div>
    <span class="numbers" id="first-number">${pFirstNumber}</span>
    <span id="cross-mark">x</span>
    <span class="numbers" id="second-number">${pSecondNumber}</span>
    <span id="equal-mark">=</span>
    <input id="result-number"></input>
    </div>
    <progress value="0" max="10" id="progressBar"></progress>
   </div>
   
    `
}

function startTimer() {
    let timeleft = 9;
    downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            checkResult();
        }
        const progressElement = document.getElementById("progressBar")
        progressElement.value = 10 - timeleft;
        timeleft -= 1;
    }, 1000);
}

mainElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkResult();
    }
})

function checkResult() {
    resultNumber = firstNumber * secondNumber;
    let point = 0
    let resultNumberArea = document.querySelector("#result-number");
    if (resultNumber == resultNumberArea.value) {
       setTrue(point)
    } else {
       setFalse(point)
    }
    refreshUI()
}

function setTrue(pPoint) {
    pPoint += 10
    updatePoint(pPoint) 
}

function setFalse(pPoint) {
    pPoint -= 5
    updatePoint(pPoint)
}

function updatePoint(pPoint) {
    let activePerson = []
    activePerson = JSON.parse(localStorage.getItem(studentName));
    console.log(activePerson)
    activePerson[0].playerPuan += pPoint
    localStorage.setItem(studentName, JSON.stringify(activePerson));
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        mainElement.requestFullscreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}
