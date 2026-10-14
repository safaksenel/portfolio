from typing import Optional
from pydantic import EmailStr, Field
from ninja import Schema


class ContactInquiryIn(Schema):
    full_name: str = Field(..., min_length=2, max_length=150, description="Ad Soyad")
    email: EmailStr = Field(..., description="Geçerli e-posta adresi")
    service_type: str = Field(default="", max_length=100, description="Hizmet türü")
    budget_range: str = Field(default="", max_length=100, description="Bütçe aralığı")
    message: str = Field(..., min_length=10, max_length=5000, description="Proje detayları veya mesaj")
    # Honeypot field: genuine users never fill this, bots do
    honeypot: Optional[str] = Field(default="", description="Bot koruma alanı (boş bırakılmalıdır)")


class ContactInquiryResponse(Schema):
    success: bool
    message: str
