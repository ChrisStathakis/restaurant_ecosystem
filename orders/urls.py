from django.urls import path
from .api.views import TableListApiView, OrderCreateApiView

urlpatterns = [
    path('tables/', TableListApiView.as_view(), name='tables_list'),
    path('create/', OrderCreateApiView.as_view(), name='create_order'),

    ]