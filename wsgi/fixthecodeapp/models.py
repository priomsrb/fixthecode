from django.db import models

# Create your models here.

class Question(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=4000, default='')
    code = models.CharField(max_length=4000, default='')
    incorrect_lines = models.CharField(max_length=4000, default='')
    next_question_id = models.IntegerField(null=True,blank=True)
