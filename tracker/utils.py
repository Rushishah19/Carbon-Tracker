from django.db.models import Sum
from .models import CarbonEntry
import calendar

# Carbon footprint calculation factors (simplified)
CARBON_FACTORS = {
    'transportation': {
        'car_petrol': 0.17,  # kg CO2 per km
        'car_diesel': 0.15,
        'car_electric': 0.05,
        'public_transport': 0.05,
        'flight_domestic': 0.25,
        'flight_international': 0.30,
        'cycling': 0,
        'walking': 0,
    },
    'energy': {
        'electricity': 0.5,  # kg CO2 per kWh
        'natural_gas': 0.2,
        'heating_oil': 2.5,
        'solar_power': 0,
    },
    'food': {
        'beef': 27,  # kg CO2 per kg
        'chicken': 6.9,
        'pork': 12.1,
        'fish': 6.1,
        'vegetables': 2,
        'dairy': 3.2,
        'grains': 1.4,
    },
    'waste': {
        'general_waste': 0.5,  # kg CO2 per kg
        'recycling': 0.1,
        'organic_waste': 0.3,
        'e_waste': 1.2,
    },
    'consumption': {
        'clothing': 10,  # kg CO2 per item
        'electronics': 50,
        'books_media': 2,
        'furniture': 25,
    }
}

def calculate_carbon_footprint(category, subcategory, amount):
    """Calculate carbon footprint based on category, subcategory, and amount"""
    # Normalize subcategory name
    subcategory_key = subcategory.lower().replace(' ', '_').replace('(', '').replace(')', '')
    
    if category in CARBON_FACTORS:
        if subcategory_key in CARBON_FACTORS[category]:
            factor = CARBON_FACTORS[category][subcategory_key]
            return round(amount * factor, 2)
        else:
            # Default factor if subcategory not found
            default_factors = {
                'transportation': 0.15,
                'energy': 0.4,
                'food': 5,
                'waste': 0.4,
                'consumption': 15,
            }
            return round(amount * default_factors.get(category, 1), 2)
    
    return round(amount * 1, 2)  # Default factor

def get_category_totals(user):
    """Get carbon footprint totals by category for a user"""
    categories = ['transportation', 'energy', 'food', 'waste', 'consumption']
    totals = {}
    
    for category in categories:
        total = CarbonEntry.objects.filter(
            user=user, 
            category=category
        ).aggregate(total=Sum('carbon_footprint'))['total'] or 0
        totals[category] = round(total, 2)
    
    return totals

def get_monthly_data(user, months=12):
    """Get monthly carbon footprint data for charts"""
    from datetime import datetime, timedelta
    from django.utils import timezone
    
    monthly_data = []
    current_date = timezone.now()
    
    for i in range(months):
        month_start = current_date.replace(day=1) - timedelta(days=30*i)
        month_end = (month_start + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        total = CarbonEntry.objects.filter(
            user=user,
            date__gte=month_start,
            date__lte=month_end
        ).aggregate(total=Sum('carbon_footprint'))['total'] or 0
        
        monthly_data.append({
            'month': month_start.strftime('%b'),
            'total': round(total, 2)
        })
    
    return list(reversed(monthly_data))

def format_carbon_amount(amount):
    """Format carbon amount for display"""
    if amount < 1:
        return f"{int(amount * 1000)}g CO₂"
    else:
        return f"{amount:.1f}kg CO₂"

def get_category_color(category):
    """Get color for category visualization"""
    colors = {
        'transportation': '#3b82f6',
        'energy': '#f59e0b',
        'food': '#10b981',
        'waste': '#8b5cf6',
        'consumption': '#ef4444'
    }
    return colors.get(category, '#6b7280')