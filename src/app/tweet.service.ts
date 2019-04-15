import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  user_token = '-1'
  current_user = null;
  httpOptions = null;
  newTweetUrl = 'http://localhost:3000/api/v1/tweets/';
  showTweetUrl = 'http://localhost:3000/api/v1/tweets';
  
  constructor(private http: HttpClient) {
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
    if(this.current_user)
    {
      this.user_token = this.current_user.user_token;
    }
    this.httpOptions = {
      headers: new HttpHeaders({ "Accept": "application/json" 
      , 'X-USER-TOKEN': this.user_token}),
      Credentials: true,
    };
   }
  
  addTweet(formData: FormData): Observable<any>{
    return this.http.post(this.newTweetUrl, formData,this.httpOptions )
  }

  showTweet(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , "Accept": "application/json" 
      , 'X-USER-TOKEN': this.user_token}),
      Credentials: true,
    };
    const url = `${this.showTweetUrl}/${id}`;
    return this.http.get(url, httpOptions);
  }
  addComment(tweet_id: number, comment_body: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , "Accept": "application/json" 
      , 'X-USER-TOKEN': this.user_token}),
      Credentials: true,
    };
    const url = 'http://localhost:3000/api/v1/tweets';
    const addCommentUrl = `${url}/${tweet_id}/comments`;
    return this.http.post(addCommentUrl,{"comment_body": comment_body} , httpOptions);
  }
}
