import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
/**
 * Third party modules
 */
import { CookieModule } from "ngx-cookie";
import { FlashMessagesModule } from 'ngx-flash-messages';

/**
 * Services
 */
import { UtilitiesService } from "./services/utilities.service";

/**
 * Routes
 */
/**
 * Routing Components
 */
import { appRoutes, routingComponents } from './app-routing.module';
/**
 *  App Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserListingComponent } from './user/user-listing/user-listing.component';

/**
 * Services
 */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    routingComponents,
    UserListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    CookieModule.forRoot(),
    FlashMessagesModule
  ],
  providers: [
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
