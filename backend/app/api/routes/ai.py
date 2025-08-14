from fastapi import APIRouter, Body
from rag.query import get_answer


router = APIRouter()

@router.post("/ask")
async def ask_ai(question: str = Body(..., embed=True)):
    answer = get_answer(question)
    return {"answer": answer}
