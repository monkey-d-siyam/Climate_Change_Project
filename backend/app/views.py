from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ClimateData
from .serializers import ClimateDataSerializer


class ClimateDataAPIView(APIView):
    def get(self, request):
        data = ClimateData.objects.all()
        serializer = ClimateDataSerializer(data, many=True)
        return Response(serializer.data)


from django.shortcuts import render


def HomePageView(request):
    return render(request, "index.html")  # Render the frontend file
