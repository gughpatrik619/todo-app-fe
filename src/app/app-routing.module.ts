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
import {TodoTableComponent} from './components/home/todo-table/todo-table.component';
import {TodoBoardComponent} from './components/home/todo-board/todo-board.component';
import {StatisticsComponent} from './components/home/statistics/statistics.component';
import {CalendarComponent} from './components/home/calendar/calendar.component';
import {EditTodoComponent} from './components/home/edit-todo/edit-todo.component';
import {CreateTodoComponent} from './components/home/create-todo/create-todo.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'table', component: TodoTableComponent, canActivate: [AuthGuard]},
      {path: 'board', component: TodoBoardComponent, canActivate: [AuthGuard]},
      {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
      {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreateTodoComponent, outlet: 'info'},
      {path: 'edit/:id', component: EditTodoComponent, outlet: 'info'},
      {path: '', redirectTo: 'table', pathMatch: 'full'},
      {path: '**', redirectTo: 'table', pathMatch: 'full'}
    ]
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
