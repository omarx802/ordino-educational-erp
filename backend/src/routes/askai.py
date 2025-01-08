from fastapi import APIRouter, HTTPException
from src.schemas.askai import UserInput
from src.models.askai import conversations, Askai
from src.services.groq_service import query_groq_api

router = APIRouter()

def get_or_create_conversation(conversation_id: str) -> Askai:
    if conversation_id not in conversations:
        conversations[conversation_id] = Askai()
    return conversations[conversation_id]

@router.post("/chat/")
async def chat(input: UserInput):
    conversation = get_or_create_conversation(input.conversation_id)

    if not conversation.active:
        raise HTTPException(
            status_code=400, 
            detail="The chat session has ended. Please start a new session."
        )

    try:
        # Append the user's message to the conversation
        conversation.messages.append({
            "role": input.role,
            "content": input.message
        })

        response = query_groq_api(conversation)

        conversation.messages.append({
            "role": "assistant",
            "content": response
        })

        return {
            "response": response,
            "conversation_id": input.conversation_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
