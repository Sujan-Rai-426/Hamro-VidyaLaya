

from rest_framework import viewsets
from .models import Course
from .serializers import Course_Serializer

class Course_ViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()  # Get all courses
    serializer_class = Course_Serializer  # Use the CourseSerializer