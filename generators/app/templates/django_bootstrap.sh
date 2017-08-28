#! /bin/bash
echo 'ben'
virtualenv venv -p python3
source ./venv/bin/activate
pip install django
pip install djangorestframework
pip freeze > requirements.txt
django-admin startproject "$1"