import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  signInUrl = 'http://localhost:3000/api/v1/users/sign_in';
  signUpUrl = 'http://localhost:3000/api/v1/users/';
  showUserUrl = 'http://localhost:3000/api/v1/users';



  private searchResult = new BehaviorSubject(null) ;
  currentResult = this.searchResult.asObservable();

  user_token = '-1'
  current_user = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json'}),
    Credentials: true,
  };
  
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

   setFoundUsers(users: any)
   {
     this.searchResult = new BehaviorSubject(users);
     this.searchResult.next(users);
     this.currentResult = this.searchResult;
   }
   getFoundUsers()
   {
     return this.currentResult;
   }


  getLogin (user: User): Observable<User> {
    return this.http.post<User>(this.signInUrl,{"user": user},this.httpOptions)      
  }
  signUp (user: User): Observable<User> {
    return this.http.post<User>(this.signUpUrl,{"user": user},this.httpOptions)      
  }
  showUser(id: number): Observable<any> {
    const url = `${this.showUserUrl}/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  searchUser(searchValue: string): Observable<any>{
    const searchUrl = 'http://localhost:3000/api/v1/users/search';
    return this.http.get(`${searchUrl}/${searchValue}`, this.httpOptions);
  }

  getNotifications(): Observable<any>{
    const notificationsUrl = 'http://localhost:3000/api/v1/notifications/';
    return this.http.get(notificationsUrl, this.httpOptions);
  }

  followUser(user: any): Observable<any>{
    const followUserUrl = `http://localhost:3000/api/v1/users/${user.id}/follow`;
    return this.http.patch(followUserUrl, user, this.httpOptions);
  }
  unFollowUser(user: any): Observable<any>{
    const followUserUrl = `http://localhost:3000/api/v1/users/${user.id}/unfollow`;
    return this.http.patch(followUserUrl, user, this.httpOptions);
  }
}
