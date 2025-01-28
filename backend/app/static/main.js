document.addEventListener("DOMContentLoaded", async () => {
    // Fetch climate data from the API
    const response = await fetch('/api/data/');
    const climateData = await response.json();

    // Process data for visualization
    const labels = climateData.map(data => data.year);
    const temperatures = climateData.map(data => data.average_temperature);

    // Create a line chart
    const ctx = document.getElementById('climateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Temperature Rise',
                data: temperatures,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        }
    });
});