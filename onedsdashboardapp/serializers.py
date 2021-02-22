from rest_framework import serializers
from onedsdashboardapp.models import Onedssuperstore

class StatSerializer(serializers.Serializer):
    Segment = serializers.CharField(max_length=200)
    Sales = serializers.DecimalField(max_digits=15,decimal_places=5)
    Profit = serializers.DecimalField(max_digits=15,decimal_places=5)

    class Meta:
        fields = ('Segment', 'Sales', 'Profit')

class SegSerializer(serializers.Serializer):
    segment = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('segment', 'year', 'sales', 'profit')

class CatSerializer(serializers.Serializer):
    category = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('category', 'year', 'sales', 'profit')

class SubSerializer(serializers.Serializer):
    sub_category = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('sub_category', 'year', 'sales', 'profit')

class RegSerializer(serializers.Serializer):
    region = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('region', 'year', 'sales', 'profit')


class OrderSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    month = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('year', 'month', 'sales', 'profit')


class StateSerializer(serializers.Serializer):
    state = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('state', 'year', 'sales', 'profit')

class CitySerializer(serializers.Serializer):
    city = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('city', 'year', 'sales', 'profit')