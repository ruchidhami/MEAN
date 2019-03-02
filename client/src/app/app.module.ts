import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/**
 * Third party modules
 */
import {CookieModule} from "ngx-cookie";

/**
 * Services
 */

import{ApiHelperService} from "./services/apihelper.service";
import {AppCookieService} from "./services/cookie.service";
import {UtilitiesService} from "./services/utilities.service";

/**
 * Routes
 */
import { appRoutes } from './app-routing.module';

/**
 * Routing Components
 */
import { routingComponents } from './app-routing.module';


/**
 *  App Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    CookieModule.forRoot()
  ],
  providers: [
    AppCookieService,
    ApiHelperService,
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
