import json

from django.shortcuts import render
from rest_framework import generics
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from . import models
from .models import Category, Flashcards
from .serializers import CategorySerializer, FlashcardsSerializer


class FlashcardsListView(generics.ListAPIView):
    queryset = Flashcards.objects.all()
    serializer_class = FlashcardsSerializer

    # def get_queryset(self):
    #     return Flashcards.objects.filter(user=self.request.user)


def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse({"info": "Username and Password required"}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"info": "User does not exist"}, status=400)

    login(request, user)
    return JsonResponse({"info": "User logged in successfully"})


class ReturnUser(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        print(request.user.username)
        return JsonResponse({"username": request.user.username, "id": request.user.id})
