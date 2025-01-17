from sqlalchemy import Column, Integer, String, ForeignKey, Table, Float, Boolean
from sqlalchemy.orm import relationship
from src.core.database import Base

class TeamModel(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    total_revenue=Column(Float, default=0)
    sales=Column(Integer, default=0)

    users = relationship("UserModel", back_populates="team")


team_users = Table(
    "team_users",
    Base.metadata,
    Column("team_id", Integer, ForeignKey("teams.id", ondelete="CASCADE")),
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE")),
    Column("is_admin", Boolean, default=False)
)
