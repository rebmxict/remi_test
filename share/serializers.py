from rest_framework import serializers
from .models import Movie, Vote

class MovieSerializer(serializers.ModelSerializer):
	class Meta:
		model = Movie
		fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Vote
		fields = '__all__'