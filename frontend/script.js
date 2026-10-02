function analyzeMessage() {

    let message = document.getElementById("message").value.toLowerCase();

    if (message.trim() === "") {
        document.getElementById("result").innerHTML =
            "⚠️ Please enter a message.";
        return;
    }

    let suspiciousWords = [
        "urgent",
        "click",
        "otp",
        "password",
        "won",
        "prize",
        "lottery",
        "verify",
        "bank",
        "account",
        "claim",
        "free"
    ];

    let foundWords = [];

    for (let word of suspiciousWords) {
        if (message.includes(word)) {
            foundWords.push(word);
        }
    }

    if (foundWords.length >= 3) {

        document.getElementById("result").innerHTML = `
            <h3>🚨 High Risk — Possible Phishing</h3>
            <p><b>Suspicious words detected:</b></p>
            <p>${foundWords.join(", ")}</p>
            <p>🛡️ Do not click links or share OTPs, passwords, or banking information.</p>
        `;

    } else if (foundWords.length > 0) {

        document.getElementById("result").innerHTML = `
            <h3>⚠️ Be Careful</h3>
            <p>Some suspicious signs were detected.</p>
            <p><b>Detected:</b> ${foundWords.join(", ")}</p>
            <p>🔍 Verify the sender before taking any action.</p>
        `;

    } else {

        document.getElementById("result").innerHTML = `
            <h3>🟢 No obvious phishing signs detected</h3>
            <p>However, always verify unexpected messages before clicking links or sharing personal information.</p>
        `;
    }
}