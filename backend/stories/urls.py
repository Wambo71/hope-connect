from .views import StoryViewSet
from rest_framework.routers import DefaultRouter

# from . import views

router = DefaultRouter()
# Add your viewsets here
router.register(r'stories', StoryViewSet, basename='story')
urlpatterns = router.urls
