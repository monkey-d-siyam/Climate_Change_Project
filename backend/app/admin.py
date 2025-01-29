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


from django.contrib import admin
from .models import ClimateAction


@admin.register(ClimateAction)
class ClimateActionAdmin(admin.ModelAdmin):
    list_display = ('name', 'entity_type', 'progress_percentage', 'source')
    list_filter = ('entity_type',)
    search_fields = ('name', 'target')