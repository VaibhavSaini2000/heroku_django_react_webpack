# Restful-api

## Data Dashboard with Django-Rest framework
This is a Dashboard app built using Django REST Framework for backend and ReactJS for frontend. It include 4 charts with filters for year, sales and profit.

It has the following features:
- The backend is hosted at heroku, using PostgreSQL for database
- ReactJS Frontend consumes data prepared by Rest-API in JSON format
- User Authentication with session tokens
- Session management including time spent on website and interaction with charts/filters

## Requirements
- Python 3.6 or higher
- Django 3.0 or higher
- djangorestframework (3.8+)
- ReactJS

## Usage
The API calls are generated using serializer with following structure:
```python
from rest_framework import serializers

class SegSerializer(serializers.Serializer):
    segment = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('segment', 'year', 'sales', 'profit')
```
The views.py file generates required object query and calls on serializers to generate JSON response for the API. 
This serializer will automatically convert all data fields obtained using filters applied to model objects and we receive a complete instance with filled data.
```python
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from restapi.models import superstore
from .serializers import SegSerializer

class segmentList(ListAPIView):
    queryset = ''
    def list(self, request):
        query1 = superstore.objects.annotate(year=ExtractYear('order_date')).values('segment', 'year')\
            .annotate(sales=Sum('sales'), profit=Sum('profit')).order_by('year')
        serializer =SegSerializer(list(query1), many=True)

        return Response(serializer)
```
The APIList view can be obtained from the link specified at urls.py file.
For example, we get the following data with related nested fields from our 'type' serializer:
```
{
    "segment": {
        "2014": [
            {
                "segment": "Consumer",
                "year": 2014,
                "sales": "262956.80060",
                "profit": "23837.31970"
            },
            {
                "segment": "Corporate",
                "year": 2014,
                "sales": "127797.49570",
                "profit": "13325.91250"
            },
            {
                "segment": "Home Office",
                "year": 2014,
                "sales": "89101.91180",
                "profit": "11724.99990"
            }
        ],
        "2015": [...]
        ...
        }
}
```
## ReactJS Based Frontend

## Session Management

## User Authentication


## Authors
- github/ppundeer
- github/VaibhavSaini2000
- github/hitesh0902