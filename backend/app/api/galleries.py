from fastapi import APIRouter
from app.services.gallery.gallery_search import fetch_all_galleries

router = APIRouter(prefix="/galleries", tags=["galleries"])

@router.get("")
def list_galleries():
    galleries = fetch_all_galleries()
    return [{"id": g.id, "name": g.name} for g in galleries]