from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='author.first_name', read_only=True)
    role = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    date = serializers.DateTimeField(source='created_at', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'name', 'role', 'rating', 'comment', 'date', 'location', 'image']

    def get_role(self, obj):
        # Mock role based on user, or add role to model
        return 'Donor'  # For simplicity

    def get_location(self, obj):
        # Mock location
        return 'Unknown'  # Or add to model

    def get_image(self, obj):
        # Mock image
        return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
