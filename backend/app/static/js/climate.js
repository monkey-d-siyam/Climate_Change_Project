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
                if (data.status === 'success') {
                    updateMultiAxisChart(data.data);
                    const riskStatus = data.data.risk_status;
                    riskMessage.textContent = `The city of ${data.data.city} is ${riskStatus} for climate change.`;
                    riskMessage.style.color = riskStatus === 'At Risk' ? 'red' : 'green';
                    riskMessage.style.display = 'block';
                } else {
                    errorMessage.textContent = data.message;
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
                        text: `Climate Metrics for ${climateData.city}`, // Dynamic Title
                        font: {
                            size: 18,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (tooltipItem) {
                                const datasetLabel = tooltipItem.dataset.label || '';
                                const value = tooltipItem.raw;
                                return `${datasetLabel}: ${value}`;
                            },
                        },
                    },
                    legend: {
                        display: true, // Show the legend
                        position: 'top',
                        labels: {
                            font: {
                                size: 12,
                            },
                        },
                    },
                },
                scales: {
                    // Left Y-axis for temperature and humidity
                    'y-left': {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperature (°C) & Humidity (%)',
                            font: {
                                size: 14,
                            },
                        },
                        ticks: {
                            stepSize: 10,
                        },
                        grid: {
                            drawOnChartArea: false, // Avoid overlapping grid lines
                        },
                    },
                    // Right Y-axis for pressure
                    'y-right': {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Pressure (hPa)',
                            font: {
                                size: 14,
                            },
                        },
                        ticks: {
                            stepSize: 100,
                        },
                        grid: {
                            drawOnChartArea: false, // Avoid overlapping grid lines
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Climate Metrics',
                            font: {
                                size: 14,
                            },
                        },
                    },
                },
            },
        });
    }
});