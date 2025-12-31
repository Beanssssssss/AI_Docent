from pydantic import BaseModel

class GalleryModel(BaseModel):
    id: int
    name: str
    location: str
    description: str