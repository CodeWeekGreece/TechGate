# Generated by Django 3.2.6 on 2021-09-28 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0004_alter_store_booking_shards'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='booking_shards',
            field=models.JSONField(default=list),
        ),
    ]
