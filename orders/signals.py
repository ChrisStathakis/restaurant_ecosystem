from django.dispatch import receiver
from django.db.models.signals import post_delete

from .models import OrderItem

@receiver(post_delete, sender=OrderItem)
def update_order_on_delete(sender, instance, **kwargs):
    instance.order_relates.save()