from django.db import models
from django_extensions.db.models import TimeStampedModel
from knz_web.users.models import User


class User_Frontend(models.Model):
    id = models.IntegerField(primary_key=True, db_index=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    avatar_url = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "User_Frontend"

    def __str__(self):
        return self.name


class Category(models.Model):
    # PYTHON = "python"
    # HTML = "html"
    # JAVA = "java"
    # JAVASCRIPT = "javascript"
    # CSS = "css"
    # SQL = "sql"
    # GO = "go"
    # OTHER = "other"
    # C_LAUNGUAGE = "c_language"
    # C_PLUS_PLUS = "c_plus_plus"
    # CHOICES = [
    #     ("Python", "Python"),
    #     ("C", "C"),
    #     ("C++", "C++"),
    #     ("Java", "Java"),
    #     ("JavaScript", "JavaScript"),
    #     ("HTML", "HTML"),
    #     ("CSS", "CSS"),
    #     ("SQL", "SQL"),
    #     ("GO", "GO"),
    #     ("Other", "Other"),
    # ]
    name = models.CharField(max_length=255)  # choices=CHOICES)#

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Deck(TimeStampedModel, models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Decks"

    def __str__(self):
        return self.name


class Flashcards(TimeStampedModel, models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.DO_NOTHING, related_name="deck_flashcards", blank=True, null=True)
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    published = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, related_name="category_flashcards")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_flashcards", blank=True, null=True)
    user_frontend = models.ForeignKey(
        User_Frontend, on_delete=models.CASCADE, related_name="user_frontend_flashcards", blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Flashcards"

    def __str__(self):
        return f"{self.user_frontend} - {self.deck} - {self.question}"


class Snippets(TimeStampedModel, models.Model):
    snippet = models.TextField()
    published = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_snippets", blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, related_name="category_snippets")
    user_frontend = models.ForeignKey(
        User_Frontend, on_delete=models.CASCADE, related_name="user_frontend_snippets", blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Snippets"

    def __str__(self):
        return f"{self.user_frontend}, {self.category}"
