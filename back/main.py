from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.users import user
from router.events import router_events
import uvicorn

app = FastAPI(
    title="Events",
    description="API for Events Project",
    version="1.0"   
    '''docs_url="/docsapi",
    redoc_url=None'''
)

origins = [
    "http://localhost",
    "http://localhost:4200/*",
    "http://127.0.0.1:4200/*",
    "http://localhost:8000/*",
    "http://127.0.0.1:8000/*",
    "http://127.0.0.1:8000/events",
    "http://127.0.0.1:8000/user/login"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_events)
app.include_router(user)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)