from pydantic import BaseModel

class TeamBase(BaseModel):
    id: int
    name: str
    total_revenue: float
    sales: int

    class Config:
        from_attributes = True
