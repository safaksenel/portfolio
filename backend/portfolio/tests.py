import json
from django.test import TestCase, Client
from portfolio.models import Project, Service, ProjectCategory
from inquiries.models import ContactInquiry


class PortfolioApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.service = Service.objects.create(
            title="Test Automation Service",
            slug="test-automation",
            description="High speed automation",
            icon_name="Bot",
            deliverables=["Deliverable 1", "Deliverable 2"],
            order=1,
        )
        self.project = Project.objects.create(
            title="Playwright Scraper Test",
            slug="playwright-scraper-test",
            category=ProjectCategory.SCRAPING,
            short_description="High-throughput scraper",
            problem_statement="Problem description",
            solution_architecture="Solution architecture",
            tech_stack=["Python 3.14", "Playwright"],
            metrics={"speed": "100req/s"},
            is_featured=True,
            order=1,
        )

    def test_health_check_endpoint(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("status", data)
        self.assertIn("python_version", data)
        self.assertTrue(data["python_version"].startswith("3.14"))
        self.assertIn("django_version", data)
        self.assertEqual(data["database_status"], "connected")

    def test_projects_list_endpoint(self):
        response = self.client.get("/api/projects")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(len(data), 1)
        self.assertEqual(data[0]["slug"], "playwright-scraper-test")

    def test_projects_category_filter(self):
        response = self.client.get("/api/projects?category=scraping")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(all(p["category"] == "scraping" for p in data))

    def test_projects_detail_endpoint(self):
        response = self.client.get("/api/projects/playwright-scraper-test")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["title"], "Playwright Scraper Test")
        self.assertEqual(data["solution_architecture"], "Solution architecture")

    def test_projects_detail_not_found(self):
        response = self.client.get("/api/projects/non-existent-project")
        self.assertEqual(response.status_code, 404)

    def test_services_endpoint(self):
        response = self.client.get("/api/services")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(len(data), 1)
        self.assertEqual(data[0]["slug"], "test-automation")

    def test_contact_submission_success(self):
        payload = {
            "full_name": "Test Client",
            "email": "client@example.com",
            "service_type": "Web Scraping",
            "budget_range": "$2,000 - $5,000",
            "message": "We need an automated web scraping pipeline built for our platform.",
            "honeypot": "",
        }
        response = self.client.post(
            "/api/contact",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertTrue(
            ContactInquiry.objects.filter(email="client@example.com").exists()
        )

    def test_contact_submission_honeypot_bot_prevention(self):
        initial_count = ContactInquiry.objects.count()
        payload = {
            "full_name": "Spam Bot",
            "email": "spambot@spam.com",
            "service_type": "Spam",
            "budget_range": "Cheap",
            "message": "Buy cheap watches at spam dot com http://spam.xyz",
            "honeypot": "http://spambot.net",  # bot filled the hidden honeypot
        }
        response = self.client.post(
            "/api/contact",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        # Should not create any new record in the database
        self.assertEqual(ContactInquiry.objects.count(), initial_count)

    def test_contact_submission_invalid_email(self):
        payload = {
            "full_name": "Test Client",
            "email": "not-an-email",
            "service_type": "Web Scraping",
            "budget_range": "$2,000 - $5,000",
            "message": "Valid length message here for testing purposes.",
            "honeypot": "",
        }
        response = self.client.post(
            "/api/contact",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertIn("detail", data)

    def test_contact_submission_missing_required_fields(self):
        payload = {
            "full_name": "",  # min_length is 2
            "email": "valid@example.com",
            "message": "short",  # min_length is 10
        }
        response = self.client.post(
            "/api/contact",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertIn("detail", data)

    def test_openapi_docs_endpoint(self):
        response = self.client.get("/api/docs")
        self.assertEqual(response.status_code, 200)

