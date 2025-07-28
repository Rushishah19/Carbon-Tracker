"""carbon_tracker URL Configuration"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from tracker import views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tracker.urls')),
    path('accounts/', include('accounts.urls')),

    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='registration/password_reset_form.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='registration/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'), name='password_reset_complete'),
    path('about/', views.about, name='about'),
    path('editorial-guidelines/', views.editorial_guidelines, name='editorial_guidelines'),
    path('careers/', views.careers, name='careers'),
    path('contact/', views.contact, name='contact'),
    path('privacy-policy/', views.privacy_policy, name='privacy_policy'),
    path('terms/', views.terms, name='terms'),
    path('advertise/', views.advertise, name='advertise'),
    path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('transportation/', views.personal_transportation, name='/transportation'),
    path('food/', views.food_waste, name='food'),
    path('business/', views.business, name='business'),
    path('create-goal/', views.create_goal, name='create_goal'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)