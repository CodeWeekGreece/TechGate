import datetime as dt
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from .models import Post, Store, Booking, Comment, Favourite
from users.models import User

from users.serializers import UserSerializer


class StoreSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(default=serializers.CurrentUserDefault(), read_only=True)
    admins = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    staff = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Store
        fields = ["id", "name", "owner", "admins", "staff", 
                  "images_url", "address", "phone_number", "time_created",
                  "price_range", "max_clients", "opening_time", "closing_time", 
                  "location"]


class BookingSerializer(serializers.ModelSerializer):
    class UserForeignKeyField(serializers.PrimaryKeyRelatedField):
        def to_internal_value(self, email):
            return self.queryset

        def to_representation(self, value):
            value = super().to_representation(value)
            user = User.objects.get(pk=value)
            return UserSerializer(user).data

    class StoreForeignKeyField(serializers.PrimaryKeyRelatedField):
        def get_queryset(self):
            return self.queryset

        def to_representation(self, value):
            value = super().to_representation(value)
            store = Store.objects.get(pk=value)
            return StoreSerializer(store).data

    client = UserForeignKeyField(queryset=serializers.CurrentUserDefault(), required=False)
    store = StoreForeignKeyField(queryset=Store.objects.all())

    class Meta:
        model = Booking
        fields = ["id", "client", "store", "starting_datetime", "ending_datetime"]

    def create(self, validated_data):
        print(validated_data)
        return Booking.objects.create(**validated_data)


class CommentSerializer(serializers.ModelSerializer):
    class UserForeignKeyField(serializers.PrimaryKeyRelatedField):
        def get_queryset(self):
            return self.queryset

        def to_representation(self, value):
            value = super().to_representation(value)
            user = User.objects.get(pk=value)
            return UserSerializer(user).data

    author = UserForeignKeyField(queryset=serializers.CurrentUserDefault(), required=False)
    commented_store = serializers.PrimaryKeyRelatedField(queryset=Store.objects.all(), many=False)

    class Meta:
        model = Comment
        fields = ["id", "author", "commented_store", "time_created", "content", "rating"]


class FavouriteSerializer(serializers.ModelSerializer):
    class UserForeignKeyField(serializers.PrimaryKeyRelatedField):
        def to_internal_value(self, email):
            return self.queryset

        def to_representation(self, value):
            value = super().to_representation(value)
            user = User.objects.get(pk=value)
            return UserSerializer(user).data

    class StoreForeignKeyField(serializers.PrimaryKeyRelatedField):
        def get_queryset(self):
            return self.queryset

        def to_representation(self, value):
            value = super().to_representation(value)
            store = Store.objects.get(pk=value)
            return StoreSerializer(store).data

    client = UserForeignKeyField(queryset=serializers.CurrentUserDefault(), required=False)
    store = StoreForeignKeyField(queryset=Store.objects.all())

    class Meta:
        model = Favourite
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

