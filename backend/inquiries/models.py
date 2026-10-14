from django.db import models


class ContactInquiry(models.Model):
    """
    Stores contact messages and project quote inquiries from potential clients.
    """
    full_name = models.CharField(max_length=150, help_text="Ad Soyad")
    email = models.EmailField(help_text="E-posta Adresi")
    service_type = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Talep Edilen Hizmet Türü",
    )
    budget_range = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Bütçe Aralığı",
    )
    message = models.TextField(help_text="Proje Detayları / İletişim Mesajı")
    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
        help_text="Gönderim Tarihi",
    )
    is_read = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Okundu olarak işaretlendi mi?",
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Inquiry"
        verbose_name_plural = "Contact Inquiries"

    def __str__(self) -> str:
        return f"{self.full_name} ({self.email}) - {self.service_type or 'General'}"
