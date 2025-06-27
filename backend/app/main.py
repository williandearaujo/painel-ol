 from fastapi import FastAPI
+from app.core.database import engine, Base
+
 app = FastAPI(...)

-@app.get("/health", tags=["Health"])
+@app.on_event("startup")
+def on_startup():
+    # Cria as tabelas no SQLite
+    Base.metadata.create_all(bind=engine)

+@app.get("/health", tags=["Health"])
 def health_check():
     return {"status": "ok"}
