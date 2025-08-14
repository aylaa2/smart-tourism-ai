from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA

# ✅ Load environment variables
load_dotenv()

# ✅ Sample city knowledge base texts (replace with real data or file loading)
city_texts = [
    "Aleppo Citadel is a medieval fortified palace in Aleppo.",
    "The Umayyad Mosque in Damascus is one of the oldest in the world.",
    "Tartus Cathedral is now a museum located in Tartus.",
    "Latakia is a coastal city famous for its beaches."
]

# ✅ Load embedding model
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# ✅ Create vectorstore (IMPORTANT: use from_texts, not from_documents)
vectorstore = FAISS.from_texts(city_texts, embedding=embeddings)

# ✅ Load local Ollama model
llm = OllamaLLM(model="phi3")

# ✅ Create retrieval-based QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)

# ✅ FastAPI app
app = FastAPI()

# ✅ Enable CORS (adjust frontend origin if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Check if mock mode is enabled
MOCK_MODE = os.getenv("MOCK_AI", "false").lower() == "true"

# ✅ Request schema
class QuestionRequest(BaseModel):
    question: str
    lang: str = "en"

# ✅ Health route
@app.get("/health")
def health():
    return {"status": "ok"}

# ✅ Ask AI route
@app.post("/ask-ai")
def ask_ai(request: QuestionRequest):
    if MOCK_MODE:
        return {"answer": f"[MOCK RESPONSE] You asked: {request.question}"}
    
    result = qa_chain.invoke({"query": request.question})
    answer_text = result["result"] if isinstance(result, dict) else str(result)
    return {"answer": answer_text}

# ✅ Sample city data
cities_data = [
    {"name": "Aleppo", "description": "Aleppo is one of the oldest cities in the world.", "population": 1800000},
    {"name": "Damascus", "description": "Damascus is the capital of Syria and rich in history.", "population": 2200000},
    {"name": "Homs", "description": "Homs is known for its ancient citadel and historic souqs.", "population": 775000},
    {"name": "Latakia", "description": "Latakia is a coastal city known for its beaches.", "population": 424000},
    {"name": "Tartus", "description": "Tartus is a port city on the Mediterranean.", "population": 162000},
]

landmarks_data = {
    "Aleppo": [
        {"name": "Aleppo Citadel", "type": "Historic", "description": "A massive medieval fortified palace."},
        {"name": "Souk Al-Madina", "type": "Market", "description": "Ancient bazaar in Aleppo."}
    ],
    "Damascus": [
        {"name": "Umayyad Mosque", "type": "Religious", "description": "One of the largest and oldest mosques in the world."},
        {"name": "Al-Hamidiyah Souq", "type": "Market", "description": "A long, covered souq in the Old City of Damascus."}
    ],
    "Homs": [
        {"name": "Khalid ibn al-Walid Mosque", "type": "Religious", "description": "A historic mosque built in the 13th century."}
    ],
    "Latakia": [
        {"name": "Saladin Castle", "type": "Historic", "description": "A crusader castle overlooking Latakia."}
    ],
    "Tartus": [
        {"name": "Tartus Cathedral", "type": "Historic", "description": "An old cathedral now used as a museum."}
    ]
}

# ✅ REST endpoints
@app.get("/cities")
def get_cities():
    return cities_data

@app.get("/cities/{city_name}")
def get_city(city_name: str):
    city = next((c for c in cities_data if c["name"].lower() == city_name.lower()), None)
    return city if city else {"error": "City not found"}

@app.get("/landmarks/{city_name}")
def get_landmarks(city_name: str):
    return landmarks_data.get(city_name, [])
