import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './components/signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './services/auth-interceptor.service';
import {HomeComponent} from './components/home/home.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {BoardModeratorComponent} from './components/board-moderator/board-moderator.component';
import {BoardUserComponent} from './components/board-user/board-user.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TodoListComponent} from './components/home/todo-list/todo-list.component';
import {TodoBoardComponent} from './components/home/todo-board/todo-board.component';
import {StatisticsComponent} from './components/home/statistics/statistics.component';
import {CalendarComponent} from './components/home/calendar/calendar.component';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './chart/chart.component';
import {ChartCardComponent} from './components/home/statistics/chart-card/chart-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    SidebarComponent,
    NavbarComponent,
    ProfileComponent,
    SettingsComponent,
    TodoListComponent,
    TodoBoardComponent,
    StatisticsComponent,
    CalendarComponent,
    ChartComponent,
    ChartCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    DragDropModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
