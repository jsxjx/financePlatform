from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the API representation.

    """
    class Meta:
        """Meta
        """
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """Serializers define the API representation.

    """
    class Meta:
        """Meta
        """
        model = Group
        fields = ('url', 'name')
