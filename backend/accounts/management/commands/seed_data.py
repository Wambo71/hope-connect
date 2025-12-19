from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import UserProfile
from stories.models import Story
from donations.models import Donation
from reviews.models import Review
from partners.models import Partner
from django.utils import timezone
import random

class Command(BaseCommand):
    help = 'Seed the database with realistic data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')

        # Create users
        users_data = [
            {'username': 'john_doe', 'email': 'john@example.com', 'first_name': 'John', 'last_name': 'Doe'},
            {'username': 'jane_smith', 'email': 'jane@example.com', 'first_name': 'Jane', 'last_name': 'Smith'},
            {'username': 'admin', 'email': 'admin@hopeconnect.org', 'first_name': 'Admin', 'last_name': 'User'},
            {'username': 'sarah_j', 'email': 'sarah@example.com', 'first_name': 'Sarah', 'last_name': 'Johnson'},
            {'username': 'michael_c', 'email': 'michael@example.com', 'first_name': 'Michael', 'last_name': 'Chen'},
            {'username': 'emma_w', 'email': 'emma@example.com', 'first_name': 'Emma', 'last_name': 'Wilson'},
        ]

        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                }
            )
            if created:
                user.set_password('password123')
                user.save()
            users.append(user)

        # Create user profiles
        for user in users:
            UserProfile.objects.get_or_create(  # pylint: disable=no-member
                user=user,
                defaults={
                    'bio': f'Bio for {user.first_name} {user.last_name}',
                    'location': random.choice(['New York', 'London', 'Nairobi', 'Cape Town', 'Addis Ababa']),
                    'phone': f'+1{random.randint(1000000000, 9999999999)}',
                }
            )

        # Create stories
        stories_data = [
            {
                'title': 'Education for All: A Success Story',
                'content': 'In rural Kenya, we partnered with local communities to build schools and provide educational materials. Over 500 children now have access to quality education.',
                'approved': True,
            },
            {
                'title': 'Clean Water Initiative in Ethiopia',
                'content': 'Our clean water project in Addis Ababa has provided safe drinking water to over 10,000 people. The community health has improved significantly.',
                'approved': True,
            },
            {
                'title': 'Healthcare Access in South Africa',
                'content': 'Mobile clinics are bringing healthcare services to remote areas. We have vaccinated thousands and treated various illnesses.',
                'approved': True,
            },
            {
                'title': 'Women Empowerment Program',
                'content': 'Training programs for women in entrepreneurship have led to the creation of small businesses and economic independence.',
                'approved': False,
            },
        ]

        stories = []
        for story_data in stories_data:
            story = Story.objects.create(  # pylint: disable=no-member
                author=random.choice(users),
                title=story_data['title'],
                content=story_data['content'],
                approved=story_data['approved'],
                created_at=timezone.now() - timezone.timedelta(days=random.randint(1, 365))
            )
            stories.append(story)

        # Create donations
        for _ in range(20):
            Donation.objects.create(  # pylint: disable=no-member
                donor=random.choice(users),
                donor_name=None,
                donor_email=None,
                amount=random.choice([25, 50, 100, 250, 500, 1000]),
                frequency=random.choice(['one-time', 'monthly', 'yearly']),
                payment_method=random.choice(['card', 'paypal', 'bank']),
                story=random.choice(stories) if random.random() > 0.5 else None,
                message=random.choice(['Keep up the great work!', 'Thank you for making a difference.', '', 'God bless your efforts.']),
                created_at=timezone.now() - timezone.timedelta(days=random.randint(1, 365))
            )

        # Create reviews
        for _ in range(15):
            Review.objects.create(  # pylint: disable=no-member
                author=random.choice(users),
                story=random.choice(stories),
                rating=random.randint(3, 5),
                comment=random.choice([
                    'Inspiring story! Thank you for sharing.',
                    'This touched my heart. Made me want to donate.',
                    'Great work by the organization.',
                    'Hope to see more stories like this.',
                    'Very impactful project.'
                ]),
                created_at=timezone.now() - timezone.timedelta(days=random.randint(1, 365))
            )

        # Create partners
        partners_data = [
            {
                'name': 'UNICEF',
                'description': 'United Nations Children\'s Fund working for children\'s rights worldwide.',
                'website': 'https://www.unicef.org'
            },
            {
                'name': 'World Health Organization',
                'description': 'Leading international organization for public health.',
                'website': 'https://www.who.int'
            },
            {
                'name': 'Red Cross',
                'description': 'International humanitarian organization providing emergency assistance.',
                'website': 'https://www.redcross.org'
            },
            {
                'name': 'Local Community Foundation',
                'description': 'Supporting local initiatives for community development.',
                'website': 'https://example.com'
            },
        ]

        for partner_data in partners_data:
            Partner.objects.get_or_create(  # pylint: disable=no-member
                name=partner_data['name'],
                defaults={
                    'description': partner_data['description'],
                    'website': partner_data['website'],
                }
            )

        self.stdout.write(self.style.SUCCESS('Data seeded successfully!'))  # pylint: disable=no-member