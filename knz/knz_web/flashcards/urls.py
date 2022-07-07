from django.urls import path


from . import views

# from knz_web.flashcards.views import get_csrf

app_name = "flashcards"

urlpatterns = [
    path("", views.FlashcardsListView.as_view(), name="flashcards-list"),
    path("user/get_csrf", views.get_csrf, name="get_csrf"),
    path("user/login", views.login, name="login"),
    # path("user/logout", views.logout, name="logout"),
    # path("user/register", views.register, name="register"),
    path("user/return_user", views.ReturnUser.as_view(), name="return_user"),
]
