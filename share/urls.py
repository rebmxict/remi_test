from django.urls import path
from .api import ShareAPI, ShareVoteAPI

urlpatterns = [
	path('api/share', ShareAPI.as_view()),
	path('api/share/vote', ShareVoteAPI.as_view())
]