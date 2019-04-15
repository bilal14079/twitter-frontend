import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  homeUrl = 'http://localhost:3000/api/v1/home/index/';
  user_token = '-1'
  current_user = null;
  httpOptions = null;
  constructor(private http: HttpClient) {
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
    if(this.current_user)
    {
      this.user_token = this.current_user.user_token;
    }
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json' 
      , 'X-USER-TOKEN': this.user_token}),
      Credentials: true,
    };
   }

  getTweets () {
    return this.http.get(this.homeUrl,this.httpOptions)      
  }
}
