# Generated by Django 3.2.6 on 2021-10-01 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0007_auto_20210928_2139'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='location',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='store',
            name='booking_shards',
            field=models.ManyToManyField(blank=True, to='stores.BookingShard'),
        ),
    ]