from fastapi import APIRouter, status, Response, Header
from typing import Optional 
from fastapi.responses import JSONResponse
from schema.event_schema import EventSchema
from config.db import engine
from typing import List
from datetime import date
import bcrypt
import datetime
from model.persistence import tbl_events, tbl_events_created, tbl_events_saved
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
            result = conn.execute(tbl_events.select().where(tbl_events.c.disabled == False).order_by(tbl_events.c.creation_time.desc())).fetchall()
            return result


@router_events.get("/public/all", response_model=List[EventSchema], tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
        with engine.connect() as conn:
            result = conn.execute(tbl_events.select().where(tbl_events.c.disabled == False).order_by(tbl_events.c.creation_time.desc())).fetchall()
            return result

@router_events.get("/admin", response_model=List[EventSchema], tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            result = conn.execute(tbl_events.select().order_by(tbl_events.c.creation_time.desc())).fetchall()
            return result


@router_events.get("/public/total", response_model=None, tags=["events"])
def getUser(Authorization: Optional[str] = Header(None)):
        with engine.connect() as conn:
            result = conn.execute("select count(event_id) total_events from tbl_events").first()
            
            return result


@router_events.get("/total", response_model=None, tags=["events"])
def getUser(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            result = conn.execute("select count(event_id) total_events from tbl_events where disabled = false").first()
            
            return result




@router_events.get("/public/weekly", response_model=None, tags=["events"])
def getUser(Authorization: Optional[str] = Header(None)):
        #get current day range
        current_time = datetime.datetime.now()
        week = int(current_time.strftime("%V"))
        year = int(current_time.strftime("%Y"))
        start_day = date.fromisocalendar(year, week, 1).strftime("%Y-%m-%d")
        end_day = date.fromisocalendar(year, week, 7).strftime("%Y-%m-%d")
        with engine.connect() as conn:
            query = f"select count(event_id) total_events from tbl_events where creation_time between '{start_day} 00:00:00' and '{end_day} 23:59:00'"
            print(query)
            result = conn.execute(query).first()
            
            return result




@router_events.get("/weekly", response_model=None, tags=["events"])
def getUser(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        #get current day range
        current_time = datetime.datetime.now()
        week = int(current_time.strftime("%V"))
        year = int(current_time.strftime("%Y"))
        start_day = date.fromisocalendar(year, week, 1).strftime("%Y-%m-%d")
        end_day = date.fromisocalendar(year, week, 7).strftime("%Y-%m-%d")
        with engine.connect() as conn:
            query = f"select count(event_id) total_events from tbl_events where creation_time between '{start_day} 00:00:00' and '{end_day} 23:59:00'"
            print(query)
            result = conn.execute(query).first()
            
            return result
        
@router_events.get("/byMonth", response_model=None, tags=["events"])
def getUser(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        #get current day range
        with engine.connect() as conn:
            query = f"select count(event_id) total_events,  date_part('month', tbl_events.creation_time) mes from tbl_events where date_part('year', tbl_events.creation_time) = date_part('year', now()) group by date_part('month', tbl_events.creation_time)"
            print(query)
            result = conn.execute(query).fetchall()
            return result

@router_events.get("/public/top10", response_model=List[EventSchema], tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
        with engine.connect() as conn:
            result = conn.execute(tbl_events.select().where(tbl_events.c.disabled == False) .order_by(tbl_events.c.creation_time.desc()).limit(10)).fetchall()
            return result



@router_events.get("/top10", response_model=List[EventSchema], tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            result = conn.execute(tbl_events.select().where(tbl_events.c.disabled == False).order_by(tbl_events.c.creation_time.desc()).limit(10)).fetchall()
            return result


@router_events.get("/top5", response_model=List[EventSchema], tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            query = f"SELECT * FROM tbl_events WHERE event_id in (SELECT tbl_event_id FROM public.tbl_events_saved group by tbl_event_id order by count(tbl_event_id)  desc limit 5) and disabled == false"
            result = conn.execute(query).fetchall()
            return result

@router_events.get("/top5Total", response_model=None, tags=["events"])
def getEvent(Authorization: Optional[str] = Header(None)):
        if not validate(Authorization):
            result = {"error":True, "message":"Not authentication"}
            _status = status.HTTP_401_UNAUTHORIZED
            return JSONResponse(status_code=_status, content=result)
        else:
            with engine.connect() as conn:
                query = f"  "
                result = conn.execute(query).fetchall()
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

@router_events.get("/public/{idEvent}", response_model=None, tags=["events"])
def getSingleEvent(idEvent: str, Authorization: Optional[str] = Header(None)):
        with engine.connect() as conn:
                result = conn.execute(tbl_events.select().where(tbl_events.c.event_id == idEvent)).first()
            
                print("Result from DB", result)
                if result != None:
                    return result
                _status = status.HTTP_500_INTERNAL_SERVER_ERROR
                result =  {"error":True, "message":"Event not found"}
                
                return JSONResponse(status_code=_status, content=result) 



@router_events.get("/created/{idUser}", response_model=None, tags=["events"])
def getEventByUser(idUser: int, Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
                query = f"SELECT * FROM tbl_events WHERE event_id in (SELECT tbl_events_id FROM public.tbl_events_created where tbl_users_id = {idUser}) and disabled=false"
                result = conn.execute(query).fetchall()
            
                print("Result from DB", result)
                if result != None:
                    return result
                _status = status.HTTP_500_INTERNAL_SERVER_ERROR
                result =  {"error":True, "message":"Event not found"}
                
                return JSONResponse(status_code=_status, content=result)


@router_events.get("/saved/{idUser}", response_model=None, tags=["events"])
def getSAvedEventByUser(idUser: int, Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
                query = f"SELECT * FROM tbl_events WHERE event_id in (SELECT tbl_event_id FROM public.tbl_events_saved where tbl_user_id = {idUser}) and disabled=false order by event_date desc"
                result = conn.execute(query).fetchall()
            
                print("Result from DB", result)
                if result != None:
                    return result
                _status = status.HTTP_500_INTERNAL_SERVER_ERROR
                result =  {"error":True, "message":"Event not found"}
                
                return JSONResponse(status_code=_status, content=result)


@router_events.post("/saved", response_model= None, tags=["events"])
def addFavoriteEvent(data: dict):
    with engine.connect() as conn: 
        try:
            query = f"SELECT * FROM tbl_events_saved WHERE tbl_event_id = {data['id_event']} AND tbl_user_id = {data['id_user']}"
            result = conn.execute(query).first()
            if result:
                _status = status.HTTP_201_CREATED
                result =  {"error":False, "message":"Event already liked"}
            else:
                query = f"INSERT INTO tbl_events_saved (tbl_event_id, tbl_user_id) VALUES ({data['id_event']}, {data['id_user']})"
                conn.execute(query)
                #return Response(status_code=HTTP_201_CREATED)
                _status = status.HTTP_201_CREATED
                result =  {"error":False, "message":"Event added successfully"}
                
                
            return JSONResponse(status_code=_status, content=result)
        except IntegrityError as exc:
            _status = status.HTTP_500_INTERNAL_SERVER_ERROR
            result =  {"error":True, "code":exc.orig.args[0], "message":"Error at create event: " + exc.orig.args[1]}
                
            return JSONResponse(status_code=_status, content=result)


@router_events.post("/{user_id}", response_model=EventSchema, tags=["events"])
def addEvent(data_event: EventSchema, user_id: str):
    with engine.connect() as conn: 
        try:
            data = { "title": data_event.title,
                    "subtitle": data_event.subtitle,
                    "location": data_event.location,
                    "description": data_event.description,
                    "event_date": data_event.event_date,
                    "disabled": data_event.disabled,
                    "image": data_event.image,
                    "partner": data_event.partner,
                    "start_date": data_event.start_date,
                    "end_date": data_event.end_date,
                    "price": data_event.price,
                    "dress_code": data_event.dress_code}

            data_event = data_event.dict()
            #METADATA
            
            conn.execute(tbl_events.insert().values(data))
            query = f"INSERT INTO tbl_events_created ( tbl_users_id, tbl_events_id ) values ( {user_id}, (SELECT MAX(event_id) FROM tbl_events))"
            conn.execute(query)
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
                query = f"UPDATE tbl_events set disabled=true where event_id={idEvent}"
                conn.execute(query)
            
                result = {"error":False, "message":"Event deleted"}
                _status = status.HTTP_200_OK
                return JSONResponse(status_code=_status, content=result)
            
            except IntegrityError as exc:

                result = {"error":True, "codigo":exc.orig.args[0], "message":"Something went wrong with the DB. " +  exc.orig.args[1]}
            _status = status.HTTP_400_BAD_REQUEST
            return JSONResponse(status_code=_status, content=result)


@router_events.delete("/saved/{idEvent}/{idUser}", status_code=200, tags=["events"])
def delete_event(idEvent: str, idUser: str, Authorization: Optional[str] = Header(None)):
    if not validate(Authorization):
        result = {"error":True, "message":"Not authentication"}
        _status = status.HTTP_401_UNAUTHORIZED
        return JSONResponse(status_code=_status, content=result)
    else:
        with engine.connect() as conn:
            try:
                conn.execute(tbl_events_saved.delete().where(tbl_events_saved.c.tbl_event_id == idEvent and tbl_events_saved.c.tbl_user_id == idUser ))
            
                result = {"error":False, "message":"Event removed"}
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