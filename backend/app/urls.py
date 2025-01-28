from django.urls import path
from .views import ClimateDataAPIView, HomePageView

urlpatterns = [
    path("", HomePageView, name="home"),  # Route for the home page
    path("api/data/", ClimateDataAPIView.as_view(), name="climate-data-api"),
]
