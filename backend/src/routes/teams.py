from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from src.core.database import get_db
from src.models.team import TeamModel

router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)

@router.get("/{team_id}/members")
def get_team_members(team_id: int, db: Session = Depends(get_db)):
    team = db.query(TeamModel).options(joinedload(TeamModel.users)).filter(TeamModel.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return {
        "team_name": team.name,
        "members": [
            {
                "id": user.id,
                "surname": user.surname,
                "name": user.name,
                "email": user.email,
                "registered_in": user.registered_in,
                "role": user.role
            } 
            for user in team.users
        ]
    }
