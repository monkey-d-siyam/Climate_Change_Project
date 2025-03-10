import logging
from dotenv import load_dotenv

# Configure logging for debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()


import requests

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

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def calculate_carbon(request):
    if request.method == "POST":
        try:
            # Parse the JSON body from the request
            body = json.loads(request.body)
            activities = body.get("activities", {})

            # Perform calculations (dummy logic for now; replace with accurate logic)
            driving_emissions = activities.get("driving", 0) * 0.21
            meat_emissions = activities.get("meat_consumption", 0) * 1.5
            electricity_emissions = activities.get("electricity", 0) * 0.92
            recycling_emissions = activities.get("recycling", 0) * -0.05
            public_transport_emissions = activities.get("public_transport", 0) * 0.1

            total_emissions = (
                    driving_emissions +
                    meat_emissions +
                    electricity_emissions +
                    recycling_emissions +
                    public_transport_emissions
            )

            breakdown = [
                {"activity": "Driving", "value": activities.get("driving", 0), "emissions": driving_emissions},
                {"activity": "Meat Consumption", "value": activities.get("meat_consumption", 0),
                 "emissions": meat_emissions},
                {"activity": "Electricity", "value": activities.get("electricity", 0),
                 "emissions": electricity_emissions},
                {"activity": "Recycling", "value": activities.get("recycling", 0), "emissions": recycling_emissions},
                {"activity": "Public Transport", "value": activities.get("public_transport", 0),
                 "emissions": public_transport_emissions},
            ]

            # Return the results as JSON
            return JsonResponse({
                "total_emissions": round(total_emissions, 2),
                "breakdown": breakdown,
            })

        except (json.JSONDecodeError, KeyError) as e:
            return JsonResponse({"error": "Invalid input data."}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)


def fetch_temperature_data(request):
    """
    Fetches real-time climate data for a given city and determines if it's at risk.
    Also provides details on why it's at risk.
    """
    API_KEY = "47a6cc6d907164de60f86c3476008383"  # Replace with your secure API key
    city = request.GET.get('city', '').strip()

    if not city:
        return JsonResponse({'status': 'error', 'message': 'Please provide a valid city name.'})

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    try:
        # Make the API request
        response = requests.get(url)
        data = response.json()

        if response.status_code == 200:
            # Extract relevant data
            temperature = data['main']['temp']
            humidity = data['main']['humidity']
            pressure = data['main']['pressure']

            climate_data = {
                'city': data['name'],
                'temperature': temperature,
                'humidity': humidity,
                'pressure': pressure,
            }

            # Risk assessment
            if temperature > 35 or humidity > 80:
                risk_status = "At Risk"
                reasons = []

                if temperature > 35:
                    reasons.append(f"The temperature is {temperature}°C, which exceeds the safe threshold of 35°C.")

                if humidity > 80:
                    reasons.append(f"The humidity is {humidity}%, which is above the safe threshold of 80%.")

                risk_details = " ".join(reasons)
                suggestions = (
                    "Consider staying hydrated, avoiding outdoor activities during peak heat hours, and staying updated with weather alerts."
                )
            else:
                risk_status = "Not at Risk"
                risk_details = "The temperature and humidity levels are within the safe thresholds."
                suggestions = "No immediate action required. Continue monitoring weather conditions."

            # Add risk details and suggestions to the response
            climate_data['risk_status'] = risk_status
            climate_data['risk_details'] = risk_details
            climate_data['suggestions'] = suggestions

            return JsonResponse({'status': 'success', 'data': climate_data})
        else:
            # Handle errors from the API
            return JsonResponse({
                'status': 'error',
                'message': data.get('message', 'City not found!'),
            })

    except requests.exceptions.RequestException as error:
        return JsonResponse({'status': 'error', 'message': f"API request failed: {str(error)}"})

    def fetch_temperature_data(request):
        """
        Fetches real-time climate data for a given city and determines if it's at risk.
        Also provides details on why it's at risk.
        """
        API_KEY = "47a6cc6d907164de60f86c3476008383"  # Replace with your secure API key
        city = request.GET.get('city', '').strip()

        if not city:
            return JsonResponse({'status': 'error', 'message': 'Please provide a valid city name.'})

        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

        try:
            # Make the API request
            response = requests.get(url)
            data = response.json()

            if response.status_code == 200:
                # Extract relevant data
                temperature = data['main']['temp']
                humidity = data['main']['humidity']
                pressure = data['main']['pressure']

                climate_data = {
                    'city': data['name'],
                    'temperature': temperature,
                    'humidity': humidity,
                    'pressure': pressure,
                }

                # Risk assessment
                if temperature > 35 or humidity > 80:
                    risk_status = "At Risk"
                    reasons = []

                    if temperature > 35:
                        reasons.append(f"The temperature is {temperature}°C, which exceeds the safe threshold of 35°C.")

                    if humidity > 80:
                        reasons.append(f"The humidity is {humidity}%, which is above the safe threshold of 80%.")

                    risk_details = " ".join(reasons)
                    suggestions = (
                        "Consider staying hydrated, avoiding outdoor activities during peak heat hours, and staying updated with weather alerts."
                    )
                else:
                    risk_status = "Not at Risk"
                    risk_details = "The temperature and humidity levels are within the safe thresholds."
                    suggestions = "No immediate action required. Continue monitoring weather conditions."

                # Add risk details and suggestions to the response
                climate_data['risk_status'] = risk_status
                climate_data['risk_details'] = risk_details
                climate_data['suggestions'] = suggestions

                return JsonResponse({'status': 'success', 'data': climate_data})
            else:
                # Handle errors from the API
                return JsonResponse({
                    'status': 'error',
                    'message': data.get('message', 'City not found!'),
                })

        except requests.exceptions.RequestException as error:
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

# Story Generator Page
def story_generator_page(request):
    """
    Render the Climate Change Story Generator page.
    """
    return render(request, 'story_generator.html')


# Story Generator Logic
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging
from groq import Groq

logger = logging.getLogger(__name__)

@csrf_exempt
def generate_story(request):
    if request.method == "POST":
        try:
            # Parse user input from JSON body
            body = json.loads(request.body)
            user_actions = body.get("user_actions", "").strip()

            # Validate input
            if not user_actions or len(user_actions) < 5:
                return JsonResponse(
                    {"error": "Please describe your actions in more detail."},
                    status=400
                )

            # Fetch Groq API key from environment variable
            groq_api_key = os.getenv("GROQ_API_KEY")
            if not groq_api_key:
                logger.error("Groq API key is missing.")
                return JsonResponse(
                    {"error": "Internal Server Error: API Key missing."},
                    status=500
                )

            # Initialize Groq client
            client = Groq(api_key=groq_api_key)

            # Generate story using Groq API
            completion = client.chat.completions.create(
                model="llama3-70b-8192",  # Replace with the correct model name
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that generates inspiring stories about how climate actions shape the future."
                    },
                    {
                        "role": "user",
                        "content": f"Write an inspiring story about how these actions contribute to a sustainable future: {user_actions}"
                    }
                ],
                temperature=1.0,
                max_tokens=1024,
                top_p=1,
                stream=False,  # Set to False for a single response
                stop=None,
            )

            # Extract the generated story
            story = completion.choices[0].message.content

            # Return the story as JSON
            return JsonResponse({"story": story})

        except Exception as e:
            logger.exception("Unexpected error occurred.")
            return JsonResponse({"error": "An unexpected error occurred. Please try again later."}, status=500)

    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid request method"}, status=400)