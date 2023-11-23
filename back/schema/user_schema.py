from pydantic import BaseModel, EmailStr
from typing import Optional

class UserSchema(BaseModel):
    name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    password: Optional[str]
    birth_day: Optional[str]
    genre: Optional[str]
    disabled: Optional[bool]
    role: Optional[str]
    phone_number: Optional[str]
    picture: Optional[str]