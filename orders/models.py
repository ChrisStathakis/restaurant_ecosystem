from django.db import models
from catalogue.models import Product

class Costumer(models.Model):
    title = models.CharField(max_length=220)

    def __str__(self):
        return self.title


class Table(models.Model):
    status = models.BooleanField(default=True)
    is_free = models.BooleanField(default=True)
    title = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.title


class Order(models.Model):
    is_paid = models.BooleanField(default=False)
    in_progress = models.BooleanField(default=True)
    title = models.CharField(max_length=200, blank=True)
    table = models.ForeignKey(Table, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    cost = models.DecimalField(max_digits=20, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.table} | {self.timestamp.date()}'

    def tag_table(self):
        return self.table.title


class OrderItem(models.Model):
    order_related = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_related = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    qty = models.PositiveIntegerField(default=1)
    cost = models.DecimalField(max_digits=20, decimal_places=2)
    total_cost = models.DecimalField(max_digits=20, decimal_places=2)
    extra_cost = models.DecimalField(max_digits=20, decimal_places=2)

    def save(self, *args, **kwargs):
        if self.product_related:
            self.cost = self.product_related.price
            self.total_cost = (self.cost * self.qty) + self.extra_cost

        super(OrderItem, self).save(*args, **kwargs)
        self.order_related.save()

    def __str__(self):
        return self.product_related.title

    def tag_product(self):
        return self.product_related.title

    def tag_order(self):
        return self.order_related.title