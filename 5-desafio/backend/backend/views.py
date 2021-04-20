from django.conf import settings
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView


class DashboardTemplateView(TemplateView):
    template_name = 'dashboard.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return super(DashboardTemplateView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('%s?next=%s' % (settings.LOGIN_URL, request.path))
