import { Component, OnInit } from '@angular/core';
import { TweetService } from '../tweet.service';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.scss']
})
export class NewTweetComponent implements OnInit {
  response_msg :string;
  selectedFile :File;
  formData :FormData
  constructor(private tweetService: TweetService, private router: Router) 
  {
    this.formData = new FormData();
  }

  ngOnInit() {

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    this.formData.append('cover_picture', this.selectedFile, this.selectedFile.name);
  }

  addTweet(title: string, content: string): void
  {
    title = title.trim();
    content = content.trim();
    this.formData.append('tweet_title',title);
    this.formData.append('tweet_content',content);
    if (!title || !content) { return; }
    this.tweetService.addTweet(this.formData)
    .subscribe(
      data => {
        this.router.navigate(['/tweets/show/'+ data.tweet_id]);
      },
      fail => {
        this.response_msg = fail.error.error;
        ;
      }
    );
  }

}
