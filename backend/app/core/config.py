from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str = "development"

    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str

    CLIP_MODEL: str = "ViT-B/32"

    class Config:
        env_file = [".env",".env.local"]

settings = Settings()