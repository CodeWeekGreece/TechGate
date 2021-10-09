from django.contrib import admin
from .models import Comment, Favourite, Post, Store, Booking


admin.site.register(Store)
admin.site.register(Comment)
admin.site.register(Booking)
admin.site.register(Favourite)
admin.site.register(Post)
# admin.site.register(BookingShard)
