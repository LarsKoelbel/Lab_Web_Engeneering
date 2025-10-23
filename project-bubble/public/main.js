"use strict";

let VIDEO = null;
let GLOBAL_SPAWN_DELAY_MULT = 1;
let GLOBAL_STOP_SPAWNING = false;
let GLOBAL_BUBBLER_POPPED = 0;

function spawnCircle() {
    const circle = document.createElement("div");
    const size = Math.random() * 150 + 20;
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);

    if (GLOBAL_BUBBLER_POPPED >= 499) {
        GLOBAL_BUBBLER_POPPED = 499;
    }


    const golden = (Math.floor(Math.random() * (500 - GLOBAL_BUBBLER_POPPED)) === 0);
    let GLOBAL_ANIMATION_STOP = false;

    circle.className = "circle";
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add("forming");

    if (golden) {
        circle.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 0, 0.7), rgba(186, 255, 0, 0.2))`;
    }

    document.body.appendChild(circle);

    circle.addEventListener("animationend", () => {
        circle.classList.remove("forming");
    }, {once: true});

    if (VIDEO != null && VIDEO.currentTime >= 44) {
        if (VIDEO.currentTime <= 60){
            GLOBAL_SPAWN_DELAY_MULT = 0.25;
        }else {
            GLOBAL_SPAWN_DELAY_MULT = 1;
        }
        const rand = Math.floor(Math.random() * 100000);
        const id = `vidid${rand}`;
        circle.innerHTML = `<video width=\"${size}\" height=\"${9 * size / 16}\" id='${id}' muted> <source src=\"assets/videos/rickroll.mp4\" type=\"video/mp4\"> </video>`;
        const v = document.getElementById(id);
        v.currentTime = VIDEO.currentTime;
        v.play();
        circle.classList.replace("circle", "circle-video");
        circle.style.background = `transparent`;
    }else {
        circle.addEventListener("click", () => {
            if (!golden) {
                const popSound = new Audio("./assets/audio/bubble-pop.mp3")
                popSound.play();
                popCircle(circle);
                GLOBAL_BUBBLER_POPPED++;
                console.log(GLOBAL_BUBBLER_POPPED);

            }else {
                const rand = Math.floor(Math.random() * 100000);
                const id = `vidid${rand}`;
                circle.innerHTML = `<video width=\"${size}\" height=\"${9 * size / 16}\" id='${id}'> <source src=\"assets/videos/rickroll.mp4\" type=\"video/mp4\"> </video>`;
                VIDEO = document.getElementById(id);
                VIDEO.play();
                circle.classList.replace("circle", "circle-video");
                circle.style.background = `transparent`;
                GLOBAL_ANIMATION_STOP = true;

                function RunAnimationEnd() {
                    GLOBAL_STOP_SPAWNING = true;
                    document.body.innerHTML = "";

                    setTimeout(() => {
                        document.body.backgroundImage = "";
                        document.body.backgroundColor = "black";
                        document.body.classList.remove("fade-black");
                        const rand = Math.floor(Math.random() * 100000);
                        const id = `vidid${rand}`;
                        document.body.innerHTML = `<video width=100% id='${id}'> <source src=\"assets/videos/slow_clap.mp4\" type=\"video/mp4\"> </video>`;
                        const v = document.getElementById(id);
                        v.play();
                    }, 500);
                }

                function checkAddFade() {
                    if (VIDEO != null && VIDEO.currentTime >= 116) {
                        document.body.classList.add("fade-black");

                        setTimeout(RunAnimationEnd, 5000);
                    }
                    else {
                        setTimeout(checkAddFade, 500);
                    }
                }

                setTimeout(function () {
                    checkAddFade();
                }, 1000);

            }
        });
    }

    const speed = Math.random() * 0.5 + 0.5; // pixels per frame (~30–60px/s)
    const h_speed = Math.random()*0.25 - (0.25 / 2);

    function moveUp() {
        const currentTop = parseFloat(circle.style.top);
        const currentLeft = parseFloat(circle.style.left);
        if (currentTop <= 0 || currentLeft + size > window.innerWidth) {
            if (golden || VIDEO != null) {
                circle.remove();
                return;
            }
            popCircle(circle);
            return;
        }
        circle.style.top = `${currentTop - speed}px`;
        circle.style.left = `${currentLeft - h_speed}px`;
        if(!GLOBAL_ANIMATION_STOP) {
            requestAnimationFrame(moveUp);
        }
    }

    requestAnimationFrame(moveUp);

}

function popCircle(circle) {

    circle.classList.add("popping");
    circle.addEventListener("animationend", function() {
        circle.remove();
    }, {once: true})
}

function startSpawningCircles() {
    if (GLOBAL_STOP_SPAWNING) {return;}
    const delay = (Math.random() * 1000 + 500) * GLOBAL_SPAWN_DELAY_MULT;
    setTimeout(() => {
        spawnCircle();
        startSpawningCircles();
    }, delay)
}

startSpawningCircles();