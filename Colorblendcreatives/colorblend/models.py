from django.db import models

# Create your models here.

class Contact(models.Model):
    full_name = models.CharField(max_length=255)
    email_address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    budget = models.CharField(max_length=255)
    message = models.TextField(max_length=255)    

    def __str__(self):
        return f"New Message from {self.full_name}"