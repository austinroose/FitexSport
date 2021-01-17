from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import GoogleLoginView, FacebookLoginView
import fitex

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('fitex.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('rest-auth/facebook/', FacebookLoginView.as_view(), name='facebook_login'),
]