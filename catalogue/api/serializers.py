from rest_framework import serializers

from ..models import Product, ProductClass, Category, Ingredient


class ProductClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductClass
        fields = ['title', 'support_warehouse', 'support_ingredients']


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['title', 'price', 'category', 'tag_category',
                  'get_igrendients']


class CategorySerializer(serializers.Serializer):

    class Meta:
        model = Category
        fields = ['title']


class IngredientSerializer(serializers.Serializer):

    class Meta:
        model = Ingredient
        fields = ['title', 'price']