# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-08-18 15:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0003_auto_20160818_2244'),
    ]

    operations = [
        migrations.AddField(
            model_name='excutive',
            name='stock_id',
            field=models.CharField(default='000000', max_length=10),
        ),
        migrations.AddField(
            model_name='excutive',
            name='stock_shorter_name',
            field=models.CharField(default='company', max_length=20),
        ),
    ]
