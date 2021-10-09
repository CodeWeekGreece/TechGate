from sys import breakpointhook
from rest_framework import permissions, viewsets, status, filters
from rest_framework.response import Response

from .models import Store, Booking, Comment, Favourite, Post
from .serializers import CommentSerializer, PostSerializer, StoreSerializer, BookingSerializer, FavouriteSerializer


class Stores(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StoreSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    filterset_fields = ["id", "name", "address", "phone_number", "closing_time", "opening_time"]

    def get_queryset(self):
        return Store.objects.all()

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(owner=request.user)

    # Get user input from kwargs
    # def get_object(self, queryset=None, **kwargs):
    #     pk = self.kwargs.get("pk")
    #     return generics.get_object_or_404(Store, id=pk)


class Bookings(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookingSerializer
    filterset_fields = ["id", "client", "store", "store__id", "starting_datetime", "ending_datetime"]

    def get_queryset(self):
        return Booking.objects.filter(client=self.request.user)

    def perform_create(self, serializer):
        print(serializer)
        request = serializer.context["request"]
        serializer.is_valid()
        serializer.save(client=request.user)

    # def create(self, request):
    #     breakpointhook()

    #     store = Store.objects.get(id=request.data["store"])
    #     shards = BookingShard.objects.filter(related_store=store)

    #     new_start = request.data["starting_datetime"][11:19]
    #     new_end = request.data["ending_datetime"][11:19]

    #     n = 0
    #                  # B1(3, 5)
    #     for shard in shards:
    #            # 4          3               4            5            5          3               5          3
    #         if new_start >= shard.start and new_start <= shard.end or new_end >= shard.start and new_end <= shard.end or shard.start >= new_start and shard.end <= new_end:
    #             if shard.number_of_bookings + 1 <= store.max_clients:
    #                 n += 1
    #                 if n == int(shards.count()):
    #                     li = [new_start, new_end, shard.start, shard.end]
    #                     li.sort()
    #                     BookingShard.objects.create(related_store=store, number_of_bookings=shard.number_of_bookings, start=li[0], end=li[1])
    #                     BookingShard.objects.create(related_store=store, number_of_bookings=shard.number_of_bookings + 1, start=li[1], end=li[2])
    #                     BookingShard.objects.create(related_store=store, number_of_bookings=shard.number_of_bookings, start=li[2], end=li[3])
    #                     shard.delete()
    #                     serializer = self.get_serializer(data=request.data)
    #                     self.perform_create(serializer)
    #                     headers = self.get_success_headers(serializer.data)
    #                     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    #             else:
    #                 return Response(status=status.HTTP_409_CONFLICT)

    #     if n != 0:
    #         return Response(status=status.HTTP_409_CONFLICT)

    #     BookingShard.objects.create(related_store=store, number_of_bookings=1, start=new_start, end=new_end)
    #     serializer = self.get_serializer(data=request.data)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class Comments(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer
    filterset_fields = ["id", "author", "author__id", "commented_store", "time_created", "content", "rating"]

    def get_queryset(self):
        return Comment.objects.all()

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(author=request.user)


class Favourites(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavouriteSerializer
    filterset_fields = ["id", "client", "store"]

    def get_queryset(self):
        return Favourite.objects.all()

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(client=request.user)


class Posts(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filterset_fields = "__all__"
