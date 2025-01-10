from datetime import date
from django.contrib import admin
from School.models import Upcoming_Event, Recent_Event, School

class Upcoming_Event_Admin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        # Check if the event is being marked as inactive
        if obj.event_date < date.today() and obj.is_active:
            # Create and save the corresponding Recent_Event
            recent_event = Recent_Event(
                title=obj.title,
                description=obj.description,
                event_date=obj.event_date,
                school_id=obj.school_id
            )
            recent_event.save()  # Save to Recent_Event
            
            obj.is_active = False  # Set the event as inactive in Upcoming_Event
            obj.save()  # Ensure changes are saved
            obj.delete()  # Deletes the Upcoming_Event after transferring

        else:
            # Handle when the event is not yet inactive (no deletion or transfer)
            super().save_model(request, obj, form, change)

admin.site.register(Upcoming_Event, Upcoming_Event_Admin)
admin.site.register(Recent_Event)
admin.site.register(School)
