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
let firstNumber, secondNumber, resultNumber, studentName, downloadTimer;
//let studentName = ""
//let downloadTimer = ""
let audio = new Audio("./Corporate-Business.mp3");


createStartUI()


mainElement.addEventListener("click", function (event) {
    if (event.target.className === "player-name") {
        studentName = event.target.id
        refreshUI();
        toggleFullScreen();
        audio.play();
    }
})

mainElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkResult();

    }
})