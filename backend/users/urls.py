from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views


urlpatterns = [
    path('login/', views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.UserRegisterView.as_view(), name="auth_register"), 
    path('validate/', views.VerifyView.as_view(), name="validate_token"),
    path('users/', views.UserListView.as_view(), name="users_list"),
    path('users/<int:pk>', views.UserDetailsView.as_view(), name="users_details"),
]
