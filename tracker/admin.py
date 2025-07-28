from django.contrib import admin
from .models import UserProfile, CarbonEntry, Goal, Insight

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'location', 'monthly_goal', 'yearly_goal', 'created_at']
    list_filter = ['units', 'privacy', 'notifications']
    search_fields = ['user__username', 'location']

@admin.register(CarbonEntry)
class CarbonEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'category', 'subcategory', 'amount', 'unit', 'carbon_footprint']
    list_filter = ['category', 'date', 'created_at']
    search_fields = ['user__username', 'subcategory', 'description']
    date_hierarchy = 'date'

@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'target', 'current', 'status', 'deadline']
    list_filter = ['status', 'category', 'deadline']
    search_fields = ['user__username', 'title']

@admin.register(Insight)
class InsightAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'insight_type', 'is_read', 'created_at']
    list_filter = ['insight_type', 'is_read', 'created_at']
    search_fields = ['user__username', 'title']