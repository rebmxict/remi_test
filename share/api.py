from share.models import Movie, Vote
from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.response import Response
from .serializers import MovieSerializer, VoteSerializer
from django.forms.models import model_to_dict
from datetime import datetime

class ShareAPI(generics.GenericAPIView):
	serializer_class = MovieSerializer

	def get(self, request):
		movies = Movie.objects.all()
		res_movies = []
		for movie in movies:
			elem_movie = model_to_dict(movie)
			elem_movie["voted"] = 0
			# if not request.user.is_anonymous:
			# 	vote = Vote.objects.filter(owner=request.user, movie=movie).first()
			# 	if vote:
			# 		elem_movie["voted"] = vote.vote
			elem_movie["shared_by"] = movie.owner.username
			elem_movie["created_at"] = movie.created_at
			res_movies.append(elem_movie)
		return Response({
			"movies": res_movies
		})

	def post(self, request, *args, **kwargs):
		permission_classes = [
			permissions.IsAuthenticated,
		]

		data = request.data
		movie = Movie(
			owner=request.user,
			link=data["link"],
			description=data["description"],
			like=0,
			dislike=0,
			created_at=int(datetime.now().timestamp())
		)
		movie.save()
		return Response(status=status.HTTP_200_OK)

class ShareVoteAPI(generics.GenericAPIView):
	serializer_class = MovieSerializer

	def post(self, request, *args, **kwargs):
		permission_classes = [
			permissions.IsAuthenticated,
		]

		data = request.data
		movie = Movie.objects.filter(id=data["movie_id"])[0]
		vote = Vote.objects.filter(owner=request.user, movie=movie)
		if not vote:
			movie.like = movie.like + data["like"]
			movie.dislike = movie.dislike + data["dislike"]
			movie.save()
			voted = 0
			if data["like"]:
				voted = 1
			if data["dislike"]:
				voted = -1
			vote = Vote(
				owner=request.user,
				movie=movie,
				vote=voted
			)
			vote.save()

		return Response(status=status.HTTP_200_OK)
