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
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TodoTableComponent} from './components/home/todo-table/todo-table.component';
import {TodoBoardComponent} from './components/home/todo-board/todo-board.component';
import {StatisticsComponent} from './components/home/statistics/statistics.component';
import {CalendarComponent} from './components/home/calendar/calendar.component';
import {ChartsModule} from 'ng2-charts';
import {ChartCardComponent} from './components/home/statistics/chart-card/chart-card.component';
import {PieChartComponent} from './components/charts/pie-chart/pie-chart.component';
import {BarChartComponent} from './components/charts/bar-chart/bar-chart.component';
import {CreateTodoModalComponent} from './components/home/create-todo-modal/create-todo-modal.component';
import {EditTodoModalComponent} from './components/home/edit-todo-modal/edit-todo-modal.component';
import {TodoStateColumnComponent} from './components/home/todo-board/todo-state-column/todo-state-column.component';
import {SidebarContainerComponent} from './components/sidebar/sidebar-container/sidebar-container.component';
import {SidebarNavComponent} from './components/sidebar/sidebar-nav/sidebar-nav.component';
import {SidebarInfoComponent} from './components/sidebar/sidebar-info/sidebar-info.component';
import {CreateTodoComponent} from './components/home/create-todo/create-todo.component';
import {EditTodoComponent} from './components/home/edit-todo/edit-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    NavbarComponent,
    ProfileComponent,
    SettingsComponent,
    TodoTableComponent,
    TodoBoardComponent,
    StatisticsComponent,
    CalendarComponent,
    ChartCardComponent,
    PieChartComponent,
    BarChartComponent,
    CreateTodoModalComponent,
    EditTodoModalComponent,
    TodoStateColumnComponent,
    SidebarContainerComponent,
    SidebarNavComponent,
    SidebarInfoComponent,
    CreateTodoComponent,
    EditTodoComponent
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
