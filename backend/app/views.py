from django.shortcuts import render


# Home Page
def index(request):
    return render(request, 'index.html')


# About Page
def about(request):
    return render(request, 'about.html')


# Climate Data Page
def climate_data(request):
    return render(request, 'climate_data.html')