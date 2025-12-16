from rest_framework import serializers
from .models import Story 
# Create your serializers here.  
class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'


