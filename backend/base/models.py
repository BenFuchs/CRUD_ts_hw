from django.db import models

# Create your models here.
class Cars(models.Model):
    year = models.IntegerField()
    color = models.CharField(max_length=10)
    brand = models.CharField(max_length=10)