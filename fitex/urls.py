from .views import TrainingViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path
from .import views
from .views import (ProfileView, ProfileCreateView, ProfileListView, ProfileViewUpdate, ProfileViewPartialUpdate,
                    CoachProfileView, EventRegistrationsView, EventRegistrationsListView, VerificationKeyCreateView,
                    VerificationKeyRetrieve, VerificationKeyUpdate, VerificationKeyRetrieveByToken, ProfileViewByEmail,
                    VerificationKeyDelete, CoachTrainingsListView, TrainingsListView, TrainingUpdateView,
                    TrainingGroupCreateView, CoachTrainingGroupListView, TrainingGroupRetrieveView,
                    TrainingGroupDetailUpdate, UserStatusUpdate, UsersListView, TrainingGroupListView
                    )
router = DefaultRouter()
router.register(r'', TrainingViewSet, basename='trainings')
urlpatterns = router.urls

# from django.urls import path
#
# from .views import TrainingListView, TrainingDetailView, TrainingCreateView, TrainingUpdateView, TrainingDeleteView
#
# urlpatterns = [
#     path('', TrainingListView.as_view()),
#     path('create/', TrainingCreateView.as_view()),
#     path('<pk>/update/', TrainingUpdateView.as_view()),
#     path('<pk>/delete/', TrainingDeleteView.as_view()),
#     path('<pk>', TrainingDetailView.as_view()),
# ]

urlpatterns = [
    path('trainings', TrainingsListView.as_view()),
    path('groups', TrainingGroupListView.as_view()),
    path('training/update/<pk>', TrainingUpdateView.as_view()),
    path('add_user/<pk>', views.event_add_attendance, name='add-user'),
    path('send_account_verification/<pk>', views.send_verification_email, name='send-verif-email'),
    path('verificationkey/create', VerificationKeyCreateView.as_view()),
    path('verificationkey1/create', views.generate_and_send_verification_token),
    path('verificationkey/check/<pk>', views.check_user_verification_key),
    path('verificationkey/get/<pk>', VerificationKeyRetrieve.as_view()),
    path('verificationkey/update/<pk>', VerificationKeyUpdate.as_view()),
    path('verificationkeybytoken/get/<pk>', VerificationKeyRetrieveByToken.as_view()),
    path('verificationkey/delete/<pk>', VerificationKeyDelete.as_view()),
    path('<int:pk>/send', views.send),
    path('profile/create/', ProfileCreateView.as_view()),
    path('profiles/', ProfileListView.as_view()),
    path('profile/<pk>', ProfileView.as_view(), name='profile-detail'),
    path('profilebyemail/<pk>', ProfileViewByEmail.as_view(), name='profile-detail'),
    path('profile/<pk>/update', ProfileViewUpdate.as_view(), name='profile-update'),
    path('coachprofile/<pk>', CoachProfileView.as_view(), name='coachprofile-detail'),
    path('profile/<pk>/updatepartial', ProfileViewPartialUpdate.as_view(), name='profile-updatepartial'),
    path('eventregistrations/<pk>', EventRegistrationsView.as_view(), name='eventregistrations'),
    path('userregistrationslist/<pk>', EventRegistrationsListView.as_view(), name='userregistrations'),
    path('coachregistrations/<pk>', CoachTrainingsListView.as_view(), name='coachregistrations'),
    path('traininggroups/create', TrainingGroupCreateView.as_view()),
    path('traininggroups/<pk>', CoachTrainingGroupListView.as_view()),
    path('group/<pk>', TrainingGroupRetrieveView.as_view()),
    path('group/add_user_to_requesting/<pk>', views.group_add_user_to_requesting, name='add_user_to_requesting'),
    path('group/add_user/<pk>',  views.add_user_to_group, name='add_user_to_group'),
    path('group/update/<pk>', TrainingGroupDetailUpdate.as_view()),
    path('group/remove_user_from_requesting/<pk>',  views.remove_user_from_requesting,
         name='remove_user_from_requesting'),
    path('admin/login', views.admin_login, name='admin_login'),
    path('update_user/admin/<pk>', UserStatusUpdate.as_view()),
    path('users/admin', UsersListView.as_view())
]

urlpatterns += router.urls