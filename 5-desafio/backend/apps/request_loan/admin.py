from django.contrib import admin

from .models import RequestLoan


class RequestLoanModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'gender', 'email', 'document_number')


admin.site.register(RequestLoan, RequestLoanModelAdmin)
