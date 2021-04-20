from django.db import models

from ..core.models import BaseModel

GENDER_CHOICES = (
    ('f', 'Femenino'),
    ('m', 'Masculino')
)

STATUS_CHOICES = (
    (0, 'Pendiente'),
    (1, 'Aprovado'),
    (2, 'Rechazado')
)


class RequestLoan(BaseModel):
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name='Sexo')
    email = models.EmailField()
    document_number = models.BigIntegerField(verbose_name='Número de documento')
    status = models.IntegerField(choices=STATUS_CHOICES, default=0, editable=False)
    full_name = models.CharField(max_length=100, verbose_name='Nombre y apellido')
    amount = models.PositiveIntegerField(verbose_name='Monto a solicitar')
