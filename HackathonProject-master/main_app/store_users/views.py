from django.shortcuts import render


# Create your views here.
def store_register(request):
    return render(request, "store_users/store_register.html")