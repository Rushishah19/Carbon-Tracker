from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib import messages
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
import json

from .models import CarbonEntry, Goal, UserProfile, Insight
from .forms import CarbonEntryForm, GoalForm, UserProfileForm
from .utils import calculate_carbon_footprint, get_category_totals, get_monthly_data

def home(request):
    """Home page view"""
    return render(request, 'tracker/home.html')

@login_required
def dashboard(request):
    """Dashboard view with analytics"""
    entries = CarbonEntry.objects.filter(user=request.user)

    current_month = timezone.now().replace(day=1)
    monthly_entries = entries.filter(date__gte=current_month)
    monthly_total = monthly_entries.aggregate(total=Sum('carbon_footprint'))['total'] or 0

    category_totals = get_category_totals(request.user)
    recent_entries = entries[:5]
    goals = Goal.objects.filter(user=request.user)
    monthly_data = get_monthly_data(request.user)

    daily_entries = entries.filter(date__gte=timezone.now() - timedelta(days=30))
    daily_average = daily_entries.aggregate(avg=Sum('carbon_footprint'))['avg'] or 0
    daily_average = daily_average / 30 if daily_average else 0

    try:
        profile = request.user.userprofile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)

    context = {
        'monthly_total': round(monthly_total, 2),
        'daily_average': round(daily_average, 2),
        'category_totals': category_totals,
        'recent_entries': recent_entries,
        'goals': goals,
        'monthly_data': json.dumps(monthly_data),
        'profile': profile,
    }

    return render(request, 'tracker/dashboard.html', context)

@login_required
def add_entry(request):
    """Add new carbon entry"""
    if request.method == 'POST':
        form = CarbonEntryForm(request.POST)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = request.user
            entry.carbon_footprint = calculate_carbon_footprint(
                entry.category, entry.subcategory, entry.amount
            )
            entry.save()
            messages.success(request, 'Carbon entry added successfully!')
            return redirect('dashboard')
    else:
        form = CarbonEntryForm()

    return render(request, 'tracker/add_entry.html', {'form': form})

@login_required
def history(request):
    """View entry history"""
    entries = CarbonEntry.objects.filter(user=request.user)

    # Filter by category
    category = request.GET.get('category')
    if category:
        entries = entries.filter(category=category)

    # Search
    search = request.GET.get('search')
    if search:
        entries = entries.filter(
            Q(subcategory__icontains=search) | Q(description__icontains=search)
        )

    # Total emissions
    total_emissions = entries.aggregate(total=Sum('carbon_footprint'))['total'] or 0

    return render(request, 'tracker/history.html', {
        'entries': entries,
        'selected_category': category,
        'search_query': search,
        'total_emissions': round(total_emissions, 2),
    })

from datetime import date

@login_required
def goals(request):
    """Goals management"""
    user_goals = Goal.objects.filter(user=request.user)

    # Compute dynamic status counts
    completed = 0
    active = 0
    overdue = 0
    today = date.today()

    for goal in user_goals:
        if goal.status == 'completed':
            completed += 1
        elif goal.deadline < today:
            overdue += 1
        else:
            active += 1

    if request.method == 'POST':
        form = GoalForm(request.POST)
        if form.is_valid():
            goal = form.save(commit=False)
            goal.user = request.user
            goal.save()
            messages.success(request, 'Goal created successfully!')
            return redirect('goals')
    else:
        form = GoalForm()

    return render(request, 'tracker/goals.html', {
        'goals': user_goals,
        'form': form,
        'count_completed': completed,
        'count_active': active,
        'count_overdue': overdue,
    })

@login_required
def insights(request):
    """Insights and recommendations"""
    user_insights = Insight.objects.filter(user=request.user)

    if not user_insights.exists():
        generate_insights(request.user)
        user_insights = Insight.objects.filter(user=request.user)

    return render(request, 'tracker/insights.html', {
        'insights': user_insights,
    })

@login_required
def profile(request):
    """User profile management"""
    try:
        user_profile = request.user.userprofile
    except UserProfile.DoesNotExist:
        user_profile = UserProfile.objects.create(user=request.user)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile')
    else:
        form = UserProfileForm(instance=user_profile)

    return render(request, 'tracker/profile.html', {
        'form': form,
        'profile': user_profile,
    })

def generate_insights(user):
    """Generate AI-like insights for the user"""
    entries = CarbonEntry.objects.filter(user=user)

    if entries.exists():
        transport_entries = entries.filter(category='transportation')
        if transport_entries.exists():
            avg_transport = transport_entries.aggregate(avg=Sum('carbon_footprint'))['avg'] or 0
            if avg_transport > 50:
                Insight.objects.create(
                    user=user,
                    title='Transportation Improvement Opportunity',
                    description=f'Your monthly transportation emissions are {avg_transport:.1f}kg CO₂. Consider using public transport more often.',
                    insight_type='tip',
                    action='Try using public transport 3+ times per week'
                )

        energy_entries = entries.filter(category='energy')
        if energy_entries.exists():
            Insight.objects.create(
                user=user,
                title='Energy Usage Tip',
                description='Small changes in energy usage can make a big difference in your carbon footprint.',
                insight_type='tip',
                action='Switch to LED bulbs and unplug devices when not in use'
            )

def about(request):
    return render(request, 'tracker/about.html')

def editorial_guidelines(request):
    return render(request, 'tracker/editorial_guidelines.html')

def careers(request):
    return render(request, 'tracker/careers.html')

def contact(request):
    return render(request, 'tracker/contact.html')

def privacy_policy(request):
    return render(request, 'tracker/privacy_policy.html')

def terms(request):
    return render(request, 'tracker/terms.html')

def advertise(request):
    return render(request, 'tracker/advertise.html')

def personal_transportation(request):
    return render(request, 'personal_transportation.html')

def food_waste(request):
    return render(request, 'food_waste.html')

def business(request):
    return render(request, 'business.html')

from django.shortcuts import render, redirect
from .forms import GoalForm  # make sure you have this form created

def create_goal(request):
    if request.method == 'POST':
        form = GoalForm(request.POST)
        if form.is_valid():
            goal = form.save(commit=False)
            goal.user = request.user
            form.save()
            return redirect('goals')  # redirect to your goals list page
    else:
        form = GoalForm()
    return render(request, 'create_goal.html', {'form': form})

@login_required
def edit_goal(request, pk):
    goal = get_object_or_404(Goal, pk=pk, user=request.user)
    if request.method == 'POST':
        form = GoalForm(request.POST, instance=goal)
        if form.is_valid():
            form.save()
            messages.success(request, 'Goal updated successfully.')
            return redirect('goals')
    else:
        form = GoalForm(instance=goal)
    return render(request, 'create_goal.html', {'form': form})

@login_required
def delete_goal(request, pk):
    goal = get_object_or_404(Goal, pk=pk, user=request.user)
    if request.method == 'POST':
        goal.delete()
        messages.success(request, 'Goal deleted successfully.')
        return redirect('goals')
    return render(request, 'confirm_delete.html', {'goal': goal})

import csv
from django.http import HttpResponse

@login_required
def export_entries(request):
    entries = CarbonEntry.objects.filter(user=request.user)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=carbon_entries.csv'

    writer = csv.writer(response)
    writer.writerow(['Date', 'Category', 'Subcategory', 'Amount', 'Unit', 'CO2 Impact', 'Description'])

    for entry in entries:
        writer.writerow([
            entry.date,
            entry.category,
            entry.subcategory,
            entry.amount,
            entry.unit,
            entry.carbon_footprint,
            entry.description
        ])

    return response
