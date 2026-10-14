"""
WSGI config for core project.
Compatible with standard WSGI servers and Vercel Python Serverless Runtime.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

application = get_wsgi_application()

# Alias for Vercel Python runtime discovery
app = application
