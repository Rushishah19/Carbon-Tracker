from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column, Div
from .models import CarbonEntry, Goal, UserProfile
from django import forms
from .models import Goal

class CarbonEntryForm(forms.ModelForm):
    class Meta:
        model = CarbonEntry
        fields = ['date', 'category', 'subcategory', 'amount', 'unit', 'description']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'subcategory': forms.TextInput(attrs={'class': 'form-control'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'unit': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('date', css_class='form-group col-md-6 mb-3'),
                Column('category', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            Row(
                Column('subcategory', css_class='form-group col-md-6 mb-3'),
                Column('amount', css_class='form-group col-md-3 mb-3'),
                Column('unit', css_class='form-group col-md-3 mb-3'),
                css_class='form-row'
            ),
            'description',
            Submit('submit', 'Add Entry', css_class='btn btn-success')
        )

class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        fields = ['title', 'target', 'unit', 'deadline', 'category']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'target': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'unit': forms.TextInput(attrs={'class': 'form-control'}),
            'deadline': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'title',
            Row(
                Column('target', css_class='form-group col-md-4 mb-3'),
                Column('unit', css_class='form-group col-md-4 mb-3'),
                Column('deadline', css_class='form-group col-md-4 mb-3'),
                css_class='form-row'
            ),
            'category',
            Submit('submit', 'Create Goal', css_class='btn btn-primary')
        )

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_image', 'location', 'monthly_goal', 'yearly_goal', 'units', 'notifications', 'privacy']
        widgets = {
            'location': forms.TextInput(attrs={'class': 'form-control'}),
            'monthly_goal': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'yearly_goal': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'units': forms.Select(attrs={'class': 'form-control'}),
            'notifications': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'privacy': forms.Select(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'profile_image',
            'location',
            Row(
                Column('monthly_goal', css_class='form-group col-md-6 mb-3'),
                Column('yearly_goal', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            Row(
                Column('units', css_class='form-group col-md-4 mb-3'),
                Column('privacy', css_class='form-group col-md-4 mb-3'),
                Column('notifications', css_class='form-group col-md-4 mb-3'),
                css_class='form-row'
            ),
            Submit('submit', 'Update Profile', css_class='btn btn-success')
        )