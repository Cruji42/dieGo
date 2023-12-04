from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class EventSchema(BaseModel):
    event_id: Optional[int]
    title: Optional[str]
    subtitle: Optional[str]
    location: Optional[str]
    description: Optional[str]
    event_date: Optional[datetime]
    disabled: Optional[bool]
    image: Optional[str]
    partner: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    price: Optional[float]
    dress_code: Optional[str]



    
    
    
    
    
    
    
    
    
    
    
    
    