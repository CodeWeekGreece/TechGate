from rest_framework import generics, serializers, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import MyTokenObtainPairSerializer, UserRegisterSerializer, VerifySerializer, UserSerializer
from .models import User, Verify


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class VerifyView(generics.ListAPIView):
    queryset = Verify.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = VerifySerializer

    def get(self, request):
        if request.user != None:
            serializer = UserSerializer(request.user)
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        # DRF handles exception


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "email", "first_name", "last_name"]


class UserDetailsView(generics.RetrieveAPIView):
    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(UserDetailsView, self).__init__(*args, **kwargs)

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def partial_update(self, request, pk=None):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
