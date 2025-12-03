from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Vysionis API - Backend funcionando!"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "Vysionis Backend"}
```

### **2. `backend/requirements.txt`**
```
fastapi==0.115.5
uvicorn[standard]==0.32.1
python-multipart==0.0.20
```

### **3. `backend/Procfile`**
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### **4. `Vysionis/.gitignore`** (na raiz)
```
# Backend
backend/venv/
backend/__pycache__/
backend/*.pyc

# Frontend
frontend/node_modules/
frontend/dist/

# Geral
.env
.DS_Store