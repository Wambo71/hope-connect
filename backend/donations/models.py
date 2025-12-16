from django.db import models
from django.contrib.auth.models import User


class Donation(models.Model):
    FREQUENCY_CHOICES = [
        ('one-time', 'One-time'),
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('paypal', 'PayPal'),
        ('bank', 'Bank Transfer'),
        ('crypto', 'Cryptocurrency'),
    ]

    donor = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    donor_name = models.CharField(max_length=255, blank=True, null=True)
    donor_email = models.EmailField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    frequency = models.CharField(
        max_length=20, choices=FREQUENCY_CHOICES, default='one-time')
    payment_method = models.CharField(
        max_length=20, choices=PAYMENT_METHOD_CHOICES, default='card')
    story = models.ForeignKey(
        'stories.Story', on_delete=models.CASCADE, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        donor_info = self.donor.username if self.donor else self.donor_name
        return f'Donation by {donor_info} - {self.amount}'
