# Generated by Django 3.2.6 on 2021-09-28 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0002_auto_20210928_1503'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favourites',
            field=models.ManyToManyField(blank=True, related_name='stores_in_favourites', through='stores.Favourite', to='stores.Store'),
        ),
    ]