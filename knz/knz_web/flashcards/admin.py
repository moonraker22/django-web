from django.contrib import admin
from .models import Flashcards, Category, Snippets, User_Frontend, Deck
from .forms import UserFrontendForm


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(Flashcards)
class FlashcardsAdmin(admin.ModelAdmin):
    list_display = ["user_frontend", "deck", "question", "answer", "category"]
    search_fields = ["deck"]


@admin.register(Snippets)
class SnippetsAdmin(admin.ModelAdmin):
    list_display = ["user_frontend", "snippet", "published", "category", "user"]
    search_fields = ["user"]


@admin.register(User_Frontend)
class User_FrontendAdmin(admin.ModelAdmin):
    form = UserFrontendForm
    list_display = ["name", "id", "email", "avatar_url"]
    search_fields = ["name"]


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]
