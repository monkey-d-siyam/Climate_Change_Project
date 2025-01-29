document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed."); // Debug message to confirm DOM is ready

    const fetchButton = document.getElementById('fetch-data-btn');
    const riskMessage = document.getElementById('risk-message');
    const ctx = document.getElementById('temperatureChart');

    if (!fetchButton || !ctx || !riskMessage) {
        console.error("Required DOM elements are missing!");
        return;
    }

    fetchButton.addEventListener('click', () => {
        console.log("Button clicked!"); // Debug message

        const city = document.getElementById('city-input').value.trim();
        if (!city) {
            // Handle case where city input is empty
            console.log("No city provided.");
            riskMessage.textContent = "Please enter a valid city name.";
            riskMessage.style.color = 'red';
            riskMessage.style.display = 'block';
            return;
        }

        // Clear previous messages
        riskMessage.textContent = "";
        riskMessage.style.display = 'none';

        console.log("Fetching data for city:", city); // Debug message

        // Fetch data from backend
        fetch(`/api/temperature/?city=${city}`)
            .then(response => {
                console.log("Response received:", response);

                // Check HTTP response status
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                console.log("Parsed API data:", data); // Log parsed response data

                if (data.status === 'success') {
                    // SUCCESS: Update chart and display message
                    updateChart(data.data);
                    const riskStatus = data.data.risk_status;
                    riskMessage.textContent = `The city of ${data.data.city} is ${riskStatus} for climate change.`;
                    riskMessage.style.color = (riskStatus === 'At Risk') ? 'red' : 'green';
                    riskMessage.style.display = 'block';
                } else {
                    // API returned an error; fail silently.
                    console.error("Backend Error:", data.message);
                }
            })
            .catch(error => {
                // Catch network or fetch-related errors but fail silently
                console.error("Fetch error:", error);
            });
    });

    let temperatureChart = null;

    function updateChart(climateData) {
        const ctx = document.getElementById('temperatureChart').getContext('2d');

        console.log("Updating chart with data:", climateData); // Debug message

        if (temperatureChart) {
            temperatureChart.destroy();
        }

        temperatureChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Temperature (°C)', 'Humidity (%)', 'Pressure (hPa)'],
                datasets: [{
                    label: `Climate Data for ${climateData.city}`,
                    data: [climateData.temperature, climateData.humidity, climateData.pressure],
                    backgroundColor: ['#007bff', '#28a745', '#ffc107'], // Colors for each bar
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensure chart resizes well
                plugins: {
                    title: {
                        display: true,
                        text: 'Climate Metrics',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, // Ensure Y-axis starts at zero
                    }
                }
            }
        });
    }
});