from rest_framework import viewsets
from .models import Cars
from .serializers import CarsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def index(req):
    return Response('hello')

class CarsViewSet(viewsets.ModelViewSet):
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer
