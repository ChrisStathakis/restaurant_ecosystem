from django.contrib import admin
from django.urls import path, include
from catalogue.views import homepage_api_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', homepage_api_view),
    path('api/catalogue/', include('catalogue.urls')),
    path('api/orders/', include('orders.urls'))

]
