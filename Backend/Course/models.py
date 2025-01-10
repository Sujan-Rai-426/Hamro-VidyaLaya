from django.db import models


# Course Models 
class Course(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)  # Unique course identifier
    description = models.TextField(blank=True, null=True)
    credits = models.PositiveIntegerField(default=0)  # Number of credits for the course
    duration = models.PositiveIntegerField(help_text="Duration in weeks", default=0)  # Course duration in weeks
    pdf = models.FileField(upload_to="course_pdfs/", blank=True, null=True, help_text="Upload the course PDF file")  # Field for course PDF link
    is_active = models.BooleanField(default=True, help_text="Is the course currently active?")  # Active status
    school = models.ForeignKey( 'School.School',  on_delete=models.CASCADE,  related_name="courses", help_text="School offering this course" )  # Course linked to a school

    def __str__(self):
        return f"{self.name} ({self.code})"
