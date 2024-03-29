# Generated by Django 4.1.4 on 2023-01-10 13:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fakenews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='article',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='fakenews.newsprediction'),
        ),
        migrations.AlterField(
            model_name='comments',
            name='commentor',
            field=models.ForeignKey(blank=True, default='Guest', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='commentor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='comments',
            name='text',
            field=models.CharField(blank=True, default=None, max_length=600, null=True),
        ),
    ]
