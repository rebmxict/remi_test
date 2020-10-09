from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Movie, Vote
import json

# Create your tests here.
class MovieTest(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='test_user_name', email='test_user@test.com', password='test_password')
		self.movie = Movie.objects.create(owner=self.user, link='testlink', description="testdescription")
		self.client = APIClient()
		self.client.force_authenticate(user=self.user)

	def test_movie(self):
		# GET 'api/share'
		response = self.client.get(
			'http://localhost:8000/api/share'
		)
		res = response.content.decode('ASCII')
		self.assertTrue(type(res) is str)

		# POST 'api/share'
		response = self.client.post(
			'http://localhost:8000/api/share',
			data=json.dumps({"link": "testlink", "description": "testdescription"}),
			content_type='application/json'
		)
		self.assertEqual(response.status_code, 200)

class VoteTest(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='test_user_name', email='test_user@test.com', password='test_password')
		self.movie = Movie.objects.create(owner=self.user, link='testlink', description="testdescription")
		self.client = APIClient()
		self.client.force_authenticate(user=self.user)

	def test_vote(self):
		# POST 'api/share/vote'
		response = self.client.post(
			'http://localhost:8000/api/share/vote',
			data=json.dumps({"movie_id": 1, "like": 1, "dislike": 0}),
			content_type='application/json'
		)
		self.assertEqual(response.status_code, 200)