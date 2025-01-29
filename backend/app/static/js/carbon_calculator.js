document.getElementById('calculate-btn').addEventListener('click', () => {
    // Fetch user inputs
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const heating = parseFloat(document.getElementById('heating').value) || 0;
    const carTravel = parseFloat(document.getElementById('car-travel').value) || 0;
    const publicTransport = parseFloat(document.getElementById('public-transport').value) || 0;
    const airTravel = parseFloat(document.getElementById('air-travel').value) || 0;
    const diet = document.getElementById('diet').value;
    const waste = parseFloat(document.getElementById('waste').value) || 0;

    // Calculate carbon footprint
    let footprint = 0;

    // Energy usage
    footprint += electricity * 0.233; // kg CO2 per kWh
    footprint += heating * 0.204; // kg CO2 per kWh

    // Transportation
    footprint += carTravel * 2.31; // kg CO2 per km
    footprint += publicTransport * 0.105; // kg CO2 per km
    footprint += airTravel * 90; // kg CO2 per hour

    // Diet
    if (diet === 'omnivore') {
        footprint += 2000;
    } else if (diet === 'vegetarian') {
        footprint += 1500;
    } else if (diet === 'vegan') {
        footprint += 1000;
    }

    // Waste
    footprint += waste * 52 * 0.28; // kg CO2 per kg of waste annually

    // Display results
    document.getElementById('results-section').style.display = 'block';
    const carbonChart = document.getElementById('carbonChart').getContext('2d');
    new Chart(carbonChart, {
        type: 'doughnut',
        data: {
            labels: ['Energy', 'Transportation', 'Diet', 'Waste'],
            datasets: [{
                label: 'Carbon Footprint',
                data: [electricity * 0.233 + heating * 0.204, (carTravel * 2.31) + (publicTransport * 0.105) + (airTravel * 90), (diet === 'omnivore' ? 2000 : diet === 'vegetarian' ? 1500 : 1000), waste * 52 * 0.28],
                backgroundColor: ['#f4a261', '#007bff', '#2a9d8f', '#e76f51'],
            }]
        },
    });

    document.getElementById('tips-section').innerHTML = `<p>To reduce your footprint, consider using public transit more often, switching to renewable energy, eating a plant-based diet, and reducing waste!</p>`;
});