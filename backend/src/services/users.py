from src.models.user import UserModel
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from src.core.security import get_password_hash
from datetime import datetime


async def create_user_account(data, db):
    user= db.query(UserModel).filter(UserModel.email==data.email).first()
    if user:
        raise HTTPException(status_code=422, detail="Email is already used.")
    
    new_user = UserModel(
        name=data.name,
        surname=data.surname,
        email=data.email,
        password=get_password_hash(data.password),
        is_active=False,
        registered_in=datetime.now(),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


async def get_user_team(db: Session, user_id: int):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if user and user.team:
        return user.team
    return None