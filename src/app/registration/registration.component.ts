import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: User;
  response_msg :string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  signUp(name: string, user_name: string, email: string, password: string): void {
    name = name.trim();
    user_name = user_name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !user_name || !email || !password ) { return; }
    this.userService.signUp({ name, user_name, email, password } as User)
    .subscribe(
      data => {
          this.response_msg = 'Registration successfull';
      },
      fail => {
        this.response_msg = "email " + fail.error.errors.email;
        ;
      }
    );
  }
}
