# Create your views here.

import json

from django.http import HttpResponse
from django.shortcuts import render, redirect
from fixthecodeapp.models import Question
from utils import *
from django.conf import settings


def index(request):
    if hasattr(settings, 'WELCOME_QUESTION_ID'):
        return redirect('view_question', settings.WELCOME_QUESTION_ID)
    else :
        return redirect('list_questions')


def about(request):
    return render(request, 'fixthecodeapp/about.html')


def view_question(request, id):
    question = Question.objects.get(id=id)
    set_next_question(question)

    context = {'question': question}
    return render(request, 'fixthecodeapp/questions/view_question.html', context)

def set_next_question(question):
    if not question.next_question_id:
        next_questions = Question.objects.filter(id__gt=question.id)
        if len(next_questions) > 0:
            question.next_question_id = next_questions[0].id


def list_questions(request):
    context = {'questions': Question.objects.all()}
    return render(request, 'fixthecodeapp/questions/list_questions.html', context)


def create_question(request):
    context = {}
    return render(request, 'fixthecodeapp/questions/create_question.html', context)


def create_question_submit(request):
    question = Question()
    question.name = request.POST['name']
    question.description = request.POST['description']
    question.code = request.POST['code']
    question.incorrect_lines = request.POST['incorrect_lines']
    question.next_question_id = str_to_int(request.POST['next_question_id'])
    question.save()
    return redirect('view_question', question.id)


def edit_question(request, id):
    context = {'question': Question.objects.get(id=id)}
    return render(request, 'fixthecodeapp/questions/edit_question.html', context)


def edit_question_submit(request, id):
    question = Question.objects.get(id=id)
    question.name = request.POST['name']
    question.description = request.POST['description']
    question.code = request.POST['code']
    question.incorrect_lines = request.POST['incorrect_lines']
    question.next_question_id = str_to_int(request.POST['next_question_id'])
    question.save()
    return redirect('view_question', id)


def json_get_question(request, id):
    response = {}
    question = Question.objects.get(id=id)
    response['name'] = question.name
    response['description'] = question.description
    response['code'] = question.code
    response['incorrect_lines'] = question.incorrect_lines
    return HttpResponse(json.dumps(response), content_type="application/json")


