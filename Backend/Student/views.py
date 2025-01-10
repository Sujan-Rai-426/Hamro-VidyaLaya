


# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, status
from rest_framework.response import Response
from Course.models import Course
from Course.serializers import Course_Serializer
from Student.models import Attendance, Student
from Student.serializers import Attendance_Serializer, Student_Serializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError

# Create your views here.
class Student_ViewSet(ModelViewSet):
    queryset = Student.objects.prefetch_related('attendance_reports')
    serializer_class = Student_Serializer

    def retrieve(self, request, *args, **kwargs):
        # Get the student instance
        student = self.get_object()

        # Serialize the student details
        student_serializer = self.get_serializer(student)

        # Fetch the courses specific to the student's school
        school_courses = Course.objects.filter(school=student.school)

        # Serialize the courses
        courses_serializer = Course_Serializer(school_courses, many=True)

        # Combine student data with courses
        data = student_serializer.data
        data['courses'] = courses_serializer.data

        return Response(data, status=status.HTTP_200_OK)


class Attendance_ViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = Attendance_Serializer

    def get_queryset(self):  # sourcery skip: raise-from-previous-error
        student_id = self.request.query_params.get('student_id', None)

        if student_id is not None and student_id != 'undefined':  # Ensure it's not undefined
            try:
                student_id = int(student_id)  # Ensure student_id is an integer
                return self.queryset.filter(student_id=student_id)
            except ValueError:
                raise ValidationError({"error": "Invalid student_id. It must be a number."})
            except ObjectDoesNotExist:
                raise ValidationError({"error": "Student does not exist."})

        return self.queryset


#  overall Student attendence report
# class Attendance_Report_ViewSet(viewsets.ModelViewSet):
#     queryset = AttendanceReport.objects.all()
#     serializer_class = AttendanceReport_Serializer

#     def get_queryset(self):  # sourcery skip: raise-from-previous-error, use-named-expression
#         student_id = self.request.query_params.get('student_id', None)

#         if student_id:  # Check if student_id is provided
#             try:
#                 student_id = int(student_id)  # Ensure student_id is an integer
#                 return self.queryset.filter(student_id=student_id)
#             except ValueError:
#                 raise ValidationError({"error": "Invalid student_id. It must be a number."})

#         return self.queryset  # If no student_id is provided, return all records

