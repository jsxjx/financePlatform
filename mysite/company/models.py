# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
"""
reload(sys)
"""
# Create your models here.

"""
公司基本信息
"""
@python_2_unicode_compatible #only if you need to support Python 2
class CompanyInfo(models.Model):
    stock_id = models.CharField(max_length = 10)
    stock_shorter_name = models.CharField(max_length = 20)
    company_full_name = models.CharField(max_length = 30)
    company_english_name = models.CharField(max_length = 30)
    #注册地址
    registered_address = models.CharField(max_length = 40)
    #注册资本
    registered_capital = models.IntegerField
    #法定代表人
    legal_representative = models.CharField(max_length = 20)
    #行业种类
    industry_type = models.CharField(max_length = 10)
    #上市时间
    listed_time = models.DateTimeField()
    #首次招股时间
    IPO_time = models.DateTimeField()

    def __str__(self):
        return self.stock_id



"""
首发形况表
"""
class IpoIinfo(models.Model):
    stock_id = models.ForeignKey(CompanyInfo)
    #发行日期
    IPO_time = models.DateTimeField()
    #发行总股数
    issued_sum = models.IntegerField()
    #发行价格
    issued_price = models.FloatField( )
    #筹资金额
    financing_amount = models.FloatField( )
    #发行市盈率
    issued_earning_rate = models.FloatField( )
    #发行方式
    issued_method = models.CharField(max_length = 10)
    #主承销商
    main_underwriter = models.CharField(max_length = 20)
    #中签率
    success_rate = models.FloatField( )

"""
增发情况表

class AddIssuanceInfo(models.Model):
"""

"""
股本结构
"""
class CapitalStructure(models.Model):
    stock_id = models.CharField(max_length = 10)
    #变动时间
    change_date = models.DateField(default=datetime.datetime.now().date())
    #公告时间
    announcement_date = models.DateField(default=datetime.datetime.now().date())
    #变动原因
    change_reason = models.CharField(max_length=100, default='reason')
    #人民币普通股
    RMB_ordinary_stock = models.IntegerField()
    #境内上市外资股
    domestically_listed_foreign_capital_shares = models.IntegerField()
    #境外上市外资股
    foreign_capital_shares_listed_overseas = models.IntegerField()
    #国有股
    state_owned_shares = models.IntegerField()
    #总股本
    total_shared = models.IntegerField()

"""
高管任职表
"""
class Excutive(models.Model):
    stock_id = models.CharField(max_length = 10, default='000000')
    stock_shorter_name = models.CharField(max_length = 20,default='company')
    name = models.CharField(max_length = 10)
    #职务
    post = models.CharField(max_length = 10)
    birthday = models.DateTimeField()
    #性别
    gender = models.CharField(max_length = 6)
    #最高学历
    highest_qualification = models.CharField(max_length = 10)

"""
公司财务主要指标
"""
class MajorFinancialIndicy(models.Model):
    stock_id = models.CharField(max_length = 10)
    stock_shorter_name = models.CharField(max_length = 20)
    announce_year = models.CharField(max_length = 10)
    #报告期
    reporting_period = models.CharField(max_length = 10)
    #基本每股收益
    basic_earning_per_share = models.FloatField( )
    #每股净资产
    net_asset_per_share = models.FloatField( )
    #流动比率
    flow_rate = models.FloatField( )
    #资产负债比率
    asset_liability_ratio = models.FloatField( )
    #净利润率
    net_profit_margins = models.FloatField( )
    #总资产率
    total_assets_ratio = models.FloatField( )
    #近资产比率
    near_assets_ratio = models.FloatField( )
    #固定资产比率
    fixed_assets_ratio = models.FloatField( )

"""
大股东增减持
"""
class MajorShareholdersIncreaseOrDecrease(models.Model):
    stock_id = models.CharField(max_length = 10)
    stock_shorter_name = models.CharField(max_length = 20)
    #股东名称
    shareholder_name = models.CharField(max_length = 10)
    #公告

    #公告日
    announcement_date = models.DateTimeField()
    #最新价
    new_price = models.FloatField( )
    #涨跌幅
    rise_or_fall_ratio = models.IntegerField()
    #增减
    rise_or_fall = models.CharField(max_length = 5)
    #变化数量
    change_amount = models.IntegerField()
    #占总股本比例
    old_proportion_of_total_share = models.FloatField( default=0)
    #持流通股比例
    old_proportion_of_tradable_shares = models.FloatField( default=0)
    #占总股本比例
    new_proportion_of_total_share = models.FloatField( default=0)
    #占流通股比例
    new_proportion_of_tradable_share = models.FloatField( default=0)
    #持有总股数
    new_total_number_shares_held = models.IntegerField(default=0)
    #变动开始日
    change_start_date = models.DateField(default=datetime.datetime.now().date())
    #变动结束日
    change_end_date = models.DateField(default=datetime.datetime.now().date())

"""
公告
"""
class Announcement(models.Model):
    stock_id = models.CharField(max_length = 10)
    stock_shorter_name = models.CharField(max_length = 20)
    announcement_date = models.DateTimeField()
    announcement_type = models.CharField(max_length = 10)
    announcement_title = models.CharField(max_length = 30, default="announcement_title")
    announcement_content = models.CharField(max_length = 2000)
