from fastapi import APIRouter, Query
from app.services.exhibition.exhibition_search import fetch_exhibitions_by_gallery

router = APIRouter(prefix="/exhibitions", tags=["exhibitions"])

@router.get("")
def list_exhibitions(gallery_id: int = Query(...)):
    exhibitions = fetch_exhibitions_by_gallery(gallery_id)
    # id, name, description, start_date, end_date 반환
    return [
        {
            "id": e.id,
            "name": e.name,
            "description": e.description,
            "start_date": e.start_date.isoformat() if e.start_date else None,
            "end_date": e.end_date.isoformat() if e.end_date else None,
        }
        for e in exhibitions
    ]