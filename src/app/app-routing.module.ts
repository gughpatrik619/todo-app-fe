import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {BoardUserComponent} from './components/board-user/board-user.component';
import {BoardModeratorComponent} from './components/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {AuthGuard} from './services/auth-guard.service';
import {ProfileComponent} from './components/profile/profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoBoardComponent} from './components/todo-board/todo-board.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {CalendarComponent} from './components/calendar/calendar.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: 'todo-list', component: TodoListComponent},
      {path: 'todo-board', component: TodoBoardComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: '', redirectTo: 'todo-list', pathMatch: 'full'},
    ]
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
