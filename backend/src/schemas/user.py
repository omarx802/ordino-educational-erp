from pydantic import BaseModel, EmailStr

class CreateUserRequest(BaseModel):
    name: str
    surname: str
    email: EmailStr
    password: str
