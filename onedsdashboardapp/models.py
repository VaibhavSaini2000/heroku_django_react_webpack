from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Onedssuperstore(models.Model):
    Row_ID = models.BigIntegerField(primary_key=True)
    Order_ID = models.CharField(max_length=200)
    Order_Date = models.DateField(auto_now=False, auto_now_add=False)
    Ship_Date = models.DateField(auto_now=False, auto_now_add=False)
    Ship_Mode = models.CharField(max_length=200)
    Customer_ID = models.CharField(max_length=200)
    Customer_Name = models.CharField(max_length=200)
    Segment = models.CharField(max_length=200)
    Country = models.CharField(max_length=200)
    City = models.CharField(max_length=200)
    State = models.CharField(max_length=200)
    Postal_Code = models.BigIntegerField()
    Region = models.CharField(max_length=200)
    Product_ID = models.CharField(max_length=200)
    Category = models.CharField(max_length=200)
    Sub_Category = models.CharField(max_length=200)
    Product_Name = models.CharField(max_length=500)
    Sales = models.DecimalField(max_digits=15,decimal_places=5)
    Quantity = models.BigIntegerField()
    Discount = models.DecimalField(max_digits=15,decimal_places=5)
    Profit = models.DecimalField(max_digits=15,decimal_places=5)