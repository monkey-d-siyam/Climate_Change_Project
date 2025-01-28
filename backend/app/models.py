from django.db import models


class ClimateData(models.Model):
    region = models.CharField(max_length=100)
    year = models.IntegerField()
    average_temperature = models.FloatField()
    carbon_emission = models.FloatField()

    def __str__(self):
        return f"{self.region} - {self.year}"