




from rest_framework import serializers
from School.models import Recent_Event, Upcoming_Event
from School.serializers import Recent_Event_Serializer, Upcoming_Event_Serializer
from Course.models import Course
from Course.serializers import Course_Serializer
from Student.models import Attendance, Result, Student


#  Serializer class for the Attendence Model
class Attendance_Serializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student_id.name', read_only=True)
    student_id = serializers.IntegerField(source='student_id.id', read_only=True)
    class Meta:
        model = Attendance
        fields = '__all__'


# serializer class for attendence summary serializer
class Attendance_Summary_Serializer(serializers.Serializer):
    total_classes = serializers.IntegerField()
    total_present = serializers.IntegerField()
    attendance_percentage = serializers.FloatField()


# Result Serializers 
class Result_Serializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    class Meta:
        model = Result
        fields = '__all__'


# Serializer class for the Student Model
class Student_Serializer(serializers.ModelSerializer):
    attendance_summary = serializers.SerializerMethodField()  # Add attendence summary field
    school_name = serializers.CharField(source='school.name', read_only=True)   # Add school summary field
    courses = serializers.SerializerMethodField()  # Add school's course field
    upcoming_events = serializers.SerializerMethodField()  # Add upcoming events field
    recent_events = serializers.SerializerMethodField()  # Add recent events field
    results = serializers.SerializerMethodField()  # Add results field
    class Meta:
        model = Student
        fields = '__all__'  # Include all fields + attendance_summary

        # Fetch all attendance reports for the student
    def get_attendance_summary(self, obj):
        attendance_reports = obj.attendance_reports.all()

        # Calculate attendance summary
        total_classes = attendance_reports.count()
        total_present = attendance_reports.filter(attendence_id__status="present").count()  # Assuming you have a `status` field
        attendance_percentage = (total_present / total_classes * 100) if total_classes > 0 else 0

        return {
            "total_classes": total_classes,
            "total_present": total_present,
            "attendance_percentage": round(attendance_percentage, 2),
        }
    
        # Fetch courses of the student's school
    def get_courses(self, obj):
        courses = Course.objects.filter(school=obj.school)
        return Course_Serializer(courses, many=True).data
    
        # Fetch upcoming events for the student's school
    def get_upcoming_events(self, obj):
        upcoming_events = Upcoming_Event.objects.filter(school_id=obj.school, is_active=True)
        return Upcoming_Event_Serializer(upcoming_events, many=True).data

        # Fetch recent events for the student's school
    def get_recent_events(self, obj):
        recent_events = Recent_Event.objects.filter(school_id=obj.school)
        return Recent_Event_Serializer(recent_events, many=True).data
    
        # Fetch results of the student
    def get_results(self, obj):
        results = Result.objects.filter(student=obj)
        return Result_Serializer(results, many=True).data



# # Seralizer class for the AttendenceReport Model
# class Attendance_Report_Serializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student_id.name', read_only=True)
#     attendence_date = serializers.CharField(source='attendence_id.attendence_date', read_only=True)
#     status = serializers.CharField(source='attendence_id.status', read_only=True)  # Status (present/absent)

#     class Meta:
#         model = Attendance_Report
#         fields = '__all__'