import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent }      from './user/user.component';
import { RegistrationComponent }      from './registration/registration.component';
import { HomeComponent }      from './home/home.component';
import { NewTweetComponent }      from './new-tweet/new-tweet.component';
import { ShowTweetComponent }      from './show-tweet/show-tweet.component';
import { ShowUserComponent }      from './show-user/show-user.component';
import { SearchResultComponent }      from './search-result/search-result.component';
import { NotificationsComponent }      from './notifications/notifications.component';

const routes: Routes = [
  { path: 'sign_in', component: UserComponent },
  { path: 'sign_up', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new_tweet', component: NewTweetComponent },
  { path: 'tweets/show/:id', component: ShowTweetComponent },
  { path: 'users/:id', component: ShowUserComponent },
  { path: 'result', component: SearchResultComponent },
  { path: 'notifications', component: NotificationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
