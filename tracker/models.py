from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime

CATEGORY_CHOICES = [
        ('transportation', 'Transportation'),
        ('energy', 'Energy'),
        ('food', 'Food'),
        ('waste', 'Waste'),
        ('consumption', 'Consumption'),
    ]

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)  # ✅ NEW LINE
    location = models.CharField(max_length=100, blank=True)
    monthly_goal = models.FloatField(default=500.0)
    yearly_goal = models.FloatField(default=6000.0)
    units = models.CharField(max_length=10, choices=[('metric', 'Metric'), ('imperial', 'Imperial')], default='metric')
    notifications = models.BooleanField(default=True)
    privacy = models.CharField(max_length=10, choices=[('public', 'Public'), ('private', 'Private')], default='private')
    created_at = models.DateTimeField(auto_now_add=True)
    visit_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - Profile"

class CarbonEntry(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('overdue', 'Overdue'),
    ]



    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=100)
    amount = models.FloatField()
    unit = models.CharField(max_length=20)
    carbon_footprint = models.FloatField()  # in kg CO2
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.carbon_footprint}kg CO2"

class Goal(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('overdue', 'Overdue'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    target = models.FloatField()
    current = models.FloatField(default=0)
    unit = models.CharField(max_length=20)
    deadline = models.DateField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.title}"

    @property
    def progress_percentage(self):
        if self.target == 0:
            return 0
        return min((self.current / self.target) * 100, 100)

class Insight(models.Model):
    INSIGHT_TYPES = [
        ('positive', 'Positive'),
        ('warning', 'Warning'),
        ('tip', 'Tip'),
        ('achievement', 'Achievement'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    insight_type = models.CharField(max_length=20, choices=INSIGHT_TYPES)
    action = models.CharField(max_length=300, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"