from rest_framework import serializers # This is important
from .models import Todo, Post, Profile, VerificationKey, TrainingGroup, EventRegistration
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')

class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'content', 'id', 'organizeremail', 'sport', 'location', 'coach', 'starts', 'starts1',
                  'ends1', 'date', 'stringdate', 'city', 'stringtime', 'stringtime2', 'organizername', 'price',
                  'registration_limit', 'registrations_made', 'group', 'group_id', 'short_date', 'send_registrations')


class EventRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventRegistration
        fields = ('event', 'profile', 'time_registered', 'event_time', 'event_date')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('token', 'bio', 'name', 'email', 'sport', 'location', 'image', 'username', 'is_coach',
                  'is_athlete', 'groups')


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        try:
            email=attrs.get('email', )
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                uidb64 = urlsafe_base64_encode(user.id)
                token = PasswordResetTokenGenerator().make_token(user)

            return attrs
        except:
            pass
        return super().validate(attrs)


class VerificationKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationKey
        fields = ('useremail', 'token', 'verified', 'finished')


class TrainingGroupSerializer(serializers.ModelSerializer):
    requesting_users = ProfileSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingGroup
        fields = ('id', 'coach', 'users', 'name', 'sport', 'description', 'image', 'requesting_users', 'location',
                  'coach_name')