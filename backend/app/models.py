from django.db import models


class ClimateData(models.Model):
    region = models.CharField(max_length=100)
    year = models.IntegerField()
    average_temperature = models.FloatField()
    carbon_emission = models.FloatField()

    def __str__(self):
        return f"{self.region} - {self.year}"


from django.db import models


class EducationalResource(models.Model):
    CATEGORY_CHOICES = [
        ('causes', 'Causes'),
        ('effects', 'Effects'),
        ('solutions', 'Solutions'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    resource_url = models.URLField(blank=True, null=True)  # For links to videos or external resources
    resource_file = models.FileField(upload_to='resources/', blank=True,
                                     null=True)  # Local files like PDFs or infographics

    def __str__(self):
        return self.title

from django.db import models

class ClimateAction(models.Model):
    ENTITY_TYPE_CHOICES = [
        ('country', 'Country'),
        ('organization', 'Organization'),
        ('individual', 'Individual'),
    ]

    name = models.CharField(max_length=255)
    entity_type = models.CharField(max_length=15, choices=ENTITY_TYPE_CHOICES)
    progress_percentage = models.PositiveIntegerField()
    target = models.TextField()
    source = models.URLField()
    latitude = models.FloatField(default=0.0)  # Add default latitude
    longitude = models.FloatField(default=0.0)  # Add default longitude

    def badge(self):  # Achievement logic
        if self.progress_percentage >= 100:
            return "Gold Badge"
        elif self.progress_percentage >= 75:
            return "Silver Badge"
        elif self.progress_percentage >= 50:
            return "Bronze Badge"
        return None