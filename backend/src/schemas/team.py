from pydantic import BaseModel

class TeamBase(BaseModel):
    id: int
    name: str
    total_revenue: int

    class Config:
        orm_mode = True
