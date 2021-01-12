release: python manage.py migrate
web: gunicorn backend.wsgi -c config/gunicorn.conf --log-file -