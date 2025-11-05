
window.addEventListener('load', init);

async function init ()
{
    startJokePolling();
    document.getElementById("joke-dialog-button").addEventListener("click", addJoke);
}

async function addJoke ()
{
    const dialog = document.getElementById("joke-add-dialog")
    dialog.showModal();

    const typeField = document.getElementById('type-field');
    const valueField= document.getElementById('value-field');

    document.getElementById("joke-add-button").addEventListener("click", async () => {
        await postJokeToServer(typeField.value, valueField.value);
        dialog.close();
    });

}

async function postJokeToServer(_type, _value)
{
    try{
        const res = await fetch("http://localhost:3000/epigrams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({value: _value, type: _type}),
        })

        if (!res.ok) throw new Error(`Error communicating with server: ${res.statusText} (${res.statusCode})`)

        return true;
    }catch(e)
    {
        alert("Server error: " + e.message);
        return false;
    }
}

async function startJokePolling()
{
    const display = document.getElementById("joke");

    async function inner()
    {
        const joke = await getJokeFormServer();
        display.innerText = joke.value;

        setTimeout(inner, 60000);
    }

    inner();
}

async function getJokeFormServer()
{
    try{
        const joke = await fetch('http://localhost:3000/epigrams/random');
        if (!joke.ok) throw new Error(`Error communicating to server: ${joke.statusText} (${joke.statusCode})`)
        return await joke.json();
    }catch(e){
        return {value: e.message};
    }
}