from django import forms
from froala_editor.widgets import FroalaEditor
from .models import *

class BlogForm(forms.ModelForm):
    # blog_Category = forms.ModelChoiceField(queryset=blog_Category.objects.all(), initial=0)
    # Project_Category = forms.ModelChoiceField(queryset=Project_Category.objects.all(), initial=0)
    # course = forms.ModelChoiceField(queryset=Course.objects.all(), initial=0)
    class Meta:
        model = BlogModel
        fields = ('title_ar',)