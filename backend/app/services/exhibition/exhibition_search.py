from app.db.supabase import supabase
from app.models.exhibition import ExhibitionModel
from typing import List


def fetch_exhibitions_by_gallery(gallery_id: int) -> List[ExhibitionModel]:
    res = (
        supabase.table("Exhibition")
        .select("*")
        .eq("gallery_id", gallery_id)
        .execute()
    )
    
    exhibitions = []
    for row in res.data:
        exhibitions.append(ExhibitionModel(**row))
    
    return exhibitions