"use strict";

window.addEventListener("load", () => {
    openPopup()
    start_time_update();
    startRandomEmphasizing()
})

function start_time_update(){
    const bar = document.getElementById("time-bar")

    bar.style.width = ( getTimeInSecounds()/86400 * 100) + "%";

    setInterval(()=>{
        bar.style.width = (getTimeInSecounds()/86400 * 100) + "%";
    }, 5000);
}

function getTimeInSecounds(){
    const time = new Date();
    return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
}

function getDayOfTheWeek(){
    const now = new Date();
    return now.getDay();
}

function openPopup(){

    const seconds = getTimeInSecounds();

    let message = "";

    switch (true) {
        case seconds < 36000:
            message = "Guten Morgen!"
        case seconds < 57600:
            message = "Guten Tag!"
        default:
            message = "Guten Abend!"
    }
    const day = getDayOfTheWeek();
    if (day === 0 || day === 6){
        message += "\nWir wünschen ihnen ein schönes Wochenende!"
    }

    document.getElementById("wellcome-text").innerText = message;

    document.getElementById("wellcome-pupup").style.display = "flex";
}

function closePopup(){
    document.getElementById("wellcome-pupup").style.display = "none";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startRandomEmphasizing()
{
    const articles = [
        document.getElementById("article1"),
        document.getElementById("article2"),
        document.getElementById("article3")
    ]

    const index = getRandomInt(0, articles.length - 1);
    articles[index].classList.add("emphasize-main-article");


    setInterval(()=>{
        const index = getRandomInt(0, articles.length - 1);
        for (let i = 0; i < articles.length; i++) {
            articles[i].classList.remove("emphasize-main-article");
        }
        articles[index].classList.add("emphasize-main-article");
    }, 10000)
}