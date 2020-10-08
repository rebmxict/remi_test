#!/usr/bin/python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from django.core import serializers as core_serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from .tokens import account_activation_token


# User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_active', 'is_superuser')


# Register Serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Check email duplication
        users = json.loads(core_serializers.serialize('json',
                           User.objects.all()))
        for user in users:
            if validated_data['email'] in user['fields']['email']:
                raise serializers.ValidationError('A EMAIL WITH THAT EMAIL ADDRESS ALREADY EXISTS.')

        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


# Login Serializer

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')
