

from rest_framework import serializers
from .models import Course

class Course_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'  # Serialize all fields of the Course model