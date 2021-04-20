import os
from datetime import datetime

from django.utils.text import slugify
from pytz import timezone


def get_local_date():
	return  datetime.now(timezone('America/Argentina/Cordoba'))


def generate_unique_slug(from_class, from_strs):
	slug = ''
	for s in from_strs:
		slug += slugify(s)
	for x in range(1000):
		tmp_slug = slug
		if x > 1:
			tmp_slug += "_%s" % x
		try:
			from_class.objects.get(slug=tmp_slug)
		except from_class.DoesNotExist:
			return tmp_slug


def get_value_env(key, default=None):
	"""Retrieves env vars and makes Python boolean replacements"""
	val = os.getenv(key, default)
	if val == 'True':
		val = True
	elif val == 'False':
		val = False
	return val
