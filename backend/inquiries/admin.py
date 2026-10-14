from django.contrib import admin
from .models import ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "service_type", "budget_range", "is_read", "created_at")
    list_filter = ("is_read", "service_type", "created_at")
    search_fields = ("full_name", "email", "message")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)
