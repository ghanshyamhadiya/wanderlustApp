function checkStrength(password) {
    let strength = 0;
    const output = document.getElementById("strength");

    

    // Criteria for strength
    if (password.length > 0) strength += 10; // At least 1 character
    if (password.length >= 8) strength += 20; // 8+ characters
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase
    if (/[0-9]/.test(password)) strength += 20; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 30; // Special characters

    // Update display based on strength score
    if (strength <= 20) {
        output.textContent = "Weak";
        output.className = "weak";
    } else if (strength <= 50) {
        output.textContent = "Medium";
        output.className = "medium";
    } else {
        output.textContent = "Strong";
        output.className = "strong";
    }
}