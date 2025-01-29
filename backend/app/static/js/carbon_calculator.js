document.getElementById('calculate-btn').addEventListener('click', () => {
    // Fetch user inputs
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const heating = parseFloat(document.getElementById('heating').value) || 0;
    const carTravel = parseFloat(document.getElementById('car-travel').value) || 0;
    const publicTransport = parseFloat(document.getElementById('public-transport').value) || 0;
    const airTravel = parseFloat(document.getElementById('air-travel').value) || 0;
    const diet = document.getElementById('diet').value;
    const waste = parseFloat(document.getElementById('waste').value) || 0;

    try {
        console.log('User inputs:', { electricity, heating, carTravel, publicTransport, airTravel, diet, waste });

        // Initialize footprint categories
        const categories = {
            energy: 0,
            transportation: 0,
            diet: 0,
            waste: 0,
        };

        // Accurate multipliers for carbon emissions
        categories.energy += electricity * 0.233; // kg CO2 per kWh
        categories.energy += heating * 0.204; // kg CO2 per kWh

        categories.transportation += carTravel * 2.31 * 52; // kg CO2 per km, yearly
        categories.transportation += publicTransport * 0.105 * 52; // kg CO2 per km, yearly
        categories.transportation += airTravel * 90; // kg CO2 per flight hour

        if (diet === 'omnivore') {
            categories.diet += 2200; // kg CO2 yearly for omnivores
        } else if (diet === 'vegetarian') {
            categories.diet += 1500; // kg CO2 yearly for vegetarians
        } else if (diet === 'vegan') {
            categories.diet += 1000; // kg CO2 yearly for vegans
        }

        categories.waste += waste * 52 * 0.28; // kg CO2 per kg of waste annually

        // Calculate total footprint
        const totalFootprint = Object.values(categories).reduce((total, value) => total + value, 0);

        console.log('Categories:', categories);
        console.log('Total Footprint:', totalFootprint);

        // Ensure results section is visible
        const resultsSection = document.getElementById('results-section');
        resultsSection.style.display = 'block';

        // Chart section
        const carbonChartCanvas = document.getElementById('carbonChart').getContext('2d');

        // Destroy any existing chart instance
        if (window.carbonChart) {
            window.carbonChart.destroy();
        }

        // Create a new chart
        window.carbonChart = new Chart(carbonChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Energy', 'Transportation', 'Diet', 'Waste'],
                datasets: [{
                    label: 'Carbon Footprint Distribution',
                    data: [
                        categories.energy,
                        categories.transportation,
                        categories.diet,
                        categories.waste
                    ],
                    backgroundColor: [
                        'rgba(244, 162, 97, 0.85)', // Orange
                        'rgba(0, 123, 255, 0.85)', // Blue
                        'rgba(42, 157, 143, 0.85)', // Green
                        'rgba(231, 111, 81, 0.85)', // Red
                    ],
                    hoverBackgroundColor: [
                        'rgba(244, 162, 97, 1)',
                        'rgba(0, 123, 255, 1)',
                        'rgba(42, 157, 143, 1)',
                        'rgba(231, 111, 81, 1)',
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                            },
                            color: '#ffffff',
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw.toFixed(2);
                                return `${context.label}: ${value} kg CO2 (${((value / totalFootprint) * 100).toFixed(1)}%)`;
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: `Your Total Carbon Footprint: ${totalFootprint.toFixed(2)} kg CO2 per year`,
                        font: {
                            size: 16,
                        },
                        color: '#ffffff',
                    }
                },
            }
        });

        const tipsSection = document.getElementById('tips-section');
        tipsSection.innerHTML = `
            <h3>How to Reduce Your Carbon Footprint:</h3>
            <ul>
                <li>${categories.energy > 1000 ? 'Switch to renewable energy sources like solar or wind power.' : ''}</li>
                <li>${categories.transportation > 2000 ? 'Consider carpooling, using public transport, or cycling for short distances.' : ''}</li>
                <li>${categories.diet > 1500 ? 'Try reducing meat consumption and opt for plant-based meals.' : ''}</li>
                <li>${categories.waste > 300 ? 'Reduce, reuse, and recycle waste materials to minimize landfill emissions.' : ''}</li>
            </ul>
        `.trim();
    } catch (error) {
        console.error('Error calculating carbon footprint:', error);
        alert('An error occurred while calculating your carbon footprint. Check the console for more details.');
    }
});