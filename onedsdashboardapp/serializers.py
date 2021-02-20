from rest_framework import serializers
from onedsdashboardapp.models import Onedssuperstore

class StatSerializer(serializers.Serializer):
    Segment = serializers.CharField(max_length=200)
    Sales = serializers.DecimalField(max_digits=15,decimal_places=5)
    Profit = serializers.DecimalField(max_digits=15,decimal_places=5)

    class Meta:
        fields = ('Segment', 'Sales', 'Profit')