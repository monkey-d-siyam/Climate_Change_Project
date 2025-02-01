document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");

    const fetchButton = document.getElementById('fetch-data-btn');
    const riskMessage = document.getElementById('risk-message');
    const ctx = document.getElementById('temperatureChart');
    const errorMessage = document.getElementById('error-message');

    if (!fetchButton || !ctx || !riskMessage) {
        console.error("Required DOM elements are missing!");
        return;
    }

    fetchButton.addEventListener('click', () => {
        console.log("Button clicked!");

        const city = document.getElementById('city-input').value.trim();
        if (!city) {
            console.log("No city provided.");
            riskMessage.textContent = "Please enter a valid city name.";
            riskMessage.style.color = 'red';
            riskMessage.style.display = 'block';
            return;
        }

        // Clear previous messages
        riskMessage.textContent = "";
        riskMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        console.log("Fetching data for city:", city);

        // Fetch data
        fetch(`/api/fetch-temperature-data?city=${city}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("API Response:", data);

                if (data.status === 'success') {
                    updateMultiAxisChart(data.data);

                    const cityName = data.data.city;
                    const riskStatus = data.data.risk_status;
                    const riskDetails = data.data.risk_details || "No details provided.";
                    const suggestions = data.data.suggestions || "No suggestions available.";

                    // Display risk message with explanations and suggestions
                    console.log("Preparing to inject message...");
                    if (riskStatus === 'At Risk') {
                        riskMessage.innerHTML = `
                            <strong>The city of ${cityName} is ${riskStatus} for climate change.</strong>
                            <p><b>Reason:</b> ${riskDetails}</p>
                            <p><b>Suggestions:</b> ${suggestions}</p>
                        `;
                        console.log("Generated At Risk message:", riskMessage.innerHTML); // Debug final content

                        riskMessage.style.color = 'red';
                        riskMessage.style.backgroundColor = '#ffe6e6';
                    } else {
                        riskMessage.innerHTML = `
                            <strong>The city of ${cityName} is ${riskStatus} for climate change.</strong>
                            <p><b>Reason:</b> ${riskDetails}</p>
                        `;
                        console.log("Generated Not At Risk message:", riskMessage.innerHTML); // Debug final content

                        riskMessage.style.color = 'green';
                        riskMessage.style.backgroundColor = '#e6ffe6';
                    }
                    riskMessage.style.display = 'block';
                } else {
                    errorMessage.textContent = data.message || "Unable to retrieve data.";
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                errorMessage.textContent = "An error occurred while fetching the data. Please try again later.";
                errorMessage.style.display = 'block';
            });
    });

    let climateChart = null;

    function updateMultiAxisChart(climateData) {
        const ctx = document.getElementById('temperatureChart').getContext('2d');

        if (climateChart) {
            climateChart.destroy(); // Destroy the old chart if it exists
        }

        climateChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Temperature', 'Humidity', 'Pressure'], // Labels
                datasets: [
                    {
                        label: 'Temperature (°C)', // Temperature dataset
                        data: [climateData.temperature],
                        borderColor: '#ff6384',
                        backgroundColor: '#ff638480', // Semi-transparent red
                        yAxisID: 'y-left', // Map to left Y-axis
                    },
                    {
                        label: 'Humidity (%)', // Humidity dataset
                        data: [climateData.humidity],
                        borderColor: '#36a2eb',
                        backgroundColor: '#36a2eb80', // Semi-transparent blue
                        yAxisID: 'y-left', // Map to left Y-axis
                    },
                    {
                        label: 'Pressure (hPa)', // Pressure dataset
                        data: [climateData.pressure],
                        borderColor: '#ffcd56',
                        backgroundColor: '#ffcd5680', // Semi-transparent yellow
                        yAxisID: 'y-right', // Map to right Y-axis
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Climate Metrics for ${climateData.city}`,
                        font: {
                            size: 18,
                        },
                    },
                },
                scales: {
                    'y-left': {
                        type: 'linear',
                        position: 'left',
                    },
                    'y-right': {
                        type: 'linear',
                        position: 'right',
                    },
                },
            },
        });
    }
});