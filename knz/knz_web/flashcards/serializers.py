from rest_framework import serializers

from .models import Flashcards, Category


class FlashcardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcards
        fields = ("id", "deck", "question", "answer", "category", "user")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name",)
