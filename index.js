const input = document.getElementById("aiInput");
const aiResponseDiv = document.getElementById("ai-response");
var conversation = ""
let aiURL = "";

fetch("resources/ai/telemetry.json")
    .then(response => response.json())
    .then(config => {
        aiURL = config.url;
    })
    .catch(error => console.error("Error loading config:", error));

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        askAI();
    }
})

function addToConversation(msg, source){
    conversation += "\n\n" + source + ":" + msg
}

function askAI() {
    addToConversation(input.value, "User");
    const prompt = "Continue the conversation from the following history with just one response." +
        "If the history is empty, assume its a new conversation.\n\nHistory: \n\n" + conversation + "\n\nNow answer with only your response:"

    // Send POST request
    fetch(aiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prompt: prompt})
    })
        .then(response => response.json())
        .then(result => {
            console.log("Success:", result);
            addToConversation(result.resp, "You");
            aiResponseDiv.innerText = result.resp;
        })
        .catch(error => {
            console.error("Error:", error);
        });

    // Clear the input field
    input.value = "";
}