from fastapi import APIRouter
from app.db.supabase import supabase

router = APIRouter(prefix="/artworks", tags=["artworks"])

@router.get("/{artwork_id}")
def get_artwork_detail(artwork_id: str):
    res = (
        supabase.table("Artworks")
        .select("*")
        .eq("id", artwork_id)
        .single()
        .execute()
    )
    return res.data