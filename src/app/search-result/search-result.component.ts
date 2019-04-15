import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  users :any;

  constructor(private userService: UserService) {
    this.users = this.userService.getFoundUsers().value;
   }

  ngOnInit() {
  }

}
