from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('store_register', views.store_register, name="store_register")
]