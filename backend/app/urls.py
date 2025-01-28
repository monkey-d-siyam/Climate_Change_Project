from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Home page
    path('about/', views.about, name='about'),  # About page
    path('climate-data/', views.climate_data, name='climate_data'),  # Climate Data page
]
