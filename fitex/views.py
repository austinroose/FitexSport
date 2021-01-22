from rest_framework import viewsets
from .serializers import TodoSerializer
from django.views import View
import os
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
from templated_email import send_templated_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend, filters
from rest_framework import permissions
from rest_framework.permissions import IsAdminUser
import django_filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework import generics
from rest_framework.authtoken.models import Token
import json
from django.db.models import F
from django.http import HttpResponse, HttpRequest, HttpResponseNotFound
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.core.mail import send_mail
from inspect import getmembers
from pprint import pprint

from django.contrib.auth.models import User

from .models import Post, EventRegistration, Profile, VerificationKey, TrainingGroup, Todo
from .serializers import (TrainingSerializer, ProfileSerializer, ResetPasswordEmailRequestSerializer,
                          EventRegistrationSerializer, VerificationKeySerializer, TrainingGroupSerializer)

from django.views.decorators.csrf import csrf_exempt

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


class CoachTrainingCreatePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.META['HTTP_AUTHORIZATION']
        print('TokeN', token)
        user = Profile.objects.get(pk=token)
        coach = user.is_coach
        return coach


class TrainingViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingSerializer
    queryset = Post.objects.all()


# from rest_framework.generics import (
#     ListAPIView,
#     RetrieveAPIView,
#     CreateAPIView,
#     DestroyAPIView,
#     UpdateAPIView,
# )


from rest_framework.permissions import IsAdminUser


# class TrainingListView(ListAPIView):
#     queryset = Post.objects.all()
#     serializer_class = TrainingSerializer
#
#
# class TrainingDetailView(RetrieveAPIView):
#     queryset = Post.objects.all()
#     serializer_class = TrainingSerializer
#
#
# class TrainingCreateView(CreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = TrainingSerializer
#     permission_classes = [IsAdminUser]
#
#
# class TrainingUpdateView(UpdateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = TrainingSerializer
#
#
# class TrainingDeleteView(DestroyAPIView):
#     queryset = Post.objects.all()
#     serializer_class = TrainingSerializer

@csrf_exempt
def event_add_attendance(request, pk):
    print('request method', request.method)
    if request.method == "POST":
        data = json.loads(request.body)
        print(data['pk'], data['profile'])
        trainingtitle = data['trainingtitle']
        trainingdate = data['trainingdate']
        training_starttime = data['training_start_time']
        training_endtime = data['training_end_time']
        training_sport = data['training_sport']
        event_time = data['eventtime']
        event_date = data['eventdate']
        registration_time = data['registration_time']
        name = data['name']
        email = data['email']
        organizeremail = data['organizeremail']
        profilePK = data['profile']
        profile = Profile.objects.get(pk=profilePK)
        pk = data['pk']
        training = Post.objects.get(pk=pk)
        print('Saadud treening', training)
        training.registrations_made = F('registrations_made') + 1
        training.save()
        training.add_user_to_list_of_attendees(profile=profile, pk=training.pk, event_time=event_time,
                                               event_date=event_date)
        send_templated_mail(
            template_name='welcome',
            from_email='fitexsport.info@gmail.com',
            recipient_list=[organizeremail],
            context={
                'email': email,
                'name': name,
                'trainingtitle': trainingtitle,
                'trainingsdate': trainingdate,
                'training_starttime': training_starttime,
                'training_endtime': training_endtime,
                'registrationtime': registration_time,
                'sport': training_sport,
            },
        )
        return HttpResponse(status=200)


@csrf_exempt
def group_add_user_to_requesting(request, pk):
    if request.method == "POST":
        data = json.loads(request.body)
        group_id = data['groupID']
        group = TrainingGroup.objects.get(pk=group_id)
        profile_id = data['token']
        profile = Profile.objects.get(pk=profile_id)
        group.add_user_to_requesting(profile)
        return redirect('/api/')


@csrf_exempt
def add_user_to_group(request, pk):
    if request.method == "POST":
        data = json.loads(request.body)
        group_id = data['groupID']
        group = TrainingGroup.objects.get(pk=group_id)
        profile_id = data['token']
        profile = Profile.objects.get(pk=profile_id)
        group.add_user_to_group(profile)
        profile.add_group(group)
        group.members_count = F('members_count') + 1
        return redirect('/api')


@csrf_exempt
def remove_user_from_requesting(request, pk):
    if request.method == "POST":
        data = json.loads(request.body)
        group_id = data['groupID']
        group = TrainingGroup.objects.get(pk=group_id)
        profile_id = data['token']
        profile = Profile.objects.get(pk=profile_id)
        group.remove_user_from_requesting(profile)
        return redirect('/api/')


@csrf_exempt
def send_verification_email(request, pk):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data['email']
        username = data['username']
        token = data['token']
        send_templated_mail(
            template_name='verification',
            from_email='fitexsport.info@gmail.com',
            recipient_list=[email],
            context={
                'token': token,
                'username': username,
            },
        )
        return redirect('/api')


def event_cancel_attendance(request, pk):
    this_event = Post.objects.get(pk=pk)
    this_event.remove_user_from_list_of_attendees(user=request.user, pk=this_event.pk)
    return redirect('/' + str(this_event.pk))


@csrf_exempt
def send(request, pk):
    if request.method == "POST":
        data = json.loads(request.body)
        trainingtitle = data['trainingtitle']
        name = data['name']
        email = data['email']
        organizeremail = data['organizeremail']
        send_templated_mail(
            template_name='welcome',
            from_email='fitexsport.info@gmail.com',
            recipient_list=[organizeremail],
            context={
                'email': email,
                'name': name,
                'trainingtitle': trainingtitle,
            },
        )
    return redirect('/api/')


@csrf_exempt
def admin_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data['token']
        user = Profile.objects.get(pk=token)
        is_admin = user.is_admin
        print('is_admin', is_admin)
        if is_admin:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)


class ProfileCreateView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'token'
    lookup_url_kwarg = 'pk'


class ProfileViewByEmail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'email'
    lookup_url_kwarg = 'pk'

# check if logged in user is connected to profile that he/she tries to update


class UserProfileUpdatePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print('kwargs', obj.token)
        token = request.META['HTTP_AUTHORIZATION']
        object_token = obj.token
        if token is not None and token == object_token:
            return True
        else:
            return False


class ProfileViewUpdate(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'token'
    lookup_url_kwarg = 'pk'
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    permission_classes = [UserProfileUpdatePermission]


class ProfileViewPartialUpdate(APIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)

    def patch(self, request, *args, **kwargs):
        serializer = ProfileSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)


class CoachProfileView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'
    lookup_url_kwarg = 'pk'


class EventRegistrationsView(generics.ListAPIView):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer

    def get_queryset(self):
        eventid = self.kwargs['pk']
        return EventRegistration.objects.filter(event=eventid)


class EventRegistrationsListView(generics.ListAPIView):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer

    def get_queryset(self):
        userid = self.kwargs['pk']
        return EventRegistration.objects.filter(profile=userid)

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'event_date': ['gte', 'lte']}


class VerificationKeyCreateView(generics.CreateAPIView):
    queryset = VerificationKey.objects.all()
    serializer_class = VerificationKeySerializer


class VerificationKeyRetrieve(generics.RetrieveAPIView):
    queryset = VerificationKey.objects.all()
    serializer_class = VerificationKeySerializer

    lookup_field = 'useremail'
    lookup_url_kwarg = 'pk'


class VerificationKeyRetrieveByToken(generics.RetrieveAPIView):
    queryset = VerificationKey.objects.all()
    serializer_class = VerificationKeySerializer

    lookup_field = 'token'
    lookup_url_kwarg = 'pk'


class VerificationKeyUpdate(generics.UpdateAPIView):
    queryset = VerificationKey.objects.all()
    serializer_class = VerificationKeySerializer
    lookup_field = 'token'
    lookup_url_kwarg = 'pk'


class VerificationKeyDelete(generics.DestroyAPIView):
    queryset = VerificationKey.objects.all()
    serializer_class = VerificationKeySerializer
    lookup_field = 'useremail'
    lookup_url_kwarg = 'pk'


class CoachTrainingsListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = TrainingSerializer

    def get_queryset(self):
        coachid = self.kwargs['pk']
        return Post.objects.filter(coach=coachid)


class TrainingListResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

# TrainingsList is trainings list that user sees


class TrainingsListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = TrainingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'stringdate': ['gte'], 'sport': ['exact'], 'city': ['exact'], 'stringtime2': ['exact'],
                        'organizername': ['exact'], 'group_id': ['exact'], 'group': ['exact'], 'coach': ['exact']}
    pagination_class = TrainingListResultsPagination


class TrainingUpdateView(generics.GenericAPIView, UpdateModelMixin):
    queryset = Post.objects.all()
    serializer_class = TrainingSerializer

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class TrainingGroupCreateView(generics.CreateAPIView):
    queryset = TrainingGroup.objects.all()
    serializer_class = TrainingGroupSerializer


class CoachTrainingGroupListView(generics.ListAPIView):
    queryset = TrainingGroup.objects.all()
    serializer_class = TrainingGroupSerializer

    def get_queryset(self):
        coachtoken = self.kwargs['pk']
        return TrainingGroup.objects.filter(coach=coachtoken)


class TrainingGroupRetrieveView(generics.RetrieveAPIView):
    queryset = TrainingGroup.objects.all()
    serializer_class = TrainingGroupSerializer

    lookup_field = 'id'
    lookup_url_kwarg = 'pk'


class TrainingGroupDetailUpdate(generics.UpdateAPIView):
    queryset = TrainingGroup.objects.all()
    serializer_class = TrainingGroupSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'pk'
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)


class TrainingGroupListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class TrainingGroupListView(generics.ListAPIView):
    queryset = TrainingGroup.objects.all()
    serializer_class = TrainingGroupSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'sport': ['exact'], 'location': ['exact'], 'coach_name': ['exact'], 'name': ['exact']}
    pagination_class = TrainingGroupListPagination


class GroupMemberRetrieve(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    lookup_field = 'token'
    lookup_url_kwarg = 'pk'


class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.META['HTTP_AUTHORIZATION']
        print('TokeN', token)
        user = Profile.objects.get(pk=token)
        admin = user.is_admin
        return admin


class UserListResultsPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10000


class UsersListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AdminPermission]  # allows only admins to access users list
    filter_backends = [DjangoFilterBackend]

    pagination_class = UserListResultsPagination

    filterset_fields = {'email': ['exact'], 'is_coach': ['exact'], 'is_athlete': ['exact']}


class UserStatusUpdate(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AdminPermission]

    lookup_field = 'token'
    lookup_url_kwarg = 'pk'

