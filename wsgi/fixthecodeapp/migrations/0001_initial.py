# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Question'
        db.create_table(u'fixthecodeapp_question', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=4000)),
            ('code', self.gf('django.db.models.fields.CharField')(max_length=4000)),
        ))
        db.send_create_signal(u'fixthecodeapp', ['Question'])


    def backwards(self, orm):
        # Deleting model 'Question'
        db.delete_table(u'fixthecodeapp_question')


    models = {
        u'fixthecodeapp.question': {
            'Meta': {'object_name': 'Question'},
            'code': ('django.db.models.fields.CharField', [], {'max_length': '4000'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '4000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['fixthecodeapp']