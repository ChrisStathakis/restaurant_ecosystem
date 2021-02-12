from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .serializers import TableSerializer, OrderSerializer, OrderItemSerializer
from ..models import Table, Order, OrderItem


class TableListApiView(ListAPIView):
    queryset = Table.objects.filter(status=True)
    serializer_class = TableSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['title', ]
    filterset_fields = ['is_free', ]
    permission_classes = [IsAuthenticated, ]


class OrderListApiView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields =['is_paid', 'in_progress']


class OrderCreateApiView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailApiView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemListApiView(ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['product_related', 'order_related']




