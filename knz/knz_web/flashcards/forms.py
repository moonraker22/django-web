import email
from django import forms
from .models import User_Frontend


class UserFrontendForm(forms.ModelForm):
    """
    Form for user frontend.
    """

    class Meta:
        model = User_Frontend
        fields = ("name", "email", "avatar_url", "password")
