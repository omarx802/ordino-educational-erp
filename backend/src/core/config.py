import os
from pathlib import Path
from dotenv import load_dotenv
from urllib.parse import quote_plus
from pydantic_settings import BaseSettings

env_path= Path(".") / ".env"
load_dotenv(dotenv_path=env_path)

class Settings(BaseSettings):
    APP_NAME: str = "My FastAPI Project"
    DEBUG: bool = True
    DATABASE_URL: str = os.getenv('URL_DATABASE')

    # JWT 
    JWT_SECRET: str = os.getenv('JWT_SECRET', '709d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7')
    JWT_ALGORITHM: str = os.getenv('JWT_ALGORITHM', "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = os.getenv('JWT_TOKEN_EXPIRE_MINUTES', 60)


def get_settings() -> Settings:
    return Settings()
