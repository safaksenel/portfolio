"""
ASGI config for core project.
Compatible with modern async ASGI servers and Python 3.14 event loops.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

application = get_asgi_application()
app = application
