import pdb
#import json
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.http import FileResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from .models import  MajorFinancialIndicy, CompanyInfo, IpoIinfo, MajorShareholdersIncreaseOrDecrease,Announcement,Excutive, CapitalStructure, IndexData, CountriesData, Index
from django.contrib.auth import logout
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, filters, generics
from company.serializer import UserSerializer, GroupSerializer, IndexDataSerializer, CountriesDataSerializer, IndexSerializer
#from django.utils.translation import ugettext
#from django.utils.translation import ugettext_lazy
# Create your views here.



@require_http_methods(["GET", "POST"])
def index(request):
    """ view function to inde page

    """
    return render(request, 'company/index.html')

def info(request, stock_id):
    """ view function to info page

    """
    company_info = CompanyInfo.objects.get(stock_id=stock_id)
    company_excutive = Excutive.objects.filter(stock_id=stock_id)
    major_financial_indicy_list = MajorFinancialIndicy.objects.filter(stock_id=stock_id).order_by('-announce_year', '-reporting_period')
    # response = "You're looking for the company which stock_id = %s."
    context = {'company_info':company_info, 'company_excutive':company_excutive, 'major_financial_indicy_list': major_financial_indicy_list}

    #pdb.set_trace()
    return render(request, 'company/info.html', context)

def capitalStructure(request, stock_id):
    """ get data from capitalStructure

    Args:
        request:
        stock_id:

    Returns:
        A HttpResponse

    Raises:
        Error
    """
    company_capital_structure = CapitalStructure.objects.filter(
        stock_id=stock_id).order_by('change_date')
    context = {'company_capital_structure': company_capital_structure}
    return render(request, 'company/capitalStructure.html', context)


def announcement(request):
    """ return announcement page

    Args:

    Returns:
        A HttpResponse

    Raises:
        Error
    """
    latest_announcements_list = Announcement.objects.order_by('announcement_date')[:10]
    context = {'latest_announcements_list':latest_announcements_list}
    #pdb.set_trace()
    return render(request, 'company/announcement.html', context)

def majorShareholdersIncreaseOrDecrease(request):
    """ return big page

    Args:

    Returns:
        A HttpResponse

    Raises:
        Error
    """
    major_Shareholders_change_list = MajorShareholdersIncreaseOrDecrease.objects.all()
    context = {'major_Shareholders_change_list': major_Shareholders_change_list}
    #pdb.set_trace()
    return render(request, 'company/majorShareholdersIncreaseOrDecrease.html', context)

def ipoIinfo(request):
    """ return ipoInfo page

    Args:

    Returns:
        A HttpResponse

    Raises:
        Error
    """
    ipo_info_list = IpoIinfo.objects.order_by('IPO_time')

    '''
    for ipo_info in ipo_infor_list:
        i_company_info = CompanyInfo.objects.get(stock_id=ipo_info.stock_id)
    '''
    context = {'ipo_info_list':ipo_info_list}
    #pdb.set_trace()
    return render(request, 'company/ipoIinfo.html', context)

def majorFinancialIndicy(request, stock_id):
    """ return majorFinancialIndicy page
    Args:
        stock_id
    Returns:
        A HttpResponse
    Raises:
        Error
    """
    major_financial_list = MajorFinancialIndicy.objects.filter(stock_id=stock_id).order_by('change_date')
    context = {'major_financial_indicy_list': major_financial_list}
    return render(request, 'company/majorFinancialIndicy.html', context)

@login_required
def logOut(request):
    """ func logout
    Args:
    Returns:
    Raises:
        Error
    """

    logOut(request)
    return

def signup(request):
    """ func signup

    the func to create user

    Returns:
    Raises:
        Error
    """
    if request.method == 'GET':
        #template = loader.get_template('company/signup.html')
        return render(request, 'company/signup.html')
    elif request.method == 'POST':
        user_name = request.POST.get('user_name', '')
        user_password = request.POST.get('user_password', '')
        user_email = request.POST.get('user_email', '')

        if user_name and user_password and user_email:
            user = User.objects.create_user(username = user_name,
                email = user_email, password = user_password)
            if user:
                user.save()
                return render(request, 'company/login.html')
            else:
                pass
        else:
            pass

def countryData(request):
    """ func to countryData page

    Returns:
    Raises:
        Error
    """
    return render(request, 'company/countryData.html')

def worldJson():
    """
    Response ths data(json)  for ajax(GET) from browser, to init the map for Echarts.js

    Returns:
        the world.json data

    Raise:
        Error
    """
    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, 'world.json')
    return FileResponse(open(file_path, 'rb'))


def searchCompany(request):
    """ func to search company page

    Returns:
    Raises:
        Error
    """
    #pdb.set_trace()
    if request.method == 'POST':
        search_word = request.POST.get('search')
        result_list = CompanyInfo.objects.filter(stock_shorter_name__contains = search_word)
        context = {'result_list': result_list}
        return render(request, 'company/searchResult.html', context)
    else:
        return 0

class UserViewSet(viewsets.ModelViewSet):
    """UserViewSet class

    ViewSets define the view behavior.

    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
     API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class IndexDataViewSet(viewsets.ModelViewSet):
    """
    API to indexdata
    """
    queryset = IndexData.objects.all()
    serializer_class = IndexDataSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('country_name', 'index_name', 'data_years', 'data_months')

class IndexViewSet(viewsets.ModelViewSet):
    """
    API to index
    """
    queryset = Index.objects.all()
    serializer_class = IndexSerializer

class CountriesDataViewSet(viewsets.ModelViewSet):
    """
    API
    """
    #pdb.set_trace()
    queryset = CountriesData.objects.all()
    serializer_class = CountriesDataSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('nameEN', 'nameCN')

class CountiresDataList(generics.ListAPIView):
    serializer_class = CountriesDataSerializer


    def get_queryset(self):
        queryset = CountriesData.objects.all()
        nameEN = self.request.query_params.get('nameEN', None)
        if nameEN is not None:
            queryset = queryset.filter(nameEN=nameEN)
        return queryset
"""
def testTrans(request,count):
    count = Report.objects.count()
    if count == 1:
        name = Report._meta.verbose_name
    else:
        name = Report._meta.verbose_name_plural

    text = ungettext(
        'There is %(count)d %(name)s available.',
        'There are %(count)d %(name)s available.',
        count
    ) % {
        'count': count,
        'name': name
    }
    return HttpResponse(output)
"""
