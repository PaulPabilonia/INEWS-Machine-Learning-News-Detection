# Generated by Django 4.1.4 on 2023-01-22 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakenews', '0008_remove_sentiment_sentiment_nue'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='b_day',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='contact_no',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
