from django.contrib import messages
from django.views.generic import CreateView
from rest_framework.viewsets import ModelViewSet

from .forms import RequestLoanModelForm
from .models import RequestLoan
from .serializers import RequestLoanModelSerializer


class RequestLoanCreate(CreateView):
    model = RequestLoan
    form_class = RequestLoanModelForm
    template_name = 'request_loan/create.html'
    success_url = '/'

    def form_valid(self, form):
        message = "Hemos registrado tu solicitud con el DNI {0}. Gracias. Nos comunicameros con usted a la brevedad" \
            .format(form.data['document_number'])
        messages.add_message(self.request, messages.SUCCESS, message)
        return super().form_valid(form)


class RequestLoanModelViewSet(ModelViewSet):
    serializer_class = RequestLoanModelSerializer
    queryset = RequestLoan.objects.all()
    http_method_names = ('get', 'put', 'delete')
    ordering_fields = ('full_name', 'created_at', 'amount', 'document_number', 'status')
