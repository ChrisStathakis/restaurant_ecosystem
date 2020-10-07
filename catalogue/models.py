from django.db import models


class ProductClass(models.Model):
    title = models.CharField(max_length=240, unique=True)
    support_warehouse = models.BooleanField(default=False)
    support_ingredients = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Category(models.Model):
    active = models.BooleanField(default=True)
    title = models.CharField(max_length=240, unique=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    active = models.BooleanField(default=True)
    product_class = models.ForeignKey(ProductClass, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=240, unique=True)

    def __str__(self):
        return self.title

    def support_ingredients(self):
        return self.product_class.support_ingredients

    def tag_category(self):
        return self.category.title

    def get_ingredients(self):
        return self.ingredient_set.all() if self.support_ingredients() else self.ingredient_set.none()


class Ingredient(models.Model):
    title = models.CharField(max_length=200)
    product_related = models.ManyToManyField(Product)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title

