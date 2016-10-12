
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import CountriesData, Index, IndexData

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the API representation.

    """
    class Meta:
        """Meta
        """
        model = User
        fields = ('url', 'username', 'email', 'is_staff', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the API representation.

    """
    class Meta:
        """Meta
        """
        model = Group
        fields = ('url', 'name')

class CountriesDataSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the API representation.

    """
    class Meta:
        """Meta
        """
        model = CountriesData
        fields = ('url', 'nameEN', 'nameCN', 'continent')

class IndexSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the API representation.

    """
    class Meta:
        """Meta
        """
        model = Index
        fields = ('url', 'nameEN', 'nameCN', 'shortnameEN', 'unit', 'frequency')

class IndexDataSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the Api
    """
    class Meta:
        """Meta
        """
        model = IndexData
        fields = (
            'url',
            'country_name',
            'index_name',
            'data_years',
            'data_months',
            'data_value'
        )
