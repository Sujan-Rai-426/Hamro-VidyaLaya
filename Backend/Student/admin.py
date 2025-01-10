from django.contrib import admin
from Student.models import Attendance, Attendance_Report, Result, Student


admin.site.register(Student)
admin.site.register(Attendance)
admin.site.register(Result)
admin.site.register(Attendance_Report)