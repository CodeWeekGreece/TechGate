# Generated by Django 3.2.6 on 2021-09-28 18:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0006_alter_store_booking_shards'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='store',
            name='booking_shards',
        ),
        migrations.CreateModel(
            name='BookingShard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_of_bookings', models.IntegerField()),
                ('start', models.CharField(max_length=25)),
                ('end', models.CharField(max_length=25)),
                ('related_store', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='related_shard', to='stores.store')),
            ],
        ),
        migrations.AddField(
            model_name='store',
            name='booking_shards',
            field=models.ManyToManyField(to='stores.BookingShard'),
        ),
    ]