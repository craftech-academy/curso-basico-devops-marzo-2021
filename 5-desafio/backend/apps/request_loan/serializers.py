from rest_framework import serializers

from .models import RequestLoan


class RequestLoanModelSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'gender', 'document_number', 'full_name', 'amount', 'status', 'created_at', 'email')
        read_only_fields = ('status', 'created_at')
        model = RequestLoan
