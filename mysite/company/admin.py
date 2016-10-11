from django.contrib import admin

from .models import Announcement, CapitalStructure, CompanyInfo, Excutive, IpoIinfo, MajorFinancialIndicy, MajorShareholdersIncreaseOrDecrease, CountriesData, Index, IndexData
# Register your models here.
admin.site.register(Announcement)
admin.site.register(CapitalStructure)
admin.site.register(CompanyInfo)
admin.site.register(Excutive)
admin.site.register(IpoIinfo)
admin.site.register(MajorFinancialIndicy)
admin.site.register(MajorShareholdersIncreaseOrDecrease)
admin.site.register(CountriesData)
admin.site.register(Index)
admin.site.register(IndexData)
