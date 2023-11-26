from fastapi import APIRouter, status, Response, Header
from typing import Optional 
from fastapi.responses import JSONResponse
from schema.event_schema import EventSchema
from config.db import engine
from typing import List
import bcrypt
from model.persistence import tbl_events
import jwt
from sqlalchemy.exc import IntegrityError

router_events = APIRouter(prefix="/events")

@router_events.get("/", response_model=List[EventSchema], tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            result = conn.execute(tbl_events.select()).fetchall()
            return result

@router_events.get("/{idEvent}", response_model=None, tags=["events"])
def getSingleEvent(idEvent: str, Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
                result = conn.execute(tbl_events.select().where(tbl_events.c.event_id == idEvent)).first()
            
                print("Result from DB", result)
                if result != None:
                    return result
                _status = status.HTTP_500_INTERNAL_SERVER_ERROR
                result =  {"error":True, "message":"Event not found"}
                
                return JSONResponse(status_code=_status, content=result)
    
    
@router_events.post("/", response_model=EventSchema, tags=["events"])
def addEvent(data_event: EventSchema):
    with engine.connect() as conn: 
        try:
            data_event = data_event.dict()
            #METADATA
            conn.execute(tbl_events.insert().values(data_event))
            #return Response(status_code=HTTP_201_CREATED)
            _status = status.HTTP_201_CREATED
            result =  {"error":False, "message":"Event created successfully"}
                
            return JSONResponse(status_code=_status, content=result)
        except IntegrityError as exc:
            _status = status.HTTP_500_INTERNAL_SERVER_ERROR
            result =  {"error":True, "code":exc.orig.args[0], "message":"Error at create event: " + exc.orig.args[1]}
                
            return JSONResponse(status_code=_status, content=result)


@router_events.put("/{idEvent}", status_code=200, tags=['events'])
def update_event(data_event: EventSchema, idEvent: str, Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            try:
                
                conn.execute(tbl_events.update().values(title = data_event.title, subtitle = data_event.subtitle, location = data_event.location, description = data_event.description, event_date = data_event.event_date, disabled = data_event.disabled, image = data_event.image, partner = data_event.partner, start_date = data_event.start_date, end_date = data_event.end_date, price = data_event.price, dress_code = data_event.dress_code).where(tbl_events.c.event_id == idEvent))
            
                result = conn.execute(tbl_events.select().where(tbl_events.c.event_id == idEvent)).first() 
    
                if result != None:
                    data = {"error":False, "message":"Event updated."}
                    _status = status.HTTP_200_OK
                else:
                    data = {"error":True, "message":"Error in update event. Event not found with this ID: " + idEvent}
                    _status = status.HTTP_400_BAD_REQUEST
                
            
                return JSONResponse(status_code=_status, content=data)
            except IntegrityError as exc:

                    result = {"error":True,  "codigo":exc.orig.args[0], "message":"Something went wrong with the DB. "  +  exc.orig.args[1]}
                    _status = status.HTTP_400_BAD_REQUEST
                    return JSONResponse(status_code=_status, content=result)


@router_events.delete("/{idEvent}", status_code=200, tags=["events"])
def delete_event(idEvent: str,Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            try:
                conn.execute(tbl_events.delete().where(tbl_events.c.event_id == idEvent))
            
                result = {"error":False, "message":"Event deleted"}
                _status = status.HTTP_200_OK
                return JSONResponse(status_code=_status, content=result)
            
            except IntegrityError as exc:

                result = {"error":True, "codigo":exc.orig.args[0], "message":"Something went wrong with the DB. " +  exc.orig.args[1]}
            _status = status.HTTP_400_BAD_REQUEST
            return JSONResponse(status_code=_status, content=result)


def validate(token: Optional[str]):
    
    if token == None:
        encoded_jwt = "not set"
        return False
    else:
        encoded_jwt = token
        try:
            jwt.decode(encoded_jwt, algorithms=['HS256',], key='$126K4600a')
            return True
        except:
            return False