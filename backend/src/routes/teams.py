from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from src.core.database import get_db
from src.models.team import TeamModel, team_users

router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)

@router.get("/{team_id}/members")
def get_team_members(team_id: int, db: Session = Depends(get_db)):
    team = db.query(TeamModel).options(joinedload(TeamModel.users)).filter(TeamModel.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    members = []
    for user in team.users:

        is_admin = db.query(team_users.c.is_admin).filter(team_users.c.team_id == team_id, team_users.c.user_id == user.id).scalar()

        members.append({
            "id": user.id,
            "surname": user.surname,
            "name": user.name,
            "email": user.email,
            "registered_in": user.registered_in,
            "role": user.role,
            "is_admin": is_admin
        })

    return {
        "team_name": team.name,
        "members": members,
    }
