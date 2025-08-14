import os
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

print("✅ Connected to Pinecone.")
print("📋 Indexes available:", pc.list_indexes().names())


# ✅ Data we want to upload (you can expand this later)
documents = [
    {"text": "Aleppo Citadel is one of the oldest and largest castles in the world.", "metadata": {"city": "Aleppo", "type": "landmark"}},
    {"text": "Umayyad Mosque in Damascus is one of the most important religious sites in the Middle East.", "metadata": {"city": "Damascus", "type": "landmark"}},
    {"text": "Homs is known for its historic souqs and Khalid ibn al-Walid Mosque.", "metadata": {"city": "Homs", "type": "city"}},
    {"text": "Latakia is Syria’s main port city, famous for its Mediterranean beaches.", "metadata": {"city": "Latakia", "type": "city"}},
    {"text": "Tartus is a coastal city with Crusader history and a cathedral now used as a museum.", "metadata": {"city": "Tartus", "type": "city"}}
]

# ✅ Upload to Pinecone using LangChain wrapper


print("✅ Data successfully uploaded to Pinecone.")
