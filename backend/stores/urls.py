from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

router.register(r"bookings", views.Bookings, basename="bookings")
router.register(r"comments", views.Comments, basename="comments")
router.register(r"favourites", views.Favourites, basename="favourites")
router.register(r"posts", views.Posts, basename="posts")
router.register(r"", views.Stores, basename="stores")

urlpatterns = router.urls