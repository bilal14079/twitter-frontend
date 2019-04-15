import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  loggedIn: boolean;
  current_user: any;
  error_msg :string;
  constructor(private userService: UserService, private router:Router) { }
  ngOnInit() {
    this.loggedIn = false;
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
    if(this.current_user)
    {
      this.loggedIn = true;
      this.router.navigate(['/home']);
    }
  }

  signIn(email: string,password: string): void {
    email = email.trim();
    password = password.trim();
    if (!email || !password) { return; }
    this.userService.getLogin({ email, password } as User)
    .subscribe(
      data => {
          this.current_user = data.user_data.current_user;
          localStorage.setItem('current_user', JSON.stringify(this.current_user));
          this.loggedIn = true;
          this.router.navigate(['/home']) 
      },
      fail => {
          this.error_msg = fail.error.errors;
      }
    );
  }


}
