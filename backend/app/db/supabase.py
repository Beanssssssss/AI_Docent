from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    supabase: Client = create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_ANON_KEY
    )
    return supabase

#전역 클라이언트
supabase: Client = get_supabase_client()