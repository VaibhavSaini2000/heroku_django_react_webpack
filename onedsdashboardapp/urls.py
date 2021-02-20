from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from onedsdashboardapp import views as api_views
from onedsdashboardapp.views import StatList, queryList1, queryList2, queryList3, queryList4

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('plot1/', queryList1.as_view()),
    path('plot2/', queryList2.as_view()),
    path('plot3/', queryList3.as_view()),
    path('plot4/', queryList4.as_view()),
    path('segment/', StatList.as_view()),
]