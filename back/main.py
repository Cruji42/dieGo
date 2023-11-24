from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.users import user
import uvicorn
#from router.events import events

app = FastAPI(
    title="Events",
    description="API for Events Project",
    version="1.0"
    '''docs_url="/docsapi",
    redoc_url=None'''
)

origins = [
    "http://localhost",
    "http://localhost:8000/*",
    "http://3.133.114.192:8000/*",
    "http://3.133.114.192:8000/ticket",
    "http://3.133.114.192:8000/user/login"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#app.include_router(events)
app.include_router(user)

if __name__ == "__main__":
    uvicorn.run("main:app", host="3.133.114.192", port=8000, reload=True)