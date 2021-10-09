# Generated by Django 3.2.6 on 2021-09-28 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_pending', models.BooleanField(default=True)),
                ('is_active', models.BooleanField(default=False)),
                ('starting_datetime', models.DateTimeField(blank=True)),
                ('ending_datetime', models.DateTimeField(blank=True)),
                ('time_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=1024)),
                ('rating', models.IntegerField(choices=[(1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five')])),
                ('time_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Favourite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('address', models.CharField(max_length=1024)),
                ('phone_number', models.CharField(max_length=15)),
                ('images_url', models.CharField(max_length=10000)),
                ('price_range', models.IntegerField(choices=[(3, 'Expensive'), (2, 'Average'), (1, 'Cheap')])),
                ('opening_time', models.TimeField()),
                ('closing_time', models.TimeField()),
                ('max_clients', models.IntegerField(default=0)),
                ('time_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]