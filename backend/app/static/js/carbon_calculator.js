document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("carbon-form");
    const resultSection = document.getElementById("carbon-output");
    const totalEmissionsElement = document.getElementById("total-emissions");
    const feedbackElement = document.getElementById("feedback");

    // Handle the form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        // Extract input values (default to 0 if empty)
        const driving = parseFloat(document.getElementById("driving").value) || 0;
        const electricity = parseFloat(document.getElementById("electricity").value) || 0;
        const meatConsumption = parseFloat(document.getElementById("meat-consumption").value) || 0;
        const recycling = parseFloat(document.getElementById("recycling").value) || 0;
        const publicTransport = parseFloat(document.getElementById("public-transport").value) || 0;

        // Calculate emissions
        const emissions = {
            driving: driving * 0.21,           // 0.21 kg CO₂ per km
            electricity: electricity * 0.9,   // 0.9 kg CO₂ per kWh
            meatConsumption: meatConsumption * 3.3, // 3.3 kg CO₂ per meal
            recycling: recycling * -0.05,    // Recycling reduces CO₂
            publicTransport: publicTransport * 0.1 // 0.1 kg CO₂ per km
        };

        const totalEmissions = Object.values(emissions).reduce((sum, val) => sum + val, 0);

        // Display total emissions
        totalEmissionsElement.innerHTML = `
            <strong>Total CO<sub>2</sub> Emissions:</strong>
            <span style="font-size: 1.5em; color: #00a676;">${totalEmissions.toFixed(2)} kg CO₂</span>
        `;

        // Generate feedback
        let feedbackMessage = "";
        if (totalEmissions < 50) {
            feedbackMessage = `
                🌟 <strong>Excellent!</strong> Your emissions are impressively low. Keep it up!
                <ul>
                    <li>Continue using public transport and recycling.</li>
                    <li>Consider switching to renewable energy sources.</li>
                </ul>
            `;
        } else if (totalEmissions >= 50 && totalEmissions < 100) {
            feedbackMessage = `
                🌿 <strong>Good job!</strong> You are doing well but could cut down on emissions with small changes.
                <ul>
                    <li>Reduce meat consumption to 2-3 meals per week.</li>
                    <li>Switch to energy-efficient appliances.</li>
                    <li>Use public transport or carpool more often.</li>
                </ul>
            `;
        } else {
            feedbackMessage = `
                ❗ <strong>High Emissions</strong>: Consider steps like:
                <ul>
                    <li>Reduce driving by walking, biking, or carpooling.</li>
                    <li>Switch to a plant-based diet or reduce meat consumption.</li>
                    <li>Use energy-efficient appliances and turn off unused devices.</li>
                    <li>Recycle more and avoid single-use plastics.</li>
                </ul>
            `;
        }
        feedbackElement.innerHTML = feedbackMessage;

        // Show the result section
        resultSection.style.display = "block";
    });
});