import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

const ActionCable = require('actioncable')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweeter-frontend';
  loggedIn :boolean;
  current_user :any;
  foundUsers :any;
  response_msg :string;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private toastService: ToastrService){
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
    if(this.current_user)
    {
      this.loggedIn = true;
      const self = this;
      const App = ActionCable.createConsumer('http://localhost:3000/cable/' + '?user_id=' + this.current_user.id).subscriptions.create("RoomChannel", {
        connected: function() {
          console.log(' SOCKET connected');
        },
        disconnected: function() {
          console.log('disconnected');
        },
        received: function(data) {
          console.log(data);
          self.toastService.success(data.message,'New Notification!', {
            timeOut: 5000
          });
        }
      });
    }
  }
  
  logoutAndRedirect(): void{
    localStorage.removeItem('current_user');
    this.router.navigate(['/sign_in']);
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' , "Accept": "application/json" 
    // }),
    //   Credentials: true,
    // };
    // const logoutUrl = 'http://localhost:3000/api/v1/users/sign_out/';
    // this.http.delete(logoutUrl, httpOptions);
  }

  searchUser(search_value :string): void{
    search_value = search_value.trim();
    if(!search_value)
    {
      return;
    }
    this.userService.searchUser(search_value)
    .subscribe(
      data => {
          this.foundUsers = data.users;
          this.userService.setFoundUsers(this.foundUsers);
          this.router.navigate(['/result']);
      },
      fail => {
        this.response_msg = fail.error.error;
        ;
      }
    );


  }
}
