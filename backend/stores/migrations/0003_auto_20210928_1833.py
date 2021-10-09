# Generated by Django 3.2.6 on 2021-09-28 15:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stores', '0002_auto_20210928_1503'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='booking_shards',
            field=models.JSONField(default='{}'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='user_bookings', to='users.user'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='store_bookings', to='stores.store'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='user_comments', to='users.user'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='commented_store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='store_comments', to='stores.store'),
        ),
        migrations.AlterField(
            model_name='favourite',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='user_favourites', to='users.user'),
        ),
        migrations.AlterField(
            model_name='favourite',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='store_in_favourites', to='stores.store'),
        ),
        migrations.AlterField(
            model_name='store',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='stores_owned', to='users.user'),
        ),
    ]