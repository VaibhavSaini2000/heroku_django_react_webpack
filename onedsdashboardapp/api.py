from onedsdashboardapp.models import Onedssuperstore
from rest_framework import viewsets, permissions
from .serializers import OnedssuperstoreSerializer
from django.db.models import Sum
# Onedssuperstore Viewset
class OnedssuperstoreViewSet(viewsets.ModelViewSet):
    queryset = Onedssuperstore.objects.filter(Order_Date__year='2015').values('Segment').aggregate(sales=Sum('Sales'))
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = OnedssuperstoreSerializer

    #permission_classes = [
    #    permissions.IsAuthenticated,
    #]
    #serializer_class = OnedssuperstoreSerializer

    #def get_queryset(self):
    #    return self.request.user.leads.all()

    #def perform_create(self, serializer):
    #    serializer.save(owner=self.request.user)