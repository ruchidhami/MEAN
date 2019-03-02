import { Routes } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


export const routingComponents = [
  LoginComponent,
  UserComponent
]

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'user', pathMatch: 'full', component: UserComponent }
];
