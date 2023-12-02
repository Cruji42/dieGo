import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.api_url + '/user'

  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(this.url + '/login', data)
  }

  register(data){
    return this.http.post(this.url, data)
  }
}
