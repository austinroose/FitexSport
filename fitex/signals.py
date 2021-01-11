from django.contrib.auth.models import User
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

from .models import Profile

# every time new user is created, it will create profile for them


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        curr_token = Token.objects.get(key=instance)
        username = curr_token.user
        user_obj = User.objects.get(username=username)
        profile_first_name = user_obj.first_name
        profile_last_name = user_obj.last_name
        profile_email = user_obj.email
        profile_fullname = profile_first_name + ' ' + profile_last_name

        Profile.objects.create(token=instance, name=profile_fullname, email=profile_email, username=username)


post_save.connect(create_user_profile, sender=Token)