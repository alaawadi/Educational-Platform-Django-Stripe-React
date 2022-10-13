from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()
