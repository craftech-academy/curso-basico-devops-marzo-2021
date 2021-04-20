from allauth.account.forms import LoginForm
from django import forms


class MyCustomLoginForm(LoginForm):

    def clean(self):
        super(MyCustomLoginForm, self).clean()
        if not self.user.is_superuser:
            raise forms.ValidationError("Es necesario ser un usuario administrador para poder acceder.")
        return self.cleaned_data
