const input = document.getElementById("aiInput");
const aiResponseDiv = document.getElementById("ai-response");
const feedbackInput = document.getElementById("Ifeedback");
const nameInput = document.getElementById("IName");
const feedbackSubmitButton = document.getElementById("feedbackSubmitButton");
const feedbackDiv = document.getElementById("feedbackDiv");
var conversation = ""
let aiURL = "";

fetch("resources/ai/telemetry.json")
    .then(response => response.json())
    .then(config => {
        aiURL = config.url;
        checkLogin();
    })
    .catch(error => console.error("Error loading config:", error));

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        askAI();
    }
})

feedbackSubmitButton.addEventListener("click", function (event) {
    sendFeedback();
})

function addToConversation(msg, source){
    conversation += "\n\n" + source + ":" + msg
}

function askAI() {
    addToConversation(input.value, "User");

    aiResponseDiv.innerHTML = '<span class="spinner"></span>';

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
            aiResponseDiv.innerText = "Oops... Something went wrong... Try again later!";
        });

    // Clear the input field
    input.value = "";
}

function sendFeedback() {

    feedbackDiv.innerHTML = '<span class="spinner"></span>';

    // Send POST request
    fetch(aiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({feedback: feedbackInput.value, name: nameInput.value})
    })
        .then(response => response.json())
        .then(result => {
            console.log("Success:", result);
            feedbackDiv.innerHTML = '<p>Thank you for your feedback!</p>';
        })
        .catch(error => {
            console.error("Error:", error);
            feedbackDiv.innerHTML = '<p>Feedback failed to send</p>';
        });

    nameInput.value = "";
    feedbackSubmitButton.value = "";

}

function checkLogin() {

    // Send POST request
    fetch(aiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({logon: "true"})
    })
        .then(response => response.json())
        .then(result => {
            console.log("Parsed JSON:", result);
            if (result.logon === "block")
            {
                window.location.href = "banned.html";
            }
            else if (result.logon === "maintenance")
            {
                window.location.href = "maintanance.html";
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

}