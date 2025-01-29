from django.shortcuts import render
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


def fetch_temperature_data(request):
    """Fetches real-time climate data for a given city and determines if it's at risk."""
    API_KEY = "47a6cc6d907164de60f86c3476008383"  # Replace with your OpenWeatherMap API key
    city = request.GET.get('city', '').strip()  # Retrieve and clean the city name
    if not city:
        return JsonResponse({'status': 'error', 'message': 'Please provide a valid city name.'})

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    try:
        # Send the API request
        response = requests.get(url)
        data = response.json()

        # Check for valid response
        if response.status_code == 200:
            # Extract climate data
            climate_data = {
                'city': data['name'],
                'temperature': data['main']['temp'],
                'humidity': data['main']['humidity'],
                'pressure': data['main']['pressure'],
            }

            # Determine if the city is "At Risk" based on certain climate thresholds
            # Example: arbitrarily setting 'at risk' if temperature > 35°C or humidity > 80%
            if climate_data['temperature'] > 35 or climate_data['humidity'] > 80:
                risk_status = "At Risk"
            else:
                risk_status = "Not at Risk"

            # Include the risk status in the response data
            climate_data['risk_status'] = risk_status

            return JsonResponse({'status': 'success', 'data': climate_data})
        else:
            # Handle API errors gracefully
            return JsonResponse({
                'status': 'error',
                'message': data.get('message', 'City not found!')
            })

    except requests.exceptions.RequestException as error:
        # Handle network or request-related issues
        return JsonResponse({'status': 'error', 'message': f"API request failed: {str(error)}"})