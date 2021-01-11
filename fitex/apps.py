from django.apps import AppConfig


class FitexConfig(AppConfig):
    name = 'fitex'

    def ready(self):
        import fitex.signals
