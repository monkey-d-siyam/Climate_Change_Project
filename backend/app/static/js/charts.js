// Function to render the Carbon Footprint Breakdown Chart
function renderCarbonGraph(breakdown) {
    // Get the canvas context for the graph
    const ctx = document.getElementById('carbon-graph').getContext('2d');
    
    // Prepare data for the chart from the breakdown
    const activityLabels = breakdown.map(item => item.activity); // Activity names
    const activityEmissions = breakdown.map(item => item.emissions); // Emissions per activity

    // Create the chart using Chart.js
    const carbonChart = new Chart(ctx, {
        type: 'bar', // Using bar chart to show the breakdown
        data: {
            labels: activityLabels, // Labels from activities (e.g., Driving, Electricity, etc.)
            datasets: [{
                label: 'Carbon Emissions (kg CO₂)',
                data: activityEmissions, // Corresponding emission values
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',  // Different colors for visualization
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1 // Border width for bars
            }]
        },
        options: {
            responsive: true, // Ensures charts look good on any screen size
            plugins: {
                title: {
                    display: true, // Title for the chart
                    text: 'Carbon Footprint Breakdown',
                    font: {
                        size: 18
                    },
                    color: '#fff'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} kg CO₂`;
                        }
                    }
                },
                legend: {
                    display: false // Hide legend since there's only one dataset
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Activities',
                        color: '#ccc'
                    },
                    ticks: {
                        color: '#fff'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Emissions (kg CO₂)',
                        color: '#ccc'
                    },
                    ticks: {
                        beginAtZero: true, // Start chart at 0
                        color: '#fff'
                    }
                }
            }
        }
    });
}