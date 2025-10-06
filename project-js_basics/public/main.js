"use static";

window.addEventListener("load", init)

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function calculate() {
    const x = Number(prompt("Ok, give me a number then...."));
    const y = Number(prompt("How another another one?"));
    const answ = x+10;
    if (y !== 10) {

        Swal.fire({
            text: `It seams like you typed ${y}. You meant 10 right?`,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    text: `Ok, ok... Then the answer is ${answ}`,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {

                    } else {
                        console.log('User clicked No');
                    }
                });


            } else {

                Swal.fire({
                    text: `Oh, ok, dont mind me then! The answer is ${answ}`,
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {

                    } else {

                        Swal.fire({
                            text: 'What, are you not happy??',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'Yes'
                        }).then((result) => {

                                Swal.fire({
                                    text: 'Fine... Try being a website for one day',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No'
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        const res = Number(prompt("So lets do some math. What is 1027382 * 6828374?"))

                                        if(res===1027382 * 6828374)
                                        {

                                            Swal.fire({
                                                text: "Hu, seams like you are not tht bad after all. You will make a great website. Welcome to the team!",
                                                showCancelButton: false,
                                                confirmButtonText: 'Thank you...'
                                            })

                                        }else {

                                            Swal.fire({
                                                text: "Ok, wow... You are terrible at this. You will never be a website!",
                                                showCancelButton: true,
                                                confirmButtonText: 'I will be a website!!!',
                                                cancelButtonText: "That´s ok. I never wanted to be a website in the first place"
                                            }).then((result) => {
                                                if (result.isConfirmed)
                                                {
                                                    Swal.fire({
                                                        text: "Yea, tell yourself that....",
                                                        showCancelButton: false,
                                                        confirmButtonText: 'I will...',
                                                    }).then((result) => {
                                                        window.location.replace("https://my.clevelandclinic.org/health/diseases/9599-delusional-disorder")
                                                    })
                                                }else {

                                                    Swal.fire({
                                                        text: "That´s wat I thought... Good by then!",
                                                        showCancelButton: true,
                                                        confirmButtonText: '*Leave*',
                                                        cancelButtonText: '*Also leave but with dramatic effect*'
                                                    }).then((result) => {
                                                        if(result.isConfirmed)
                                                        {

                                                        }else{
                                                            alert("ALERT!! It had no effect....")
                                                        }
                                                    })

                                                }
                                            })

                                        }

                                    } else {

                                        Swal.fire({
                                            text: 'Oh ok... You think you are better than me, dont you?',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes',
                                            cancelButtonText: 'No'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.location.replace("https://www.europol.europa.eu/report-a-crime/report-cybercrime-online");
                                            } else {

                                                Swal.fire({
                                                    text: 'Ok fine, I will let you of this time...',
                                                    showCancelButton: false,
                                                    confirmButtonText: 'I will behave in the future! I promise!!'
                                                })

                                            }
                                        });

                                    }
                                });
                        });
                    }
                });

            }
        });
    }

else{
    alert(`The answer is ${answ}`)
    }}

function init()
{
    const answ_text = document.getElementById("answer");
    sleep(2000).then(r =>
        answ_text.textContent = "I am a website. I don't have feelings...").then(r =>
            sleep(2000).then(r =>
                document.getElementById("button").innerHTML = "<button id='delete'>Delete everything</button>").then(() =>
            document.getElementById("delete").addEventListener("click", () => {document.getElementById("body").innerHTML = ""})
            ).then(() => {
                sleep(1000).then(r =>
                {
                    document.getElementById("answer2").innerText = "Or do you want to do something else...";
                    document.getElementById("button2").innerHTML = "<button id='calc'>Calculate</button>";
                    document.getElementById("calc").addEventListener("click", () =>{
                        calculate();
                    });
                    styling();
                })
            })
    );
}

function styling()
{
    document.getElementById("p1").classList.add("useless");
    document.getElementById("button").classList.add("rotating");
    document.getElementById("delete").textContent = "Catch me if you can!!!";
}