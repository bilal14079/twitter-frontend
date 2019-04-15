import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService }  from '../user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  user :any;
  tweets :any[];
  response_msg :string;
  current_user :any;
  currentUserFollowingList :any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
    ){ 
      this.current_user = JSON.parse(localStorage.getItem('current_user'));
    }
    
    ngOnInit() {
      this.showUser()
    }

  showUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.showUser(id)
    .subscribe(
      data => {
          this.user = data.user;
          this.tweets = data.tweets;
          this.currentUserFollowingList = data.current_user_following_list;
      },
      fail => {
        this.response_msg = fail.error.error;
        ;
      }
    );
  }

  showFollowButton(user: any){
    if(this.current_user && this.current_user.user_name !== user.user_name)
      return true;
    else
      return false;
  }
  isFollowing(user: any){
    const following = [...this.currentUserFollowingList];
    for( let i=0; i < following.length; i++ )
    {
      if(following[i].user_name === user.user_name)
        return true;
    }
    return false;
  }

  followUser(user: any){
    this.userService.followUser(user)
    .subscribe(
      data => {
        this.response_msg = data.msg;
    },
    fail => {
      this.response_msg = fail.error.msg;
      ;
    }
    );
  }
  unFollowUser(user: any){
    this.userService.unFollowUser(user)
    .subscribe(
      data => {
        this.response_msg = data.msg;
    },
    fail => {
      this.response_msg = fail.error.msg;
    }
    );
  }
  
}
