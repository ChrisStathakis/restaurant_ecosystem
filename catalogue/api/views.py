from rest_framework.generics import RetrieveAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import ProductClassSerializer, CategorySerializer, IngredientSerializer, ProductSerializer
from ..models import Product, ProductClass, Category, Ingredient


class ProductClassApiListView(ListCreateAPIView):
    queryset = ProductClass.objects.all()
    serializer_class = ProductClassSerializer
    permission_classes = [AllowAny, ]


class ProductClassApiUpdateView(RetrieveUpdateDestroyAPIView):
    queryset = ProductClass.objects.all()
    serializer_class = ProductClassSerializer
    permission_class = [AllowAny, ]


class ProductListApiListView(ListCreateAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny, ]


class ProductUpdateDeleteApiView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryListApiView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny, ]


class CategoryUpdateDeleteApiView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny, ]


class IngredientsListApiView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny, ]
    filter_backends = []
