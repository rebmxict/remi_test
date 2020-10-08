from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Movie(models.Model):
	owner = models.ForeignKey(
		User, related_name="movie", on_delete=models.CASCADE, null=True)
	link = models.CharField(max_length=1000)
	description = models.CharField(max_length=2000)
	like = models.IntegerField(default=0)
	dislike = models.IntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)
