from rest_framework import serializers

from ..models import Costumer, Table, OrderItem, Order


class TableSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = ['title', 'is_free']


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['timestamp', 'title', 'cost', 'table', ]


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = ['product_related', 'tag_product', 'order_related', 'tag_order', 'qty', 'cost', 'total_cost']