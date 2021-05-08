from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


# Create your views here.
def user_info(request):
    if request.user.is_authenticated:
        return render(request, 'users/user_info.html')
    else:
        return HttpResponseRedirect(reverse('users:login_view'))

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("users:user_info"))
        else:
            return render(request, "users/login.html", {
                "error_message": 'Invalid Credentials.'
            })

    return render(request, 'users/login.html')


def sign_out(request):
    logout(request)
    return render(request, 'users/login.html', {
        "message": 'Logged out.'
    })


def register_view(request):
    try:
        if request.method == "POST":
            username = request.POST["username"]
            first_name = request.POST["first_name"]
            last_name = request.POST["last_name"]
            password = request.POST["password"]
            email = request.POST["email"]
            user = User.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name, email=email)
            return render(request, 'users/login.html', {
                "message": 'Account created successfully. Please login with with the previously used credentials.'
            })
    except:
        return render(request, 'users/register_view.html', {
            "message": 'Error. Please try again.'
        })

    return render(request, 'users/register_view.html')
