import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: any
  responseMsg: string
  constructor(private userService: UserService) { 
    this.userService.getNotifications()
    .subscribe(
      data => {
          this.notifications = data.notifications;
      },
      fail => {
        this.responseMsg = fail.error.message;
        ;
      }
    );
    
  }

  ngOnInit() {
  }

}
