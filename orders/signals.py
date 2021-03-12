from django.dispatch import receiver
from django.db.models.signals import post_delete, post_save

from .models import OrderItem, Order


@receiver(post_delete, sender=OrderItem)
def update_order_on_delete(sender, instance, **kwargs):
    instance.order_relates.save()


@receiver(post_save, sender=Order)
def update_table(sender, instance, **kwargs):
    table = instance.table
    table.is_free = False if instance.in_progress else True
    table.save()

