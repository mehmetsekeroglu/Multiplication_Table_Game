/**
 * Oyuncu ekleme eventi
 */
function addPlayerHandler() {
    mainElement.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.id === "add-player") {
            setLocalPlayerList()
        }
    })
}

/**
 * oyuncu listesi arrayini olusturur, local-storage'a oyuncu bilgilerini kaydeder
 */
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

/**
 * game area olusturulur
 */
function createGameArea() {
    counter++
    firstNumber = Math.floor(Math.random() * 8) + 2;
    secondNumber = Math.floor(Math.random() * 8) + 2;
    return createQuestion(firstNumber, secondNumber, counter)
}

/**
 * soru olusturur
 * @param {*} pFirstNumber 
 * @param {*} pSecondNumber 
 * @param {*} pCounter 
 */
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

/**
 * soru sayisini berlirler
 */
function countQuestion() {
    if (counter < 10) {
        mainElement.innerHTML = createGameArea();
    } else {
        clearInterval(downloadTimer)
        counter = 0;
        audio.pause();
        exitFullScreen();
        createStartUI();
    }
}

/**
 * islem sonucunu kontrol eder
 */
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

/**
 * dogru sonuc olmasi durumunda puani 10 puan artirir local-storageda puni günceller 
 * @param {*} pPoint 
 */
function setTrue(pPoint) {
    pPoint += 10
    updatePoint(pPoint)
}

/**
 * yanlis sonuc olmasi durumunda puani 10 puan artirir local-storageda puni günceller 
 * @param {*} pPoint 
 */
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

function countQuestion() {
    if (counter < 10) {
        mainElement.innerHTML = createGameArea();
    } else {
        clearInterval(downloadTimer)
        counter = 0;
        audio.pause();
        exitFullScreen();
        createStartUI();
    }
}

function refreshUI() {
    clearInterval(downloadTimer);
    startTimer();
    countQuestion();
    setFocus();
}