from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
    responses={404: {"description": "Not found"}},
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/chat")
async def chat_endpoint(websocket: WebSocket, token: str = None):
    try:
        # Example authentication logic (you can validate tokens here)
        if token != "expected_token":
            await websocket.close(code=403)
            return
        
        await manager.connect(websocket)
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Message: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@router.get("/history")
async def get_chat_history():
    # Example: Return a list of dummy messages or fetch from a database
    return [{"user": "Alice", "message": "Hi there!"}, {"user": "Bob", "message": "Hello!"}]
