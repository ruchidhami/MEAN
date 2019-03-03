import { Routes } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {UserListingComponent} from "./user/user-listing/user-listing.component";


export const routingComponents = [
  LoginComponent,
  UserComponent,
  UserListingComponent
]

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'users', pathMatch: 'full', component: UserListingComponent },
  { path: 'users/create', pathMatch: 'full', component: UserComponent }
];
