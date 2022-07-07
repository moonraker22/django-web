from django.urls import path, include

from knz_web.users.views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
    # MyTokenObtainPairView,
    # create_user,
)


app_name = "users"
urlpatterns = [
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    # path("api/custom_token/", view=MyTokenObtainPairView.as_view(), name="custom_token"),
    # path("api/user_create/", view=create_user, name="create_user"),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
]
