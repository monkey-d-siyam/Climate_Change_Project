import requests
from django.http import JsonResponse


# Home Page
def index(request):
    return render(request, 'index.html')


# About Page
def about(request):
    return render(request, 'about.html')


# View to render the climate page
def climate_page(request):
    return render(request, 'climate.html')


# View to render the Carbon Footprint Calculator page
def carbon_calculator(request):
    return render(request, 'carbon_calculator.html')


def fetch_temperature_data(request):
    """
    Fetches real-time climate data for a given city and determines if it's at risk.
    """
    API_KEY = "47a6cc6d907164de60f86c3476008383"  # Replace with your valid OpenWeatherMap API key
    city = request.GET.get('city', '').strip()

    # Validate if a city name is provided
    if not city:
        return JsonResponse({'status': 'error', 'message': 'Please provide a valid city name.'})

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    try:
        # Make the API request to OpenWeatherMap
        response = requests.get(url)
        data = response.json()

        if response.status_code == 200:
            # Extract relevant climate data
            climate_data = {
                'city': data['name'],
                'temperature': data['main']['temp'],
                'humidity': data['main']['humidity'],
                'pressure': data['main']['pressure'],
            }

            # Determine risk status based on thresholds
            if climate_data['temperature'] > 35 or climate_data['humidity'] > 80:
                risk_status = "At Risk"
            else:
                risk_status = "Not at Risk"

            # Include risk status in the response
            climate_data['risk_status'] = risk_status

            return JsonResponse({'status': 'success', 'data': climate_data})
        else:
            # Handle errors from the OpenWeatherMap API
            return JsonResponse({
                'status': 'error',
                'message': data.get('message', 'City not found!')
            })

    except requests.exceptions.RequestException as error:
        # Handle network/request-related issues
        return JsonResponse({'status': 'error', 'message': f"API request failed: {str(error)}"})

from .models import EducationalResource


def educational_resources(request):
    # Get query parameters for search and category filtering
    query = request.GET.get('q', '')
    category_filter = request.GET.get('category', '')

    # Filter resources by query and category
    resources = EducationalResource.objects.all()
    if query:
        resources = resources.filter(title__icontains=query)
    if category_filter:
        resources = resources.filter(category=category_filter)

    # Pass data to the template
    return render(request, 'educational_resources.html', {
        'resources': resources,
        'query': query,
        'category_filter': category_filter,
    })

from django.shortcuts import render
from .models import ClimateAction


def climate_action_tracker(request):
    # Fetch all ClimateAction data
    entity_filter = request.GET.get('entity', '')  # Get filter from the request
    if entity_filter:
        actions = ClimateAction.objects.filter(entity_type=entity_filter).order_by('-progress_percentage')
    else:
        actions = ClimateAction.objects.all().order_by('-progress_percentage')

    # Render page with actions and filter
    return render(request, 'climate_action_tracker.html', {
        'actions': actions,
        'entity_filter': entity_filter,
    })

from django.http import JsonResponse

def climate_map_heatmap(request):
    """
    Provides heatmap data for a given metric and year.
    """
    metric = request.GET.get('metric')
    year = request.GET.get('year', 2023)  # Default to 2023 if no year is provided

    # Example mock data (Add logic to query actual data based on metric and year)
    mock_data = {
        "2023": [
            {"lat": 37.7749, "lng": -122.4194, "value": 200},  # San Francisco
            {"lat": 34.0522, "lng": -118.2437, "value": 400},  # Los Angeles
        ],
        "2022": [
            {"lat": 40.7128, "lng": -74.0060, "value": 300},  # New York
            {"lat": 51.5074, "lng": -0.1278, "value": 150},  # London
        ]
    }

    data = {"points": mock_data.get(str(year), [])}
    return JsonResponse(data)

def climate_map_geojson(request):
    """
    Provides GeoJSON data for selected metric and year.
    """
    metric = request.GET.get('metric')
    year = request.GET.get('year', 2023)

    mock_geojson = {
        "2023": {...},  # Replace with actual GeoJSON for 2023
        "2022": {...},  # Replace with actual GeoJSON for 2022
    }

    return JsonResponse(mock_geojson.get(str(year), {}))

def climate_map_details(request):
    """
    Provides details about the selected metric and year.
    """
    metric = request.GET.get('metric')
    year = request.GET.get('year', 2023)

    # Mock details data based on metric and year
    mock_details = {
        "co2_emissions": {
            "metricName": "CO₂ Emissions",
            "description": "CO₂ emissions refer to the release of carbon dioxide into the atmosphere, typically through industrial processes, deforestation, and burning fossil fuels.",
            "insights": "Global CO₂ emissions increased by 2.5% in 2023 compared to 2022.",
        },
        "renewable_energy": {
            "metricName": "Renewable Energy",
            "description": "Renewable energy comes from natural sources like sunlight, wind, and water, which are replenished naturally over short periods.",
            "insights": "Renewable energy contributed 20% of the global energy mix in 2023, up from 18% in 2022.",
        },
        "deforestation": {
            "metricName": "Deforestation Rates",
            "description": "Deforestation is the permanent removal of trees to make room for something besides forest, like agriculture or infrastructure.",
            "insights": "Deforestation rates decreased by 5% globally in 2023 due to improved conservation efforts.",
        },
        "climate_policies": {
            "metricName": "Impact of Climate Policies",
            "description": "This metric tracks how effective regulatory policies are in mitigating climate change by reducing emissions or promoting sustainability.",
            "insights": "The Paris Agreement compliance rate improved significantly in 2023.",
        },
    }

    details = mock_details.get(metric, {})
    return JsonResponse(details)