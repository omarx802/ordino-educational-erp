from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from src.core.database import Base
from datetime import datetime
from src.models.team import TeamModel

class UserModel(Base):
    __tablename__ = "users"

    name = Column(String(100))
    surname = Column(String(100))
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_active=Column(Boolean, default=False)
    registered_in = Column(DateTime, default=datetime.utcnow)
    role=Column(String, nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)

    team = relationship(TeamModel, back_populates="users")
