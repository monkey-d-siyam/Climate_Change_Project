from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('climate/', views.climate_page, name='climate'),
    path('api/temperature/', views.fetch_temperature_data, name='fetch_temperature_data'),
]
