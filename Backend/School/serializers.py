from rest_framework import serializers
from School.models import Recent_Event, School, Upcoming_Event

# Serializer class for the School Model
class School_Serializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class Upcoming_Event_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Upcoming_Event
        fields = '__all__'

class Recent_Event_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Recent_Event
        fields = '__all__'