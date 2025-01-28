const ctx = document.getElementById('climateChart').getContext('2d');
const climateChart = new Chart(ctx, {
    type: 'line', // Line chart for temperature changes
    data: {
        labels: ['2010', '2015', '2020', '2025'],
        datasets: [{
            label: 'Global Temperature Rise (°C)',
            data: [0.8, 1.0, 1.2, 1.4],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: 'Year' }
            },
            y: {
                title: { display: true, text: 'Temperature Rise (°C)' }
            }
        }
    }
});