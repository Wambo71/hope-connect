from django.db import models
from django.contrib.auth.models import User


class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey('stories.Story', on_delete=models.CASCADE)
    rating = models.IntegerField(
        choices=[(i, i) for i in range(1, 6)])  # 1 to 5 stars
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.author} on {self.story}'
