import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignOnComponent } from './sign-on/sign-on.component';
import { Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { authenticationService } from './services/authentication.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { teamsService } from './services/teams.service';
import { ChatCardsComponent } from './chat-cards/chat-cards.component';
import { ChatComponent } from './chat/chat.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { MessageComponent } from './message/message.component';
import { LoadComponent } from './load/load.component';

const routes:Routes = [
  {path:'', component: SignOnComponent}, 
  {path:'register', component: RegisterComponent}, 
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]}, 
  {path: 'dashboard/create', component: CreateComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/view', component: ViewComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/team', component: ChatComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/createMessage', component: CreateMessageComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/load', component: LoadComponent, canActivate:[AuthGuard]}
]  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignOnComponent,
    RegisterComponent,
    DashboardComponent,
    CreateComponent,
    ViewComponent,
    ChatCardsComponent,
    ChatComponent,
    CreateMessageComponent,
    MessageComponent,
    LoadComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [authenticationService, AuthGuard, teamsService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
