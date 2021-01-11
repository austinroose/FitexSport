from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.urls import reverse

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
# Create your models here.

class Profile(models.Model):
    token = models.CharField('Token', default='1234a', max_length=100, primary_key=True)
    bio = models.CharField('Bio', max_length=100, default='cool')
    name = models.CharField('Nimi', max_length=100, default='...')
    location = models.CharField('Elukoht', max_length=25, default='puudub')
    email = models.EmailField('Email', max_length=254, default='')
    sport = models.CharField('Spordiala', max_length=15, default='jooks', choices=[('jooks', 'Jooksmine'),
                                                                                    ('jõud', 'Jõutreening'),
                                                                                    ('crossfit', 'Crossfit'),
                                                                                    ('kardio', 'Kardio'),
                                                                                    ('ratas', 'Ratas'),
                                                                                    ('ujumine', 'Ujumine'),
                                                                                    ('tennis', 'Tennis'),
                                                                                    ('suusatamine', 'Suusatamine'),
                                                                                    ('yoga', 'Yoga'),
                                                                                    ('muu', 'Muu'),
                                                                                    ])
    image = models.ImageField(default='profile.png', upload_to='profile_pics')
    username = models.CharField('Kasutajanimi', max_length=30, default='puudub')
    is_athlete = models.BooleanField(default=True)
    is_coach = models.BooleanField(default=False)
    groups = models.ManyToManyField('TrainingGroup', related_name='groups', related_query_name='groups', blank=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f'Profile for {self.token} '

    def get_absolute_url(self):
        return reverse('profile-detail', kwargs={'pk': self.token})

    def get_trainings(self):
        return Post.objects.filter(coach=self)

    def add_group(self, group):
        self.groups.add(group)


class Post(models.Model):
    title = models.CharField('Treeningu nimetus', max_length=100)
    content = models.TextField('Kirjeldus')
    price = models.CharField('Hind', null=True, blank=True, max_length=5)
    date_posted = models.DateTimeField(default=timezone.now)
    coach = models.ForeignKey(Profile, on_delete=models.CASCADE, default='no data')
    hardness_level = models.TextField(max_length=20, default='raske')
    location = models.CharField('Asukoht', max_length=150, default='')
    city = models.CharField('Linn/Asula', max_length=100, default='Muu', choices=[('Tartu', 'Tartu'),
                                                                                    ('Tallinn', 'Tallinn'),
                                                                                    ('Pärnu', 'Pärnu'),
                                                                                    ('Viljandi', 'Viljandi'),
                                                                                    ('Muu', 'Muu')
                                                                                    ])
    stringdate = models.CharField('JS string date', max_length=100, default='')
    organizeremail = models.EmailField('Organiseerija email', max_length=254, default='')
    organizername = models.CharField('Organiseerija nimi', max_length=50, default='')
    starts = models.DateTimeField('Algab', null=True, blank=True, default=timezone.now)
    ends = models.DateTimeField('Lõppeb', null=True, blank=True, default=timezone.now)
    starts1 = models.CharField('alg', default='12:00', max_length=50)
    ends1 = models.CharField('lõpp', default='13:00', max_length=50)
    registrations_made = models.IntegerField('Registreerunute arv', default=0)
    date = models.CharField('kuupäev', default='13.august', max_length=50)
    stringtime = models.CharField('JS string time (date)', max_length=100, default='')
    stringtime2 = models.CharField('JS string time (date2)', max_length=100, default='')
    arrive_when = models.DateTimeField('Millal saabuda', null=True, blank=True, default=timezone.now)
    registration_limit = models.IntegerField('Osavõtjate maksimaalne hulk',
                                              default=0,
                                              choices=[(0, u"Pole piirangut")] + list(zip(range(1, 100), range(1, 100))))
    sport = models.CharField('Spordiala', max_length=15, default='puudub', choices=[('jooks', 'Jooksmine'),
                                                                                    ('jõud', 'Jõutreening'),
                                                                                    ('crossfit', 'CrossFit'),
                                                                                    ('kardio', 'Kardio'),
                                                                                    ('spinning', 'Spinning'),
                                                                                    ('yoga', 'Yoga'),
                                                                                    ('ratas', 'Ratas'),
                                                                                    ('ujumine', 'Ujumine'),
                                                                                    ('tennis', 'Tennis'),
                                                                                    ('suusatamine', 'suusatamine'),
                                                                                    ('muu', 'Muu'),
                                                                                    ])
    group = models.CharField('Grupi nimi', max_length=20, default='avalik')
    group_id = models.IntegerField('Grupi id', default=0)
    short_date = models.CharField('Paev/kuu, short date', max_length=15, default='')

    def get_absolute_url(self):
        return reverse('post-detail', kwargs={'pk': self.pk})

    class Meta:
        verbose_name = "training"
        verbose_name_plural = "trainings"
        ordering = ['-starts']

    def convert_time(self):
        return self.starts.strftime("%a %H:%M")

    def __str__(self):
        if self.starts.date() != self.ends.date():
            return u"%s, %s - %s" % (self.title,
                                        self.starts.strftime("%a %H:%M"),
                                        self.ends.strftime("%a %H:%M"))
        else:
                return u"%s, %s - %s" % (self.title,
                                         self.starts.strftime("%H:%M"),
                                         self.ends.strftime("%H:%M"))

    def get_registrations(self):
        return EventRegistration.objects.filter(event=self)

    def add_user_to_list_of_attendees(self, profile, pk, event_time, event_date):
        registration = EventRegistration.objects.create(profile=profile,
                                                        event=self,
                                                        time_registered=timezone.now(),
                                                        event_time=event_time,
                                                        event_date=event_date)
        registration.save()

    def remove_user_from_list_of_attendees(self, user, pk):
        registration = EventRegistration.objects.get(user=user, event=self)
        registration.delete()


class EventRegistration(models.Model):
    event = models.ForeignKey(Post, verbose_name='Training', on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, verbose_name='Athlete', on_delete=models.CASCADE, default='no data')
    time_registered = models.DateTimeField(null=True, default=timezone.now)
    event_time = models.CharField(default='', max_length=60)
    event_date = models.CharField(default='', max_length=60)

    def __str__(self):
        return self.profile.username + ' registration to ' + self.event.title

    class Meta:
        verbose_name = 'Athlete for training'
        verbose_name_plural = 'Athletes registrations for trainings'
        ordering = ['time_registered', ]
        constraints = [
            models.UniqueConstraint(fields=['event', 'profile'], name='user_to_training')
        ]

    def save(self, *args, **kwargs):
        if self.profile is None and self.time_registered is None:
            self.time_registered = datetime.datetime.now()
        super(EventRegistration, self).save(*args, **kwargs)


class VerificationKey(models.Model):
    useremail = models.CharField('KasutajaEmail', max_length=50, default='')
    token = models.CharField('Token', max_length=50, default='1234')
    verified = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)


class TrainingGroup(models.Model):
    coach = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='coach', related_query_name='coach')
    users = models.ManyToManyField(Profile, related_name='users', related_query_name='users', blank=True)
    requesting_users = models.ManyToManyField(Profile, related_name='requesting_users',
                                              related_query_name='requesting_users', blank=True)
    name = models.CharField('Grupinimi', default='', max_length=50)
    sport = models.CharField('Spordiala', max_length=10, default='jooks', choices=[('jooks', 'Jooksmine'),
                                                                                   ('jõud', 'Jõutreening'),
                                                                                   ('crossfit', 'Crossfit'),
                                                                                   ('kardio', 'Kardio'),
                                                                                   ('ratas', 'Ratas'),
                                                                                   ('ujumine', 'Ujumine'),
                                                                                   ])
    members_count = models.IntegerField('Liikmete arv', default=0)
    description = models.CharField('Kirjeldus', default='', max_length=100)
    image = models.ImageField(default='aigar.jpg', upload_to='traininggroup_covers')
    location = models.CharField('Asukoht', max_length=100, default='Muu', choices=[('Tartu', 'Tartu'),
                                                                                ('Tallinn', 'Tallinn'),
                                                                                ('Pärnu', 'Pärnu'),
                                                                                ('Viljandi', 'Viljandi'),
                                                                                ('Muu', 'Muu')
                                                                                ])
    coach_name = models.CharField('Treeneri nimi', max_length=25, default='')

    def __str__(self):
        return f'Group {self.coach}, named {self.name} '

    def add_user_to_requesting(self, profile):
        self.requesting_users.add(profile)

    def remove_user_from_requesting(self, profile):
        self.requesting_users.remove(profile)

    def add_user_to_group(self, profile):
        self.requesting_users.remove(profile)
        self.users.add(profile)
