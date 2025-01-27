import requests
from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string

def send_html_email(subject, template_name, context, recipient_list):
    """
    Send an email with an HTML template.
    """
    html_content = render_to_string(template_name, context)
    email = EmailMultiAlternatives(
        subject=subject,
        body='',  # Optional plain text message (if needed)
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list,
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_email(subject, message, recipient_list):
    """
    Send an email.
    """
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        recipient_list,
        fail_silently=False,
    )


def safe_send_email(subject, html_content, recipient_list):
    """
    Sends an email with HTML content to a list of recipients.
    """
    try:
        email = EmailMultiAlternatives(
            subject=subject,
            body='',  # Optional plain text
            from_email=settings.EMAIL_HOST_USER,
            to=recipient_list,
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
    except Exception as e:
        print(f"Failed to send email to {recipient_list}: {e}")