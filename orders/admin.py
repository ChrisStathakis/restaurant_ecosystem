from django.contrib import admin

from .models import Table


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ['title', 'status']
    list_filter = ['status']
    search_fields = ['title']
