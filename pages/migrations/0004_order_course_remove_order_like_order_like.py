# Generated by Django 4.0.5 on 2022-07-12 12:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_order_course_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='course',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='course', to='pages.course'),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='order',
            name='like',
        ),
        migrations.AddField(
            model_name='order',
            name='like',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='like11', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
