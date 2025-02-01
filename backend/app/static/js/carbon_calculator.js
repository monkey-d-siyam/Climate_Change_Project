async function calculateCarbonFootprint(activities) {
    try {
        const response = await fetch("/calculate-carbon/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ activities }),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error || "Failed to calculate carbon footprint.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

// Event listener for the Calculate button
document.getElementById("calculate-carbon-btn").addEventListener("click", async (event) => {
    event.preventDefault();

    const driving = parseFloat(document.getElementById("driving").value) || 0;
    const meatConsumption = parseInt(document.getElementById("meat-consumption").value) || 0;
    const electricity = parseFloat(document.getElementById("electricity").value) || 0;
    const recycling = parseInt(document.getElementById("recycling").value) || 0;
    const publicTransport = parseFloat(document.getElementById("public-transport").value) || 0;

    // Build activities object
    const activities = {
        driving,
        meat_consumption: meatConsumption,
        electricity,
        recycling,
        public_transport: publicTransport,
    };

    try {
        // Call the backend to calculate carbon footprint
        const result = await calculateCarbonFootprint(activities);

        // Display the results in the output section
        document.getElementById("carbon-output").innerHTML = `
            <h3>Total Emissions: ${result.total_emissions} kg CO2</h3>
            <ul>
                ${result.breakdown.map(item => `
                    <li>${item.activity} (${item.value}): ${item.emissions} kg CO2</li>
                `).join("")}
            </ul>
        `;
        document.getElementById("carbon-output").style.display = "block";
    } catch (error) {
        alert(error.message);
    }
});