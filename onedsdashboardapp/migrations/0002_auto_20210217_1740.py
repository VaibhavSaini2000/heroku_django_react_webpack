# Generated by Django 3.1.6 on 2021-02-17 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onedsdashboardapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Category',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='City',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Country',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Customer_ID',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Customer_Name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Order_ID',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Product_ID',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Product_Name',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Region',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Segment',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Ship_Mode',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='State',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='onedssuperstore',
            name='Sub_Category',
            field=models.CharField(max_length=200),
        ),
    ]
