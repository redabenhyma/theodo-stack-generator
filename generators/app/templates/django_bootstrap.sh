#! /bin/bash
virtualenv venv -p python3
source ./venv/bin/activate
pip install django
pip install djangorestframework
pip install pylint
pip install pylint-django
pip freeze > requirements.txt
django-admin startproject "$1"
