from fastapi import FastAPI

app = FastAPI(
    title="Painel OL Tecnologia API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

@app.get("/health", tags=["Health"])
def health_check():
    """
    Health check endpoint.
    Deve retornar {"status":"ok"} se o servidor estiver online.
    """
    return {"status": "ok"}
