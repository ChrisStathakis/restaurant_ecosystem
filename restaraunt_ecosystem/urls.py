from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from catalogue.views import homepage_api_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', homepage_api_view),
    path('api/catalogue/', include('catalogue.urls')),
    path('api/orders/', include('orders.urls')),

    path('api/token/', jwt_views.TokenObtainPairView.as_view()),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view()),

]
