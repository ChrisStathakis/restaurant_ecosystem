from django.urls import path

from .api.views import (ProductClassApiListView, ProductListApiListView, CategoryListApiView, IngredientsListApiView,
                        ProductUpdateDeleteApiView, CategoryUpdateDeleteApiView, ProductClassApiUpdateView
                        )

from .views import catalogue_homepage_view

app_name = 'catalogue'

urlpatterns = [
    path('homepage/', catalogue_homepage_view, name='homepage'),
    path('product-class-list/', ProductClassApiListView.as_view(), name='product_class_list'),
    path('product-class-update/<int:pk>/', ProductClassApiUpdateView.as_view(), name='product_class_update'),
    path('product-list/', ProductListApiListView.as_view(), name='product_list'),
    path('product-update/<int:pk>/', ProductUpdateDeleteApiView.as_view(), name='product_update'),
    path('category-list/',  CategoryListApiView.as_view(), name='category_list'),
    path('category-update-delete/<int:pk>/', CategoryUpdateDeleteApiView.as_view(), name='category_update_delete'),
    path('ingredient-list', IngredientsListApiView.as_view(), name='ingredient-list')
]