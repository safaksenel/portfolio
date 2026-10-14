from datetime import datetime
from typing import Optional, List, Dict, Any
from ninja import Schema


class ProjectListItemOut(Schema):
    id: int
    title: str
    slug: str
    category: str
    short_description: str
    tech_stack: List[str]
    metrics: Dict[str, Any]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    is_featured: bool
    order: int
    created_at: datetime


class ProjectDetailOut(Schema):
    id: int
    title: str
    slug: str
    category: str
    short_description: str
    problem_statement: str
    solution_architecture: str
    tech_stack: List[str]
    metrics: Dict[str, Any]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    is_featured: bool
    order: int
    created_at: datetime


class ServiceOut(Schema):
    id: int
    title: str
    slug: str
    description: str
    icon_name: str
    deliverables: List[str]
    order: int
