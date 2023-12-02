import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_events: string = environment.api_url + '/events';
  url_users: string = environment.api_url + '/user';
  constructor( private http: HttpClient) { 

  }

  

  getPublicTopEvent(): Observable<any>{
    return this.http.get(this.url_events +'/public/top10')
  }


  getPublicTotalEventWeekly(){
   return this.http.get(this.url_events +'/public/weekly')
  }


  getPublicTotalUsers(){
    return this.http.get(this.url_users +'/public/total')
  }


  
  getPublicTotalEvents(){
    return this.http.get(this.url_events +'/public/total')
  }

  getTopEvent(token): Observable<any>{
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_events +'/top10', { headers: headers})
  }

  getTotalEventWeekly(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_events +'/weekly', { headers: headers})
  }

  getTotalUsers(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_users +'/total', { headers: headers})
  }

  getTotalEvents(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_events +'/total', { headers: headers})
  }

  
  getActiveEvents(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_events +'/', { headers: headers})
  }


  getActiveEventsPublic(){
    return this.http.get(this.url_events +'/public/all')
  }


  AddEventsToFavorite(token, id_event, id_user){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.post(this.url_events +'/saved', { id_event: id_event, id_user: id_user} , { headers: headers})
  }
}
