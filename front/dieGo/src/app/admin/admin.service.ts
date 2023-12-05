import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { helpers } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url_events: string = environment.api_url + '/events';
  url_users: string = environment.api_url + '/user';

  constructor( private http: HttpClient) { }


  getEventsBytMonth(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token})
    return this.http.get(this.url_events + '/byMonth', { headers: headers})
  }

  getUserBytMonth(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token})
    return this.http.get(this.url_users + '/byMonth', { headers: headers})
  }

  getFemaleUserBytMonth(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token})
    return this.http.get(this.url_users + '/femaleByMonth', { headers: headers})
  }

  getMaleUserBytMonth(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token})
    return this.http.get(this.url_users + '/maleByMonth', { headers: headers})
  }

  getTopEvent(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_events +'/top5Total', { headers: headers})
  }

  getAllEvents(token){
    let  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Authorization': token}  )
    return this.http.get(this.url_events + '/admin', {headers: headers})
  }
}
