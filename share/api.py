from share.models import Movie
from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.response import Response
from .serializers import MovieSerializer
from django.forms.models import model_to_dict
from datetime import datetime

class ShareAPI(generics.GenericAPIView):
	serializer_class = MovieSerializer

	def get(self, request):
		movies = Movie.objects.all()
		res_movies = []
		for movie in movies:
			elem_movie = model_to_dict(movie)
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
		if movie:
			movie.like = movie.like + data["like"]
			movie.dislike = movie.dislike + data["dislike"]
			movie.save()
		return Response(status=status.HTTP_200_OK)
