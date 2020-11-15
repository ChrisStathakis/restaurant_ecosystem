from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET', ])
def homepage_api_view(request, format=None):
    return Response({
        'catalogue': reverse('catalogue:homepage', format=format, request=request)
    }

    )


@api_view(['GET', ])
def catalogue_homepage_view(request, format=None):
    return Response({
        'product_list': reverse('catalogue:product_list', format=format, request=request),
        'category_list': reverse('catalogue:category_list', format=format, request=request),
        'product_class_list': reverse('catalogue:product_class_list', format=format, request=request)
    })
