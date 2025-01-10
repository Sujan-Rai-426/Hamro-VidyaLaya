from django.db import models

from Course.models import Course
from School.models import School
from django.core.validators import RegexValidator

# Model for Student Registration Form
class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    address = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, blank=False, null=False)
    profile = models.ImageField(upload_to='media/School_Manager/student_profile/', null=True, blank=True)
    phone_validator = RegexValidator( regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+977'. Up to 15 digits allowed." )
    phone = models.CharField( validators=[phone_validator], max_length=17, unique=True, null=False, blank=False, help_text="Enter valid phone number.")
    password = models.CharField( max_length=128, help_text="Password will be hashed and stored securely.", null=True, blank=True)
    # coruse_id = models.ForeignKey(Course, on_delete=models.DO_NOTHING)
    school = models.ForeignKey(School, related_name='students', on_delete=models.CASCADE)
    symbol_number = models.IntegerField(unique=False, null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.school}"



# Student Attendence models
class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance')
    status = models.CharField(max_length=10, choices=[('present', 'Present'), ('absent', 'Absent')], default='present')
    attendence_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.student_id.name} (ID: {self.student_id.id}) - {self.attendence_date}"



# Student Attendence Report Model
class Attendance_Report(models.Model):
    id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="attendance_reports")
    attendence_id = models.ForeignKey(Attendance, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.student_id.name} (ID: {self.student_id.id}) - Attendance on {self.attendence_id.attendence_date}"



# Student Result Model
class Result(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='results')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    score = models.FloatField()  # Marks obtained
    max_score = models.FloatField()  # Maximum marks for the course

    def __str__(self):
        return f"{self.student.name} - {self.course.name} ({self.score}/{self.max_score})"

