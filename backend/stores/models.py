from django.db import models
# from django.contrib.postgres.fields import ArrayField

from users.models import User


class Store(models.Model):
    """ Represents a physical store/shop/business in the database.

    - name: Name/title of the store. 
    - address: Address of the store.
    - phone_number: Phone number of the store.
    - images_url: URLs with the images of the store, should be split by commas (,).

    - owner: The owner of the business (represented as a User model).
    - admins: List of Users who have admin permissions to the Store. 
    - staff: List of Users that are the staff of the business.

    - price_range: Integer representation of the price range of the store for 
        front-end data (3 - expensive, 1 - cheap).

    - location: Coordinates of the shop given in a tuple (latitude, longitude). 

    - opening_time: The opening time of the physical store, no bookings should be
        made before the opening time.
    - closing_time: The closing time of the physical store, no bookings should be
        made after the closing time.

    - clients: The list of the User models that have active Booking models in the Store.
    - max_clients: An integer representing the maximum number of clients allowed inside a
        physical store.
    - clients_visited: The list of clients that have booked in the store saved as User models.

    - time_created: The date and time the Store was created.
    """

    name = models.CharField(max_length=64, blank=False)
    address = models.CharField(max_length=1024, blank=False)
    phone_number = models.CharField(max_length=15, blank=False)
    images_url = models.CharField(max_length=10000, blank=False)

    owner = models.ForeignKey(User, on_delete=models.PROTECT, related_name="stores_owned", blank=False) #
    admins = models.ManyToManyField(User, related_name="stores_managed", blank=True)
    staff = models.ManyToManyField(User, related_name="stores_working", blank=True)

    class PriceRange(models.IntegerChoices):
        EXPENSIVE = 3
        AVERAGE = 2
        CHEAP = 1

    price_range = models.IntegerField(choices=PriceRange.choices)

    location = models.CharField(max_length=100, blank=False)

    opening_time = models.TimeField()
    closing_time = models.TimeField()

    clients = models.ManyToManyField(User, blank=True, through="stores.Booking")
    max_clients = models.IntegerField(default=0)
    clients_visited = models.ManyToManyField(User, related_name="stores_visited", blank=True)

    time_created = models.DateTimeField(auto_now_add=True)

    # booking_shards = models.ManyToManyField("stores.BookingShard", blank=True)

    def __str__(self):
        return f"{self.name} ({self.id})"


class Booking(models.Model):
    """ Represents bookings made on stores by user/clients (User model) of the page.

    - user: The User who made the booking.
    - store: The Store where the booking is placed.
    - is_pending: If the user has booked a datetime for the future.
    - is_active: If the user is currently in the store booked.
    - date_booked: The date and time of the booking.
    - time_created: The date and time the Booking was created.
    """

    client = models.ForeignKey(User, on_delete=models.PROTECT, related_name="user_bookings", blank=False) #
    store = models.ForeignKey(Store, on_delete=models.PROTECT, related_name="store_bookings", blank=False) #

    is_pending = models.BooleanField(default=True)
    is_active = models.BooleanField(default=False)

    # format: OSI 8601
    # https://en.wikipedia.org/wiki/ISO_8601
    starting_datetime = models.DateTimeField(auto_now_add=False, blank=True)
    ending_datetime = models.DateTimeField(auto_now_add=False, blank=True)
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client} -> {self.store} ({self.starting_datetime} - {self.ending_datetime})"


# class BookingShard(models.Model):
#     """ Saves the booking "shards" of each Store and has a bookings per shard counter. """

#     related_store = models.ForeignKey(Store, on_delete=models.PROTECT, related_name="related_shard", blank=True)
#     number_of_bookings = models.IntegerField()
#     start = models.CharField(max_length=25)
#     end = models.CharField(max_length=25)

#     def __str__(self):
#         return f"{self.start} - {self.end} ({self.number_of_bookings})"


class Post(models.Model):
    store = models.ForeignKey(Store, related_name="store_posts", blank=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    image_url = models.CharField(max_length=10000)
    description = models.CharField(max_length=100)


class Comment(models.Model):
    """ Represents the comments/reviews made by users/clients (User model) in stores (Store model).

    - author: The User who made the Comment.
    - commented_store: The Store in which the Comment was made.
    - content: The written description of the User review.
    - rating: An integer represenation of the rating of the user (1 - lowest, 5 - highest).
    - time_created: The date and time the Comment was created.
    """

    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name="user_comments", null=False) # 
    commented_store = models.ForeignKey(Store, on_delete=models.PROTECT, related_name="store_comments", null=False) # 
    content = models.CharField(max_length=1024, blank=False)

    class RatingRange(models.IntegerChoices):
        ONE = 1
        TWO = 2
        THREE = 3
        FOUR = 4
        FIVE = 5

    rating = models.IntegerField(choices=RatingRange.choices)
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} -> {self.commented_store}"


class Favourite(models.Model):
    """ Represents the relationship between the user/client and the liked store/business/shop (to be shown
        in a favourites page).

    - user: The User who has added a Store in favourites.
    - store: The Store that has been added to favourites.
    - time_created: The date and time the Favourite object was created.
    """

    client = models.ForeignKey(User, on_delete=models.PROTECT, related_name="user_favourites", null=False) #
    store = models.ForeignKey(Store, on_delete=models.PROTECT, related_name="store_in_favourites", null=False) #
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} -> {self.store} ({self.id})"
