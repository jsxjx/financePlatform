from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<stock_id>[0-9]+)/info/$', views.info, name='info'),
    url(r'^(?P<stock_id>[0-9]+)/capitalStructure/$', views.capitalStructure, name='capitalStructure'),
    url(r'^(?P<stock_id>[0-9]+)/majorShareholdersIncreaseOrDecrease/$',
        views.majorShareholdersIncreaseOrDecrease, name='majorShareholdersIncreaseOrDecrease'),

    url(r'^announcement/$', views.announcement, name='announcement'),
    url(r'^majorShareholdersIncreaseOrDecrease/$',
        views.majorShareholdersIncreaseOrDecrease, name='majorShareholdersIncreaseOrDecrease'),
    url(r'^ipoIinfo/$', views.ipoIinfo, name='ipoIinfo'),
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^countryData/$', views.countryData, name='countryData'),
    url(r'^countryData/worldJson/$', views.worldJson, name='worldJson'),
    url(r'^searchCompany/$', views.searchCompany, name='searchCompany'),

    url(r'^', include('django.contrib.auth.urls')),

    url(r'^i18n/', include('django.conf.urls.i18n')),

    #url(r'^testTrans/$', views.testTrans, name='testTrans'),

]
