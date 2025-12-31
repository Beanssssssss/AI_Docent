from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
from app.api.galleries import router as galleries_router
from app.api.exhibitions import router as exhibitions_router
from app.api.artworks import router as artworks_router
from app.api.image_search import router as image_search_router

app = FastAPI(title="AI Docent Backend")

# ================================
# 🔥 CORS Middleware (필수)
# ================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# 🔥 Request Logging Middleware
# ================================
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time

    print(
        f"{request.method} {request.url.path} "
        f"- {response.status_code} "
        f"- {process_time:.3f}s"
    )

    return response


# ================================
# 🔥 Router
# ================================
app.include_router(galleries_router)
app.include_router(exhibitions_router)
app.include_router(artworks_router)
app.include_router(image_search_router)