from django.shortcuts import render
from .models import Contact
from django.contrib import messages
from django.conf import settings
from .mail import send_html_email

# Create your views here.

def index(request):
    if request.method == 'POST':
        try:
            new_contact = Contact.objects.create(
                full_name = request.POST.get('full_name'),
                email_address = request.POST.get('email_address'),
                phone_number = request.POST.get('phone_number'),
                budget = request.POST.get('budget'),
                message = request.POST.get('message'),
            )
            new_contact.save()
            send_html_email(
                subject=f"New Contact Message",
                template_name="mail.html",
                context={"user": new_contact},
                recipient_list=[settings.EMAIL_HOST_USER],
            )
            messages.success(request, f"Hello {new_contact.full_name}, we've recieved your message and we will reach out to you in no time.")
        except Exception as e:
            messages.success(request, f"An Error ocurred: {e}")
    return render(request, 'index.html', {})
    