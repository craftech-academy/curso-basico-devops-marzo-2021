from rest_framework import serializers
from rest_framework.fields import empty


AVAILABLE_CONFIGS_FIELD = ('fields', 'read_only_fields', 'exclude', 'write_only_fields',
                           'extra_kwargs', 'required_fields')


class BaseModelSerializer(serializers.ModelSerializer):
    """
      Clase abstracta serializadora donde se pueden configurar campos para cada acciones genéricas de
      las vistas ModelViewSet que provee DjangoRestFramework y acciones personalizadas
      Serializer Ex:
        class OrderSerializer(BaseModelSerializer):
            class Meta:
                model = Order
                fields = "__all__"
                fields_config = {
                  "create": {
                    "exclude": ("total",)
                  },
                  "update": {
                    "fields": ("id", "total", "status", "delivery", "products"),
                    "read_only_fields": ("id", "total", "status")
                  },
                  "change_status":{ # Custom action
                    "fields": ("status",)
                  }
                }
        View Ex:
            class OrderModelViewSet(ModelViewSet):
                serializer = OrderSerializer
                queryset = Order.objects.all()

                @detail_route(methods=['patch'])
                def change_status(self, request, *args, **kwargs):
                    order = self.get_object()
                    order.change_status(request.data['canceled']
                    return Response(OrderSerializer(order).data)

    """
    def __init__(self, instance=None, data=empty, **kwargs):
        if kwargs.get('context'):
            action = kwargs['context']['view'].action

            fields_config = getattr(self.Meta, 'fields_config', None)
            if fields_config and fields_config.get(action):
                custom_fields_by_action = fields_config.get(action)

                if custom_fields_by_action.get('exclude') and getattr(self.Meta, 'fields', False):
                    delattr(self.Meta, 'fields')
                elif custom_fields_by_action.get('fields') and getattr(self.Meta, 'exclude', False):
                    delattr(self.Meta, 'exclude')

                for key, value in custom_fields_by_action.items():
                    assert key in AVAILABLE_CONFIGS_FIELD, "The %s can't support" % key
                    setattr(self.Meta, key, value)

        super(BaseModelSerializer, self).__init__(instance, data, **kwargs)

    class Meta:
        abstract = True



class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """
    _extension_file = None

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension
        self._extension_file = extension
        return self._extension_file

    def get_extension(self):
        return self._extension_file



class GeneralSerializer(serializers.ModelSerializer):

    class Meta:
        model = None


class GeneralViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        model = self.kwargs.get('model')
        return model.objects.all()

    def get_serializer_class(self):
        GeneralSerializer.Meta.model = self.kwargs.get('model')
        return GeneralSerializer
