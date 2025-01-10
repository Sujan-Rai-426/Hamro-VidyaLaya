
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Course.views import Course_ViewSet
from Student.views import Attendance_ViewSet, Student_ViewSet
from School.views import Recent_Event_ViewSet, School_ViewSet, Upcoming_Event_ViewSet

router = DefaultRouter()

# urls for viewset for Course Model ViewSet
router.register(r'courses', Course_ViewSet, basename='courses')


# viewset for the School Model
router.register(r'schools', School_ViewSet, basename='schools')
# router.register(r'schools-upcoming-events', Upcoming_Event_ViewSet, basename='upcoming-events')
# router.register(r'schools-recent-events', Recent_Event_ViewSet, basename='recent-events')

# ViewSets for the Student Model
router.register(r'students', Student_ViewSet, basename='students')
# router.register(r'students-attendance', Attendance_ViewSet, basename='students_attandance')
# router.register(r'students-attendance-report', Attendance_Report_ViewSet, basename='students_attandence_report')



urlpatterns = [
    # Include the auto-generated router URLs
    path('', include(router.urls)),
]