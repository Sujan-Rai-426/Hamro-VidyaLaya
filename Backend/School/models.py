from django.db import models


from django.core.validators import RegexValidator


# Model for School Registeration Form
class School(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    address = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, blank=False, null=False)
    logo = models.ImageField(upload_to='School_Hub/school_logo/', null=True, blank=True)
    phone_validator = RegexValidator( regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+977'. Up to 15 digits allowed." )
    phone = models.CharField( validators=[phone_validator], max_length=17, unique=True, null=False, blank=False, help_text="Enter valid phone number.")
    password = models.CharField( max_length=128, help_text="Password will be hashed and stored securely.", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.address}"



# Models for the recent activities
class Recent_Event(models.Model):
    id = models.AutoField(primary_key=True)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE, related_name="recent_event")
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(null=False, blank=False)
    event_date = models.DateField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title



#  Models for the upcoming events of School
class Upcoming_Event(models.Model):
    id = models.AutoField(primary_key=True)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE, related_name="upcoming_event")
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(null=False, blank=False)
    event_date = models.DateField()
    created_at = models.DateField(auto_created=True)
    is_active = models.BooleanField(default=True)  # Tracks if the event is upcoming

    def __str__(self):
        return self.title



