from fastapi import APIRouter, status, Request, Response
from fastapi.responses import JSONResponse
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from schema.user_schema import UserSchema
from config.db import engine
from typing import List
import bcrypt
import requests
import json
from datetime import datetime
from model.persistence import users
import jwt
from sqlalchemy.exc import IntegrityError
import pdb

user = APIRouter(prefix="/user")

@user.get("/", response_model=List[UserSchema], tags=["user"])
def getUser():
    pdb.set_trace()
    session = requests.session()
    encoded_jwt = session.cookies.get("token")
    validator = jwt.decode(encoded_jwt, algorithms=['HS256',], key='$126K4600a')
    if validator:
        with engine.connect() as conn:
            result = conn.execute(users.select()).fetchall()
            return result
    else:
        result = {"error":True, "message":"Not authentication"}
        return result

@user.get("/{idUser}", response_model=None, tags=["user"])
def getSingleUser(idUser: str):
    with engine.connect() as conn:
            result = conn.execute(users.select().where(users.c.id == idUser)).first()
            
            print("Result from DB", result)
            if result != None:
                return result
            _status = status.HTTP_500_INTERNAL_SERVER_ERROR
            result =  {"error":True, "message":"User not found"}
                
            return JSONResponse(status_code=_status, content=result)

        
@user.post("/",response_model=UserSchema, tags=["user"])
def addUser(data_user: UserSchema):
    with engine.connect() as conn: 
        try:
            #Encrypt password using bcrypt
            passwd = data_user.password
            #salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(passwd.encode('utf8'), bcrypt.gensalt())
            hashed = hashed.decode('utf8')

            data_user.password = hashed

            new_user = data_user.dict()
            print(data_user)
            #METADATA
            conn.execute(users.insert().values(new_user))
            #return Response(status_code=HTTP_201_CREATED)
            _status = status.HTTP_201_CREATED
            result =  {"error":False, "message":"User created successfully"}
                
            return JSONResponse(status_code=_status, content=result)
        except IntegrityError as exc:
            _status = status.HTTP_500_INTERNAL_SERVER_ERROR
            result =  {"error":True, "code":exc.orig.args[0], "message":"Error at create user: " + exc.orig.args[1]}
                
            return JSONResponse(status_code=_status, content=result)

@user.post("/login", tags=["user"], status_code=200)
def addUser(data_user: UserSchema, response: Response):
    with engine.connect() as conn:
        try:
            result = conn.execute(users.select().where(users.c.email == data_user.email)).first()
            message= "User not found"

            if result != None:
                #Check password
                password_encrypted = result[4]
                if bcrypt.checkpw(data_user.password.encode(), password_encrypted.encode()):
                    user_json = {"id":result[0]}
                    encoded_jwt = jwt.encode(user_json, "$126K4600a", algorithm="HS256")
                    response.set_cookie(key="token", value=encoded_jwt)
                    result = {"error":False, "message" :"Loged"}
                    return result
                else:
                    message = "Password didn't match"
                
            _status = status.HTTP_500_INTERNAL_SERVER_ERROR
            result =  {"error":True, "message" :message}
                
            return JSONResponse(status_code=_status, content=result)
        except IntegrityError as exc:
            _status = status.HTTP_500_INTERNAL_SERVER_ERROR
            result =  {"error":True, "code":exc.orig.args[0], "message":"Error during login function: " + exc.orig.args[1]}
        
@user.put("/{idUser}", status_code=200, tags=['user'])
def update_user(data_user: UserSchema, idUser: str):
    with engine.connect() as conn:
        try:
            conn.execute(users.update().values(username=data_user.username, email=data_user.email,password=data_user.password).where(users.c.id == idUser))
            
            result = conn.execute(users.select().where(users.c.id == idUser)).first() 
    
            if result != None:
                data = {"error":False, "message":"User updated."}
                _status = status.HTTP_200_OK
            else:
                data = {"error":True, "message":"Error in update user. User not found with this ID: " + idUser}
                _status = status.HTTP_400_BAD_REQUEST
                
            
            return JSONResponse(status_code=_status, content=data)
        except IntegrityError as exc:

            result = {"error":True,  "codigo":exc.orig.args[0], "message":"Something went wrong with the DB. "  +  exc.orig.args[1]}
            _status = status.HTTP_400_BAD_REQUEST
            return JSONResponse(status_code=_status, content=result)
        
@user.delete("/{idUser}", status_code=200, tags=["user"])
def deleteUser(idUser: str):
    with engine.connect() as conn:
        try:
            conn.execute(users.delete().where(users.c.id == idUser))
            
            result = {"error":False, "message":"User deleted"}
            _status = status.HTTP_200_OK
            return JSONResponse(status_code=_status, content=result)
            
        except IntegrityError as exc:

            result = {"error":True, "codigo":exc.orig.args[0], "message":"Something went wrong with the DB. " +  exc.orig.args[1]}
            _status = status.HTTP_400_BAD_REQUEST
            return JSONResponse(status_code=_status, content=result)