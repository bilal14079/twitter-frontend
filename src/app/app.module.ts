import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule }    from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { ShowTweetComponent } from './show-tweet/show-tweet.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './notifications/notifications.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ShowTweetModalComponent } from './show-tweet-modal/show-tweet-modal.component';
import { NgbdModalBasic } from './show-tweet-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    RegistrationComponent,
    NewTweetComponent,
    FileSelectDirective,
    ShowTweetComponent,
    ShowUserComponent,
    SearchResultComponent,
    NotificationsComponent,
    ShowTweetModalComponent,
    NgbdModalBasic
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
    }), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
