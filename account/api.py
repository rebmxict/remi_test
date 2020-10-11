from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .tokens import account_activation_token
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
import json

# Get User API
class UserAPI(generics.RetrieveAPIView):

	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		if self.request.user:
			userData = UserSerializer(self.request.user, context=self.get_serializer_context()).data
		else:
			userData = None
		return userData

# Register API
class RegisterAPI(generics.GenericAPIView):

	serializer_class = RegisterSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()

		token = AuthToken.objects.create(user)
		if token.__class__.__name__ == 'tuple':
			token = token[1]
		return Response({
			'user': UserSerializer(user, context=self.get_serializer_context()).data,
			'token': token
		})

# Login API
class LoginAPI(generics.GenericAPIView):

	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data

		token = AuthToken.objects.create(user)
		if token.__class__.__name__ == 'tuple':
			token = token[1]
		return Response({
			'user': UserSerializer(user, context=self.get_serializer_context()).data,
			'token': token
		})
