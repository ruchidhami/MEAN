import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { LoginService } from "./login.service";
import { LoginUser } from "./login-user";
import { UtilitiesService } from "../services/utilities.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, RouterModule, UtilitiesService]
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private utilitiesService: UtilitiesService) {
  }

  loginUser: LoginUser;

  ngOnInit() {
    this.loginUser = new LoginUser();
  }

  login() {
    this.loginService.validateUserCredential(this.loginUser)
      .subscribe(validateUser => {
        this.utilitiesService.showFlashMessage('Login Successfully', ['alert', 'alert-success'], 3500);
        this.router.navigate(['users']);
      }, err => {
        this.utilitiesService.showFlashMessage(err.error.message, ['alert', 'alert-danger'], 3500);
      })
  }

}
