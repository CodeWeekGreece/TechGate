from django.urls import path, include
from . import views

app_name = 'users'
urlpatterns = [
    path('', views.user_info, name='user_info'),
    path('login', views.login_view, name='login_view'),
    path('register', views.register_view, name='register_view'),
    path('sign_out', views.sign_out, name='sign_out')
]