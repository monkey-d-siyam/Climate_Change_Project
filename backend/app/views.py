from django.shortcuts import render


def HomePageView(request):
    return render(request, "index.html")


def ClimatePageView(request):
    return render(request, "climate.html")


def AboutPageView(request):
    return render(request, "about.html")
