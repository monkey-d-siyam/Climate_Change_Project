from django.contrib import admin
from .models import ClimateData

admin.site.register(ClimateData)

from django.contrib import admin
from .models import EducationalResource


@admin.register(EducationalResource)
class EducationalResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'description')