from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('climate/', views.climate_page, name='climate'),
    path('api/temperature/', views.fetch_temperature_data, name='fetch_temperature_data'),
    path('carbon-calculator/', views.carbon_calculator, name='carbon_calculator'),
    path('educational-resources/', views.educational_resources, name='educational_resources'),
    path('climate-action-tracker/', views.climate_action_tracker, name='climate_action_tracker.html'),
]
