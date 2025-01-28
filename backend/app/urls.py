from django.urls import path
from .views import HomePageView, ClimatePageView, AboutPageView

urlpatterns = [
    path("", HomePageView, name="home"),
    path("climate/", ClimatePageView, name="climate"),
    path("about/", AboutPageView, name="about"),
]
