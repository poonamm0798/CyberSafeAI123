const messageInput = document.getElementById("message");
const analyzeButton = document.getElementById("analyzeBtn");

analyzeButton.addEventListener("click", async () => {

```
const message = messageInput.value.trim();

if (!message) {
    alert("Please enter a message to analyze.");
    return;
}

analyzeButton.disabled = true;
analyzeButton.textContent = "Analyzing...";

try {

    const response = await fetch(
        "https://cybersafeai.onrender.com/analyze",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Something went wrong."
        );
    }

    document.getElementById("threat").textContent =
        data.threat || "Unknown";

    document.getElementById("type").textContent =
        data.type || "Unknown";

    document.getElementById("explanation").textContent =
        data.explanation || "No explanation available.";

    document.getElementById("advice").textContent =
        data.advice || "No advice available.";

} catch (error) {

    console.error(error);

    alert(
        "Unable to connect to CyberSafeAI. Please try again."
    );

} finally {

    analyzeButton.disabled = false;
    analyzeButton.textContent = "Analyze Message";
}
```

});
