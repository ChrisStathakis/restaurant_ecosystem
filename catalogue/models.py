from django.db import models


class ProductClass(models.Model):
    title = models.CharField(max_length=240, unique=True, verbose_name='ΤΙΤΛΟΣ')
    support_warehouse = models.BooleanField(default=False, verbose_name='ΥΠΟΣΤΗΡΙΖΕΙ ΣΥΝΑΛΛΑΓΕΣ')
    support_ingredients = models.BooleanField(default=False, verbose_name='ΥΠΟΣΤΗΡΙΖΕΙ ΜΕΓΕΘΟΛΟΓΙΟ')

    class Meta:
        verbose_name_plural = 'ΕΙΔΗ'
        verbose_name = 'ΕΙΔΟΣ'

    def __str__(self):
        return self.title


class Category(models.Model):
    active = models.BooleanField(default=True, verbose_name='ΚΑΤΑΣΤΑΣΗ')
    title = models.CharField(max_length=240, unique=True, verbose_name='ΤΙΤΛΟΣ')

    class Meta:
        verbose_name_plural = 'ΚΑΤΗΓΟΡΙΕΣ'
        verbose_name = 'ΚΑΤΗΓΟΡΙΑ'

    def __str__(self):
        return self.title


class Product(models.Model):
    active = models.BooleanField(default=True, verbose_name='ΚΑΤΑΣΤΑΣΗ')
    product_class = models.ForeignKey(ProductClass, on_delete=models.CASCADE, verbose_name='ΕΙΔΟΣ')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='ΚΑΤΗΓΟΡΙΑ')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='ΤΙΜΗ')
    title = models.CharField(max_length=240, unique=True, verbose_name='ΤΙΤΛΟΣ')

    class Meta:
        verbose_name = 'ΠΡΟΙΟΝ'
        verbose_name_plural = 'ΠΡΟΙΟΝΤΑ'

    def __str__(self):
        return self.title

    def support_ingredients(self):
        return self.product_class.support_ingredients

    def tag_category(self):
        return self.category.title if self.category else 'No Category'

    def tag_product_class(self):
        return self.product_class.title

    def get_ingredients(self):
        return self.ingredient_set.all() if self.support_ingredients() else self.ingredient_set.none()


class Ingredient(models.Model):
    title = models.CharField(max_length=200, verbose_name='ΤΙΤΛΟΣ')
    product_related = models.ManyToManyField(Product, verbose_name='ΠΡΟΪΟΝ')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='ΤΙΜΗ')

    class Meta:
        verbose_name = 'ΠΡΟΣΘΕΤΟ'
        verbose_name_plural = 'ΠΡΟΣΘΕΤΑ'

    def __str__(self):
        return self.title

