import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {BoardUserComponent} from './components/board-user/board-user.component';
import {BoardModeratorComponent} from './components/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {AuthGuard} from './services/auth-guard.service';
import {TodoComponent} from './components/todo/todo.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard]},
  {path: 'todo', component: TodoComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
