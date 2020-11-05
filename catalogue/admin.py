from django.contrib import admin

from .models import Product, ProductClass, Category, Ingredient


@admin.register(ProductClass)
class ProductClassAdmin(admin.ModelAdmin):
    list_display = ['title', 'support_ingredients', 'support_warehouse']
    search_fields = ['title', ]

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'active']
    list_filter = ['active', ]
    search_fields = ['title']


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['title', 'price']
    search_fields = ['title', ]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'product_class', 'category', 'active', ]
    list_filter = ['active', 'category', ]
    fields = ['active', 'title', 'product_class', 'category', 'price']
    '''
    fieldsets = (
        ('General Info', {
                'fields': (
                    'active',
                    ('title', 'product_class'),
                    'price'
            )
            }
        ),

    )
    '''

    def add_view(self, request, form_url='', extra_context=None):
        # self.exclude = ('active', )
        return super(ProductAdmin, self).add_view(request)