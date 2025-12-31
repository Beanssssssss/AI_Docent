from app.db.supabase import supabase
from app.models.gallery import GalleryModel
from typing import List


def fetch_all_galleries() -> List[GalleryModel]:
    res = supabase.table("Gallery").select("*").execute()
    
    galleries = []
    for row in res.data:
        galleries.append(GalleryModel(**row))
    
    return galleries
