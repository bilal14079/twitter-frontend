import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TweetService }  from '../tweet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-tweet',
  templateUrl: './show-tweet.component.html',
  styleUrls: ['./show-tweet.component.scss']
})
export class ShowTweetComponent implements OnInit {

  tweet :any;
  response_msg :string;
  comment_msg :string;
  constructor(
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private location: Location,
    private router:Router
    ) { }
    
    ngOnInit() {
      this.showTweet()
    }

  showTweet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tweetService.showTweet(id)
    .subscribe(
      data => {
          this.tweet = data.tweet;
      },
      fail => {
        this.response_msg = fail.error.error;
        ;
      }
    );
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
          this.router.navigate([`tweets/show/${tweet_id}`]) 
      },
      fail => {
        this.comment_msg = fail.error.error;
        ;
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
  

}
