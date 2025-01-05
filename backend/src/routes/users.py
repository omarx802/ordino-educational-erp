from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from src.core.database import get_db
from src.schemas.user import CreateUserRequest
from src.schemas.team import TeamBase
from src.services.users import create_user_account, get_user_team
from src.core.security import oauth2_scheme
from src.responses.user import UserResponse;

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)

user_router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme)]
)

@router.post('', status_code=status.HTTP_201_CREATED)
async def create_user(data: CreateUserRequest, db: Session = Depends(get_db)):
    await create_user_account(data=data, db=db)
    payload = {"message": "User account has been succesfully created"}
    return JSONResponse(content=payload)


@user_router.post('/me', status_code=status.HTTP_200_OK, response_model=UserResponse)
def get_user_detail(request: Request):
    return request.user

@user_router.get("/me/team", response_model=TeamBase)
async def fetch_user_team(request: Request, db: Session = Depends(get_db)):
    user_id = request.user.id
    team = await get_user_team(db, user_id)
    if team:
        return team
    else:
        return {"message": "Team not found"}