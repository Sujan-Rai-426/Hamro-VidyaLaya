
# Create your views here.

from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet

from Student.models import Student
from School.models import Recent_Event, School, Upcoming_Event
from School.serializers import Recent_Event_Serializer, School_Serializer, Upcoming_Event_Serializer
from rest_framework.permissions import IsAuthenticated


# viewset for School Model and School_Serializer
class School_ViewSet(ModelViewSet):
    queryset = School.objects.all()
    serializer_class = School_Serializer


# viewset for Upcoming Event View and UpcomingEvent serializer
class Upcoming_Event_ViewSet(viewsets.ModelViewSet):
    serializer_class = Upcoming_Event_Serializer
    def get_queryset(self):
        # Retrieve the student by ID
        student_id = self.kwargs.get('student_id')
        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Upcoming_Event.objects.none()  # Return an empty queryset if student doesn't exist
        # Retrieve all active upcoming events for the school that the student belongs to
        return Upcoming_Event.objects.filter(school=student.school, is_active=True)


# viewset for recent event model and its serializer
class Recent_Event_ViewSet(viewsets.ModelViewSet):
    queryset = Recent_Event.objects.all()
    serializer_class = Recent_Event_Serializer
