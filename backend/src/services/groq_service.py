from fastapi import HTTPException
from groq import Groq
from src.models.askai import Askai
from src.core.config import get_settings

settings= get_settings()

client = Groq(api_key=settings.GROQ_API_KEY)

def query_groq_api(conversation: Askai) -> str:
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=conversation.messages,
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=True,
            stop=None,
        )

        response = ""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error with Groq API: {str(e)}")
