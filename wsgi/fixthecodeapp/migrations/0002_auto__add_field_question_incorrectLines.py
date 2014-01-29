# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Question.incorrect_lines'
        db.add_column(u'fixthecodeapp_question', 'incorrect_lines',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=4000),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Question.incorrect_lines'
        db.delete_column(u'fixthecodeapp_question', 'incorrect_lines')


    models = {
        u'fixthecodeapp.question': {
            'Meta': {'object_name': 'Question'},
            'code': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '4000'}),
            'description': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '4000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incorrect_lines': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '4000'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100'})
        }
    }

    complete_apps = ['fixthecodeapp']