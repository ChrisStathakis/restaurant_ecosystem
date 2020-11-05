from django.urls import path

from .api.views import (ProductClassApiListView, ProductListApiListView, CategoryListApiView, IngredientsListApiView,

                        )

from .views import catalogue_homepage_view

app_name = 'catalogue'

urlpatterns = [
    path('homepage/', catalogue_homepage_view, name='homepage'),
    path('product-class-list/', ProductClassApiListView.as_view(), name='product_class_list'),
    path('product-list/', ProductListApiListView.as_view(), name='product_list'),
    path('category-list/',  CategoryListApiView.as_view(), name='category_list'),
    path('ingredient-list', IngredientsListApiView.as_view(), name='ingredient-list')
]