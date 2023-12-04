import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  url: string = environment.api_url + '/events'

  constructor(private http: HttpClient) { }


  addEvent(token, idUser, data){
    let  headers  = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.post(this.url + '/' + idUser, data, {headers: headers} )
  }

  getEventOrganizer(token,idUser){
    let  headers  = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url + '/created/' + idUser, {headers:headers})
  }

  deleteEvent(token, idUser){
    let  headers  = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.delete(this.url + '/' + idUser, {headers: headers})
  }

  editEvent( token, data, event_id){
    let  headers  = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.put(this.url + '/' + event_id, data, {headers: headers})
  }
}

