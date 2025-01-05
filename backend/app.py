
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.routes.users import router as user_router
from src.routes.auth import router as auth_router
from src.core.security import JWTAuth
from starlette.middleware.authentication import AuthenticationMiddleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # a remplacer
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
app.add_middleware(AuthenticationMiddleware, backend=JWTAuth())


@app.get('/')
def Checking():
    return JSONResponse(content={"status":"Running !"})
