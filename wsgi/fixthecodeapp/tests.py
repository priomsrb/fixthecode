"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from utils import *


class SimpleTest(TestCase):
    def test_basic_addition(self):
        """
        Tests that 1 + 1 always equals 2.
        """
        self.assertEqual(1 + 1, 2)


class StrToIntTest(TestCase):
    def test_valid(self):
        self.assertEqual(str_to_int('123'), 123)
        self.assertEqual(str_to_int('0'), 0)

    def test_invalid(self):
        self.assertEqual(str_to_int(''), None)
        self.assertEqual(str_to_int('abc'), None)
        self.assertEqual(str_to_int(None), None)

    def test_default(self):
        self.assertEqual(str_to_int('abc', 123), 123)
