from rest_framework.generics import RetrieveAPIView, ListAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import ProductClassSerializer, CategorySerializer, IngredientSerializer, ProductSerializer
from ..models import Product, ProductClass, Category, Ingredient


class ProductClassApiListView(ListAPIView):
    queryset = ProductClass.objects.all()
    serializer_class = ProductClassSerializer
    permission_classes = [AllowAny, ]


class ProductListApiListView(ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny, ]


class CategoryListApiView(ListCreateAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny, ]


class IngredientsListApiView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny, ]
    filter_backends = []
