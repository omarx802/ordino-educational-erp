from pydantic import BaseModel, EmailStr
from typing import Union
from datetime import datetime

class BaseResponse(BaseModel):
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class UserResponse(BaseModel):
    id: int
    name: str
    surname: str
    email: EmailStr
    #is_active=Column(Boolean, default=False)
    registered_in: Union[None, datetime] = None
