from django.urls import path, include
from django.contrib.auth.views import LogoutView
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('add-entry/', views.add_entry, name='add_entry'),
    path('history/', views.history, name='history'),
    path('goals/', views.goals, name='goals'),
    path('insights/', views.insights, name='insights'),
    path('profile/', views.profile, name='profile'),
    path('about/', views.about, name='about'),
    path('editorial-guidelines/', views.editorial_guidelines, name='editorial_guidelines'),
    path('careers/', views.careers, name='careers'),
    path('contact/', views.contact, name='contact'),
    path('privacy-policy/', views.privacy_policy, name='privacy_policy'),
    path('terms/', views.terms, name='terms'),
    path('advertise/', views.advertise, name='advertise'),
    path('logout/', LogoutView.as_view(next_page='home'), name='logout'),
    path('transportation/', views.personal_transportation, name='transportation'),
    path('food-waste/', views.food_waste, name='food_waste'),
    path('business/', views.business, name='business'),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='registration/password_reset_form.html'), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='registration/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'), name='password_reset_complete'),
    path('goals/<int:pk>/edit/', views.edit_goal, name='edit_goal'),
    path('goals/<int:pk>/delete/', views.delete_goal, name='delete_goal'),
    path('export-entries/', views.export_entries, name='export_entries'),
]
