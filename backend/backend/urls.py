from django.contrib import admin
from django.urls import path, include

# https://stackoverflow.com/questions/62877088/how-to-decode-and-verify-simple-jwt-django-rest-framework-token

urlpatterns = [
    path('admin/', admin.site.urls),

    path("stores/", include("stores.urls")), 
    path("auth/", include("users.urls")),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]
