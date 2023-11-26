from datetime import date
from pydantic import BaseModel
from typing import Optional

class EventSchema(BaseModel):
    title: Optional[str]
    subtitle: Optional[str]
    location: Optional[str]
    description: Optional[str]
    event_date: Optional[date]
    disabled: Optional[bool]
    image: Optional[str]
    partner: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    price: Optional[float]
    dress_code: Optional[str]



    
    
    
    
    
    
    
    
    
    
    
    
    