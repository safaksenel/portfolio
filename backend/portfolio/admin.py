from django.contrib import admin
from .models import Project, Service


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_featured", "order", "created_at")
    list_filter = ("category", "is_featured")
    search_fields = ("title", "short_description", "problem_statement")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "-created_at")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "icon_name", "order")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order",)
