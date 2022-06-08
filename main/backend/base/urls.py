from django.urls import path
from base import views

urlpatterns = [
    path('getQuestions/', views.getQuestions, name='getQuestions'),
    path('submitResponse/', views.submitResponse, name='submitResponse'),
    path('getAllUsers/', views.getAllUsers, name='getAllUsers'),
    path('getAnswers/<str:username>/', views.getAnswers, name='getAnswers')
]
