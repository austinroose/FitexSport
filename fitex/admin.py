from django.contrib import admin
from .models import Todo, Profile, EventRegistration, VerificationKey, TrainingGroup, Post


myModels = [Post, Profile, EventRegistration, VerificationKey, TrainingGroup, Todo]
admin.site.register(myModels)
