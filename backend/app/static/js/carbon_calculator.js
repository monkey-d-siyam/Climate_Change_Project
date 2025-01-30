document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-btn').addEventListener('click', () => {
        const electricity = parseFloat(document.getElementById('electricity').value) || 0;
        const heating = parseFloat(document.getElementById('heating').value) || 0;
        const carTravel = parseFloat(document.getElementById('car-travel').value) || 0;
        const publicTransport = parseFloat(document.getElementById('public-transport').value) || 0;
        const airTravel = parseFloat(document.getElementById('air-travel').value) || 0;
        const diet = document.getElementById('diet').value;
        const waste = parseFloat(document.getElementById('waste').value) || 0;

        try {
            console.log('User inputs:', { electricity, heating, carTravel, publicTransport, airTravel, diet, waste });

            const categories = {
                energy: electricity * 0.233 + heating * 0.204,
                transportation: carTravel * 2.31 * 52 + publicTransport * 0.105 * 52 + airTravel * 90,
                diet: diet === 'omnivore' ? 2200 : diet === 'vegetarian' ? 1500 : 1000,
                waste: waste * 52 * 0.28,
            };

            const totalFootprint = Object.values(categories).reduce((total, value) => total + value, 0);
            console.log('Categories:', categories);
            console.log('Total Footprint:', totalFootprint);

            const resultsSection = document.getElementById('results-section');
            if (!resultsSection) throw new Error("Results section not found");
            resultsSection.style.display = 'block';

            const carbonChartCanvas = document.getElementById('carbonChart').getContext('2d');
            if (window.carbonChart instanceof Chart) {
                window.carbonChart.destroy();
            }

            window.carbonChart = new Chart(carbonChartCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Energy', 'Transportation', 'Diet', 'Waste'],
                    datasets: [{
                        data: [
                            categories.energy,
                            categories.transportation,
                            categories.diet,
                            categories.waste
                        ],
                        backgroundColor: [
                            'rgba(244, 162, 97, 0.85)',
                            'rgba(0, 123, 255, 0.85)',
                            'rgba(42, 157, 143, 0.85)',
                            'rgba(231, 111, 81, 0.85)',
                        ],
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: `Total Carbon Footprint: ${totalFootprint.toFixed(2)} kg CO2`,
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error calculating carbon footprint:', error);
            alert('An error occurred while calculating your carbon footprint.');
        }
    });
});