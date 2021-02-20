from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from onedsdashboardapp.models import Onedssuperstore
from .serializers import StatSerializer
from django.db.models import Sum
from django.db.models.functions import ExtractMonth

class StatList(ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = StatSerializer
    queryset = Onedssuperstore.objects.filter(Order_Date__year=2015).values('Segment').annotate(sales=Sum('Sales'), profit=Sum('Profit'))
    def list(self, request):
        query = self.get_queryset()
        serializer = StatSerializer(list(query), many=True)
        return Response(serializer.data)

class queryList1(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    def get(self, request):
        query_s1 = Onedssuperstore.objects.filter(Order_Date__year=2014).values('Segment').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_s2 = Onedssuperstore.objects.filter(Order_Date__year=2015).values('Segment').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_s3 = Onedssuperstore.objects.filter(Order_Date__year=2016).values('Segment').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_s4 = Onedssuperstore.objects.filter(Order_Date__year=2017).values('Segment').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_c1 = Onedssuperstore.objects.filter(Order_Date__year=2014).values('Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_c2 = Onedssuperstore.objects.filter(Order_Date__year=2015).values('Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_c3 = Onedssuperstore.objects.filter(Order_Date__year=2016).values('Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_c4 = Onedssuperstore.objects.filter(Order_Date__year=2017).values('Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_b1 = Onedssuperstore.objects.filter(Order_Date__year=2014).values('Sub_Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_b2 = Onedssuperstore.objects.filter(Order_Date__year=2015).values('Sub_Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_b3 = Onedssuperstore.objects.filter(Order_Date__year=2016).values('Sub_Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_b4 = Onedssuperstore.objects.filter(Order_Date__year=2017).values('Sub_Category').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_r1 = Onedssuperstore.objects.filter(Order_Date__year=2014).values('Region').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_r2 = Onedssuperstore.objects.filter(Order_Date__year=2015).values('Region').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_r3 = Onedssuperstore.objects.filter(Order_Date__year=2016).values('Region').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_r4 = Onedssuperstore.objects.filter(Order_Date__year=2017).values('Region').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))

        return JsonResponse({"Segment": {2014: list(query_s1), 2015: list(query_s2),
                                    2016: list(query_s3), 2017: list(query_s4)},
                        "Category": {2014: list(query_c1), 2015: list(query_c2),
                                    2016: list(query_c3), 2017: list(query_c4)},
                        "Sub_Category": {2014: list(query_b1), 2015: list(query_b2),
                                        2016: list(query_b3), 2017: list(query_b4)},
                        "Region": {2014: list(query_r1), 2015: list(query_r2),
                                2016: list(query_r3), 2017: list(query_r4)}
                        })

class queryList2(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    def get(self, request):

        query_1 = Onedssuperstore.objects.filter(Order_Date__year=2014).annotate(month=ExtractMonth('Order_Date'))\
                .values('month').annotate(sales=Sum('Sales'), profit=Sum('Profit')).order_by('month')
        query_2 = Onedssuperstore.objects.filter(Order_Date__year=2015).annotate(month=ExtractMonth('Order_Date'))\
                .values('month').annotate(sales=Sum('Sales'), profit=Sum('Profit')).order_by('month')
        query_3 = Onedssuperstore.objects.filter(Order_Date__year=2016).annotate(month=ExtractMonth('Order_Date'))\
                .values('month').annotate(sales=Sum('Sales'), profit=Sum('Profit')).order_by('month')
        query_4 = Onedssuperstore.objects.filter(Order_Date__year=2017).annotate(month=ExtractMonth('Order_Date'))\
                .values('month').annotate(sales=Sum('Sales'), profit=Sum('Profit')).order_by('month')

        return JsonResponse({2014: list(query_1), 2015: list(query_2), 2016: list(query_3), 2017: list(query_4)})


class queryList3(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    def get(self, request):

        query_1 = Onedssuperstore.objects.filter(Order_Date__year=2014).values('State').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_2 = Onedssuperstore.objects.filter(Order_Date__year=2015).values('State').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_3 = Onedssuperstore.objects.filter(Order_Date__year=2016).values('State').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_4 = Onedssuperstore.objects.filter(Order_Date__year=2017).values('State').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))

        return JsonResponse({2014: list(query_1), 2015: list(query_2), 2016: list(query_3), 2017: list(query_4)})


class queryList4(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    def get(self, request):

        query_1 = Onedssuperstore.objects.filter(Order_Date__year=2014).values('City').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_2 = Onedssuperstore.objects.filter(Order_Date__year=2015).values('City').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_3 = Onedssuperstore.objects.filter(Order_Date__year=2016).values('City').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))
        query_4 = Onedssuperstore.objects.filter(Order_Date__year=2017).values('City').annotate(sales=Sum('Sales'),
                                                                                            profit=Sum('Profit'))

        return JsonResponse({2014: list(query_1), 2015: list(query_2), 2016: list(query_3), 2017: list(query_4)})