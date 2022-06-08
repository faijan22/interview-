from django.db import models

# Create your models here.

class Question(models.Model):
    question = models.TextField()
    isNumeric = models.BooleanField(default=True)
    range = models.IntegerField(default=1)

    def __str__(self):
        return str(self.question)

class Answers(models.Model):
    User = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField()

    def __str__(self):
        return self.User
    
