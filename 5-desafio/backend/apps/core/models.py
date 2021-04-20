from django.db import models
from django.db.models.deletion import ProtectedError


class ExcludeDeletedManager(models.Manager):
    def get_queryset(self):
        return super(ExcludeDeletedManager, self).get_queryset().filter(_deleted=False)


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    _deleted = models.BooleanField(default=False, editable=False)

    objects = ExcludeDeletedManager()
    admin_manager = models.Manager()

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def delete(self, using=None):
        try:
            super(BaseModel, self).delete(using)
        except ProtectedError:
            self._deleted = True
            self.save()
