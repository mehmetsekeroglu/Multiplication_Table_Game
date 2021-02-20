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
    setFocus();
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






