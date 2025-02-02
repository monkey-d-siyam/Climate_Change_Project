from django.urls import path
from . import views
from .views import generate_story

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('climate/', views.climate_page, name='climate'),
    path('api/fetch-temperature-data/', views.fetch_temperature_data, name='fetch_temperature_data'),
    path('carbon-calculator/', views.carbon_calculator, name='carbon_calculator'),
    path('educational-resources/', views.educational_resources, name='educational_resources'),
    path('climate-action-tracker/', views.climate_action_tracker, name='climate_action_tracker.html'),
    path('api/climate-map-heatmap', views.climate_map_heatmap, name='climate_map_heatmap'),
    path('api/climate-map-geojson', views.climate_map_geojson, name='climate_map_geojson'),
    path('api/climate-map-details/', views.climate_map_details, name='climate_map_details'),
    path('story-generator/', views.story_generator_page, name='story_generator'),
    path("generate-story/", generate_story, name="generate_story"),
]