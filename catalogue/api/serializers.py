from rest_framework import serializers

from ..models import Product, ProductClass, Category, Ingredient


class ProductClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductClass
        fields = ['title', 'support_warehouse', 'support_ingredients']


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['title', 'price', 'category', 'product_class', 'tag_category', 'tag_product_class']


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['active', 'title',]


class IngredientSerializer(serializers.Serializer):

    class Meta:
        model = Ingredient
        fields = ['title', 'price']