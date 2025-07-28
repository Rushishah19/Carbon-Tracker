from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import User
from tracker.models import UserProfile

class VisitCountMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.user.is_authenticated:
            try:
                profile = request.user.userprofile
            except UserProfile.DoesNotExist:
                profile = UserProfile.objects.create(user=request.user)

            # Prevent multiple increments in the same session
            if not request.session.get('has_visited'):
                profile.visit_count += 1
                profile.save()
                request.session['has_visited'] = True