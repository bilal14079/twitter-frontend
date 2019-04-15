import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { TweetService } from '../tweet.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService,private tweetService: TweetService, private modalService: NgbModal) { }

  tweets :any;
  response_msg :string;
  comment_msg :string;

  getTweets(): void {
    this.homeService.getTweets()
    .subscribe(
      data => {
        this.tweets = data.tweets;
      },
      fail => {
        this.response_msg = fail.error.error;
        ;
      }
    );
  }
  ngOnInit() {
    this.getTweets();
  }

  ngOnChange() {
    this.getTweets()
  }
  
  addComment(tweet_id: number, comment_body: string): void {
    comment_body = comment_body.trim();
    if (!comment_body) { 
      this.comment_msg = 'Comment seciton is empty'; 
      return; 
    }
    this.tweetService.addComment(tweet_id, comment_body)
    .subscribe(
      data => {
          this.comment_msg = data.msg;
          // this.router.navigate([`tweets/show/${tweet_id}`]) 
      },
      fail => {
        this.comment_msg = fail.error.error;
        ;
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {}, (reason) => {});
  }

  ngOnDestory() {
    console.log('onDestory()')
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
