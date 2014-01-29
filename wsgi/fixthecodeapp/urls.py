from django.conf.urls import patterns, url

from fixthecodeapp import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='home'),
    url(r'^about$', views.about, name='about'),
    url(r'^questions/(\d+)/?$', views.view_question, name='view_question'),
    url(r'^questions/?$', views.list_questions, name='list_questions'),
    url(r'^questions/create$', views.create_question, name='create_question'),
    url(r'^questions/create/submit$', views.create_question_submit, name='create_question_submit'),
    url(r'^questions/(\d+)/edit$', views.edit_question, name='edit_question'),
    url(r'^questions/(\d+)/edit/submit$', views.edit_question_submit, name='edit_question_submit'),
    url(r'^json/questions/(\d+)/?$', views.json_get_question, name='json_get_question'),
)

