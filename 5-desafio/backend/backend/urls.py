from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include, re_path
from rest_framework import routers

from apps.request_loan.views import RequestLoanCreate
from apps.request_loan.views import RequestLoanModelViewSet
from .views import DashboardTemplateView

router = routers.DefaultRouter()
router.register('requests-loan', RequestLoanModelViewSet)

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', RequestLoanCreate.as_view()),

                  path('api/', include(router.urls)),
                  re_path(r'^dashboard/*', login_required(DashboardTemplateView.as_view())),
                    path('accounts/', include('allauth.urls')),

              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

