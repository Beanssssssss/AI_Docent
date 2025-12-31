from pydantic import BaseModel
from datetime import date
from typing import Optional

class ExhibitionModel(BaseModel):
    id: int
    gallery_id: int

    name: str
    description: str
    info: str

    start_date: date
    end_date: date
    is_now: bool

    brochure: Optional[str] = None
    location: str
    admission_fee: Optional[str] = None